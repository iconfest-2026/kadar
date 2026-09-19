# AEVYRA — User Journeys

> Definisi komprehensif seluruh alur perjalanan pengguna (*user journeys*) dalam ekosistem AEVYRA dari titik masuk awal (*acquisition*) hingga capaian luaran kesehatan preventif jangka panjang (*health outcomes*). Dokumen ini memetakan alur pengguna utama, peran instruktur dan administrator, siklus perilaku tertutup (*closed-loop behavioral engine*), interaksi asisten AI kontekstual, pemindai cerdas multimodal, konsultasi terarah, tantangan kebiasaan, manajemen krisis darurat, mitigasi kegagalan sistem, hingga telemetri analitik retensi.

---

## 1. Purpose

Dokumen ini mendefinisikan arsitektur lengkap interaksi pengguna dalam ekosistem **AEVYRA**, memetakan bagaimana *Member*, *Instructor*, dan *Admin* beraktivitas dari titik awal hingga tercapainya perbaikan gaya hidup preventif yang terukur.

Dokumen ini memetakan:
- **Alur Pengguna Menyeluruh (*End-to-End User Journeys*):** Rangkaian tahapan lengkap mulai dari pengenalan awal, pendaftaran, orientasi personal, pencatatan rutin, hingga transformasi kebiasaan jangka panjang.
- **Diferensiasi Alur Berdasarkan Peran (*Role-Specific Journeys*):** Alur kerja spesifik dan batas wewenang bagi Member, Instructor, dan Admin.
- **Siklus Perilaku Tertutup (*Closed-Loop Behavioral Engine*):** Mekanisme pembentukan *baseline*, deteksi deviasi tren, pemaparan *insight*, intervensi preventif mikro, dan evaluasi hasil.
- **Integrasi Fitur Cerdas:** Alur asisten AI kontekstual, pemindai multimodal cerdas, konsultasi terstruktur, tantangan komunitas, dan gamifikasi non-adiktif.
- **Keamanan & Resiliensi:** Penanganan kegagalan (*failure states*), protokol darurat terpisah, mode luring (*offline PWA*), dan metrik penerimaan alur (*journey acceptance criteria*).

### Cakupan Implementasi Teknis
Dokumen ini menjadi rujukan utama (*single source of truth*) untuk:
1. **Perancangan UX & Antarmuka:** Alur layar, arsitektur informasi, hierarki navigasi, dan variasi status komponen (*loading, empty, error, recovery*).
2. **Arsitektur Sistem & API:** Validasi data, transisi state mesin, *event orchestration*, background job, dan otorisasi rute.
3. **Analisis Produk:** Pengukuran konversi *funnel*, analisis *drop-off*, retensi kohort, serta kriteria keberhasilan fitur.

---

## 2. Journey Philosophy

AEVYRA tidak dirancang sekadar sebagai katalog halaman atau penampung data statis. Setiap alur interaksi dibangun untuk mengubah kesadaran (*awareness*) menjadi tindakan pencegahan nyata (*preventive action*) dengan meminimalkan beban kognitif pengguna.

Setiap interaksi bermakna mengalir melalui siklus terpadu berikut:

```text
Konteks Pengguna (User Context)
              │
              ▼
    Niat Tindakan (User Intent)
              │
              ▼
      Aksi Nyata (User Action)
              │
              ▼
  Pemahaman Sistem (System Understanding)
              │
              ▼
   Umpan Balik Bermakna (Meaningful Feedback)
              │
              ▼
   Tindakan Preventif (Preventive Action)
              │
              ▼
    Tindak Lanjut Konsisten (Follow-up)
              │
              ▼
  Peningkatan Derajat Kesehatan (Outcome)
```

> [!TIP]
> **Prinsip Utama:** Setiap layar yang dihadapi pengguna harus menjawab tiga hal esensial: *Di mana saya sekarang?*, *Apa arti informasi ini bagi kesehatan saya?*, dan *Apa langkah kecil paling efektif yang bisa saya ambil saat ini?*

---

## 3. Core Journey

Perjalanan inti (*Core Journey*) AEVYRA merupakan siklus perilaku hidup sehat yang berulang secara adaptif. Alur ini menghubungkan pencatatan data harian dengan intervensi berbasis bukti:

```text
Temukan (Discover)
        │
        ▼
Daftar & Orientasi (Register & Onboard)
        │
        ▼
Bangun Profil & Sasaran (Profile & Goal)
        │
        ▼
Catat Data Harian (Log Data)
        │
        ▼
Bentuk Baseline Pribadi (Build Baseline)
        │
        ▼
Pantau Pola & Deviasi (Observe & Detect)
        │
        ▼
Pahami Wawasan & Rekomendasi (Explain & Recommend)
        │
        ▼
Ambil Tindakan Preventif (Take Action)
        │
        ▼
Evaluasi & Perbaiki Kebiasaan (Monitor & Improve)
```

Siklus ini berulang tanpa henti sebagai putaran perbaikan berkelanjutan (*continuous improvement loop*):
`Amati (Observe)` → `Pahami (Understand)` → `Deteksi (Detect)` → `Jelaskan (Explain)` → `Intervensi (Intervene)` → `Pantau (Monitor)` → `Eskalasi Jika Perlu (Escalate)` → `Meningkat (Improve)`.

---

## 4. Journey Actors

Interaksi dalam ekosistem AEVYRA digerakkan oleh kolaborasi harmonis antara aktor manusia dan layanan sistem otonom.

| Kategori | Aktor / Layanan | Peran & Tanggung Jawab Utama |
| :--- | :--- | :--- |
| **Aktor Manusia** | **Member** | Pengguna utama yang mencatat kebiasaan hidup, memantau tren kesehatan pribadi, mengikuti tantangan kebiasaan, dan berkonsultasi dengan profesional. |
| | **Instructor** | Profesional kesehatan/kebugaran terverifikasi yang memantau risiko member, merancang program intervensi terarah, dan memberikan sesi konsultasi. |
| | **Admin** | Pengelola platform yang bertanggung jawab atas tata kelola sistem, verifikasi instruktur, kurasi konten, audit keamanan, dan kepatuhan regulasi. |
| **Layanan Sistem** | **Behavioral Engine** | Mesin analitik yang mengolah data mentah, mengkalkulasi baseline personal, mendeteksi deviasi signifikan, dan menghasilkan sinyal preventif. |
| | **AI Assistant** | Asisten cerdas berbasis konteks yang memberikan edukasi kesehatan dan penjelasan wawasan dengan batasan ketat non-diagnostik. |
| | **Notification Service** | Layanan penyampai pesan kontekstual multikanal yang menjaga ritme keterlibatan tanpa memicu kejenuhan (*notification fatigue*). |
| | **Vision / Scanner Service** | Modul OCR dan klasifikasi citra cerdas untuk mendigitalkan label nutrisi dan dokumen catatan kesehatan secara instan. |
| | **Location Service** | Modul geolokasi khusus yang memetakan fasilitas kesehatan terdekat dalam situasi krisis atau kebutuhan darurat medis. |

---

## 5. Journey Categories

Seluruh alur perjalanan dalam ekosistem AEVYRA dikelompokkan ke dalam 16 kategori fungsional yang saling terintegrasi:

| No | Kategori Alur (*Journey Category*) | Fokus Interaksi & Pengalaman Pengguna | Capaian Luaran (*Expected Outcome*) |
| :---: | :--- | :--- | :--- |
| **01** | **Acquisition Journey** | Eksplorasi nilai produk dan jaminan privasi pada landing page publik. | Pemahaman proposisi nilai dan konversi pendaftaran awal. |
| **02** | **Registration Journey** | Pembuatan akun aman dengan validasi kata sandi kuat dan proteksi bot. | Akun aktif terverifikasi dengan beban formulir minimal. |
| **03** | **Login Journey** | Autentikasi sesi multi-peran dengan perlindungan brute-force dan token aman. | Akses kembali ke dasbor tanpa friksi (*remember me*). |
| **04** | **Onboarding Journey** | Pengenalan bertahap (*progressive profiling*) untuk sasaran dan rutinitas. | Profil personalisasi aktif dalam waktu < 2 menit. |
| **05** | **First Dashboard Visit** | Kunjungan pertama dengan panduan cold-start dan status baseline awal. | Kejelasan langkah tindakan hari pertama tanpa clutter. |
| **06** | **Health Data Journey** | Pencatatan cepat (*Quick Log*) harian untuk tidur, air, dan langkah. | Rutinitas pencatatan konsisten dengan latensi < 5 detik. |
| **07** | **Timeline Journey** | Eksplorasi kronologi peristiwa kesehatan terpadu dan penyaringan kategori. | Penelusuran riwayat aktivitas yang transparan dan utuh. |
| **08** | **Baseline Journey** | Akumulasi data observasi 14 hari hingga baseline pribadi aktif. | Terbentuknya patokan tren personal berbasis bukti statistik. |
| **09** | **Behavioral Monitoring** | Pemantauan anomali tren berkelanjutan oleh Mesin Perilaku di latar belakang. | Deteksi dini deviasi kebiasaan sebelum jatuh sakit. |
| **10** | **Insight Journey** | Penyajian kartu wawasan ramah non-diagnostik yang menjawab 4 pertanyaan. | Kesadaran pengguna atas perubahan pola tanpa rasa cemas. |
| **11** | **Recommendation Journey** | Pemilihan saran tindakan mikro (*micro-actions*) yang realistis dan bebas konflik. | Adopsi kebiasaan kecil yang mudah dieksekusi hari ini. |
| **12** | **Preventive Action** | Pelaksanaan aksi nyata dengan konfirmasi instan di garis waktu. | Momentum perbaikan gaya hidup yang terekam aman. |
| **13** | **Progress Monitoring** | Evaluasi perbandingan tren sebelum vs sesudah intervensi (3–7 hari). | Pembuktian visual bahwa kebiasaan telah pulih. |
| **14** | **Closed Preventive Loop** | Putaran tertutup dari observasi hingga perbaikan gaya hidup berkelanjutan. | Ketahanan perilaku hidup sehat preventif seumur hidup. |
| **15** | **AI Assistant Journey** | Diskusi edukatif berbasis konteks kesehatan dengan guardrails keselamatan. | Pemahaman sains kesehatan tanpa risiko misdiagnosis. |
| **16** | **Scanner Journey** | Ekstraksi nilai gizi instan dari kemasan makanan via kamera gawai (OCR). | Pencatatan nutrisi mudah dengan konfirmasi manusia. |

---

## 6. User Journey Principles

Setiap alur dalam AEVYRA wajib mematuhi 7 prinsip perancangan pengalaman pengguna berikut:

- **Berorientasi Sasaran Jelas (*Goal-Oriented*):** Setiap alur dirancang untuk membantu pengguna mencapai sasaran kesehatan spesifik, bukan sekadar menghabiskan waktu di aplikasi.
- **Titik Masuk Jelas (*Clear Entry Point*):** Pengguna selalu mengetahui dari mana alur dimulai dan konteks apa yang melatarbelakanginya.
- **Kondisi Status Deterministik (*Deterministic States*):** Setiap tahapan memiliki status yang tegas (*initial, in-progress, completed, error*) tanpa ambiguitas antarmuka.
- **Umpan Balik Bermakna (*Meaningful Feedback*):** Setiap tindakan pengguna langsung memperoleh konfirmasi visual dan penjelasan mengenai dampak data tersebut terhadap analitik kesehatan mereka.
- **Pemulihan Mandiri (*Self-Recovery*):** Jika terjadi kegagalan atau galat data, antarmuka selalu menyediakan opsi koreksi tanpa menghapus progres yang sudah tersimpan.
- **Batasan Keselamatan Medis (*Clinical Safety Boundary*):** Tidak ada alur yang memberikan vonis diagnosis medis klinis; eskalasi ke tenaga profesional selalu tersedia jika terdeteksi risiko tinggi.
- **Friksi Progresif Seimbang (*Balanced Friction*):** Meminimalkan hambatan pada pencatatan rutin, namun menerapkan konfirmasi tegas pada tindakan kritis yang menyangkut privasi atau data sensitif.

---

## 7. Journey State Model

Secara teknis, setiap perjalanan pengguna diimplementasikan menggunakan model mesin status terbatas (*Finite State Machine*) untuk menjamin konsistensi data antara antarmuka dan basis data:

