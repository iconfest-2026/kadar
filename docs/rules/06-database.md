# AEVYRA — Kaidah Rekayasa Basis Data & Tata Kelola Skema Relasional (Database Architecture & Schema Governance Rules)

Dokumen spesifikasi teknis ini mendefinisikan standar rekayasa basis data, perancangan skema relasional, tata kelola migrasi, jaminan integritas data ACID, serta protokol keamanan penyimpanan data klinis dan perilaku untuk seluruh ekosistem **AEVYRA**. Basis data berkedudukan sebagai **Sumber Kebenaran Tunggal (*Single Source of Truth*)** bagi seluruh status operasional sistem—mencakup akun pengguna, profil kesehatan, log asupan nutrisi, hasil pemindaian kamera, garis acuan kebiasaan personal, sinyal perilaku, wawasan pencegahan penyakit, rencana intervensi mikro, tantangan gamifikasi, reservasi konsultasi, notifikasi, hingga jejak audit keamanan forensik.

Platform mewajibkan penerapan disiplin normalisasi bentuk normal ketiga (*Third Normal Form - 3NF*), penegakan kunci asing (*foreign keys*) di lapisan mesin basis data, pengindeksan berbasis kueri yang terukur, pemisahan mutlak antara nilai kosong (*missing/null*) dan nilai nol (*zero*), penggunaan waktu terstandar UTC ISO-8601, enkripsi tingkat kolom untuk data biometrik sensitif, serta pendekatan *append-only* untuk rekam jejak historis pasien guna menjamin kedaulatan data dan kepatuhan terhadap Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022).

---

### Kontrol Dokumen & Metadata Arsitektur

| Parameter Dokumen | Spesifikasi Teknis / Status Resmi |
| :--- | :--- |
| **Nomor Dokumen Standar** | `AEVYRA-RULE-006` |
| **Versi Standar Basis Data** | `v1.0.0-PROD` (Edisi Kepatuhan Skema Produksi & ICONFEST 2026) |
| **Tanggal Efektif Berlaku** | 17 September 2026 |
| **Status Otorisasi** | Resmi Disetujui / Berlaku Mutlak (*Mandatory Database Architecture Standard*) |
| **Klasifikasi Akses** | Seluruh Perekayasa Backend, Tim DBA, & Arsitek Sistem |
| **Mesin Basis Data Utama** | PostgreSQL 16+ (Produksi & Pementasan) / SQLite In-Memory (Pengujian Terisolasi) |
| **Lapisan Abstraksi Data** | Laravel Eloquent ORM 11+ & Database Query Builder |
| **Kepatuhan Privasi & Hukum** | UU PDP No. 27/2022, ISO/IEC 27001:2022 (A.8.24 Enkripsi Data & A.8.11 Anonimisasi) |
| **Standar Format Waktu** | UTC (*Coordinated Universal Time*) / ISO-8601 Canonical Format (`YYYY-MM-DDTHH:mm:ssZ`) |
| **Tingkat Isolasi Transaksi** | *Read Committed* (Bawaan) & *Repeatable Read / Serializable* (Alur Booking & Pembayaran) |

---

### Matriks 12 Klaster Arsitektur Basis Data AEVYRA

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                   TOPOLOGI REKAYASA BASIS DATA RELASIONAL EKOSISTEM AEVYRA               │
└───────────────────────────────────────────────────────────────────────────────────────────┘
   │
   ├── [Klaster 1] Fondasi Relasional, Normalisasi 3NF, & Integritas Kunci (Bagian 1 – 14)
   │   └── Single Source of Truth, Schema Principles, 3NF, JSON Guardrails, Surrogate PK, FK Integrity
   │
   ├── [Klaster 2] Skema Metrik Biometrik, Satuan Kanonikal, & Waktu UTC (Bagian 15 – 23)
   │   └── Health Profile, Biometric Metrics, Metric Types, Mandatory Units, Missing vs Zero, UTC Timestamps
   │
   ├── [Klaster 3] Garis Acuan Perilaku, Sinyal, & Wawasan Kesehatan (Bagian 24 – 30)
   │   └── Personal Baselines, Versioning, Behavioral Signals, State Machine, Uniqueness, Insight Lifecycle
   │
   ├── [Klaster 4] Intervensi Kebiasaan, Tantangan, & Sesi Konsultasi (Bagian 31 – 39)
   │   └── Intervention Plans, Progress Tracking, Challenge Master, Double-Booking Shield, Consultation ACID
   │
   ├── [Klaster 5] Notifikasi, Lencana, Keanggotaan, & Jejak Audit (Bagian 40 – 45)
   │   └── Notification Queue, Payload Privacy, Gamification Badges, Subscription Tiers, Immutable Audit Logs
   │
   ├── [Klaster 6] Klasifikasi Data Sensitif, Enkripsi, & Manajemen Indeks (Bagian 46 – 55)
   │   └── Sensitive Classification, Column-Level Encryption, Argon2id Passwords, Composite Indexes, Check Constraints
   │
   ├── [Klaster 7] Tata Kelola Migrasi Skema, Nullability, & Nilai Default (Bagian 56 – 63)
   │   └── Reversible Migrations, Safe Column Renames, Explicit Defaults, Strict Nullability, Mandatory Timestamps
   │
   ├── [Klaster 8] Arsitektur Rekam Historis, Append-Only, & Metadata AI/Scanner (Bagian 64 – 72)
   │   └── Append-Oriented Logging, Current vs History, Data Provenance, Quality Flags, Food Scanner, AI Context
   │
   ├── [Klaster 9] Retensi Data, Hak Hapus Privasi, & Isolasi Data Uji (Bagian 73 – 81)
   │   └── Retention Schedules, UU PDP Right to Erasure, Soft Deletes, Anonymization, Synthetic Seeds, DB Isolation
   │
   ├── [Klaster 10] Kinerja Kueri, Agregasi Analitik, & Konkurensi Transaksi (Bagian 82 – 88)
   │   └── N+1 Prevention, Time-Series Optimization, Pre-calculated Aggregates, Background Batch, Concurrency Locks
   │
   ├── [Klaster 11] Keamanan Jaringan DB, Pencadangan, & Migrasi Zero-Downtime (Bagian 89 – 95)
   │   └── Least Privilege Network, Automated Backups, Read-Only Analytics, Expand-and-Contract Migrations
   │
   └── [Klaster 12] Konvensi Penamaan, Pembagian Tanggung Jawab, & Kaidah Pamungkas (Bagian 96 – 120)
       └── Snake_case Naming, Database vs App Scope, Trigger Policies, Safe AI DB Access, Final Sovereign Rule
