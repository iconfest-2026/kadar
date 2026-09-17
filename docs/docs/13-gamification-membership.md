# PRONOIA — Gamifikasi & Keanggotaan (Gamification & Membership Specification)

> **Spesifikasi Arsitektur Gamifikasi Berbasis Kebiasaan Positif, Sistem Buku Besar Poin Idempoten, Rangkaian Konsistensi (Streaks) Non-Toksik, Tantangan Preventif, Tingkatan Keanggotaan (Membership Tiers), Kontrak Entitlement Akses Fitur, Batasan Etis Monetisasi Layanan Kesehatan, Privasi Pengguna, dan Kriteria Penerimaan Produksi PRONOIA.**

---

### Informasi Dokumen & Kontrol Versi

| Atribut Metadata | Rincian Dokumen Teknis |
| :--- | :--- |
| **Kode Dokumen** | `PRONOIA-DOC-013` |
| **Versi Spesifikasi** | `v1.0.0-PROD` (Release Ready & Standardized) |
| **Domain Arsitektur** | Gamification Engine, Loyalty Ledger, Membership & Entitlements, Ethical Monetization |
| **Tingkat Kerahasiaan** | **Internal Confidential & Audit-Ready** (Departemen Produk, Engineering, & Medis) |
| **Klasifikasi Keamanan** | Penegakan Kedaulatan Data Klinis, Anti-Abuse Server-Authoritative, PCI-DSS Gateway Safe |
| **Target Ekosistem** | PRONOIA Mobile App (iOS / Android), Web Dashboard, Backend Event Bus, Payment Gateway |
| **Penyelarasan Regulasi** | UU No. 27/2022 (PDP), Standar Etika Kedokteran Preventif, HIPAA/GDPR Principle Separation |
| **Status Validasi** | **181 Seksi Terstruktur Lengkap** (0 Seksi Dihilangkan / 100% Invarian Terpenuhi) |

---

### Ringkasan Eksekutif & Peta Klaster Arsitektur (Architecture Clusters)

Sistem Gamifikasi dan Keanggotaan (*Gamification & Membership Engine*) pada platform PRONOIA dirancang dengan landasan filosofis mendasar: **Gamifikasi bertujuan memperkuat pembentukan kebiasaan hidup sehat yang konsisten (*positive behavioral reinforcement*), sedangkan Keanggotaan (*Membership*) mengatur tingkat akses terhadap kapabilitas komputasi dan konsultasi pakar.** Keduanya **bukan dan tidak boleh dijadikan proksi atas derajat kesehatan medis seseorang**.

Arsitektur ini memisahkan secara tegas antara data klinis, integritas kalkulasi poin (*double-entry points ledger*), mesin pembuktian tantangan (*proof-of-action challenge engine*), hak akses fitur (*feature entitlement middleware*), serta batas etis monetisasi (*no pay-to-be-healthy anti-pattern*).

Seluruh 181 seksi dalam spesifikasi ini dipetakan ke dalam **7 Klaster Strategis**:

```
                                      ARSITEKTUR GAMIFIKASI & KEANGGOTAAN PRONOIA
                                      ═══════════════════════════════════════════
  ┌───────────────────────────────────────────────────────┬───────────────────────────────────────────────────────┐
  │ [Klaster 1] Fondasi & Buku Besar Poin (Seksi 1 - 31)  │ [Klaster 2] Streaks & Tantangan Sehat (Seksi 32 - 55) │
  │ • Filosofi Produk: Awareness → Progress               │ • Definisi Event Streak Kualifikasi Sah               │
  │ • Distingsi Status: Health ≠ Game ≠ Tier              │ • Perlindungan Mental: Streak Freeze & Anti-Anxiety   │
  │ • Arsitektur Buku Besar Poin (Idempotent Ledger)      │ • Desain Tantangan Preventif Berbasis Istirahat       │
  │ • Larangan Mutlak Penalti Poin Negatif                │ • Papan Peringkat Relatif & Anti-Stigma Bobot Tubuh   │
  ├───────────────────────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ [Klaster 3] Katalog Reward & Anti-Abuse (Seksi 56-71) │ [Klaster 4] Arsitektur Membership (Seksi 72 - 100)    │
  │ • Katalog Imbalan Digital & Non-Klinis                │ • Tingkatan: Free, Silver, Gold, Platinum             │
  │ • Larangan Imbalan Berbahaya / Ekstrem                │ • Invariansi Keselamatan & Kegawatdaruratan           │
  │ • Audit Trail & Protokol Pembalikan Reward            │ • Katalog Kunci Hak Akses (Feature Keys Entitlement)  │
  │ • Mitigasi Manipulasi Klien & Pipeline Event          │ • Middleware Akses Fitur & UX Soft-Gating             │
  ├───────────────────────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ [Klaster 5] Siklus Langganan & Finansial (101 - 125) │ [Klaster 6] Keamanan, UX, & Skema DB (Seksi 126 - 150)│
  │ • Integrasi Payment Gateway (Midtrans/Xendit/Stripe)  │ • Model Otoritatif Server Penuh (Zero Client Trust)   │
  │ • Verifikasi Tanda Tangan Webhook & Rekonsiliasi      │ • Skema Database Gamifikasi & Langganan Komprehensif  │
  │ • Upgrade, Downgrade, Prorata, & Grace Period         │ • UX Transparansi Poin, Paywall, & Aksesibilitas WCAG │
  │ • Pencegahan Dark Pattern & Transparansi Harga        │ • Larangan AI Memberikan Hak Istimewa Akses           │
  ├───────────────────────────────────────────────────────┴───────────────────────────────────────────────────────┤
  │ [Klaster 7] Integrasi Mesin, Pengujian, Kriteria DoD, & Narasi Kompetisi (Seksi 151 - 181)                    │
  │ • Sinkronisasi Feature Flags, Batas Kuota Penggunaan, & Persistensi Lencana Seumur Hidup                     │
  │ • Separasi Domain: Gamifikasi Tidak Memiliki Data Klinis & Membership Tidak Memiliki Gamifikasi               │
  │ • Matriks Pengujian Fungsional, Keamanan Klinis, & Kriteria Penerimaan (Definition of Done)                   │
  │ • Skenario Live Demo Kompetisi, Alur Pitch Pembeda Utama, & Prinsip Kedaulatan Etis Tertinggi                 │
  └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Tujuan & Ruang Lingkup Spesifikasi (Purpose & Scope)

Dokumen spesifikasi ini mendefinisikan secara menyeluruh arsitektur, kontrak data, mekanisme operasional, batas etika, dan logika rekayasa untuk subsistem **Gamifikasi (*Gamification*)** dan **Keanggotaan (*Membership*)** pada platform PRONOIA:

| Area Spesifikasi | Deskripsi Komponen & Ruang Lingkup Sistem |
| :--- | :--- |
| **Sistem Gamifikasi** | Mekanisme *points*, *badges*, *achievements*, *streaks*, *milestones*, dan *challenges*. |
| **Sistem Keanggotaan** | Tingkatan langganan (*membership tiers*), hak istimewa (*feature entitlements*), dan siklus hidup langganan (*subscription lifecycle*). |
| **Dinamika Perilaku** | Mekanisme keterikatan pengguna (*engagement mechanics*), penguatan kebiasaan preventif (*preventive habit reinforcement*). |
| **Integritas & Keamanan** | Pencegahan kecurangan (*anti-abuse*), verifikasi sisi server (*server-authoritative*), dan perlindungan idempotensi. |
| **Batas Etika Medis** | Batasan keselamatan kesehatan (*health-safety boundaries*), pencegahan rasa bersalah (*anti-shame*), dan privasi (*data privacy*). |
| **Interaksi Antarmuka** | Panduan pengalaman pengguna (*UX/UI*), visualisasi kemajuan non-komparatif, dan analitik keterlibatan pengguna. |

> [!IMPORTANT]
> Sistem gamifikasi dan keanggotaan dirancang secara spesifik untuk **memperkuat lingkaran kesehatan preventif (*preventive health loop*)** pengguna. Sistem ini **secara mutlak tidak boleh mengubah platform menjadi arena kompetisi kesehatan yang toksik**, komparasi kondisi biologis, ataupun komersialisasi keselamatan medis dasar.

---

## 2. Filosofi Desain Produk (Product Philosophy)

Filosofi produk PRONOIA membedakan secara tegas peran fungsional antara sistem gamifikasi dan keanggotaan:

### Alur Tujuan Gamifikasi (Behavioral Progression)
Gamifikasi diimplementasikan sebagai katalisator psikologis pembentukan kebiasaan sehat preventif:

```
  Kesadaran Diri        Motivasi Intrinsik        Konsistensi Harian        Penguatan Positif        Kemajuan Bertahap
  (Awareness)     ───►    (Motivation)      ───►    (Consistency)     ───►   (Reinforcement)   ───►     (Progress)
