# AEVYRA — Kaidah Antarmuka Pengguna & Pengalaman Pengguna (Frontend Rules)

> [!IMPORTANT]
> **STANDAR REKAYASA ANTARMUKA PRODUKSI (PRODUCTION UI/UX STANDARD)**
> Dokumen ini menetapkan kaidah, filosofi perancangan, standar estetika visual, batasan arsitektural, dan kriteria aksesibilitas wajib (*mandatory frontend requirements*) untuk seluruh komponen antarmuka platform AEVYRA. Antarmuka AEVYRA dirancang khusus untuk memandu pengguna dalam perjalanan kesehatan preventif yang menenangkan, berdaya guna, dan berbasis bukti data biologis yang mudah dipahami (*human-centered preventive health*).

### Ringkasan Eksekutif Arsitektur Antarmuka

Antarmuka pengguna AEVYRA dibangun di atas 4 pilar filosofis utama: **Sederhana (*Simple*)**, **Jelas (*Clear*)**, **Menenangkan (*Calm*)**, dan **Dapat Ditindaklanjuti (*Actionable*)**. Platform kesehatan preventif dilarang keras membanjiri pengguna dengan visual peringatan medis yang menakut-nakuti (*alarmist design*), angka presisi semu (*false precision*), atau grafik data yang rumit tanpa rekomendasi langkah konkret.

Seluruh pengalaman pengguna beroperasi mengikuti siklus tertutup 4 tahap: **Amati (*Observe*) ──► Pahami (*Understand*) ──► Bertindak (*Act*) ──► Pantau (*Monitor*)**. Pendekatan desain mengutamakan layar ponsel pintar terlebih dahulu (*Mobile-First Paradigm*), memanfaatkan sistem desain terpadu berbasis Tailwind CSS, mematuhi standar aksesibilitas universal WCAG 2.1 Level AA, serta memosisikan backend sisi server sebagai pemegang otoritas kebenaran tunggal (*Single Source of Truth*).

---

### Kontrol Dokumen & Metadata Arsitektur

| Parameter Dokumen | Spesifikasi Teknis / Status Resmi |
| :--- | :--- |
| **Nomor Dokumen Standar** | `AEVYRA-RULE-004` |
| **Versi Arsitektur Antarmuka** | `v1.0.0-PROD` (Edisi Standar Produksi & Kompetisi ICONFEST 2026) |
| **Tanggal Efektif Berlaku** | 17 September 2026 |
| **Status Otorisasi** | Resmi Disetujui / Berlaku Mutlak (*Mandatory Architecture Standard*) |
| **Klasifikasi Akses** | Panduan Pengembang Frontend, Desainer UI/UX, & Agen AI (*Internal Development*) |
| **Tumpukan Teknologi Antarmuka** | Blade Components / Vue 3 / React, Tailwind CSS 3.4+, Chart.js, Vite, PWA |
| **Standar Aksesibilitas** | WCAG 2.1 Level AA, Rasio Kontras Teks Minimal 4.5:1, Target Sentuh Minimal 44x44px |
| **Filosofi Visual Inti** | Simple, Clear, Calm, Actionable (Tenang, Elegan, Bebas Panik, & Berorientasi Solusi) |

---

### Matriks 11 Klaster Arsitektur Antarmuka Pengguna Sistem

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                    TOPOLOGI SISTEM DESAIN & PENGALAMAN PENGGUNA AEVYRA                   │
└───────────────────────────────────────────────────────────────────────────────────────────┘
   │
   ├── [Klaster 1] Filosofi Antarmuka, Responsivitas Mobile-First, & Dasbor Peran (Bagian 1 – 10)
   │   └── Simple-Clear-Calm-Actionable, Mobile-First, 5 Breakpoints, Member/Instructor/Admin Dashboards
   │
   ├── [Klaster 2] Sistem Desain Tailwind CSS, Komponen Modular, & Otoritas Backend (Bagian 11 – 16)
   │   └── Semantic Tokens, High Reusability, Single Responsibility, Zero Client Business Rules
   │
   ├── [Klaster 3] Visualisasi Data Kesehatan, Garis Acuan, & Semantik Warna (Bagian 17 – 26)
   │   └── Canonical Units, Missing/Stale Data UX, Personal Baseline Chart, Calm Color Palette
   │
   ├── [Klaster 4] Aksesibilitas (WCAG 2.1 AA), Status Antarmuka, & Formulir (Bagian 27 – 35)
   │   └── Keyboard Navigation, Focus Ring, Loading Skeleton, Empty States, Offline UX, Safe Forms
   │
   ├── [Klaster 5] Pemindai Santapan (Scanner) & Obrolan Asisten AI (Bagian 36 – 42)
   │   └── Viewfinder Camera UX, Confidence Score, Streaming Responses, AI Safety Disclaimer
   │
   ├── [Klaster 6] Bimbingan Instruktur, Gamifikasi Etis, Tantangan, & Notifikasi (Bagian 43 – 49)
   │   └── Consultation Booking, Anti-Anxiety Streaks, Compassionate Gamification, Notification Center
   │
   ├── [Klaster 7] Pusat Privasi, Persetujuan Sadar, Dasbor Admin, & Tabel Data (Bagian 50 – 56)
   │   └── Privacy Hub, Granular Consent, Aggregate Admin Data, Responsive Tables & Cursor Pagination
   │
   ├── [Klaster 8] Integritas Grafik Medis, Dialog Konfirmasi, & Privasi Layar (Bagian 57 – 64)
   │   └── Chart Safety, Non-Diagnostic Labels, Destructive Modal Gates, Push Notification Privacy
   │
   ├── [Klaster 9] Arsitektur Navigasi Lintas Peran, Pencarian, & Izin Perangkat (Bagian 65 – 73)
   │   └── Semantic URLs, Bottom Navigation Bar, In-Context Camera/GPS Permission Onboarding
   │
   ├── [Klaster 10] Umpan Balik Tindakan, Diksi Copywriting Empatis, & Tipografi (Bagian 74 – 84)
   │   └── Toast/Inline Feedback, Non-Blaming Error Copy, Inter/Plus Jakarta Sans, PWA App Shell
   │
   └── [Klaster 11] Ketahanan Luring PWA, Kinerja, Batas Keamanan, & Kaidah Pamungkas (Bagian 85 – 100)
       └── Offline Caching Scope, Core Web Vitals, Data Provenance Badges, Final Sovereign Principle
```

---

## 1. Tujuan & Ruang Lingkup Antarmuka Pengguna (Frontend Purpose & Scope)

Dokumen ini menetapkan standar wajib rekayasa antarmuka pengguna (*frontend engineering*) dan pengalaman pengguna (*UI/UX design requirements*) untuk seluruh aplikasi web dan modul Progressive Web App (PWA) AEVYRA.

Karena AEVYRA beroperasi sebagai platform kesehatan preventif berbasis bukti (*evidence-based preventive health*), antarmuka pengguna memikul tanggung jawab etis dan klinis yang tinggi. Frontend wajib memprioritaskan:

- **Kepercayaan & Keamanan Psikologis (*Trust & Psychological Safety*):** Antarmuka harus memberikan rasa aman, menenangkan, dan bebas dari taktik intimidasi medis (*health anxiety triggers*).
- **Kejelasan Penyajian Bukti Data (*Clarity & Data Grounding*):** Setiap visualisasi metrik biologis, grafik tren, dan wawasan perilaku wajib menyajikan konteks yang jernih, satuan yang baku, dan tautan bukti pendukung yang transparan.
- **Kenyamanan Operasional Tanpa Rintangan (*Accessibility & Usability*):** Mematuhi standar aksesibilitas universal WCAG 2.1 Level AA sehingga dapat diakses dengan mudah oleh pengguna dari beragam usia, kondisi penglihatan, dan keterbatasan mobilitas.
- **Responsivitas & Keandalan Berkelanjutan (*Responsiveness & PWA Reliability*):** Tampilan beradaptasi mulus dari layar ponsel pintar hingga layar lebar desktop, dengan kapabilitas luring (*offline-first*) yang tangguh.
- **Kinerja Eksekusi Ringan (*High Performance & Low Latency*):** Waktu interaksi cepat, perenderan efisien, dan ketiadaan pergeseran tata letak kumulatif (*zero layout shift*).

---

## 2. Filosofi Desain Antarmuka Pengguna (Frontend Design Philosophy)

Desain antarmuka AEVYRA wajib mewujudkan 5 nilai filosofis utama dalam setiap interaksi layar:

1. **Dapat Dipercaya (*Trustworthy*):** Desain visual tampak profesional, stabil, dan berwibawa tanpa unsur sensasionalisme atau klaim muluk-muluk.
2. **Menenangkan (*Calm*):** Palet warna, tipografi, dan ritme ruang dirancang untuk menurunkan kecemasan pengguna, bukan memicu kepanikan saat terjadi fluktuasi metrik harian.
3. **Mendukung & Empatis (*Supportive & Compassionate*):** Bahasa antarmuka dan visualisasi progres mendampingi usaha pengguna secara positif, tanpa nada menghakimi atau mempermalukan (*non-judgmental UX*).
4. **Berbasis Bukti Nyata (*Evidence-Based*):** Seluruh wawasan yang ditampilkan merujuk pada garis acuan kebiasaan personal dan data empiris yang dapat ditelusuri sumbernya.
5. **Dapat Ditindaklanjuti (*Actionable*):** Setiap informasi perubahan status kesehatan selalu dibarengi dengan rekomendasi tindakan mikro harian yang realistis untuk dijalankan.

> [!NOTE]
> Antarmuka AEVYRA bukan dasbor pemantau kegawatdaruratan rumah sakit (*ICU monitor*). Desain harus mengalir tenang, memberikan kejernihan pikiran, dan memicu motivasi berkelanjutan (*long-term preventive adherence*).

---

## 3. Paradigma Ponsel Pintar Pertama (Mobile-First Paradigm)

Sebagai Progressive Web App (PWA) yang ditujukan untuk mendampingi gaya hidup harian pengguna, AEVYRA **wajib dirancang dengan paradigma Ponsel Pintar Pertama (*Mobile-First Design*)**.

Hierarki Prioritas Perancangan Layar:
```text
Layar Ponsel Pintar (Mobile Viewport: 360px – 430px)   [PRIORITAS UTAMA / 100%]
                       │
                       ▼
Layar Tablet & Lipat (Tablet Viewport: 768px – 1024px) [PRIORITAS KEDUA / ADAPTIF]
                       │
                       ▼
Layar Komputer Meja (Desktop Viewport: 1280px – 1440px) [PRIORITAS KETIGA / PRODUKTIF]
```

Kaidah Paradigma Mobile-First:
- Tata letak dasar dirancang untuk genggaman satu tangan (*one-handed thumb zone*).
- Tindakan utama (*primary actions*) dan tombol pemindai kamera diletakkan pada area yang mudah dijangkau ibu jari pengguna.
- Perluasan tata letak ke layar tablet dan desktop dilakukan dengan menyusun kolom secara modular, bukan sekadar meregangkan kartu ponsel menjadi spanduk raksasa yang kosong.

---

## 4. Desain Responsif & Adaptif (Responsive & Adaptive Design)

Seluruh layar utama aplikasi wajib mendukung tata letak responsif yang beradaptasi secara elegan terhadap 3 kategori perangkat utama: ponsel pintar, tablet, dan komputer desktop.

Persyaratan Responsivitas Wajib:
- **Ponsel Pintar (*Mobile*):** Navigasi bilah bawah (*bottom navigation bar*), kontainer kartu vertikal bertumpuk tunggal (*single column*), formulir layar penuh yang nyaman, dan modal berbentuk laci bawah (*bottom sheet drawer*).
- **Tablet:** Tata letak dua kolom adaptif (kolom metrik di kiri, kolom tindakan/wawasan di kanan), memanfaatkan ruang kanvas medium tanpa kepadatan berlebih.
- **Komputer Desktop:** Navigasi bilah sisi (*sidebar navigation*), pembagian kanvas multi-kolom yang seimbang (maksimal lebar kontainer 1280px–1440px), tabel data komprehensif, dan dasbor analitik produktif.
- **Area Sentuh Minimal (*Touch Targets*):** Seluruh elemen tombol interaktif, tautan, dan pemilih tab wajib memiliki area sentuh fisik minimal **44x44 piksel** (disarankan 48x48 piksel) untuk mencegah salah sentuh pada perangkat bergerak.

---

## 5. Titik Henti Responsif Terstandar (Responsive Breakpoints)

Pengembang wajib mematuhi titik henti responsif (*responsive breakpoints*) terstandar dari Tailwind CSS yang telah dikonfigurasi dalam berkas `tailwind.config.js`.

| Token Breakpoint | Ukuran Lebar Minimal | Target Perangkat / Peruntukan Layar |
| :--- | :--- | :--- |
| `sm` | `640px` | Ponsel layar lebar dan mode lanskap. |
| `md` | `768px` | Perangkat tablet portrait dan ponsel lipat terbuka. |
| `lg` | `1024px` | Tablet landscape dan laptop kompak (iPad Pro, Chromebook). |
| `xl` | `1280px` | Layar desktop standar dan monitor kerja. |
| `2xl` | `1536px` | Monitor layar lebar (*wide workstation displays*). |

Dilarang keras menciptakan nilai titik henti ad-hoc atau kueri media CSS kustom (seperti `@media (max-width: 823px)`) di dalam komponen individual. Seluruh variasi tampilan wajib memanfaatkan prefiks utilitas responsif bawaan (`sm:`, `md:`, `lg:`, `xl:`).

---

## 6. Hierarki Visual & Skala Spasi (Visual Hierarchy & Spacing Scale)

Setiap layar antarmuka AEVYRA wajib memiliki hierarki informasi visual (*visual hierarchy*) yang terstruktur secara intuitif sehingga pengguna dalam 3 detik pertama dapat memahami:

1. **Di mana posisi saya saat ini? (*Context & Identity*):** Ditandai oleh judul tajuk halaman yang jelas dan lencana peran aktif (*Workspace Badge*).
2. **Bagaimana status kebiasaan saya saat ini? (*Current State*):** Disajikan melalui kartu ringkasan biomarker utama dan perbandingannya terhadap garis acuan personal (*Personal Baseline*).
3. **Apa tindakan paling penting yang harus saya lakukan sekarang? (*Primary Call-to-Action*):** Ditonjolkan melalui satu tombol tindakan utama beraksen kontras tinggi (misal: "Catat Santapan Siang" atau "Mulai Jalan Kaki 15 Menit").
4. **Di mana saya bisa melihat riwayat atau rincian mendalam? (*Secondary Exploration*):** Disediakan melalui tautan navigasi sekunder atau kartu yang dapat diperluas (*Progressive Disclosure*).

Dilarang menempatkan lebih dari satu tombol tindakan utama berkontras tinggi dalam satu tampilan pandangan layar (*single viewport*) untuk mencegah kebingungan kognitif (*choice paralysis*).

---

## 7. Prinsip Dasbor Anggota AEVYRA (Member Dashboard Principle)

Dasbor Anggota (*Member Dashboard*) adalah ruang kendali personal harian yang wajib dirancang untuk menjawab 4 pertanyaan fundamental anggota:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   4 PERTANYAAN INTI DASBOR ANGGOTA                     │
├───────────────────────────────────┬────────────────────────────────────┤
│ Pertanyaan Anggota                │ Komponen Visual Penjawab           │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Bagaimana baseline normal saya?│ Baseline Indicator Card            │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. Apakah ada sinyal yang berubah?│ Behavioral Insight Alert Banner    │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Apa tindakan mikro hari ini?   │ Daily Micro-Action Checklist       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Apakah saya berada di jalur?   │ Weekly Consistency Trend Graph     │
└───────────────────────────────────┴────────────────────────────────────┘
```