```

---

## 1. Tujuan & Ruang Lingkup Rekayasa Basis Data (Purpose & Database Scope)

Kaidah rekayasa basis data ini menetapkan standar arsitektur data, perancangan skema relasional, tata kelola integritas referensial, serta prosedur operasional penyimpanan data untuk platform **AEVYRA**. Basis data bertindak sebagai fondasi utama penampung seluruh status operasional sistem, yang meliputi:

* **Manajemen Identitas & Akses:** Akun pengguna, peran sistem (*roles*), perizinan (*permissions*), dan sesi otentikasi.
* **Informasi Profil & Konteks Pengguna:** Profil kesehatan, preferensi diet, riwayat alergi, dan sasaran gaya hidup (*health goals*).
* **Deret Waktu Biometrik & Nutrisi:** Metrik kesehatan harian, log asupan makanan (*food logs*), dan hasil pemindaian kamera (*vision scans*).
* **Analitik Perilaku Preventif:** Garis acuan personal (*personal baselines*), sinyal deviasi perilaku (*behavioral signals*), dan skor perilaku kesehatan.
* **Intervensi & Pendampingan:** Rekomendasi tindakan mikro, wawasan kesehatan (*health insights*), rencana aksi, dan kemajuan tantangan (*challenges*).
* **Layanan Terpandu Manusia:** Reservasi sesi konsultasi, riwayat pesan pembinaan, catatan privat instruktur, dan evaluasi hasil.
* **Tata Kelola & Keamanan:** Antrean notifikasi, pencapaian lencana gamifikasi, status keanggotaan, serta log audit akses forensik.

---

## 2. Pilihan Teknologi Basis Data Relasional (Relational Database Technology)

Platform AEVYRA menetapkan sistem manajemen basis data relasional (**RDBMS - Relational Database Management System**) sebagai teknologi penyimpanan utama dengan dukungan **PostgreSQL 16+** untuk lingkungan pementasan (*staging*) dan produksi (*production*), serta **SQLite In-Memory** untuk lingkungan pengujian otomatis (*automated test suites*).

### Justifikasi Pemilihan Mesin Basis Data Relasional

| Kriteria Rekayasa | PostgreSQL (Produksi) | SQLite (Pengujian Terisolasi) |
| :--- | :--- | :--- |
| **Jaminan Transaksi ACID** | Penuh dengan isolasi *Read Committed* hingga *Serializable*. | Cepat dan ringan untuk eksekusi ribuan *unit test*. |
| **Penegakan Integritas** | Kunci asing (*Foreign Keys*), *Check Constraints*, & *Unique Indexes*. | Mendukung sintaks relasional kompatibel melalui Laravel ORM. |
| **Fitur Lanjutan** | Enkripsi pgcrypto, tipe data JSONB terindeks, & partisi tabel deret waktu. | Pengujian regresi kilat tanpa dependensi server eksternal. |
| **Kerangka Abstraksi** | Didukung penuh oleh **Laravel Eloquent ORM 11+** dan *Schema Builder*. | Mendukung siklus migrasi *in-memory* instan pada CI/CD. |

Penggunaan teknologi *NoSQL* murni sebagai basis data utama ditolak secara tegas karena mengorbankan integritas referensial dan konsistensi relasi data kesehatan pengguna.

---

## 3. Basis Data sebagai Sumber Kebenaran Tunggal (Database as Single Source of Truth)

Basis data berkedudukan sebagai **Sumber Kebenaran Tunggal (*Single Source of Truth*)** mutlak bagi seluruh status bisnis aplikasi.

> [!IMPORTANT]
> **Prinsip Kedaulatan Basis Data:**
> Status aplikasi yang valid adalah status yang secara nyata tersimpan dan terkonsolidasi di dalam tabel-tabel basis data relasional. Cache memori (*Redis*), status antarmuka frontend (*Pinia / React State*), dan tanggapan model kecerdasan buatan (*AI inference outputs*) hanyalah representasi sementara yang wajib tunduk pada verifikasi status basis data.

```text
+-------------------------------------------------------------------------+
|                  HIERARKI SUMBER KEBENARAN APLIKASI                     |
+-------------------------------------------------------------------------+
|  [TINGKAT 1 - SUMBER TUNGGAL] : PostgreSQL Relational Database (ACID)   |
|                                       ▲                                 |
|  [TINGKAT 2 - LAPISAN CACHE]  : Redis Distributed Key-Value Cache       |
|                                       ▲                                 |
|  [TINGKAT 3 - LAPISAN APLIKASI]: Laravel Services, Jobs, & Controllers  |
|                                       ▲                                 |
|  [TINGKAT 4 - KLIEN FRONTEND] : Browser Cache & PWA IndexedDB           |
+-------------------------------------------------------------------------+
```

Jika terjadi perbedaan status (*state conflict*) antara data di cache frontend dengan baris di tabel basis data, logika aplikasi wajib memenangkan data pada basis data.

---

## 4. Prinsip Perancangan Skema Terstruktur (Schema Design Principles)

Perancangan skema tabel wajib mematuhi kaidah desain relasional terstruktur (*structured schema design principles*):

1. **Struktur Relasi Eksplisit (*Explicit Relationships*):** Hubungan antar-entitas data dimodelkan melalui kolom kunci asing formal, bukan diasumsikan dari pola string atau nama berkas.
2. **Kesesuaian Tipe Data Presisi (*Strongly Typed Columns*):** Gunakan tipe data bawaan mesin basis data yang paling tepat (misalnya `BIGINT` untuk ID, `NUMERIC(8,2)` untuk biometrik, `TIMESTAMP WITH TIME ZONE` untuk waktu).
3. **Keterbacaan Struktur (*Semantic Schema*):** Penamaan tabel dan kolom harus merefleksikan domain bisnis secara intuitif dan konsisten.
4. **Pencegahan Redundansi Tak Terkendali:** Hindari duplikasi kolom yang menyimpan informasi identik di beberapa tabel berbeda tanpa mekanisme sinkronisasi ACID.

---

## 5. Kaidah Normalisasi Bentuk Normal Ketiga (Third Normal Form Normalization)

Seluruh tabel transaksional (*OLTP - Online Transaction Processing*) dalam AEVYRA wajib dirancang minimal memenuhi kaidah **Bentuk Normal Ketiga (*Third Normal Form - 3NF*)**:

* **Bentuk Normal Pertama (1NF):** Setiap kolom hanya memuat nilai atomik tunggal (*atomic values*), dan tidak ada grup kolom yang berulang (*repeating groups*).
* **Bentuk Normal Kedua (2NF):** Memenuhi 1NF dan seluruh atribut non-kunci bergantung secara fungsional penuh (*fully functionally dependent*) pada kunci primer, bukan pada bagian dari kunci primer komposit.
* **Bentuk Normal Ketiga (3NF):** Memenuhi 2NF dan tidak ada dependensi transitif (*no transitive dependency*) di mana atribut non-kunci bergantung pada atribut non-kunci lainnya.

> [!NOTE]
> **Pengecualian Denormalisasi Terkendali:**
> Denormalisasi tabel diperbolehkan secara selektif **hanya** pada tabel rekapitulasi analitik agregat (*read-heavy reporting tables*) atau cache agregat dasbor, dengan syarat mekanisme peremajaan data (*cache invalidation/recalculation*) terdokumentasi dan teruji secara ketat.

---

## 6. Batasan Ketat Penggunaan Kolom JSON (Strict JSON Column Usage)

Kolom bertipe data semi-terstruktur (`JSON` / `JSONB`) hanya boleh digunakan untuk data yang bersifat polimorfik dinamis, metadata tambahan pihak ketiga yang tidak seragam, atau muatan log audit.

### Panduan Penggunaan Kolom JSON vs Relasional

| Kategori Data | Tipe Penyimpanan Wajib | Justifikasi Rekayasa |
| :--- | :--- | :--- |
| **ID Pengguna & Kepemilikan** | Kolom Relasional (`user_id BIGINT`) | Wajib untuk indeks relasi, integritas referensial, & otorisasi. |
| **Nilai Metrik & Satuan** | Kolom Relasional (`value NUMERIC`, `unit VARCHAR`) | Diperlukan untuk agregasi matematika, pengurutan, & indeks deret waktu. |
| **Status Siklus Hidup** | Kolom Relasional (`status VARCHAR`) | Dibutuhkan untuk penyaringan kueri cepat dan *check constraint*. |
| **Metadata Mentah Kamera** | Kolom JSONB (`scanner_metadata JSONB`) | Struktur respons visi model bervariasi tergantung versi model AI. |
| **Konteks Audit Trail** | Kolom JSONB (`payload_diff JSONB`) | Menyimpan snapshot sebelum/sesudah perubahan yang skemanya dinamis. |

> [!CAUTION]
> Dilarang keras menyembunyikan kolom kunci asing, tanggal kejadian, atau status entitas di dalam dokumen JSON hanya demi menghindari pembuatan migrasi skema tabel!

---

## 7. Standarisasi Kunci Primer Tak Bernilai Bisnis (Surrogate Primary Keys)

Seluruh tabel entitas dalam AEVYRA wajib menggunakan **Kunci Primer Pengganti (*Surrogate Primary Key*)** buatan sistem yang independen dari atribut data bisnis:

* **Standar Tipe Kunci:** `BIGINT UNSIGNED AUTO_INCREMENT` (MySQL) atau `BIGSERIAL / IDENTITY` (PostgreSQL), atau `UUIDv7` untuk entitas yang memerlukan pembuatan ID terdistribusi di sisi klien dengan urutan waktu yang dapat diindeks (*time-ordered indexing*).
* **Larangan Kunci Primer Alami (*Natural Business Keys*):** Dilarang menjadikan Nomor Induk Kependudukan (NIK), alamat email, nomor telepon, atau nama pengguna sebagai *Primary Key* tabel. Atribut bisnis dapat berubah di kemudian hari dan dapat mengekspos data pribadi di URL atau log kueri.
* Atribut bisnis yang wajib unik (seperti email) dilindungi menggunakan indeks unik terpisah (*Unique Constraint*), bukan dijadikan kunci primer tabel.

---

## 8. Penegakan Kunci Asing & Integritas Relasi (Foreign Keys & Relational Integrity)

Kunci asing (*Foreign Keys*) wajib didefinisikan secara eksplisit pada setiap hubungan antar-tabel untuk mencerminkan ketergantungan relasional aktual.

```sql
-- Contoh Penegakan Kunci Asing Eksplisit pada Tabel Metrik Kesehatan
CREATE TABLE health_metrics (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    value NUMERIC(8,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    source VARCHAR(50) NOT NULL DEFAULT 'manual',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_health_metrics_user_id 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE RESTRICT
);
```

Penegakan kunci asing mencegah terjadinya baris yatim (*orphaned records*) dan menjamin integritas hubungan antar-entitas data.

---

## 9. Penegakan Integritas Referensial pada Lapisan Basis Data (Referential Integrity Enforcement)

Integritas referensial data wajib ditegakkan pada lapisan mesin basis data (*database-level enforcement*), bukan hanya mengandalkan logika validasi kode aplikasi backend.

> [!WARNING]
> **Larangan Bergantung pada Validasi Aplikasi Semata:**
> Logika validasi di level controller atau model Laravel dapat terlewati saat terjadi eksekusi skrip CLI, *batch seeder*, transaksi asinkron bersamaan (*race conditions*), atau perbaikan data manual oleh DBA. Kendala kunci asing (`foreignId()->constrained()`) di tingkat basis data adalah garis pertahanan terakhir yang tidak boleh ditawar.

Sebagai contoh konkret: baris data pada tabel `scan_results` dilarang keras mereferensikan `scan_id` yang tidak terdaftar di tabel `scans`.

---

## 10. Kebijakan Perilaku Penghapusan Baris (Row Deletion Behavior & Cascades)

Perilaku penghapusan data relasional (*ON DELETE actions*) wajib dipilih secara sadar berdasarkan karakteristik domain data medis dan audit:

| Strategi Penghapusan | Skenario Penggunaan yang Sah | Skenario yang Dilarang Keras |
| :--- | :--- | :--- |
| **`RESTRICT / NO ACTION` (Bawaan)** | Tabel data kesehatan kritis (`health_metrics`, `consultations`). Mencegah penghapusan akun jika masih memiliki riwayat klinis. | Dilarang pada data cache sementara yang tidak bernilai audit. |
| **`CASCADE`** | Tabel dependensi kuat yang tidak memiliki arti tanpa induknya (misal: `scan_items` saat draf `scan` dihapus). | Dilarang keras pada log audit, riwayat transaksi finansial, atau data rekam medis pasien. |
| **`SET NULL`** | Kolom referensi opsional (misalnya `instructor_id` pada konsultasi jika akun instruktur dinonaktifkan). | Dilarang pada kolom kunci asing yang didefinisikan `NOT NULL`. |
| **`SOFT DELETE`** | Entitas akun pengguna atau profil yang wajib mempertahankan jejak historis untuk kepatuhan regulasi. | Dilarang pada tabel partisi transaksi bervolume tinggi yang membutuhkan retensi berkala. |

---

## 11. Skema Kepemilikan Data Pengguna (User-Owned Data Schema)

Setiap rekaman data kesehatan pribadi yang dimiliki oleh pengguna (*user-owned data*) wajib memiliki kolom relasional eksplisit `user_id` yang langsung mengarah ke tabel `users`.

Contoh tabel dengan kepemilikan eksplisit:
* `health_profiles.user_id`
* `health_metrics.user_id`
* `food_logs.user_id`
* `scans.user_id`
* `health_insights.user_id`
* `intervention_plans.user_id`
* `user_challenges.user_id`

Keberadaan kolom kepemilikan langsung ini sangat krusial untuk memfasilitasi:
1. Pengecekan otorisasi tingkat baris (*Row-Level Authorization*).
2. Penyaringan kueri cepat berbasis indeks (`WHERE user_id = ?`).
3. Pemenuhan hak hapus data pribadi (*Right to Erasure*) di bawah UU PDP.
4. Pelacakan log audit keamanan forensik.

---

## 12. Kepemilikan Data Wajib Dapat Dikueri Langsung (Queryable Data Ownership)

Kepemilikan data pengguna wajib dapat dikueri secara langsung (*queryable*) melalui kolom indeks relasional tabel, bukan diekstraksi secara lambat dari struktur dokumen teks atau payload JSON.

```sql
-- ✅ PENDEKATAN BENAR (Relasional, Cepat, Terindeks):
SELECT * FROM health_metrics WHERE user_id = 1042 AND metric_type = 'weight';

-- ❌ PENDEKATAN SALAH (Lambat, Boros Sumber Daya, Rawan Galat):
SELECT * FROM health_metrics WHERE metadata->>'owner_id' = '1042';
```

Dilarang keras menyimpulkan kepemilikan data dari konvensi URL, nama folder berkas, atau hasil inferensi teks model kecerdasan buatan.

---

## 13. Skema Penugasan & Akses Bimbingan Instruktur (Instructor Assignment Schema)

Jika seorang Instruktur (*Coach*) diberikan izin untuk mengakses data profil anggota tertentu, hubungan hak akses tersebut wajib dimodelkan secara terstruktur dalam tabel penugasan khusus:

```sql
CREATE TABLE instructor_member_assignments (
    id BIGSERIAL PRIMARY KEY,
    instructor_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    assigned_by BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_ima_instructor FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_ima_member FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_ima_admin FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT uq_instructor_member UNIQUE (instructor_id, member_id, status)
);
```

Basis data harus mampu menjawab secara deterministik apakah seorang instruktur berhak membaca metrik anggota tanpa perlu membaca riwayat obrolan AI atau log aplikasi yang tidak terstruktur.

---

## 14. Standardisasi Hubungan Banyak-ke-Banyak (Many-to-Many Relationships)

Hubungan banyak-ke-banyak (*Many-to-Many Relationships*) wajib menggunakan tabel perantara (*pivot tables*) dengan penamaan gabungan bentuk tunggal menurut urutan alfabet (misalnya `challenge_user`, `badge_user`) atau nama substantif fungsional (`instructor_member_assignments`).

### Standar Rekayasa Tabel Pivot

1. **Kunci Asing Berpasangan:** Menyertakan dua kolom kunci asing yang mengikat kedua entitas utama.
2. **Kunci Unik Komposit (*Composite Unique Index*):** Mencegah duplikasi asosiasi ganda pada entitas yang sama.
3. **Metadata Siklus Hidup:** Wajib menyertakan kolom konteks relasional seperti `assigned_at`, `status`, `expires_at`, dan `created_at`.
4. **Kunci Primer Tersendiri:** Disarankan menyertakan kolom `id BIGSERIAL` jika tabel pivot memiliki entitas turunan atau membutuhkan audit trail mandiri.

---

## 15. Skema Tabel Profil Kesehatan Pengguna (Health Profile Schema)

Tabel `health_profiles` dirancang khusus untuk menyimpan parameter biometrik dasar dan preferensi gaya hidup pengguna yang bersifat kontekstual preventif:

```sql
CREATE TABLE health_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    height_cm NUMERIC(5,2),
    weight_kg NUMERIC(5,2),
    birth_date DATE,
    gender VARCHAR(20),
    activity_level VARCHAR(30) NOT NULL DEFAULT 'sedentary',
    dietary_preference VARCHAR(50),
    allergies JSONB DEFAULT '[]'::jsonb,
    declared_conditions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_health_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);