```text
[Titik Masuk] ──▶ [Inisiasi Niat] ──▶ [Eksekusi Aksi] ──▶ [Pemrosesan Sistem]
                                                               │
        ┌──────────────────────────────────────────────────────┴────────────────────────┐
        ▼                                                                               ▼
  [Hasil Berhasil]                                                                [Status Gagal]
        │                                                                               │
        ▼                                                                               ▼
 [Keputusan / Aksi Lanjutan]                                                     [Jalur Pemulihan]
        │                                                                               │
        ▼                                                                               ▼
   [Selesai]                                                                     [Koreksi & Coba Lagi]
```

Untuk operasi asinkron yang membutuhkan kalkulasi analitik kompleks (seperti kalkulasi baseline atau pemrosesan visi scanner), siklus status menggunakan:
`PENDING` *(antrean)* → `PROCESSING` *(analisis berjalan)* → `COMPLETED` *(sukses)* atau `FAILED` *(gagal dengan kode pemulihan)*.

---

## 8. Journey 01 — Acquisition

Alur akuisisi memperkenalkan AEVYRA kepada calon pengguna melalui berbagai saluran resmi, membangun rasa percaya awal, dan mengedukasi nilai penting pencegahan kesehatan dini.

| Titik Masuk (*Entry Point*) | Saluran Akuisisi | Pesan Kunci / Proposisi Nilai |
| :--- | :--- | :--- |
| **Landing Page Publik** | Pencarian organik & kampanye web | Pendamping gaya hidup preventif berbasis sains dan AI yang transparan. |
| **Program Kampus / Mitra** | Integrasi kurikulum / wellness kampus | Pemantauan kesehatan harian bagi mahasiswa dan tenaga pendidik. |
| **Undangan Instruktur** | Tautan rujukan (*referral link*) | Pendampingan kebugaran personal bersama instruktur bersertifikasi. |
| **Komunitas & Acara** | Seminar kesehatan & tantangan publik | Membangun kebiasaan sehat bersama rekan sebaya. |

```text
Eksplorasi Landing Page ──▶ Pahami Proposisi Nilai ──▶ Tinjau Jaminan Privasi & Keamanan ──▶ Mulai Registrasi
```

---

## 9. Acquisition UX Goals

Sebelum calon pengguna menekan tombol registrasi, antarmuka akuisisi harus memastikan pengguna memahami 6 pilar fundamental AEVYRA:

1. **Tujuan Platform:** AEVYRA adalah sistem kesehatan preventif untuk mendeteksi deviasi gaya hidup sebelum menjadi masalah klinis.
2. **Kapabilitas Utama:** Membantu pencatatan kebiasaan, membangun baseline personal, dan memberikan intervensi mikro berbasis bukti.
3. **Kedaulatan Data:** Pengguna memiliki kendali penuh atas data mereka; data tidak pernah dijual kepada pihak ketiga.
4. **Batasan Sistem:** AEVYRA bukan pengganti dokter dan bukan instrumen diagnosis medis darurat.
5. **Peran AI:** Asisten AI berfungsi sebagai mitra edukatif berbasis konteks kesehatan yang telah disetujui pengguna.
6. **Transparansi:** Tidak ada klaim medis palsu atau janji kesembuhan instan.

---

## 10. Acquisition Success

Sebuah perjalanan akuisisi dinyatakan berhasil apabila memenuhi formula konversi bernilai:

```text
Pemahaman Jelas atas Manfaat Produk
                +
Terbentuknya Rasa Percaya Privasi & Keamanan
                +
Pengguna Menekan CTA Pendaftaran Akun
```

Indikator keberhasilan kuantitatif mencakup *bounce rate* rendah pada landing page (< 40%), rasio pembacaan ketentuan privasi yang memadai, dan tingkat konversi klik tombol registrasi yang tinggi.

---

## 11. Journey 02 — Registration

Alur pendaftaran dirancang cepat, aman, dan tanpa friksi yang tidak perlu:

```text
Halaman Registrasi ──▶ Input Nama Lengkap ──▶ Input Email Valid ──▶ Buat Kata Sandi Kuat ──▶ Validasi Keamanan ──▶ Akun Terbentuk ──▶ Verifikasi Email ──▶ Masuk Sesi
```

### Aturan Keamanan Kata Sandi
- Minimal 8 karakter dengan kombinasi huruf besar, huruf kecil, angka, dan simbol.
- Pengecekan instan terhadap kata sandi umum yang rentan bocor (*pwned passwords*).
- Perlindungan dari serangan *bot* dan *brute-force* menggunakan pembatasan laju (*rate limiting*).

---

## 12. Registration Failure States

Antarmuka pendaftaran menangani seluruh kemungkinan kegagalan dengan pesan yang ramah dan instruksi pemulihan yang jelas:

| Skenario Kegagalan | Penyebab Teknis | Panduan Pemulihan Antarmuka |
| :--- | :--- | :--- |
| **Email Telah Terdaftar** | Konflik unik pada database (`422`) | Tampilkan pesan: *"Email ini sudah memiliki akun. Silakan [Masuk di sini] atau gunakan fitur [Lupa Kata Sandi]."* |
| **Format Email Tidak Valid** | Gagal validasi regex RFC email | Berikan penanda visual merah pada kolom email dengan contoh format yang benar. |
| **Kata Sandi Lemah** | Kompleksitas tidak memenuhi syarat | Tampilkan indikator kekuatan kata sandi secara interaktif beserta daftar syarat yang belum terpenuhi. |
| **Kata Sandi Tidak Cocok** | Konfirmasi kata sandi berbeda | Tandai kolom konfirmasi dengan pesan: *"Kata sandi tidak sesuai."* |
| **Batas Percobaan Terlampaui** | *Rate limiting* aktif (`429`) | Kunci tombol kirim sementara dengan hitung mundur waktu: *"Terlalu banyak percobaan. Silakan tunggu 60 detik."* |
| **Gangguan Jaringan / Server** | Koneksi putus atau server `500` | Sediakan tombol `[Coba Kirim Ulang]` tanpa menghapus data yang telah diisi di formulir. |

---

## 13. Journey 03 — Login

Alur autentikasi mengutamakan keamanan kredensial dan kemudahan akses kembali bagi pengguna:

```text
Buka Aplikasi ──▶ Akses Halaman Masuk ──▶ Masukkan Kredensial ──▶ Verifikasi Server ──▶ Regenerasi Sesi ──▶ Pengalihan ke Dashboard
```

- **Fitur Ingat Saya (*Remember Me*):** Menggunakan token sesi aman dengan masa kedaluwarsa terkontrol.
- **Pemulihan Sandi (*Forgot Password*):** Tautan pengaturan ulang kata sandi dikirimkan ke email terverifikasi dengan token sekali pakai berbatas waktu 15 menit.
- **Perlindungan Brute-Force:** Kunci sementara akun selama 5 menit setelah 5 kali kesalahan kata sandi berturut-turut.

---

## 14. Journey 04 — Onboarding

Orientasi (*onboarding*) adalah fase penentu yang mengonversi pendaftar baru menjadi pengguna aktif dengan menetapkan sasaran hidup sehat dan preferensi privasi personal:

```text
Akun Aktif ──▶ Sambutan Selamat Datang ──▶ Profil Dasar ──▶ Pemilihan Sasaran ──▶ Konteks Rutinitas ──▶ Persetujuan Privasi ──▶ Pencatatan Awal (Opsional) ──▶ Aktivasi Dashboard
```

> [!NOTE]
> Seluruh tahapan onboarding dirancang responsif, dapat diselesaikan dalam waktu kurang dari 2 menit, dan menyimpan status progres secara otomatis agar dapat dilanjutkan jika terinterupsi.

---

## 15. Onboarding Principle

AEVYRA menolak formulir panjang yang membebani mental pengguna baru. Onboarding menerapkan prinsip **Progressive Profiling**:

```text
Langkah 1: Profil Esensial  ──▶  Langkah 2: Sasaran Utama  ──▶  Langkah 3: Konteks Hidup  ──▶  Langkah 4: Kendali Privasi
 (Nama & Kelompok Usia)            (Target Gaya Hidup)              (Pola Aktivitas Harian)          (Izin Akses & AI)
```

❌ **Hindari:** Menanyakan riwayat penyakit kronis mendalam, nomor asuransi, atau puluhan data laboratorium saat orientasi pertama.  
✅ **Praktik Baik:** Kumpulkan data yang cukup untuk mempersonalisasi dashboard hari pertama, lalu ajak pengguna melengkapi data tambahan saat konteks fitur membutuhkannya.

---

## 16. Onboarding Step — Basic Profile

Langkah pertama orientasi hanya mengumpulkan data demografis dasar yang esensial untuk perhitungan kebutuhan biologis umum:

- **Nama Panggilan:** Untuk menyapa pengguna secara ramah dan manusiawi di dashboard.
- **Kelompok Usia / Tanggal Lahir:** Untuk mengalibrasi rentang acuan aktivitas dan istirahat umum.
- **Jenis Kelamin Biologis:** Diperlukan untuk perhitungan rasio metabolisme basal dan kalori preventif.
- **Tinggi & Berat Badan Awal:** Digunakan untuk inisialisasi estimasi indeks massa tubuh (*BMI*) tanpa penghakiman visual.

---

## 17. Onboarding Step — Goal

Pengguna memilih 1 hingga 2 fokus sasaran utama agar rekomendasi awal sistem menjadi tepat sasaran:

| Pilihan Sasaran Utama | Deskripsi Fokus Perilaku | Rekomendasi Awal Sistem |
| :--- | :--- | :--- |
| **Memperbaiki Pola Tidur** | Mengatasi jadwal tidur tidak teratur dan durasi istirahat yang kurang. | Pelacakan jam tidur harian & pengingat ritme sirkadian. |
| **Meningkatkan Kebugaran Fisik** | Mengurangi gaya hidup sedentari dan menambah aktivitas harian. | Target langkah kaki & latihan peregangan ringan. |
| **Menjaga Pola Nutrisi & Hidrasi** | Mengatur asupan makanan bergizi dan mencukupi cairan tubuh. | Pencatatan gelas air & digitalisasi label gizi via scanner. |
| **Manajemen Stres & Beban Kerja** | Mengelola stres akibat rutinitas padat atau tuntutan akademis. | Latihan pernapasan & refleksi catatan suasana hati (*mood*). |
| **Menjaga Konsistensi Gaya Hidup** | Memelihara kebiasaan sehat yang sudah berjalan secara berkelanjutan. | Tantangan kebiasaan harian (*streaks*) dan pemantauan baseline. |

---

## 18. Onboarding Step — Routine Context

Sistem memahami bahwa latar belakang profesi memengaruhi pola kesehatan harian. Pengguna memilih konteks rutinitas mereka:

- **Mahasiswa / Pelajar:** Cenderung memiliki jadwal kelas dinamis, tugas larut malam, dan pola makan tidak teratur.
- **Karyawan / Pekerja Kantoran:** Cenderung menghabiskan waktu duduk lama di depan layar (*sedentary desk job*) dan stres tenggat waktu.
- **Pekerja Lapangan / Shift:** Memiliki jadwal kerja berganti dan jam istirahat fleksibel.
- **Lainnya / Mandiri:** Pengaturan waktu personal.

Konteks ini mencegah sistem memberikan saran yang tidak realistis (misalnya menyarankan berjalan 10.000 langkah di jam rapat kantor yang padat).

---

## 19. Onboarding Step — Privacy

Langkah persetujuan privasi disajikan secara transparan dan mudah dipahami, bukan dalam dokumen hukum yang membingungkan:

- **Penyimpanan Data Terenkripsi:** Penjelasan bahwa catatan kesehatan disimpan dengan enkripsi standar industri.
- **Penggunaan Konteks AI:** Opsi persetujuan apakah data gaya hidup boleh digunakan sebagai konteks percakapan asisten AI.
- **Bukan Alat Diagnosis:** Konfirmasi bahwa pengguna memahami AEVYRA adalah alat pemantau preventif, bukan pengganti fasilitas kesehatan darurat.
- **Hak Hapus & Ekspor:** Informasi bahwa pengguna dapat mengunduh atau menghapus data mereka kapan saja.

---

## 20. Onboarding Step — Initial Data

Pengguna diberikan opsi opsional untuk memasukkan catatan awal hari ini guna langsung menghidupkan grafik di dashboard:

- Catatan jam tidur tadi malam (misal: 7 jam).
- Tingkat hidrasi hari ini (misal: 4 gelas air).
- Tingkat energi / suasana hati saat ini (*Baik, Biasa, Lelah*).

> [!TIP]
> Tahap ini bersifat opsional (*skippable*). Pengguna yang terburu-buru dapat langsung melanjutkan ke dashboard dengan tombol `[Lewati untuk Sekarang]`.

---

## 21. Onboarding Completion

Begitu langkah orientasi tuntas, sistem menjalankan inisialisasi akun di latar belakang:

```text
Simpan Profil & Sasaran ──▶ Inisialisasi Status Baseline [COLLECTING] ──▶ Pasang Pengingat Awal ──▶ Munculkan Layar Sambutan Sukses ──▶ Arahkan ke Dashboard
```

Antarmuka memberikan kartu sambutan pertama: *"Selamat datang di AEVYRA! Ruang personal Anda telah siap. Mari mulai mengamati pola sehat harian Anda."*

---

## 22. Journey 05 — First Dashboard Visit

Kunjungan pertama ke dashboard dirancang teratur, menenangkan, dan langsung menunjukkan tindakan berikutnya tanpa kebingungan informasi (*zero clutter*):

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        DASHBOARD AEVYRA                               │
├────────────────────────────────────────────────────────────────────────┤
│ [Header] Halo, Budi! • Sasaran: Memperbaiki Pola Tidur                │
│                                                                        │
│ ┌───────────────────────────┐  ┌─────────────────────────────────────┐ │
│ │ Status Baseline:          │  │ Aksi Cepat Hari Ini:                │ │
│ │ [Sedang Dikumpulkan 1/14] │  │ [➕ Catat Tidur]  [➕ Catat Air]    │ │
│ │ "Kumpulkan data 14 hari"  │  │ [➕ Catat Langkah] [📷 Scan Nutrisi] │ │
│ └───────────────────────────┘  └─────────────────────────────────────┘ │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Kartu Edukasi Hari Pertama:                                        │ │
│ │ "Selamat datang! Catat 1 kebiasaan hari ini untuk memulai grafik." │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

Hierarki visual memprioritaskan: **Aksi Nyata (*Actionable*)** → **Relevansi Sasaran (*Relevant*)** → **Informasi Rinci (*Informative*)**.

---

## 23. First Dashboard UX

Pada tahap awal, baseline pengguna belum terbentuk sehingga sistem tidak boleh menampilkan grafik kosong yang membingungkan atau angka statistik yang menyesatkan.

Sebagai gantinya, dashboard menampilkan status edukasi yang transparan:

> **Status Baseline Anda:**  
> *"Baseline personal Anda sedang dalam proses pembentukan (Hari ke-1 dari 14). Lanjutkan pencatatan data secara konsisten setiap hari agar AEVYRA dapat mengenali pola ritme hidup unik Anda secara akurat."*

Hal ini membangun ekspektasi yang benar bahwa wawasan kesehatan berbasis data membutuhkan konsistensi observasi.

---

## 24. Journey 06 — Health Data Logging

Pencatatan data kesehatan adalah denyut nadi utama sistem AEVYRA. Alur dibuat seringan mungkin agar tidak membebani rutinitas harian pengguna:

```text
Dashboard ──▶ Tekan Tombol [Catat Data] ──▶ Pilih Kategori Metrik ──▶ Masukkan Nilai & Satuan ──▶ Validasi Instan ──▶ Simpan ──▶ Garis Waktu Terbarui
```

Kategori pencatatan mencakup:
1. **Tidur:** Waktu tidur, waktu bangun, dan perkiraan kualitas tidur.
2. **Aktivitas:** Jumlah langkah kaki, durasi olahraga, atau jenis latihan fisik.
3. **Nutrisi & Hidrasi:** Asupan cairan (gelas/ml), porsi makan, atau hasil pindaian makanan.
4. **Kondisi Personal:** Catatan suasana hati (*mood*), tingkat energi, dan stres subjektif.

---

## 25. Quick Logging

Untuk menjaga retensi jangka panjang, pencatatan cepat (*Quick Log*) harus dapat diselesaikan dalam waktu kurang dari 5 detik:

```text
Buka Aplikasi ──▶ Tekan Aksi Cepat ──▶ Ketuk Nilai Preset (misal: +1 Gelas Air) ──▶ Selesai & Tersimpan Otomatis
```

❌ **Hindari:** Membuka formulir modal besar dengan 10 kolom isian hanya untuk mencatat satu gelas air minum.  
✅ **Praktik Baik:** Sediakan tombol pintas satu ketukan (*one-tap presets*) di dashboard untuk metrik yang paling sering dicatat.

---

## 26. Health Data Validation

Setiap data kesehatan yang dimasukkan pengguna wajib melalui lapisan validasi ketat di sisi klien dan server sebelum masuk ke pipeline analitik:

- **Kelengkapan Nilai (*Required Fields*):** Memastikan metrik esensial tidak bernilai kosong atau tidak terdefinisi (*null/empty*).
- **Batas Nilai Masuk Akal (*Valid Biological Range*):** Mencegah kesalahan input manusia (misal: durasi tidur > 24 jam/hari, denyut nadi > 300 bpm, atau konsumsi air > 20 liter sekaligus).
- **Validasi Temporal (*Date/Time Validity*):** Melarang pencatatan data bertanggal masa depan (*future timestamps*).
- **Standardisasi Satuan (*Unit Consistency*):** Mengonversi otomatis format masukan (seperti mililiter ke liter, menit ke jam) ke dalam standar basis data.
- **Pencegahan Duplikasi (*Deduplication*):** Mendeteksi dan memperingatkan pengguna jika ada catatan ganda untuk kategori dan rentang waktu yang identik.

```text
Input Pengguna ──▶ Validasi Gagal ──▶ Munculkan Pesan Edukatif Ramah ──▶ Koreksi Nilai ──▶ Simpan Ulang Berhasil
```

---

## 27. Health Data Editing

Pengguna memiliki hak penuh untuk mengoreksi atau memperbarui data kesehatan yang telah dicatat:

```text
Buka Garis Waktu (Timeline) ──▶ Pilih Entri Data ──▶ Buka Formulir Koreksi ──▶ Ubah Nilai ──▶ Validasi Ulang ──▶ Simpan Perubahan ──▶ Rekalkulasi Sinyal Terkait
```

> [!IMPORTANT]
> **Dampak Data Turunan (*Derived Signals*):** Jika data yang dikoreksi merupakan bagian dari jendela observasi sinyal atau baseline aktif, *Behavioral Engine* akan mengevaluasi apakah sinyal atau wawasan terkait perlu diperbarui secara otomatis demi menjaga akurasi tren.

---

## 28. Journey 07 — Health Timeline

Garis Waktu Kesehatan (*Health Timeline*) menyajikan kronologi perjalanan gaya hidup pengguna secara terpadu dan menyeluruh:

```text
Navigasi ke Menu [Timeline] ──▶ Jelajahi Aliran Kronologis ──▶ Terapkan Filter Kategori ──▶ Ketuk Kartu Entri ──▶ Tinjau Detail Metrik & Dampak
```

Pengguna dapat memfilter riwayat berdasarkan dimensi:
- **Semua Aktivitas:** Tampilan gabungan seluruh aktivitas harian.
- **Pola Tidur:** Rekam jejak durasi dan ritme istirahat.
- **Nutrisi & Hidrasi:** Rekam porsi makan, pindaian label gizi, dan asupan air.
- **Wawasan & Sinyal:** Riwayat anomali tren yang pernah terdeteksi oleh sistem.
- **Intervensi & Tantangan:** Progres tantangan yang diikuti serta tindakan pencegahan yang dijalankan.
- **Catatan Konsultasi:** Ringkasan diskusi dan anjuran dari instruktur.

---

## 29. Journey 08 — Baseline Formation

Baseline kesehatan personal tidak muncul secara instan saat akun dibuat. Baseline adalah profil referensi statistik yang dibangun dari observasi kebiasaan nyata pengguna:

```text
Pencatatan Data Awal (Hari 1-3) ──▶ Akumulasi Observasi Rutin (Hari 4-13) ──▶ Uji Kualitas & Variabilitas ──▶ Kalkulasi Baseline Personal (Hari 14) ──▶ Baseline Aktif & Transparan
```

Prinsip dasar pembentukan baseline:
1. Menghindari kesimpulan terburu-buru dari data yang terlalu sedikit (*no premature baselines*).
2. Memperhitungkan kecenderungan memusat (*mean/median*) dan variabilitas harian (*standard deviation*).
3. Terus diperbarui secara berkala (*rolling window* 14–30 hari) agar adaptif terhadap evolusi gaya hidup pengguna.

---

## 30. Baseline State

Status baseline pengguna diatur melalui siklus status yang tegas dan dapat dipantau oleh pengguna maupun instruktur:

| Status Baseline | Keterangan Kondisi Data | Perilaku Antarmuka |
| :--- | :--- | :--- |
| `NOT_STARTED` | Pengguna baru terdaftar, belum ada satu pun data tercatat. | Menampilkan ajakan ramah untuk mencatat data pertama hari ini. |
| `COLLECTING` | Data sedang dikumpulkan (kurang dari syarat minimum hari/sampel). | Menampilkan bilah progres pengumpulan (contoh: *Hari ke-5 dari 14*). |
| `INSUFFICIENT_DATA` | Rentang waktu mencukupi namun frekuensi pengisian terlalu bolong-bolong. | Memberikan tips konsistensi pencatatan agar baseline dapat dihitung. |
| `AVAILABLE` | Data observasi lengkap, baseline personal aktif dan sahih. | Menjadi referensi utama deteksi deviasi dan pembanding grafik. |
| `STALE` | Pengguna tidak mencatat data selama lebih dari 30 hari berturut-turut. | Memberi tanda bahwa pola lama mungkin tidak lagi relevan. |
| `REBUILDING` | Pengguna mengubah sasaran utama secara drastis atau meminta kalibrasi ulang. | Mengumpulkan kembali jendela observasi baru tanpa menghapus riwayat lama. |

---

## 31. Baseline Transparency

AEVYRA menolak algoritma kotak hitam (*black box*). Pengguna berhak mengetahui dasar perhitungan baseline kesehatan mereka setiap saat:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     RINCIAN BASELINE POLA TIDUR                        │
├────────────────────────────────────────────────────────────────────────┤
│ Rata-rata Durasi Tidur Personal: 7 Jam 10 Menit                        │
│                                                                        │
│ • Sumber Data Observasi : 14 hari pencatatan terakhir (1 - 14 Okt)     │
│ • Jumlah Sampel Sah     : 12 malam terverifikasi                       │
│ • Variabilitas Harian   : ± 35 menit (Rentang wajar: 6j 35m - 7j 45m) │
│ • Terakhir Diperbarui   : Hari ini pukul 06.00 WIB                     │
└────────────────────────────────────────────────────────────────────────┘
```

Transparansi ini menumbuhkan rasa kepemilikan data dan pemahaman mengapa deviasi tertentu dianggap penting oleh sistem.

---

## 32. Journey 09 — Behavioral Monitoring

Setelah baseline personal terbentuk, *Behavioral Engine* menjalankan pemantauan preventif secara berkelanjutan di latar belakang:

```text
Entri Data Baru ──▶ Ingesti Engine ──▶ Bandingkan Terhadap Baseline ──▶ Uji Tren Multihari ──▶ Evaluasi Konteks Hidup ──▶ Kualifikasi Sinyal Deviasi
```

Jika terdeteksi perubahan kebiasaan yang berpotensi menurunkan kualitas hidup, sistem tidak langsung memicu alarm darurat, melainkan mengalirkannya ke proses verifikasi signifikansi sinyal.

---

## 33. Signal Qualification

Tidak setiap fluktuasi harian dianggap sebagai sinyal masalah. Sistem mencegah kelelahan notifikasi (*alert fatigue*) dengan menguji 5 parameter kelayakan sinyal:

```text
Besaran Deviasi (Magnitude) ──▶ Apakah perubahan berada di luar ambang deviasi wajar?
              +
Durasi Tren (Duration)     ──▶ Apakah terjadi berturut-turut (misal: 3–5 hari), bukan anomali sesaat?
              +