Dasbor anggota dilarang keras diawali oleh tabel angka mentah yang dingin atau penawaran peningkatan paket (*upsell banners*) yang agresif. Fokus utama layar adalah kesadaran diri (*self-awareness*) dan tindakan hari ini.

---

## 8. Prinsip Dasbor Instruktur Kesehatan (Instructor Dashboard Principle)

Dasbor Instruktur Kesehatan (*Instructor Dashboard*) dirancang untuk efisiensi pemantauan profesional dan pendampingan anggota bimbingan.

Dasbor Instruktur wajib memberikan jawaban cepat terhadap 3 kebutuhan operasional:
1. **Siapa saja anggota bimbingan yang membutuhkan perhatian hari ini? (*Triage Prioritization*):** Daftar antrean anggota yang diurutkan berdasarkan adanya sinyal deviasi kebiasaan (misal: lonjakan glukosa setelah makan atau penurunan durasi tidur 3 hari berturut-turut).
2. **Mengapa mereka membutuhkan perhatian? (*Explainable Context*):** Kartu ringkasan deviasi yang menampilkan bukti data empiris dan perbandingan dengan garis acuan anggota bersangkutan.
3. **Tindakan pendampingan apa yang paling tepat diambil? (*Intervention Workflow*):** Tombol aksi cepat untuk mengirimkan pesan pembinaan, menyesuaikan target intervensi mikro, atau menjadwalkan sesi konsultasi tindak lanjut.

---

## 9. Prinsip Dasbor Administrator Sistem (Admin Dashboard Principle)

Dasbor Administrator Sistem (*Admin Dashboard*) dirancang khusus untuk pemantauan kesehatan ekosistem operasional platform secara makro.

Fokus Visual Dasbor Administrator:
- **Metrik Aktivitas Platform Teragregasi:** Jumlah anggota aktif harian (DAU), keterlibatan tantangan mingguan, dan total jam konsultasi berhasil.
- **Kinerja Infrastruktur & AI:** Latensi rata-rata pemrosesan pemindai makanan, ketersediaan model AI, dan utilisasi antrean latar belakang.
- **Kepatuhan Privasi & Keamanan:** Ringkasan log audit forensik, volume permintaan ekspor data, dan insiden akses yang diblokir.

Dasbor administrator dilarang menampilkan daftar rekam medis privat anggota perorangan secara terbuka di halaman beranda admin demi menjaga prinsip kerahasiaan dan kepatuhan hukum UU PDP.

---

## 10. Fondasi Sistem Desain Terpadu (Unified Design System Foundation)

Seluruh komponen visual AEVYRA wajib berakar pada **Sistem Desain Terpadu (*Unified Design System*)** yang konsisten dan dapat diprediksi.