```

Dilarang keras membuat kolom generik tanpa batas seperti `misc_medical_data TEXT` sebagai tempat penampungan data medis acak tanpa kontrol skema.

---

## 16. Skema Tabel Metrik Biometrik (Health Metrics Schema)

Tabel `health_metrics` menyimpan catatan data deret waktu (*time-series data*) dari observasi kebiasaan dan pengukuran tubuh berkala pengguna:

```sql
CREATE TABLE health_metrics (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    value NUMERIC(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    source VARCHAR(50) NOT NULL DEFAULT 'manual',
    quality_status VARCHAR(30) NOT NULL DEFAULT 'valid',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hm_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Indeks Kunci untuk Kueri Deret Waktu Pengguna
CREATE INDEX idx_health_metrics_user_type_time 
    ON health_metrics (user_id, metric_type, recorded_at DESC);
```

Setiap penambahan baris metrik baru wajib mengikuti skema ini untuk menjamin konsistensi agregasi grafik di seluruh platform.

---

## 17. Standardisasi Taksonomi Tipe Metrik (Metric Type Taxonomy)

Tipe metrik yang diizinkan masuk ke dalam basis data dikendalikan secara ketat menggunakan *Backed Enums* pada lapisan aplikasi dan batasan skema (*Check Constraints*) pada basis data.

### Taksonomi Tipe Metrik Kanonikal

```sql
ALTER TABLE health_metrics ADD CONSTRAINT chk_metric_types 
CHECK (metric_type IN (
    'weight',
    'height',
    'sleep_duration',
    'hydration',
    'steps',
    'active_minutes',
    'mood_score',
    'resting_heart_rate',
    'blood_glucose_random',
    'blood_pressure_systolic',
    'blood_pressure_diastolic'
));
```

Dilarang keras mengizinkan string sembarang (*arbitrary strings*) menjadi tipe metrik liar di dalam basis data tanpa pendaftaran resmi dalam basis aturan arsitektur.

---

## 18. Satuan Metrik Eksplisit & Tidak Bersifat Opsional (Mandatory Explicit Metric Units)

Setiap rekaman metrik numerik wajib menyertakan unit pengukuran eksplisit pada kolom `unit`. Angka mentah tanpa satuan tidak memiliki arti ilmiah dan berpotensi memicu kesalahan penanganan fatal.

| Tipe Metrik | Satuan Kanonikal Platform | Satuan Konversi yang Divalidasi |
| :--- | :--- | :--- |
| **Massa Tubuh (*Weight*)** | `kg` | `lb` (Konversi teruji: `1 lb = 0.453592 kg`) |
| **Tinggi Badan (*Height*)** | `cm` | `in` (Konversi teruji: `1 in = 2.54 cm`) |
| **Durasi Waktu (*Sleep/Active*)** | `minutes` / `hours` | `1 hour = 60 minutes` |
| **Volume Cairan (*Hydration*)** | `mL` / `L` | `1 L = 1000 mL` |
| **Aktivitas Langkah (*Steps*)** | `steps` | Bilangan bulat positif |
| **Gula Darah (*Glucose*)** | `mg/dL` | `mmol/L` (Standar medis laboratorium) |

Sistem dilarang mengasumsikan satuan secara diam-diam. Seluruh nilai yang disimpan ke tabel harus telah dinormalisasi ke satuan kanonikal platform.

---

## 19. Pembedaan Nilai Kosong vs Nilai Nol (Missing Data vs Zero Value)

Skema basis data wajib membedakan secara tegas antara nilai tidak ada/hilang (**`NULL`**) dan nilai pengukuran aktual nol (**`0`**):

> [!CAUTION]
> **Pembedaan Filosofis & Teknis `NULL` vs `0`:**
> * `hydration = NULL` : Pengguna **tidak mencatat log hidrasi** pada hari tersebut. Status data adalah tidak diketahui (*missing*).
> * `hydration = 0.00 L` : Pengguna **secara eksplisit mencatat konsumsi 0 liter air**, yang mengindikasikan kondisi dehidrasi parah yang disengaja.

Menyubstitusi nilai `NULL` menjadi angka `0` secara diam-diam (*silent zero substitution*) dilarang keras karena merusak validitas perhitungan rata-rata garis acuan kebiasaan pengguna.

---

## 20. Rekam Asal-Usul & Sumber Data (Data Source & Provenance Schema)

Setiap entri metrik kesehatan wajib mencatat kolom asal-usul data (*data provenance / source*) untuk memastikan keterlacakan hukum dan medis dari data tersebut:

```sql
ALTER TABLE health_metrics ADD CONSTRAINT chk_metric_sources 
CHECK (source IN (
    'manual',        -- Diinput langsung oleh pengguna melalui formulir UI
    'scanner',       -- Hasil analisis visual AI dari kamera pemindai santapan
    'wearable',      -- Sinkronisasi otomatis dari perangkat jam/sensor pintar
    'external_sync', -- Impor data dari penyedia eksternal (Apple Health / Health Connect)
    'instructor',    -- Dicatat oleh instruktur terverifikasi saat sesi konsultasi
    'system'         -- Hasil kalkulasi analitik turunan agregat sistem
));
```

Informasi asal-usul data ini memungkinkan sistem menentukan tingkat kepercayaan (*confidence level*) terhadap setiap data yang diolah.

---

## 21. Standardisasi Pencatatan Waktu ISO-8601 (Canonical Timestamp Rules)

Tabel deret waktu kesehatan wajib memisahkan secara tegas antara waktu kejadian aktual (*event timestamp*) dan waktu penyisipan baris ke basis data (*system insertion timestamp*):

* **`recorded_at` (`TIMESTAMP WITH TIME ZONE`):** Waktu nyata saat aktivitas fisik dilakukan, makanan dikonsumsi, atau waktu tidur berlangsung. Kolom ini menjadi dasar utama analisis tren historis dan garis acuan personal.
* **`created_at` (`TIMESTAMP WITH TIME ZONE`):** Waktu teknis saat baris data berhasil di-*insert* ke dalam tabel basis data.

```markdown
Contoh Skenario Pencatatan Tertunda (Back-Filling):
Pengguna mencatat durasi tidur malam kemarin pada siang hari ini:
- `recorded_at` = 2026-09-16 23:00:00+00 (Waktu tidur aktual kemarin malam)
- `created_at`  = 2026-09-17 05:30:00+00 (Waktu pencatatan di aplikasi hari ini)
```

Seluruh kueri analitik kebiasaan wajib digerakkan oleh `recorded_at`, bukan `created_at`.

---

## 22. Pengelolaan Zona Waktu UTC (Strict UTC Timezone Handling)

Seluruh kolom waktu dalam basis data AEVYRA wajib disimpan menggunakan zona waktu standar terpadu **UTC (*Coordinated Universal Time*)** dengan tipe data `TIMESTAMP WITH TIME ZONE` (`TIMESTAMPTZ`).

```text
+-------------------------------------------------------------------------+
|                  STANDARISASI ZONA WAKTU INTEROPERABEL                  |
+-------------------------------------------------------------------------+
|  Input Klien (WIB / UTC+7) : 2026-09-17 19:30:00 (Makan Malam Jakarta)  |
|                                    ↓                                    |
|  Normalisasi Backend       : Konversi otomatis ke UTC                   |
|                                    ↓                                    |
|  Tersimpan di Basis Data   : 2026-09-17 12:30:00+00 (UTC Murni)         |
|                                    ↓                                    |
|  Penyajian Kembali ke UI   : Diformat ulang ke zona waktu lokal pengguna|
+-------------------------------------------------------------------------+
```

Penyimpanan waktu lokal mentah tanpa informasi offset zona waktu dilarang keras karena memicu kesalahan pergantian hari (*date boundary errors*) pada kalkulasi siklus tidur dan tantangan harian.

---

## 23. Penyimpanan Waktu Sesi Konsultasi (Consultation Scheduling Storage)

Data jadwal sesi konsultasi antara pembina (*instructor*) dan anggota (*member*) wajib menyimpan informasi waktu yang presisi dan bebas ambiguitas:

```sql
CREATE TABLE consultations (
    id BIGSERIAL PRIMARY KEY,
    instructor_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    member_timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Jakarta',
    instructor_timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Jakarta',
    status VARCHAR(30) NOT NULL DEFAULT 'scheduled',
    meeting_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_c_instructor FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_c_member FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_consultation_duration CHECK (duration_minutes > 0 AND duration_minutes <= 180),
    CONSTRAINT chk_consultation_times CHECK (scheduled_end > scheduled_start)
);
```

Penyimpanan zona waktu asal kedua belah pihak menjamin pengingat notifikasi dikirimkan pada jam lokal yang tepat bagi masing-masing pihak.

---

## 24. Skema Tabel Garis Acuan Perilaku (Behavioral Baselines Schema)

Tabel `behavior_baselines` menyimpan catatan garis acuan kebiasaan personal pengguna yang dihitung secara matematis dari agregasi data historis:

```sql
CREATE TABLE behavior_baselines (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    baseline_value NUMERIC(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    calculation_method VARCHAR(50) NOT NULL DEFAULT 'moving_average_30d',
    window_start TIMESTAMP WITH TIME ZONE NOT NULL,
    window_end TIMESTAMP WITH TIME ZONE NOT NULL,
    sample_count INTEGER NOT NULL,
    confidence_score NUMERIC(3,2) NOT NULL DEFAULT 1.00,
    version INTEGER NOT NULL DEFAULT 1,
    calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bb_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

CREATE INDEX idx_baselines_user_metric ON behavior_baselines (user_id, metric_type, version);
```

Skema ini menjamin bahwa setiap kali sistem mendeteksi deviasi kebiasaan, sistem dapat membuktikan secara transparan data sampel dan rumus yang digunakan untuk menghasilkan garis acuan tersebut.

---

## 25. Pengelolaan Versi Garis Acuan Kebiasaan (Baseline Versioning & History)

Ketika formula kalkulasi garis acuan mengalami pembaruan signifikan (misalnya peralihan dari rata-rata sederhana 7 hari ke rata-rata tertimbang eksponensial 30 hari), sistem wajib mencatat versi algoritma baru (`version = 2`) tanpa menimpa (*overwrite*) catatan historis lama.

* Dilarang membandingkan garis acuan versi baru dengan metrik historis yang dihitung menggunakan rumus versi lama tanpa normalisasi.
* Setiap baris garis acuan yang berstatus kedaluwarsa tetap dipertahankan untuk kebutuhan audit longitudinal dan rekonstruksi analisis masa lalu.

---

## 26. Skema Tabel Sinyal Perilaku Terdeteksi (Behavioral Signals Schema)

Tabel `behavior_signals` menampung rekaman sinyal analitis ketika kebiasaan pengguna terdeteksi menyimpang dari garis acuan personalnya:

```sql
CREATE TABLE behavior_signals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    signal_type VARCHAR(100) NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    baseline_value NUMERIC(10,2) NOT NULL,
    recent_value NUMERIC(10,2) NOT NULL,
    delta NUMERIC(10,2) NOT NULL,
    direction VARCHAR(20) NOT NULL, -- 'increase', 'decrease', 'volatile'
    confidence NUMERIC(3,2) NOT NULL,
    evidence_window_days INTEGER NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);
```

Rekam data ini memastikan setiap peringatan yang muncul di aplikasi memiliki bukti kuantitatif yang kokoh (*grounded evidence*).

---

## 27. Mesin Status Siklus Hidup Sinyal Perilaku (Behavioral Signal State Machine)

Status siklus hidup sinyal perilaku dikendalikan oleh mesin status (*state machine*) dengan nilai baku yang terdefinisi ketat:

```text
+-------------------------------------------------------------------------+
|                MESIN STATUS SIKLUS HIDUP SINYAL PERILAKU                |
+-------------------------------------------------------------------------+
|                             [ACTIVE]                                    |
|                       (Sinyal Baru Terdeteksi)                          |
|                                |                                        |
|               +----------------+----------------+                       |
|               |                                 |                       |
|               ▼                                 ▼                       |
|       [ACKNOWLEDGED]                       [DISMISSED]                  |
|    (Dilihat oleh Pengguna)           (Diabaikan secara Sadar)           |
|               |                                                         |
|               ▼                                                         |
|          [RESOLVED]                                                     |
| (Kebiasaan Kembali Normal)                                              |
+-------------------------------------------------------------------------+
```

Dilarang menggunakan string bebas atau status ad-hoc yang tidak terdaftar dalam kontrak mesin status sistem.

---

## 28. Pencegahan Redundansi & Keunikan Sinyal (Signal Uniqueness Constraints)

Basis data wajib mencegah timbulnya rekaman sinyal aktif duplikat (*duplicate active signals*) untuk pola deviasi kebiasaan yang sama pada rentang waktu yang berdekatan.

```sql
-- Penegakan Indeks Unik Bersyarat untuk Sinyal Aktif
CREATE UNIQUE INDEX uq_active_user_signal_type 
    ON behavior_signals (user_id, signal_type) 
    WHERE status = 'active';
```

Dengan indeks unik parsial ini, pekerjaan latar belakang (*background cron job*) yang berjalan setiap jam tidak akan membanjiri basis data dan antarmuka pengguna dengan puluhan entri sinyal `low_hydration_streak` yang berulang.

---

## 29. Skema Tabel Wawasan Kesehatan Preventif (Health Insights Schema)

Tabel `health_insights` menampung saran edukatif kontekstual yang dihasilkan untuk merespons sinyal perilaku tertentu:

```sql
CREATE TABLE health_insights (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    behavior_signal_id BIGINT,
    title VARCHAR(150) NOT NULL,
    summary TEXT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    recommended_action TEXT NOT NULL,
    evidence_text TEXT NOT NULL,
    safety_boundary_note TEXT NOT NULL,
    generator_type VARCHAR(30) NOT NULL DEFAULT 'rule_engine',
    version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hi_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_hi_signal FOREIGN KEY (behavior_signal_id) REFERENCES behavior_signals(id) ON DELETE SET NULL
);
```

Kunci asing `behavior_signal_id` menjamin bahwa setiap wawasan yang dibaca pengguna dapat ditelusuri kembali ke sinyal dan data mentah biometrik yang mendasarinya (*Explainability Trace*).

---

## 30. Pengelolaan Versi & Kedaluwarsa Wawasan (Insight Versioning & Expiration)

Wawasan kesehatan preventif memiliki batas masa berlaku (*time-to-live*) dan aturan kedaluwarsa:

* **Pencatatan Versi Generator:** Menyimpan apakah wawasan dihasilkan oleh `rule_engine_v1`, `rule_engine_v2`, atau modul kurasi klinis terverifikasi.
* **Masa Kedaluwarsa Otomatis (`expires_at`):** Wawasan mengenai penurunan tidur pekan lalu tidak relevan lagi ditampilkan sebagai kartu utama setelah 14 hari berlalu.
* **Kekekalan Riwayat Pengguna:** Wawasan lama yang telah dibaca pengguna diubah statusnya menjadi `archived`, bukan dihapus secara permanen dari basis data, demi menjaga kontinuitas rekam jejak bimbingan gaya hidup.

---

## 31. Skema Tabel Rencana Intervensi Perilaku (Intervention Plans Schema)

Tabel `intervention_plans` menampung program intervensi perubahan gaya hidup terstruktur yang dipilih oleh pengguna atau disepakati bersama instruktur:

```sql
CREATE TABLE intervention_plans (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    health_insight_id BIGINT,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'hydration', 'sleep', 'nutrition', 'activity'
    target_metric VARCHAR(50) NOT NULL,
    target_value NUMERIC(10,2) NOT NULL,
    target_unit VARCHAR(20) NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 7,
    status VARCHAR(30) NOT NULL DEFAULT 'active', -- 'active', 'paused', 'completed', 'abandoned'
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    target_end_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ip_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_ip_insight FOREIGN KEY (health_insight_id) REFERENCES health_insights(id) ON DELETE SET NULL,
    CONSTRAINT chk_intervention_duration CHECK (duration_days >= 3 AND duration_days <= 90)
);
```

Struktur ini memastikan intervensi memiliki target kuantitatif yang jelas, durasi terukur, serta keterikatan dengan wawasan kesehatan asal.

---

## 32. Pelacakan Kemajuan Intervensi Terstruktur (Intervention Progress Tracking)

Kemajuan harian dari rencana intervensi dipisahkan ke dalam tabel catatan kemajuan (*progress logs*) tersendiri:

```sql
CREATE TABLE intervention_progress (
    id BIGSERIAL PRIMARY KEY,
    intervention_plan_id BIGINT NOT NULL,
    log_date DATE NOT NULL,
    achieved_value NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    target_value NUMERIC(10,2) NOT NULL,
    is_target_met BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prog_plan FOREIGN KEY (intervention_plan_id) REFERENCES intervention_plans(id) ON DELETE CASCADE,
    CONSTRAINT uq_plan_log_date UNIQUE (intervention_plan_id, log_date)
);
```

Pemisahan ini memungkinkan antarmuka menampilkan grafik persentase kepatuhan (*compliance rate*) dan riwayat kalender kemajuan secara cepat dan efisien.

---

## 33. Skema Tabel Master Tantangan Kebiasaan (Habit Challenge Master Schema)

Tabel master tantangan (`challenges`) menyimpan definisi program kebiasaan sehat publik yang dapat diikuti oleh seluruh anggota platform:

```sql
CREATE TABLE challenges (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
    duration_days INTEGER NOT NULL DEFAULT 7,
    points_reward INTEGER NOT NULL DEFAULT 50,
    badge_reward_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_challenge_points CHECK (points_reward >= 0)
);
```

Definisi tantangan bersifat statis dan terpisah dari data keikutsertaan masing-masing pengguna.

---

## 34. Skema Partisipasi & Kemajuan Tantangan (Challenge Progress & Logs)

Partisipasi pengguna dalam tantangan dicatat dalam tabel perantara `user_challenges`:

```sql
CREATE TABLE user_challenges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    challenge_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'enrolled', -- 'enrolled', 'in_progress', 'completed', 'dropped'
    current_day INTEGER NOT NULL DEFAULT 1,
    progress_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_uc_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_uc_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE RESTRICT,
    CONSTRAINT chk_user_challenge_progress CHECK (progress_percentage >= 0.00 AND progress_percentage <= 100.00)
);

CREATE INDEX idx_user_challenges_active ON user_challenges (user_id, status);
```

---

## 35. Integritas Penyelesaian & Verifikasi Tantangan (Challenge Completion Integrity)

Pemberian hadiah poin dan lencana atas penyelesaian tantangan wajib dilindungi oleh transaksi atomik dan kendala keunikan (*idempotency constraints*).

```sql
-- Penegakan Indeks Unik Mencegah Klaim Hadiah Ganda untuk Tantangan yang Sama
CREATE UNIQUE INDEX uq_user_challenge_completed 
    ON user_challenges (user_id, challenge_id) 
    WHERE status = 'completed';
```

Ketika pengguna menyelesaikan tantangan, eksekusi penyelesaian, penambahan saldo poin keanggotaan, dan penerbitan lencana wajib dibungkus dalam blok transaksi ACID:

```php
// Contoh Transaksi Idempoten di Layer Repository Laravel
DB::transaction(function () use ($userChallenge) {
    $userChallenge->lockForUpdate();
    if ($userChallenge->status === 'completed') {
        return; // Mencegah eksekusi ganda (Idempotent Guard)
    }
    $userChallenge->update(['status' => 'completed', 'completed_at' => now()]);
    $userChallenge->user->increment('gamification_points', $userChallenge->challenge->points_reward);
    AwardBadgeJob::dispatch($userChallenge->user_id, $userChallenge->challenge->badge_reward_id);
});
```

---

## 36. Skema Inti Reservasi Sesi Konsultasi (Consultation Booking Model)

Entitas reservasi konsultasi memodelkan interaksi terjadwal antara instruktur dan anggota secara terstruktur, melarang penyimpanan data gabungan dalam satu kolom teks raksasa:

```sql
CREATE TABLE consultations (
    id BIGSERIAL PRIMARY KEY,
    booking_code VARCHAR(30) NOT NULL UNIQUE,
    instructor_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    service_type VARCHAR(50) NOT NULL, -- 'lifestyle_coaching', 'nutrition_review', 'habit_planning'
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    status VARCHAR(30) NOT NULL DEFAULT 'confirmed',
    cancellation_reason TEXT,
    cancelled_by BIGINT,
    meeting_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_c_inst FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_c_mem FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_c_canceller FOREIGN KEY (cancelled_by) REFERENCES users(id) ON DELETE SET NULL
);
```

---

## 37. Skema Pesan Obrolan Sesi Konsultasi (Consultation Messages Schema)

Pesan komunikasi dan lampiran dalam sesi konsultasi dipisahkan secara relasional dari metadata jadwal:

```sql
CREATE TABLE consultation_messages (
    id BIGSERIAL PRIMARY KEY,
    consultation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    message_text TEXT NOT NULL,
    attachment_url TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cm_consultation FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
    CONSTRAINT fk_cm_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE RESTRICT
);

CREATE INDEX idx_consultation_messages_ordering 
    ON consultation_messages (consultation_id, created_at ASC);
```

Pemisahan ini mendukung paginasi obrolan cepat (*cursor-based pagination*), audit waktu baca pesan, serta enkripsi muatan pesan sensitif.

---

## 38. Mesin Status Siklus Hidup Konsultasi (Consultation Status State Machine)

Status siklus hidup reservasi konsultasi dikendalikan oleh mesin status terikat:

```sql
ALTER TABLE consultations ADD CONSTRAINT chk_consultation_status 
CHECK (status IN (
    'pending_payment', -- Menunggu konfirmasi pembayaran/token
    'confirmed',       -- Jadwal terkonfirmasi dan slot terkunci
    'in_progress',     -- Sesi sedang berlangsung
    'completed',       -- Sesi selesai dan siap dievaluasi
    'cancelled',       -- Dibatalkan oleh anggota atau instruktur
    'no_show'          -- Anggota atau instruktur tidak hadir pada jadwal
));
```

Dilarang keras menyisipkan string status bebas yang tidak terdaftar dalam kontrak mesin status.

---

## 39. Pencegahan Reservasi Ganda Jadwal Instruktur (Prevent Double Booking Constraints)

Arsitektur basis data wajib mencegah terjadinya tabrakan reservasi ganda (*double booking*) pada slot waktu instruktur yang sama:

> [!CAUTION]
> **Pencegahan Double-Booking Tanpa Toleransi:**
> Logika "periksa ketersediaan lalu sisipkan baris" (*check-then-insert*) sangat rentan terhadap kondisi balapan (*race condition*) ketika dua anggota memesan slot yang sama pada milidetik yang identik. Sistem wajib menggunakan transaksi basis data dengan penguncian pesimis (*pessimistic lock*) atau tabel slot jadwal khusus.

```sql
-- Pola Penguncian Baris Pesimis pada Layer Aplikasi Laravel
DB::transaction(function () use ($instructorId, $startTime, $endTime, $memberId) {
    // Kunci seluruh jadwal aktif instruktur pada rentang waktu terkait
    $collision = DB::table('consultations')
        ->where('instructor_id', $instructorId)
        ->whereIn('status', ['confirmed', 'in_progress'])
        ->where(function ($query) use ($startTime, $endTime) {
            $query->whereBetween('scheduled_start', [$startTime, $endTime])
                  ->orWhereBetween('scheduled_end', [$startTime, $endTime]);
        })
        ->lockForUpdate()
        ->exists();

    if ($collision) {
        throw new SlotAlreadyBookedException("Slot jadwal instruktur telah terisi oleh pemesanan lain.");
    }

    // Sisipkan reservasi baru secara aman
    Consultation::create([...]);
});
```

---

## 40. Skema Tabel Antrean & Riwayat Notifikasi (Notification Queue & History Schema)

Tabel antrean dan riwayat notifikasi (`notifications`) dipisahkan dari tabel entitas pemicu guna memfasilitasi pelacakan status pengiriman (*delivery state*), status keterbacaan (*read state*), serta percobaan ulang (*retries*):

```sql
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    notification_type VARCHAR(50) NOT NULL, -- 'reminder', 'insight', 'consultation', 'system'
    channel VARCHAR(30) NOT NULL DEFAULT 'in_app', -- 'in_app', 'push', 'email'
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_user_unread 
    ON notifications (user_id, is_read, created_at DESC);
```

---

## 41. Perlindungan Privasi Muatan Pesan Notifikasi (Notification Payload Privacy)

Muatan pesan notifikasi (*notification payload*) wajib menerapkan prinsip minimisasi data (*data minimization*):

* Dilarang menyalin rekam medis lengkap, diagnosis penyakit, hasil scan makanan sensitif, atau riwayat resep obat ke dalam teks notifikasi push.
* Notifikasi push publik hanya memuat pesan abstrak yang aman dari pandangan orang lain di layar ponsel (*shoulder surfing protection*).

```markdown
Contoh Kebijakan Redaksi Notifikasi:

❌ Berbahaya & Melanggar Privasi (Data Bocor di Notifikasi Lockscreen):
"Perhatian! Gula darah puasa Anda tercatat 185 mg/dL. Risiko komplikasi diabetes Anda meningkat!"

✅ Aman & Menjaga Privasi:
"AEVYRA: Catatan wawasan gaya hidup baru tersedia. Buka aplikasi untuk meninjau pola kebiasaan Anda."
```

---

## 42. Skema Tabel Master Lencana & Prestasi (Badge & Achievement Schema)

Ekosistem gamifikasi memisahkan definisi master lencana (`badges`) dari data penghargaan lencana masing-masing pengguna (`user_badges`):

```sql
CREATE TABLE badges (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_asset_url TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'consistency', 'hydration', 'activity', 'sleep'
    tier VARCHAR(20) NOT NULL DEFAULT 'bronze', -- 'bronze', 'silver', 'gold', 'platinum'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_badges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL,
    awarded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    award_reason VARCHAR(150) NOT NULL,
    CONSTRAINT fk_ub_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_ub_badge FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE RESTRICT,
    CONSTRAINT uq_user_badge UNIQUE (user_id, badge_id)
);
```

---

## 43. Skema Tabel Tingkat Keanggotaan (Membership Tier Schema)

Tabel keanggotaan memisahkan paket langganan master (`membership_plans`) dari status langganan aktif pengguna (`user_subscriptions`):

```sql
CREATE TABLE membership_plans (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    price_idr NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    billing_period VARCHAR(20) NOT NULL DEFAULT 'monthly', -- 'monthly', 'annual'
    consultation_quota INTEGER NOT NULL DEFAULT 0,
    ai_vision_quota INTEGER NOT NULL DEFAULT 50,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_subscriptions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    payment_gateway_ref VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_us_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_us_plan FOREIGN KEY (plan_id) REFERENCES membership_plans(id) ON DELETE RESTRICT
);
```

---

## 44. Pengelolaan Status Berlangganan Keanggotaan (Membership Subscription Status)

Status langganan pengguna dikendalikan melalui mesin status yang disinkronkan secara deterministik dengan *webhook* penyedia gerbang pembayaran (*payment gateway*):

```sql
ALTER TABLE user_subscriptions ADD CONSTRAINT chk_subscription_status 
CHECK (status IN (
    'trialing',   -- Masa percobaan gratis
    'active',     -- Berlangganan aktif dan hak akses penuh
    'past_due',   -- Pembayaran berkala gagal, masa tenggang (grace period)
    'paused',     -- Langganan dijeda sementara atas permintaan pengguna
    'cancelled',  -- Dibatalkan pengguna, aktif hingga akhir siklus penagihan
    'expired'     -- Masa berlaku habis, hak akses diturunkan ke paket dasar
));
```

Dilarang memperbarui status langganan hanya berdasarkan respons sisi klien (*client-side redirect*) tanpa verifikasi tanda tangan kriptografi *webhook* server-ke-server.

---

## 45. Skema Tabel Log Audit Akses & Perubahan (Audit Trail & Logging Schema)

Tabel `audit_logs` merekam seluruh aktivitas penting terkait keamanan akun, perubahan data biometrik, otorisasi peran, dan akses data sensitif oleh instruktur atau administrator:

```sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_id BIGINT, -- ID pengguna yang melakukan aksi (NULL jika sistem otomatis)
    actor_role VARCHAR(30) NOT NULL,
    action VARCHAR(100) NOT NULL, -- 'auth.login', 'health_profile.update', 'consultation.create'
    resource_type VARCHAR(50) NOT NULL, -- 'user', 'health_profile', 'consultation'
    resource_id BIGINT,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    payload_diff JSONB, -- Selisih perubahan (sebelum vs sesudah) tanpa data rahasia
    status VARCHAR(20) NOT NULL DEFAULT 'success', -- 'success', 'failed', 'blocked'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_actor ON audit_logs (actor_id, created_at DESC);
CREATE INDEX idx_audit_resource ON audit_logs (resource_type, resource_id);
```

Log audit bersifat kekal (*append-only / immutable*) dan dilarang menyediakan fungsi edit atau hapus bagi pengguna biasa.

---

## 46. Klasifikasi & Perlindungan Data Sensitif (Sensitive Health Data Classification)

Sistem mengklasifikasikan seluruh entitas yang memuat data biologis, psikologis, dan privasi sebagai **Data Sensitif Spesifik** yang tunduk pada pengawasan ketat UU PDP No. 27/2022:

* Parameter profil kesehatan (tinggi, berat, tanggal lahir, jenis kelamin).
* Catatan riwayat alergi dan obat-obatan yang dikonsumsi secara sukarela.
* Seluruh baris metrik kesehatan fisik dan catatan suasana hati (*mood score*).
* Foto makanan dan riwayat pemindaian nutrisi.
* Sinyal deviasi perilaku dan wawasan rekomendasi kebiasaan.
* Transkrip obrolan sesi konsultasi dan catatan pembinaan instruktur.
* Kontak darurat (*In Case of Emergency - ICE*).

Akses terhadap tabel-tabel ini dibatasi dengan prinsip hak akses terendah (*Least Privilege*).

---

## 47. Enkripsi Tingkat Kolom pada Kondisi Diam (Column-Level Encryption at Rest)

Kolom yang memuat data kesehatan bernilai privasi sangat tinggi (seperti catatan alergi kritis, kontak darurat ICE, dan catatan pribadi konsultasi) dilindungi dengan **Enkripsi Tingkat Kolom pada Kondisi Diam (*Column-Level Encryption at Rest*)** menggunakan algoritma **AES-256-GCM**:

* Enkripsi dilakukan di lapisan aplikasi melalui *Eloquent Encrypted Casts* (`'emergency_contact' => 'encrypted'`).
* Kunci enkripsi dikelola secara terpusat melalui variabel lingkungan atau *Key Management Service* (KMS) eksternal, bukan disimpan di dalam basis data.
* Kolom yang dienkripsi tidak dapat diindeks secara langsung dengan kueri perbandingan biasa (`LIKE` atau `>`). Jika diperlukan pencarian cepat, gunakan teknik *blind indexing* berbasis HMAC hashing satu arah.

---

## 48. Keamanan Penyimpanan Kredensial Kata Sandi (Argon2id Password Storage)

Kata sandi pengguna wajib disimpan dalam bentuk hash kriptografi satu arah yang tahan terhadap serangan komputasi tinggi (*brute-force* dan *rainbow table*):

* **Algoritma Wajib:** **Argon2id** (Bawaan direkomendasikan) atau **Bcrypt** dengan faktor biaya (*work factor / cost*) minimal 12.
* Dilarang keras menggunakan algoritma usang seperti MD5, SHA-1, SHA-256 polos, atau fungsi hash tanpa *salt* kriptografi dinamis.
* Dilarang membuat algoritma penyimpanan kata sandi rakitan sendiri (*no roll-your-own crypto*).

---

## 49. Larangan Penyimpanan Kunci Rahasia di Basis Data (Secret & API Key Storage)

Kunci rahasia infrastruktur sistem dilarang keras disimpan di dalam tabel bisnis biasa:

> [!CAUTION]
> **Larangan Penyimpanan Kunci Rahasia:**
> Dilarang menyimpan:
> 1. Kunci API penyedia AI Cloud (misalnya token Gemini / OpenAI).
> 2. Kredensial koneksi basis data (*database root password*).
> 3. Kunci privat sertifikat SSL / webhook secret payment gateway.
> di dalam baris tabel `settings` atau tabel bisnis yang dapat diakses oleh kueri aplikasi umum. Kunci rahasia wajib disimpan pada berkas `.env` server atau *secret manager* terenkripsi khusus.

---

## 50. Prinsip Strategi Pengindeksan Berbasis Kueri (Query-Driven Indexing Principles)

Setiap indeks dalam basis data wajib dibuat berdasarkan pola kueri aktual (*query-driven indexing*), bukan berdasarkan dugaan spekulatif semata.

### Kandidat Indeks Utama Ekosistem AEVYRA

```sql
-- Indeks Relasional Pengguna & Waktu (Kueri Deret Waktu Utama)
CREATE INDEX idx_health_metrics_user_time ON health_metrics (user_id, recorded_at DESC);

-- Indeks Kueri Sinyal Aktif Berdasarkan Tipe
CREATE INDEX idx_signals_user_active ON behavior_signals (user_id, signal_type) WHERE status = 'active';

-- Indeks Jadwal Konsultasi Instruktur
CREATE INDEX idx_consultations_inst_sched ON consultations (instructor_id, scheduled_start);

-- Indeks Notifikasi Belum Terbaca
CREATE INDEX idx_notif_unread ON notifications (user_id, is_read) WHERE is_read = FALSE;
```

Dilarang membuat puluhan indeks tanpa justifikasi kueri, karena setiap indeks membebani operasi penulisan (*INSERT/UPDATE*).

---

## 51. Pengindeksan Komposit untuk Penyaringan Jamak (Composite Index Optimization)

Gunakan indeks komposit (*Composite Indexes*) ketika kueri sering melakukan penyaringan (`WHERE`) dan pengurutan (`ORDER BY`) pada beberapa kolom secara simultan:

* **Urutan Kolom Indeks (*Column Ordering Rule*):** Tempatkan kolom dengan selektivitas kesetaraan tertinggi (*equality columns*, misal `user_id`) di urutan pertama, diikuti kolom rentang atau pengurutan (*range/sorting columns*, misal `recorded_at DESC`).
* Verifikasi efektivitas indeks komposit secara berkala menggunakan perintah analisis kueri `EXPLAIN ANALYZE` untuk memastikan perencana kueri (*query planner*) melakukan *Index Scan*, bukan *Seq Scan*.

---

## 52. Neraca Keseimbangan Beban Tulis vs Baca Indeks (Index Write-Read Trade-Off)

Penambahan indeks merupakan pertukaran teknis (*trade-off*) antara performa baca (*read speed*) dan biaya tulis (*write overhead*):

| Aspek Operasional | Dampak Penambahan Indeks |
| :--- | :--- |
| **Kecepatan Baca (`SELECT`)** | Sangat meningkat (dari pemindaian seluruh tabel menjadi pencarian pohon B-Tree). |
| **Kecepatan Tulis (`INSERT/UPDATE/DELETE`)** | Menurun secara bertahap karena mesin wajib memperbarui struktur pohon indeks pada setiap transaksi tulis. |
| **Konsumsi Ruang Penyimpanan** | Meningkat signifikan (indeks tabel bervolume jutaan baris dapat memakan ruang setara data aslinya). |
| **Waktu Migrasi Produksi** | Membutuhkan waktu penguncian tabel (*table lock*) jika tidak dibuat dengan klausa `CONCURRENTLY`. |

Oleh karena itu, setiap penambahan indeks pada tabel bervolume tinggi wajib dievaluasi dampaknya terhadap laju penulisan log metrik harian.

---

## 53. Penegakan Kendala Keunikan Data (Unique Constraints Enforcement)

Kendala keunikan (*Unique Constraints*) wajib didefinisikan pada lapisan basis data untuk menjamin integritas entitas unik:

* `users.email` : Wajib unik di seluruh basis data akun.
* `user_challenges(user_id, challenge_id, status = 'enrolled')` : Mencegah pendaftaran ganda pada tantangan aktif yang sama.
* `consultations.booking_code` : Kode unik pemesanan sesi konsultasi.
* `badges.code` & `challenges.code` : Kode pengenal unik fitur gamifikasi.

Dilarang hanya mengandalkan aturan validasi formulir frontend atau aturan `unique` Laravel tanpa indeks unik fisik di mesin basis data.

---

## 54. Penegakan Aturan Batasan Bisnis di Skema (Schema-Level Business Constraints)

Aturan invarian bisnis yang mendasar (*business invariants*) wajib ditegakkan langsung di dalam skema tabel:

1. Nilai kemajuan tidak boleh bernilai negatif (`progress >= 0`).
2. Durasi konsultasi harus berada dalam rentang rasional (`duration_minutes BETWEEN 15 AND 180`).
3. Waktu selesai sesi konsultasi harus lebih besar dari waktu mulai (`scheduled_end > scheduled_start`).
4. Kuota sesi konsultasi tidak boleh bernilai minus (`consultation_quota >= 0`).

Penegakan pada lapisan skema memberikan pertahanan berlapis (*Defense-in-Depth*) terhadap galat logika pada kode aplikasi.

---

## 55. Validasi Validitas Masukan Kolom (Database Check Constraints)

Gunakan batasan periksa (*Check Constraints*) mesin basis data PostgreSQL/MySQL untuk memvalidasi batas validitas data:

```sql
-- Contoh Penegakan Check Constraints Invarian Bisnis
ALTER TABLE health_profiles ADD CONSTRAINT chk_hp_height 
    CHECK (height_cm IS NULL OR (height_cm >= 50.00 AND height_cm <= 250.00));

ALTER TABLE health_profiles ADD CONSTRAINT chk_hp_weight 
    CHECK (weight_kg IS NULL OR (weight_kg >= 20.00 AND weight_kg <= 300.00));

ALTER TABLE health_metrics ADD CONSTRAINT chk_hm_positive_value 
    CHECK (value >= 0.00);
```

Batasan ini menyaring kesalahan masukan ekstrem akibat salah ketik sebelum data tersimpan ke basis data.

---

## 56. Tata Kelola & Kaidah Migrasi Skema (Database Migration Rules)

Setiap perubahan struktural pada basis data wajib direpresentasikan melalui berkas migrasi resmi (*Laravel Database Migrations*).

> [!IMPORTANT]
> **Larangan Perubahan Skema Manual:**
> Dilarang keras memodifikasi struktur tabel, menambah kolom, atau menghapus indeks secara langsung pada server pementasan atau produksi menggunakan antarmuka grafis (seperti DBeaver atau phpMyAdmin) tanpa melalui berkas migrasi yang tercatat di repositori Git. Perubahan manual merusak reproduktibilitas lingkungan dan menggagalkan otomatisasi deployment.

---

## 57. Standardisasi Konvensi Penamaan Berkas Migrasi (Migration Naming Conventions)

Penamaan berkas migrasi wajib mendeskripsikan perubahan struktural secara jelas sesuai konvensi standar Laravel:

* ✅ **Tepat & Deskriptif:**
  * `2026_09_17_000001_create_health_profiles_table.php`
  * `2026_09_17_000002_add_quality_status_to_health_metrics_table.php`
  * `2026_09_17_000003_create_behavior_signals_table.php`
* ❌ **Buruk & Tidak Deskriptif:**
  * `2026_09_17_000001_update_table.php`
  * `2026_09_17_000002_fix_db.php`
  * `2026_09_17_000003_changes.php`

Nama yang deskriptif mempermudah peninjauan kode (*code review*) dan penelusuran riwayat migrasi.

---

## 58. Praktik Migrasi Skema yang Aman & Reversibel (Safe & Reversible Migrations)

Sebelum mengajukan perubahan migrasi skema ke repositori utama, perekayasa perangkat lunak wajib menerapkan protokol keselamatan migrasi:

1. Memeriksa riwayat urutan migrasi aktif untuk mencegah tabrakan *timestamp*.
2. Meninjau relasi model Eloquent terkait untuk memastikan kompatibilitas kode.
3. Menguji eksekusi migrasi maju (`php artisan migrate`) dan migrasi mundur (`php artisan migrate:rollback`) pada basis data lokal.
4. Mengevaluasi ketersediaan data pada baris yang sudah ada (*existing data compatibility*).
5. Memastikan penambahan kolom baru menyertakan nilai bawaan (*default value*) atau bersifat *nullable* agar tidak menggagalkan baris data lama.

---

## 59. Pencegahan & Prosedur Migrasi Destruktif (Destructive Migration Guardrails)

Migrasi yang bersifat destruktif—seperti menghapus tabel (`dropTable`), menghapus kolom (`dropColumn`), atau mengubah tipe data yang memotong nilai (*truncating type conversion*)—diklasifikasikan sebagai tindakan berrisiko tinggi (*High-Risk Operation*):

* Wajib melalui persetujuan Arsitek Sistem dan Tim Keamanan.
* Wajib didahului dengan pembuatan salinan cadangan (*backup*) data tabel terkait sebelum eksekusi.
* Dilarang menghapus kolom yang masih dibaca oleh versi aplikasi frontend aktif di produksi.
* Wajib menyediakan skrip migrasi data bertahap (*multi-phase migration strategy*) untuk mencegah kehilangan riwayat kesehatan pengguna.

---

## 60. Prosedur Penggantian Nama Kolom Tanpa Downtime (Safe Column Rename Procedures)

Prosedur penggantian nama kolom (*Column Renaming*) pada lingkungan produksi bervolume tinggi wajib mematuhi pola perluas-dan-susutkan (*Expand and Contract Pattern*) demi mewujudkan *Zero-Downtime Deployment*:

```text
+-------------------------------------------------------------------------+
|             POLA GANTI NAMA KOLOM TANPA WAKTU HENTI (ZERO DOWNTIME)     |
+-------------------------------------------------------------------------+
|  FASE 1 (EXPAND)  : Buat kolom baru, replikasi data dari kolom lama,    |
|                     aplikasi menulis ke KEDUA kolom secara bersamaan.   |
|                                    ↓                                    |
|  FASE 2 (MIGRATE) : Migrasikan seluruh kode aplikasi untuk membaca &    |
|                     menulis HANYA ke kolom baru. Deploy aplikasi baru.   |
|                                    ↓                                    |
|  FASE 3 (CONTRACT): Hapus kolom lama setelah seluruh instans aplikasi    |
|                     versi lama berhenti beroperasi sepenuhnya.          |
+-------------------------------------------------------------------------+
```

Dilarang keras mengganti nama kolom secara langsung dalam satu migrasi tunggal saat aplikasi sedang melayani lalu lintas aktif pengguna.

---

## 61. Kebijakan Penetapan Nilai Baku Kolom (Explicit Default Values Policy)

Penetapan nilai bawaan (*Default Values*) pada skema tabel wajib dilakukan secara eksplisit dan rasional:

```sql
-- Contoh Penerapan Nilai Default Eksplisit
ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE health_metrics ADD COLUMN quality_status VARCHAR(30) NOT NULL DEFAULT 'valid';
ALTER TABLE consultations ADD COLUMN duration_minutes INTEGER NOT NULL DEFAULT 30;
```

> [!CAUTION]
> **Larangan Nilai Default Sembrono:**
> Dilarang memberikan nilai default implisit pada kolom biometrik klinis. Misalnya, menetapkan `DEFAULT 0.00` pada kolom `blood_glucose` atau `weight_kg`. Jika pengguna belum memasukkan nilai berat badan, kolom tersebut wajib bernilai `NULL`, bukan `0.00 kg`.

---

## 62. Disiplin Nullability & Larangan Asumsi Nilai Kosong (Explicit Column Nullability)

Perancangan skema wajib menerapkan disiplin kebolehan nilai kosong (*nullability discipline*):

* **Kaidah Ketat `NOT NULL`:** Seluruh kolom yang secara logis wajib ada (seperti kunci asing `user_id`, waktu pencatatan `recorded_at`, jenis metrik `metric_type`, dan status `status`) wajib dideklarasikan `NOT NULL`.
* **Penggunaan Terbatas `NULL`:** Nilai `NULL` dicadangkan eksklusif untuk data yang secara alamiah opsional (misalnya `completed_at` pada tantangan yang sedang berjalan, atau `notes` pada reservasi konsultasi).
* Dilarang mengasumsikan nilai string kosong (`""`) sebagai pengganti `NULL`.

---

## 63. Mandat Pelacakan Waktu Penciptaan & Pembaruan (Mandatory Creation & Update Timestamps)

Seluruh tabel entitas bisnis dalam AEVYRA wajib menyertakan kolom pelacak waktu standar:

```sql
created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
```

* Nilai `created_at` mencatat saat rekaman pertama kali disisipkan dan tidak boleh diubah setelahnya.
* Nilai `updated_at` diperbarui secara otomatis setiap kali terjadi modifikasi data melalui mekanisme ORM atau trigger basis data.
* Ketiadaan penanda waktu pada tabel bisnis merupakan pelanggaran standar auditabilitas.

---

## 64. Pemisahan Catatan Historis dari Status Aktif (Historical Records Architecture)

Sistem AEVYRA memisahkan secara tegas antara status operasional aktif (*current state*) dan rekaman peristiwa historis (*historical event records*):

* Entitas yang mencatat kejadian (seperti pengukuran glukosa, pencatatan tidur, log asupan makanan, pesan sesi konsultasi, dan sinyal perilaku) diperlakukan sebagai **Catatan Historis Append-Only**.
* Setiap observasi baru dicatat sebagai baris baru (*new row insert*), bukan dengan menimpa nilai baris sebelumnya.

---

## 65. Pola Pencatatan Riwayat Metrik Append-Only (Append-Oriented Metric Logging)

Data linimasa kesehatan pengguna wajib dikelola dengan pola penambahan baris murni (*append-oriented logging*):

```text
+-------------------------------------------------------------------------+
|                  POLA PENCATATAN LINIMASA APPEND-ONLY                   |
+-------------------------------------------------------------------------+
|  [HARI 1 - INSERT] : user_id=1, type='hydration', val=2.1L, date=15-Sep |
|  [HARI 2 - INSERT] : user_id=1, type='hydration', val=1.8L, date=16-Sep |
|  [HARI 3 - INSERT] : user_id=1, type='hydration', val=2.5L, date=17-Sep |
+-------------------------------------------------------------------------+
|  ❌ POLA ANTI-PATTERN YANG DILARANG:                                    |
|  Menimpa satu kolom tunggal: UPDATE user SET history = '{day1,day2}'    |
+-------------------------------------------------------------------------+
```

Menyimpan riwayat kebiasaan sebagai array di dalam satu baris tunggal merusak kemampuan indeks deret waktu, memperlambat kueri analitik, dan memicu risiko tabrakan penulisan (*write contention*).

---

## 66. Pemisahan Keadaan Terkini vs Rekam Jejak Historis (Current State vs Audit History)

Pemisahan tanggung jawab antara tabel status saat ini (*current state*) dan tabel riwayat analitis (*history log*):

| Tabel | Representasi Data | Pola Modifikasi Khas |
| :--- | :--- | :--- |
| **`health_profiles`** | Konteks biometrik aktif terkini (tinggi, berat terakhir, preferensi). | `UPDATE` berkala saat pengguna memperbarui profil. |
| **`health_metrics`** | Rekam jejak seluruh pengukuran historis berurutan kronologis. | `INSERT` murni (*Append-Only*), dilarang *UPDATE/DELETE* sembarangan. |
| **`behavior_signals`** | Sinyal deviasi perilaku yang terdeteksi pada jendela waktu tertentu. | `INSERT` saat terdeteksi, `UPDATE` hanya pada status siklus hidup. |

---

## 67. Wajib Asal-Usul Data pada Tiap Baris Biometrik (Mandatory Metric Provenance)

Setiap baris data kesehatan wajib menyertakan metadata asal-usul sumber (*mandatory provenance*):

* Nilai yang sah: `manual` (penginputan formulir), `scanner` (kamera pemindai nutrisi), `wearable` (sensor jam pintar), `instructor` (sesi pembinaan), atau `system` (agregasi otomatis).
* Tanpa data asal-usul, sistem tidak dapat membedakan apakah lonjakan kalori diinput secara sengaja oleh pengguna atau hasil estimasi visual model visi komputer.

---

## 68. Penandaan Status Validitas Mutu Data (Data Quality Status Flags)

Untuk data kesehatan yang diimpor dari perangkat luar atau hasil estimasi AI, sistem menyertakan kolom penanda status mutu data (`quality_status`):

```sql
ALTER TABLE health_metrics ADD CONSTRAINT chk_quality_status 
CHECK (quality_status IN (
    'valid',        -- Data terverifikasi atau diinput langsung oleh pengguna
    'unverified',   -- Data belum divalidasi silang
    'estimated',    -- Nilai aproksimasi hasil pemindaian kamera AI
    'questionable', -- Nilai ekstrem yang terindikasi salah input sensor
    'corrected'     -- Nilai hasil koreksi pengguna atas kesalahan baca alat
));
```

---

## 69. Skema Tabel Log Hasil Pemindaian Makanan (Food Scanner Logs Schema)

Fitur pemindai makanan kamera memisahkan percobaan pemindaian fisik (`scans`) dari rincian zat gizi hasil pengenalan citra (`scan_results`):

```sql
CREATE TABLE scans (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    image_storage_path TEXT NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    confidence_score NUMERIC(4,3) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'completed', -- 'processing', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_scans_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

CREATE TABLE scan_results (
    id BIGSERIAL PRIMARY KEY,
    scan_id BIGINT NOT NULL,
    food_name VARCHAR(150) NOT NULL,
    estimated_calories NUMERIC(7,2) NOT NULL,
    estimated_carbs_g NUMERIC(6,2),
    estimated_proteins_g NUMERIC(6,2),
    estimated_fats_g NUMERIC(6,2),
    detected_allergens JSONB DEFAULT '[]'::jsonb,
    is_user_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sr_scan FOREIGN KEY (scan_id) REFERENCES scans(id) ON DELETE CASCADE
);
```

Arsitektur ini memungkinkan sistem melacak tingkat kegagalan pembacaan OCR tanpa merusak catatan histori piring santapan pengguna.

---

## 70. Penyimpanan Metadata Perangkat Pihak Ketiga (External Provider Metadata Storage)

Tanggapan mentah dari penyedia pihak ketiga (misalnya respons utuh API pemindai eksternal atau Health Connect) hanya disimpan jika ada justifikasi audit yang jelas:

* Metadata mentah disimpan dalam kolom terisolasi (`external_raw_payload JSONB`).
* Wajib dibersihkan (*sanitized*) dari informasi kredensial atau token otorisasi pihak ketiga sebelum disimpan.
* Akses dibatasi secara ketat dan tidak diekspos langsung ke antarmuka klien.

---

## 71. Skema Penyimpanan Sesi Percakapan Asisten AI (AI Conversation Logs Schema)

Jika percakapan obrolan asisten AI disimpan ke basis data, skema wajib membatasi informasi yang dicatat pada kebutuhan riwayat pendampingan:

```sql
CREATE TABLE ai_conversations (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    conversation_uuid UUID NOT NULL UNIQUE,
    title VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ac_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE ai_messages (
    id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    tokens_consumed INTEGER,
    safety_ratings JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_am_conversation FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
);
```

Dilarang menyimpan prompt tersembunyi (*hidden system instructions*) secara berlebihan jika tidak diperlukan untuk audit keamanan.

---

## 72. Batasan Konteks Ephemeral Interaksi AI (Ephemeral AI Context Storage)

Sistem dilarang menyimpan seluruh *context window* AI yang berukuran besar ke dalam baris basis data transaksional setiap kali pengguna mengirimkan satu pesan obrolan:

* Konteks percakapan yang bersifat sementara (*ephemeral context*) dikelola dalam sesi memori Redis.
* Hanya pesan interaksi aktual yang dipersistensikan ke tabel `ai_messages`.
* Dilarang mencampurkan data biometrik pengguna lain ke dalam rekaman sesi percakapan.

---

## 73. Kebijakan Retensi & Pembersihan Data Berkala (Data Retention & Purging Policies)

Seluruh data kesehatan historis wajib memiliki kebijakan retensi dan pembersihan berkala (*Data Retention & Purging Policies*) yang terdokumentasi:

| Kategori Data | Masa Simpan Aktif | Tindakan Pasca-Retensi |
| :--- | :--- | :--- |
| **Metrik Kesehatan Harian** | 3 Tahun (*Online Storage*) | Diarsipkan ke penyimpanan analitik terkompresi. |
| **Foto Makanan Mentah** | 90 Hari | Dihapus dari penyimpanan objek; metadata gizi tetap disimpan. |
| **Notifikasi Sistem** | 180 Hari | Dihapus otomatis melalui *scheduled cleanup job*. |
| **Log Audit Keamanan** | 5 Tahun | Disimpan permanen untuk kepatuhan hukum forensik. |
| **Sesi Obrolan Asisten AI** | 1 Tahun | Dihapus otomatis kecuali disimpan khusus oleh pengguna. |

---

## 74. Kepatuhan Hak Hapus Data Pengguna (Data Deletion & Privacy Rights Compliance)

Pemenuhan hak penghapusan data pribadi (*Right to Erasure*) di bawah UU PDP No. 27/2022 wajib membedakan perlakuan tiga kelompok entitas:

1. **Rekaman Aktif (*Operational Data*):** Profil pengguna, token otentikasi, dan reservasi terjadwal dihapus atau dinonaktifkan seketika.
2. **Rekaman Historis Perilaku:** Dianonimkan (*anonymized*) dengan memutuskan kaitan `user_id` menjadi nilai hash anonim agar tidak dapat diidentifikasi kembali.
3. **Rekaman Log Audit:** Tetap disimpan sebagai bukti pemenuhan kewajiban hukum kepatuhan (*statutory audit trail*).

---

## 75. Kebijakan Penggunaan Penghapusan Lunak (Soft Delete Architectural Policy)

Penggunaan fitur penghapusan lunak (*Soft Deletes* melalui kolom `deleted_at`) diterapkan secara terukur:

* **Tujuan Soft Delete:** Mencegah kehilangan data tidak sengaja (*accidental deletion recovery*) dan mempertahankan integritas relasi historis.
* **Batas Pemahaman:** *Soft delete* **BUKAN** merupakan pemenuhan hak privasi hapus data! Menandai `deleted_at = NOW()` sementara data medis pengguna masih tersimpan jelas di basis data tidak memenuhi syarat penghapusan permanen UU PDP.
* Permintaan penghapusan permanen dari pengguna wajib mengeksekusi prosedur anonimisasi atau pembersihan fisik baris (*hard delete*) sesuai alur kepatuhan privasi resmi.

---

## 76. Prosedur Anonimisasi Data Pasca-Hapus Akun (Account Deletion Anonymization Protocol)

Ketika akun pengguna dihapus secara permanen, prosedur anonimisasi mengeksekusi langkah-langkah berikut:

```sql
-- Prosedur Anonimisasi Akun Terhapus
UPDATE users 
SET name = 'Anonim (Akun Terhapus)',
    email = CONCAT('anonymized_', id, '@deleted.aevyra.id'),
    password = 'DELETED_ACCOUNT_UNUSABLE_HASH',
    phone_number = NULL,
    emergency_contact = NULL,
    avatar_url = NULL,
    updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

UPDATE health_profiles 
SET height_cm = NULL,
    birth_date = NULL,
    allergies = '[]'::jsonb,
    declared_conditions = '[]'::jsonb
WHERE user_id = ?;
```

---

## 77. Penjaminan Data Benih Sintetis & Fiktif (Purely Synthetic Demo Seed Data)

Seluruh data awal (*seeder*) dan data demonstrasi kompetisi wajib bersifat rekaan murni (*purely synthetic data*):

> [!CAUTION]
> **Larangan Mutlak Penggunaan Data Pasien Riil:**
> Dilarang keras menyalin rekaman medis rumah sakit sungguhan, foto pasien nyata, nomor kontak pribadi kerabat, atau data resep obat asli ke dalam berkas *seeder* (`DatabaseSeeder.php`). Pelanggaran ini merupakan pelanggaran pidana privasi medis yang serius.

Seluruh entitas dalam demo wajib menggunakan identitas fiktif yang jelas (seperti *Budi Santoso*, *Dewi Lestari*).

---

## 78. Standar Pembuatan Data Pabrik Pengujian (Test Model Factory Standards)

Pabrik model pengujian (*Laravel Model Factories*) wajib menghasilkan data tiruan yang realistis secara biologis namun tetap fiktif:

```php
// Contoh Factory Metrik Kesehatan Realistis
class HealthMetricFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'metric_type' => 'sleep_duration',
            'value' => fake()->randomFloat(2, 5.0, 9.0), // Rentang tidur wajar: 5 hingga 9 jam
            'unit' => 'hours',
            'recorded_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'source' => 'manual',
            'quality_status' => 'valid',
        ];
    }
}
```

---

## 79. Isolasi Basis Data Pengujian Otomatis (Isolated Testing Database Architecture)

Seluruh pengujian otomatis (*Automated Test Suites*) wajib dieksekusi pada lingkungan basis data pengujian yang terisolasi total:

* Dilarang menjalankan skrip pengujian atau migrasi reset (`migrate:fresh`) pada basis data pengembangan bersama (*shared dev*) apalagi lingkungan produksi.
* Lingkungan pengujian menggunakan basis data terpisah (misalnya PostgreSQL *test database* khusus atau SQLite *in-memory* via konfigurasi `phpunit.xml`).

---

## 80. Larangan Data Pasien Asli dalam Lingkungan Uji (Test Data Privacy & Zero Real PII)

Berkas perlengkapan uji (*test fixtures*) dilarang memuat data informasi pribadi asli (*Zero Real PII*):

* Nama, nomor telepon, dan email wajib menggunakan generator acak (*Faker library*).
* Nilai biometrik rekaan disesuaikan dengan skenario pengujian kasus batas (*edge-case tests*).

---

## 81. Penggulungan Transaksi Otomatis Sesi Pengujian (Database Transactions in Tests)

Setiap metode pengujian (*test method*) wajib membungkus operasinya di dalam transaksi basis data terisolasi (*Database Transactions in Tests*):

* Menggunakan sifat (*trait*) `Illuminate\Foundation\Testing\RefreshDatabase` atau `DatabaseTransactions`.
* Seluruh baris yang dibuat selama eksekusi tes akan digulung balik (*rolled back*) seketika saat tes selesai, menjaga basis data pengujian selalu bersih dan bebas residu antar-pengujian.

---

## 82. Sasaran Kinerja & Skalabilitas Basis Data (Database Performance & Scaling Targets)

Basis data dirancang untuk menangani pertumbuhan volume data tinggi (*high-volume scaling targets*):

* Tabel bervolume tinggi (seperti `health_metrics`, `food_logs`, `audit_logs`, dan `notifications`) wajib dipantau penggunaan ruang indeksnya.
* Seluruh kueri wajib menggunakan paginasi terukur (maksimal 50 baris per halaman) dan menghindari klausa `OFFSET` besar dengan beralih ke paginasi berbasis kursor (*Keyset / Cursor Pagination*).

---

## 83. Pencegahan Masalah Kueri N+1 & Optimasi Indeks (N+1 Query Prevention & Performance)

Sistem dilarang keras menghasilkan anomali kueri N+1 (*N+1 Query Problem*) pada kueri relasional:

```php
// ❌ POLA BURUK (Memicu 101 Kueri Basis Data):
$consultations = Consultation::all();
foreach ($consultations as $c) {
    echo $c->member->name; // Mengeksekusi SELECT baru pada setiap iterasi!
}

// ✅ POLA TEPAT (Eager Loading, Hanya 2 Kueri):
$consultations = Consultation::with(['member', 'instructor'])->get();
```

Seluruh *controller* wajib menerapkan *eager loading* eksplisit untuk seluruh relasi yang akan dirender oleh antarmuka.

---

## 84. Pola Kueri Data Deret Waktu yang Efisien (Efficient Time-Series Query Patterns)

Mesin analitik perilaku (*Behavioral Health Engine*) wajib membatasi kueri pada jendela waktu berbatas (*bounded time-series windows*):

```sql
-- ✅ Kueri Deret Waktu Terbatas & Cepat Berbasis Indeks Komposit
SELECT recorded_at, value, unit 
FROM health_metrics 
WHERE user_id = 1042 
  AND metric_type = 'hydration' 
  AND recorded_at >= '2026-08-18 00:00:00+00' 
  AND recorded_at <= '2026-09-17 23:59:59+00'
ORDER BY recorded_at ASC;
```

Dilarang memuat seluruh riwayat data seumur hidup pengguna (*lifetime query*) ke memori aplikasi PHP hanya untuk menghitung rata-rata kebiasaan 7 hari terakhir.

---

## 85. Strategi Pra-Kalkulasi Agregasi Analitik (Pre-Calculated Summary & Aggregation)

Perhitungan agregasi skala besar (seperti rata-rata bulanan atau statistik kepatuhan keanggotaan) wajib dieksekusi melalui strategi yang efisien:

* Memanfaatkan fungsi agregasi bawaan basis data (`AVG()`, `SUM()`, `COUNT()`) secara langsung di level SQL.
* Menggunakan tabel ringkasan pra-kalkulasi (*pre-calculated aggregate tables*) untuk data dasbor yang dibaca ribuan pengguna.
* Dilarang menarik puluhan ribu baris data mentah ke array memori PHP untuk dihitung menggunakan fungsi `array_sum()` atau `collect()->avg()`.

---

## 86. Pemrosesan Data Latar Belakang Terjadwal (Scheduled Batch & Queue Processing)

Pemrosesan data latar belakang terjadwal (seperti kalkulasi garis acuan malam hari atau evaluasi kedaluwarsa tantangan) wajib:

1. Dijalankan melalui sistem antrean pekerja (*Laravel Queued Jobs / Scheduled Commands*).
2. Bersifat idempoten (*idempotent*): mengeksekusi ulang pekerjaan tidak boleh menggandakan data atau mengubah status yang sudah tuntas.
3. Memproses data dalam pecahan kecil (*chunking* atau *batching*) guna mencegah kehabisan memori server (*Out of Memory*).

---

## 87. Pencegahan & Penanganan Data Masukan Ganda (Duplicate Data Elimination)

Arsitektur basis data wajib mengantisipasi dan menangani risiko pengiriman data ganda (*duplicate submissions*):

* Menggunakan kunci idempotensi (*Idempotency Key*) pada permintaan transaksi kritis (seperti reservasi slot konsultasi dan klaim hadiah tantangan).
* Menegakkan indeks unik komposit pada entitas relasi tunggal.
* Menggunakan teknik *Upsert* (`INSERT ... ON CONFLICT DO UPDATE`) untuk operasi pencatatan log berkala.

---

## 88. Pengendalian Konkurensi & Penguncian Baris (Optimistic & Pessimistic Concurrency Control)

Pada alur transaksi yang rentan terhadap perebutan sumber daya bersama (seperti kuota slot konsultasi atau pengurangan poin keanggotaan), sistem wajib menerapkan kontrol konkurensi:

* **Penguncian Pesimis (*Pessimistic Locking*):** Menggunakan klausa `SELECT ... FOR UPDATE` dalam transaksi singkat saat memesan slot jadwal pembina.
* **Penguncian Optimis (*Optimistic Locking*):** Menggunakan kolom versi (`version INTEGER`) untuk mendeteksi perubahan bersamaan pada entitas profil.

---

## 89. Keamanan Akses Jaringan & Prinsip Hak Akses Terendah (Database Network Security & Least Privilege)

Keamanan akses basis data pada tingkat infrastruktur wajib mematuhi standar pertahanan ketat:

* **Prinsip Hak Akses Terendah (*Least Privilege*):** Akun pengguna aplikasi hanya memiliki izin `SELECT`, `INSERT`, `UPDATE`, dan `DELETE`. Izin administratif destruktif (`DROP`, `ALTER`, `TRUNCATE`) dilarang diberikan pada akun aplikasi harian.
* **Isolasi Jaringan:** Port basis data (5432 / 3306) dilarang dibuka langsung ke internet publik. Akses hanya diizinkan melalui jaringan privat virtual (*VPC / private subnet*).
* **Kredensial Terpisah:** Lingkungan pengujian, pementasan, dan produksi wajib menggunakan kredensial dan kata sandi yang sepenuhnya berbeda.

---

## 90. Kebijakan Pencadangan & Pemulihan Bencana (Automated Backup & Disaster Recovery)

Berkas salinan cadangan (*Database Backups*) memuat seluruh data kesehatan sensitif pengguna sehingga wajib dilindungi dengan standar keamanan setara:

* **Enkripsi Cadangan:** Seluruh berkas *dump* wajib dienkripsi saat transit dan saat istirahat (*Encrypted at Rest* dengan AES-256).
* **Penyimpanan Terisolasi:** Disimpan pada lokasi penyimpanan objek sekunder yang terpisah secara geografis dengan proteksi kekekalan (*Object Lock / Immutability*).
* **Uji Pemulihan Bencana Berkala:** Tim teknis wajib menguji prosedur pemulihan bencana (*Disaster Recovery Drill*) setiap kuartal untuk memastikan berkas cadangan dapat dipulihkan secara utuh dalam batas SLA yang ditentukan.

---

## 91. Pemisahan Tabel Pelaporan dari Tabel Transaksional (Reporting Tables vs OLTP)

Untuk menjaga performa transaksi aplikasi harian (*OLTP - Online Transaction Processing*), tabel pelaporan analitik berat (*Reporting Tables*) wajib dipisahkan secara logis atau fisik:

* Kueri dasbor manajemen eksekutif yang memerlukan agregasi jutaan baris dilarang dijalankan langsung pada tabel transaksional aktif di jam sibuk.
* Memanfaatkan tabel rekapitulasi terjadwal (*materialized aggregate tables*) atau replika baca (*Read Replicas*) terpisah untuk beban pelaporan analitik.

---

## 92. Pengelolaan Data Analitik Agregat Anonim (Aggregated Anonymous Analytics Data)

Data yang diproses untuk analisis tren populasi, evaluasi demografi, atau kebutuhan juri kompetisi wajib melalui prosedur agregasi dan pelepasan identitas (*De-identification*):

```sql
-- Contoh Kueri Agregat Analitik Bebas PII Pengguna
SELECT 
    hp.activity_level,
    COUNT(DISTINCT u.id) AS total_active_members,
    ROUND(AVG(hm.value), 2) AS avg_sleep_duration_hours
FROM users u
JOIN health_profiles hp ON u.id = hp.user_id
JOIN health_metrics hm ON u.id = hm.user_id
WHERE hm.metric_type = 'sleep_duration'
  AND hm.recorded_at >= NOW() - INTERVAL '30 days'
GROUP BY hp.activity_level;
```

Dilarang mengekspor data mentah yang mencantumkan nama, alamat email, atau koordinat lokasi individu ke dalam tabel analitik publik.

---

## 93. Tata Cara Eksekusi Migrasi saat Deployment (Migration Deployment Pipeline)

Eksekusi migrasi skema saat penerapan (*deployment*) wajib diotomatisasi melalui alur CI/CD terstandar:

1. Perintah migrasi dieksekusi sebelum instans aplikasi versi baru mulai menerima lalu lintas pengguna (`php artisan migrate --force`).
2. Proses migrasi dijalankan dalam transaksi terisolasi jika didukung oleh mesin basis data (PostgreSQL mendukung DDL transaksional).
3. Jika migrasi gagal, alur deployment wajib berhenti seketika (*fail-fast*) dan memicu pemberitahuan insiden kepada tim pengembang.

---

## 94. Strategi Migrasi Tanpa Waktu Henti (Zero-Downtime Migration Strategies)

Pada lingkungan produksi berkala tinggi, migrasi skema wajib dirancang agar tidak menimbulkan penguncian tabel eksklusif (*Zero-Downtime Migration*):

* **Penambahan Indeks:** Gunakan klausa `CREATE INDEX CONCURRENTLY` pada PostgreSQL agar operasi penulisan (*INSERT/UPDATE*) tetap berjalan normal saat indeks sedang dibangun.
* **Penambahan Kolom:** Hindari penambahan kolom `NOT NULL` tanpa nilai bawaan (*default value*) pada tabel bervolume jutaan baris, karena memicu penulisan ulang seluruh tabel (*table rewrite*).
* **Pola Perluas dan Susutkan (*Expand-Contract*):** Terapkan perubahan dua tahap untuk modifikasi kolom atau pemecahan tabel besar.

---

## 95. Pengujian Siklus Balik Migrasi (Migration Rollback & Reversibility Testing)

Setiap berkas migrasi wajib menyertakan metode pembalikan (*rollback*) yang simetris dan teruji pada fungsi `down()`:

```php
public function up(): void
{
    Schema::table('health_metrics', function (Blueprint $table) {
        $table->string('quality_status', 30)->default('valid')->after('source');
        $table->index(['user_id', 'quality_status'], 'idx_hm_user_quality');
    });
}

public function down(): void
{
    Schema::table('health_metrics', function (Blueprint $table) {
        $table->dropIndex('idx_hm_user_quality');
        $table->dropColumn('quality_status');
    });
}
```

Pengujian siklus migrasi bolak-balik (`migrate -> rollback -> migrate`) wajib lolos pada repositori sebelum permintaan penggabungan (*Pull Request*) disetujui.

---

## 96. Standar Konvensi Penamaan Tabel (Database Table Naming Conventions)

Penamaan tabel basis data wajib mematuhi konvensi baku arsitektur Laravel dan standar industri relasional:

* **Bentuk Jamak (*Plural*):** Menggunakan bahasa Inggris bentuk jamak dengan huruf kecil dan garis bawah (*snake_case*): `users`, `health_profiles`, `health_metrics`, `challenges`, `consultations`.
* **Tabel Pivot Jamak / Alfabet:** `challenge_user`, `badge_user`, atau nama substantif eksplisit `instructor_member_assignments`.
* Dilarang mencampuradukkan bahasa Indonesia dan bahasa Inggris dalam penamaan tabel (misalnya `tabel_users` atau `health_pengguna`).

---

## 97. Standar Konvensi Penamaan Kolom (Column Naming Conventions)

Penamaan kolom wajib konsisten, deskriptif, dan menggunakan format *snake_case*:

* **Kunci Primer:** Selalu dinamai `id`.
* **Kunci Asing:** Format `[nama_entitas_tunggal]_id` (misalnya `user_id`, `consultation_id`).
* **Kolom Waktu:** Menggunakan akhiran `_at` untuk *timestamp* (`recorded_at`, `expires_at`, `completed_at`) atau `_date` untuk tipe tanggal murni (`birth_date`, `log_date`).
* **Kolom Boolean:** Menggunakan awalan predikat (`is_active`, `is_read`, `has_completed`).

---

## 98. Standar Konvensi Penamaan Kunci Asing (Foreign Key Naming Conventions)

Penamaan kunci asing (*Foreign Keys*) wajib mencerminkan entitas target secara eksplisit guna memudahkan resolusi relasi otomatis oleh Laravel Eloquent ORM:

| Kolom Kunci Asing | Tabel Referensi Target | Nama Relasi Model Eloquent |
| :--- | :--- | :--- |
| `user_id` | `users(id)` | `$metric->user()` |
| `instructor_id` | `users(id)` | `$consultation->instructor()` |
| `member_id` | `users(id)` | `$consultation->member()` |
| `behavior_signal_id` | `behavior_signals(id)` | `$insight->behaviorSignal()` |
| `challenge_id` | `challenges(id)` | `$progress->challenge()` |

Konvensi ini memastikan kode aplikasi bersifat swadokumentasi (*self-documenting*).

---

## 99. Kewajiban Dokumentasi Komentar Kolom & Tabel (Database Schema Documentation & Comments)

Setiap kolom dengan fungsi teknis non-intuitif atau batasan khusus wajib dilengkapi komentar skema (*Schema Comments*) di tingkat basis data:

```sql
COMMENT ON COLUMN health_metrics.quality_status IS 
'Status mutu data: valid, unverified, estimated (kamera AI), questionable, corrected';

COMMENT ON COLUMN behavior_signals.delta IS 
'Selisih kuantitatif recent_value dikurangi baseline_value';
```

Meskipun demikian, komentar skema bersifat pelengkap; dokumentasi repositori teknis tetap menjadi rujukan primer logika bisnis platform.

---

## 100. Prinsip Integritas Data Tanpa Kompromi (Zero Compromise Data Integrity Principle)

Sistem AEVYRA menganut prinsip integritas data tanpa kompromi (*Zero-Compromise Data Integrity Principle*):

> [!IMPORTANT]
> **Empat Pilar Integritas Skema Relasional:**
> 1. **Integritas Entitas:** Setiap baris memiliki identitas unik melalui kunci primer tak bernilai bisnis.
> 2. **Integritas Referensial:** Kunci asing wajib valid dan mengikat secara fisik di mesin basis data.
> 3. **Integritas Domain:** Tipe data, kebolehan nilai kosong (*nullability*), dan satuan terstandarisasi.
> 4. **Integritas Aturan Bisnis:** Batasan periksa (*Check Constraints*) dan indeks unik mencegah inkonsistensi status.

---

## 101. Pembagian Tanggung Jawab Basis Data vs Aplikasi (Database vs Application Responsibility Separation)

Pemisahan tanggung jawab secara jernih antara lapisan basis data dan lapisan aplikasi:

| Tanggung Jawab Basis Data (Database Scope) | Tanggung Jawab Aplikasi (Application Scope) |
| :--- | :--- |
| Integritas struktural dan penegakan relasi tabel. | Otorisasi peran dan kebijakan hak akses pengguna (*Policies*). |
| Penjaminan keunikan data dan pencegahan baris ganda. | Alur kerja kompleks multi-langkah dan integrasi pihak ketiga. |
| Penegakan rentang nilai invarian (*Check Constraints*). | Validasi keselamatan klinis dan kepatuhan bioetika. |
| Isolasi transaksi ACID dan penanganan kunci baris. | Diksi komunikasi antarmuka yang empatis dan ramah pengguna. |

---

## 102. Kebijakan Pembatasan Penggunaan Trigger (Database Trigger Constraints & Policy)

Penggunaan pemicu basis data (*Database Triggers*) dilarang keras untuk logika bisnis aplikasi biasa:

* **Alasan Larangan:** *Triggers* menyembunyikan alur bisnis di luar kode sumber aplikasi, menyulitkan pelacakan galat (*debugging*), mengaburkan pengujian otomatis, serta memperlambat proses migrasi.
* Logika mutasi status atau kalkulasi bisnis wajib dieksekusi secara transparan di lapisan *Service Classes*, *Eloquent Observers*, atau *Domain Events* Laravel.

---

## 103. Pembatasan Logika Bisnis dalam Prosedur Tersimpan (Stored Procedure Architectural Constraints)

Prosedur tersimpan (*Stored Procedures / Functions*) dilarang digunakan untuk menampung aturan domain bisnis gaya hidup preventif:

* Seluruh kalkulasi skor perilaku, penentuan sinyal deviasi, dan peracikan wawasan kesehatan wajib berada di dalam repositori kode aplikasi yang dapat diuji dengan *unit test*.
* Mesin basis data difokuskan sebagai penyimpan data relasional berkinerja tinggi, bukan mesin pemroses aturan bisnis (*business rule engine*).

---

## 104. Pemisahan Transaksi ACID vs Antrean Asinkron (ACID Transactions vs Asynchronous Queues)

Dilarang keras menahan transaksi basis data (*open database transaction*) saat melakukan panggilan jaringan ke layanan eksternal yang lambat:

> [!CAUTION]
> **Larangan Menahan Transaksi saat Panggilan HTTP:**
> Jangan membuka `DB::beginTransaction()` lalu memanggil API eksternal (seperti OpenAI, Gemini AI Vision, atau Payment Gateway). Jika layanan eksternal mengalami latensi 5 detik, koneksi basis data dan kunci baris akan tertahan, menghabiskan *connection pool*, dan memicu *downtime* sistem secara masif!

Panggilan ke layanan luar wajib dieksekusi di luar transaksi atau didelegasikan ke antrean latar belakang (*Asynchronous Queue Jobs*).

---

## 105. Contoh Rekayasa Konsistensi Transaksi (Data Consistency Implementation Example)

Alur kerja reservasi sesi konsultasi yang konsisten dan atomik:

```text
+-------------------------------------------------------------------------+
|                  ALUR RESERVASI KONSULTASI KONSISTEN                    |
+-------------------------------------------------------------------------+
|  1. Terima Permintaan Reservasi dari Klien                              |
|                         ↓                                               |
|  2. Validasi Formulir & Otorisasi Kuota Anggota                         |
|                         ↓                                               |
|  3. Buka Transaksi Basis Data (DB::transaction)                         |
|     - Kunci baris jadwal instruktur (lockForUpdate)                     |
|     - Verifikasi tidak ada tabrakan jadwal aktif                        |
|     - Buat baris konsultasi baru (Status: confirmed)                    |
|     - Kurangi kuota konsultasi anggota                                  |
|                         ↓                                               |
|  4. Komit Transaksi Basis Data (Commit)                                 |
|                         ↓                                               |
|  5. Kirim Pekerjaan Pengiriman Notifikasi ke Antrean Asinkron (Dispatch)|
+-------------------------------------------------------------------------+
```

Notifikasi hanya dikirimkan setelah transaksi basis data berhasil dikomit (*after-commit listener*).

---

## 106. Pengamanan Akses Basis Data dari Model AI (Database Safety & Read-Only AI Access)

Model kecerdasan buatan (*AI Models / LLMs*) dilarang keras memiliki hak akses penulisan langsung ke tabel basis data (*Zero Direct AI Database Write*):

```text
+-------------------------------------------------------------------------+
|              PENGAMANAN TULIS BASIS DATA DARI KELUARAN AI               |
+-------------------------------------------------------------------------+
|  Keluaran Mentah AI (Teks / JSON Terstruktur)                           |
|                         ↓                                               |
|  [Penyaring 1] Validasi Skema JSON Terikat (Strict Schema Validation)   |
|                         ↓                                               |
|  [Penyaring 2] Validasi Batas Keamanan Klinis (Safety Guardrails)       |
|                         ↓                                               |
|  [Penyaring 3] Pengecekan Otorisasi Pengguna (Policy Authorization)     |
|                         ↓                                               |
|  [Penyaring 4] Logika Bisnis Aplikasi Laravel                           |
|                         ↓                                               |
|  Penyisipan Baris Terverifikasi ke Basis Data Relasional                |
+-------------------------------------------------------------------------+
```

Keluaran AI selalu diperlakukan sebagai masukan eksternal yang belum tepercaya (*untrusted input*).

---

## 107. Integritas Data Hasil Pemindai Kamera (Scanner Data Sanitization & Integrity)

Data gizi dan bahan makanan hasil keluaran model visi pemindai kamera wajib disanitasi sebelum disimpan:

* Nilai kalori dan makronutrien diverifikasi berada dalam rentang fisik masuk akal.
* Dilarang menyimpan taksiran kandungan gizi mikro fiktif jika model memiliki skor keyakinan rendah (< 0.70).
* Menyertakan penanda apakah hasil pemindaian telah diverifikasi manual oleh pengguna (`is_user_confirmed = TRUE`).

---

## 108. Pengendalian Izin Akses Data oleh Instruktur (Instructor Scoped Access Control)

Hak akses pembacaan dan penulisan data oleh Instruktur dibatasi secara ketat oleh relasi penugasan aktif:

* Kueri basis data untuk antarmuka instruktur wajib menyertakan penyaring penugasan:
  `WHERE member_id IN (SELECT member_id FROM instructor_member_assignments WHERE instructor_id = ? AND status = 'active')`.
* Instruktur dilarang membaca data anggota lain yang tidak ditugaskan secara resmi kepadanya.

---

## 109. Perlindungan Catatan Privat Konsultasi (Private Consultation Notes Confidentiality)

Catatan pembinaan yang dibuat oleh instruktur dipisahkan menjadi dua tingkatan privasi visibilitas:

```sql
CREATE TABLE consultation_notes (
    id BIGSERIAL PRIMARY KEY,
    consultation_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    visibility VARCHAR(20) NOT NULL DEFAULT 'member_visible', -- 'member_visible', 'instructor_private'
    note_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cn_consultation FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
    CONSTRAINT fk_cn_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT
);
```

Catatan berkategori `instructor_private` dilindungi pada level kueri dan tidak pernah dikirimkan ke antarmuka aplikasi anggota.

---

## 110. Pemisahan Log Audit Sistem vs Riwayat Klinis (System Audit Logs vs Clinical Health History)

Sistem memisahkan secara arsitektural antara log audit keamanan sistem (`audit_logs`) dan linimasa kesehatan pengguna (`health_metrics` & `food_logs`):

* **Tabel Audit:** Berorientasi pada tindakan administratif dan keamanan (*Siapa mengubah apa, kapan, dari IP mana*).
* **Tabel Linimasa Kesehatan:** Berorientasi pada peristiwa biologis dan perilaku (*Berapa jam tidur, berapa liter air dikonsumsi*).
* Mencampuradukkan kedua domain ini dalam satu tabel merusak performa kueri grafik dan mempersulit manajemen retensi data.

---

## 111. Kekekalan & Integritas Catatan Historis (Historical Immutability & Record Integrity)

Pengukuran kesehatan historis memiliki sifat kekal (*Historical Immutability*). Sistem dilarang memanipulasi atau mengubah baris data lama secara diam-diam hanya demi membuat grafik dasbor terlihat lebih baik:

* Jika pengguna salah memasukkan berat badan 3 hari lalu dan ingin memperbaikinya, sistem mencatat baris koreksi baru atau menyimpan nilai asli di dalam riwayat audit koreksi.
* Integritas data historis sangat vital untuk menjaga keabsahan evaluasi medis jangka panjang.

---

## 112. Mekanisme Koreksi Data Tanpa Menghapus Jejak (Non-Destructive Data Correction Audit)

Ketika pengguna mengoreksi rekaman metrik kesehatan yang keliru, sistem menerapkan prosedur koreksi non-destruktif:

```sql
CREATE TABLE metric_corrections (
    id BIGSERIAL PRIMARY KEY,
    health_metric_id BIGINT NOT NULL,
    previous_value NUMERIC(10,2) NOT NULL,
    corrected_value NUMERIC(10,2) NOT NULL,
    correction_reason TEXT,
    corrected_by BIGINT NOT NULL,
    corrected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mc_metric FOREIGN KEY (health_metric_id) REFERENCES health_metrics(id) ON DELETE CASCADE,
    CONSTRAINT fk_mc_user FOREIGN KEY (corrected_by) REFERENCES users(id) ON DELETE RESTRICT
);
```

Nilai pada tabel utama diperbarui menjadi nilai baru dan status mutu ditandai `corrected`, sementara jejak nilai lama tetap tersimpan abadi di tabel koreksi.

---

## 113. Dampak Penghapusan Lunak terhadap Riwayat Tren (Soft Delete Impact on Historical Trends)

Jika sebuah baris data kesehatan dihapus secara lunak (*soft-deleted*), logika sistem wajib mengevaluasi dampaknya terhadap data turunan:

* Menghapus catatan tidur 3 hari lalu dapat mengubah rata-rata garis acuan personal (*baseline*).
* Menghapus log makanan dapat membatalkan sinyal deviasi nutrisi yang sedang aktif.
* Sistem mendokumentasikan apakah data turunan terkait perlu dihitung ulang seketika atau ditandai sebagai data usang (*stale*).

---

## 114. Tata Kelola Penyimpanan Data Turunan (Derived Data Management & Storage)

Data turunan (*Derived Data*)—seperti garis acuan, sinyal deviasi, dan skor perilaku—berasal langsung dari data mentah sumber:

```text
Data Mentah (Health Metrics) ──► Sinyal Perilaku ──► Wawasan Edukatif ──► Skor Perilaku
```

Jika data mentah mengalami perubahan drastis atau koreksi signifikan, data turunan terkait wajib ditandai untuk rekalkulasi ulang agar tidak terjadi kontradiksi logis di layar pengguna.

---

## 115. Validasi Kesegaran & Kedaluwarsa Data Turunan (Derived Data Freshness & Invalidation)

Setiap rekaman data turunan wajib menyimpan metadata waktu pembuatan dan kesegaran:

```sql
ALTER TABLE behavior_baselines ADD COLUMN is_stale BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE behavior_baselines ADD COLUMN refreshed_at TIMESTAMP WITH TIME ZONE;
```

Aplikasi menggunakan penanda `is_stale` untuk menentukan apakah sistem perlu memicu pekerjaan rekalkulasi di latar belakang sebelum menampilkan wawasan kepada anggota.

---

## 116. Persistensi Riwayat Skor Perilaku Kesehatan (Health Behavior Score Persistence)

Penyimpanan Skor Perilaku Kesehatan (*Health Behavior Score*) wajib menyertakan konteks perhitungan yang lengkap:

```sql
CREATE TABLE health_behavior_scores (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    score INTEGER NOT NULL,
    score_breakdown JSONB NOT NULL, -- Faktor kontributor (tidur, hidrasi, langkah, konsistensi)
    algorithm_version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hbs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_score_range CHECK (score >= 0 AND score <= 100)
);

CREATE INDEX idx_scores_user_time ON health_behavior_scores (user_id, calculated_at DESC);
```

---

## 117. Pengelolaan Versi Algoritma pada Hasil Kalkulasi (Algorithm Versioning in Derived Records)

Setiap baris skor dan garis acuan wajib mencatat versi formula yang digunakan (`algorithm_version`):

* Mencegah perbandingan tren keliru jika formula perhitungan skor bobotnya diubah di masa depan.
* Memungkinkan visualisasi grafik menampilkan catatan kaki transparan: *"Skor sebelum September 2026 dihitung menggunakan Algoritma v1.0."*

---

## 118. Perlindungan Privasi pada Data Hasil Inferensi (Privacy Protection for Derived Insights)

Data turunan memiliki tingkat sensitivitas privasi yang setara dengan data biometrik mentah:

* Sinyal perilaku (seperti `sugary_beverage_frequency_increase`) dan wawasan gaya hidup dapat mengungkapkan kondisi biologis pengguna secara tidak langsung.
* Seluruh kebijakan enkripsi, isolasi hak akses, pembatasan ekspor, dan retensi data berlaku penuh pada tabel data turunan.

---

## 119. Pola Desain Akses Data Aman & Efisien (Secure & Efficient Data Access Patterns)

Skema dan indeks basis data dirancang untuk mendukung tiga pola akses utama platform secara optimal:

1. **Pola Dasbor Anggota (*Member Access Pattern*):**
   * Kueri cepat: Skor terkini, 3 wawasan aktif, rencana intervensi aktif, dan kemajuan tantangan hari ini.
   * Dioptimalkan dengan indeks komposit: `(user_id, status)` dan `(user_id, recorded_at DESC)`.
2. **Pola Dasbor Instruktur (*Instructor Access Pattern*):**
   * Kueri cepat: Daftar anggota aktif bimbingan, sinyal deviasi 7 hari terakhir anggota, dan jadwal konsultasi hari ini.
   * Dioptimalkan dengan indeks: `(instructor_id, status)` dan `(member_id, recorded_at DESC)`.
3. **Pola Dasbor Administrator (*Admin Access Pattern*):**
   * Kueri agregat: Jumlah anggota aktif, utilisasi kuota pemindai, dan log audit keamanan.
   * Dioptimalkan dengan tabel ringkasan pra-kalkulasi dan kueri agregat berbatas waktu.

---

## 120. Kaidah Pamungkas Rekayasa Basis Data AEVYRA (Final Sovereign Database Principle)

Rekayasa basis data platform AEVYRA dibangun di atas fondasi integritas, keterlacakan, dan kedaulatan privasi yang kokoh:

```text
+-------------------------------------------------------------------------+
|             PIRAMIDA ARSITEKTUR BASIS DATA BERDAULAT AEVYRA            |
+-------------------------------------------------------------------------+
|                  DINORMALISASI SECARA TEPAT (3NF)                       |
|                                 ↓                                       |
|             EKSPLISIT DALAM SATUAN, RELASI, & TIPE DATA                 |
|                                 ↓                                       |
|                   KONSISTEN DENGAN TRANSAKSI ACID                       |
|                                 ↓                                       |
|               TERLACAK PENUH ASAL-USUL & REKAM JEJAKNYA                 |
|                                 ↓                                       |
|                 PATUH PRIVASI & PERLINDUNGAN DATA PDP                   |
|                                 ↓                                       |
|               TEROTORISASI KETAT PADA SETIAP AKSES BARIS                |
|                                 ↓                                       |
|              EFISIEN DALAM KUERI BERBASIS INDEKS TERUKUR                |
|                                 ↓                                       |
|              AMAN UNTUK BERKEMBANG (MIGRASI ZERO-DOWNTIME)              |
+-------------------------------------------------------------------------+
```

Alur transformasi data yang didukung oleh basis data:

```text
DATA MENTAH PENGGUNA ──► RIWAYAT LINIMASA ──► GARIS ACUAN PERSONAL
                                                      │
OUTCOME SEHAT ◄── KEMAJUAN AKSI ◄── INTERVENSI MIKRO ◄── SINYAL DEVIAZI
```

> **Kaidah Pamungkas Rekayasa Basis Data AEVYRA:**
> *"Basis data adalah benteng kedaulatan data pengguna. Bangun relasi yang kokoh, tegakkan integritas tanpa kompromi, lindungi privasi di setiap baris data, dan jadikan basis data sebagai cermin kebenaran yang tepercaya bagi seluruh ekosistem."*