Konsistensi Pola (Consistency) ──▶ Apakah arah perubahannya konsisten menuju perburukan?
              +
Kualitas Data (Data Quality) ──▶ Apakah jumlah sampel cukup untuk menarik kesimpulan?
              +
Konteks Pengguna (Context)  ──▶ Apakah pengguna sedang dalam masa ujian / shift kerja khusus?
```

Hanya deviasi yang lolos uji kualifikasi ini yang diterbitkan sebagai wawasan perilaku (*behavioral insight*).

---

## 34. Example Behavioral Journey

Ilustrasi konkret alur pendeteksian deviasi perilaku nyata:

- **Baseline Terverifikasi:** Rata-rata durasi tidur personal = **7 jam 15 menit**.
- **Data Observasi Baru:**
  - Hari ke-1: Tidur 6 jam 10 menit (*-65 menit*)
  - Hari ke-2: Tidur 5 jam 50 menit (*-85 menit*)
  - Hari ke-3: Tidur 6 jam 00 menit (*-75 menit*)
  - Hari ke-4: Tidur 5 jam 35 menit (*-100 menit*)

```text
Deteksi Pola Penurunan Konsisten Selama 4 Hari Berturut-turut
                             │
                             ▼
  Validasi Kecukupan Sampel & Uji Parameter Kelayakan Sinyal
                             │
                             ▼
 Terbitkan Sinyal Perilaku: [PERHATIAN_POLA_TIDUR_MENURUN]
```

---

## 35. Journey 10 — Behavioral Insight

Wawasan perilaku (*insight*) menyajikan hasil pembacaan pola sistem dalam bahasa manusia yang ramah, objektif, dan memberdayakan:

```text
Sinyal Terkualifikasi ──▶ Formulasi Wawasan ──▶ Validasi Bahasa Non-Diagnostik ──▶ Penyimpanan Data Wawasan ──▶ Tampilkan Kartu Wawasan di Dashboard
```

Kartu wawasan muncul sebagai kartu sorotan (*highlight card*) di beranda pengguna dengan indikator warna lembut, bukan pop-up merah yang menakutkan.

---

## 36. Insight Presentation

Setiap wawasan kesehatan yang disajikan kepada pengguna wajib menjawab 4 pertanyaan fundamental secara transparan:

```text
1. Apa yang berubah?       ──▶ "Durasi tidur Anda menurun rata-rata 1 jam 20 menit selama 4 hari terakhir."
2. Dibandingkan apa?       ──▶ "Dibandingkan dengan baseline kebiasaan tidur Anda (7 jam 15 menit)."
3. Mengapa hal ini penting? ──▶ "Penurunan durasi tidur berkelanjutan dapat memengaruhi fokus dan imunitas tubuh."
4. Apa yang bisa dilakukan? ──▶ "Coba kurangi waktu layar 30 menit sebelum tidur atau jadwalkan istirahat lebih awal."
```

> [!IMPORTANT]
> **Larangan Diagnostik:** Teks wawasan tidak boleh menyebutkan nama penyakit medis klinis (seperti *"Anda menderita insomnia kronis"*). Bahasa harus sepenuhnya mendeskripsikan data observasi perilaku.

---

## 37. Insight Interaction

Pengguna memiliki kebebasan penuh dalam merespons wawasan yang disajikan:

```text
                                 ┌──▶ [Pahami & Ambil Rekomendasi] ──▶ Mulai Aksi Preventif
                                 │
[Tinjau Kartu Wawasan di Beranda] ├──▶ [Tanyakan ke Asisten AI]    ──▶ Mulai Percakapan Edukasi
                                 │
                                 └──▶ [Tandai Sudah Dibaca / Nanti] ──▶ Arsipkan ke Riwayat Wawasan
```

Sistem mencatat interaksi ini untuk memahami apakah wawasan yang diberikan dirasakan relevan dan membantu pengguna.

---

## 38. Journey 11 — Recommendation

Rekomendasi AEVYRA berfokus pada tindakan mikro yang realistis (*micro-habits*) yang langsung dapat dieksekusi hari ini:

```text
Wawasan Perilaku Aktif ──▶ Cocokkan dengan Sasaran Pengguna ──▶ Pilih Rekomendasi Paling Ringan & Efektif ──▶ Sajikan Opsi Aksi ──▶ Konfirmasi Partisipasi Pengguna
```

Karakteristik rekomendasi yang baik:
- **Terukur & Konkret:** Bukan sekadar saran abstrak seperti *"Kurangi stres"*, melainkan *"Lakukan latihan pernapasan 4-7-8 selama 3 menit malam ini"*.
- **Bebas Kontradiksi:** Sistem tidak boleh memberikan dua rekomendasi aktif yang saling bertentangan secara bersamaan.

---

## 39. Recommendation Action

Ketika pengguna menyetujui rekomendasi tindakan:

```text
Pilih Rekomendasi ──▶ Tentukan Waktu Pelaksanaan ──▶ Pasang Pengingat Kontekstual ──▶ Tambahkan ke Sasaran Harian ──▶ Umpan Balik Positif
```

Pengguna dapat memilih apakah ingin diingatkan melalui notifikasi aplikasi pada waktu yang ditentukan (misalnya pukul 21.00 WIB untuk persiapan tidur).

---

## 40. Journey 12 — Preventive Action

Alur eksekusi tindakan pencegahan yang dijalankan oleh pengguna:

```text
Terima Pengingat / Inisiatif Mandiri ──▶ Lakukan Aksi Preventif ──▶ Catat Pelaksanaan di Aplikasi ──▶ Dapatkan Konfirmasi Visual ──▶ Poin Konsistensi Bertambah
```

Tindakan preventif yang telah selesai langsung dicatat ke dalam garis waktu (*timeline*) sebagai peristiwa intervensi positif yang memperkuat rekam jejak kesehatan pengguna.

---

## 41. Journey 13 — Progress Monitoring

Setelah tindakan preventif diambil, sistem mengamati apakah intervensi tersebut membuahkan perbaikan pola nyata:

```text
Aksi Dilakukan ──▶ Pengumpulan Data Lanjutan ──▶ Perbandingan Tren Sebelum vs Sesudah ──▶ Evaluasi Efektivitas Intervensi ──▶ Perbarui Dasbor Kemajuan
```

Sistem tidak menilai keberhasilan hanya dari satu hari, melainkan mengevaluasi stabilitas pemulihan pola selama rentang waktu yang memadai (misal: 3–7 hari pasca-intervensi).

---

## 42. Progress States

Status kemajuan intervensi diklasifikasikan ke dalam 4 kondisi terukur:

| Status Kemajuan | Makna Evaluasi Data | Tindakan Lanjutan Sistem |
| :--- | :--- | :--- |
| `IMPROVING` | Data menunjukkan pemulihan tren kembali mendekati baseline wajar. | Berikan apresiasi visual dan dorong pemeliharaan konsistensi. |
| `STABLE` | Deviasi terhenti, kondisi tidak memburuk namun belum pulih penuh. | Terus pantau tanpa menambah intervensi baru yang membingungkan. |
| `NO_CHANGE` | Tidak terlihat perbedaan pola signifikan setelah beberapa hari. | Evaluasi kembali apakah tingkat kesulitan rekomendasi perlu disesuaikan. |
| `WORSENING` | Pola terus memburuk dan deviasi semakin melebar. | Tawarkan opsi eskalasi konsultasi dengan instruktur kesehatan. |

---

## 43. Journey 14 — Closed Preventive Loop

Inilah arsitektur pamungkas dari siklus kesehatan preventif AEVYRA—putaran tertutup (*Closed Preventive Loop*):

```text
┌────────────────────────────────────────────────────────────────────────┐
│                    SIKLUS PERILAKU TERTUTUP AEVYRA                    │
└────────────────────────────────────────────────────────────────────────┘
       ▲                                                          │
       │ [8. Capaian Membaik]                                      ▼ [1. Observasi Data]
       │                                                          │
   EVALUASI HASIL                                            LOGGING RUTIN
       ▲                                                          │
       │ [7. Pemantauan Tren]                                      ▼ [2. Baseline Personal]
       │                                                          │
   MONITORING DAMPAK                                         DETEKSI DEVIASI
       ▲                                                          │
       │ [6. Aksi Nyata]                                           ▼ [3. Sinyal Perilaku]
       │                                                          │
   INTERVENSI MIKRO ◀─────── REKOMENDASI TERARAH ◀─────── WAWASAN BERMAKNA
                               [5. Saran Aksi]            [4. Penjelasan Jelas]
```

Setiap putaran yang tuntas meningkatkan kepekaan sistem terhadap ritme hidup pengguna dan memperkuat ketahanan gaya hidup sehat mereka.

---

## 44. Journey 15 — AI Assistant

Asisten AI AEVYRA berfungsi sebagai rekan diskusi edukatif dan penjelas konteks kesehatan, bukan sebagai mesin diagnosis penyakit:

```text
Buka Menu AI / Tombol Diskusi ──▶ Cek Izin Akses Konteks Data ──▶ Ajukan Pertanyaan / Pilih Topik Wawasan ──▶ AI Memproses dengan Guardrails ──▶ Respons Edukatif Disajikan
```

- **Peran AI:** Menjelaskan makna statistik kesehatan, memberikan tips gaya hidup berbasis bukti ilmiah, dan membantu merumuskan kebiasaan sehat harian.
- **Keterbatasan AI:** Dilarang meresepkan obat, dilarang menegakkan diagnosis klinis, dan dilarang memberikan instruksi medis dalam situasi gawat darurat.

---

## 45. AI Context Consent

Sebelum asisten AI membaca ringkasan data kesehatan pengguna untuk menjawab pertanyaan, sistem mewajibkan persetujuan eksplisit:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   PERSETUJUAN KONTEKS DATA ASISTEN AI                  │
├────────────────────────────────────────────────────────────────────────┤
│ Asisten AI dapat memberikan saran yang jauh lebih relevan jika diizinkan│
│ membaca ringkasan gaya hidup Anda (pola tidur, aktivitas, dan hidrasi).│
│                                                                        │
│ Data yang dikirimkan:                                                  │
│ • Hanya ringkasan statistik agregat (bukan data mentah/identitas rahasia)│
│ • Tidak digunakan untuk melatih model publik                           │
│                                                                        │
│ [ ] Izinkan Asisten AI membaca ringkasan kesehatan saya                │
│                                                                        │
│            [Setujui & Lanjutkan]      [Gunakan Mode Anonim]            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 46. AI Explain-Insight Journey

Alur pengguna meminta penjelasan mendalam mengenai kartu wawasan yang diterbitkan sistem:

```text
Kartu Wawasan di Dasbor ──▶ Ketuk [Tanyakan Mengapa ke AI] ──▶ AI Membuka Konteks Wawasan Terkait ──▶ AI Menjelaskan Rasional Ilmiah Sederhana ──▶ Pengguna Mengajukan Pertanyaan Lanjutan ──▶ AI Mengarahkan ke Opsi Tindakan Nyata
```

Contoh dialog aman:
> **Pengguna:** *"Kenapa tidur 5 jam beberapa hari ini berpengaruh besar?"*  
> **AI:** *"Tidur kurang dari 6 jam selama 4 hari berturut-turut menyebabkan akumulasi 'utang tidur' yang dapat memperlambat waktu reaksi dan menurunkan sensitivitas insulin. Namun dengan memajukan jam tidur 30–45 menit malam ini, ritme pemulihan tubuh Anda akan mulai membaik."*

---

## 47. AI Escalation Journey

Apabila pertanyaan pengguna mengarah pada gejala klinis serius atau kondisi darurat medis:

```text
Input Mengandung Gejala Klinis / Bendera Merah (Red Flags)
                           │
                           ▼
     Lapisan Deteksi Keamanan (Safety Guardrail Layer)
                           │
                           ▼
  Respons Blokir Medis + Penjelasan Batasan Non-Diagnostik
                           │
                           ▼
 Tawarkan Akses Konsultasi Instruktur ATAU Tombol Darurat Medis