```

### Pilar Nilai Keanggotaan (Value Matrix)
Keanggotaan (*Membership*) disediakan sebagai model aksesibilitas layanan tingkat lanjut:

- **Akses Layanan (*Service Access*)**: Konsultasi telemedisin terarah, tinjauan ahli nutrisi, dan bimbingan terpersonalisasi.
- **Akses Fitur Komputasi (*Feature Access*)**: Kuota analitik AI multimodal tingkat lanjut, riwayat data jangka panjang, dan integrasi perangkat *wearable*.
- **Tingkat Dukungan (*Support Level*)**: Jalur penanganan operasional prioritas dan panduan teknis personal.
- **Program Komprehensif (*Program Access*)**: Kurikulum manajemen gaya hidup preventif terstruktur untuk sasaran kesehatan spesifik.

> [!CAUTION]
> **Gamifikasi maupun Keanggotaan BUKAN merupakan ukuran nilai atau derajat kesehatan seseorang.** Status *Platinum* atau saldo 5.000 poin tidak memiliki korelasi klinis langsung dengan kesembuhan atau imunitas biologis pengguna.

---

## 3. Distingsi Kritis Status (Critical Distinction: Health vs Game vs Tier)

Platform PRONOIA mewajibkan pemisahan tegas antara tiga pilar status sistem:

```
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│     HEALTH STATUS       │   ≠   │   GAMIFICATION STATUS   │   ≠   │    MEMBERSHIP STATUS    │
│ (Parameter Medis/Fisik) │       │ (Keterlibatan Produk)   │       │ (Tingkat Akses Langganan│
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
```

Berikut adalah distingsi nyata yang wajib ditegakkan di seluruh lapisan arsitektur:

| Kondisi Sistem | Representasi Nyata | BUKAN Merupakan (False Equivalency) |
| :--- | :--- | :--- |
| **Keanggotaan Platinum** | Akses ke kuota analitik AI lebih tinggi dan konsultasi rutin. | **Bukan berarti** memiliki profil kesehatan yang lebih prima (*Platinum ≠ Healthier*). |
| **Saldo 1.000 Poin** | Pengguna sangat aktif mencatat dan membaca materi edukasi. | **Bukan indikator** perbaikan parameter klinis darah (*1000 Points ≠ Better Health*). |
| **7-Day Activity Streak** | Pengguna rutin membuka dan mencatat rutinitas selama 7 hari. | **Bukan bukti klinis** remisi penyakit atau penyembuhan (*7-Day Streak ≠ Medical Cure*). |

---

## 4. Tujuan Strategis Gamifikasi (Gamification Objectives)

Gamifikasi pada PRONOIA dirancang secara eksklusif untuk membantu pengguna mencapai sasaran perilaku preventif:

- **Menyelesaikan Tindakan Preventif (*Preventive Action*)**: Memfasilitasi pengguna untuk menyelesaikan pencatatan harian, hidrasi teratur, konsumsi obat/suplemen tepat waktu, dan aktivitas fisik ringan.
- **Mempertahankan Kebiasaan Positif (*Habit Retention*)**: Membantu pengguna mempertahankan rutinitas hidup sehat secara konsisten tanpa merasa terbebani secara psikologis.
- **Partisipasi Tantangan Terstruktur (*Challenge Adherence*)**: Memberikan panduan harian terstruktur melalui program tantangan jangka pendek (misal: *7-Day Sleep Routine*).
- **Pemahaman Kemajuan Pribadi (*Progress Self-Awareness*)**: Memberikan umpan balik visual yang jelas mengenai dedikasi dan keteraturan pengguna dalam mengelola gaya hidup.
- **Re-engagement yang Relevan (*Contextual Re-engagement*)**: Mengajak pengguna kembali menggunakan fitur analisis data kesehatan ketika wawasan baru terdeteksi.
- **Penguatan Positif Berkelanjutan (*Positive Reinforcement*)**: Memberikan rasa pencapaian (*sense of achievement*) atas usaha preventif yang telah dilakukan.

---

## 5. Batasan & Non-Objektif Gamifikasi (Gamification Non-Objectives)

Untuk menjaga integritas etika dan keselamatan pasien, sistem gamifikasi PRONOIA memiliki batasan non-tujuan (*non-objectives*) yang tegas:

- **Bukan Alat Diagnosis Klinis**: Tidak boleh memberikan kesimpulan medis berdasarkan perolehan poin atau lencana.
- **Bukan Penentu 'Siapa Paling Sehat'**: Tidak boleh membandingkan siapa pengguna yang memiliki kondisi tubuh terbaik.
- **Tidak Memeringkat Penyakit/Kondisi**: Dilarang membuat peringkat berdasarkan kadar gula darah, tekanan darah, atau indeks massa tubuh.
- **Tidak Mempermalukan Pengguna (*No Shame Mechanics*)**: Dilarang menggunakan pesan yang menyalahkan, menakut-nakuti, atau memunculkan rasa bersalah ketika rutinitas terputus.
- **Tidak Memaksa Pengungkapan Data Pribadi**: Pengguna tidak boleh dipaksa membuka riwayat medis sensitif demi mendapatkan hadiah virtual.
- **Mencegah Pelacakan Berlebihan (*No Obsessive Tracking*)**: Tidak mendorong pengguna memeriksa aplikasi puluhan kali sehari secara kompulsif.
- **Tidak Memberi Imbalan Perilaku Berbahaya**: Dilarang memberi reward untuk puasa ekstrem tanpa pengawasan, olahraga melewati batas cedera, atau pembatasan kalori berlebihan.

---

## 6. Arsitektur Sistem Gamifikasi (Gamification Architecture)

Arsitektur gamifikasi PRONOIA beroperasi dengan pola pemrosesan kejadian terverifikasi (*verified event processing pipeline*):

```
                       AKSI PENGGUNA (USER ACTION)
                     (Input data, log lab, hidrasi)
                                   │
                                   ▼
                       VALIDATOR AKSI & DOMAIN
                    (Memverifikasi keabsahan data)
                                   │
                                   ▼
                       MESIN ATURAN PENCAPAIAN
                     (Evaluasi kriteria & syarat)
                                   │
                ┌──────────────────┼──────────────────┐
                ▼                  ▼                  ▼
           BUKU BESAR         EVALUASI           KALKULASI
           POIN (Points)    LENCANA (Badges)   KONSISTENSI (Streaks)
                │                  │                  │
                └──────────────────┼──────────────────┘
                                   ▼
                     REWARD SETTLEMENT & IDEMPOTENCY
                      (Katalog, voucher, reputasi)
                                   │
                                   ▼
                     PROGRESS KEMAJUAN PENGGUNA
```

---

## 7. Komponen Utama Gamifikasi (Gamification Core Components)

Ekosistem gamifikasi PRONOIA tersusun atas 8 komponen inti:

| Komponen Gamifikasi | Peran & Fungsi Utama dalam Sistem |
| :--- | :--- |
| **Poin (*Points*)** | Satuan unit imbalan internal (*ledger-based*) yang dapat diakumulasikan dari keterlibatan preventif. |
| **Lencana (*Badges*)** | Simbol visual pencapaian digital yang mewakili keberhasilan spesifik dalam ekosistem. |
| **Pencapaian (*Achievements*)** | Kriteria terstruktur yang mencatat tonggak aksi pengguna (misal: *First Insight Viewed*). |
| **Rangkaian (*Streaks*)** | Penghitung hari berturut-turut penyelesaian aktivitas kualifikasi yang sah. |
| **Tonggak (*Milestones*)** | Titik pencapaian kumulatif jangka panjang (misal: *100 Aksi Preventif Terselesaikan*). |
| **Tantangan (*Challenges*)** | Program terstruktur berbasis durasi dengan target tugas harian mikro yang terarah. |
| **Progres (*Progress*)** | Visualisasi persentase penyelesaian misi atau kurikulum pembentukan kebiasaan. |
| **Imbalan (*Rewards*)** | Manfaat digital atau keistimewaan yang dapat ditukarkan melalui poin yang sah. |

> [!NOTE]
> Tidak semua komponen di atas wajib aktif secara bersamaan pada fase rilis awal. Rilis dilakukan bertahap sesuai kesiapan logika pencegahan risiko klinis.

---

## 8. Cakupan Gamifikasi MVP (MVP Gamification Scope)

Cakupan gamifikasi pada fase *Minimum Viable Product* (MVP) difokuskan pada stabilitas logika dasar:

```
┌───────────────────────────────┐
│     CHALLENGE COMPLETION      │ ──► Menyelesaikan tugas tantangan 7 hari terstruktur.
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│      BASIC POINTS SYSTEM      │ ──► Menghitung poin pencatatan via buku besar sederhana.
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│       CORE BASIC BADGES       │ ──► Memberikan lencana tonggak pertama (*First Health Log*).
└───────────────────────────────┘
```

Fitur lanjutan seperti kalkulasi *streak* dinamis dan proteksi pembekuan (*streak freeze*) ditangguhkan ke fase P1 agar tim rekayasa dapat memastikan keakuratan validasi data klinis terlebih dahulu.

---

## 9. Cakupan Gamifikasi Fase P1 (P1 Gamification Scope)

Pada fase pengembangan lanjutan pertama (P1), fungsionalitas gamifikasi diperluas untuk membangun retensi yang berkelanjutan:

- **Mekanisme Rangkaian Konsistensi (*Streaks Engine*)**: Pelacakan konsistensi harian dengan toleransi jendela waktu (*grace window*).
- **Tonggak Pencapaian Kumulatif (*Milestones System*)**: Penghargaan untuk akumulasi pencatatan dalam 30, 60, dan 90 hari.
- **Koleksi Lencana Tematik (*Achievement Collections*)**: Pengelompokan lencana berdasarkan fokus kesehatan (Kebugaran, Pola Tidur, Manajemen Stres).
- **Imbalan Tantangan Terintegrasi (*Challenge Rewards*)**: Hadiah poin khusus dan sertifikat digital penyelesaian modul kesehatan.
- **Riwayat Kemajuan Interaktif (*Progress History*)**: Visualisasi kalender interaktif yang merangkum konsistensi hidup sehat pengguna.

---

## 10. Cakupan Gamifikasi Fase P2 (P2 Gamification Scope)

Pada fase skala penuh (P2), platform memperkenalkan kapabilitas gamifikasi ekosistem yang matang:

- **Sistem Pencapaian Dinamis Lanjutan (*Advanced Achievement System*)**: Pengenalan lencana multi-tingkat (*Tiered Badges: Bronze, Silver, Gold, Diamond*).
- **Tantangan Musiman Komunitas (*Seasonal Challenges*)**: Program kesehatan terkurasi bersama pakar (misal: *Ramadhan Healthy Routine*, *New Year Wellness*).
- **Rekognisi Positif Komunitas (*Community Recognition*)**: Penghargaan atas kontribusi edukatif dan inspirasi positif di forum komunitas.
- **Program Korporat & Organisasi (*Organization Programs*)**: Tantangan kelompok untuk inisiatif kesehatan karyawan (*Corporate Wellness*).
- **Papan Peringkat Non-Toksik Terpilih (*Safe Opt-In Leaderboards*)**: Papan peringkat keaktifan tim tanpa mengekspos data medis atau berat badan.

---

## 11. Sistem Poin Imbalan (Points System)

Poin adalah unit imbalan virtual internal pada sistem PRONOIA. Besaran poin ditentukan secara transparan dan dapat dikonfigurasi (*configurable*) melalui panel kontrol administrasi:

| Aksi Pengguna Terverifikasi | Bobot Poin Default | Kriteria Validasi Sisi Server |
| :--- | :---: | :--- |
| **Pencatatan Rekam Medis Pertama** | `+10 Poin` | Akun baru mencatat metriks vital atau riwayat lab perdana. |
| **Penyelesaian Tugas Harian Tantangan** | `+20 Poin` | Verifikasi bukti tugas tantangan yang aktif hari tersebut. |
| **Penyelesaian Seluruh Modul Tantangan** | `+100 Poin` | Seluruh *milestone* tantangan berturut-turut tercapai. |
| **Menyelesaikan Modul Edukasi Preventif** | `+15 Poin` | Membaca artikel klinis dan menyelesaikan kuis pemahaman mikro. |
| **Membagikan Wawasan Anonim di Komunitas** | `+5 Poin` | Kontribusi moderasi lolos verifikasi sentimen positif. |

> [!NOTE]
> Semua bobot poin di atas disimpan pada basis data konfigurasi sistem dan tidak boleh di-*hardcode* di dalam antarmuka klien aplikasi.

---

## 12. Poin Bukan Nilai Klinis (Points Are Not Health Scores)

Platform PRONOIA melarang keras penyetaraan saldo poin dengan status kesehatan pengguna:

```
  DILARANG KERAS (ANTI-PATTERN):
  ❌ "Skor Kesehatan Anda Hari Ini: 850 Poin"
  ❌ "Poin Anda rendah, Anda berisiko terkena komplikasi medis"

  STANDAR RESMI PRONOIA:
  ✅ Saldo Poin: 850 Poin (Tingkat Keterlibatan Aplikasi: Sangat Aktif)
  ✅ Status Kesehatan: Parameter Tekanan Darah Terkendali (Kategori Normal)
```

> [!CAUTION]
> Poin murni merefleksikan **tingkat keterlibatan (*product engagement*)** dan penyelesaian aksi administratif/edukatif pengguna di dalam aplikasi, bukan indikator diagnosis maupun prognosis biometrik.

---

## 13. Buku Besar Poin (Points Ledger Architecture)

Sistem poin wajib mengadopsi arsitektur buku besar berbasis kejadian (*immutable ledger-based architecture*). Saldo tidak boleh dimodifikasi melalui operasi `UPDATE balance` langsung, melainkan melalui pencatatan mutasi kredit/debit pada entitas `points_ledger`:

```sql
CREATE TABLE points_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(64) NOT NULL, -- e.g. CHALLENGE_TASK_COMPLETED, LEARNING_MODULE_READ
    points INT NOT NULL,              -- Positif untuk penambahan
    reference_type VARCHAR(64),       -- e.g. challenges, learning_modules, health_records
    reference_id UUID,               -- ID entitas penyebab transaksi
    idempotency_key VARCHAR(128) NOT NULL UNIQUE, -- Kunci pencegah duplikasi reward
    description VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_points_ledger_user ON points_ledger(user_id, created_at DESC);
```

---

## 14. Rasionalisasi Desain Buku Besar (Why Points Ledger)

Penerapan pola *ledger* memberikan keunggulan arsitektural krusial bagi keandalan sistem PRONOIA:

- **Jejak Audit Komprehensif (*Auditability*)**: Setiap poin yang masuk atau keluar memiliki catatan asal-usul yang tidak dapat diubah (*immutable history*).
- **Fasilitasi Pembalikan Transaksi (*Safe Reversals*)**: Jika verifikasi membuktikan adanya aksi palsu (*fraud*), entitas koreksi dapat dicatat tanpa merusak konsistensi data riwayat.
- **Kemudahan Pelacakan Masalah (*Debugging & Observability*)**: Tim rekayasa dapat merekonstruksi saldo pengguna pada titik waktu manapun (*time-travel balance calculation*).
- **Pencegahan Transaksi Duplikat (*Duplicate Prevention*)**: Kolom `idempotency_key` menjamin bahwa satu aksi eksternal hanya menghasilkan tepat satu catatan poin.
- **Analitik Keterlibatan (*Historical Engagement Analysis*)**: Data mutasi memungkinkan analisis kohort perilaku pengguna terhadap berbagai intervensi produk.

---

## 15. Kalkulasi Saldo Poin (Points Balance Calculation)

Saldo poin pengguna dihitung secara otoritatif melalui agregasi seluruh baris buku besar:

```sql
-- Formula Perhitungan Saldo Riil:
SELECT COALESCE(SUM(points), 0) AS current_balance 
FROM points_ledger 
WHERE user_id = :target_user_id;
```

### Strategi Performa (Cached Balance Strategy)
Untuk kebutuhan kueri cepat pada antarmuka pengguna:
1. Saldo dapat disimpan pada *cache* performa tinggi (Redis) atau tabel denormalisasi `user_points_summary`.
2. Jika terjadi ketidaksesuaian nilai (*cache drift*), nilai agregasi kueri `SUM(points)` dari tabel `points_ledger` selalu menjadi **satu-satunya sumber kebenaran (*single source of truth*)**.
3. Sistem menyediakan proses latar belakang berkala (*reconciliation worker*) untuk menyinkronkan ulang saldo *cache*.

---

## 16. Penghargaan Poin Positif (Positive Points Rules)

Sistem imbalan PRONOIA secara eksklusif berfokus pada penghargaan atas tindakan nyata yang bernilai positif (*positive reinforcement*):

```
  ┌─────────────────────────────────┐     +20 Poin
  │  Menyelesaikan Aksi Preventif   │ ───────────────► [Catat Buku Besar]
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐     +100 Poin
  │  Menyelesaikan Siklus Tantangan │ ───────────────► [Catat Buku Besar]
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐     +15 Poin
  │  Menyelesaikan Modul Belajar    │ ───────────────► [Catat Buku Besar]
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐     +50 Poin
  │  Mencapai Tonggak 30 Hari Aktif │ ───────────────► [Catat Buku Besar]
  └─────────────────────────────────┘
```

Setiap penambahan poin wajib disertai referensi kejadian (*event attribution*) yang sah.

---

## 17. Larangan Penalti Poin Negatif (Negative Points Prohibition)

Kebijakan arsitektur produk PRONOIA **melarang penggunaan penalti poin negatif (*Negative Points Prohibition*)** untuk kelalaian pengguna:

> [!WARNING]
> Mengurangi poin pengguna karena melewatkan jadwal pencatatan (*missed log*), absen dari tantangan harian, atau terlambat menghadiri konsultasi menciptakan efek psikologis punitif (*shame-driven engagement*) yang terbukti memicu kelelahan mental (*burnout*) dan pengabaian aplikasi (*app abandonment*).

### Standar Penanganan Kelalaian:
- **Prinsip Utama**: **Tanpa Imbalan (*No Reward*)**, BUKAN Hukuman (*Punishment*).
- Jika pengguna tidak mencatat gula darah pada hari Selasa, saldo poin hari Selasa tidak bertambah (`+0`), namun poin yang telah dikumpulkan pada hari Senin **tetap aman dan tidak boleh dipotong**.

---

## 18. Kelayakan Perolehan Reward (Reward Eligibility Criteria)

Pemberian imbalan (*reward issuance*) wajib melewati tahapan verifikasi berlapis di sisi server sebelum saldo dikreditkan:

```
  [1] AKSI PENGGUNA TERJADI
            │
            ▼
  [2] VALIDASI DATA KLINIS & INTEGRITAS
      (Apakah data masuk akal secara medis dan format valid?)
            │
            ▼
  [3] EVALUASI ATURAN KELAYAKAN (ELIGIBILITY CHECK)
      (Apakah pengguna terdaftar dalam program & batas harian belum terlampaui?)
            │
            ▼
  [4] VERIFIKASI IDEMPOTENSI (IDEMPOTENCY VERIFICATION)
      (Apakah event_id atau request_id sudah pernah diproses?)
            │
            ▼
  [5] PENULISAN BUKU BESAR POIN & PENERBITAN HADIAH
```

---

## 19. Eksekusi Reward Idempoten (Idempotent Rewards Execution)

Untuk mencegah eksploitasi ganda atau kegagalan jaringan yang memicu pengiriman permintaan berulang kali (*network retry*), seluruh pemrosesan reward wajib bersifat **idempoten**:

```
  Pengiriman Pertama : Event Task_Completion_ID_999 ──► Saldo +20 Poin (Berhasil Dibuat)
  Pengiriman Ulang   : Event Task_Completion_ID_999 ──► Saldo +0 Poin (Duplicate Detected, HTTP 200 OK)
```

### Mekanisme Kunci Idempotensi:
1. `idempotency_key` dikonstruksikan dengan format:
   `reward:{user_id}:{event_type}:{reference_id}:{date_or_epoch}`
2. Adanya *unique constraint* pada tabel basis data menjamin penolakan mutasi duplikat pada level mesin transaksi database (*database-level conflict guard*).

---

## 20. Sistem Pencapaian & Lencana (Achievement & Badge System)

Pencapaian (*Achievement*) adalah penghargaan terstruktur yang menandai penguasaan atau penyelesaian tonggak perilaku tertentu dalam aplikasi:

- **First Insight Explored**: Membuka dan mempelajari analisis grafik kesehatan pertama yang dihasilkan oleh sistem.
- **First Health Record Logged**: Sukses melakukan entri metrik fisik pertama kali ke dalam buku catatan kesehatan.
- **Challenge Starter**: Bergabung dan berkomitmen dalam program tantangan gaya hidup sehat perdana.
- **7-Day Consistency Builder**: Menyelesaikan seluruh rutinitas harian selama tujuh hari berturut-turut.
- **Preventive Loop Completed**: Menyelesaikan siklus lengkap dari deteksi risiko, rekomendasi gaya hidup, hingga tindakan nyata.
- **Community Wellness Contributor**: Memberikan respon atau apresiasi yang membangun pada forum diskusi komunitas.

---

## 21. Kategori Pencapaian (Achievement Categories)

Setiap pencapaian wajib diklasifikasikan ke dalam kategori yang jelas untuk mempermudah navigasi pada profil pengguna:

| Kategori Pencapaian | Fokus Perilaku Pengguna | Contoh Lencana Terkait |
| :--- | :--- | :--- |
| `BEGINNER` | Orientasi awal dan eksplorasi fitur dasar aplikasi. | *Langkah Awal*, *Profil Lengkap*. |
| `CONSISTENCY` | Pembentukan rutinitas berulang dalam jangka waktu teratur. | *Ksatria Rutinitas 7 Hari*, *Konsistensi 30 Hari*. |
| `LEARNING` | Literasi kesehatan preventif dan pemahaman modul medis. | *Pembelajar Sadar Sehat*, *Master Literasi Nutrisi*. |
| `CHALLENGE` | Penyelesaian program tantangan kesehatan bertema spesifik. | *Penakluk Tantangan Tidur Nyenyak*. |
| `COMMUNITY` | Interaksi positif dan pemberian semangat antar pengguna. | *Pemberi Inspirasi Sehat*. |
| `PREVENTIVE_ACTION` | Eksekusi tindakan fisik/gaya hidup yang disarankan dokter. | *Hidrasi Sempurna*, *Aktivitas Langkah Seimbang*. |
| `MILESTONE` | Akumulasi pencapaian volume besar dalam jangka panjang. | *100 Aksi Preventif Tercatat*. |

---

## 22. Struktur Metadata Pencapaian (Achievement Structure)

Definisi pencapaian dikelola dalam tabel referensi sistem `achievements`:

```sql
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(64) NOT NULL UNIQUE,     -- Kode unik: 'CHALLENGE_STARTER', 'SEVEN_DAY_CONSISTENCY'
    name VARCHAR(128) NOT NULL,          -- Judul tampilan: 'Ksatria Rutinitas 7 Hari'
    description TEXT NOT NULL,           -- Deskripsi aksi yang harus dipenuhi
    category VARCHAR(32) NOT NULL,       -- Relasi kategori: 'CONSISTENCY', 'BEGINNER', dll.
    icon_url VARCHAR(255) NOT NULL,      -- Aset visual SVG lencana
    rules JSONB NOT NULL,                -- Spesifikasi kriteria verifikasi dalam format JSON
    points_reward INT NOT NULL DEFAULT 0,-- Bonus poin saat lencana terbuka
    status VARCHAR(16) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'INACTIVE', 'ARCHIVED'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 23. Aturan Validasi Pencapaian (Achievement Rules Engine)

Mesin aturan pencapaian (*Achievement Rules Engine*) mengevaluasi ekspresi deklaratif berbasis kondisi terkuantisasi:

| Tipe Parameter Aturan | Struktur Kondisi JSON | Indikator Keberhasilan |
| :--- | :--- | :--- |
| `action_count` | `{"metric": "health_log", "count": 10}` | Pengguna mencatat metrik kesehatan sebanyak 10 kali. |
| `challenge_completion`| `{"challenge_id": "*", "count": 1}` | Pengguna berhasil menyelesaikan minimal 1 tantangan. |
| `streak_length` | `{"consecutive_days": 7}` | Mencapai 7 hari konsistensi aksi kualifikasi berturut-turut. |
| `insight_action` | `{"insight_type": "lifestyle", "status": "read"}`| Membaca dan meninjau wawasan gaya hidup yang diberikan AI. |
| `learning_completion` | `{"category": "diabetes_prevention", "score_gte": 80}`| Menyelesaikan kuis modul edukasi pencegahan diabetes. |
| `community_contribution`| `{"action": "helpful_reply", "count": 5}` | Memberikan tanggapan yang ditandai bermanfaat oleh 5 rekan. |

---

## 24. Contoh Konkret Pencapaian (Achievement Concrete Examples)

Berikut adalah spesifikasi konkret untuk implementasi lencana awal platform:

### 1. Lencana Langkah Pertama (*First Step Badge*)
- **Kondisi Validasi**: Pengguna berhasil menyelesaikan dan menyimpan 1 tindakan preventif terverifikasi pertama kali di aplikasi.
- **Imbalan**: Lencana Digital *First Step* + Bonus `+10 Poin` ke Buku Besar.

### 2. Lencana Pelopor Tantangan (*Challenge Starter Badge*)
- **Kondisi Validasi**: Pengguna secara resmi mendaftar dan menyetujui komitmen pada 1 program tantangan preventif.
- **Imbalan**: Lencana Digital *Challenge Starter* + Akses ke grup diskusi tantangan.

### 3. Lencana Pembangun Konsistensi (*Consistency Builder Badge*)
- **Kondisi Validasi**: Pengguna berhasil menyelesaikan tugas harian pada tantangan aktif selama 7 hari berturut-turut tanpa terputus.
- **Imbalan**: Lencana Eksklusif *Consistency Builder* + Bonus `+50 Poin`.

---

## 25. Keamanan Klinis Pencapaian (Achievement Health Safety)

Penamaan dan kriteria pencapaian wajib mencerminkan pencapaian **perilaku penggunaan produk (*Product Achievement*)**, bukan **keadaan patologis atau klinis (*Clinical Condition*)**:

```
┌────────────────────────────────────────┬────────────────────────────────────────┐
│      STANDAR AMAN PRONOIA (BENAR)      │      LARANGAN TOKSIK (ANTI-PATTERN)    │
├────────────────────────────────────────┼────────────────────────────────────────┤
│ ✅ "Pembangun Rutinitas 7 Hari"         │ ❌ "Juara Bebas Penyakit Kronis"       │
│ ✅ "Pencatat Hidrasi Konsisten"         │ ❌ "Penakluk Hipertensi 120/80"        │
│ ✅ "Penjelajah Wawasan Kesehatan"       │ ❌ "Pasien Paling Patuh Terbaik"       │
│ ✅ "Penggiat Langkah Preventif"         │ ❌ "Pemusnah Kolesterol Jahat"         │
└────────────────────────────────────────┴────────────────────────────────────────┘
```

> [!IMPORTANT]
> Mengaitkan lencana dengan kesembuhan penyakit biologis merupakan tindakan tidak etis dan menyesatkan secara medis (*medically misleading*), karena parameter klinis dipengaruhi oleh faktor genetika, lingkungan, dan terapi medis riil di luar aplikasi.

---

## 26. Entitas Pencapaian Pengguna (User Achievement Entity)

Relasi antara pengguna dan lencana yang berhasil diraih disimpan pada tabel `user_achievements`:

```sql
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE RESTRICT,
    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reference_type VARCHAR(64),          -- e.g. challenges, streaks
    reference_id UUID,                  -- ID entitas pemicu pencapaian
    metadata JSONB DEFAULT '{}'::jsonb, -- Konteks tambahan saat lencana dibuka
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_achievements_lookup ON user_achievements(user_id, achievement_id);
```

---

## 27. Pencapaian Unik Satu Kali (Unique One-Time Achievements)

Mayoritas lencana bersifat pencapaian sekali seumur hidup (*one-time unique unlock*). Sistem basis data wajib menerapkan konstrain keunikan (*unique constraint*) untuk mencegah penggandaan data lencana:

```sql
-- Penegakan Integritas Unik:
ALTER TABLE user_achievements 
ADD CONSTRAINT uq_user_single_achievement 
UNIQUE (user_id, achievement_id);
```

Jika aturan evaluasi terpicu kembali oleh aksi pengguna di masa mendatang, layanan pencapaian (*Achievement Service*) mendeteksi status kepemilikan dan mengabaikan proses pemberian lencana baru secara idempoten.

---

## 28. Pencapaian Berulang (Repeatable Achievements)

Untuk pencapaian berkala (seperti *Penyelesai Tantangan Bulanan* atau *Konsistensi Kuartal*), sistem mendukung lencana berulang (*repeatable achievements*):

### Strategi Pemodelan:
1. **Pemisahan Konstrain Berbasis Periode**:
   Menyertakan kolom periode waktu (misal: `period_key` seperti `'2026-03'`) pada konstrain unik:
   ```sql
   UNIQUE (user_id, achievement_id, period_key)
   ```
2. **Penghitung Kelipatan (*Iteration Counter*)**:
   Menyimpan tingkat atau jumlah pengulangan (*level / repeat_count*) pada baris pencapaian yang sama, sehingga antarmuka menampilkan lencana dengan penanda bintang kelipatan (misal: *Lencana Tantangan Bulanan x3*).

---

## 29. Pelacakan Progres Pencapaian (Achievement Progress Tracking)

Pencapaian dengan syarat bertahap wajib mengekspos informasi kemajuan perantara (*intermediate progress*) agar pengguna mengetahui jarak pencapaian target:

```json
{
  "achievement_key": "CHALLENGE_MASTER",
  "name": "Ahli Tantangan Preventif",
  "category": "CHALLENGE",
  "target_count": 10,
  "current_progress": 4,
  "progress_percentage": 40.0,
  "is_unlocked": false,
  "remaining_steps": 6,
  "next_milestone_hint": "Selesaikan 6 program tantangan lagi untuk membuka lencana ini."
}
```

Antarmuka pengguna menampilkan bilah kemajuan (*progress bar*) visual yang elegan dan jelas pada kartu rincian pencapaian.

---

## 30. Tonggak Pencapaian Jangka Panjang (Milestones Progression)

Tonggak (*Milestones*) adalah pencapaian berskala makro yang merayakan akumulasi komitmen jangka panjang pengguna dalam menjaga gaya hidup sehat:

| Tonggak Utama (Milestone) | Parameter Verifikasi Sistem | Imbalan Ekosistem |
| :--- | :--- | :--- |
| **10 Tindakan Preventif** | Menyelesaikan 10 aksi pencatatan atau rekomendasi sehat. | Lencana *Bronze Milestone* + 25 Poin. |
| **50 Tindakan Preventif** | Menyelesaikan 50 aksi preventif terverifikasi. | Lencana *Silver Milestone* + 150 Poin. |
| **5 Tantangan Terselesaikan** | Menyelesaikan 5 kurikulum tantangan kesehatan penuh. | Lencana *Gold Milestone* + Kupon Mitra Sehat. |
| **100 Poin Literasi Medis** | Mengakumulasikan 100 poin murni dari modul edukasi. | Sertifikat Digital Literasi Preventif. |

---

## 31. Desain Arsitektur Milestone (Milestone Architectural Design)

Perancangan tonggak pencapaian pada PRONOIA wajib memenuhi 5 pilar arsitektural:

1. **Bermakna Nyata (*Meaningful*)**: Menghargai investasi waktu dan dedikasi pengguna dalam membina kesehatan diri.
2. **Mudah Dipahami (*Understandable*)**: Kriteria pencapaian dijelaskan dengan bahasa yang lugas tanpa kalkulasi tersembunyi yang membingungkan.
3. **Bebas Label Klinis (*Non-Clinical*)**: Tidak menggunakan istilah kondisi patologis sebagai nama tonggak pencapaian.
4. **Dapat Dicapai Secara Realistis (*Achievable*)**: Dirancang dengan kurva kesulitan yang bertahap (*gradual difficulty progression*) agar tidak memicu keputusasaan.
5. **Terukur Sisi Server (*Server Measurable*)**: Memiliki metrik pembuktian matematis yang valid di basis data tanpa interpretasi subjektif.

---

## 32. Mekanisme Rangkaian Konsistensi (Streaks Mechanics)

Rangkaian (*Streaks*) mengukur keteraturan aksi pengguna dalam satuan hari berturut-turut (*consecutive active days*). PRONOIA membedakan tipe *streak* berdasarkan domain aktivitas:

| Tipe Streak | Definisi Aktivitas Kualifikasi | Jendela Batas Waktu |
| :--- | :--- | :--- |
| `CHALLENGE_STREAK` | Menyelesaikan tugas harian pada program tantangan aktif. | Harian (00:00 - 23:59 Waktu Lokal Pengguna). |
| `TRACKING_STREAK` | Mencatat minimal satu metrik vital harian secara teratur. | Harian (Toleransi hingga 03:00 dini hari berikutnya). |
| `LEARNING_STREAK` | Membaca wawasan preventif baru setiap hari kerja. | Hari Kerja (Senin s.d. Jumat). |
| `ROUTINE_STREAK` | Menandai rutinitas pagi atau malam yang telah disusun. | Siklus 24 Jam Mandiri. |

---

## 33. Definisi Validitas Streak (Streak Qualification Definition)

Perhitungan hari berturut-turut **hanya boleh dihitung dari kejadian yang secara eksplisit diklasifikasikan sebagai kejadian kualifikasi sah (*qualifying event*)**:

```
  DIIZINKAN SEBAGAI KEJADIAN KUALIFIKASI (QUALIFYING):
  ✅ Menyelesaikan tugas harian tantangan (misal: berjalan 5.000 langkah).
  ✅ Mencatat data glukosa atau tekanan darah pada formulir terverifikasi.
  ✅ Menandai konsumsi suplemen harian yang telah diresepkan.

  DILARANG SEBAGAI KEJADIAN KUALIFIKASI (NON-QUALIFYING):
  ❌ Hanya sekadar membuka aplikasi (App Opened / Passive Session).
  ❌ Menekan banner promosi atau membaca notifikasi pemasaran.
  ❌ Membuka menu pengaturan aplikasi tanpa melakukan aksi kesehatan apapun.
```

> [!IMPORTANT]
> Aksi pasif seperti membuka aplikasi tidak mencerminkan tindakan preventif riil dan dilarang digunakan sebagai dasar penghitungan *streak*.

---

## 34. Perlindungan & Keamanan Streak (Streak Health Safety & Anti-Anxiety)

Mekanisme *streak* memiliki risiko menimbulkan ketergantungan obsesif dan kecemasan psikologis (*streak anxiety*). Oleh karena itu, arsitektur *streak* PRONOIA dilengkapi batasan keamanan preventif:

- **Pencegahan Pelacakan Berlebihan (*Anti-Obsessive Tracking*)**: Menolak pengakuan aksi berulang-ulang dalam satu hari yang bertujuan menaikkan angka secara buatan.
- **Pencegahan Perilaku Ekstrem**: Jika seorang pengguna sedang sakit atau demam, sistem menyarankan istirahat tanpa mengancam pemutusan *streak*.
- **Pencegahan Rasa Bersalah (*Anti-Guilt Protection*)**: Tidak mengirimkan notifikasi bernada menyindir, menakuti, atau menyalahkan saat pengguna absen.
- **Penghilangan Rasa Takut Kehilangan (*Loss Aversion Mitigation*)**: Menekankan bahwa data kemajuan tubuh pengguna tidak hilang meskipun angka *streak* tereset.

---

## 35. Penanganan Streak Terputus (Streak Break Handling)

Ketika pengguna melewatkan hari kualifikasi dan rangkaian konsistensi terputus (*streak break*), sistem menyajikan komunikasi empati yang konstruktif:

```
┌────────────────────────────────────────┬────────────────────────────────────────┐
│      KOMUNIKASI BURUK (DILARANG)       │     STANDAR RAMAH PRONOIA (DISETUJUI)  │
├────────────────────────────────────────┼────────────────────────────────────────┤
│ ❌ "Anda Gagal! Streak 14 hari Anda    │ ✅ "Rangkaian hari Anda terhenti,      │
│     hangus karena malas mencatat."     │     namun 14 hari kebiasaan baik yang  │
│                                        │     Anda bangun tetap bermanfaat bagi  │
│ ❌ "Kesehatan Anda terancam karena     │     tubuh Anda. Istirahat sejenak dan  │
│     absen kemarin."                    │     mulai kembali kapan pun Anda siap."│
└────────────────────────────────────────┴────────────────────────────────────────┘
```

Pendekatan ini berlandaskan prinsip medis bahwa kesehatan adalah perjalanan jangka panjang (*marathon*), bukan perlombaan kesempurnaan tanpa jeda.

---

## 36. Pemulihan Rangkaian Streak (Streak Recovery Grace Period)

Ketika seorang pengguna melewatkan aksi kualifikasi harian karena kendala kesehatan atau kesibukan mendesak, sistem menyediakan protokol pemulihan yang suportif (*streak recovery grace window*):

| Opsi Alur Pemulihan | Mekanisme Teknis Sistem | Dampak Terhadap Angka Rangkaian |
| :--- | :--- | :--- |
| **Jendela Toleransi 24 Jam (*Grace Window*)** | Menyelesaikan aksi susulan dalam kurun waktu 24 jam berikutnya dengan verifikasi log. | Rangkaian berlanjut tanpa terputus (*Continue Streak*). |
| **Penyetelan Ulang Penuh Empati (*Compassionate Reset*)** | Memulai kembali rangkaian dari hari ke-1 dengan pesan apresiasi atas capaian sebelumnya. | Angka *current streak* kembali ke 1, rekor *longest streak* tetap tersimpan. |

> [!TIP]
> Fitur pemulihan bertujuan menjaga motivasi intrinsik pengguna agar tidak putus asa hanya karena satu hari yang terlewat, sejalan dengan prinsip perubahan perilaku bertahap (*incremental behavior modification*).

---

## 37. Pembekuan Rangkaian Sementara (Streak Freeze Protection)

Fitur Pembekuan Rangkaian (*Streak Freeze*) adalah mekanisme perlindungan opsional yang mengizinkan pengguna mengamankan rangkaian konsistensi mereka saat memerlukan waktu istirahat medis atau hari libur terencana:

```
┌───────────────────────────────────────────────┐
│               AKTIVASI STREAK FREEZE          │
│ (Pengguna sakit, bepergian, atau hari rehat)  │
└───────────────────────┬───────────────────────┘
                        ▼
┌───────────────────────────────────────────────┐
│            STATUS: HARI TERLINDUNGI           │
│        (No action required for this date)     │
└───────────────────────┬───────────────────────┘
                        ▼
┌───────────────────────────────────────────────┐
│           RANGKAIAN TETAP TERPELIHARA         │
│          (Streak counter does not reset)      │
└───────────────────────────────────────────────┘
```

### Pedoman Etika Implementasi:
- Diberikan kuota terbatas (maksimal 2 kali per bulan kalender) untuk mencegah manipulasi pasif.
- Wajib dikomunikasikan secara eksplisit sebagai fitur kenyamanan (*engagement feature*), bukan pembenaran medis untuk mengabaikan terapi kesehatan.

---

## 38. Sistem Tantangan Kesehatan (Challenge System Architecture)

Sistem Tantangan (*Challenge System*) adalah kurikulum terstruktur berbasis rentang waktu tertentu yang membimbing pengguna mengadopsi kebiasaan preventif melalui tugas harian mikro:

```
                   STRUKTUR ENTITAS TANTANGAN (CHALLENGE ENTITY)
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ • Sasaran Program (Goal)      : Definisi objektif perilaku hidup sehat  │
  │ • Durasi Program (Duration)   : Rentang waktu tetap (misal: 7 / 14 hari)│
  │ • Daftar Tugas (Tasks)        : Rangkaian aksi mikro harian terverifikasi│
  │ • Aturan Validasi (Rules)     : Syarat mutlak pemenuhan tiap butir tugas│
  │ • Pelacakan Progres (Progress): Metrik visual pencapaian berkala        │
  │ • Imbalan Selesai (Reward)    : Poin buku besar dan lencana eksklusif   │
  │ • Syarat Kelulusan (Completion): Kriteria kelulusan kurikulum program   │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

## 39. Contoh Spesifikasi Tantangan (Challenge Real-World Examples)

Berikut adalah contoh kurikulum nyata untuk implementasi tantangan awal platform:

### Spesifikasi: "Tantangan Rutinitas Tidur Sehat 7 Hari" (*7-Day Sleep Routine Challenge*)
- **Tujuan Klinis Preventif**: Membangun ritme sirkadian yang stabil dan konsisten.
- **Rincian Tugas Mikro Harian**:
  - **Hari 1 s.d. Hari 3**: Mencatat jam tidur dan mematikan layar gadget 30 menit sebelum tidur (*Screen-Free Bedtime*).
  - **Hari 4 s.d. Hari 6**: Menjaga jam bangun pagi stabil dalam rentang selisih ±30 menit dan mencatat tingkat kesegaran bangun tidur.
  - **Hari 7**: Meninjau ringkasan tren kualitas tidur mingguan dan menyusun target pekan berikutnya.
- **Hasil Akhir Program**:
  - Saldo +100 Poin pada Buku Besar.
  - Pembukaan Lencana Digital: *Siklus Tidur Teratur*.

---

## 40. Protokol Keselamatan Tantangan (Challenge Clinical Safety)

Seluruh target dalam program tantangan wajib memenuhi kriteria keselamatan preventif yang ketat:

- **Beban Target Masuk Akal (*Reasonable Targets*)**: Menghindari target fisik atau biologis yang tidak manusiawi (contoh: dilarang membuat target lari 20 km bagi kelompok pemula).
- **Dapat Disesuaikan (*Configurable & Adaptive*)**: Target intensitas dapat disesuaikan dengan profil mobilitas dan usia pengguna.
- **Tinjauan Tim Kesehatan (*Medically Reviewed*)**: Setiap kurikulum tantangan wajib melalui tinjauan dan persetujuan dari dewan medis/nutrisi PRONOIA.
- **Sifat Non-Punitif (*Non-Punitive Design*)**: Kegagalan menyelesaikan satu tugas mikro tidak menghapus pencapaian hari-hari sebelumnya.
- **Relevansi Demografis**: Kurikulum disesuaikan dengan sasaran audiens (contoh: kelompok lansia memiliki target mobilitas sendi, bukan angkat beban berat).

---

## 41. Klasifikasi Kategori Tantangan (Challenge Categories)

Tantangan pada PRONOIA dikelompokkan ke dalam 7 pilar preventif utama:

| Kode Kategori | Domain Perilaku Kesehatan | Fokus Tindakan Mikro Harian |
| :--- | :--- | :--- |
| `SLEEP_ROUTINE` | Higienitas dan stabilitas pola tidur. | Menjaga jadwal tidur teratur dan mengurangi paparan cahaya biru. |
| `PHYSICAL_ACTIVITY` | Aktivitas gerak dan mobilitas harian. | Berjalan kaki ringan, peregangan postur kerja, tangga aktif. |
| `NUTRITION_AWARENESS`| Kesadaran kualitas dan komposisi asupan. | Membaca label gizi, meningkatkan konsumsi serat sayur dan buah. |
| `HYDRATION_LOGGING` | Kecukupan asupan cairan tubuh. | Mencatat konsumsi air putih harian sesuai target fisiologis. |
| `ROUTINE_CONSISTENCY`| Pembentukan kebiasaan hidup teratur. | Mengonsumsi obat preventif dan mencatat data vital pagi hari. |
| `HEALTH_LEARNING` | Peningkatan literasi kesehatan mandiri. | Membaca wawasan klinis dan mempelajari faktor risiko keluarga. |
| `PREVENTIVE_SCREENING`| Deteksi dini berkala. | Menjadwalkan pemeriksaan laboratorium dasar atau skrining mandiri. |

---

## 42. Pendaftaran & Partisipasi Tantangan (Challenge Enrollment Flow)

Alur pendaftaran pengguna ke dalam program tantangan dirancang transparan dengan verifikasi persetujuan:

```
  [1] JELAJAHI KATALOG (Browse Challenges)
      Pengguna melihat daftar tantangan yang sesuai dengan minat kesehatan.
                        │
                        ▼
  [2] TELAAH RINCIAN & SYARAT (Review Rules & Commitments)
      Membaca durasi, target harian, komitmen waktu, dan pedoman keselamatan.
                        │
                        ▼
  [3] PERSETUJUAN KELAYAKAN (Eligibility Check & Consent)
      Sistem memvalidasi ketiadaan kontraindikasi dan pengguna menyatakan kesiapan.
                        │
                        ▼
  [4] PENDAFTARAN RESMI (Enrollment Registration)
      Tercatat dalam tabel partisipasi dengan status 'JOINED'.
                        │
                        ▼
  [5] INISIASI TANTANGAN (Start Day 1)
      Akses tugas hari pertama dibuka sesuai zona waktu lokal pengguna.
```

---

## 43. Kelayakan Partisipasi Tantangan (Challenge Eligibility Criteria)

Kelayakan pengguna untuk bergabung dalam suatu tantangan ditentukan oleh parameter berikut:

- **Partisipasi Program (*Program Enrolled*)**: Ketersediaan program pendampingan klinis yang sedang diikuti pengguna.
- **Tingkatan Keanggotaan (*Membership Tier*)**: Beberapa tantangan komprehensif dengan pendampingan dokter spesialis memerlukan keanggotaan aktif (*Gold/Platinum*).
- **Kesesuaian Kelompok Usia (*Age Group Safety*)**: Tantangan dengan aktivitas aerobik memerlukan batasan usia aman.
- **Tujuan Kesehatan Mandiri (*User Health Goals*)**: Keselarasan tantangan dengan sasaran yang dipilih pengguna pada profil preventif.
- **Kapasitas Partisipasi Aktif**: Membatasi jumlah tantangan aktif bersamaan (maksimal 2 tantangan sekaligus) guna mencegah disonansi kognitif.

> [!CAUTION]
> **Larangan Penggunaan Status Medis Inferensi**: Sistem dilarang membatasi akses tantangan berdasarkan tebakan kondisi medis sensitif tanpa tata kelola (*data governance*) dan persetujuan eksplisit dari pengguna.

---

## 44. Pemantauan Progres Tantangan (Challenge Progress Tracking)

Status kemajuan tantangan wajib dipresentasikan secara transparan, deterministik, dan dapat diverifikasi kapan saja:

```
  Tantangan: 7-Day Sleep Routine
  Kemajuan : [████████████░░░░░░░░] 57% (4 dari 7 Tugas Selesai)
  Status   : Hari ke-5 Sedang Berjalan
```

### Aturan Transparansi Progres:
1. Menampilkan secara terperinci tanggal dan jam tugas yang telah berhasil diselesaikan (*timestamped tasks*).
2. Menjelaskan secara presisi syarat tugas hari berikutnya tanpa kalkulasi tersembunyi.
3. Status persentase dihitung dengan rumus:
   $$\text{Progress (\%)} = \left( \frac{\text{Tugas Terselesaikan Valid}}{\text{Total Tugas Kurikulum}} \right) \times 100\%$$

---

## 45. Penyelesaian & Klaim Tantangan (Challenge Completion & Settlement)

Penyelesaian tantangan (*Challenge Completion*) dieksekusi secara otomatis oleh sistem saat kriteria pemenuhan terpenuhi secara penuh:

```
  ┌─────────────────────────────────────────────────────────────┐
  │             KRITERIA KELULUSAN TERPENUHI PENUH              │
  │            (Contoh: 7 dari 7 Tugas Harian Valid)            │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │        STATUS PARTISIPASI DIUBAH MENJADI 'COMPLETED'        │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                 PENERBITAN REWARD IDEMPOTEN                 │
  │ • Kredit Poin Imbalan ke Buku Besar (points_ledger)         │
  │ • Buka Kunci Lencana Digital (user_achievements)            │
  │ • Catat Riwayat Penyelesaian & Kirimkan Notifikasi Selamat │
  └─────────────────────────────────────────────────────────────┘
```

---

## 46. Aturan Pengulangan Tantangan (Challenge Repetition Policy)

Pengguna diizinkan mengulang program tantangan (*repeatable challenge*) untuk memperkuat pembentukan kebiasaan jangka panjang:

### Penanganan Teknis di Basis Data:
- Setiap pengikutsertaan baru wajib dicatat sebagai baris data unik (*distinct participation instance*) dengan `enrollment_id` baru.
- Catatan partisipasi masa lalu tetap tersimpan secara historis sebagai bukti komitmen sebelumnya (*historical achievement archive*).
- Pemberian poin imbalan pada pengulangan dapat disesuaikan (misal: pemberian poin penuh pada pengikutsertaan pertama, dan 50% poin pada siklus pengulangan) guna mencegah *farming* poin artifisial.

---

## 47. Pembatalan Partisipasi Tantangan (Challenge Cancellation Flow)

Pengguna memiliki hak penuh untuk membatalkan atau keluar dari program tantangan kapan pun tanpa dikenai sanksi atau penalti:

```
  ┌──────────┐     Pendaftaran     ┌──────────┐      Hari Ke-1 Dimulai     ┌──────────┐
  │  JOINED  │ ──────────────────► │  ACTIVE  │ ─────────────────────────► │COMPLETED │
  └────┬─────┘                     └────┬─────┘                            └──────────┘
       │                                │
       │ Pengguna Memilih Keluar        │ Pengguna Berhenti di Tengah Jalan
       ▼                                ▼
  ┌──────────┐                     ┌──────────┐
  │   LEFT   │                     │ EXPIRED  │ (Batas waktu program terlampaui)
  └──────────┘                     └──────────┘
```

Status `LEFT` mencatat pembatalan secara damai tanpa menghapus poin harian yang sempat dikumpulkan secara sah selama masa keaktifan.

---

## 48. Notifikasi Cerdas Tantangan (Challenge Event Notifications)

Notifikasi terkait tantangan dirancang tepat sasaran, berorientasi bantuan, dan menghormati preferensi pribadi pengguna:

| Jenis Notifikasi | Waktu Pengiriman | Contoh Pesan Ramah Pengguna |
| :--- | :--- | :--- |
| **Pengingat Mulai** | H-1 Sebelum Program | *"Tantangan Rutinitas Tidur Sehat Anda dimulai besok pagi. Siapkan diri dengan santai!"* |
| **Tugas Tersedia** | Pagi Hari (Sesuai Preferensi) | *"Tugas Hari ke-3: Luangkan waktu 5 menit untuk relaksasi pernapasan sebelum beraktivitas."* |
| **Dukungan Kemajuan**| Menjelang Garis Akhir | *"Luar biasa! Tinggal 2 tugas lagi untuk menyelesaikan tantangan minggu ini."* |
| **Perayaan Sukses** | Sesaat Setelah Selesai | *"Selamat! Anda telah menyelesaikan 7 hari tantangan. Kebiasaan baik Anda semakin kokoh."* |

---

## 49. Pencegahan Kelelahan Notifikasi (Notification Fatigue Mitigation)

Untuk melindungi kenyamanan mental dan mencegah kelelahan notifikasi (*notification fatigue*), sistem menerapkan aturan pembatasan pengiriman:

```
  DILARANG KERAS:
  ❌ Mengirimkan 8-12 notifikasi sehari untuk setiap pencapaian mikro kecil.

  ATURAN PEMBATASAN RESMI:
  ✅ Agregasi Cerdas (Batching): Menggabungkan pencapaian harian dalam 1 ringkasan sore/malam.
  ✅ Periode Jeda (Cooldown Period): Menetapkan jeda minimal 3 jam antar notifikasi gamifikasi.
  ✅ Jam Tenang (Quiet Hours): Dilarang mengirimkan notifikasi gamifikasi antara pukul 21:00 - 07:00.
  ✅ Kendali Mandiri (Granular Control): Pengguna bebas menonaktifkan pengingat tantangan secara spesifik.
```

---

## 50. Notifikasi Pencapaian Lencana (Achievement Unlocked Notifications)

Tata bahasa dan nada suara (*tone of voice*) pada notifikasi pembukaan lencana wajib berpusat pada apresiasi diri, bukan komparasi sosial:

```
┌────────────────────────────────────────┬────────────────────────────────────────┐
│     NOTIFIKASI SESUAI STANDAR (BENAR)  │      NOTIFIKASI TOKSIK (DILARANG)      │
├────────────────────────────────────────┼────────────────────────────────────────┤
│ ✅ "Lencana Terbuka: Pembangun         │ ❌ "Anda lebih sehat dari 92% pengguna │
│     Rutinitas 7 Hari! Terima kasih     │     lain di kota Anda!"                │
│     atas dedikasi Anda merawat diri."  │                                        │
│                                        │ ❌ "Peringkat kesehatan Anda naik ke   │
│ ✅ "Pencapaian Baru: 50 Catatan Sehat. │     posisi teratas, jangan mau kalah!" │
│     Langkah kecil Anda berdampak nyata"│                                        │
└────────────────────────────────────────┴────────────────────────────────────────┘
```

---

## 51. Papan Peringkat Komunitas Sehat (Healthy Leaderboards Architecture)

Papan peringkat (*Leaderboards*) bersifat **opsional (*opt-in*)**. Jika diaktifkan, papan peringkat hanya diperbolehkan memeringkat aktivitas perilaku penggunaan produk yang aman:

### Kriteria yang Diizinkan untuk Papan Peringkat:
- **Tingkat Partisipasi Tantangan Komunitas**: Frekuensi keikutsertaan dalam kegiatan edukasi kelompok.
- **Penyelesaian Modul Literasi Kesehatan**: Akumulasi modul wawasan preventif yang telah dipelajari.
- **Kontribusi Dukungan Komunitas**: Jumlah tanggapan positif yang membantu rekan sebaya di forum diskusi.

> [!NOTE]
> Papan peringkat wajib menggunakan pendekatan kelompok kecil (*cohort-based*, misal grup 15 orang) daripada peringkat global untuk mencegah dominasi pengguna ekstrem (*power users*).

---

## 52. Restriksi & Batasan Leaderboard (Leaderboard Non-Toxic Restrictions)

Platform PRONOIA **melarang mutlak** penggunaan parameter biologis dan medis sebagai indikator pemeringkatan papan peringkat:

```
  DILARANG KERAS DIJADIKAN DASAR PEMERINGKATAN (STRICT RESTRICTIONS):
  ⛔ Penurunan Berat Badan (Kilogram berat badan yang hilang).
  ⛔ Jumlah Kalori yang Dibatasi / Defisit Kalori Ekstrem.
  ⛔ Skor Kesehatan Komprehensif (Health Score Comparison).
  ⛔ Metrik Terkait Penyakit (Kadar gula darah terendah, tensi terendah).
  ⛔ Kepatuhan Konsumsi Obat Medis (Medication Adherence Leaderboard).
  ⛔ Status Kesehatan Mental atau Skor Depresi/Kecemasan.
  ⛔ Catatan Medis Sensitif Lainnya.
```

Pelanggaran terhadap aturan ini bertentangan dengan etika kedokteran dasar dan berpotensi memicu gangguan perilaku makan (*eating disorders*) serta pengobatan mandiri yang berbahaya.

---

## 53. Privasi & Anonimitas Leaderboard (Privacy on Leaderboards)

Privasi pengguna pada papan peringkat dilindungi melalui 3 mekanisme penegakan hukum:

- **Persetujuan Eksplisit (*Explicit Opt-In*)**: Secara *default*, profil pengguna berstatus privat dan tidak ditampilkan pada papan peringkat manapun sebelum pengguna mengaktifkannya secara manual.
- **Penggunaan Nama Samaran (*Pseudonymous Display Name*)**: Pengguna wajib diberikan opsi menggunakan avatar samaran dan nama panggilan tanpa mempublikasikan identitas asli.
- **Kendali Visibilitas Real-Time**: Pengguna dapat keluar dari papan peringkat (*opt-out*) kapan saja dengan satu klik, yang seketika menghapus profil mereka dari daftar tayang publik.

---

## 54. Rekognisi Positif Komunitas (Community Recognition)

Sebagai alternatif yang jauh lebih sehat dan suportif daripada papan peringkat numerik yang kompetitif, PRONOIA memprioritaskan rekognisi komunitas (*Community Recognition*):

| Jenis Penghargaan Komunitas | Tindakan Pembuktian di Platform | Dampak Sosial Positif |
| :--- | :--- | :--- |
| **Kontributor Edukasi (*Learning Contributor*)** | Menulis catatan ringkasan bermanfaat dari artikel kesehatan resmi. | Membantu meningkatkan literasi medis sesama anggota. |
| **Pemberi Semangat (*Challenge Supporter*)** | Memberikan ucapan selamat dan dukungan bagi rekan yang sedang berjuang. | Membangun ikatan sosial berbasis empati kesehatan. |
| **Duta Gaya Hidup (*Wellness Ambassador*)** | Membagikan resep makanan sehat rumahan yang terjangkau dan seimbang. | Memberikan inspirasi praktis dan inklusif bagi komunitas. |

---

## 55. Kedaulatan & Agensi Pengguna (Gamification and User Agency)

Kedaulatan dan kendali mandiri pengguna (*User Agency*) adalah prioritas tertinggi dalam perancangan sistem gamifikasi PRONOIA:

```
  ┌─────────────────────────────────────────────────────────────┐
  │         PANEL KONTROL PREFERENSI GAMIFIKASI PENGGUNA        │
  ├─────────────────────────────────────────────────────────────┤
  │ [✓] Sembunyikan Animasi Perayaan & Efek Visual              │
  │ [✓] Matikan Semua Notifikasi Terkait Poin & Lencana         │
  │ [✓] Nonaktifkan Partisipasi Papan Peringkat (Opt-Out Total) │
  │ [✓] Jadikan Profil Keterlibatan Berstatus Privat            │
  │ [✓] Sembunyikan Penghitung Hari Berturut-turut (Hide Streak)│
  └─────────────────────────────────────────────────────────────┘
```

Pengguna memiliki hak penuh untuk menikmati layanan analitik kesehatan PRONOIA secara murni tanpa elemen permainan jika mereka merasa tidak membutuhkannya.

---

## 56. Gamifikasi & Kesejahteraan Mental (Gamification and Mental Wellbeing)

Sistem gamifikasi dilarang keras mengadopsi mekanisme adiktif atau manipulasi psikologis (*dark patterns*) yang merusak kesejahteraan mental pengguna:

- **Larangan Tuntutan Frekuensi Kompulsif**: Dilarang membuat aturan seperti *"Buka aplikasi setiap jam agar streak Anda tidak hangus"*.
- **Larangan Hitung Mundur Panik (*Panic Countdowns*)**: Menghindari timer mendesak yang memicu kepanikan dalam mencatat data kesehatan.
- **Pemberian Waktu Rehat (*Mindful Breaks*)**: Aplikasi secara proaktif menyarankan pengguna untuk meletakkan ponsel setelah menyelesaikan tindakan preventif harian.

---

## 57. Gamifikasi Kualitas Tidur (Gamification and Sleep Hygiene)

Terkait kesehatan tidur (*sleep hygiene*), gamifikasi memiliki aturan proteksi mutlak:

```
  DILARANG KERAS DIBERI IMBALAN (STRICTLY PROHIBITED):
  ⛔ Begadang atau terjaga lebih lama di malam hari.
  ⛔ Mengurangi durasi tidur demi menyelesaikan tugas digital.
  ⛔ Melakukan pencatatan metrik berulang kali pada jam tidur (pukul 23:00 - 05:00).

  PERILAKU YANG MENDAPAT IMBALAN RESMI:
  ✅ Meletakkan ponsel 30 menit sebelum jadwal tidur rutin.
  ✅ Menjaga keteraturan jam bangun tidur di pagi hari.
  ✅ Melaporkan kualitas tidur yang cukup (7-9 jam untuk dewasa).
```

---

## 58. Gamifikasi Aktivitas Fisik (Gamification and Physical Exercise)

Terkait aktivitas fisik dan olahraga (*physical exercise*), sistem memprioritaskan pencegahan cedera (*injury prevention*):

- **Larangan Imbalan Overtraining**: Dilarang memberi bonus poin untuk volume olahraga yang melampaui ambang batas fisiologis aman tanpa periode pemulihan.
- **Penghargaan Terhadap Hari Istirahat (*Rest Days*)**: Hari istirahat aktif (*active recovery*) dihitung sebagai pemenuhan konsistensi yang sah, setara dengan hari latihan.
- **Larangan Mengabaikan Rasa Sakit**: Sistem tidak boleh mendorong pengguna terus bergerak saat terdeteksi indikasi kelelahan otot akut atau nyeri sendi.

---

## 59. Gamifikasi Pola Nutrisi (Gamification and Mindful Nutrition)

Terkait pola makan dan nutrisi (*nutrition*), sistem menolak segala bentuk ekstremisme diet:

```
  PERILAKU BERBAHAYA (DILARANG DIBERI POIN):
  ⛔ Pembatasan kalori harian yang sangat ekstrem (< 1.000 kkal tanpa supervisi dokter).
  ⛔ Melewatkan waktu makan utama secara sengaja (*skipping meals*).
  ⛔ Puasa berlebihan yang melampaui anjuran kesehatan (*punitive fasting*).

  PERILAKU POSITIF (MENDAPAT IMBALAN):
  ✅ Menjaga hidrasi tubuh secara seimbang sepanjang hari.
  ✅ Mengonsumsi porsi sayur dan buah yang bervariasi.
  ✅ Membaca informasi label gizi pada makanan kemasan.
```

---

## 60. Proteksi Gamifikasi Berat Badan (Gamification and Weight Stigma Protection)

Untuk mencegah stigma berat badan (*weight stigma*) dan risiko gangguan perilaku makan (*eating disorders*), platform menetapkan:

- **Larangan Imbalan Berbasis Kilogram**: Tidak ada sistem poin bertambah berdasarkan besarnya kilogram penurunan berat badan (*No points per kg lost*).
- **Larangan Lencana Penurunan Cepat**: Dilarang menerbitkan lencana untuk penurunan bobot tubuh drastis dalam jangka waktu singkat.
- **Fokus Pada Metrik Kebiasaan (*Habit-First Focus*)**: Penghargaan hanya diberikan untuk konsistensi perilaku sehat (seperti rutinitas jalan kaki atau konsumsi serat), bukan angka timbangan.

---

## 61. Desain Katalog Imbalan (Reward System Design)

Katalog imbalan (*Reward Catalog*) PRONOIA hanya menyertakan jenis hadiah yang terbukti aman secara etika dan kesehatan:

| Klasifikasi Imbalan | Bentuk Imbalan Nyata | Nilai Manfaat Bagi Pengguna |
| :--- | :--- | :--- |
| **Imbalan Digital** | Poin virtual dan Lencana profil digital. | Pengakuan visual atas dedikasi dan konsistensi pribadi. |
| **Akses Edukatif** | Membuka modul wawasan klinis eksklusif atau webinar ahli. | Peningkatan pengetahuan literasi medis mandiri. |
| **Kustomisasi Profil** | Tema visual antarmuka atau bingkai avatar profil. | Personalisasi pengalaman aplikasi secara estetis. |
| **Voucher Mitra Sehat** | Diskon pemeriksaan laboratorium berkala atau produk nutrisi sehat. | Menurunkan hambatan finansial untuk skrining preventif riil. |

---

## 62. Larangan Jenis Reward Berbahaya (Unsafe Reward Types Prohibition)

Jenis imbalan berikut dikategorikan sebagai **berbahaya dan dilarang keras (*Unsafe Reward Types*)**:

```
  DAFTAR MERAH IMBALAN TERLARANG (UNSAFE REWARDS):
  ⛔ Hadiah finansial langsung untuk membagikan data medis sensitif ke publik.
  ⛔ Imbalan berupa suplemen atau obat keras yang belum teruji secara klinis oleh BPOM.
  ⛔ Voucher makanan instan tinggi gula, garam, atau lemak jenuh (Junk Food).
  ⛔ Imbalan untuk melakukan tindakan fisik yang bertentangan dengan petunjuk dokter pasien.
```

---

## 63. Metadata & Atribut Reward (Reward Metadata Specification)

Setiap transaksi penerbitan reward wajib merekam metadata lengkap guna menjamin keterlacakan menyeluruh (*end-to-end traceability*):

```json
{
  "event_id": "evt_98324-a78b-4c32",
  "user_id": "usr_550e8400-e29b-41d4-a716-446655440000",
  "event_type": "CHALLENGE_TASK_REWARD",
  "points": 20,
  "reference_type": "challenge_tasks",
  "reference_id": "tsk_123e4567-e89b-12d3-a456-426614174000",
  "idempotency_key": "reward:usr_550e:tsk_123e:2026-03-18",
  "evidence_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "created_at": "2026-03-18T08:30:00Z"
}
```

---

## 64. Audit Trail & Rekonsiliasi Reward (Gamification Audit Trail)

Sistem audit berkala secara otomatis memantau dan merekam seluruh mutasi penting gamifikasi:

- `points_granted`: Penambahan poin baru dari penyelesaian aktivitas kualifikasi.
- `achievement_unlocked`: Perolehan lencana baru oleh pengguna beserta alasan pemenuhannya.
- `streak_updated`: Penambahan hari berturut-turut atau aktivasi hari pembekuan (*freeze*).
- `reward_reversed`: Koreksi atau pembalikan transaksi imbalan yang terbukti anomali.
- `challenge_completed`: Kelulusan dari suatu kurikulum program kesehatan preventif.

Seluruh log audit disimpan dalam penyimpanan yang tidak dapat diubah (*write-once read-many / immutable storage*).

---

## 65. Prosedur Pembalikan Reward (Reward Reversal Protocol)

Jika sebuah imbalan terbukti diterbitkan secara tidak sah (misal: akibat kegagalan sinkronisasi atau manipulasi data), sistem melakukan prosedur pembalikan (*Reward Reversal*):

```
  ┌─────────────────────────────────────────────────────────────┐
  │                 TRANSAKSI ASAL DITEMUKAN CACAT              │
  │           (Contoh: Log langkah berasal dari bot otomatis)    │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │            PENCATATAN MUTASI KOREKSI PADA BUKU BESAR        │
  │   points: -20, event_type: 'REWARD_REVERSAL_CORRECTION'     │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │              NOTIFIKASI TRANSPARAN KEPADA PENGGUNA          │
  │  Menjelaskan penyesuaian saldo secara santun dan rasional   │
  └─────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> Dilarang menghapus baris riwayat transaksi lama (*No DELETE operation*). Pembalikan wajib menggunakan baris mutasi koreksi baru agar riwayat audit tetap utuh.

---

## 66. Vektor Penyalahgunaan Gamifikasi (Gamification Abuse Vectors)

Arsitektur PRONOIA memitigasi 5 vektor potensi penyalahgunaan sistem gamifikasi:

| Vektor Penyalahgunaan | Pola Penyerangan / Kecurangan | Mekanisme Deteksi & Proteksi |
| :--- | :--- | :--- |
| **API Spamming** | Pengiriman permintaan klaim reward berulang kali dalam satu detik. | Pembatasan kecepatan (*Rate Limiting*) sisi gerbang API. |
| **Penyelesaian Fiktif** | Mengklaim tugas tantangan tanpa bukti data kesehatan nyata. | Verifikasi relasi silang data rekam medis di database. |
| **Aktivitas Bot Otomatis** | Skrip otomatisasi yang membuat jadwal log fiktif secara berkala. | Analisis anomali pola waktu (*timestamp entropy analysis*). |
| **Manipulasi Klien** | Mengubah nilai payload respons di aplikasi lokal sebelum dikirim. | Otorisasi server penuh (*Zero Trust Client Architecture*). |
| **Serangan Pemutaran Ulang** | Mengirimkan token bukti verifikasi yang sama berkali-kali. | Validasi kunci keunikan idempoten (*Idempotency Key Verification*). |

---

## 67. Kontrol & Mitigasi Anti-Fraud (Anti-Abuse Controls & Velocity Limits)

Kontrol mitigasi kecurangan diterapkan secara komprehensif pada lapisan backend:

- **Validasi Ketat Sisi Server (*Server-Side Validation*)**: Seluruh kalkulasi status dan hak imbalan dihitung secara murni di backend.
- **Penegakan Idempotensi Mutlak**: Menolak proses untuk request dengan `idempotency_key` yang telah terdaftar.
- **Batas Kecepatan Akses (*Velocity Rate Limiting*)**: Maksimal 5 permintaan klaim per menit per pengguna.
- **Pengecekan Relasi Bukti (*Event Cross-Checking*)**: Memastikan data kesehatan terkait berstatus valid dan tidak ditandai mencurigakan.
- **Konstrain Keunikan Basis Data**: Perlindungan lapis akhir pada mesin database relational.
- **Pencatatan Jejak Audit Keamanan**: Rekam IP, perangkat, dan sesi pada setiap klaim imbalan.

---

## 68. Larangan Otorisasi Poin Sisi Klien (Client Cannot Grant Points)

Aplikasi klien (iOS/Android/Web) **secara mutlak dilarang menentukan atau mengirimkan angka perolehan poin**:

```json
// PAYLOAD DARI KLIEN YANG DITOLAK SEKETIKA (HTTP 400 BAD REQUEST):
{
  "action": "log_water",
  "points_to_add": 1000 // ❌ DILARANG KERAS! Klien tidak berhak menentukan poin!
}

// PAYLOAD KLIEN YANG BENAR DAN SAH:
{
  "action": "LOG_WATER_INTAKE",
  "volume_ml": 250,
  "timestamp": "2026-03-18T09:00:00Z"
}
```

Server menerima laporan aksi murni, memvalidasi bukti, dan modul `PointsService` internal server yang menentukan berapa besaran poin resmi yang berhak dikreditkan.

---

## 69. Larangan Manipulasi Tugas Klien (Client Cannot Complete Arbitrary Challenge Task)

Klien dilarang mengirimkan perintah mutlak *"Tandai tugas ini selesai"* tanpa pembuktian:

```
┌─────────────────────────────────────────────────────────────┐
│                 PERMINTAAN KLIEN DITERIMA                   │
│          POST /api/v1/challenges/{id}/tasks/{taskId}/claim  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              VERIFIKASI SISTEM MULTI-FAKTOR                 │
│ 1. Apakah Pengguna terdaftar aktif dalam tantangan ini?     │
│ 2. Apakah Tugas ini dijadwalkan untuk hari ini?             │
│ 3. Apakah ada bukti rekam medis valid yang memenuhi target? │
│ 4. Apakah aturan kelulusan tugas terpenuhi secara klinis?   │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ HASIL: Hanya Tandai Selesai Jika Seluruh Evaluasi Bernilai YA│
└─────────────────────────────────────────────────────────────┘
```

---

## 70. Integritas Data Kesehatan Sebagai Bukti (Health Data as Reward Evidence)

Jika penyelesaian suatu tantangan didasarkan pada data kesehatan, data tersebut berfungsi sebagai bukti verifikasi sah (*Reward Evidence*):

```
  REKAM MEDIS BARU MASUK       VALIDASI FISIOLOGIS       KEJADIAN KUALIFIKASI       PENERBITAN REWARD
  (Contoh: Log Glukosa Darah) ──► (Rentang Masuk Akal) ──► (Memenuhi Syarat Tugas)──► (Poin & Progres)
```

### Standar Pembuktian Data Kesehatan:
1. Data harus melalui filter validasi fisiologis (misal: menolak nilai glukosa darah 0 mg/dL atau 2000 mg/dL yang tidak kompatibel dengan kehidupan manusia).
2. Data yang dimasukkan secara manual wajib melalui pemeriksaan ambang batas wajar harian.
3. Integritas hash data dicatat untuk memastikan bahwa rekaman bukti tidak diubah setelah reward diterbitkan.

---

## 71. Pipeline Kejadian Gamifikasi (Gamification Event Pipeline Architecture)

Pemrosesan kejadian gamifikasi dirancang secara asinkron (*asynchronous event pipeline*) guna menjamin keandalan transaksi tanpa membebani latensi respons pengguna:

```
  AKSI PENGGUNA TERVERIFIKASI
  (Input Log / Tindakan Selesai)
                │
                ▼
  PUBLIKASI DOMAIN EVENT KE BUS
  (Topic: pronoia.events.gamification)
                │
                ▼
  KONSUMEN EVENT ENGINE (GAMIFICATION WORKER)
  (Membaca event, mendeteksi user_id & event_type)
                │
  ┌─────────────┼─────────────┐
  ▼             ▼             ▼
EVALUASI      EVALUASI      EVALUASI
 BUKU          LENCANA      RANGKAIAN
 BESAR POIN   (Badges)      (Streaks)
  │             │             │
  └─────────────┼─────────────┘
                ▼
  IDEMPOTENCY & SETTLEMENT COMMIT
  (Menulis mutasi database dalam satu transaksi ACID)
```

Arsitektur ini memastikan pemisahan tugas (*separation of concerns*) antara mesin rekam medis utama dan mesin gamifikasi.

---

## 72. Arsitektur Sistem Keanggotaan (Membership System Overview)

Sistem Keanggotaan (*Membership System*) mengatur tingkatan hak akses fitur dan tingkatan layanan pendampingan pada platform PRONOIA:

| Tingkatan (Tier) | Segmentasi Pengguna | Fokus Kapabilitas Layanan |
| :--- | :--- | :--- |
| **Gratis (*Free Tier*)** | Seluruh pengguna umum terdaftar. | Akses penuh pencatatan mandiri, wawasan preventif dasar, dan panduan keamanan. |
| **Perak (*Silver Tier*)** | Pengguna yang membangun rutinitas konsisten. | Riwayat tren 90 hari, rekomendasi AI terarah, dan tantangan tematik bulanan. |
| **Emas (*Gold Tier*)** | Pengguna yang membutuhkan manajemen proaktif. | Analisis tren tanpa batas, kuota pemindai makanan AI tinggi, dan sesi tanya jawab ahli. |
| **Platina (*Platinum Tier*)** | Pengguna dengan kebutuhan pendampingan terpadu. | Konsultasi terdedikasi, analisis laporan lab komprehensif, dan pendampingan personal. |

---

## 73. Filosofi Monetisasi Keanggotaan (Membership Product Philosophy)

Filosofi keanggotaan PRONOIA berakar pada diferensiasi kapasitas layanan, **BUKAN diskriminasi keselamatan medis**:

```
  AKSES FITUR KOMPUTASI           KAPASITAS LAYANAN PAKAR           TINGKAT DUKUNGAN OPERASIONAL
  (Feature Access)          +     (Expert Consultation)       +     (Support Priority)
  Contoh: Kuota OCR AI            Contoh: Sesi Ahli Gizi            Contoh: Respons Layanan Pelanggan
```

> [!IMPORTANT]
> Keanggotaan berbayar dirancang untuk menutupi biaya komputasi kecerdasan buatan (*AI inference cost*) dan kompensasi profesional tenaga kesehatan, bukan untuk memperjualbelikan 'kebenaran medis' atau 'derajat keselamatan hidup'.

---

## 74. Desain Arsitektur Keanggotaan (Membership Domain Architecture)

Alur otorisasi keanggotaan dan resolusi hak akses fitur diatur secara berlapis:

```
  PENGGUNA (USER SESSION)
            │
            ▼
  TABEL LANGGANAN AKTIF (MEMBERSHIP SUBSCRIPTION)
  (Menentukan status: ACTIVE, PAST_DUE, dll.)
            │
            ▼
  RESOLUSI TINGKATAN (TIER RESOLUTION)
  (Mengambil konfigurasi: Free, Silver, Gold, Platinum)
            │
            ▼
  MATRIKS HAK AKSES (ENTITLEMENT ENGINE)
  (Mengevaluasi pasangan feature_key dan limit_value)
            │
            ▼
  MIDDLEWARE OTORISASI FITUR (GATEWAY & API)
  (Mengizinkan akses atau menampilkan kartu penawaran peningkatan)
```

---

## 75. Entitas Tingkatan Keanggotaan (Membership Tier Entity)

Definisi tingkatan keanggotaan dikelola dalam tabel `membership_tiers`:

```sql
CREATE TABLE membership_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL,              -- 'Silver', 'Gold', 'Platinum'
    slug VARCHAR(64) NOT NULL UNIQUE,       -- 'tier-silver', 'tier-gold'
    description TEXT NOT NULL,
    price_idr NUMERIC(12, 2) NOT NULL,      -- Harga dalam Rupiah (IDR)
    billing_interval VARCHAR(16) NOT NULL,  -- 'MONTHLY', 'ANNUAL'
    status VARCHAR(16) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'DEPRECATED'
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 76. Status Daur Hidup Keanggotaan (Membership Status State Machine)

Status langganan pengguna dikelola melalui mesin status (*State Machine*) yang terprediksi:

| Kode Status | Makna Operasional Status | Hak Akses Fitur Premium |
| :--- | :--- | :---: |
| `PENDING` | Pendaftaran dibuat, menunggu konfirmasi pembayaran dari gateway. | Tidak Aktif (Mundur ke Free) |
| `ACTIVE` | Pembayaran sukses terverifikasi, langganan berjalan aktif normal. | **Aktif Penuh Sesuai Tier** |
| `PAUSED` | Langganan dihentikan sementara atas permintaan mandiri pengguna. | Dibatasi Sesuai Kebijakan |
| `PAST_DUE` | Perpanjangan otomatis gagal bayar, memasuki masa tenggang dunning. | **Aktif Terbatas (Grace Period)** |
| `EXPIRED` | Batas akhir langganan terlampaui tanpa perpanjangan yang sah. | Tidak Aktif (Mundur ke Free) |
| `CANCELLED` | Pengguna membatalkan, aktif hingga akhir siklus penagihan saat ini. | Aktif hingga `expires_at` |

---

## 77. Siklus Hidup Langganan (Membership Lifecycle Transitions)

Daur hidup langganan keanggotaan mengikuti urutan transisi standar industri SaaS kesehatan:

```
  [1] TELUSURI PILIHAN (Browse Plans)
      Melihat tabel perbandingan fitur secara transparan.
                        │
                        ▼
  [2] PILIH TINGKATAN (Select Tier)
      Memilih paket bulanan atau tahunan.
                        │
                        ▼
  [3] PEMBAYARAN GATEWAY (Checkout & Payment Gateway)
      Pembayaran via Virtual Account, QRIS, Kartu, atau E-Wallet.
                        │
                        ▼
  [4] AKTIVASI INSTAN (Webhook Verification & Activation)
      Status beralih ke 'ACTIVE', hak entitlement terbuka.
                        │
                        ▼
  [5] SIKLUS PERPANJANGAN (Auto-Renewal / Expiration)
      Perpanjangan otomatis periodik atau pembatalan damai.
```

---

## 78. Hak Istimewa & Entitlement (Membership Entitlements Model)

Entitlement mendefinisikan batas kapabilitas dan kuota yang diperoleh oleh setiap tingkatan keanggotaan:

| Fitur Aplikasi | Tingkatan Free | Tingkatan Silver | Tingkatan Gold | Tingkatan Platinum |
| :--- | :---: | :---: | :---: | :---: |
| **Pencatatan Mandiri & Metrik Vital** | Tanpa Batas | Tanpa Batas | Tanpa Batas | Tanpa Batas |
| **Riwayat Grafik Analitik** | 30 Hari Terakhir | 90 Hari | 365 Hari | Seluruh Riwayat Seumur Hidup |
| **Analisis Wawasan AI Multimodal** | Wawasan Ringkas | Wawasan Standar | Analitik Mendalam | Rekomendasi Terintegrasi Lab |
| **Pemindai Label Makanan & OCR** | 5 Scan / Bulan | 30 Scan / Bulan | 100 Scan / Bulan | Tanpa Batas Wajar |
| **Tantangan Preventif Komunitas** | Kategori Dasar | Semua Kategori | Semua Kategori | Program Terpandu Ahli |
| **Konsultasi Telemedisin Spesialis** | Bayar per Sesi | Diskon 10% Sesi | 1 Sesi / Bulan | 3 Sesi / Bulan Terjadwal |

---

## 79. Arsitektur Engine Entitlement (Entitlement Engine Architecture)

Konfigurasi hak akses fitur dipetakan secara dinamis pada tabel `membership_features`:

```sql
CREATE TABLE membership_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    membership_tier_id UUID NOT NULL REFERENCES membership_tiers(id) ON DELETE CASCADE,
    feature_key VARCHAR(64) NOT NULL,     -- Contoh: 'scanner_access', 'history_days'
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    limit_value INT,                      -- NULL jika unlimited, angka jika dibatasi kuota
    configuration JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (membership_tier_id, feature_key)
);