Fondasi Sistem Desain Mencakup Token Baku:
- **Palet Warna Semantik:** Emerald/Teal (Kesehatan preventif & optimal), Slate/Neutral (Struktur antarmuka & teks netral), Amber/Orange (Atensi & deviasi kebiasaan), Rose/Red (Peringatan keselamatan klinis & bahaya), Indigo/Blue (Fitur asisten AI & wawasan).
- **Skala Tipografi Terkalibrasi:** Font sans-serif modern (Inter / Plus Jakarta Sans) dengan rasio skala modular yang nyaman dibaca pada layar ponsel.
- **Skala Spasi Kanonikal 8-Point:** `4px` (0.5), `8px` (1), `12px` (1.5), `16px` (2), `24px` (3), `32px` (4), `48px` (6).
- **Elevasi & Bayangan Atmosferik:** Bayangan lembut multi-lapis (*soft atmospheric shadows*) yang memberikan kedalaman visual elegan tanpa kesan berat.
- **Radius Sudut Lengkung (*Border Radius*):** `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), dan `rounded-full` untuk pil status/avatar.

---

## 11. Implementasi & Konfigurasi Tailwind CSS (Tailwind CSS Implementation)

Aplikasi menggunakan **Tailwind CSS 3.4+** sebagai mesin penata gaya utama secara konsisten di seluruh lapisan komponen.

Kaidah Penggunaan Tailwind CSS:
1. **Utamakan Kelas Utilitas Standar:** Gunakan kelas utilitas resmi Tailwind (`flex`, `grid`, `gap-4`, `p-6`, `bg-white`, `text-slate-900`).
2. **Pemanfaatan Token Tema Terpusat:** Seluruh warna dan font wajib merujuk pada variabel tema di `tailwind.config.js` (contoh: `bg-brand-teal`, `text-health-optimal`), bukan nilai heksadesimal mentah sebaris seperti `bg-[#12a4b8]`.
3. **Ekstraksi Pola Berulang:** Untuk elemen antarmuka yang digunakan puluhan kali (seperti tombol primer atau kartu kontainer), gunakan komponen templat Blade/Vue/React atau direktif `@apply` terkurasi pada berkas CSS utama demi memelihara keterbacaan kode.

---

## 12. Penggunaan Ulang Komponen Modular (Component Reuse & Modularity)

Komponen antarmuka pengguna wajib dirancang dengan prinsip **Kemampuan Penggunaan Ulang yang Tinggi (*High Reusability*)**.

Koleksi Komponen Inti Dapat Digunakan Ulang (*Core Reusable Components*):
- `MetricCard`: Kontainer metrik biometrik (glukosa, tensi, denyut jantung) lengkap dengan nilai, satuan, dan indikator tren.
- `InsightCard`: Kartu wawasan deviasi perilaku dengan indikator derajat keyakinan dan rekomendasi tindakan mikro.
- `BaselineIndicator`: Komponen visual pembanding antara nilai metrik saat ini terhadap rentang garis acuan normal personal.
- `StatusBadge`: Lencana status kategori netral dan bebas kepanikan (Optimal, Stabil, Perlu Perhatian).
- `PrimaryButton`, `SecondaryButton`, `DangerButton`: Tombol interaktif dengan 6 status interaksi lengkap (default, hover, focus, active, disabled, loading spinner).
- `FormInput`, `FormSelect`, `FormTextarea`: Elemen formulir masukan dengan label aksesibel, penanda wajib, dan penampil galat sebaris.
- `ConfirmationModal`: Dialog konfirmasi tindakan sensitif dan destruktif.

Dilarang keras menyalin-rekatkan (*copy-paste*) markup HTML kartu atau tombol yang sama secara berulang di berbagai file tampilan yang berbeda.

---

## 13. Pemisahan Tanggung Jawab Komponen (Component Responsibility Separation)

Setiap komponen antarmuka wajib memiliki **Pemisahan Tanggung Jawab Tunggal (*Single Responsibility Principle*)** yang tegas dan terfokus.

Hindari menciptakan komponen raksasa (*God Components*) yang menggabungkan:
- Pengambilan data API eksternal,
- Manajemen status aplikasi global,
- Validasi logika bisnis kompleks,
- Perenderan kanvas grafik interaktif,
- Penanganan formulir pengiriman data.

Struktur Komponen yang Benar:
```text
┌────────────────────────────────────────────────────────────────────────┐
│ HealthMetricContainer (Komponen Kontainer: Manajemen Status & API)     │
├────────────────────────────────────────────────────────────────────────┤
│   ├── HealthMetricSummaryHeader (Penyaji Judul & Filter Waktu)         │
│   ├── HealthMetricChart (Penyaji Kanvas Grafik Biometrik Murni)        │
│   └── HealthMetricRecentLogsList (Daftar Riwayat Catatan Terakhir)     │
│         └── HealthMetricLogItem (Komponen Baris Rekaman Individual)    │
└────────────────────────────────────────────────────────────────────────┘
```

Komponen presentasional (*dumb components*) hanya menerima data melalui properti (*props*) dan memancarkan kejadian (*events*) ke komponen induk.

---

## 14. Otoritas Tunggal Backend Sisi Server (Backend Single Authority)

Antarmuka pengguna frontend **bukan merupakan otoritas penentu kebenaran (*Frontend is Never the Final Authority*)**.

Frontend dilarang keras menjadi penentu akhir atas:
- Keabsahan sesi autentikasi dan identitas pengguna,
- Status peran pengguna (Member, Instructor, Admin),
- Kalkulasi saldo poin gamifikasi atau kelulusan tantangan,
- Tingkatan langganan keanggotaan dan hak akses fitur (*entitlements*),
- Penilaian klinis atau verifikasi deviasi biomarker biologis.

Seluruh perhitungan nilai, verifikasi hak akses, dan mutasi data dilakukan secara otoritatif oleh backend Laravel. Frontend hanya berfungsi memvalidasi masukan awal secara visual (*UX helper*) dan menyajikan data resmi yang diterima dari API server.

---

## 15. Penanganan Otorisasi Sisi Frontend (Frontend Authorization UX)

Frontend diizinkan menyembunyikan atau menonaktifkan (*disable*) tombol tindakan yang tidak berhak diakses pengguna semata-mata demi memberikan pengalaman pengguna yang bersih dan tidak membingungkan (*UX clarity*).

Namun demikian:
- Penonaktifan tombol di frontend **bukan merupakan mekanisme keamanan**.
- Pengembang frontend wajib mengasumsikan bahwa pengguna jahat dapat mengaktifkan kembali tombol tersebut melalui peramban DevTools atau mengirimkan permintaan HTTP langsung ke API.
- Oleh karena itu, setiap aksi yang dipicu frontend wajib siap menerima respon penolakan otorisasi `HTTP 403 Forbidden` dari backend dan menampilkannya secara anggun melalui notifikasi yang ramah (*graceful notification*).

---

## 16. Penyajian Data Kesehatan Personal (Health Data Presentation)

Penyajian informasi kesehatan dan biomarker biologis wajib dilakukan dengan kehati-hatian tingkat tinggi guna mencegah salah tafsir diagnostik oleh pengguna awam.

Kaidah Penyajian Data Kesehatan:
1. **Sertakan Konteks Waktu & Kondisi:** Angka glukosa darah wajib mencantumkan status pengambilan (misal: "Puasa", "1 Jam Setelah Makan Siang", atau "Sewaktu").
2. **Bandingkan dengan Garis Acuan Personal:** Selalu tampilkan angka saat ini berdampingan dengan rentang acuan normal individu pengguna (*Personal Baseline*), bukan sekadar rentang populasi umum.
3. **Hindari Visual Alarmis Merah Menyala:** Dilarang menggunakan warna merah terang menyala atau ikon sirine/tengkorak untuk fluktuasi biomarker non-kritis. Gunakan warna jingga/amber lembut dengan label "Perlu Perhatian".
4. **Jelaskan Makna di Balik Angka:** Lengkapi angka biometrik dengan kalimat penjelas singkat dalam bahasa awam yang menenangkan (contoh: *"Glukosa Anda sedikit di atas rata-rata biasanya setelah santap siang tinggi karbohidrat"*).

---

## 17. Tampilan Satuan Pengukuran Standar (Unit Display Standardization)

Setiap metrik biologis, ukuran antropometri, kuantitas nutrisi, dan durasi kebiasaan **wajib selalu menampilkan satuan pengukuran resmi (*Canonical Unit Display*)**.

Standar Satuan Baku AEVYRA:
- Glukosa Darah: `mg/dL` (atau `mmol/L` sesuai preferensi regional terdaftar)
- Tekanan Darah: `mmHg` (contoh: `120/80 mmHg`)
- Denyut Jantung: `bpm` (denyut per menit)
- Berat Badan & Tinggi Badan: `kg` dan `cm`
- Asupan Energi & Zat Gizi: `kkal`, `g` (gram), `mg` (miligram)
- Durasi Tidur & Aktivitas: `jam`, `menit`

Dilarang keras menampilkan angka metrik telanjang tanpa satuan (misal hanya menampilkan angka "120" tanpa label "mg/dL" atau "mmHg") karena dapat menimbulkan kebingungan interpretasi yang berbahaya bagi pengguna.

---

## 18. Penanganan Kondisi Data Hilang (Missing Data Handling)

Antarmuka pengguna wajib membedakan secara tegas antara kondisi **Data Bernilai Nol (*Value = 0*)**, **Data Belum Dicatat (*Missing Data*)**, dan **Data Sedang Dimuat (*Loading Data*)**.

```text
❌ KELIRU & BERBAHAYA:
Glukosa Darah: 0 mg/dL  ──► (Pengguna mengira glukosa mereka nol/koma hipoglikemik!)

✅ TEPAT & AMAN:
Glukosa Darah: -- mg/dL
Keterangan: "Belum ada catatan hari ini. Ketuk untuk mencatat."
```

Standar Tampilan Data Tidak Tersedia:
- Gunakan simbol em-dash ganda (`--`) atau placeholder teks netral alih-alih angka nol (`0`).
- Sertakan teks panduan simpatik yang menjelaskan bahwa data belum tersedia dan ajakan tindakan ringan untuk mencatat.

---

## 19. Penanganan Kondisi Data Usang (Stale Data Presentation)

Apabila data kesehatan yang ditampilkan sudah lama tidak diperbarui oleh pengguna (*Stale Data*), antarmuka wajib mengomunikasikan tingkat kesegaran data (*Data Freshness Indicator*) secara transparan.

Standar Komunikasi Data Usang:
- Tampilkan stempel waktu relatif yang jelas: *"Terakhir dicatat 5 hari yang lalu"* atau *"Data per 12 September 2026"*.
- Jika metrik vital belum diperbarui lebih dari 7 hari, tampilkan kartu pengingat lembut (*gentle nudge card*): *"Pembaruan metrik berkala membantu AEVYRA mendeteksi perubahan pola tubuh Anda secara lebih akurat"*.
- Jangan menyajikan data usang seolah-olah data tersebut mencerminkan kondisi fisiologis tubuh pengguna pada detik ini.

---

## 20. Antarmuka Garis Acuan Personal (Personal Baseline UI)

Garis Acuan Personal (*Personal Baseline*) adalah pilar pembeda utama AEVYRA dari aplikasi kesehatan generik. Antarmuka wajib memvisualisasikan perbandingan metrik terhadap garis acuan personal secara eksplisit.

Struktur Komponen Garis Acuan Personal:
```text
┌────────────────────────────────────────────────────────────────────────┐
│ GLUKOSA DARAH PUASA                                                    │
├────────────────────────────────────────────────────────────────────────┤
│ Nilai Hari Ini     : 108 mg/dL                                         │
│ Garis Acuan Anda   : 92 – 102 mg/dL (Rata-rata 30 hari stabil)         │
│ Status Relatif     : +6 mg/dL di atas rentang acuan normal Anda        │
│ Indikator Visual   : [====|===●===|====] (Titik berada di ambang atas) │
└────────────────────────────────────────────────────────────────────────┘
```

Penjelasan visual ini menyadarkan anggota bahwa tubuh setiap manusia unik dan deviasi dievaluasi terhadap sejarah biologis diri mereka sendiri, bukan angka rata-rata populasi dunia yang kaku.

---

## 21. Kartu Wawasan Deviasi Perilaku (Behavioral Insight Card)

Kartu Wawasan Deviasi Perilaku (*Behavioral Insight Card*) adalah komponen antarmuka paling bernilai dalam ekosistem AEVYRA.

Kartu Wawasan wajib memuat 4 Elemen Pokok yang utuh:
1. **Pernyataan Observasi Fakta (*Headline Observation*):** Judul ringkas berbasis data objektif (contoh: *"Ritme tidur bergeser 1,5 jam lebih larut dalam 3 malam terakhir"*).
2. **Konteks & Makna Fisiologis (*Context & Explanation*):** Penjelasan singkat mengapa perubahan ini berdampak pada tubuh (contoh: *"Pergeseran jam tidur dapat memengaruhi sensitivitas insulin dan rasa lapar di pagi hari"*).
3. **Bukti Data Pendukung (*Grounded Evidence*):** Visualisasi mini grafik tren atau kutipan stempel waktu catatan yang mendasari wawasan tersebut.
4. **Rekomendasi Tindakan Mikro (*Actionable Micro-Step*):** Satu langkah nyata yang dapat dilakukan hari ini (contoh: *"Matikan layar gawai 30 menit sebelum tidur malam ini"* dilengkapi tombol pintas pengingat).

---

## 22. Antarmuka Keterjelasan Bukti Data (Explainability UI)

Setiap wawasan kesehatan atau peringatan yang dihasilkan oleh mesin kecerdasan buatan dan analisis perilaku wajib memiliki **Antarmuka Keterjelasan Bukti Data (*Explainability UI*)**.

Pengguna berhak menekan tombol *"Mengapa saya melihat wawasan ini?"* yang membuka dialog penjelas transparan:
- **Data Sumber yang Dianalisis:** Menampilkan rentang data yang menjadi dasar kalkulasi (contoh: *"Berdasarkan 7 catatan log santapan dan 5 catatan glukosa antara 10–16 September"*).
- **Logika Algoritma Deterministik:** Menjelaskan aturan yang terpicu (contoh: *"Terdeteksi deviasi lebih dari 15% dari baseline rata-rata Anda"*).
- **Penegasan Bukan Vonis:** Menyertakan penafian ramah bahwa wawasan ini adalah pengamatan tren kebiasaan, bukan vonis kondisi medis patologis.

---

## 23. Antarmuka Skor Perilaku Kesehatan (Health Behavior Score UI)

Dalam menyajikan indikator skor komposit gaya hidup, antarmuka pengguna wajib menggunakan terminologi yang tepat dan bertanggung jawab:

```text
✅ TERMINOLOGI TEPAT & AMAN:
- "Skor Konsistensi Gaya Hidup Sehat"
- "Indeks Kepatuhan Kebiasaan Harian"
- "Skor Keteraturan Pola Hidup"

❌ TERMINOLOGI KELIRU & MENYESATKAN:
- "Skor Kesehatan Tubuh Anda" (Mengesankan diagnosis kondisi organ riil)
- "Indeks Bebas Penyakit" (Klaim medis palsu)
```

Skor perilaku kesehatan mengukur **konsistensi tindakan preventif pengguna**, bukan status kesehatan organ biologis secara mutlak. Visualisasi skor wajib disertai teks bantuan yang menjelaskan faktor pembentuk skor (tidur, nutrisi, hidrasi, aktivitas).

---

## 24. Tren & Trajektori Skor Kesehatan (Score Trend & Trajectory)

Penyajian skor kebiasaan wajib mengutamakan **Tren & Trajektori Jangka Panjang (*Score Trend & Trajectory*)** daripada fluktuasi angka harian semata.

Kaidah Visualisasi Tren:
- Tampilkan trajektori 7 hari atau 30 hari: **Meningkat (*Improving*)**, **Stabil (*Stable*)**, atau **Perlu Penyesuaian (*Needs Focus*)**.
- Gunakan ikon panah lembut dan indikator persentase perubahan mingguan yang wajar.
- Cegah kecemasan pengguna atas penurunan skor minor harian (misal turun 2 poin dari 85 ke 83) dengan menyajikan pesan penenang: *"Fluktuasi harian adalah hal yang alami dalam pembentukan kebiasaan hidup"*.

---

## 25. Status Risiko & Perhatian Tanpa Panik (Calm Risk & Attention States)

Status risiko dan perhatian perilaku pada antarmuka AEVYRA wajib menggunakan sistem label yang tenang, empatis, dan bebas dari kepanikan visual (*Calm Risk & Attention States*).

| Tingkat Status | Label Antarmuka Resmi | Warna Visual & Ikonografi | Diksi Penjelas |
| :--- | :--- | :--- | :--- |
| **Optimal** | `Pola Sangat Baik` | Hijau Zamrud / Emerald, Ikon Centang Lembut | *"Kebiasaan Anda sangat konsisten dan mendukung kebugaran tubuh."* |
| **Stabil** | `Pola Stabil` | Biru / Indigo, Ikon Gelombang Seimbang | *"Pola harian Anda terjaga stabil dalam rentang normal personal."* |
| **Perhatian** | `Perlu Perhatian` | Jingga / Amber, Ikon Lingkaran Info Lembut | *"Terdeteksi sedikit pergeseran dari kebiasaan biasanya. Mari tinjau bersama."* |
| **Klinis/Darurat** | `Konsultasikan ke Dokter` | Merah Marun Lembut, Ikon Palang Medis | *"Sinyal ini berada di luar rentang aman mandiri. Disarankan pemeriksaan medis."* |

---

## 26. Semantik Palet Warna Antarmuka (Interface Color Semantics)

Aplikasi melarang keras menggunakan warna sebagai **satu-satunya media penyampai informasi status (*Color Blindness Accessibility - WCAG 1.4.1*)**.

Pengguna dengan keterbatasan penglihatan warna (seperti buta warna protanopia atau deuteranopia) tidak dapat membedakan merah dan hijau murni. Oleh karena itu, setiap indikator status wajib menggabungkan 3 elemen:

```text
❌ KELIRU (HANYA MENGANDALKAN WARNA):
[ Lingkaran Merah Polos ] ──► Pengguna buta warna tidak tahu apakah ini galat, peringatan, atau sekadar aksen.

✅ AMAN & AKSESIBEL (WARNA + IKON + TEKS STATUS):
[ Lingkaran Amber ] + [ Ikon Tanda Seru ] + "Perlu Penyesuaian: Glukosa di atas baseline"
```

Seluruh lencana status dan kartu metrik wajib menyertakan teks keterangan eksplisit dan ikon semantik yang dapat diidentifikasi secara mandiri tanpa bergantung pada persepsi warna.

---

## 27. Aksesibilitas Universal Terpadu (Universal Accessibility - WCAG 2.1 AA)

Seluruh komponen interaktif AEVYRA wajib memenuhi kriteria aksesibilitas universal **WCAG 2.1 Level AA**.

Kriteria Aksesibilitas Wajib:
1. **Dukungan Navigasi Papan Ketik Penuh (*Keyboard Navigation*):** Seluruh elemen yang dapat diklik (tombol, tautan, input formulir, tab navigasi, dan kontrol modal) wajib dapat dijangkau dan dioperasikan menggunakan tombol `Tab`, `Enter`, `Space`, dan `Escape`.
2. **Cincin Fokus Visual Kontras Tinggi (*High-Contrast Focus Rings*):** Elemen yang sedang menerima fokus wajib menampilkan indikator visual yang tegas (contoh: `focus:ring-2 focus:ring-brand-teal focus:ring-offset-2`). Dilarang keras mematikan outline fokus (`outline: none`) tanpa pengganti visual yang memadai.
3. **Struktur HTML Semantik Murni:** Gunakan elemen asli browser (`<button>`, `<a>`, `<input>`, `<nav>`, `<main>`, `<article>`) alih-alih membuat tombol tiruan dari elemen `<div onclick="...">`.
4. **Pembaca Layar Ramah (*Screen Reader ARIA*):** Gunakan atribut ARIA (`aria-expanded`, `aria-haspopup`, `aria-label`) pada komponen kustom yang tidak memiliki semantik bawaan.

---

## 28. Aksesibilitas Elemen Formulir (Form Accessibility & Labels)

Setiap kontrol formulir masukan wajib memiliki label teks yang terhubung secara eksplisit dan aksesibel (*Form Accessibility & Explicit Labeling*).

Kaidah Aksesibilitas Formulir:
- **Tautan Eksplisit `for` dan `id`:** Setiap elemen `<label for="input_id">` wajib merujuk secara tepat ke `<input id="input_id">`.
- **Larangan Placeholder sebagai Pengganti Label:** Placeholder teks di dalam kotak isian dilarang digunakan sebagai satu-satunya label formulir karena akan menghilang saat pengguna mulai mengetik.
- **Penanda Kolom Wajib (*Required Indicators*):** Kolom yang wajib diisi harus ditandai dengan tanda bintang merah dan atribut `aria-required="true"`.
- **Keterhubungan Pesan Galat (*aria-describedby*):** Pesan kesalahan validasi di bawah input wajib dihubungkan ke input melalui `aria-describedby="error_input_id"` dan ditandai `aria-invalid="true"`.

---

## 29. Desain Status Galat Sistem (Error State Design)

Setiap layar dan komponen yang berinteraksi dengan server wajib memiliki desain **Status Galat Sistem (*Error State Design*)** yang dipersiapkan secara matang.

Elemen Wajib pada Status Galat Antarmuka:
1. **Ilustrasi atau Ikon Simpatik:** Visual penenang yang tidak menakutkan (bukan tanda silang merah raksasa atau tengkorak).
2. **Penjelasan Bahasa Manusia yang Jelas (*Non-Blaming Explanation*):** Jelaskan apa yang terjadi tanpa membebankan kesalahan pada pengguna (contoh: *"Kami tidak dapat memuat grafik tren Anda saat ini karena kendala jaringan"*).
3. **Tombol Pemulihan Mandiri (*Actionable Recovery CTA*):** Sediakan tombol utama untuk mencoba kembali (`"Muat Ulang Data"`) dan tombol sekunder (`"Kembali ke Beranda"`).

Dilarang membiarkan layar menjadi putih kosong (*white screen of death*) atau menampilkan string kode galat mentah ketika permintaan API gagal.

---

## 30. Desain Status Pemuatan Progresif (Loading & Shimmer State)

Untuk menjaga persepsi kecepatan dan stabilitas visual antarmuka (*Perceived Performance*), aplikasi wajib menggunakan strategi umpan balik pemuatan yang tepat:

- **Kerangka Berdenyut (*Skeleton Shimmer Loading*):** Wajib digunakan saat memuat tata letak halaman utama, daftar kartu wawasan, atau grafik biometrik. Bentuk skeleton harus mencerminkan struktur kartu yang akan muncul guna mencegah pergeseran tata letak kumulatif (*Cumulative Layout Shift - CLS*).
- **Pemutar Mini (*Button Spinner*):** Digunakan di dalam tombol saat proses penyimpanan data atau pengiriman formulir berlangsung, dengan menonaktifkan tombol secara sementara agar tidak terjadi klik ganda (*double submit*).
- **Larangan Spinner Layar Penuh (*No Full-Screen Blocking Spinners*):** Hindari memblokir seluruh layar dengan pemutar raksasa jika hanya satu bagian kartu data yang sedang dimuat.

---

## 31. Desain Status Ruang Kosong (Empty State Design)

Ketika seorang pengguna baru membuka aplikasi atau belum memiliki data rekaman pada suatu modul, antarmuka wajib menyajikan **Desain Status Ruang Kosong (*Empty State Design*)** yang mendidik dan memotivasi.

```text
❌ STATUS KOSONG BURUK:
"Tidak ada data." (Layar abu-abu kosong membingungkan pengguna)

✅ STATUS KOSONG EDUKATIF & MENGUNDANG (AEVYRA STANDARD):
[ Ilustrasi Pemindai Makanan Ramah ]
Judul    : "Jurnal Makanan Anda Masih Kosong"
Deskripsi: "Mencatat santapan pertama Anda membantu AEVYRA memetakan respon glukosa harian Anda secara akurat."
Tombol   : [ Pindai Makanan Pertama Saya ]
```

Status kosong harus selalu mengarahkan pengguna pada tindakan pertama yang bermanfaat untuk memulai perjalanan kesehatan preventifnya.

---

## 32. Desain Status Data Parsial (Partial Data State Design)

Dalam kondisi nyata, seringkali pengguna baru mencatat sebagian metrik (misal: sudah mencatat glukosa darah, namun belum memiliki data jam tidur atau log makanan).

Antarmuka wajib mendukung **Desain Status Data Parsial (*Partial Data State*)**:
- Tampilkan metrik yang sudah ada dengan visualisasi penuh dan wawasan relevan.
- Untuk metrik yang belum ada, tampilkan kartu ajakan bertahap (*onboarding prompt card*): *"Lengkapi catatan jam tidur malam ini untuk membuka wawasan korelasi ritme sirkadian"*.
- Sistem dilarang merusak tata letak dasbor atau menampilkan galat hanya karena beberapa atribut profil kesehatan belum terisi lengkap.

---

## 33. Penanganan Kegagalan Jaringan (Network Failure Handling)

Sebagai Progressive Web App (PWA), antarmuka pengguna wajib menangani kondisi kegagalan jaringan internet (*Network Failure Handling*) secara elegan:

Kaidah Penanganan Kegagalan Jaringan:
1. **Spanduk Status Koneksi Halus:** Tampilkan spanduk mengambang (*floating banner*) saat koneksi terputus: *"Mode Luring Aktif — Anda tetap dapat melihat data tersimpan dan mencatat jurnal baru"*.
2. **Penyimpanan Draf Masukan:** Jika pengguna sedang mengisi formulir log santapan saat jaringan terputus, formulir tidak boleh di-reset. Simpan data di memori klien dan sinkronkan saat jaringan pulih.
3. **Bukan Halaman Dinosaurus:** Jangan pernah membiarkan peramban menampilkan halaman galat koneksi bawaan peramban (*browser offline error*). Sajikan cangkang aplikasi (*App Shell*) PWA yang tetap berfungsi.

---

## 34. Batasan Pembaruan Antarmuka Optimistik (Optimistic UI Boundaries)

Pembaruan antarmuka secara optimistik (*Optimistic UI Updates* — memperbarui visual sebelum server mengonfirmasi) hanya boleh diterapkan pada **tindakan berisiko rendah yang dapat dibatalkan secara aman (*Safe Reversible Actions*)**.

| Kategori Tindakan | Pembaruan Optimistik? | Alasan Arsitektural |
| :--- | :--- | :--- |
| **Menandai Ceklis Kebiasaan Harian** | ✅ DIIZINKAN | Dampak visual instan memberi motivasi; jika gagal, status centang dapat dikembalikan dengan notifikasi lembut. |
| **Menyukai Diskusi Komunitas** | ✅ DIIZINKAN | Perubahan visual instan meningkatkan persepsi responsivitas antarmuka. |
| **Pencatatan Glukosa / Biomarker** | ❌ DILARANG | Data kesehatan adalah catatan medis resmi. Wajib menunggu validasi & konfirmasi penyimpanan server. |
| **Pemesanan Sesi Konsultasi** | ❌ DILARANG | Slot jadwal melibatkan ketersediaan orang lain dan potensi tabrakan (*double booking*). |
| **Transaksi Pembayaran / Upgrade** | ❌ DILARANG | Status finansial wajib bersumber otoritatif dari webhook server. |

---

## 35. Keamanan & Integritas Formulir Kesehatan (Health Form Safety)

Formulir pengisian data biometrik dan kesehatan wajib menerapkan mekanisme pengamanan ganda guna mencegah salah input data oleh pengguna (*Health Form Safety*).

Mekanisme Pengamanan Formulir Kesehatan:
- **Tampilan Satuan Baku Permanen:** Tampilkan satuan (contoh: `mg/dL`) tepat di samping kotak input teks agar pengguna tidak salah memasukkan skala.
- **Pemberitahuan Ambang Batas Biologis Masuk Akal:** Jika pengguna memasukkan angka ekstrem (misal glukosa: 25 mg/dL atau 800 mg/dL), tampilkan dialog konfirmasi lembut: *"Angka yang Anda masukkan (25 mg/dL) tergolong sangat rendah. Mohon pastikan angka ini sudah sesuai dengan alat glukometer Anda"*.
- **Tombol Konfirmasi Sadar:** Untuk tindakan penghapusan riwayat medis, gunakan dialog konfirmasi eksplisit dengan mengetikkan kata konfirmasi atau tombol bersyarat.

---

## 36. Antarmuka Pemindai Santapan Kamera (Food Scanner Camera UI)

Antarmuka Pemindai Makanan (*Food Scanner Camera UI*) wajib dirancang dengan alur kerja visual yang sederhana, intuitif, dan responsif.

Alur Kerja Antarmuka Pemindai:
```text
[1] Bidik Kamera (Viewfinder dengan Bingkai Fokus Makanan)
                         │
                         ▼
[2] Tombol Tangkap Citra / Unggah dari Galeri
                         │
                         ▼
[3] Pratinjau Citra Santapan & Opsi Potong (*Crop*)
                         │
                         ▼
[4] Layar Analisis AI dengan Animasi Radar Halus
                         │
                         ▼
[5] Kartu Hasil Estimasi Nutrisi (Dapat Diedit Manual)
                         │
                         ▼
[6] Konfirmasi Simpan ke Jurnal Harian
```

Layar bidik kamera dilarang memuat elemen navigasi yang rumit. Tombol penangkap foto berukuran besar diletakkan di bagian bawah tengah layar yang mudah dijangkau satu tangan.

---

## 37. Penyajian Derajat Keyakinan Pemindai (Scanner Confidence Presentation)

Estimasi zat gizi hasil pemindaian kecerdasan buatan memiliki derajat kepastian yang bervariasi. Antarmuka wajib menampilkan **Derajat Keyakinan Pemindai (*Scanner Confidence Presentation*)** secara transparan.

Standar Komunikasi Derajat Keyakinan:
- **Derajat Keyakinan Tinggi (*High Confidence*):** *"Terdeteksi sebagai Nasi Goreng Telur (Keyakinan Tinggi)"* disajikan dengan indikator centang hijau zamrud.
- **Derajat Keyakinan Rendah (*Low Confidence*):** *"Tampak seperti Semur Daging atau Rendang (Perlu Konfirmasi)"* disajikan dengan indikator tanda tanya kuning dan daftar pilihan alternatif masakan.
- **Kemudahan Koreksi Mandiri:** Pengguna harus selalu diberikan tombol satu ketukan (*one-tap edit*) untuk mengubah porsi atau mengganti nama makanan sebelum data disimpan ke jurnal.

---

## 38. Penanganan Galat Pemindaian Santapan (Scanner Error State Handling)

Ketika pemrosesan citra makanan gagal mengenali objek santapan karena pencahayaan buruk atau foto buram, antarmuka wajib menyajikan **Penanganan Galat Pemindaian yang Solutif (*Scanner Error State*)**.

Standar Penanganan Galat Pemindai:
```text
┌────────────────────────────────────────────────────────────────────────┐
│ Makanan Tidak Terdeteksi Jelas                                         │
├────────────────────────────────────────────────────────────────────────┤
│ Foto yang Anda ambil tampak sedikit buram atau terpotong.              │
│ Tips: Pastikan piring santapan berada di tempat dengan cahaya cukup.   │
├────────────────────────────────────────────────────────────────────────┤
│ [ Ambil Foto Ulang ]                  [ Catat Manual Nutrisi ]         │
└────────────────────────────────────────────────────────────────────────┘
```

Pengguna tidak boleh dibiarkan buntu; selalu sediakan alternatif pencatatan nutrisi secara manual melalui pencarian teks.

---

## 39. Antarmuka Sesi Obrolan Asisten AI (AI Assistant Chat UI)

Antarmuka obrolan asisten AI (*AI Assistant Chat UI*) wajib secara tegas menampilkan identitas bahwa pengguna sedang **berinteraksi dengan kecerdasan buatan, bukan dokter manusia**.

Kaidah Antarmuka Obrolan AI:
1. **Lencana Identitas AI Permanen:** Header sesi obrolan wajib menampilkan lencana `Asisten AI AEVYRA` dengan ikon robot/bintang cerdas, bukan foto profil dokter manusia berjas putih.
2. **Chip Rekomendasi Pertanyaan Awal (*Prompt Chips*):** Sediakan 3–4 tombol pertanyaan pemantik di awal obrolan (contoh: *"Mengapa glukosa saya melonjak kemarin?"*, *"Saran camilan ramah metabolik"*).
3. **Penafian Batas Keselamatan Terlihat:** Tampilkan teks penafian permanen di bagian bawah: *"Asisten AI memberikan edukasi gaya hidup preventif berbasis data Anda, bukan diagnosis medis resmi."*

---

## 40. Batas Keselamatan Pesan AI (AI Message Safety Boundaries)

Peringatan keselamatan kesehatan (*Health-Safety Context*) pada percakapan AI wajib disajikan **melekat secara kontekstual di dekat pesan terkait (*In-Context Safety Notes*)**, bukan disembunyikan sebagai catatan kaki di akhir percakapan.

Kaidah Pesan Keselamatan AI:
- Jika AI membahas batas glukosa darah tinggi, sematkan kartu mini berwarna amber di bawah gelembung pesan AI: *"Catatan: Apabila Anda mengalami gejala pusing atau mual berat, segera hubungi fasilitas kesehatan terdekat."*
- Sediakan tombol eskalasi langsung ke instruktur manusia: *"Ingin mendiskusikan pola ini dengan Instruktur Anda? [Jadwalkan Konsultasi]"*.

---

## 41. Status Pemuatan Respons AI (AI Loading & Streaming State)

Pemrosesan model bahasa kecerdasan buatan dapat memakan waktu beberapa detik. Antarmuka wajib memberikan umpan balik pemuatan respons yang hidup dan menenangkan.

Kaidah Pemuatan Respons AI:
- Gunakan perenderan teks bertahap (*Streaming Response token-by-token*) jika backend mendukung Server-Sent Events (SSE).
- Jika streaming tidak tersedia, gunakan animasi denyut titik tiga lembut (*Three-Dot Typing Animation*) dengan teks pendamping: *"Sedang menganalisis catatan kebiasaan Anda..."*.
- Jangan biarkan pengguna menunggu lebih dari 3 detik tanpa ada indikasi visual bahwa asisten sedang memproses jawaban.

---

## 42. Penanganan Kegagalan Layanan AI (AI Failure & Degradation State)

Apabila layanan API model AI eksternal (seperti Google Gemini) mengalami pemadaman (*outage*) atau waktu habis (*timeout*), antarmuka wajib melakukan **Degradasi Anggun (*Graceful Degradation*)**.

Standar Penanganan Kegagalan AI:
```text
┌────────────────────────────────────────────────────────────────────────┐
│ Asisten AI Sedang Mengalami Kendala Koneksi                            │
├────────────────────────────────────────────────────────────────────────┤
│ Kami sedang memulihkan koneksi ke mesin wawasan cerdas kami.           │
│ Tenang, seluruh grafik baseline dan aturan preventif deterministik     │
│ Anda tetap aktif dan dapat diakses dengan normal.                      │
├────────────────────────────────────────────────────────────────────────┤
│ [ Coba Kirim Ulang Pesan ]            [ Tanya Instruktur Manusia ]     │
└────────────────────────────────────────────────────────────────────────┘
```

Aplikasi tidak boleh terhenti total hanya karena fitur obrolan AI sedang tidak tersedia.

---

## 43. Antarmuka Komunikasi dengan Instruktur (Instructor Chat UI)

Antarmuka komunikasi antara anggota dan instruktur kesehatan manusia (*Instructor Chat UI*) wajib menampilkan transparansi identitas dan ekspektasi waktu respon yang wajar.

Elemen Wajib pada Antarmuka Chat Instruktur:
- Nama lengkap dan gelar profesional instruktur terverifikasi (contoh: *"dr. Nadia Paramita, Sp.GK — Instruktur Bersertifikasi"*).
- Lencana status hubungan penugasan (*Active Assigned Instructor*).
- Ekspektasi Waktu Respon: *"Instruktur biasanya membalas dalam waktu 2–4 jam pada jam kerja (08.00–17.00 WIB)"*.
- Penegasan Saluran Non-Darurat: Pengingat jelas bahwa ruang obrolan instruktur bukan saluran panggilan darurat medis (119).

---

## 44. Antarmuka Reservasi Sesi Konsultasi (Consultation Booking UI)

Alur kerja reservasi sesi konsultasi video/tatap muka (*Consultation Booking UI*) wajib dirancang dalam 4 langkah terpandu (*stepper workflow*) yang jelas:

```text
[Langkah 1] Pilih Instruktur (Spesialisasi & Profil Keahlian)
                         │
                         ▼
[Langkah 2] Pilih Tanggal & Slot Waktu yang Tersedia
                         │
                         ▼
[Langkah 3] Pilih Topik Konsultasi (Nutrisi / Tidur / Hasil Lab)
                         │
                         ▼
[Langkah 4] Tinjau Rincian Reservasi & Konfirmasi
```

Setiap langkah menyajikan indikator kemajuan yang jelas dan tombol kembali tanpa menghapus data yang telah dipilih pada langkah sebelumnya.

---

## 45. Halaman Bukti Konfirmasi Pemesanan (Booking Confirmation Screen)

Setelah reservasi sesi konsultasi berhasil diverifikasi oleh server, antarmuka wajib menampilkan **Halaman Bukti Konfirmasi Pemesanan (*Booking Confirmation Screen*)** yang komprehensif.

Rincian Bukti Konfirmasi Wajib:
- Kode referensi pemesanan unik (contoh: `#CNS-20260917-882`),
- Nama instruktur pendamping dan tautan ruang konsultasi virtual,
- Hari, tanggal, dan rentang jam lengkap dengan zona waktu lokal (WIB/WITA/WIT),
- Tombol integrasi kalender perangkat (*"Tambahkan ke Google Calendar / Apple Calendar"*),
- Panduan persiapan sesi: *"Siapkan catatan konsumsi makanan dan pertanyaan utama Anda sebelum sesi dimulai"*.

---

## 46. Antarmuka Partisipasi Tantangan Sehat (Health Challenge UI)

Kartu partisipasi tantangan kesehatan (*Health Challenge Card*) wajib mengomunikasikan tujuan, durasi, dan kemajuan harian secara transparan dan terukur.

Struktur Kartu Tantangan:
- **Judul & Kategori Preventif:** (contoh: *"Tantangan Tidur Berkualitas 7 Hari"* - Domain Sirkadian).
- **Sasaran Tindakan Mikro Harian:** Penjelasan tugas konkret hari ini (misal: *"Matikan layar 30 menit sebelum tidur"*).
- **Bilah Kemajuan Visual (*Progress Bar*):** Menampilkan persentase pencapaian (misal: *"Hari ke-4 dari 7 Hari (57%)"*).
- **Imbalan Non-Klinis yang Transparan:** Keterangan poin imbalan atau lencana kebiasaan yang akan diperoleh setelah tantangan tuntas diselesaikan.

---

## 47. Antarmuka Gamifikasi Beretika (Ethical Gamification UI)

Unsur gamifikasi (poin, lencana, tingkatan) wajib berkedudukan sebagai **pendukung motivasi sekunder, bukan fokus utama visual (*Ethical Gamification UI*)**.

Kaidah Antarmuka Gamifikasi:
- Data kesehatan dan wawasan klinis pengguna tidak boleh tertutup atau kalah menonjol dibandingkan animasi koin atau lencana.
- Dilarang menggunakan animasi berkedip agresif atau suara kasino yang memicu adiksi psikologis (*anti-addictive design*).
- Lencana pencapaian disajikan dengan estetika elegan, hangat, dan bernada apresiasi atas konsistensi hidup sehat (*healthy consistency recognition*).

---

## 48. Antarmuka Rangkaian Konsistensi Harian (Habit Streak UI)

Rangkaian konsistensi kebiasaan (*Streaks*) wajib dirancang secara suportif dan anti-kecemasan (*Anti-Anxiety Streak UI*).

Kaidah Antarmuka Streaks:
- **Nada Empatis Saat Rangkaian Terputus:** Jika pengguna melewatkan satu hari, dilarang menampilkan animasi api padam disertai tanda silang merah yang menghukum. Ganti dengan pesan penyemangat: *"Kembali memulai adalah bagian terbaik dari perjalanan kebiasaan. Mari lanjutkan hari ini!"*.
- **Visualisasi Fitur Pembekuan (*Streak Freeze*):** Jika anggota menggunakan hak jeda istirahat, tampilkan ikon es pelindung yang menenangkan dengan keterangan *"Rangkaian Anda terlindungi saat Anda beristirahat"*.
- Fokuskan keberhasilan pada total akumulasi hari sehat dalam sebulan, bukan sekadar panjang angka streak berturut-turut.

---

## 49. Pusat Notifikasi & Pemberitahuan Cerdas (Notification Center UI)

Pusat Notifikasi (*Notification Center UI*) bertindak sebagai ruang pengingat terpusat yang menghormati ketenangan pikiran pengguna.

Kaidah Antarmuka Notifikasi:
- **Pengelompokan Berdasarkan Domain:** Pisahkan notifikasi ke dalam tab logis: *Wawasan Kesehatan*, *Konsultasi*, *Tantangan*, dan *Sistem*.
- **Penanda Belum Dibaca yang Halus:** Titik bulat kecil berwarna teal tanpa angka merah berkedip yang memicu stres.
- **Pemberitahuan Jam Hening (*Quiet Hours Indicator*):** Tampilkan pesan ramah jika pengguna membuka notifikasi di larut malam: *"AEVYRA tidak mengirimkan notifikasi pengingat antara jam 22.00–06.00 agar tidur Anda tidak terganggu"*.

---

## 50. Antarmuka Pusat Pengaturan Privasi (Privacy Settings UI)

Pusat Pengaturan Privasi (*Privacy Settings UI*) wajib memberikan kendali visual yang sangat jelas dan mudah dioperasikan bagi anggota dalam mengelola kedaulatan data pribadinya.

Pengaturan Privasi Wajib:
- **Status Visibilitas Profil:** Tombol sakelar (*toggle*) privat vs publik di ruang komunitas.
- **Izin Berbagi Data ke Instruktur:** Daftar rincian metrik apa saja yang boleh dilihat oleh instruktur pendamping (Glukosa, Tidur, Makanan, Aktivitas) dengan sakelar mandiri.
- **Ekspor Seluruh Rekam Data:** Tombol satu klik untuk mengunduh arsip seluruh catatan kesehatan pribadi dalam format JSON/PDF.
- **Pemusnahan Akun & Data (*Right to Erasure*):** Alur transparan untuk mengajukan penghapusan akun permanen sesuai UU PDP No. 27/2022.

---

## 51. Antarmuka Persetujuan Sadar Pengguna (User Consent Management UI)

Layar persetujuan sadar pengguna (*User Consent Management UI*) wajib menyajikan informasi secara transparan, mudah dipahami oleh orang awam, dan mematuhi prinsip persetujuan bebas (*freely given consent*) sesuai amanat UU PDP No. 27/2022.

5 Elemen Wajib pada Layar Persetujuan:
1. **Data Apa yang Diminta (*What Data*):** Daftar kategori data spesifik (contoh: *"Catatan Glukosa Darah dan Foto Santapan 7 Hari Terakhir"*).
2. **Mengapa Data Dibutuhkan (*Why Needed*):** Alasan produk yang jelas (contoh: *"Untuk memungkinkan Instruktur memberikan rekomendasi komposisi makanan yang tepat"*).
3. **Siapa Saja yang Dapat Melihat (*Who Can Access*):** Identitas pihak penerima data (contoh: *"Hanya dapat diakses oleh Instruktur resmi Anda: dr. Nadia Paramita"*).
4. **Berapa Lama Akses Diberikan (*Duration*):** Masa berlaku persetujuan (contoh: *"Selama masa program pembinaan aktif (30 hari)"*).
5. **Dapat Ditarik Kapan Saja (*Revocability*):** Penegasan bahwa persetujuan dapat dicabut sewaktu-waktu melalui menu Pengaturan Privasi.

Dilarang menggunakan kotak centang yang telah dicentang otomatis (*pre-ticked checkboxes*) atau teks syarat & ketentuan tersembunyi yang manipulatif (*dark patterns*).

---

## 52. Antarmuka Berbagi Data ke Instruktur (Instructor Data Sharing UI)

Ketika seorang anggota menyetujui untuk membagikan data kesehatannya kepada instruktur pembina, antarmuka wajib menampilkan **Cakupan Berbagi Data (*Instructor Data Sharing Scope*)** secara visual dan terperinci.

Contoh Antarmuka Berbagi Data:
```text
┌────────────────────────────────────────────────────────────────────────┐
│ BERBAGI DATA DENGAN INSTRUKTUR: dr. Nadia Paramita                     │
├────────────────────────────────────────────────────────────────────────┤
│ [✓] Ringkasan Profil Gaya Hidup & Target Preventif                     │
│ [✓] Tren Glukosa & Metrik Harian (7 Hari Terakhir)                     │
│ [✓] Log Foto Makanan & Estimasi Makronutrien                           │
│ [ ] Catatan Medis Keluarga & Riwayat Penyakit Lampau (Tidak Dibagikan) │
│ [ ] Kontak Darurat Personal (Tidak Dibagikan)                          │
├────────────────────────────────────────────────────────────────────────┤
│ Status: Aktif hingga 17 Oktober 2026                 [ Cabut Akses ]   │
└────────────────────────────────────────────────────────────────────────┘
```

Anggota memiliki hak penuh untuk memilih modul mana saja yang ingin dibagikan secara modular (*Granular Permission Control*).

---

## 53. Antarmuka Operasional Administrator (Admin Operations UI)

Antarmuka operasional Administrator Sistem (*Admin Operations UI*) dirancang untuk memprioritaskan pemantauan kesehatan platform dan statistik teragregasi, bukan eksplorasi data pribadi anggota.

Standar Perancangan Antarmuka Admin:
- **Tampilan Agregat Non-Identitas:** Menampilkan visualisasi metrik populasi platform: total pengguna aktif, rasio penyelesaian tantangan, grafik volume reservasi konsultasi, dan ketersediaan layanan sistem.
- **Penyembunyian Data Medis Mentah:** Kolom rekam medis individu disembunyikan secara bawaan dari tabel pengguna.
- **Jejak Audit Visual:** Setiap kali administrator membuka modul investigasi khusus yang melibatkan data pengguna, antarmuka menampilkan penanda jelas: *"Akses ini akan dicatat ke dalam Log Audit Keamanan Forensik"*.

---

## 54. Standarisasi Tabel Data Terstruktur (Structured Data Tables)

Tabel data (*Structured Data Tables*) digunakan terutama pada antarmuka admin, log aktivitas, dan daftar reservasi instruktur di mana pembandingan baris data diperlukan.

Standar Aksesibilitas & Responsivitas Tabel:
- **Adaptasi Perangkat Bergerak (*Mobile Table UX*):** Pada layar ponsel sempit, tabel multi-kolom wajib diubah secara otomatis menjadi susunan kartu individual (*card list layout*) atau kontainer dengan bilah geser horizontal (*horizontal scroll with sticky header*).
- **Struktur HTML Semantik:** Menggunakan elemen `<table>`, `<thead>`, `<tbody>`, `<th>`, dan `<td>` dengan atribut `scope="col"` untuk mendukung pembaca layar.
- **Kemudahan Pencarian & Penyortiran:** Sediakan kontrol penyortiran (*sort*) pada tajuk kolom dan bilah filter cepat yang jelas.

---

## 55. Antarmuka Paginasi Data Berskala (Pagination UI Design)

Daftar data berukuran besar (seperti riwayat log makanan, log audit, atau daftar transaksi) wajib menggunakan **Antarmuka Paginasi Data Berskala (*Pagination UI Design*)**.

Kaidah Antarmuka Paginasi:
- **Kontrol Paginasi Terstandar:** Menampilkan nomor halaman saat ini, total data keseluruhan (jika relevan), tombol "Sebelumnya" (*Previous*), dan "Berikutnya" (*Next*).
- **Paginasi Kursor untuk Log Real-Time:** Untuk log aktivitas atau linimasa yang bergerak dinamis, gunakan navigasi kursor dengan tombol *"Muat Rekaman Lebih Lama"* guna mencegah lompatan data.
- **Preservasi Posisi Gulir:** Saat pengguna berpindah halaman atau membuka rincian lalu kembali, posisi gulir layar wajib dipertahankan.

---

## 56. Visualisasi Grafik Biometrik (Biometric Charts & Graphs)

Visualisasi grafik biometrik (*Biometric Charts & Graphs*) wajib dirancang untuk menyajikan tren perilaku secara sederhana, akurat, dan menenangkan.

Elemen Wajib pada Setiap Grafik Kesehatan:
1. **Judul & Rentang Waktu Jelas:** Contoh: *"Tren Glukosa Darah Puasa (7 Hari Terakhir)"*.
2. **Sumbu dengan Satuan Resmi:** Sumbu Y mencantumkan satuan baku (contoh: `mg/dL`) dan Sumbu X mencantumkan tanggal/hari yang mudah dibaca.
3. **Garis Acuan Normal Personal (*Baseline Reference Line*):** Garis putus-putus horizontal lembut berwarna teal yang menunjukkan rentang acuan stabil individu anggota.
4. **Tampilan Alternatif Berbasis Tabel:** Sediakan tombol pintas *"Lihat dalam Bentuk Tabel Data"* untuk pengguna pembaca layar atau mereka yang lebih menyukai tampilan angka tekstual.

---

## 57. Keselamatan Interpretasi Grafik Medis (Health Chart Interpretation Safety)

Gaya visual grafik kesehatan pada platform AEVYRA dilarang keras menyerupai tampilan instrumen diagnostik medis gawat darurat (*Health Chart Interpretation Safety*).

Larangan Visualisasi Grafik Medis:
- Dilarang membuat grafik denyut jantung yang menyerupai monitor elektrokardiogram (EKG) rumah sakit dengan latar belakang hitam dan garis hijau neon bergerigi tajam.
- Gunakan kurva garis halus (*smooth bezier curves*) atau grafik batang bervolume lembut dengan palet warna tenang (teal, slate, indigo).
- Dilarang menambahkan garis batas bahaya berkedip (*blinking emergency thresholds*) yang dapat memicu serangan panik bagi pengguna awam.

---

## 58. Persepsi Warna & Makna Fisiologis (Color Perception & Physiological Meaning)

Antarmuka pengguna dilarang menyamakan setiap kenaikan angka biometrik secara otomatis sebagai "Kondisi Berbahaya" yang harus diwarnai merah menyala (*Color and Health Interpretation*).

Kaidah Interpretasi Warna Fisiologis:
- Fluktuasi kenaikan glukosa setelah mengonsumsi makanan adalah **proses fisiologis tubuh yang wajar**. Memberi warna merah menyala pada setiap kenaikan pasca-makan adalah kesalahan fatal yang memicu ketakutan makan (*food fear / orthorexia*).
- Gunakan warna netral (biru atau abu-abu slate) untuk kenaikan normal pasca-makan, warna kuning/amber untuk deviasi di luar garis acuan personal, dan simpan warna merah marun lembut hanya untuk kondisi kritis yang membutuhkan konsultasi medis profesional.

---

## 59. Tata Kelola Penggunaan Dialog Modal (Modal Usage Governance)

Kotak dialog melayang (*Modals*) hanya boleh digunakan untuk tugas terfokus yang membutuhkan atensi segera pengguna (*Modal Usage Governance*).

Kaidah Penggunaan Modal:
- **Tugas Singkat & Terfokus:** Cocok untuk dialog konfirmasi, pemilihan slot waktu cepat, atau pratinjau foto santapan.
- **Larangan Modal Bertumpuk (*No Stacked Modals*):** Dilarang keras membuka modal di atas modal yang sedang aktif. Jika alur kerja membutuhkan interaksi kompleks multi-tahap, alihkan ke layar penuh (*full-screen view*) atau panel laci samping (*side drawer*).
- **Penutupan Aksesibel:** Modal wajib dapat ditutup dengan menekan tombol `Escape`, mengklik tombol silang penutup bertanda `aria-label="Tutup"`, atau mengklik area latar belakang buram (*backdrop click*).
- **Penguncian Fokus (*Focus Trap*):** Saat modal terbuka, navigasi tombol `Tab` wajib terperangkap di dalam elemen modal agar pengguna keyboard tidak tersesat di latar belakang.

---

## 60. Antarmuka Dialog Konfirmasi Sadar (Conscious Confirmation Dialogs)

Tindakan yang berpotensi destruktif, permanen, atau mengubah status privasi data wajib dilindungi oleh **Dialog Konfirmasi Sadar (*Conscious Confirmation Dialogs*)**.

Tindakan yang Wajib Melalui Dialog Konfirmasi:
- Pembatalan sesi konsultasi yang telah dijadwalkan bersama instruktur,
- Penghapusan rekaman jurnal santapan atau catatan biomarker,
- Pencabutan izin berbagi data kesehatan dengan instruktur,
- Pengajuan penghapusan akun permanen (*Right to Erasure*),
- Reset total garis acuan personal (*Baseline Reset*).

Dialog konfirmasi wajib menyajikan penjelasan lugas mengenai konsekuensi tindakan tersebut sebelum pengguna menekan tombol eksekusi akhir.

---

## 61. Diksi Tindakan Destruktif & Berisiko (Destructive Action Language)

Bahasa teks tombol dan peringatan pada tindakan destruktif wajib menggunakan terminologi yang spesifik dan jelas (*Destructive Action Language*).

```text
❌ TEKS DIALOG DESTRUKTIF BURUK & RANCU:
Judul  : "Peringatan"
Pesan  : "Apakah Anda yakin?"
Tombol : [ Batal ]   [ Ya ]  (Pengguna tidak paham apa yang akan terjadi!)

✅ TEKS DIALOG DESTRUKTIF TEPAT & EKSPLISIT:
Judul  : "Hapus Catatan Glukosa Ini?"
Pesan  : "Catatan glukosa 115 mg/dL pada 15 September akan dihapus dari linimasa Anda. Tindakan ini tidak dapat dibatalkan."
Tombol : [ Batal ]   [ Hapus Catatan Secara Permanen ] (Warna Merah Marun)
```

Diksi tombol konfirmasi akhir wajib menyebutkan kata kerja tindakan secara eksplisit (seperti "Hapus Catatan", "Batalkan Konsultasi", "Cabut Izin Akses").

---

## 62. Perlindungan Privasi Layar Sensitif (Privacy-Sensitive Screen Protection)

Layar yang menampilkan informasi kesehatan personal sensitif wajib dirancang dengan proteksi privasi visual guna meminimalkan risiko pengintaian layar di ruang publik (*Privacy-Sensitive Screens / Shoulder Surfing Protection*).

Fitur Proteksi Layar Sensitif:
- **Mode Privasi Angka Biometrik (*Blur/Mask Toggle*):** Menyediakan tombol ikon "Mata" pada kartu metrik utama di dasbor untuk mengaburkan angka glukosa darah atau berat badan saat pengguna berada di transportasi umum.
- **Kunci Sesi Otomatis Saat Layar Ditinggalkan:** Jika tab peramban tidak aktif selama durasi tertentu, sistem dapat meminta verifikasi ulang sebelum menampilkan kembali data rekam medis.

---

## 63. Privasi Isi Notifikasi Push (Push Notification Content Privacy)

Teks notifikasi perangkat (*Push Notifications*) dan pemberitahuan di layar kunci ponsel dilarang keras membocorkan rincian diagnostik atau data biomarker klinis pengguna (*Push Notification Privacy*).

Perbandingan Teks Notifikasi:
| Status Skenario | ❌ Notifikasi Tidak Aman (Bocor Data Medis) | ✅ Notifikasi Aman & Berorientasi Solusi |
| :--- | :--- | :--- |
| **Pesan Instruktur** | *"dr. Nadia: Hasil gula darah puasa Anda 220 mg/dL menunjukkan diabetes."* | *"dr. Nadia mengirimkan catatan pembinaan baru untuk Anda. Buka aplikasi untuk membaca."* |
| **Sinyal Deviasi** | *"Peringatan Darurat: Lonjakan gula darah kritis setelah makan siang!"* | *"Wawasan baru tersedia untuk pola santapan Anda hari ini. Ketuk untuk meninjau."* |
| **Pengingat Obat** | *"Waktunya minum Metformin 500mg untuk diabetes tipe 2 Anda."* | *"Waktunya jadwal rutin sehat Anda. Ketuk untuk mencatat."* |

---

## 64. Judul Peramban & Metadata Halaman (Browser Title & Page Metadata)

Judul jendela peramban (`<title>`) dan metadata media sosial (OpenGraph / Twitter Card) dilarang keras memuat informasi klinis atau identitas data pribadi pengguna (*Browser Title & Page Metadata*).

Kaidah Judul Peramban:
- Gunakan format umum yang bersih: `AEVYRA — Dasbor Kesehatan Preventif`, `AEVYRA — Jurnal Harian`, atau `AEVYRA — Konsultasi`.
- Dilarang memuat nama penyakit, diagnosa, atau nilai biomarker ke dalam elemen `<title>` (contoh terlarang: `<title>Pasien Diabetes Budi Santoso - Glukosa 240</title>`) karena riwayat judul peramban dapat tersimpan di cache komputer bersama dan terbaca oleh pihak ketiga.

---

## 65. Perancangan Struktur URL Semantik (Semantic URL Design)

Struktur URL rute antarmuka pengguna wajib dirancang secara semantik, bersih, dan konsisten (*Semantic URL Design*).

Standar Struktur URL AEVYRA:
```text
/dashboard                        ──► Dasbor utama anggota
/health-metrics                   ──► Halaman ikhtisar metrik biometrik
/food-logs                        ──► Jurnal konsumsi harian
/scans/new                        ──► Alur pemindai makanan kamera
/insights/{insight_id}            ──► Rincian wawasan deviasi perilaku
/consultations/book               ──► Alur reservasi sesi konsultasi
/settings/privacy                 ──► Pusat pengaturan privasi
```

Dilarang menyertakan parameter data biologis sensitif ke dalam string kueri URL publik (contoh terlarang: `/dashboard?glucose=160&allergy=penicillin`) karena string kueri URL tercatat dalam riwayat peramban dan berkas log server perantara.

---

## 66. Antarmuka Pencarian & Filter Cepat (Search & Filter UI)

Antarmuka pencarian (*Search & Filter UI*) pada platform AEVYRA wajib tunduk pada batasan otorisasi pengguna secara ketat.

Kaidah Antarmuka Pencarian:
- **Pencarian Terisolasi untuk Anggota:** Anggota hanya dapat mencari data di dalam ruang rekaman miliknya sendiri (misal: mencari nama makanan di riwayat jurnal makanannya) atau artikel edukasi kesehatan publik.
- **Larangan Pencarian Global Pengguna:** Anggota dan instruktur dilarang diberikan kotak pencarian global yang dapat menelusuri seluruh basis data pengguna platform.
- **Umpan Balik Status Pencarian Kosong:** Tampilkan pesan bantuan ramah jika pencarian tidak menemukan hasil: *"Tidak ditemukan catatan santapan dengan kata kunci tersebut. Ingin mencatatnya sebagai santapan baru?"*.

---

## 67. Navigasi Terisolasi Berbasis Peran (Role-Based Navigation)

Struktur navigasi aplikasi wajib beradaptasi secara otomatis mengikuti peran aktif pengguna yang sedang terautentikasi (*Role-Based Navigation*).

Matriks Navigasi Berdasarkan Peran:
- **Peran Anggota (Member):** Beranda (*Home*), Jurnal (*Logs*), Pemindai (*Scan*), Wawasan & AI (*Insights*), Konsultasi (*Consultation*), Pengaturan Akun (*Profile*).
- **Peran Instruktur (Instructor):** Daftar Klien Bimbingan (*Clients*), Antrean Deviasi (*Signal Queue*), Jadwal Konsultasi (*Schedule*), Pesan Masuk (*Messages*), Profil Profesional.
- **Peran Administrator (Admin):** Metrik Sistem (*Overview*), Manajemen Pengguna (*Users*), Log Audit Keamanan (*Security Audits*), Konfigurasi Platform.

Elemen menu navigasi peran lain tidak boleh ditampilkan pada peran yang tidak berwenang.

---

## 68. Konsistensi Arsitektur Navigasi (Navigation Consistency)

Tata letak navigasi global wajib konsisten di seluruh modul aplikasi (*Navigation Consistency*).

Kaidah Konsistensi Navigasi:
- Posisi tombol profil pengguna, lonceng notifikasi, dan tombol darurat medis (SOS) wajib berada pada koordinat lokasi visual yang sama di setiap layar.
- Jangan mengubah posisi bilah navigasi utama secara tak terduga saat berpindah modul.
- Sediakan rekam jejak (*Breadcrumbs*) pada layar dengan kedalaman navigasi lebih dari dua tingkat (contoh: `Konsultasi > dr. Nadia > Pilih Jadwal`) untuk memudahkan pengguna kembali ke tingkat sebelumnya.

---

## 69. Navigasi Bawah Ponsel Pintar (Mobile Bottom Navigation)

Pada tampilan ponsel pintar, navigasi utama wajib disajikan melalui **Bilah Navigasi Bawah (*Mobile Bottom Navigation Bar*)** yang ergonomis.

Standar Bilah Navigasi Bawah Ponsel:
- Terdiri dari maksimal **4 hingga 5 item navigasi primer**: Beranda, Jurnal, [Tombol Kamera Pemindai Menonjol di Tengah], Wawasan AI, dan Profil.
- Tombol pemindai santapan kamera ditempatkan di posisi tengah (*center floating action*) dengan aksen warna menonjol agar mudah ditekan ibu jari.
- Bilah navigasi bawah tetap tersemat (*fixed/sticky*) di bagian bawah layar saat halaman digulir dan menghormati batas aman bilah gestur ponsel (*Safe Area Insets padding-bottom* pada iOS dan Android).

---

## 70. Aksesibilitas Pemindai Kamera (Scanner Accessibility)

Antarmuka pemindai makanan wajib dirancang dengan mempertimbangkan aksesibilitas bagi pengguna dengan berbagai kondisi fisik (*Scanner Accessibility*).

Kaidah Aksesibilitas Pemindai:
- **Opsi Alternatif Unggah Galeri:** Selalu sediakan tombol cadangan *"Pilih dari Galeri Foto"* bagi pengguna yang perangkatnya tidak mendukung kamera langsung atau memiliki kendala fisik saat membidik kamera.
- **Label Suara untuk Kontrol Kamera:** Seluruh tombol kamera wajib memiliki label aksesibel yang jelas bagi pembaca layar (misal: `aria-label="Ambil foto santapan"`, `aria-label="Nyalakan lampu kilat"`).
- **Umpan Balik Suara & Haptik Ringan:** Sediakan getaran haptik lembut (*haptic feedback*) pada perangkat bergerak saat foto berhasil ditangkap sebagai penanda bahwa pemotretan telah selesai.

---

## 71. Edukasi Permintaan Izin Kamera (Camera Permission Flow)

Aplikasi dilarang memicu dialog izin kamera bawaan peramban secara tiba-tiba tanpa edukasi konteks terlebih dahulu (*In-Context Camera Permission Onboarding*).

Alur Edukasi Izin Kamera Wajib:
```text
Pengguna Membuka Fitur Pemindai Makanan
                         │
                         ▼
Layar Edukasi Ramah (Menjelaskan Mengapa Izin Dibutuhkan)
"AEVYRA membutuhkan akses kamera untuk memindai piring makanan Anda
dan memperkirakan kandungan gizinya secara otomatis."
                         │
                         ▼
Pengguna Menekan Tombol [ Berikan Izin Kamera ]
                         │
                         ▼
Peramban Menampilkan Dialog Izin Resmi Sistem Operasi
```

Jika pengguna menolak izin kamera, antarmuka wajib menampilkan panduan pemulihan yang ramah: *"Akses kamera dinonaktifkan. Anda dapat mengaktifkannya kembali di pengaturan peramban, atau gunakan opsi unggah foto dari galeri"*.

---

## 72. Edukasi Permintaan Izin Lokasi (Location Permission Flow)

Izin lokasi geografis perangkat (*Geolocation Permission*) hanya boleh diminta ketika pengguna secara sadar mengaktifkan fitur pencari fasilitas kesehatan darurat terdekat (*Just-in-Time Permission*).

Kaidah Izin Lokasi:
- Dilarang keras meminta izin lokasi saat pertama kali aplikasi diinstal atau dibuka.
- Izin lokasi hanya dipicu saat pengguna berada di alur tanggap darurat medis (tombol SOS) dan menekan tombol *"Cari IGD Rumah Sakit Terdekat"*.
- Jika izin lokasi ditolak oleh pengguna, aplikasi wajib menyediakan kotak pencarian kota/kecamatan manual tanpa memblokir akses ke nomor darurat 119/112.

---

## 73. Keamanan Pemuatan & Pengiriman Formulir (Loading & Submission Safety)

Formulir pengiriman data penting wajib menerapkan pengamanan ganda terhadap klik berulang (*Double-Submission Prevention*) dan status pemuatan yang aman.

Mekanisme Pengamanan Pengiriman:
- Segera setelah tombol pengiriman (misal: "Simpan Catatan", "Konfirmasi Reservasi") ditekan, tombol tersebut wajib **dinonaktifkan secara instan (`disabled`)** dan menampilkan indikator pemutar (*spinner*) halus.
- Terapkan fungsi pencegah lonjakan (*debounce/throttle*) pada panggilan API sisi klien untuk menggagalkan klik ganda akibat kepanikan atau ketidaksabaran pengguna.
- Pastikan kursor beralih ke status tunggu (`cursor-wait`) untuk memberi tahu pengguna bahwa proses sedang berjalan di backend.

---

## 74. Umpan Balik Keberhasilan Tindakan (Success Feedback UX)

Setelah tindakan penting berhasil diselesaikan, antarmuka wajib menyajikan **Umpan Balik Keberhasilan Tindakan (*Success Feedback UX*)** yang memberikan rasa tuntas (*closure*).

Kaidah Umpan Balik Keberhasilan:
- Notifikasi melayang (*Toast Notification*) untuk tindakan rutin (contoh: *"Catatan glukosa 105 mg/dL berhasil disimpan"*). Notifikasi harus bertahan minimal **4–5 detik** di layar agar sempat dibaca sebelum memudar lembut.
- Layar penuh (*Confirmation Screen*) untuk tindakan bernilai tinggi (seperti konfirmasi pembayaran langganan atau reservasi konsultasi).
- Sediakan indikator visual bahwa data telah tersinkronisasi ke server (ikon awan centang hijau).

---

## 75. Pemulihan Mandiri dari Kondisi Galat (Self-Service Error Recovery)

Setiap pesan galat pada formulir atau layar interaksi wajib menyediakan jalur pemulihan mandiri yang jelas (*Self-Service Error Recovery*).

```text
❌ PESAN GALAT BUNTU & TIDAK MEMBANTU:
"Terjadi galat 500. Silakan hubungi admin." (Pengguna bingung dan frustrasi)

✅ PESAN GALAT SOLUTIF DENGAN JALUR PEMULIHAN:
"Gagal menyimpan catatan makanan karena jaringan internet terputus. Draf Anda tersimpan aman."
Tombol: [ Coba Simpan Ulang ]   [ Simpan ke Draf Luring ]
```

Pesan galat harus selalu mengarahkan pengguna pada solusi praktis berikutnya tanpa menyalahkan kelemahan teknis pengguna.

---

## 76. Preservasi Draf Isian Formulir (Form State Preservation)

Ketika terjadi kegagalan validasi atau gangguan jaringan sesaat saat pengguna mengirimkan formulir, antarmuka wajib **Mempertahankan Draf Isian Formulir (*Form State Preservation*)**.

Kaidah Preservasi Formulir:
- Dilarang keras mengosongkan (*reset*) kotak isian formulir yang telah diketik panjang oleh pengguna (seperti catatan gaya hidup, jurnal santapan, atau riwayat alergi).
- Sorot (*highlight*) kolom spesifik yang mengalami kesalahan validasi dengan warna merah lembut dan tampilkan pesan kesalahan tepat di bawah kolom tersebut, sementara data pada kolom lain yang valid tetap dipertahankan.
- Untuk formulir bertahap (*multi-step wizards*), simpan progres pengguna di penyimpanan memori lokal (*session state*) sehingga pengguna tidak perlu mengulang dari langkah pertama.

---

## 77. Rasio Kontras Warna & Aksesibilitas (Color Contrast Ratio Compliance)

Aplikasi wajib memastikan bahwa seluruh informasi penting dan status kesehatan tetap dapat dipahami secara sempurna dalam berbagai kondisi penglihatan dan mode tampilan:

Standar Kepatuhan Kontras & Warna:
- **Mode Skala Abu-Abu (*Grayscale Testing*):** Status antarmuka harus tetap dapat dibedakan meskipun seluruh layar diubah menjadi hitam-putih, berkat adanya kombinasi teks label dan bentuk ikonografi yang berbeda.
- **Rasio Kontras Teks (*Contrast Ratio*):** Memenuhi standar WCAG 2.1 AA dengan rasio kontras minimal **4.5:1** untuk teks normal terhadap latar belakang, dan minimal **3.0:1** untuk teks tebal berukuran besar (18pt+) serta komponen grafis antarmuka.
- **Dukungan Mode Gelap (*Dark Mode Support*):** Menggunakan palet tema gelap berbasis slate lembut (`bg-slate-900`, `text-slate-100`) yang tidak menyilaukan mata saat pengguna mencatat jurnal di kamar tidur malam hari.

---

## 78. Skala Tipografi & Keterbacaan Huruf (Typography Scale & Readability)

Tipografi antarmuka AEVYRA dirancang dengan hierarki visual yang tegas dan keterbacaan tinggi (*Typography Scale & Readability*).

Skala Tipografi Resmi AEVYRA:
- **Display / Hero (28–32px, Bold):** Digunakan untuk sapaan berwaktu dan angka skor utama dasbor.
- **Heading 1 (22–24px, Semibold):** Digunakan untuk judul halaman dan modul utama.
- **Heading 2 (18–20px, Semibold):** Digunakan untuk tajuk kontainer kartu metrik dan wawasan.
- **Heading 3 (15–16px, Medium):** Digunakan untuk sub-bagian formulir dan label tabel.
- **Body Text (14–15px, Regular, Line-Height 1.5):** Teks paragraf utama; ukuran teks bodi dilarang lebih kecil dari **14 piksel** demi menjaga keterbacaan pada layar ponsel.
- **Caption / Metadata (12–13px, Regular):** Stempel waktu, satuan unit, dan teks penafian.

Keluarga font resmi: Font sans-serif terkurasi seperti **Inter** atau **Plus Jakarta Sans** dengan optimasi perenderan font lokal.

---

## 79. Kepadatan Informasi Data Kesehatan (Health Data Density Control)

Antarmuka pengguna wajib mengendalikan **Kepadatan Informasi Data Kesehatan (*Health Data Density Control*)** guna mencegah kelelahan kognitif (*Cognitive Overload*).

Kaidah Kepadatan Informasi:
- Batasi jumlah metrik biometrik utama yang disajikan secara bersamaan di dasbor ponsel: maksimal **3 hingga 4 kartu metrik utama** pada tampilan awal.
- Gunakan spasi yang lega (*breathing room*) dengan menerapkan skala padding 16px hingga 24px antar kontainer kartu.
- Terapkan pengelompokan modular (*chunking*): pisahkan data biologis, tugas intervensi harian, dan ringkasan konsultasi ke dalam bagian-bagian terpisah yang berurutan secara logis.

---

## 80. Pengungkapan Informasi Bertahap (Progressive Information Disclosure)

Untuk menyajikan informasi mendalam tanpa membuat layar berantakan, antarmuka menerapkan prinsip **Pengungkapan Informasi Bertahap (*Progressive Information Disclosure*)**.

Mekanisme Pengungkapan Bertahap:
```text
[Layar Utama / Ringkasan]
Menampilkan: Kesimpulan Wawasan + Indikator Garis Acuan + Rekomendasi Tindakan Mikro
                                     │
                                     ▼ (Pengguna mengetuk "Lihat Rincian Analisis")
[Panel Ekspansi / Layar Mendalam]
Menampilkan: Grafik Historis 30 Hari + Metrik Pendukung + Penjelasan Fisiologis AI
```

Pendekatan ini menjamin bahwa pengguna yang hanya ingin mengetahui tindakan cepat hari ini tidak terbebani oleh ratusan baris data analitik, namun pengguna yang ingin mempelajari data secara mendalam tetap memiliki akses penuh.

---

## 81. Pilar Penulisan Teks Antarmuka Empatis (UX Copywriting Principles)

Penulisan teks antarmuka (*UX Copywriting*) pada seluruh platform AEVYRA wajib berpegang pada 5 pilar bahasa empatis:

1. **Jelas (*Clear*):** Menggunakan kata-kata sederhana, lugas, dan bebas dari jargon teknis atau terminologi medis yang mengintimidasi.
2. **Menenangkan (*Calm*):** Nada suara santun dan menenangkan, tidak menggunakan tanda seru berlebihan (!!!) atau kata-kata bernada darurat untuk fluktuasi normal.
3. **Mendukung (*Supportive*):** Memposisikan aplikasi sebagai rekan perjalanan sehat yang setia mendampingi, bukan pengawas disiplin yang kaku.
4. **Berbasis Bukti (*Evidence-Grounded*):** Mengaitkan saran dengan data nyata pengguna (*"Berdasarkan pola tidur 3 hari terakhir..."*).
5. **Dapat Ditindaklanjuti (*Actionable*):** Selalu memberikan saran konkret yang mudah dilakukan saat ini juga.

---

## 82. Diksi Penulisan Pesan Galat Sistem (Error Message Copywriting)

Diksi penulisan pesan galat (*Error Message Copywriting*) dilarang keras menyalahkan pengguna (*No User Blaming*).

Perbandingan Diksi Pesan Galat:
| Kategori Masalah | ❌ Teks Menyalahkan Pengguna | ✅ Teks Empatis & Solutif |
| :--- | :--- | :--- |
| **Format Salah** | *"Anda salah memasukkan format tanggal lahir!"* | *"Format tanggal lahir menggunakan urutan Hari/Bulan/Tahun (contoh: 17/09/1990)."* |
| **Kolom Kosong** | *"Anda lupa mengisi kolom tekanan darah sistolik."* | *"Mohon masukkan angka tekanan darah sistolik untuk melanjutkan."* |
| **Gagal Masuk** | *"Kata sandi yang Anda ketik salah."* | *"Kombinasi surel dan kata sandi belum sesuai. Silakan periksa kembali."* |
| **Foto Buram** | *"Foto Anda jelek dan tidak bisa dibaca scanner."* | *"Foto piring santapan tampak buram. Mohon ambil foto ulang di tempat yang lebih terang."* |

---

## 83. Diksi Peringatan & Atensi Kesehatan (Health Warning Copywriting)

Diksi peringatan dan atensi kesehatan (*Health Warning Copywriting*) wajib proporsional dan tidak menimbulkan histeria medis (*Non-Alarmist Copywriting*).

Kaidah Diksi Peringatan Kesehatan:
- Hindari kata-kata yang mendiagnosis secara sepihak seperti: *"Pola ini menunjukkan gejala penyakit ginjal kronis!"*.
- Gunakan diksi pengamatan objektif dan ajakan evaluasi mandiri: *"Pola asupan natrium Anda teramati lebih tinggi dari biasanya dalam minggu ini. Memperbanyak konsumsi air putih dan mengurangi saus olahan dapat membantu menjaga keseimbangan tubuh Anda"*.
- Jika angka metrik benar-benar berada di ambang batas kritis, arahkan pengguna ke tenaga medis dengan tenang: *"Hasil pemeriksaan ini sebaiknya didiskusikan langsung dengan dokter atau instruktur kesehatan Anda untuk evaluasi lebih lanjut"*.

---

## 84. Antarmuka Progressive Web App (PWA Experience & Shell)

Sebagai Progressive Web App (PWA), antarmuka AEVYRA wajib mengomunikasikan status aplikasi PWA secara tepat waktu dan elegan.

Fitur Antarmuka PWA:
- **Spanduk Instalasi Aplikasi Tepat Waktu (*Smart Install Banner*):** Dilarang memunculkan pop-up instalasi aplikasi pada detik pertama pengguna membuka web. Tampilkan ajakan instalasi hanya setelah pengguna merasakan manfaat produk (misal: setelah berhasil mencatat jurnal pertama kali atau menyelesaikan sesi pemindaian).
- **Indikator Kesiapan Mode Luring (*Offline Ready Badge*):** Berikan notifikasi halus saat PWA telah selesai mengunduh cangkang aplikasi: *"Aplikasi siap digunakan secara luring"*.
- **Pemberitahuan Pembaruan Versi Halus (*App Update Toast*):** Saat versi baru PWA dirilis oleh tim pengembang, tampilkan pesan melayang: *"Versi terbaru AEVYRA tersedia. [Perbarui Sekarang]"*.

---

## 85. Penanganan Data Kesehatan Mode Luring (Offline Health Data UX)

Ketika pengguna mengoperasikan aplikasi dalam kondisi jaringan terputus (*Offline Health Data UX*), antarmuka wajib mengelola ekspektasi visual data secara jujur.

Kaidah Penyajian Data Luring:
- Tampilkan lencana status pada data yang disimpan secara lokal: `Tersimpan di Perangkat (Menunggu Sinkronisasi)`.
- Jangan menyajikan data lokal yang telah berusia lama seolah-olah data tersebut baru saja disinkronkan dari laboratorium atau sensor medis.
- Sediakan indikator antrean sinkronisasi: *"3 catatan santapan tersimpan di perangkat dan akan disinkronkan otomatis saat terhubung ke internet"*.

---

## 86. Batasan Caching Pekerja Layanan (Service Worker Caching Boundary)

Pekerja Layanan PWA (*Service Worker*) bertindak sebagai perantara jaringan dan penyimpan cache aset, **bukan tempat pengeksekusian aturan bisnis inti (*Service Worker Boundary*)**.

Larangan Batasan Service Worker:
- Dilarang mengimplementasikan logika penilaian klinis, perhitungan saldo poin, verifikasi transaksi pembayaran, atau evaluasi deviasi biomarker di dalam berkas Service Worker JavaScript.
- Service Worker hanya bertugas melayani aset statis (*App Shell*), mencegat rute luring, dan meneruskan antrean sinkronisasi latar belakang (*Background Sync*) ke API server resmi saat koneksi pulih.

---

## 87. Batas Keamanan Antarmuka Pengguna (Frontend Security Boundary)

Kode antarmuka pengguna frontend wajib selalu mengasumsikan bahwa **lingkungan peramban klien adalah entitas yang tidak tepercaya (*Untrusted Client Environment*)**.

Batas Keamanan Frontend:
- Dilarang menaruh kunci rahasia API kecerdasan buatan atau token master server di dalam kode JavaScript klien.
- Dilarang mengandalkan penanda `is_admin: true` di state frontend untuk membuka rute data privat tanpa verifikasi backend.
- Seluruh data yang ditampilkan dari masukan pengguna lain (seperti pesan obrolan komunitas) wajib melalui fungsi penangkal XSS sebelum dirender ke DOM.

---

## 88. Optimasi Kinerja & Persepsi Responsivitas (Performance & Perceived Speed)

Antarmuka pengguna wajib dioptimalkan untuk mencapai standar performa web modern (*Core Web Vitals*):

Target Performa Frontend AEVYRA:
- **Largest Contentful Paint (LCP):** Di bawah **2.5 detik** pada koneksi seluler 4G standar.
- **Interaction to Next Paint (INP):** Di bawah **200 milidetik** untuk seluruh interaksi tombol dan input.
- **Cumulative Layout Shift (CLS):** Di bawah **0.1** dengan menetapkan dimensi lebar dan tinggi eksplisit pada seluruh gambar dan kontainer grafik.
- **Pemisahan Kode Dinamis (*Code Splitting & Lazy Loading*):** Memuat modul berat (seperti kanvas grafik Chart.js atau modul pemindai kamera) secara dinamis hanya saat halaman terkait dibuka oleh pengguna.

---

## 89. Pencegahan Rekayasa Frontend Berlebih (Avoid Frontend Overengineering)

Arsitektur frontend AEVYRA melarang keras penerapan rekayasa teknologi yang berlebihan (*Avoid Frontend Overengineering*).

Kaidah Kesederhanaan Rekayasa:
- Dilarang memperkenalkan pustaka manajemen status global raksasa yang rumit jika status aplikasi dapat dikelola secara andal menggunakan komponen reaktif sederhana atau sistem bawaan framework.
- Gunakan pendekatan paling sederhana dan dapat dipelihara (*simplest maintainable solution*) yang mampu menangani kebutuhan produk nyata.
- Hindari pembuatan abstraksi berlapis-lapis pada komponen antarmuka yang hanya digunakan sekali.

---

## 90. Kebijakan Seleksi Dependensi Frontend (Frontend Dependency Governance)

Sebelum menambahkan paket pustaka JavaScript baru melalui NPM, pengembang frontend wajib mengevaluasi kriteria kelayakan ketat (*Frontend Dependency Governance*):

5 Kriteria Evaluasi Dependensi Frontend:
1. **Verifikasi Kebutuhan:** Apakah fitur ini dapat dibangun sendiri secara bersih menggunakan standar JavaScript modern ES6+ dan Tailwind CSS?
2. **Dampak Ukuran Bundel (*Bundle Size Impact*):** Periksa ukuran pustaka melalui Bundlephobia; tolak paket yang menambah ukuran bundel JavaScript secara berlebihan.
3. **Kompatibilitas PWA & Peramban Bergerak:** Pastikan pustaka berjalan mulus di peramban Safari iOS dan Chrome Android.
4. **Keamanan & Ketiadaan Kerentanan:** Lolos audit keamanan otomatis `npm audit`.
5. **Dukungan Aksesibilitas:** Memiliki dukungan bawaan untuk pembaca layar dan navigasi keyboard.

---

## 91. Konvensi Penamaan Komponen UI (UI Component Naming Conventions)

Nama berkas dan komponen antarmuka pengguna wajib mencerminkan tanggung jawab domain bisnisnya secara deskriptif dan terprediksi (*Component Naming Conventions*).

Standar Penamaan Komponen:
```text
✅ PENAMAAN BAIK & DESKRIPTIF:
- HealthMetricCard.vue / HealthMetricCard.blade.php
- BehavioralSignalAlert.vue
- PersonalBaselineChart.vue
- ScannerCameraViewfinder.vue
- ConsultationBookingStepper.vue

❌ PENAMAAN BURUK & RANCU:
- CardNew.vue (Tidak jelas isinya)
- CustomBox.blade.php (Terlalu generik)
- TempChart.vue (Nama sementara yang terlupakan)
- Test1.blade.php (Kode uji coba yang bocor ke produksi)
```

Gunakan format PascalCase untuk nama komponen UI mandiri.

---

## 92. Struktur Organisasi Berkas Antarmuka (Frontend File Organization)

Berkas antarmuka pengguna wajib diorganisasikan berdasarkan domain fitur modular (*Feature-Driven Folder Structure*):

Struktur Direktori Frontend yang Dianjurkan:
```text
resources/
├── css/
│   └── app.css (Definisi token desain & direktif Tailwind)
├── js/
│   ├── components/
│   │   ├── ui/ (Komponen atomik generik: Button, Input, Modal, Badge)
│   │   ├── layout/ (Navbar, BottomNav, Sidebar, Header)
│   │   └── charts/ (Komponen pembungkus grafik kanvas)
│   ├── features/
│   │   ├── dashboard/ (Dasbor Anggota & Indikator Baseline)
│   │   ├── metrics/ (Pencatatan biomarker & visualisasi glukosa)
│   │   ├── scanner/ (Kamera pemindai & kartu hasil nutrisi)
│   │   ├── insights/ (Wawasan deviasi & integrasi obrolan AI)
│   │   ├── consultations/ (Pemesanan bimbingan & antarmuka instruktur)
│   │   └── settings/ (Pusat pengaturan privasi & profil)
│   └── app.js (Inisialisasi aplikasi)
└── views/ (Templat Blade berstruktur rapi)
```

Pemisahan berbasis fitur ini memastikan bahwa pengembang dapat menemukan dan memelihara komponen terkait secara cepat dan terisolasi.

---

## 93. Koleksi Komponen Formulir Dapat Digunakan Ulang (Reusable Form Components)

Pola formulir masukan yang berulang wajib memanfaatkan **Koleksi Komponen Formulir Terstandar (*Reusable Form Components*)**.

Komponen Formulir Baku:
- `HealthInputField`: Kotak input angka biometrik dengan satuan permanen di sisi kanan, pesan bantuan batas biologis, dan penampil galat sebaris.
- `DatePickerField`: Pemilih tanggal ramah sentuhan dengan format kalender lokal Indonesia (DD/MM/YYYY).
- `UnitSelectField`: Menu tarik-turun untuk memilih satuan pengukuran alternatif jika didukung.
- `FormSubmitButton`: Tombol kirim dengan pencegah klik ganda dan status animasi pemutar (*spinner*) bawaan.

Standardisasi ini menjamin pengalaman pengisian data yang konsisten dan seragam di seluruh modul aplikasi.

---

## 94. Aksesibilitas Grafik & Visualisasi Data (Accessible Data Visualizations)

Setiap grafik data biologis dan wawasan visual wajib dilengkapi dengan **Alternatif Ringkasan Teks Aksesibel (*Accessible Text Summary for Charts*)**.

Pengguna tunanetra atau mereka yang menggunakan pembaca layar (*screen reader*) tidak dapat melihat grafik kanvas grafis. Oleh karena itu, setiap kontainer grafik wajib menyediakan:
- Atribut `role="img"` dan `aria-label` deskriptif pada elemen grafik.
- Paragraf ringkasan teks tersembunyi (*visually hidden text*) atau terlihat yang merangkum poin data utama: *"Grafik glukosa darah 7 hari terakhir: Nilai rata-rata 102 mg/dL, nilai terendah 92 mg/dL pada 12 September, dan nilai tertinggi 114 mg/dL pada 15 September. Pola berada dalam rentang acuan normal Anda."*

---

## 95. Integritas Skala Visualisasi Data (Data Visualization Scale Integrity)

Visualisasi grafik kesehatan wajib menjaga **Integritas Skala Visual Data (*Data Visualization Scale Integrity*)** guna menghindari distorsi persepsi pengguna.

Kaidah Integritas Visual Grafik:
- **Sumbu Y yang Jujur & Kontekstual:** Sumbu Y pada grafik metrik vital tidak boleh dipotong secara ekstrem sehingga fluktuasi kecil 2 mg/dL terlihat seperti lonjakan raksasa yang menakutkan.
- **Skala Waktu Proporsional:** Jarak antar titik waktu pada Sumbu X wajib mencerminkan interval waktu yang sebenarnya, bukan memampatkan hari tanpa catatan seolah-olah terjadi berurutan.
- **Label Nilai yang Akurat:** Titik data interaktif (*tooltips*) wajib menampilkan nilai numerik riil dan stempel waktu lengkap saat disentuh atau diarahkan kursor.

---

## 96. Kepercayaan & Keamanan Antarmuka (UI Trust & Safety Architecture)

Antarmuka pengguna AEVYRA dilarang keras memberikan kesan kepastian diagnosis medis yang melampaui kemampuan data biologis yang tersedia (*UI Safety & Psychological Trust*).

Larangan Klaim Visual Antarmuka:
- Dilarang menampilkan angka presisi desimal semu yang berlebihan (contoh: menampilkan *"Tingkat kepatuhan metabolik Anda: 94.7821%"*). Gunakan angka bulat yang ramah (contoh: *"95%"*).
- Dilarang memberikan lencana status bertuliskan *"Bebas Risiko Diabetes"* atau *"Pasti Sehat"*. Gunakan frasa berbasis perilaku: *"Pola Konsisten"* atau *"Kebiasaan Terjaga Baik"*.
- Kepercayaan pengguna dibangun melalui kejujuran batasan data, bukan kepalsuan visual yang muluk-muluk.

---

## 97. Transparansi Batas Peran Asisten AI (AI Transparency & Safety Disclaimer)

Antarmuka pengguna wajib secara transparan membedakan antara **Hasil Aturan Deterministik Keras (*Deterministic Rules*)**, **Analisis Prediktif Asisten AI (*AI Generation*)**, dan **Catatan Instruktur Kesehatan Manusia (*Human Clinical Input*)**.

Perbedaan Visual Sumber Rekomendasi:
```text
┌────────────────────────────────────────────────────────────────────────┐
│ [Lencana Biru] ATURAN DETERMINISTIK                                    │
│ "Glukosa Anda tercatat 125 mg/dL setelah makan (Sesuai panduan PERKENI)"│
├────────────────────────────────────────────────────────────────────────┤
│ [Lencana Indigo + Ikon Bintang] ANALISIS ASISTEN AI                    │
│ "Berdasarkan catatan makanan, menu siang Anda memuat karbohidrat cepat" │
├────────────────────────────────────────────────────────────────────────┤
│ [Lencana Hijau + Foto Profil] CATATAN INSTRUKTUR: dr. Nadia            │
│ "Coba tambahkan porsi sayuran hijau pada santap siang besok, Budi."     │
└────────────────────────────────────────────────────────────────────────┘
```

Pengguna berhak mengetahui secara pasti entitas mana yang menghasilkan wawasan yang sedang mereka baca.

---

## 98. Indikator Asal-Usul Sumber Data (Data Provenance & Source Indicators)

Setiap entitas data kesehatan yang disajikan pada linimasa atau grafik wajib menyertakan **Indikator Asal-Usul Sumber Data (*Data Provenance Badges*)**.

Taksonomi Indikator Sumber Data:
- `Pencatatan Manual`: Data yang dimasukkan langsung oleh pengguna melalui formulir.
- `Pemindai Nutrisi AI`: Data yang diekstraksi dari hasil foto piring makanan.
- `Hasil Integrasi Lab`: Data rekam medis resmi yang diunggah dari dokumen hasil laboratorium.
- `Perangkat Wearable`: Data yang disinkronkan dari jam pintar atau sensor glukosa kontinu (CGM).

Penyajian asal-usul data memberikan akuntabilitas dan memudahkan instruktur kesehatan mengevaluasi derajat keandalan catatan tersebut.

---

## 99. Kedaulatan & Otonomi Penuh Pengguna (User Agency & Sovereign Control)

Pengguna memegang kendali penuh dan kedaulatan mutlak atas antarmuka dan datanya (*User Agency & Sovereign Control*).

Kedaulatan Pengguna Diwujudkan Melalui:
- Kemampuan untuk mematikan atau menyesuaikan frekuensi notifikasi pengingat harian.
- Kemampuan untuk menyunting atau menghapus catatan log santapan dan biomarker yang keliru dicatat.
- Kemampuan untuk beralih antara tampilan grafik visual dan tampilan tabel teks.
- Kemampuan untuk mencabut izin berbagi data dengan instruktur kapan saja dengan satu ketukan.
- Ketiadaan jebakan antarmuka (*Zero Dark Patterns*) yang mempersulit proses pembatalan langganan atau penutupan akun.

---

## 100. Prinsip Pamungkas Antarmuka AEVYRA (Final Frontend Sovereign Principle)

Seluruh perancangan, pengembangan, dan evaluasi antarmuka pengguna AEVYRA wajib bermuara pada satu Prinsip Pamungkas Kedaulatan Antarmuka:

> [!IMPORTANT]
> **PRINSIP PAMUNGKAS ANTARMUKA PENGGUNA AEVYRA**
> Antarmuka AEVYRA hadir bukan untuk membanjiri pengguna dengan angka yang membingungkan, bukan untuk memicu kepanikan medis yang menakutkan, dan bukan untuk mendominasi layar dengan animasi yang adiktif.
>
> Antarmuka AEVYRA hadir untuk mendampingi manusia dengan tenang:
> **Mengamati pola tubuh dengan jernih (*Observe*),**
> **Memahami makna di balik data secara berbasis bukti (*Understand*),**
> **Mengambil satu tindakan mikro nyata hari ini (*Act*), dan**
> **Memantau perbaikan kebiasaan hidup secara berkelanjutan (*Monitor*).**

Kejelasan melampaui kerumitan, ketenangan melampaui kepanikan, dan tindakan nyata melampaui angka pasif.

---