```

> [!WARNING]
> Sistem AI langsung menghentikan penalaran mandiri jika mendeteksi kata kunci bahaya (seperti *nyeri dada menjalar, sesak napas berat, pikiran menyakiti diri*) dan segera mengarahkan pengguna ke fasilitas medis darurat terdekat.

---

## 48. AI Failure Journey

Penanganan jika terjadi gangguan pada layanan penyedia AI (*LLM Provider*):

```text
Pengguna Mengirim Pesan ──▶ Layanan AI Timeout / Error ──▶ Tampilkan Pesan Pemulihan Santun ──▶ Sediakan Opsi Artikel Edukasi Manual / Coba Ulang
```

Antarmuka menampilkan: *"Asisten AI sedang mengalami kendala koneksi. Anda tetap dapat membaca panduan pola tidur di Pusat Bantuan atau mencoba mengirim pesan kembali dalam beberapa saat."*

---

## 49. Journey 16 — Scanner

Fitur Pemindai Cerdas (*Multimodal Scanner*) mempermudah pencatatan nutrisi dan dokumen kesehatan melalui kamera ponsel:

```text
Buka Kamera Scanner ──▶ Bidik Label Nutrisi / Kemasan Makanan ──▶ Ambil Foto ──▶ Unggah & Ekstraksi OCR ──▶ Tampilkan Pratinjau Nilai Gizi ──▶ Konfirmasi Pengguna ──▶ Simpan ke Log
```

Data yang diekstraksi mencakup: takaran saji, kandungan kalori, gula, garam (natrium), dan lemak total.

---

## 50. Scanner Permission

Alur permintaan izin akses perangkat kamera dirancang transparan dengan penjelasan kegunaan yang jelas:

```text
Tekan Tombol Scan ──▶ Periksa Izin Kamera ──▶ Jika Belum Diberikan: Tampilkan Dialog Edukasi Alasan Akses ──▶ Pengguna Mengizinkan di Browser/OS ──▶ Jendela Bidik Kamera Aktif
```

Jika pengguna menolak izin kamera, sistem tetap menyediakan jalur alternatif: **[Unggah Berkas Gambar dari Galeri]** atau **[Masukkan Data Gizi Secara Manual]**.

---

## 51. Scanner Low Confidence

Ketika gambar label nutrisi buram, gelap, atau terpotong, mesin OCR menghasilkan skor keyakinan rendah (*low confidence score*):

```text
Foto Diambil ──▶ Analisis OCR ──▶ Skor Keyakinan < 70% ──▶ Munculkan Notifikasi Kejujuran Sistem ──▶ Beri Opsi: [Foto Ulang] ATAU [Lengkapi Manual]
```

Antarmuka menampilkan pesan transparan:  
*"Label nutrisi kurang terbaca jelas. Kami mendeteksi sebagian angka, namun mohon periksa atau lengkapi nilai kalori dan gula secara manual sebelum menyimpan."*

---

## 52. Scanner Confirmation

Sistem AEVYRA tidak pernah menyimpan hasil pembacaan OCR secara langsung ke basis data tanpa persetujuan manusia (*human-in-the-loop*):

```text
Ekstraksi Data Selesai ──▶ Tampilkan Formulir Pratinjau Nilai Terdeteksi ──▶ Pengguna Memeriksa & Mengoreksi Angka ──▶ Pengguna Menekan [Konfirmasi Simpan] ──▶ Data Resmi Masuk ke Log Nutrisi
```

Hal ini menjamin data riwayat kesehatan tetap akurat dan tidak terdistorsi oleh kesalahan pembacaan mesin.

---

## 53. Journey 17 — Challenge

Tantangan Kebiasaan (*Habit Challenges*) dirancang untuk membina kebiasaan sehat harian melalui intervensi perilaku terstruktur:

```text
Jelajahi Katalog Tantangan ──▶ Pelajari Aturan & Durasi (misal: 7 Hari Hidrasi Cukup) ──▶ Tinjau Beban Tantangan ──▶ Gabung Tantangan ──▶ Mulai Check-in Harian
```

Karakteristik tantangan AEVYRA:
- Bertahap dan berbasis sains perilaku (durasi pendek: 3–14 hari).
- Menekankan konsistensi mikro, bukan beban ekstrem yang membahayakan tubuh.

---

## 54. Challenge Participation

Alur aktivitas peserta saat menjalani tantangan aktif:

```text
Pengingat Jadwal Check-in ──▶ Buka Kartu Tantangan ──▶ Lakukan Aktivitas Target ──▶ Catat Bukti / Konfirmasi Selesai ──▶ Bilah Progres Maju ──▶ Apresiasi Pencapaian Harian
```

Setiap check-in harian yang berhasil langsung tercatat di timeline dan memperpanjang rentetan konsistensi (*habit streak*).

---

## 55. Challenge Progress Journey

Pengguna dapat memantau status partisipasi tantangan mereka secara visual:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               TANTANGAN: 7 HARI MINUM AIR 2 LITER                      │
├────────────────────────────────────────────────────────────────────────┤
│ Status: HARI KE-4 DARI 7 (Aktif)                                       │
│ [ ■■■■□□□ ] 57% Tercapai                                               │
│                                                                        │
│ • Hari 1: ✅ Selesai (2.1 L)      • Hari 5: ⏳ Menunggu                │
│ • Hari 2: ✅ Selesai (2.0 L)      • Hari 6: ⏳ Menunggu                │
│ • Hari 3: ✅ Selesai (2.3 L)      • Hari 7: ⏳ Menunggu                │
│ • Hari 4: ✅ Selesai (2.0 L)                                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 56. Challenge Failure

AEVYRA menerapkan pendekatan psikologi yang suportif terhadap kegagalan atau hari yang terlewat (*missed days*):

| Kondisi Kegagalan | Sikap Antarmuka | Opsi Pemulihan Pengguna |
| :--- | :--- | :--- |
| **Terlewat 1 Hari** | Memberikan pemahaman ramah tanpa hukuman emosional. | Fitur *Grace Period* (pengampunan 1 hari) atau lanjutkan tantangan. |
| **Berhenti di Tengah Jalan** | Mengapresiasi hari-hari yang telah berhasil dicapai. | Opsi untuk memulai ulang (*restart*) atau memilih tantangan lain yang lebih ringan. |
| **Tantangan Kedaluwarsa** | Memberikan ringkasan pencapaian dan pembelajaran kebiasaan. | Mengarsipkan riwayat tanpa menghilangkan poin kebiasaan yang diperoleh. |

---

## 57. Journey 18 — Instructor Discovery

Pengguna yang membutuhkan pendampingan profesional dapat mencari instruktur kesehatan yang terverifikasi di platform:

```text
Menu Konsultasi ──▶ Buka Direktori Instruktur ──▶ Terapkan Filter (Keahlian Nutrisi, Kebugaran, Pola Tidur) ──▶ Tinjau Profil, Sertifikasi, & Ulasan ──▶ Pilih Instruktur yang Sesuai
```

Setiap profil instruktur menampilkan spesialisasi keahlian, nomor izin/sertifikasi resmi, bahasa pengantar, dan ketersediaan jadwal temu.

---

## 58. Journey 19 — Consultation Booking

Alur pemesanan jadwal sesi konsultasi dengan instruktur:

```text
Pilih Instruktur ──▶ Pilih Slot Waktu Tersedia ──▶ Tentukan Topik Konsultasi (misal: Evaluasi Baseline Tidur) ──▶ Setujui Pembagian Ringkasan Data ──▶ Konfirmasi Booking ──▶ Tiket & Tautan Sesi Terbit
```

Pengguna dapat melampirkan ringkasan wawasan kesehatan terakhir mereka agar instruktur dapat mempelajari konteks sebelum sesi dimulai.

---

## 59. Booking Conflict

Penanganan jika slot waktu yang dipilih telah diambil pengguna lain secara simultan:

```text
Pengajuan Slot Waktu ──▶ Verifikasi Ketersediaan ──▶ Terjadi Konflik Jadwal (Slot Terisi) ──▶ Tampilkan Pesan Penjelasan Ramah ──▶ Sajikan Alternatif Waktu Terdekat
```

Antarmuka menampilkan: *"Slot waktu pukul 14.00 baru saja dipesan oleh pengguna lain. Berikut 2 alternatif waktu terdekat yang tersedia hari ini: [15.00 WIB] atau [16.30 WIB]."*

---

## 60. Journey 20 — Consultation

Alur pelaksanaan sesi konsultasi interaktif antara Member dan Instructor:

```text
Notifikasi Pengingat Sesi (H-1 Jam & H-10 Menit) ──▶ Masuk Ruang Konsultasi ──▶ Diskusi & Penelaahan Data Gaya Hidup ──▶ Instruktur Merumuskan Rencana Intervensi ──▶ Sesi Berakhir ──▶ Rangkuman & Rencana Masuk Dasbor Member
```

Setelah sesi selesai, instruktur menerbitkan ringkasan resmi yang berisi rekomendasi tindakan spesifik yang dapat langsung dipantau oleh sistem.

---

## 61. Journey 21 — Instructor Monitoring

Alur kerja harian instruktur dalam mengawasi anggota binaannya:

```text
Masuk Portal Instruktur ──▶ Buka Dasbor Pemantauan ──▶ Tinjau Daftar Anggota Binaan (Caseload) ──▶ Periksa Indikator Perhatian (Deviasi Aktif) ──▶ Pilih Profil Anggota yang Membutuhkan Dukungan
```

Dasbor instruktur mengurutkan anggota berdasarkan prioritas kebutuhan intervensi (anggota dengan sinyal deviasi berkelanjutan berada di urutan teratas).

---

## 62. Instructor Member View

Tampilan profil anggota bagi instruktur mematuhi prinsip akses data minimum (*minimum necessary data*):

```text
┌────────────────────────────────────────────────────────────────────────┐
│               PORTAL INSTRUKTUR: PROFIL ANGGOTA BINAAN                 │
├────────────────────────────────────────────────────────────────────────┤
│ Member: Budi Santoso • Status Persetujuan: Berbagi Ringkasan Aktif     │
│                                                                        │
│ • Garis Waktu Tren 14 Hari Terakhir (Tidur & Aktivitas Langkah)        │
│ • Sinyal Deviasi Aktif: Penurunan jam tidur (-80 mnt selama 4 hari)    │
│ • Riwayat Rencana Intervensi Sebelumnya & Tingkat Kepatuhan            │
│ • Catatan Catatan Konsultasi Terakhir (12 Oktober)                     │
│                                                                        │
│ [➕ Buat Intervensi Baru]  [📅 Jadwalkan Sesi Ulang]  [⚠️ Eskalasi Medis]│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 63. Journey 22 — Instructor Intervention

Instruktur merumuskan rencana tindakan preventif yang disesuaikan secara khusus bagi anggota:

```text
Pilih Profil Member ──▶ Buka Modul Rencana Intervensi ──▶ Tentukan Sasaran Mikro & Parameter Target ──▶ Tulis Catatan Panduan Personal ──▶ Kirimkan Rencana ke Aplikasi Member
```

Rencana ini otomatis muncul di beranda aplikasi member sebagai program rekomendasi instruktur dengan label prioritas terverifikasi.

---

## 64. Intervention Follow-up

Pemantauan kepatuhan terhadap rencana intervensi instruktur:

```text
Member Menjalankan Rencana ──▶ Data Harian Terkumpul ──▶ Dasbor Instruktur Menampilkan Indikator Progres ──▶ Instruktur Mengirimkan Pesan Apresiasi / Penyesuaian
```

Jika anggota berhasil memulihkan pola kesehatannya, instruktur dapat menandai kasus intervensi sebagai `RESOLVED` (tuntas).

---

## 65. Journey 23 — Human Escalation

Ketika instruktur mendeteksi bahwa deviasi kesehatan anggota berada di luar kewenangan gaya hidup kebugaran dan membutuhkan diagnosis medis spesialis:

```text
Instruktur Mendeteksi Indikator Risiko Klinis Tinggi
                          │
                          ▼
            Pilih Opsi [Eskalasi Medis]
                          │
                          ▼
   Formulasi Alasan Rujukan & Lampirkan Ringkasan Tren
                          │
                          ▼
     Kirimkan Notifikasi Rekomendasi Fasilitas Medis ke Member
```

> [!IMPORTANT]
> Instruktur tidak memberikan resep obat, melainkan mengeluarkan surat rekomendasi konsultasi medis formal agar anggota segera memeriksakan diri ke dokter atau fasilitas kesehatan berwenang.

---

## 66. Journey 24 — Community

Komunitas AEVYRA adalah ruang berbagi pengalaman, inspirasi gaya hidup sehat, dan saling memotivasi antar-anggota:

```text
Masuk Tab Komunitas ──▶ Jelajahi Linimasa Diskusi Berdasarkan Topik ──▶ Baca Kisah Inspiratif / Tips Sehat ──▶ Berikan Reaksi Positif / Komentar ──▶ Buat Unggahan Baru
```

Lingkungan komunitas dijaga agar tetap ramah, inklusif, dan bebas dari klaim medis yang tidak terbukti.

---

## 67. Community Post Visibility

Pengguna memiliki kendali penuh atas visibilitas dan privasi setiap unggahan yang mereka buat:

- **Publik / Komunitas:** Dapat dibaca oleh seluruh anggota terdaftar di topik yang relevan.
- **Grup Tantangan:** Hanya dapat dilihat oleh sesama peserta dalam tantangan yang sama.
- **Anonim:** Nama dan foto profil disamarkan demi kenyamanan berbagi cerita sensitif seputar kebiasaan hidup sehat.

---

## 68. Community Moderation

Mekanisme pengawasan konten untuk melindungi keselamatan anggota:

```text
Laporan Pengguna / Filter Kata Kunci Otomatis
                     │
                     ▼
          Antrean Moderasi Admin
                     │
                     ▼
  Evaluasi Konten (Spam / Klaim Medis Liar / Pelecehan)
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
 [Hapus Unggahan & Tegur]   [Konten Sah & Pulihkan]
```

---

## 69. Journey 25 — Gamification

Gamifikasi dalam AEVYRA dirancang untuk membangun motivasi intrinsik dan kebanggaan atas konsistensi hidup sehat, bukan untuk memicu kecanduan layar:

```text
Pencatatan Rutin / Tuntas Tantangan ──▶ Kalkulasi Poin Konsistensi ──▶ Evaluasi Syarat Lencana Pencapaian ──▶ Buka Kunci Lencana (Contoh: "Penjaga Tidur 7 Hari") ──▶ Tampilkan di Profil
```

- **Prinsip Utama:** Menghargai proses pembentukan kebiasaan jangka panjang.
- **Larangan Manipulasi:** Tidak menggunakan taktik *dark patterns* atau sanksi psikologis yang membuat pengguna merasa cemas jika tidak membuka aplikasi.

---

## 70. Journey 26 — Membership

Pengelolaan langganan keanggotaan bagi pengguna yang menginginkan layanan bernilai tambah:

```text
Halaman Pengaturan Akun ──▶ Pilih Paket Keanggotaan (Free vs Premium) ──▶ Tinjau Manfaat (Akses Konsultasi Instruktur Tambahan, Analitik Mendalam) ──▶ Pembayaran Aman ──▶ Status Keanggotaan Aktif
```

---

## 71. Membership Safety

AEVYRA menetapkan aturan etika yang mutlak terkait keanggotaan berbayar:

> [!CAUTION]
> **Pemisahan Tingkat Keanggotaan dari Keselamatan Medis:**  
> Paket langganan berbayar hanya membedakan fitur kenyamanan (seperti kuota konsultasi instruktur atau riwayat analitik tak terbatas). Fitur keselamatan mendasar—termasuk deteksi bahaya darurat, batas keamanan AI, dan akses nomor bantuan medis—wajib tersedia secara gratis bagi seluruh pengguna tanpa kecuali.

---

## 72. Journey 27 — Notification

Notifikasi AEVYRA berfungsi sebagai pengingat tepat waktu yang menghormati kenyamanan pengguna:

```text
Pemicu Sistem (Jadwal Pengingat / Deviasi Terdeteksi) ──▶ Cek Preferensi Pengguna & Jam Tenang (Do Not Disturb) ──▶ Evaluasi Kebijakan Anti-Kelelahan Pesan ──▶ Kirimkan Notifikasi Ringkas
```

Pengguna dapat mengatur jadwal jam tenang (misalnya: tidak ada notifikasi antara pukul 22.00 hingga 06.00 kecuali situasi darurat).

---

## 73. Notification Journey Example

Contoh alur penyampaian pengingat minum air berbasis konteks:

```text
Pukul 14.00 WIB ──▶ Sistem Mengidentifikasi Belum Ada Catatan Hidrasi Siang Ini ──▶ Kirim Notifikasi Ringkas: "Sudah minum air siang ini? Sentuh untuk catat 1 gelas." ──▶ Pengguna Mengetuk Aksi Cepat ──▶ Log Bertambah Tanpa Perlu Membuka Layar Penuh
```

---

## 74. Journey 28 — Re-engagement

Alur menjangkau kembali pengguna yang tidak aktif (*dormant members*) tanpa nada menuduh atau manipulatif:

```text
Deteksi Ketidakaktifan (> 7 Hari Tanpa Catatan) ──▶ Jeda Sejenak (Jangan Spam) ──▶ Kirim Pesan Sambutan Ramah (Hari ke-10) ──▶ Pengguna Membuka Aplikasi ──▶ Tampilkan Layar Selamat Datang Kembali yang Ringan
```

---

## 75. Re-engagement Rules

Aturan etis dalam mengaktifkan kembali pengguna:

- **Pesan Suportif:** Hindari kalimat bernada rasa bersalah seperti *"Anda telah mengecewakan target Anda!"*. Gunakan pendekatan hangat: *"Halo Budi, kami siap mendampingi kembali kapan pun Anda ingin mulai mencatat kebiasaan sehat."*
- **Batas Maksimal Percobaan:** Jika pengguna tidak merespons setelah 2 kali pengingat dalam 30 hari, hentikan pengiriman notifikasi otomatis untuk menghargai privasi pengguna.

---

## 76. Journey 29 — Emergency Support

Protokol Darurat Medis (*Emergency Support*) dirancang sebagai jalur khusus berkecepatan tinggi yang terisolasi sepenuhnya dari siklus pencegahan kebiasaan harian:

```text
Tombol Darurat Merah (Akses Cepat di Setiap Layar Kritis)
                           │
                           ▼
          Layar Konfirmasi Darurat Instan (< 1 Detik)
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
 [Panggil Ambulans / 112]             [Peta Faskes Terdekat]
```

Jalur ini bebas dari formulir panjang, kuesioner AI, atau kalkulasi analitik yang memperlambat penyelamatan nyawa.

---

## 77. Emergency Design Principle

Prinsip perancangan antarmuka darurat:

- **Akses Seketika (*Instant Access*):** Dapat diakses dalam maksimal 1 ketukan dari menu navigasi utama atau layar bantuan.
- **Kontras Tinggi & Ramah Panik (*High Contrast & Calm UX*):** Menggunakan ikon tegas, tombol besar yang mudah ditekan dalam kondisi tangan bergetar, dan teks instruksi singkat yang padat.
- **Bukan Chatbot:** Jangan menampilkan antarmuka percakapan AI saat tombol darurat ditekan; berikan tombol panggil nomor darurat langsung.

---

## 78. Emergency Location Journey

Pencarian fasilitas kesehatan terdekat dalam situasi mendesak:

```text
Akses Bantuan Darurat ──▶ Minta Izin Lokasi GPS Sekali Pakai ──▶ Tampilkan Peta & Daftar Rumah Sakit / Puskesmas Terdekat ──▶ Tombol Navigasi Cepat (Google Maps / Waze) + Nomor Telepon UGD
```

Jika GPS dimatikan, sistem menampilkan daftar kontak darurat nasional standar (112, 118, 119) secara langsung.

---

## 79. Journey 30 — Admin Login

Alur masuk administrator dengan standar keamanan tingkat enterprise:

```text
Portal Admin Terisolasi ──▶ Masukkan Email & Sandi Khusus ──▶ Autentikasi Dua Faktor (2FA / TOTP) ──▶ Verifikasi Sesi & IP Whitelist ──▶ Masuk Dasbor Tata Kelola
```

Setiap sesi admin memiliki batas waktu inaktif (*idle timeout*) maksimal 15 menit sebelum meminta autentikasi ulang.

---

## 80. Journey 31 — Admin User Management

Pengawasan status pengguna dan penegakan tata tertib platform:

```text
Buka Manajemen Pengguna ──▶ Cari Berdasarkan ID / Email ──▶ Periksa Status Akun (Aktif, Ditangguhkan, Terkunci) ──▶ Ambil Tindakan Tata Kelola ──▶ Catat Catatan Audit Resmi
```

Admin tidak memiliki hak untuk membaca catatan percakapan pribadi atau detail medis rahasia pengguna tanpa izin audit kepatuhan khusus.

---

## 81. Journey 32 — Admin Instructor Management

Verifikasi ketat terhadap kredensial tenaga profesional instruktur:

```text
Pengajuan Instruktur Baru ──▶ Tinjau Berkas Ijazah & Sertifikasi Profesi ──▶ Verifikasi Lembaga Penerbit ──▶ Tetapkan Hak Akses Spesialisasi ──▶ Akun Instruktur Diaktifkan
```

Setiap instruktur wajib menyetujui kode etik kerahasiaan data kesehatan sebelum dapat menerima anggota binaan.

---

## 82. Journey 33 — Admin Program Management

Kurasi materi program kesehatan preventif yang tersedia di platform:

```text
Buat / Perbarui Modul Program ──▶ Tinjau Keselarasan Medis (Bebas Mitos / Klaim Bahaya) ──▶ Uji Validitas Konten Bersama Tim Medis ──▶ Terbitkan Program ke Katalog Publik
```

---

## 83. Journey 34 — Admin Challenge Management

Pengelolaan tantangan kebiasaan resmi dari platform:

```text
Rancang Kerangka Tantangan ──▶ Tentukan Metrik Target Harian ──▶ Atur Jadwal Mulai & Berakhir ──▶ Evaluasi Beban Fisik Pengguna ──▶ Buka Pendaftaran Tantangan
```

---

## 84. Journey 35 — Admin Community Moderation

Tata kelola moderasi komunitas untuk menjaga ruang interaksi tetap aman dan saling membangun:

```text
Buka Antrean Moderasi Laporan ──▶ Tinjau Bukti Pelanggaran ──▶ Pilih Tindakan (Abaikan Laporan, Beri Peringatan, Hapus Unggahan, Bekukan Akun) ──▶ Kirim Notifikasi Transparan ke Pihak Terkait
```

---

## 85. Journey 36 — Admin Reporting

Akses terhadap analitik performa kesehatan masyarakat secara agregat (*de-identified*):

```text
Pilih Periode Analitik ──▶ Agregasi Data Tren Tanpa Identitas Pribadi ──▶ Ekspor Laporan Metrik Adherensi & Efektivitas Intervensi ──▶ Catat Jejak Akses Laporan
```

---

## 86. Journey 37 — Data Privacy Request

Alur pengguna dalam meminta salinan data pribadi mereka (*Right of Access / Portability*):

```text
Pengaturan Akun ──▶ Menu Hak Privasi ──▶ Pilih [Ekspor Data Saya] ──▶ Verifikasi Kata Sandi ──▶ Sistem Memproses Arsip Terenkripsi (JSON/PDF) ──▶ Tautan Unduh Aman Dikirim ke Email
```

---

## 87. Journey 38 — Account Deletion

Alur penghapusan akun mandiri (*Right to be Forgotten*):

```text
Pengaturan Akun ──▶ Pilih [Hapus Akun Permanen] ──▶ Konfirmasi Risiko & Konsekuensi ──▶ Masukkan Kata Sandi ──▶ Masa Tenggang Pemulihan (14 Hari) ──▶ Anonymize / Purge Data Permanen
```

Sistem menghapus seluruh data identifikasi pribadi (*PII*) dan menganonimkan log audit agregat sesuai regulasi perlindungan data.

---

## 88. Journey 39 — AI + Behavioral Engine

Sinergi antara Mesin Perilaku dan Asisten AI:

```text
Behavioral Engine Mendeteksi Deviasi Pola ──▶ Menerbitkan Sinyal Terstruktur ──▶ Asisten AI Menerima Ringkasan Sinyal ──▶ AI Menyusun Narasi Edukatif yang Dipersonalisasi ──▶ Member Membaca Penjelasan yang Kontekstual
```

Mesin Perilaku bertindak sebagai analis kuantitatif, sementara AI bertindak sebagai komunikator humanis yang ramah.

---

## 89. Journey 40 — Scanner + Behavioral Engine

Integrasi hasil pindaian kamera dengan pemantauan nutrisi harian:

```text
Scanner Mendeteksi 28g Gula pada Minuman Kemasan ──▶ Member Mengonfirmasi Simpan ──▶ Behavioral Engine Mengagregasi Asupan Gula Mingguan ──▶ Evaluasi Ambang Batas ──▶ Dashboard Menampilkan Barometer Gula
```

---

## 90. Journey 41 — Instructor + Behavioral Engine

Dukungan analitik otomatis untuk meningkatkan efisiensi kerja instruktur:

```text
Engine Mengidentifikasi Anggota Binaan Mengalami Tren Memburuk ──▶ Dasbor Instruktur Menandai Profil dengan Pin Prioritas ──▶ Instruktur Memeriksa Grafik ──▶ Intervensi Personal Diberikan Lebih Awal
```

---

## 91. Journey 42 — AI + Instructor

Kolaborasi harmonis antara kecerdasan buatan dan kepakaran manusia:

```text
Member Berdiskusi dengan AI ──▶ Pertanyaan Mengindikasikan Kebutuhan Program Kebugaran Khusus ──▶ AI Menjelaskan Dasar Teori ──▶ AI Menyarankan: "Konsultasikan rencana ini dengan Coach Sarah" ──▶ Member Membuka Jadwal Temu Instruktur
```

---

## 92. Journey 43 — Full End-to-End Journey

Sintesis perjalanan menyeluruh seorang anggota dari hari pertama hingga tahunan:

```text
Akuisisi Landing Page ──▶ Registrasi & Onboarding ──▶ Pembentukan Baseline 14 Hari ──▶ Deteksi Deviasi Kebiasaan ──▶ Pemahaman via Wawasan & AI ──▶ Bergabung Tantangan Sehat ──▶ Konsultasi Instruktur Terarah ──▶ Pemulihan Pola Hidup ──▶ Pemeliharaan Kebiasaan Seumur Hidup
```

---

## 93. Journey Decision Points

Titik-titik krusial di mana pengguna membuat keputusan kunci yang memengaruhi arah alur:

- **Persetujuan Konteks AI:** Memilih privasi ketat atau bantuan cerdas yang disesuaikan.
- **Penerimaan Rekomendasi:** Memilih menjalankan intervensi mikro hari ini atau menundanya.
- **Partisipasi Tantangan:** Memilih tantangan yang sesuai dengan kesiapan fisik saat ini.
- **Eskalasi Konsultasi:** Memutuskan kapan memerlukan bimbingan langsung dari instruktur.

---

## 94. Journey Error Taxonomy

Klasifikasi standar galat dalam sistem untuk memastikan penanganan yang konsisten:

| Kategori Galat | Contoh Kasus | Strategi Respons Sistem |
| :--- | :--- | :--- |
| **Galat Validasi (Input Error)** | Nilai gula negatif atau jam tidur > 24 jam. | Sorot kolom masukan, berikan panduan nilai yang benar tanpa menghapus data lain. |
| **Galat Otorisasi (Auth Error)** | Sesi kedaluwarsa saat mengisi formulir. | Simpan draf lokal, tampilkan modal masuk cepat, pulihkan draf otomatis. |
| **Galat Jaringan (Network Error)** | Koneksi seluler putus di tengah perjalanan. | Simpan dalam antrean luring (*IndexedDB*), sinkronkan saat jaringan pulih. |
| **Galat Layanan Luar (Service Error)** | Layanan OCR atau LLM mengalami *downtime*. | Tampilkan fallback mode manual, jangan blokir fungsi pencatatan utama. |

---

## 95. Journey Error Recovery

Setiap pesan galat wajib menyertakan tombol aksi pemulihan (*actionable recovery button*):

❌ **Pesan Buruk:** *"Terjadi kesalahan sistem (Kode 500)."*  
✅ **Pesan Baik:** *"Data pencatatan Anda tersimpan aman di perangkat, namun kami belum berhasil mengirimkannya ke server karena kendala jaringan. [Coba Kirim Ulang Sekarang]."*

---

## 96. Journey Loading States

Standar transisi visual saat data sedang dimuat:

- Gunakan tampilan kerangka (*skeleton loaders*) yang mencerminkan struktur konten asli, bukan sekadar spinner putar di layar kosong.
- Tampilkan indikator progres bertahap untuk proses di atas 3 detik (seperti pemindaian dokumen medis atau kalkulasi baseline komprehensif).

---

## 97. Journey Empty States

Layar tanpa data (*empty states*) tidak boleh menjadi jalan buntu, melainkan titik awal yang mengundang aksi:

- **Linimasa Kosong:** *"Anda belum memiliki catatan aktivitas hari ini. [➕ Catat Langkah Kaki Pertama]."*
- **Belum Ada Konsultasi:** *"Belum ada jadwal konsultasi mendatang. Temukan instruktur yang siap mendampingi Anda di [Katalog Instruktur]."*

---

## 98. Journey Accessibility

Seluruh alur antarmuka mematuhi standar aksesibilitas internasional **WCAG 2.1 Level AA**:

- Rasio kontras teks terhadap latar belakang minimal 4.5:1.
- Seluruh tombol dan kontrol formulir dapat dinavigasi sepenuhnya menggunakan papan ketik (*keyboard accessible*).
- Label pembaca layar (*screen reader tags / ARIA*) terpasang pada grafik statistik dan elemen visual.

---

## 99. Journey Mobile Optimization

Perancangan antarmuka mengadopsi filosofi *Mobile-First*:

- Target sentuhan jari (*touch targets*) berukuran minimal 44x44 piksel.
- Navigasi utama diletakkan di bagian bawah layar (*bottom navigation bar*) yang mudah dijangkau satu tangan.
- Menghindari interaksi gestur rumit yang rawan memicu kesalahan pencatatan data.

---

## 100. Journey Navigation Model

Arsitektur navigasi global aplikasi AEVYRA:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        STRUKTUR NAVIGASI UTAMA                         │
├────────────────────────────────────────────────────────────────────────┤
│ [🏠 Beranda]    : Dasbor Harian, Status Baseline, Aksi Cepat           │
│ [📈 Garis Waktu]: Linimasa Aktivitas, Wawasan Perilaku, Log Riwayat    │
│ [🎯 Program]    : Tantangan Kebiasaan, Intervensi, Modul Edukasi       │
│ [👥 Komunitas]  : Ruang Diskusi, Inspirasi Sehat, Forum Terbuka        │
│ [💬 Konsultasi] : Direktori Instruktur, Jadwal Temu, Rekam Bimbingan   │
│ [⚙️ Profil]     : Pengaturan Privasi, Preferensi Akun, Ekspor Data     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 101. Journey Retention Loop

Retensi jangka panjang dibangun melalui siklus nilai positif (*Value-Adding Habit Loop*):

```text
Masuk Aplikasi ──▶ Lihat Kemajuan Nyata ──▶ Terima Wawasan Relevan ──▶ Lakukan Aksi Sehat Mikro ──▶ Dapatkan Umpan Balik Positif ──▶ Terbentuk Penguatan Kebiasaan Diri
```

Pengguna kembali bukan karena kecanduan grafis atau manipulasi notifikasi, melainkan karena merasakan manfaat nyata berupa tubuh yang lebih segar dan pikiran yang lebih tenang.

---

## 102. Journey Completion Metrics

Pengukuran kuantitatif tingkat ketuntasan alur utama:

| Alur Utama | Definisi Keberhasilan Tuntas | Standar Target Produk |
| :--- | :--- | :--- |
| **Pendaftaran & Onboarding** | Akun terverifikasi dan sasaran awal tersimpan. | Tingkat ketuntasan > 85% |
| **Pencatatan Cepat Harian** | Data tersimpan dalam waktu kurang dari 10 detik. | Tingkat keberhasilan > 98% |
| **Penyelesaian Tantangan** | Menyelesaikan minimal 80% hari target tantangan. | Tingkat kelulusan > 65% |
| **Sesi Konsultasi** | Rangkuman dan rencana tindakan diterbitkan instruktur. | Tingkat kepuasan > 90% |

---

## 103. Journey Event Tracking

Setiap peristiwa penting (*telemetry event*) dicatat secara terstandarisasi untuk kebutuhan analitik produk tanpa mengekspos data pribadi (*privacy-preserving*):

- `user_registered` (metode, referal)
- `onboarding_completed` (fokus_sasaran, durasi_detik)
- `health_log_created` (kategori, via_quick_log, via_scanner)
- `baseline_calculated` (kategori, hari_observasi, jumlah_sampel)
- `insight_generated` (jenis_sinyal, tingkat_urgensi)
- `intervention_action_completed` (id_rekomendasi, waktu_eksekusi)
- `consultation_completed` (id_instruktur, topik)

---

## 104. Journey Funnel

Corong konversi pengguna dari pengenalan awal hingga pembentukan kebiasaan mandiri:

```text
Pengunjung Landing Page (100%)
            │
            ▼
    Registrasi Akun (45%)
            │
            ▼
 Selesai Onboarding (38%)
            │
            ▼
Pencatatan 7 Hari Pertama (26%)
            │
            ▼
 Baseline Terbentuk (20%)
            │
            ▼
Aktif Menerima Intervensi & Mandiri (14%)
```

---

## 105. Journey Quality Metrics

Indikator kualitas pengalaman pengguna yang dipantau terus-menerus:

- **Waktu Penyelesaian Alur (*Time-to-Complete*):** Waktu yang dibutuhkan untuk mencatat data harian.
- **Rasio Galat Formulir (*Form Error Rate*):** Persentase kegagalan input pada formulir.
- **Rasio Relevansi Wawasan (*Insight Helpfulness Ratio*):** Persentase pengguna yang menandai wawasan sebagai "Membantu".
- **Net Promoter Score (NPS):** Kepuasan keseluruhan anggota terhadap pendampingan aplikasi.

---

## 106. Journey Drop-off Analysis

Analisis titik henti pengguna (*drop-off checkpoints*) untuk iterasi perbaikan produk:

```text
Titik Kritis 1: Tahap Onboarding ──▶ Jika drop-off tinggi: Pangkas pertanyaan yang tidak esensial.
Titik Kritis 2: Menunggu Baseline (Hari 4-7) ──▶ Jika drop-off tinggi: Berikan konten edukasi mini agar pengguna tidak bosan.
Titik Kritis 3: Pelaksanaan Intervensi ──▶ Jika drop-off tinggi: Turunkan skala kesulitan rekomendasi tindakan.
```

---

## 107. Journey Experimentation

Eksperimen antarmuka (*A/B Testing*) wajib tunduk pada standar etika kesehatan:

- **Eksperimen yang Diizinkan:** Variasi tata letak tombol aksi cepat, variasi gaya visual grafik statistik, dan variasi kata-kata pengingat ramah.
- **Eksperimen yang Dilarang:** Dilarang menguji perbedaan ambang batas keselamatan medis atau menyembunyikan tombol darurat demi kebutuhan eksperimen konversi.

---

## 108. Journey Personalization

Personalisasi alur menyesuaikan dengan tingkat literasi kesehatan dan kebutuhan unik pengguna:

- Pengguna pemula mendapatkan visualisasi sederhana dengan penjelasan analogi ramah.
- Pengguna mahir / antusias kebugaran dapat membuka mode grafik mendalam dengan rincian deviasi standar dan matriks korelasi metrik.

---

## 109. Journey Adaptive Complexity

Kompleksitas antarmuka beradaptasi secara dinamis seiring berkembangnya pemahaman pengguna:

```text
Fase 1 (Minggu 1-2): Sederhana ──▶ Fokus pada konsistensi 1 metrik utama.
Fase 2 (Minggu 3-4): Menengah  ──▶ Mulai menghubungkan 2 metrik (contoh: dampak tidur terhadap energi).
Fase 3 (Bulan 2+): Mahir       ──▶ Akses korelasi multivariat dan optimasi program jangka panjang.
```

---

## 110. Journey Trust Model

Kepercayaan pengguna adalah modal utama platform kesehatan. Model kepercayaan dibangun di atas 4 pilar:

1. **Konsistensi Kebenaran:** Data yang disajikan selalu didasarkan pada catatan riil tanpa fabrikasi angka.
2. **Kejelasan Keterbatasan:** Sistem selalu jujur mengakui keterbatasan akurasi sensor gawai atau model AI.
3. **Ketiadaan Iklan Terselubung:** Rekomendasi tindakan murni untuk kesehatan pengguna, bukan titipan promosi suplemen.
4. **Kepemilikan Mandiri:** Pengguna adalah pemilik tunggal dari data kesehatan mereka.