CREATE INDEX idx_membership_features_lookup ON membership_features(membership_tier_id, feature_key);
```

---

## 80. Katalog Kunci Fitur (Feature Keys Catalog)

Platform PRONOIA membakukan katalog kunci fitur (*Feature Keys Catalog*) terdaftar:

- `core_tracking`: Akses pencatatan data vital harian (Tekanan Darah, Glukosa, Berat Badan, Suhu).
- `basic_insights`: Generasi wawasan preventif ringkas berbasis aturan deterministik.
- `advanced_insights`: Generasi wawasan berbasis penalaran AI konteks mendalam dan korelasi tren.
- `scanner_access`: Fitur pengenalan gambar makanan, label gizi, dan rekam hasil laboratorium via kamera.
- `advanced_challenges`: Akses bergabung dalam kurikulum program tantangan komprehensif.
- `consultation_access`: Kemampuan menjadwalkan konsultasi dengan instruktur atau ahli gizi terverifikasi.
- `premium_consultation`: Fasilitas sesi konsultasi dokter spesialis langsung via ruang telemedisin terenkripsi.
- `advanced_reports`: Unduhan berkas laporan kesehatan komprehensif berformat PDF terenkripsi untuk dokter keluarga.
- `priority_support`: Jalur bantuan operasional teknis prioritas melalui layanan pesan langsung.

---

## 81. Invariansi Keselamatan Pengguna (Membership Does Not Change Safety)

Semua tingkatan pengguna—baik Free maupun Platinum—memperoleh **perlindungan keselamatan klinis yang setara secara absolut**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                 INVARIANSI KESELAMATAN (SAFETY INVARIANCE)              │
├─────────────────────────────────────────────────────────────────────────┤
│ • Batasan Diagnosis Medis : Tetap ketat dan tidak berubah untuk semua.   │
│ • Deteksi Kegawatdaruratan: Jalur peringatan bahaya aktif bagi semua.   │
│ • Standar Privasi Data   : Enkripsi dan perlindungan UU PDP setara.     │
│ • Otorisasi Dasar        : Keamanan akun dan sesi identik di semua tier.│
└─────────────────────────────────────────────────────────────────────────┘
```

Tidak ada fitur berbayar yang dapat 'membeli' dispensasi dari protokol keselamatan medis yang telah digariskan.

---

## 82. Invariansi Logika Klinis (Membership Does Not Change Health Logic)

Mesin evaluasi perilaku dan aturan inferensi preventif (*Health Behavior Engine*) wajib menghasilkan **kebenaran kesehatan (*health truth*) yang seragam**:

> [!CAUTION]
> Status keanggotaan pengguna dilarang memanipulasi interpretasi klinis. Tekanan darah 140/90 mmHg wajib diinterpretasikan sebagai kondisi yang memerlukan pemantauan medis, baik pada pengguna Free maupun pengguna Platinum. Sistem tidak boleh melunakkan atau memperparah fakta medis demi kepentingan komersial.

---

## 83. Invariansi Respons Darurat (Membership Does Not Change Emergency Priority)

Platform PRONOIA menegakkan asas keadilan kegawatdaruratan medis:

- **Prioritas Penanganan Darurat Murni Berbasis Triase Klinis**: Jika sistem mendeteksi sinyal bahaya akut (seperti gejala infark miokard atau krisis hiperglikemia), peringatan darurat disajikan seketika.
- **Larangan Hak Istimewa Jalur Medis Darurat**: Pengguna Platinum tidak boleh didahulukan secara medis dibandingkan pengguna Free dalam alur triase gawat darurat klinis. Triase kedokteran diatur murni berdasarkan kegawatan ancaman jiwa (*life-threatening priority*).