---

## 111. Journey Privacy Model

Arsitektur privasi menerapkan prinsip **Privacy by Design**:

```text
Data Mentah Kesehatan ──▶ Terenkripsi saat Diam (AES-256) & Transit (TLS 1.3)
                      ──▶ Hak Akses Terisolasi Per-Peran (RBAC)
                      ──▶ Izin Akses Konteks AI Hanya dengan Persetujuan
                      ──▶ Pembagian ke Instruktur Bersifat Spesifik & Sementara
                      ──▶ Seluruh Akses Data Terekam dalam Log Audit Abadi
```

---

## 112. Journey Safety Model

Lapisan keselamatan berjenjang untuk mencegah bahaya medis klinis:

- **Tier 1 (Behavioral):** Menangani kebiasaan gaya hidup biasa (tidur, jalan kaki, minum air).
- **Tier 2 (Attention):** Deviasi berkepanjangan; merekomendasikan penyesuaian atau konsultasi instruktur.
- **Tier 3 (Red Flag / Clinical):** Gejala bahaya; memblokir respons mandiri dan mewajibkan konsultasi medis profesional.
- **Tier 4 (Emergency):** Ancaman darurat jiwa; mengaktifkan tombol panggil ambulans dan faskes terdekat.

---

## 113. Journey Human-in-the-Loop

Kecerdasan buatan dan algoritma sistem tidak pernah menggantikan peran manusia dalam keputusan penting:

- Hasil pindaian nutrisi scanner selalu mewajibkan konfirmasi manual pengguna sebelum disimpan.
- Rekomendasi intervensi intensif selalu dikurasi atau didampingi oleh instruktur manusia terverifikasi.
- Sinyal anomali yang mencurigakan dapat dievaluasi oleh tenaga ahli kesehatan platform.

---

## 114. Journey Interruption

Penanganan kondisi saat pengguna terdistraksi atau menutup aplikasi di tengah suatu proses:

```text
Pengguna Sedang Mengisi Formulir / Sesi ──▶ Aplikasi Tertutup Mendadak (Telepon Masuk / Baterai Habis) ──▶ Data Tersimpan Otomatis di Draf Lokal ──▶ Pengguna Membuka Kembali ──▶ Munculkan Banner: "Lanjutkan pengisian sebelumnya?"
```

---

## 115. Resumable Journey

Seluruh alur panjang (seperti orientasi akun, evaluasi kesehatan berkala, atau perancangan program bimbingan) wajib bersifat *resumable*:

- State progres disimpan di penyimpanan lokal per langkah yang tuntas.
- Pengguna dapat keluar dan melanjutkan di perangkat lain tanpa mengulang dari langkah pertama.

---

## 116. Journey Idempotency

Operasi yang menciptakan entitas penting atau transaksi data wajib menerapkan kunci idempoten (*idempotency key*):

- **Pemesanan Konsultasi:** Mencegah pemotongan kuota ganda jika pengguna menekan tombol booking dua kali secara cepat.
- **Pencatatan Data:** Menjamin entri log dengan pengenal unik yang sama tidak menghasilkan duplikasi catatan di basis data.

---

## 117. Journey Authorization

Otorisasi rute dan data diverifikasi pada setiap permintaan API:

- Member hanya dapat mengakses dan memodifikasi data milik profilnya sendiri (`user_id` context).
- Instructor hanya dapat membaca ringkasan data member yang telah resmi memberikan izin berbagi aktif.
- Admin hanya dapat mengakses fungsi manajerial platform tanpa izin membuka rekaman medis pribadi.

---

## 118. Journey Auditability

Setiap peristiwa penting dalam perjalanan data pengguna dicatat dalam log audit yang tidak dapat diubah (*immutable audit log*):

- Waktu kejadian (*timestamp UTC*).
- Aktor pelaksana (*user ID / admin ID*).
- Alamat IP dan identitas peramban (*User Agent*).
- Jenis peristiwa (*CREATE_LOG, CONSENT_GRANTED, PROFILE_UPDATED, ACCOUNT_DELETED*).

---

## 119. Journey Performance

Standar anggaran kinerja (*performance budget*) demi kenyamanan pengguna:

- Waktu muat awal (*First Contentful Paint*): < 1.5 detik pada jaringan 4G.
- Waktu simpan aksi cepat (*Quick Log API response*): < 200 milidetik.
- Responsivitas antarmuka (*Interaction to Next Paint*): < 100 milidetik.

---

## 120. Journey Offline Behavior

Kemampuan aplikasi saat pengguna berada di area tanpa sinyal internet:

```text
Jaringan Internet Terputus
           │
           ▼
 Antarmuka Menampilkan Indikator Mode Luring Halus
           │
           ▼
 Pengguna Tetap Dapat Mencatat Tidur, Air, & Langkah
           │
           ▼
 Data Disimpan di Antrean Lokal (IndexedDB)
           │
           ▼
 Jaringan Internet Pulih Kembali
           │
           ▼
 Sinkronisasi Otomatis di Latar Belakang Tanpa Konflik
```

---

## 121. Journey PWA Behavior

Integrasi sebagai *Progressive Web App* (PWA) modern:

- **Instalasi Mudah:** Pengguna dapat memasang aplikasi ke layar utama (*Add to Home Screen*) tanpa melalui toko aplikasi konvensional.
- **Pembaruan Tanpa Hambatan:** Layanan pekerja (*Service Worker*) memperbarui aset di latar belakang dan menampilkan banner ringan: *"Versi terbaru AEVYRA telah siap. [Perbarui Sekarang]".*

---

## 122. Canonical Member Story

**Kisah Pengguna Utama: Budi (Mahasiswa Tingkat Akhir, 22 Tahun)**

1. **Masalah:** Budi sering begadang mengerjakan tugas skripsi, mengonsumsi minuman manis tinggi kafein, dan merasa tubuhnya selalu lemas di pagi hari.
2. **Titik Temu:** Budi mendaftar AEVYRA melalui program kesehatan kampusnya.
3. **Fase Awal:** Selama 14 hari pertama, Budi rutin mencatat durasi tidur dan minuman kemasannya via scanner cerdas. Sistem membentuk baseline tidurnya (rata-rata 5 jam 40 menit).
4. **Intervensi:** Sistem mendeteksi bahwa asupan gula tinggi di malam hari berkorelasi kuat dengan penurunan kualitas tidur Budi. Sistem menyarankan tantangan *"7 Hari Bebas Minuman Manis Setelah Pukul 19.00"*.
5. **Hasil Nyata:** Dalam 3 minggu, Budi berhasil menaikkan rata-rata tidurnya menjadi 6 jam 45 menit dan merasa energinya jauh lebih stabil saat kuliah.

---

## 123. Canonical Instructor Story

**Kisah Pengguna Utama: Coach Sarah (Praktisi Kebugaran & Nutrisi, 30 Tahun)**

1. **Peran:** Sarah mengelola 25 anggota binaan aktif di AEVYRA.
2. **Efisiensi:** Setiap pagi, Sarah membuka dasbor instruktur dan langsung melihat daftar prioritas: 2 anggotanya mengalami deviasi tren tidur yang membutuhkan perhatian.
3. **Bimbingan Personal:** Sarah meninjau grafik tren tanpa harus meminta anggota mengetik ulang riwayatnya, lalu mengirimkan catatan intervensi mikro dan menjadwalkan sesi konsultasi daring 15 menit.
4. **Hasil Kolaboratif:** Anggota merasa didampingi secara nyata oleh manusia, meningkatkan kepatuhan rencana hidup sehat hingga 80%.

---

## 124. Canonical Admin Story

**Kisah Pengguna Utama: Dr. Hendra (Administrator Kepatuhan Medis Platform)**

1. **Tanggung Jawab:** Memastikan seluruh materi program, modul AI, dan interaksi komunitas mematuhi standar etika kedokteran preventif.
2. **Aktivitas Rutin:** Dr. Hendra memeriksa antrean verifikasi sertifikasi instruktur baru dan meninjau log guardrail AI untuk memastikan tidak ada keluaran yang melanggar batas non-diagnostik.
3. **Dampak Sistemik:** Menjaga ekosistem AEVYRA tetap menjadi platform yang tepercaya, kredibel, dan aman bagi puluhan ribu pengguna.

---

## 125. Primary Journey Priority

Matriks prioritas implementasi teknis alur perjalanan pengguna:

| Tingkat Prioritas | Alur Perjalanan Pengguna | Alasan Prioritas |
| :--- | :--- | :--- |
| **P0 (Kritis / MVP)** | Registrasi, Onboarding, Pencatatan Cepat, Timeline, Mode Darurat. | Fondasi fungsional agar aplikasi dapat digunakan sejak hari pertama. |
| **P1 (Inti Produk)** | Baseline Personal, Deteksi Deviasi, Wawasan, Rekomendasi Mikro. | Pembeda utama AEVYRA sebagai sistem kesehatan preventif cerdas. |
| **P2 (Layanan Lanjutan)**| Asisten AI Terpandu, Scanner Multimodal, Tantangan Kebiasaan. | Fitur bernilai tambah untuk mendongkrak keterlibatan dan kemudahan. |
| **P3 (Ekosistem Penuh)** | Konsultasi Instruktur, Fitur Komunitas, Mode Luring PWA Lanjut. | Skalabilitas ekosistem kolaborasi manusia dan resiliensi tinggi. |

---

## 126. Journey Acceptance Framework

Sebuah perjalanan pengguna dinyatakan tuntas dan siap rilis (*Ready for Production*) apabila memenuhi kriteria berikut:

- [ ] **Titik Masuk Terdefinisi:** Memiliki rute yang jelas dari navigasi aplikasi atau tautan luar.
- [ ] **Sasaran Pengguna Tercapai:** Pengguna dapat menyelesaikan niat awal tanpa hambatan buntu.
- [ ] **Validasi & Penanganan Galat:** Seluruh input divalidasi dengan pesan ramah dan tombol pemulihan.
- [ ] **Status Antarmuka Lengkap:** Menyediakan status *loading*, *empty*, *success*, dan *error*.
- [ ] **Batas Keselamatan Medis:** Lolos audit kepatuhan non-diagnostik dan perlindungan privasi data.
- [ ] **Telemetri Terpasang:** Seluruh peristiwa analitik kunci tercatat dalam sistem telemetri.

---

## 127. Final Journey Model

Model terpadu perjalanan pengguna AEVYRA merangkum seluruh dinamika interaksi dalam satu kesatuan arsitektur:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               ARSITEKTUR LENGKAP PENGALAMAN PENGGUNA                   │
└────────────────────────────────────────────────────────────────────────┘
  AKUISISI ──▶ REGISTRASI ──▶ ORIENTASI PERSONAL ──▶ LOGGING DATA RUTIN
                                                              │
        ┌─────────────────────────────────────────────────────┘
        ▼
  PEMBENTUKAN BASELINE (14 Hari)
        │
        ▼
  MONITORING PERILAKU KONTINU ──▶ DETEKSI DEVIASI TREN
                                           │
        ┌──────────────────────────────────┘
        ▼
  WAWASAN EDUKATIF BERMAKNA ──▶ ASISTEN AI & SCANNER CERDAS
        │                                  │
        ▼                                  ▼
  REKOMENDASI PREVENTIF MIKRO ◀── BIMBINGAN INSTRUKTUR AHLI
        │
        ▼
  AKSI NYATA & TANTANGAN SEHAT
        │
        ▼
  MONITORING DAMPAK & PERBAIKAN GAYA HIDUP SEUMUR HIDUP
```

---

## 128. Final Principle

> [!IMPORTANT]
> **Prinsip Pamungkas Perjalanan Pengguna:**  
> *"Setiap interaksi di dalam AEVYRA harus membawa pengguna selangkah lebih dekat pada pemahaman diri yang lebih jernih, tindakan pencegahan yang lebih mudah, kebiasaan yang lebih konsisten, atau bantuan profesional yang tepat pada waktunya."*

Perjalanan pengguna AEVYRA bukanlah perpindahan halaman mekanis yang kaku, melainkan sebuah jembatan transformasi perilaku yang mendampingi setiap individu menuju hidup yang lebih berdaya, sehat, dan bermartabat.