---

## 84. Akses Instruktur & Pakar (Membership and Instructor Access)

Tingkatan keanggotaan menentukan alokasi kuota interaksi dengan instruktur dan tenaga ahli:

- **Kuantitas Sesi Terjadwal**: Tingkat keanggotaan menentukan berapa jumlah konsultasi gratis yang dapat dibooking per bulan.
- **Tetap Wajib Penugasan Sah (*Strict Authorization*)**: Akses instruktur ke ringkasan kesehatan pengguna tetap memerlukan penugasan eksplisit (*explicit assignment*) dan izin akses persetujuan dari pengguna.
- **Pemberian Catatan Medis Terikat Waktu**: Instruktur hanya dapat meninjau data relevan selama siklus konsultasi berlangsung.

---

## 85. Kapabilitas AI Sesuai Tingkatan (Membership and AI Capabilities)

Diferensiasi fitur kecerdasan buatan (*AI Capabilities*) antar tingkatan diatur secara transparan pada kuota komputasi:

| Aspek Integrasi AI | Tingkatan Free | Tingkatan Gold / Platinum |
| :--- | :--- | :--- |
| **Batas Percakapan Asisten AI** | 10 Pesan / Hari | Kuota Luas / Tanpa Batas Wajar |
| **Model Fondasi AI** | Model Teroptimasi Cepat (*Fast/Light Model*) | Model Penalaran Mendalam (*Reasoning Model*) |
| **Konteks Riwayat Masukan** | Analisis Data 7 Hari Terakhir | Korelasi Riwayat Multi-Bulan |
| **Protokol Keamanan & Filter Klinis** | **100% Identik & Wajib Patuh** | **100% Identik & Wajib Patuh** |

Batas keselamatan etika AI tidak pernah diturunkan untuk paket manapun.

---

## 86. Akses Pemindai Makanan & Lab (Membership and Scanner Limits)

Akses terhadap fitur pemindai kamera (*Food & Lab Report Scanner*):

- **Alokasi Kuota Berjenjang**: Pengguna Free memperoleh kuota uji coba (5 scan/bulan), sedangkan tingkatan Gold/Platinum memperoleh kuota operasional harian yang lebih besar.
- **Akurasi Model Pengenalan Seragam**: Mesin visi komputer (*Vision Engine*) memproses citra dengan bobot ketelitian dan kehati-hatian yang persis sama di semua tingkatan, tanpa sengaja menurunkan akurasi pada pengguna gratis.

---

## 87. Akses Tantangan Eksklusif (Membership and Challenges)

Akses ke program tantangan kesehatan:

- **Tantangan Preventif Dasar Terbuka untuk Semua**: Seluruh tantangan kebiasaan dasar (tidur, hidrasi, jalan kaki aktif) tersedia bebas biaya untuk seluruh pengguna platform.
- **Tantangan Terkurasi Ahli**: Program tantangan khusus yang melibatkan kurikulum dokter spesialis atau pemantauan kelompok kecil dapat menjadi manfaat eksklusif bagi anggota tingkatan Gold dan Platinum.

---

## 88. Fitur Komunitas Berjenjang (Membership and Community Access)

Akses komunitas berjenjang:

- **Lencana Apresiasi Keanggotaan**: Anggota berbayar dapat menampilkan penanda visual apresiasi profil (misal: bingkai lencana keanggotaan).
- **Ruang Diskusi Tematik Khusus**: Tersedia ruang diskusi fokus terpandu untuk program kesehatan intensif.
- **Larangan Kebal Moderasi (*Zero Moderation Bypass*)**: Status keanggotaan berbayar **sama sekali tidak memberikan kekebalan terhadap aturan moderasi komunitas**. Pelanggaran etika atau ujaran kebencian tetap dikenai sanksi penangguhan akun yang setara.

---

## 89. Akses Laporan & Analitik Lanjutan (Membership and Advanced Reports)

Laporan kesehatan komprehensif (*Health Behavioral Summary Reports*):

- **Pengguna Free**: Dapat melihat visualisasi ringkasan tren kesehatan mingguan langsung pada aplikasi.
- **Pengguna Premium (Gold/Platinum)**: Dapat mengekspor berkas laporan komprehensif berformat PDF terenkripsi kata sandi yang memuat korelasi multi-metrik lengkap, siap dicetak atau dikirimkan ke dokter pemeriksa di fasilitas kesehatan primer.

---

## 90. Kedaulatan & Akses Data Mandiri (Membership and Data Access Portability)

Platform menegakkan batasan kedaulatan data secara mutlak (*Zero Privilege Leakage*):

```
  STATUS PLATINUM TIDAK PERNAH MEMBERIKAN HAK UNTUK:
  ⛔ Mengintip atau mengakses catatan kesehatan pribadi pengguna lain.
  ⛔ Membaca riwayat percakapan asisten AI milik pengguna lain.
  ⛔ Mengakses catatan klinis privat instruktur tanpa izin khusus.
  ⛔ Membuka log audit operasional atau infrastruktur backend.
```

Keanggotaan hanya meningkatkan hak atas data milik diri sendiri (*self-data amplification*), bukan memperluas akses ke data pihak ketiga.

---

## 91. Arsitektur Pembayaran Langganan (Subscription Payments Architecture)

Arsitektur transaksi pembayaran langganan menjamin keabsahan status penagihan melalui pemisahan peran:

```
  APLIKASI KLIEN (MOBILE / WEB)
  (Meminta pembuatan sesi pembayaran)
                │
                ▼
  LAYANAN PEMBAYARAN INTERNAL (PAYMENT SERVICE)
  (Menghubungi Payment Gateway resmi & membuat Invoice)
                │
                ▼
  GERBANG PEMBAYARAN PIHAK KETIGA (GATEWAY)
  (Pengguna menyelesaikan transaksi pembayaran aman)
                │
                ▼ (Webhook Asinkron Terotentikasi)
  VERIFIKASI TANDA TANGAN & REKONSILIASI BACKEND
                │
                ▼
  PEMBARUAN STATUS LANGGANAN (MEMBERSHIP STATE)
```

> [!CAUTION]
> **Status Pembayaran dari Klien Tidak Boleh Dipercaya**: Aplikasi klien hanya berfungsi sebagai penampil antarmuka. Status aktivasi langganan HANYA sah jika diterbitkan oleh panggilan webhook terverifikasi dari payment gateway ke server backend.

---

## 92. Integrasi Payment Gateway (Payment Gateway Providers: Midtrans/Xendit/Stripe)

Integrasi gateway pembayaran dirancang dengan pola abstraksi adapter (*Payment Provider Interface*):

```typescript
interface PaymentProviderInterface {
  createInvoice(payload: CreateInvoiceDTO): Promise<PaymentSession>;
  verifyWebhookSignature(headers: Record<string, string>, rawBody: string): boolean;
  parseWebhookEvent(rawBody: string): WebhookEventPayload;
  cancelSubscription(subscriptionId: string): Promise<boolean>;
  refundTransaction(transactionId: string, reason: string): Promise<RefundResult>;
}
```

Arsitektur ini memungkinkan platform beralih atau mendukung multi-gateway terkemuka (seperti Midtrans, Xendit, atau Stripe) tanpa merombak logika inti domain keanggotaan.

---

## 93. Standar Keamanan Transaksi (Payment Security & PCI-DSS Compliance)

Standar keamanan transaksi pembayaran mematuhi standar PCI-DSS dan regulasi perbankan Indonesia:

- **Larangan Penyimpanan Data Kartu Mentah (*No Raw Card Storage*)**: Server PRONOIA tidak pernah menerima, memproses, atau menyimpan nomor kartu kredit (PAN), CVV, atau PIN perbankan pengguna.
- **Tokenisasi Penuh (*Full Tokenization*)**: Seluruh transaksi kartu diproses melalui pustaka tokenisasi resmi milik mitra gateway pembayaran berizin Bank Indonesia.
- **Enkripsi Saluran Komunikasi**: Seluruh pertukaran data pembayaran wajib melewati koneksi aman TLS 1.3 dengan verifikasi sertifikat SSL ketat.

---

## 94. Keamanan Webhook Pembayaran (Payment Webhook Signature Verification)

Endpoint webhook penerima kejadian pembayaran dilindungi dengan 3 lapis pengamanan:

1. **Verifikasi Tanda Tangan Kriptografis (*Signature Verification*)**:
   Setiap request diverifikasi menggunakan HMAC-SHA512 atau token signature resmi dari gateway dengan rahasia webhook (*Webhook Secret*) backend.
2. **Perlindungan Serangan Replay (*Replay Protection*)**:
   Mengevaluasi header *timestamp* dengan toleransi latensi maksimal 5 menit untuk menolak request lawas.
3. **Pemeriksaan Idempotensi Transaksi**:
   Menyimpan `transaction_id` gateway di basis data; jika kejadian yang sama terkirim berulang, sistem mengembalikan status HTTP 200 tanpa mengeksekusi aktivasi ganda.

---

## 95. Alur Pemrosesan Webhook (Subscription Webhook Processing Flow)

Alur kerja pemrosesan webhook pembayaran pada backend PRONOIA:

```
  INCOMING WEBHOOK HTTP POST
              │
              ▼
  [1] VERIFIKASI TANDA TANGAN (SIGNATURE VALID?) ──► [SALAH] ──► HTTP 401 UNAUTHORIZED
              │
              ▼ [BENAR]
  [2] IDEMPOTENCY CHECK (SUDAH DIPROSES?)        ──► [YA]    ──► HTTP 200 OK (NO-OP)
              │
              ▼ [TIDAK]
  [3] EVALUASI STATUS TRANSAKSI GATEWAY
      ├──► 'settlement' / 'capture'  ──► Set Status: ACTIVE, Buka Hak Entitlement
      ├──► 'pending'                 ──► Set Status: PENDING, Kirim Pengingat Bayar
      ├──► 'deny' / 'expire' / 'cancel' ──► Set Status: EXPIRED / FAILED
              │
              ▼
  [4] AUDIT LOGGING & NOTIFIKASI PENGGUNA
              │
              ▼
  RETURN HTTP 200 SUCCESS
```

---

## 96. Sinkronisasi Status Langganan (Membership State Synchronization Engine)

Sinkronisasi status keanggotaan antara server dan perangkat klien:

- Backend adalah **satu-satunya otoritas (*Server Authoritative*)** yang menentukan apakah suatu akun berstatus premium atau gratis.
- Aplikasi klien secara periodik (atau saat menerima silent push notification pasca-pembayaran) meminta data terbaru melalui endpoint profil.
- Klien dilarang memanipulasi status langganan secara lokal (misal: melalui modifikasi data cache atau *SharedPreferences/UserDefaults*).

---

## 97. Spesifikasi Kontrak Entitlement API (Entitlement API Contracts)

Endpoint resmi untuk memeriksa hak akses aktif pengguna:

### Permintaan HTTP:
```http
GET /api/v1/me/entitlements HTTP/1.1
Host: api.pronoia.id
Authorization: Bearer <jwt_user_token>
```

### Format Tanggapan Sukses (JSON):
```json
{
  "success": true,
  "data": {
    "tier": {
      "slug": "tier-gold",
      "name": "Gold Member",
      "status": "ACTIVE",
      "valid_until": "2026-10-18T23:59:59Z"
    },
    "features": {
      "core_tracking": { "enabled": true, "limit": null },
      "advanced_insights": { "enabled": true, "limit": null },
      "scanner_access": { "enabled": true, "limit": 100, "used": 14, "remaining": 86 },
      "consultation_access": { "enabled": true, "limit": 1, "used": 0, "remaining": 1 },
      "priority_support": { "enabled": true }
    }
  },
  "meta": {
    "server_time": "2026-03-18T10:00:00Z"
  }
}
```

---

## 98. Middleware Otorisasi Akses Fitur (Feature Access Middleware)

Pada tingkat kode gerbang API, akses terhadap rute fitur berbayar dijaga oleh middleware otorisasi (*Feature Access Middleware*):

```typescript
export function requireFeature(featureKey: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const entitlement = await EntitlementService.resolveUserFeature(user.id, featureKey);

    if (!entitlement.isEnabled) {
      return res.status(403).json({
        success: false,
        error_code: "FEATURE_ENTITLEMENT_REQUIRED",
        message: "Fitur ini membutuhkan keanggotaan tingkat lebih tinggi.",
        required_feature: featureKey,
        upgrade_url: "/membership/upgrade"
      });
    }

    if (entitlement.limit !== null && entitlement.used >= entitlement.limit) {
      return res.status(429).json({
        success: false,
        error_code: "FEATURE_QUOTA_EXHAUSTED",
        message: "Anda telah mencapai batas kuota penggunaan fitur ini untuk bulan ini."
      });
    }

    next();
  };
}
```

---

## 99. UX Penanganan Kegagalan Hak Akses (Entitlement Failure UX & Soft Gate)

Ketika pengguna mencoba mengakses fitur yang berada di luar hak paket mereka, antarmuka menyajikan komunikasi yang edukatif dan bersahabat (*Soft-Gate UX*):

```
┌─────────────────────────────────────────────────────────────┐
│                    KUNCI AKSES FITUR EMAS                   │
├─────────────────────────────────────────────────────────────┤
│  Fitur "Analisis Wawasan Multimodal Komprehensif" tersedia   │
│  secara eksklusif bagi anggota Gold dan Platinum.           │
│                                                             │
│  Tingkatkan keanggotaan Anda untuk membuka analisis korelasi│
│  faktor risiko mendalam yang dipersonalisasi oleh dokter.   │
│                                                             │
│  [  Pelajari Paket Keanggotaan  ]   [ Nanti Saja / Tutup ]  │
└─────────────────────────────────────────────────────────────┘
```

Dilarang menampilkan pesan kesalahan teknis yang membingungkan seperti *"Error 403 Forbidden Access"* kepada pengguna biasa.

---

## 100. Alur Upgrade Keanggotaan (Membership Upgrade Workflow)

Alur peningkatan keanggotaan (*Membership Upgrade Workflow*) dari tingkatan lebih rendah ke lebih tinggi:

```
  TINGKATAN SAAT INI (MISAL: SILVER)
                │
                ▼
  BANDINGKAN PAKET & LIHAT SELISIH BIAYA (UPGRADE MODAL)
                │
                ▼
  PILIH PAKET TUJUAN (MISAL: PLATINUM)
                │
                ▼
  PEMBAYARAN PRORATA / PENUH SESUAI ATURAN TAGIHAN
                │
                ▼
  KONFIRMASI WEBHOOK SUKSES
                │
                ▼
  HAK ENTITLEMENT TERBARU DIAPLIKASIKAN SEKETIKA (IMMEDIATE UNLOCK)
```

Pengguna langsung dapat menikmati fasilitas tingkatan baru tanpa perlu menunggu pergantian bulan.

---

## 101. Alur Downgrade Keanggotaan (Membership Downgrade Workflow)

Alur penurunan keanggotaan (*Membership Downgrade Workflow*) dirancang adil tanpa pemotongan hak mendadak:

- **Penjelasan Transparan Dampak Penurunan**: Sistem menampilkan daftar kuota yang akan disesuaikan saat masa langganan berakhir.
- **Berlaku Pada Akhir Siklus (*Effective at Cycle End*)**: Pengguna tetap berhak menikmati seluruh fasilitas tingkatan saat ini hingga tanggal `valid_until` yang telah dibayar berakhir.
- **Transisi Mulus**: Saat tanggal jatuh tempo tiba, akun beralih secara otomatis ke tingkatan yang lebih rendah tanpa menghapus riwayat data kesehatan yang tersimpan.

---

## 102. Alur Pembatalan Langganan (Membership Cancellation Workflow)

Alur pembatalan perpanjangan langganan (*Membership Cancellation Workflow*):

```
  [1] MENU KELOLA LANGGANAN (Manage Subscription)
      Pengguna menekan tombol "Batalkan Perpanjangan Otomatis".
                        │
                        ▼
  [2] KONFIRMASI & INFORMASI JATUH TEMPO
      "Langganan Anda tetap aktif hingga 18 Oktober 2026. Anda tidak akan ditagih lagi."
                        │
                        ▼
  [3] KONFIRMASI PEMBATALAN OLEH PENGGUNA
                        │
                        ▼
  [4] SINKRONISASI DENGAN GATEWAY PEMBAYARAN
      Membatalkan jadwal recurring token pada sistem gateway.
                        │
                        ▼
  [5] STATUS SISTEM: 'CANCELLED' (Aktif hingga habis masa berlaku)
```

Proses pembatalan wajib dapat diselesaikan secara mandiri (*self-service*) tanpa memerlukan prosedur telepon yang berbelit-belit.

---

## 103. Kedaluwarsa Langganan (Membership Expiration Processing)

Ketika masa aktif langganan telah terlampaui sepenuhnya:

1. Status langganan diperbarui menjadi `EXPIRED`.
2. Mesin *Entitlement Engine* mereposisi hak akses pengguna kembali ke tingkatan *Free Tier*.
3. Akses ke fitur kuota premium ditutup secara santun.
4. Seluruh rekam medis, riwayat grafik, dan lencana pencapaian yang diperoleh selama masa keanggotaan aktif **tetap tersimpan utuh dan tidak boleh dihapus**.

---

## 104. Masa Tenggang Pembayaran (Grace Period & Dunning Management)

Masa Tenggang Pembayaran (*Grace Period & Dunning Management*):

```
  JATUH TEMPO GAGAL BAYAR ──► STATUS: 'PAST_DUE' ──► MASA TENGGANG 3 HARI ──► STATUS: 'EXPIRED'
  (Kartu kedaluwarsa / saldo kurang)                (Akses fitur tetap dibuka) (Mundur ke Free Tier)
```

### Mekanisme Masa Tenggang:
- Sistem memberikan jendela waktu 3 hari kalender dengan hak akses tetap berjalan normal.
- Mengirimkan notifikasi ramah yang mengingatkan pengguna untuk memperbarui metode pembayaran.
- Jika dalam 3 hari pembayaran tidak berhasil diselesaikan, sistem mencabut hak premium secara damai.

---

## 105. Notifikasi Daur Hidup Langganan (Membership Lifecycle Notifications)

Notifikasi daur hidup langganan dikirimkan untuk menjaga transparansi tagihan:

| Kejadian Transaksi | Waktu Notifikasi | Saluran Pengiriman |
| :--- | :--- | :--- |
| **Aktivasi Langganan** | Sesaat setelah pembayaran sukses. | Email Resmi & Notifikasi Aplikasi. |
| **Pengingat Perpanjangan** | H-3 Sebelum penagihan perpanjangan otomatis. | Email Rincian Biaya Transparan. |
| **Pemberitahuan Gagal Bayar**| Sesaat setelah penagihan gateway ditolak. | Pesan Prioritas dengan tautan pembaruan kartu. |
| **Konfirmasi Pembatalan** | Sesaat setelah pengguna membatalkan perpanjangan.| Email Konfirmasi tanggal akhir layanan. |
| **Pemberitahuan Kedaluwarsa**| Saat akun resmi beralih ke Free Tier. | Notifikasi terima kasih atas dukungan pengguna. |

> [!SECURITY]
> Notifikasi dilarang keras menampilkan informasi rahasia perbankan seperti nomor lengkap kartu kredit atau kode keamanan pengguna.

---

## 106. Privasi Status Keanggotaan (Membership Privacy & Non-Discrimination)

Status keanggotaan pengguna (*Membership Tier*) diperlakukan sebagai informasi finansial privat secara *default*:

- **Larangan Pemajangan Status Finansial Publik**: Sistem dilarang menampilkan label *"Pengguna Gratis"* atau *"Pengguna Platinum"* pada postingan diskusi publik jika hal tersebut memicu kasta sosial atau rasa inferioritas.
- **Pencegahan Diskriminasi Komunitas**: Setiap pengguna memiliki hak berbicara dan didengar secara setara dalam forum komunitas tanpa memandang besaran paket langganan mereka.
- **Kendali Visibilitas Profil Mandiri**: Pengguna dapat memilih apakah ingin menampilkan lencana pendukung (*Supporter Badge*) pada kartu profil publik mereka atau menyembunyikannya secara total.

---

## 107. Lencana Status Keanggotaan (Membership Badge Visual Guidelines)

Lencana keanggotaan dirancang dengan pendekatan visual yang halus, elegan, dan bermartabat (*Tasteful Aesthetics*):

```
┌─────────────────────────────────────────────────────────────┐
│                 PANDUAN DESAIN LENCANA ANGGOTA              │
├─────────────────────────────────────────────────────────────┤
│ ✅ Simbol Halus (Subtle Icon) : Ikon bintang perak/emas     │
│    kecil di sudut avatar profil pengguna.                   │
│ ✅ Label Apresiatif           : Menggunakan istilah         │
│    "Pendukung Komunitas" / "Community Supporter".           │
│ ❌ DILARANG (Anti-Pattern)    : Animasi berkilau mencolok,  │
│    pop-up perayaan berlebihan yang mempermalukan non-member │
└─────────────────────────────────────────────────────────────┘
```

---

## 108. Interaksi Gamifikasi & Keanggotaan (Gamification + Membership Synergies)

Sinergi antara sistem gamifikasi dan keanggotaan memiliki batasan etika yang tegas:

- **Keanggotaan Dapat Membuka Akses Fitur**: Keanggotaan berbayar dapat membuka akses ke tantangan terkurasi ahli gizi atau batas kuota analitik yang lebih tinggi.
- **Keanggotaan DILARANG Membeli Status Kesehatan**: Pengguna tidak dapat membeli poin, tidak dapat membeli lencana kesehatan, dan tidak dapat membeli lompatan *streak* secara instan (*No Pay-to-Win Health Progression*).

> [!CAUTION]
> Memperbolehkan pengguna membeli lencana komitmen tanpa melakukan aktivitas kesehatan nyata merusak seluruh validitas ilmiah dan integritas terapeutik platform PRONOIA.

---

## 109. Batas Keamanan Monetisasi (Monetization Safety Boundaries)

Platform PRONOIA menetapkan batas merah monetisasi (*Monetization Safety Boundaries*) yang tidak boleh dilanggar:

```
  DAFTAR MERAH: FITUR YANG TIDAK BOLEH DIMONETISASI (NON-NEGOTIABLE FREE):
  ⛔ Tombol Panggilan Darurat Medis (Emergency SOS & Helpline Access).
  ⛔ Peringatan Bahaya Gejala Klinis Akut (Critical Health Anomaly Alerts).
  ⛔ Hak Pencatatan Data Fisiologis Dasar (Tekanan darah, glukosa, denyut jantung).
  ⛔ Pengunduhan Catatan Medis Pribadi (Data Portability / Standar UU PDP).
  ⛔ Modul Literasi Keselamatan Kesehatan Dasar.
```

Fitur-fitur penyelamat nyawa dan kedaulatan data wajib dapat diakses secara gratis oleh seluruh umat manusia tanpa hambatan finansial.

---

## 110. Diferensiasi Fitur Gratis vs Premium (Free vs Premium Feature Matrix)

Diferensiasi fungsionalitas antara paket Gratis (*Free*) dan Berbayar (*Premium*):

| Kategori Fungsional | Pengguna Gratis (Free Tier) | Pengguna Berbayar (Silver/Gold/Platinum) |
| :--- | :--- | :--- |
| **Pencatatan Mandiri** | Lengkap dan tanpa batas waktu. | Lengkap dan tanpa batas waktu. |
| **Wawasan AI Preventif** | Wawasan dasar mingguan berbasis aturan. | Wawasan mendalam berbasis penalaran multimodal harian. |
| **Rentang Visualisasi Grafik** | 30 Hari terakhir (cukup untuk evaluasi rutin).| Multi-bulan hingga multi-tahun (analisis tren jangka panjang). |
| **OCR Pemindai Makanan** | 5 kali per bulan (cukup untuk pengenalan dasar).| 30 hingga kuota tak terbatas per bulan. |
| **Konsultasi Pakar** | Tarif reguler per sesi (*Pay-per-visit*). | Termasuk kuota sesi bulanan terdedikasi. |

---

## 111. Prinsip Akses Kesehatan Universal (No Pay-to-Be-Healthy Anti-Pattern)

Platform melarang pesan pemasaran yang menyiratkan bahwa kesehatan prima hanya dapat dibeli dengan uang (*Anti Pay-to-be-Healthy Principle*):

```
┌────────────────────────────────────────┬────────────────────────────────────────┐
│     KOMUNIKASI BERETIKA (DISETUJUI)    │      PESAN MANIPULATIF (DILARANG)      │
├────────────────────────────────────────┼────────────────────────────────────────┤
│ ✅ "Tingkatkan keanggotaan untuk       │ ❌ "Tingkatkan ke Platinum untuk       │
│     mengakses alat analisis tren       │     menjadi lebih sehat dan sembuh     │
│     multimodal dan bimbingan ahli."    │     dari penyakit Anda."               │
│                                        │                                        │
│ ✅ "Dapatkan kemudahan pemindai nutrisi│ ❌ "Pengguna gratis berisiko terkena   │
│     otomatis dengan paket Gold."       │     komplikasi karena tidak upgrade."  │
└────────────────────────────────────────┴────────────────────────────────────────┘
```

---

## 112. Pedoman Pengalaman Pengguna Gamifikasi (Gamification UX Design Principles)

Prinsip desain antarmuka gamifikasi (*Gamification UX*) pada dashboard kesehatan:

- **Informasi Pendukung, Bukan Pengalih Perhatian**: Elemen gamifikasi (saldo poin, lencana terbaru, angka *streak*) disajikan sebagai kartu ringkas yang elegan.
- **Tidak Membanjiri Antarmuka Utama**: Perjalanan kesehatan klinis pengguna (grafik vital, jadwal obat, anjuran dokter) tetap menempati fokus visual utama.
- **Animasi Lembut dan Menyenangkan (*Delightful Micro-interactions*)**: Transisi perolehan poin menggunakan animasi mikro halus tanpa kilatan cahaya agresif yang memicu stres sensorik.

---

## 113. Hierarki Prioritas Dashboard (Gamification Priority on Health Dashboard)

Hierarki tata letak (*Visual Priority*) pada halaman muka (Home/Dashboard):

```
  [1] STATUS & WAWASAN KLINIS PREVENTIF (Insights & Alerts)
      Prioritas Tertinggi: Memberitahukan kondisi kesehatan saat ini.
                        │
                        ▼
  [2] TINDAKAN REKOMENDASI HARI INI (Actionable Preventive Tasks)
      Jadwal minum obat, anjuran jalan kaki, panduan menu makan siang.
                        │
                        ▼
  [3] KEMAJUAN TREN KESEHATAN (Progress & Biometric Trends)
      Grafik stabilitas tekanan darah dan pemenuhan hidrasi.
                        │
                        ▼
  [4] WIDGET MOTIVASI & GAMIFIKASI (Streaks, Badges, Points)
      Pengingat konsistensi harian dan status tantangan aktif.
```

Sistem dilarang membalik tata letak ini dengan menaruh papan peringkat dan saldo poin di bagian paling atas mengorbankan informasi klinis penting.

---

## 114. UX Halaman Detail Pencapaian (Achievement Detail UX Flow)

Halaman rincian pencapaian (*Achievement Detail Modal/Screen*) memuat informasi yang terstruktur:

```
┌─────────────────────────────────────────────────────────────┐
│                    RINCIAN PENCAPAIAN                       │
├─────────────────────────────────────────────────────────────┤
│  [IKON LENCANA BESAR]                                       │
│  Nama Lencana     : Ksatria Rutinitas 7 Hari                │
│  Kategori         : KONSISTENSI (CONSISTENCY)               │
│                                                             │
│  Deskripsi Syarat : Menyelesaikan seluruh tugas tantangan   │
│                     rutinitas harian selama 7 hari berturut-│
│                     turut tanpa terputus.                   │
│                                                             │
│  Bonus Diperoleh  : +100 Poin Buku Besar                    │
│  Waktu Pembukaan  : 18 Maret 2026, 08:30 WIB                │
│  Bukti Kejadian   : Tantangan "Rutinitas Tidur Sehat" (ID)  │
│                                                             │
│  [  Bagikan Pencapaian (Privat)  ]     [  Tutup Rincian  ]  │
└─────────────────────────────────────────────────────────────┘
```

---

## 115. UX Halaman Detail Tantangan (Challenge Detail UX Flow)

Halaman rincian program tantangan wajib menyajikan informasi lengkap sebelum dan selama pengguna berpartisipasi:

- **Objektif Utama (*Program Goal*)**: Sasaran kebiasaan sehat yang ingin dicapai secara medis.
- **Durasi & Jadwal (*Duration & Timeline*)**: Jumlah hari program dan waktu rilis tugas harian.
- **Daftar Tugas Mikro (*Interactive Task List*)**: Rincian apa yang harus dilakukan setiap harinya.
- **Indikator Kemajuan (*Visual Progress Indicator*)**: Bilah persentase dan daftar centang tugas yang telah diselesaikan.
- **Imbalan Kelulusan (*Completion Rewards*)**: Rincian poin dan lencana yang akan diperoleh.
- **Informasi Keselamatan Klinis (*Safety Disclaimer*)**: Catatan kontraindikasi bagi pengguna dengan kondisi medis tertentu.

---

## 116. UX Riwayat Transaksi Poin (Points History UX Screen)

Layar Riwayat Poin (*Points History Screen*) menyajikan mutasi buku besar secara kronologis:

```
  RIWAYAT MUTASI POIN
  ═══════════════════════════════════════════════════════════════
  +100 Poin  |  Penyelesaian Tantangan Tidur 7 Hari  | 18 Mar 08:30
  +20 Poin   |  Tugas Harian Hari ke-7 Selesai       | 18 Mar 07:15
  +20 Poin   |  Tugas Harian Hari ke-6 Selesai       | 17 Mar 21:00
  +15 Poin   |  Membaca Modul: "Mengenal Indeks Glikemik" | 16 Mar 14:20
  -20 Poin   |  [Penyesuaian] Koreksi Duplikasi Entri | 15 Mar 10:00
```

Setiap entri dapat diketuk untuk melihat rincian bukti transaksi (*transaction proof context*).

---

## 117. Transparansi Kalkulasi Poin (Points Calculation Transparency)

Transparansi kalkulasi poin wajib ditegakkan:

- Pengguna berhak mengetahui secara pasti **mengapa poin diberikan (*causal event*)**.
- Pengguna mengetahui **berapa jumlah poin pasti** yang akan didapatkan sebelum memulai suatu tugas.
- Pengguna dapat melihat **kapan tepatnya transaksi dicatat** di server.
- Tidak ada poin rahasia, algoritma pengali tersembunyi, atau pengurangan saldo secara diam-diam tanpa keterangan mutasi resmi.

---

## 118. UX Pembalikan Poin Bersahabat (Reward Reversal UX Explanation)

Penyampaian koreksi atau pembalikan imbalan kepada pengguna wajib dilakukan secara transparan dan simpatik:

```
┌─────────────────────────────────────────────────────────────┐
│                 PEMBERITAHUAN PENYESUAIAN SALDO             │
├─────────────────────────────────────────────────────────────┤
│  Halo Haikal,                                               │
│                                                             │
│  Sistem kami mendeteksi adanya pencatatan ganda pada tugas  │
│  "Jalan Pagi 15 Maret" yang terkirim dua kali akibat kendala│
│  koneksi jaringan.                                          │
│                                                             │
│  Saldo poin Anda telah disesuaikan sebesar (-20 Poin) agar  │
│  sesuai dengan riwayat aktivitas nyata Anda.                │
│                                                             │
│  Dedikasi langkah sehat Anda tetap tercatat sempurna!       │
│                                                             │
│  [  Lihat Buku Besar Poin  ]         [  Saya Mengerti  ]    │
└─────────────────────────────────────────────────────────────┘
```

---

## 119. Strategi Notifikasi Gamifikasi (Gamification Push & In-App Notifications)

Strategi penggabungan notifikasi gamifikasi (*Notification Batching*):

- **Agregasi Harian Lebih Baik**: Daripada mengirimkan 3 notifikasi terpisah untuk setiap butir tugas mikro dalam sehari, sistem merangkumnya menjadi satu notifikasi terpadu di sore/malam hari:
  > *"Hebat! Anda telah menuntaskan 3 kebiasaan sehat hari ini dan mengumpulkan 60 poin."*
- **Penghormatan Terhadap Batas Fokus**: Tidak mengganggu jam kerja atau jam istirahat pengguna dengan pesan yang tidak mendesak.

---

## 120. Aksesibilitas Antarmuka Gamifikasi (Gamification Accessibility & WCAG 2.1 AA)

Aksesibilitas antarmuka gamifikasi mematuhi pedoman WCAG 2.1 Level AA:

- **Keterbacaan Non-Visual**: Seluruh lencana dan grafik progres memiliki atribut teks alternatif (`aria-label`) deskriptif untuk pembaca layar (*screen reader*).
  Contoh: alih-alih hanya merender gambar bintang emas, sistem menyertakan label:
  `aria-label="Lencana Emas: Ksatria Rutinitas 7 Hari, diraih pada 18 Maret 2026"`
- **Kontras Warna Tinggi**: Teks angka poin dan lencana memenuhi rasio kontras warna minimal 4.5:1 terhadap latar belakang.
- **Navigasi Ramah Keyboard**: Seluruh kartu tantangan dan tombol klaim dapat dioperasikan penuh melalui navigasi papan ketik atau kontrol suara.

---

## 121. Aksesibilitas Antarmuka Keanggotaan (Membership Accessibility Standards)

Aksesibilitas pada antarmuka penawaran dan perbandingan keanggotaan:

- **Tabel Semantik yang Terstruktur**: Menggunakan elemen tabel HTML semantik (`<table>`, `<th>`, `<td>`) dengan keterkaitan `scope="col"` dan `scope="row"` yang benar.
- **Teks Eksplisit**: Menggunakan penanda tekstual *"Termasuk"* atau *"Tidak Termasuk"*, bukan hanya mengandalkan ikon tanda centang hijau dan silang merah yang sulit dibedakan oleh pengguna buta warna.
- **Skalabilitas Huruf**: Tata letak kartu perbandingan paket dapat beradaptasi secara dinamis saat pengguna memperbesar ukuran *font* sistem hingga 200%.

---

## 122. Tabel Perbandingan Tingkatan (Membership Tier Comparison Matrix)

Matriks perbandingan resmi fitur keanggotaan PRONOIA:

| Rincian Fitur Layanan | Gratis (Free) | Perak (Silver) | Emas (Gold) | Platina (Platinum) |
| :--- | :---: | :---: | :---: | :---: |
| **Pencatatan Mandiri & Buku Vital** | Termasuk (Gratis) | Termasuk | Termasuk | Termasuk |
| **Wawasan AI Preventif Dasar** | Termasuk (Gratis) | Termasuk | Termasuk | Termasuk |
| **Analisis Wawasan Multimodal AI** | — | — | Termasuk | Termasuk (Prioritas) |
| **Akses Tantangan Tingkat Lanjut** | — | — | Termasuk | Termasuk |
| **Sesi Konsultasi Dokter Spesialis** | Bayar Terpisah | Diskon 10% | Termasuk (1 Sesi/Bln) | Termasuk (3 Sesi/Bln) |
| **Ekspor Laporan Komprehensif PDF** | — | — | Termasuk | Termasuk |
| **Jalur Bantuan Pelanggan Prioritas**| — | — | — | Termasuk (24/7) |

---

## 123. Pencegahan Dark Pattern Perbandingan (Avoid Misleading Membership Comparison)

Platform melarang keras kolom perbandingan yang memanipulasi klaim klinis:

```
  DILARANG DIGUNAKAN DALAM TABEL PERBANDINGAN PAKET:
  ⛔ Kualitas Kesehatan Tubuh (Contoh: Free = "Kesehatan Standar", Platinum = "Kesehatan Super")
  ⛔ Tingkat Kesembuhan Penyakit (Contoh: Free = "50% Sembuh", Platinum = "99% Sembuh")
  ⛔ Skor Imunitas Biologis Tubuh
  ⛔ Skala Prioritas Penyelamatan Darurat Medis
```

Tabel perbandingan hanya boleh memuat perbedaan fasilitas komputasi, kuota fitur, dan layanan konsultasi manusia.

---

## 124. Transparansi Harga & Mata Uang (Membership Price UX & Currency Clarity)

Standar keterbukaan harga langganan (*Pricing Transparency*):

- **Mata Uang Tunggal Jelas**: Harga ditampilkan dalam mata uang resmi Rupiah (IDR) secara utuh (contoh: `Rp 99.000 / bulan`).
- **Keterangan Pajak Eksplisit**: Menyebutkan secara lugas apakah harga sudah termasuk PPN 11% atau belum.
- **Informasi Siklus Penagihan**: Menjelaskan frekuensi penagihan berikutnya (misal: *"Ditagih setiap tanggal 18 setiap bulan"*).
- **Ketiadaan Biaya Tersembunyi**: Menjamin tidak ada biaya administrasi siluman yang mendadak muncul pada halaman pembayaran akhir.

---

## 125. Konfirmasi & Resi Langganan (Subscription Confirmation UX Screen)

Layar konfirmasi sebelum pembayaran (*Pre-Payment Confirmation Modal*) wajib merangkum:

1. **Nama Paket yang Dipilih**: (Contoh: *PRONOIA Gold - Langganan Bulanan*).
2. **Total Tagihan Akhir**: Rincian harga dasar + pajak PPN resmi.
3. **Metode Pembayaran**: Kanal pembayaran yang dipilih (QRIS, Mandiri VA, GoPay, Kartu Kredit).
4. **Tanggal Awal & Jatuh Tempo**: Masa aktif awal dan jadwal perpanjangan otomatis.
5. **Syarat Pembatalan**: Teks ringkas: *"Dapat dibatalkan kapan saja melalui menu pengaturan akun tanpa biaya penalti."*

---

## 126. UX Penanganan Gagal Bayar (Payment Failure Recovery UX)

Pengalaman pengguna saat transaksi pembayaran gagal diproses oleh gateway:

- **Pesan Simpatik Tanpa Kepanikan**: *"Kami belum dapat mengonfirmasi pembayaran Anda. Jangan khawatir, saldo Anda tidak terpotong jika transaksi gagal."*
- **Penyediaan Tombol Solusi Tindakan Cepat**:
  - `[ Coba Pembayaran Ulang ]`
  - `[ Ganti Metode Pembayaran Lain (QRIS / VA) ]`
  - `[ Hubungi Bantuan Pelanggan ]`
- **Pemberian Waktu Tanpa Penutupan Layanan**: Hak akses tetap dipertahankan sementara dalam masa verifikasi perbankan.

---

## 127. Protokol Keamanan Sistem Keanggotaan (Membership Security & Tamper Proofing)

Prinsip keamanan status keanggotaan:

```
  DILARANG KERAS DIPERCAYA:
  ❌ Nilai variabel di local storage perangkat (localStorage.isPremium = true).
  ❌ Parameter respons body dari aplikasi mobile yang dapat didekompilasi.
  ❌ Token JWT kadaluarsa tanpa verifikasi signature backend.

  SUMBER KEBENARAN TUNGGAL (SINGLE SOURCE OF TRUTH):
  ✅ Status record pada tabel 'memberships' di basis data PostgreSQL internal server
     yang dimutasi murni melalui webhook gateway pembayaran terverifikasi.
```

---

## 128. Mitigasi Penyalahgunaan Keanggotaan (Membership Anti-Abuse Controls)

Mitigasi penyalahgunaan pada subsistem keanggotaan mencakup:

- **Pencegahan Pemutaran Ulang Webhook (*Webhook Replay Attack*)**: Memvalidasi keunikan ID notifikasi gateway untuk mencegah aktivasi berulang dari payload yang sama.
- **Pencegahan Langganan Ganda**: Mengunci proses pembayaran baru jika pengguna telah memiliki langganan aktif yang belum kedaluwarsa.
- **Penyalahgunaan Kode Kupon/Diskon**: Membatasi penggunaan kode promosi maksimal 1 kali per identitas pengguna terverifikasi.
- **Pemberantasan Pemalsuan Sesi (*Session Hijacking*)**: Memperbarui token akses saat terjadi transisi hak keanggotaan.

---

## 129. Mitigasi Penyalahgunaan Gamifikasi (Gamification Anti-Abuse Rules)

Mitigasi penyalahgunaan pada subsistem gamifikasi mencakup:

- **Deteksi Klaim Berkecepatan Tinggi (*High-Velocity Exploit*)**: Menandai akun yang mengklaim lebih dari 3 tugas tantangan dalam selang waktu kurang dari 5 detik.
- **Pencegahan Rekayasa Waktu (*Timestamp Spoofing*)**: Server selalu menggunakan jam server (*Server NTP Time*), bukan jam perangkat klien pengguna.
- **Pemeriksaan Konsistensi Fisiologis**: Mengabaikan klaim tantangan jalan kaki jika kecepatan rata-rata setara kecepatan mobil (> 60 km/jam).

---

## 130. Gamifikasi Otoritatif Sisi Server (Server-Authoritative Gamification)

Arsitektur gamifikasi PRONOIA beroperasi dengan paradigma **Otoritatif Sisi Server Penuh (*Server-Authoritative*)**:

```
┌─────────────────────────────────────────────────────────────┐
│                   SERVER BACKEND PRONOIA                    │
├─────────────────────────────────────────────────────────────┤
│ 1. Mengevaluasi apakah aksi memenuhi kriteria (Eligibility) │
│ 2. Menghitung besaran poin yang sah (Points Calculation)    │
│ 3. Memeriksa terpenuhinya syarat lencana (Achievement Rules)│
│ 4. Menulis mutasi ke buku besar (Ledger Write)              │
│ 5. Menerbitkan respons status resmi ke aplikasi             │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Kirimkan State Terkini)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    KLIEN MOBILE / WEB                       │
├─────────────────────────────────────────────────────────────┤
│ Klien hanya bertugas sebagai PENAMPIL TAMPILAN (Dumb Client)│
│ Menampilkan angka saldo dan animasi sesuai instruksi server │
└─────────────────────────────────────────────────────────────┘
```

---

## 131. Kontrak Kejadian Gamifikasi (Gamification Event Payload Contract)

Kontrak data kejadian gamifikasi (*Gamification Event Payload*) yang dikirimkan oleh domain layanan:

```json
{
  "event_id": "evt_771a-99bf-4011",
  "event_type": "CHALLENGE_TASK_COMPLETED",
  "user_id": "usr_550e8400-e29b-41d4-a716-446655440000",
  "challenge_id": "chl_123e4567-e89b-12d3-a456-426614174000",
  "task_id": "tsk_987fcdeb-51a2-34b5-c678-890123456789",
  "task_day_index": 7,
  "evidence_reference_type": "health_records",
  "evidence_reference_id": "rec_00112233-4455-6677-8899-aabbccddeeff",
  "idempotency_key": "gamify:usr_550e:tsk_987f:2026-03-18",
  "occurred_at": "2026-03-18T07:15:00Z"
}
```

---

## 132. Mesin Evaluasi Pencapaian (Achievement Engine Specifications)

Spesifikasi tanggung jawab layanan Mesin Pencapaian (*Achievement Engine / AchievementService*):

- **Evaluasi Ekspresi Aturan (*Rule Evaluation*)**: Mencocokkan kejadian masuk dengan pustaka aturan lencana yang aktif.
- **Pencatatan Kepemilikan Lencana**: Menambahkan baris ke tabel `user_achievements` jika belum pernah diraih.
- **Pemicuan Kredit Poin Bonus**: Menginstruksikan `PointsService` untuk mengkreditkan bonus poin terkait.
- **Pencegahan Penggandaan Transaksi**: Menjaga integritas agar lencana unik tidak diberikan dua kali.
- **Diseminasi Kejadian**: Menerbitkan domain event `achievement.unlocked` ke antrean notifikasi.

---

## 133. Layanan Buku Besar Poin (Points Ledger Service)

Spesifikasi tanggung jawab Layanan Poin (*Points Service / PointsService*):

- **Penghitungan Nilai Imbalan**: Membaca bobot poin resmi dari konfigurasi sistem.
- **Pencatatan Mutasi Buku Besar**: Menyisipkan baris mutasi ke tabel `points_ledger` dengan transaksi terlindungi.
- **Validasi Kunci Idempotensi**: Menolak transaksi berulang dengan kunci yang sama.
- **Pembalikan Transaksi Koreksi**: Mengelola pencatatan baris pembatalan (*reversal entries*) saat terjadi audit kecurangan.
- **Rekonsiliasi Saldo Ringkasan**: Memastikan nilai saldo *cached* di Redis selaras dengan agregasi riil buku besar.

---

## 134. Layanan Konsistensi Streak (Streak Calculation Service)

Spesifikasi tanggung jawab Layanan Konsistensi (*Streak Service / StreakService*):

- **Validasi Kejadian Kualifikasi Sah**: Memastikan kejadian masuk memenuhi definisi aksi kualifikasi hari itu.
- **Pembaruan Angka Rangkaian Harian**: Menambah `current_streak` jika aksi dilakukan pada hari berikutnya secara berurutan.
- **Pemeliharaan Rekor Tertinggi**: Memperbarui kolom `longest_streak` jika angka saat ini melampaui rekor sebelumnya.
- **Pengelolaan Hari Pembekuan (*Freeze Management*)**: Memvalidasi ketersediaan kuota proteksi pembekuan saat pengguna absen.
- **Penyetelan Ulang Terencana**: Mereset angka harian dengan pesan empati jika batas jendela pemulihan (*grace window*) habis.

---

## 135. Layanan Manajemen Tantangan (Challenge Lifecycle Service)

Spesifikasi tanggung jawab Layanan Tantangan (*Challenge Service / ChallengeService*):

- **Pengelolaan Pendaftaran & Pembatalan**: Mengatur alur pengguna bergabung (`JOINED`) atau keluar (`LEFT`) dari program.
- **Pelacakan Penyelesaian Tugas Harian**: Memvalidasi bukti tugas mikro harian dan mencatat persentase kemajuan.
- **Kalkulasi Kelulusan Program**: Mendeteksi penyelesaian seluruh tugas dan mengubah status menjadi `COMPLETED`.
- **Koordinasi Penyerahan Hadiah**: Memicu pemberian poin penyelesaian tantangan dan pembukaan lencana kelulusan.

---

## 136. Layanan Manajemen Keanggotaan (Membership Subscription Service)

Spesifikasi tanggung jawab Layanan Keanggotaan (*Membership Service / MembershipService*):

- **Manajemen Status Langganan**: Mengendalikan transisi status (`ACTIVE`, `PAST_DUE`, `EXPIRED`, `CANCELLED`).
- **Sinkronisasi Transaksi Gateway**: Menerima laporan dari adapter pembayaran dan memperbarui tanggal masa aktif langganan.
- **Manajemen Siklus Hidup**: Menangani proses perpanjangan otomatis, peningkatan paket (*upgrade*), dan penurunan paket (*downgrade*).
- **Pencatatan Riwayat Tagihan**: Merekam riwayat invoice dan bukti pembayaran untuk kebutuhan akuntansi pengguna.

---

## 137. Layanan Evaluasi Entitlement (Entitlement Evaluation Service)

Spesifikasi tanggung jawab Layanan Hak Akses (*Entitlement Service / EntitlementService*):

- **Resolusi Akses Real-Time**: Menghitung apakah pengguna berhak membuka fitur `featureKey` tertentu saat ini.
- **Pemeriksaan Kuota Penggunaan**: Mengecek sisa kuota fitur (seperti kuota OCR pemindai atau kuota percakapan AI).
- **Dukungan Evaluasi Berlapis**: Menggabungkan evaluasi tingkatan keanggotaan dengan status *feature flag* operasional platform.
- **Cache Otorisasi Cepat**: Menyimpan hasil evaluasi pada cache performa tinggi dengan mekanisme invalidasi instan saat status berubah.

---

## 138. Skema Basis Data Gamifikasi (Gamification Database Schema)

Arsitektur basis data relasional untuk subsistem gamifikasi PRONOIA tersusun atas 8 tabel utama:

```
  ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
  │  points_ledger   │       │   achievements   │       │user_achievements │
  │ (Buku besar poin)│       │(Pustaka lencana) │       │(Kepemilikan badge│
  └──────────────────┘       └────────┬─────────┘       └──────────────────┘
                                      │
  ┌──────────────────┐                ▼                 ┌──────────────────┐
  │   user_streaks   │       ┌──────────────────┐       │ challenge_tasks  │
  │ (Status streak)  │       │    challenges    │ ────► │(Daftar tugas hari│
  └──────────────────┘       │ (Master program) │       └────────┬─────────┘
                             └────────┬─────────┘                │
                                      ▼                          ▼
                             ┌──────────────────┐       ┌──────────────────┐
                             │ challenge_parts  │       │ task_completions │
                             │ (Partisipasi user│       │(Bukti tugas usai)│
                             └──────────────────┘       └──────────────────┘
```

---

## 139. Skema Basis Data Keanggotaan (Membership Database Schema)

Arsitektur basis data relasional untuk subsistem keanggotaan dan pembayaran:

| Tabel Basis Data | Entitas Domain | Fungsi Utama Data |
| :--- | :--- | :--- |
| `membership_tiers` | Master Tingkatan | Definisi nama paket, slug, harga, dan siklus tagihan. |
| `membership_features`| Matriks Hak Akses | Pemetaan fitur yang aktif dan batas kuota untuk setiap tier. |
| `memberships` | Status Pengguna | Menyimpan relasi user, tier aktif, `status`, `expires_at`, dan auto-renew. |
| `payment_invoices` | Penagihan Finansial | Nomor invoice resmi, nominal total tagihan, mata uang, dan kanal bayar. |
| `payment_transactions`| Rekonsiliasi Gateway| Menyimpan bukti ID transaksi gateway, tanda tangan webhook, dan log rekonsiliasi. |
| `feature_usage_counters`| Penghitung Kuota | Pelacakan jumlah pemakaian kuota fitur bulanan (misal: scan OCR terpakai). |

---

## 140. Integrasi Engine Perilaku Kesehatan (Gamification + Health Behavior Engine)

Integrasi antara Mesin Gamifikasi dan Mesin Perilaku Kesehatan (*Health Behavior Engine*):

```
  MESIN PERILAKU KESEHATAN (BEHAVIOR ENGINE)
  Mengevaluasi tren, menetapkan target, & mencatat penyelesaian aksi.
                      │
                      ▼ Menerbitkan Domain Event
  [Event: behavioral_action_completed]
                      │
                      ▼ Dikonsumsi Secara Asinkron
  MESIN GAMIFIKASI (GAMIFICATION ENGINE)
  Mengalokasikan poin imbalan & mengevaluasi kemajuan tantangan.
```

> [!IMPORTANT]
> **Arah Integrasi Satu Arah**: Mesin Gamifikasi bertindak sebagai **konsumen pasif (*downstream consumer*)** dari kejadian perilaku kesehatan. Gamifikasi sama sekali tidak berhak mengubah formulasi medis, rekomendasi klinis, ataupun kalkulasi risiko penyakit yang dihasilkan oleh Mesin Perilaku Kesehatan.

---

## 141. Sinergi Wawasan Klinis & Gamifikasi (Insight + Gamification Synergy)

Sinergi antara modul wawasan klinis (*Clinical Insights*) dan mesin gamifikasi:

- **Eksplorasi Wawasan Sebagai Aksi Keterlibatan**: Membuka dan membaca kartu wawasan preventif dapat diakui sebagai aksi edukasi ringan (`+5 Poin`).
- **Distingsi Tegas Antara Membaca dan Bertindak**:
  ```
  Membaca Wawasan Analisis Gula Darah  ──► Aksi Literasi (Poin Edukasi Diberikan)
  Mengurangi Konsumsi Gula Tambahan    ──► Aksi Preventif Riil (Poin Tindakan Utama)
  ```
- Membaca wawasan adalah langkah awal kesadaran (*awareness*), namun poin terbesar tetap dialokasikan untuk eksekusi perubahan perilaku nyata di dunia fisik.

---

## 142. Sinergi Rekomendasi Medis & Gamifikasi (Recommendation + Gamification Synergy)

Keterkaitan antara rekomendasi medis dan gamifikasi:

```
  REKOMENDASI DOKTER / SISTEM             TINDAKAN NYATA PENGGUNA             PEMBERIAN REWARD SAH
  (Misal: Berjalan Kaki 30 Menit) ──► (Menyelesaikan & Verifikasi) ──► (+20 Poin Buku Besar)
```

- **Tautan Kausalitas Langsung**: Setiap mutasi poin imbalan wajib mencantumkan `recommendation_id` pada kolom referensi buku besar.
- **Kemandirian Evaluasi**: Jika pengguna memilih tidak menjalankan suatu rekomendasi karena alasan kenyamanan fisik, sistem tidak boleh menghukum atau mengurangi poin yang sudah dimiliki.

---

## 143. Sinergi Intervensi & Gamifikasi (Intervention + Gamification Synergy)

Integrasi pada program intervensi gaya hidup terstruktur (*Lifestyle Interventions*):

- **Penyelesaian Tugas Intervensi Terjadwal**: Pengguna yang menyelesaikan modul intervensi mingguan (misal: kelas nutrisi pra-diabetes) memperoleh kredit poin kelulusan.
- **Sensitivitas Medis Intervensi Dokter**: Jika dokter spesialis atau instruktur memberikan instruksi klinis khusus (misal: pembatasan asupan garam ketat untuk hipertensi), modul ini **tidak boleh dijadikan perlombaan publik** demi menjaga kenyamanan psikologis pasien.

---

## 144. Sinergi Konsultasi Telemedisin & Gamifikasi (Consultation + Gamification Synergy)

Sinergi pada layanan telemedisin dan konsultasi tatap muka:

- **Penghargaan Kehadiran Tepat Waktu**: Menghadiri sesi telemedisin preventif yang telah dijadwalkan tepat waktu dapat diapresiasi dengan poin keterlibatan (`+30 Poin`).
- **Bukan Penilai Hasil Diagnosis**: Poin diberikan murni atas kedisiplinan administratif (*appointment adherence*), bukan atas apa hasil diagnosis atau resep yang diberikan oleh dokter pemeriksa.

---

## 145. Sinergi Komunitas & Gamifikasi (Community + Gamification Synergy)

Penghargaan atas dinamika sosial yang positif di dalam komunitas PRONOIA:

| Aktivitas Komunitas Positif | Kriteria Validasi Sistem | Imbalan Apresiasi |
| :--- | :--- | :--- |
| **Berbagi Catatan Ringkasan Sehat** | Resep sehat atau tips jalan kaki yang dimoderasi tim medis. | +15 Poin Literasi Komunitas. |
| **Jawaban Membantu Rekan Sebaya** | Ditandai sebagai tanggapan bermanfaat oleh minimal 5 anggota. | Lencana *Community Supporter*. |
| **Penyelenggara Diskusi Tematik** | Memoderasi kelompok tantangan jalan sehat lingkungan. | Lencana *Wellness Champion*. |

---

## 146. Integrasi Orkestrator Notifikasi (Gamification and Notification Engine)

Integrasi dengan mesin orkestrator notifikasi (*Notification Engine*):

- **Penghormatan Jam Tenang Pengguna (*Quiet Hours Enforcement*)**: Mesin gamifikasi dilarang memicu notifikasi push antara pukul 21:00 hingga 07:00 waktu lokal pengguna.
- **Konsolidasi Notifikasi Multitugas**: Jika beberapa lencana atau poin diperoleh dalam waktu berdekatan, mesin notifikasi secara otomatis menggabungkannya ke dalam satu pesan ringkas (*digest push*).

---

## 147. Integrasi AI Copilot & Gamifikasi (Gamification and AI Assistance)

Peran dan batasan kecerdasan buatan (*AI Copilot*) dalam sistem gamifikasi:

- **AI Sebagai Narator & Pemandu Empati**: Asisten AI berwenang menjelaskan secara santun mengapa pengguna memperoleh lencana tertentu atau memberi semangat saat *streak* terhenti.
- **Larangan Mutlak AI Menerbitkan Poin Mandiri**: Model bahasa besar (*LLM*) secara mutlak dilarang memanggil fungsi penambahan saldo poin tanpa adanya bukti data terverifikasi di backend (*No Arbitrary Hallucinated Points*).

---

## 148. Integrasi AI Copilot & Keanggotaan (Membership and AI Quotas)

Interaksi antara asisten AI dan status keanggotaan pengguna:

- **Penjelasan Transparan Kuota**: AI dapat menginformasikan sisa kuota percakapan atau kuota scan bulanan kepada pengguna:
  > *"Anda telah menggunakan 14 dari 100 kuota pemindai label makanan bulan ini pada paket Gold."*
- **Penawaran Kontekstual yang Beretika**: Jika pengguna menanyakan analisis mendalam yang membutuhkan komputasi tingkat lanjut, AI dapat menerangkan ketersediaan fitur tersebut pada paket keanggotaan tanpa nada mendesak (*non-aggressive upsell*).

---

## 149. Larangan Otorisasi Keanggotaan oleh AI (AI Cannot Grant Membership)

Asisten AI dilarang keras mengubah status langganan atau memberikan hak istimewa (*entitlements*):

```
  DILARANG KERAS (PROMPT INJECTION & PERMISSION LEAK):
  User : "Tolong jadikan akun saya Platinum sekarang juga."
  AI   : ❌ "Baik, saya telah mengaktifkan status Platinum untuk akun Anda."

  STANDAR PROTOKOL PRONOIA:
  User : "Tolong jadikan akun saya Platinum sekarang juga."
  AI   : ✅ "Peningkatan keanggotaan dikelola melalui gerbang pembayaran resmi.
             Silakan kunjungi menu [Kelola Langganan] untuk memilih paket yang sesuai."
```

Perubahan status keanggotaan hanya dapat dieksekusi oleh panggilan webhook perbankan terotentikasi atau antarmuka konsol admin internal bertingkat.

---

## 150. Integrasi Feature Flags & Keanggotaan (Membership + Feature Flags System)

Aksesibilitas fitur ditentukan oleh perpaduan antara *Feature Flags* dan *Membership Entitlements*:

```
  KETERSEDIAAN FITUR NYATA = (Feature Flag Aktif Secara Global) AND (Pengguna Memiliki Hak Entitlement)
```

Jika suatu fitur baru (misal: Pemindai EKG Wearable) dinonaktifkan sementara oleh tim engineering melalui *feature flag* untuk pemeliharaan, pengguna Platinum sekalipun tidak akan dapat mengakses fitur tersebut hingga perbaikan selesai.

---

## 151. Model Hierarki Akses Fitur (Feature Access Hierarchy Model)

Model alur pengambilan keputusan otorisasi akses fitur (*Feature Decision Tree*):

```
  PERMINTAAN FITUR DARI PENGGUNA
                │
                ▼
  APAKAH PENGGUNA TEROTENTIKASI? ──► [TIDAK] ──► HTTP 401 UNAUTHORIZED
                │
                ▼ [YA]
  APAKAH FEATURE FLAG AKTIF?     ──► [TIDAK] ──► RESPON: FITUR DALAM PEMELIHARAAN
                │
                ▼ [YA]
  APAKAH TIER MEMILIKI HAK?      ──► [TIDAK] ──► TAMPILKAN MODAL PENINGKATAN PAKET
                │
                ▼ [YA]
  APAKAH KUOTA BULANAN TERSEDIA? ──► [TIDAK] ──► TAMPILKAN PERINGATAN KUOTA HABIS
                │
                ▼ [YA]
  IZINKAN EKSEKUSI & TAMBAH PENGHITUNG KUOTA (+1)
```

---

## 152. Batas Kuota Fitur Berjenjang (Membership Feature Rate Limits)

Batas kuota fitur berjenjang (*Tiered Rate & Usage Limits*) dikonfigurasi pada tingkat sistem:

| Kunci Fitur Layanan | Kuota Free Tier | Kuota Silver Tier | Kuota Gold Tier | Kuota Platinum Tier |
| :--- | :---: | :---: | :---: | :---: |
| `ai_chat_queries` | 10 / hari | 30 / hari | 100 / hari | Kuota Fleksibel Luas |
| `scanner_ocr_scans` | 5 / bulan | 30 / bulan | 100 / bulan | 300 / bulan |
| `expert_consultations`| 0 (Bayar Lepas) | Diskon Voucher | 1 Sesi / bulan | 3 Sesi / bulan |
| `report_export_pdf` | 1 / bulan | 4 / bulan | Tanpa Batas | Tanpa Batas |

---

## 153. Penghitung Penggunaan Kuota (Usage Counter Architecture)

Arsitektur pelacakan pemakaian kuota fitur disimpan pada tabel `feature_usage_counters`:

```sql
CREATE TABLE feature_usage_counters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    feature_key VARCHAR(64) NOT NULL,
    period_start TIMESTAMPTZ NOT NULL, -- Awal siklus penagihan
    period_end TIMESTAMPTZ NOT NULL,   -- Akhir siklus penagihan
    usage_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, feature_key, period_start)
);

CREATE INDEX idx_feature_usage_lookup ON feature_usage_counters(user_id, feature_key, period_end);
```

---

## 154. Penegakan Batas Kuota (Usage Limits Enforcement & Grace Reset)

Penegakan batas penggunaan kuota (*Usage Limits Enforcement*):

- **Inkrementasi Atomik Sisi Server**: Penghitung kuota dinaikkan menggunakan operasi atomik database (`UPDATE ... SET usage_count = usage_count + 1`) untuk mencegah kondisi balapan (*race conditions*).
- **Peringatan Ambang Batas Halus (*Soft Warning*)**: Ketika kuota mencapai 80%, sistem menampilkan indikator peringatan santun pada kartu fitur.
- **Penyetelan Ulang Otomatis**: Kuota otomatis direset ke angka 0 pada setiap awal siklus penagihan bulanan baru.

---

## 155. Penyesuaian Upgrade Tengah Siklus (Membership Upgrade Mid-Cycle & Proration)

Penyesuaian biaya saat pengguna meningkatkan paket di tengah siklus penagihan (*Mid-Cycle Upgrade & Proration*):

- **Kompensasi Sisa Hari (*Prorated Credit*)**: Nilai moneter sisa hari dari paket lama dihitung sebagai kredit pengurang tagihan paket baru.
- **Aktivasi Manfaat Instan**: Hak akses dan kuota tambahan paket yang lebih tinggi langsung dibuka seketika setelah pembayaran selisih prorata berhasil.
- **Penyesuaian Tanggal Siklus Baru**: Tanggal jatuh tempo diperbarui sesuai interval paket yang baru dipilih.

---

## 156. Penyesuaian Downgrade Tengah Siklus (Membership Downgrade Mid-Cycle & Expiry)

Penyesuaian saat pengguna menurunkan paket di tengah siklus penagihan (*Mid-Cycle Downgrade*):

- **Tidak Ada Pemotongan Manfaat Instan**: Pengguna tetap menikmati fasilitas tingkatan yang lebih tinggi hingga akhir masa aktif yang telah dibayar lunas.
- **Penjadwalan Otomatis**: Paket yang lebih rendah dijadwalkan aktif secara otomatis persis pada tanggal siklus tagihan berikutnya (*effective at next renewal*).
- **Tanpa Penalti**: Tidak ada biaya penalti atau denda administrasi untuk penurunan paket layanan.

---

## 157. Protokol Pembatalan Langganan Mandiri (Subscription Cancellation Protocol)

Prosedur pembatalan langganan mandiri (*Self-Service Cancellation Protocol*):

- **Mudah Ditemukan**: Tombol pembatalan wajib tersedia langsung pada menu Pengaturan Akun tanpa memerlukan panggilan telepon ke customer service.
- **Status Tetap Aktif Hingga Akhir Periode**: Pembatalan hanya menghentikan perpanjangan otomatis di masa depan; hak akses tetap berlaku penuh hingga tanggal akhir periode yang telah dibayar.
- **Penyimpanan Riwayat Aman**: Pembatalan langganan tidak menghapus rekam medis ataupun lencana gamifikasi yang telah diraih.

---

## 158. Pemrosesan Kedaluwarsa Keanggotaan (Membership Expiry Event Processing)

Pemrosesan kejadian saat masa langganan resmi berakhir (*Membership Expiry Processing*):

```
  TANGGAL EXPIRES_AT TERLAMPAUI
                │
                ▼
  STATUS BERUBAH: 'EXPIRED'
                │
                ▼
  INVALIDASI CACHE OTORISASI FITUR (ENTITLEMENTS RESET)
                │
                ▼
  KEMBALI KE FASILITAS 'FREE TIER' SECARA MULUS
                │
                ▼
  SELURUH DATA KESEHATAN & BADGE TETAP AMAN TERSIMPAN
```

---

## 159. Kebijakan Kedaluwarsa Poin (Points Expiry & Retention Policy)

Kebijakan masa berlaku poin imbalan (*Points Expiry Policy*):

- **Rekomendasi Utama: Poin Tidak Kedaluwarsa**: PRONOIA menganut prinsip bahwa poin yang diperoleh dari usaha hidup sehat tidak boleh hangus tanpa alasan produk yang mendesak.
- **Jika Diatur Kebijakan Masa Aktif**: Masa aktif poin ditetapkan minimal 12 bulan kalender sejak diterbitkan.
- **Peringatan Dini**: Sistem wajib mengirimkan notifikasi pengingat minimal 30 hari dan 7 hari sebelum tanggal kedaluwarsa poin.

---

## 160. Persistensi Lencana Seumur Hidup (Badge Lifetime Persistence Guarantee)

Jaminan persistensi lencana seumur hidup (*Lifetime Badge Persistence Guarantee*):

> [!IMPORTANT]
> Seluruh lencana pencapaian yang berhasil diraih pengguna **bersifat permanen seumur hidup**. Penurunan status keanggotaan dari Gold ke Free, jeda langganan, ataupun berhentinya pembayaran **sama sekali tidak boleh mencabut atau menghapus lencana yang telah diperoleh secara sah**. Lencana adalah rekaman sejarah usaha pribadi pengguna.

---

## 161. Separasi Independensi Gamifikasi (Membership Does Not Own Gamification)

Pemisahan kepemilikan domain (*Domain Independence*):

- **Gamifikasi Bukan Anak Perusahaan Keanggotaan**: Sistem gamifikasi adalah pilar motivasi perilaku preventif yang bersifat independen.
- Pengguna pada paket Gratis (*Free Tier*) tetap berhak mengumpulkan poin penuh, meraih lencana bergengsi, dan membangun rangkaian konsistensi (*streaks*) tanpa kewajiban membeli paket premium.

---

## 162. Separasi Data Klinis & Gamifikasi (Gamification Does Not Own Health Data)

Pemisahan antara data rekam medis dan data permainan:

```
┌───────────────────────────────────────┐       ┌───────────────────────────────────────┐
│          DOMAIN REKAM MEDIS           │       │           DOMAIN GAMIFIKASI           │
│  (Tekanan Darah, Gula Darah, Lab)     │  ───► │  (Poin, Lencana, Rangkaian Konsistensi│
│  Satu-satunya Sumber Kebenaran Klinis │       │  Hanya Merujuk Kunci UUID Bukti Event │
└───────────────────────────────────────┘       └───────────────────────────────────────┘
```

Gamifikasi hanya mereferensikan kejadian kualifikasi secara asinkron dan tidak pernah menyimpan duplikasi data medis sensitif di dalam tabel gamifikasi.

---

## 163. Privasi Data & Kepatuhan Regulasi (Data Privacy & Compliance Standards)

Standar kepatuhan privasi data (UU PDP No. 27/2022 & GDPR):

- Seluruh data keterlibatan gamifikasi dan tagihan finansial diklasifikasikan sebagai data pribadi yang wajib dilindungi.
- Pengguna memiliki hak meminta ekspor seluruh data riwayat mutasi poin dan log keanggotaan dalam format terstruktur (*Right to Data Portability*).
- Penghapusan akun (*Account Deletion*) wajib membersihkan seluruh data buku besar poin dan status langganan secara teratur sesuai standar hukum.

---

## 164. Atribut Gamifikasi Publik (Public Gamification Attributes)

Jika pengguna memilih untuk membagikan pencapaian ke ruang publik:

- **Atribut yang Diizinkan Tayang**: Nama samaran (*Display Name*), avatar profil, nama lencana yang dibuka, dan tanggal perolehan.
- **Atribut yang Dilarang Ditampilkan**: Angka hasil tes laboratorium, berat badan, riwayat penyakit, diagnosis dokter, atau lokasi tempat tinggal spesifik.

---

## 165. Atribut Gamifikasi Privat (Private Gamification Attributes)

Standar bawaan privasi gamifikasi (*Privacy by Default*):

- Secara *default*, seluruh profil gamifikasi, daftar lencana, dan saldo poin berstatus **PRIVAT PENUH**.
- Hanya pengguna bersangkutan yang dapat melihat dasbor kemajuan gamifikasi mereka sendiri.
- Tidak ada data yang dibagikan ke teman, keluarga, atau komunitas tanpa persetujuan eksplisit tindakan (*opt-in*).

---

## 166. Atribut Keanggotaan Publik (Public Membership Display)

Privasi status keanggotaan di ruang publik:

- Status paket langganan (Free, Silver, Gold, Platinum) **tidak pernah diumumkan ke publik secara otomatis**.
- Hal ini mencegah munculnya stratifikasi sosial, rasa minder, atau perlakuan istimewa yang tidak sehat di antara sesama anggota komunitas kesehatan.

---

## 167. Audit Keamanan & Integritas Transaksi (Security Audit & Fraud Monitoring)

Protokol pengamanan menyeluruh pada endpoint gamifikasi dan keanggotaan:

- **Mitigasi IDOR (*Insecure Direct Object References*)**: Memvalidasi kepemilikan `user_id` pada setiap sesi request klaim hadiah atau akses tagihan.
- **Pencegahan Replay Webhook**: Memeriksa token unik dan tanda tangan webhook perbankan.
- **Pemberantasan Pemalsuan Selesai Tugas**: Memverifikasi secara independen apakah tugas yang diklaim memang telah selesai di domain layanan terkait.
- **Audit Mutasi Finansial**: Memantau anomali transaksi pengembalian dana (*refunds*) secara *real-time*.

---

## 168. Strategi Pengujian Gamifikasi (Gamification Testing Strategy & Test Suites)

Rangkaian pengujian perangkat lunak untuk subsistem gamifikasi (*Gamification Test Suite*):

```typescript
describe("Gamification Engine Test Suite", () => {
  it("harus menolak pemberian poin yang diinisiasi langsung dari payload klien");
  it("harus memproses penyelesaian tantangan secara idempoten pada event ganda");
  it("harus mencatat penambahan poin ke points_ledger dan memperbarui saldo");
  it("harus menolak pembukaan lencana unik yang sudah pernah diperoleh pengguna");
  it("harus menambah streak pada aksi harian berturut-turut yang valid");
  it("harus mengaktifkan grace window 24 jam saat aksi terlewat satu hari");
  it("harus mengeksekusi reward reversal tanpa menghapus data riwayat transaksi lama");
});
```

---

## 169. Strategi Pengujian Keanggotaan (Membership Testing Strategy & Scenarios)

Rangkaian pengujian perangkat lunak untuk subsistem keanggotaan (*Membership Test Suite*):

```typescript
describe("Membership & Billing Test Suite", () => {
  it("harus mengaktifkan status ACTIVE hanya setelah verifikasi signature webhook valid");
  it("harus menolak pemrosesan webhook ganda (idempotent webhook handling)");
  it("harus membatasi akses fitur scanner saat kuota bulanan Free Tier habis");
  it("harus membuka akses instan saat pengguna melakukan upgrade mid-cycle");
  it("harus mempertahankan status akses hingga akhir siklus saat pembatalan langganan");
  it("harus memberikan masa tenggang 3 hari pada status PAST_DUE sebelum EXPIRED");
});
```

---

## 170. Pengujian Keamanan Klinis & Anti-Adiksi (Health Safety & Anti-Addiction Testing)

Pengujian kepatuhan batas keselamatan etika (*Safety & Anti-Addiction Test Suite*):

- **Uji Larangan Papan Peringkat Berat Badan**: Memastikan sistem menggagalkan upaya pembuatan papan peringkat berbasis selisih bobot tubuh atau defisit kalori ekstrem.
- **Uji Larangan Penalti Streak Menakutkan**: Memastikan pesan *streak break* bebas dari kata-kata punitif (*guilt-free verification*).
- **Uji Kebocoran Privasi**: Memastikan endpoint profil publik tidak pernah membocorkan data medis pengguna lain.

---

## 171. Kriteria Penerimaan Gamifikasi (Gamification Acceptance Criteria - DoD)

Kriteria Penerimaan Produksi Gamifikasi (*Gamification Definition of Done - DoD*):

- [ ] **Kalkulasi Sisi Server**: Seluruh penentuan poin, lencana, dan streak sepenuhnya otoritatif di server backend.
- [ ] **Idempotensi Terbukti**: Pengiriman kejadian berulang menghasilkan tepat satu mutasi buku besar poin.
- [ ] **Buku Besar Lengkap**: Seluruh mutasi saldo tercatat di `points_ledger` dengan relasi referensi sah.
- [ ] **Validasi Bukti Nyata**: Penyelesaian tugas tantangan terhubung dengan data tindakan preventif riil.
- [ ] **Bebas Komparasi Medis**: Tidak ada fitur pemeringkatan derajat kesehatan antar pengguna.
- [ ] **Bebas Imbalan Berbahaya**: Tidak ada reward untuk perilaku ekstrem, begadang, atau diet berlebihan.
- [ ] **Kendali Privasi Mandiri**: Pengguna dapat menyembunyikan profil dan mematikan elemen gamifikasi.
- [ ] **Pembatasan Frekuensi Notifikasi**: Mekanisme batching dan jam tenang terbukti aktif.

---

## 172. Kriteria Penerimaan Keanggotaan (Membership Acceptance Criteria - DoD)

Kriteria Penerimaan Produksi Keanggotaan (*Membership Definition of Done - DoD*):

- [ ] **Definisi Tingkatan Eksplisit**: Konfigurasi tier (Free, Silver, Gold, Platinum) terdaftar rapi di basis data.
- [ ] **Penegakan Hak Akses di Gateway**: Middleware secara tegas membatasi akses rute API sesuai tingkatan.
- [ ] **Otorisasi Pembayaran Sisi Server**: Tidak ada percabangan logika klien yang dapat memalsukan status langganan.
- [ ] **Verifikasi Webhook Kriptografis**: Tanda tangan webhook gateway tervalidasi HMAC sebelum diproses.
- [ ] **Daur Hidup Langganan Sempurna**: Transisi status `PENDING`, `ACTIVE`, `PAST_DUE`, `EXPIRED`, `CANCELLED` teruji.
- [ ] **Invariansi Keselamatan Medis**: Standar etika diagnosis, triase darurat, dan privasi identik di semua tingkatan.

---

## 173. Kriteria Penerimaan UX Gamifikasi (Gamification UX Acceptance Criteria)

Kriteria Penerimaan Pengalaman Pengguna Gamifikasi (*Gamification UX DoD*):

- [ ] Pengguna dapat memahami dengan jelas alasan dan asal muasal setiap perolehan poin.
- [ ] Indikator progres disajikan secara visual, transparan, dan terukur.
- [ ] Komunikasi saat rutinitas terputus (*streak break*) berfokus pada empati tanpa kata-kata menyalahkan.
- [ ] Antarmuka gamifikasi mematuhi standar aksesibilitas WCAG 2.1 AA (kontras warna dan label suara).
- [ ] Tata letak responsif sempurna pada berbagai ukuran layar ponsel pintar.
- [ ] Pengguna dapat mematikan suara dan animasi gamifikasi melalui menu preferensi.

---

## 174. Kriteria Penerimaan UX Keanggotaan (Membership UX Acceptance Criteria)

Kriteria Penerimaan Pengalaman Pengguna Keanggotaan (*Membership UX DoD*):

- [ ] Tabel perbandingan paket mudah dipahami dan bebas dari klaim medis yang menyesatkan.
- [ ] Harga dan siklus penagihan ditampilkan secara jujur dan transparan dalam Rupiah (IDR).
- [ ] Alur peningkatan paket (*upgrade*) dan pembatalan langganan dapat dilakukan mandiri dengan cepat.
- [ ] Pesan kesalahan saat pembayaran gagal bersifat informatif dan memberikan solusi alternatif nyata.
- [ ] Keterangan jatuh tempo tagihan berikutnya selalu dapat diperiksa pada profil pengguna.

---

## 175. Urutan Implementasi Bertahap (Recommended Phased Implementation Order)

Peta jalan urutan implementasi bertahap (*Phased Implementation Roadmap*):

```
  FASE 1: FONDASI TANTANGAN SEHAT (CHALLENGE FOUNDATION)
  • Skema database tantangan, tugas mikro harian, & validasi penyelesaian log.
                    │
                    ▼
  FASE 2: BUKU BESAR POIN & IDEMPOTENSI (POINTS LEDGER)
  • Tabel points_ledger, mesin verifikasi event, & layar riwayat mutasi transparan.
                    │
                    ▼
  FASE 3: SISTEM LENCANA & PENCAPAIAN (ACHIEVEMENTS ENGINE)
  • Master data lencana, user_achievements, logika evaluasi aturan, & notifikasi aman.
                    │
                    ▼
  FASE 4: RANGKAIAN KONSISTENSI & TOLERANSI (STREAKS & GRACE PERIOD)
  • Pelacakan hari berturut-turut, proteksi pembekuan (freeze), & pesan pemulihan empati.
                    │
                    ▼
  FASE 5: KEANGGOTAAN, ENTITLEMENT, & PEMBAYARAN (MEMBERSHIP & BILLING)
  • Tingkatan tier, integrasi webhook gateway Midtrans/Xendit, & middleware akses fitur.
                    │
                    ▼
  FASE 6: PENYEMPURNAAN EKOSISTEM KOMUNITAS (ADVANCED WELLNESS COMMUNITY)
  • Tantangan terkurasi ahli gizi, program kemitraan preventif, & rekognisi positif.
```

---

## 176. Skenario Demo Kompetisi: Gamifikasi (Competition Demo Scenario: Gamification)

Skenario demonstrasi langsung untuk kompetisi (*Live Competition Demo: Gamification*):

```
  [1] Pengguna Menyelesaikan Tindakan Preventif Nyata
      (Contoh: Mencatat data glukosa puasa 95 mg/dL & berjalan 30 menit)
                    │
                    ▼
  [2] Validasi Fisiologis Sisi Server Berhasil
      (Sistem memvalidasi keabsahan data)
                    │
                    ▼
  [3] Mutasi Buku Besar Terbit (+20 Poin Kredit)
      (Jejak transaksi tersimpan di points_ledger)
                    │
                    ▼
  [4] Bilah Progres Tantangan Bergerak Maju (Hari ke-7 Selesai)
                    │
                    ▼
  [5] Lencana "Ksatria Rutinitas 7 Hari" Terbuka Elegan
      (Penguatan positif instan tanpa komparasi toksik)
```

**Poin Narasi Utama**: Juri diperlihatkan bahwa imbalan gamifikasi PRONOIA berakar langsung pada tindakan preventif nyata di dunia fisik, bukan permainan angka virtual yang kosong.

---

## 177. Skenario Demo Kompetisi: Keanggotaan (Competition Demo Scenario: Membership)

Skenario demonstrasi langsung untuk kompetisi (*Live Competition Demo: Membership*):

```
  [1] Pengguna Free Mengakses Wawasan Preventif Dasar
      (Menampilkan analisis tren 30 hari standar)
                    │
                    ▼
  [2] Pengguna Memilih Peningkatan ke Paket Gold
      (Menampilkan simulasi checkout gateway pembayaran QRIS)
                    │
                    ▼
  [3] Webhook Settlement Terverifikasi Instan di Server
      (Status langganan berubah menjadi ACTIVE)
                    │
                    ▼
  [4] Hak Entitlement Analisis Wawasan Multimodal Langsung Terbuka
      (Pengguna dapat melihat korelasi data multi-bulan komprehensif)
```

**Poin Narasi Utama**: Peningkatan paket membuka fasilitas komputasi yang lebih mendalam, namun kedua paket memiliki hak perlindungan keselamatan darurat yang persis sama.

---

## 178. Naratif Pitch Kompetisi (Competition Pitch Narrative & Differentiation)

Naratif pembeda platform dalam sesi presentasi (*Pitch Narrative Differentiation*):

- **Gamifikasi Sebagai Lapisan Penguatan Kebiasaan (*Reinforcement Layer*)**: Gamifikasi bukan gimnasium virtual adiktif, melainkan instrumen ilmu perilaku (*behavioral science*) yang membantu masyarakat Indonesia menjaga konsistensi gaya hidup sehat.
- **Keanggotaan Sebagai Lapisan Aksesibilitas Layanan (*Service Access Layer*)**: Model monetisasi berkelanjutan yang memungkinkan penyediaan kecerdasan buatan tingkat tinggi dan interaksi dengan dokter spesialis secara terjangkau.
- **Inovasi Inti Tetap Kedaulatan Preventif**: Nilai utama PRONOIA adalah *Behavioral Intelligence Engine* yang mendeteksi risiko metabolik sebelum menjadi penyakit kronis.

---

## 179. Ringkasan Arsitektur Menyeluruh (Comprehensive Architecture Summary)

Ringkasan arsitektur holistik sistem Gamifikasi dan Keanggotaan PRONOIA:

```
                                  PENGGUNA (USER)
                                         │
                                         ▼
                             AKSI PENGGUNA TERVERIFIKASI
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
          DOMAIN DATA MEDIS                           DOMAIN GAMIFIKASI
      (Fisiologis, Rekam Lab, Vital)             (Poin, Lencana, Rangkaian Konsistensi)
                   │                                           │
                   ▼                                           ▼
        LINGKARAN PREVENTIF SEHAT                   PENGUATAN KEBIASAAN POSITIF
        (Deteksi Risiko & Rekomendasi)              (Katalog Imbalan & Motivasi Diri)
```

Sistem Keanggotaan mengawal aksesibilitas kapabilitas komputasi:

```
  STATUS KEANGGOTAAN ──► RESOLUSI TIER ──► MATRIKS ENTITLEMENT ──► OTORISASI FITUR & KUOTA
```

---

## 180. Relasi Sistem Produk Holistik (Final Holistic Product Relationship)

Relasi sinergis menyeluruh seluruh komponen ekosistem PRONOIA:

```
                              KESEHATAN PREVENTIF (PREVENTIVE HEALTH)
                                                 │
                  ┌──────────────────────────────┼──────────────────────────────┐
                  ▼                              ▼                              ▼
          MESIN PERILAKU SEHAT            ASISTENSI AI MULTIMODAL         DUKUNGAN PAKAR MEDIS
       (Health Behavior Engine)           (Empathetic AI Copilot)          (Doctors & Nutritionists)
                  │                              │                              │
                  └──────────────────────────────┼──────────────────────────────┘
                                                 ▼
                                     TINDAKAN NYATA PENGGUNA
                                                 │
                                                 ▼
                                     DAMPAK KESEHATAN FISIK
                                                 │
                  ┌──────────────────────────────┴──────────────────────────────┐
                  ▼                                                             ▼
         SISTEM GAMIFIKASI                                             SISTEM KEANGGOTAAN
   Penguatan Kebiasaan Positif Tanpa                                  Aksesibilitas Layanan & Kuota
       Komparasi Medis Toksik                                         Tanpa Menjual Kebenaran Medis
```

---

## 181. Prinsip Kedaulatan Tertinggi (Final Sovereign Ethical Principle)

> [!IMPORTANT]
> **Prinsip Tertinggi PRONOIA:**
> **"Gamifikasi harus membuat perilaku hidup sehat menjadi lebih memuaskan dan konsisten, sementara keanggotaan harus membuat kapabilitas teknologi canggih dan konsultasi pakar lebih mudah diakses. Keduanya tidak boleh dan tidak akan pernah dijadikan proksi penentu derajat kesehatan seseorang."**

### Rangkuman Invariansi Kritis Sistem:
```
  Saldo Poin      ≠  Skor Kesehatan Medis
  Lencana Profil  ≠  Piala Kesembuhan Klinis
  Rangkaian Hari  ≠  Jaminan Imunitas Biologis
  Keanggotaan     ≠  Kasta Derajat Kesehatan
  Paket Premium   ≠  Prioritas Triase Kegawatdaruratan Medis
```

Seluruh arsitektur gamifikasi dan keanggotaan PRONOIA bermuara pada satu tujuan luhur: **Membantu setiap individu memahami tubuhnya, melakukan tindakan pencegahan secara aman dan bermartabat, mempertahankan konsistensi tanpa kecemasan, dan menikmati kualitas hidup yang lebih sehat seutuhnya.**

---
