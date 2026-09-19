# AEVYRA — Data Model

> Spesifikasi arsitektur data konseptual, logis, dan fisik platform AEVYRA. Dokumen ini mendefinisikan entitas utama, hubungan relasional (*entity-relationships*), batasan arsitektur basis data (*database boundaries*), tata kelola rekam kesehatan (*health records*), jejak analitik mesin perilaku (*behavioral intelligence pipeline*), orkestrasi data AI, isolasi data instruktur dan administrator, kepatuhan privasi (PDP/GDPR), auditabilitas imutabel, strategi pengindeksan (*indexing*), integritas referensial, serta siklus hidup data (*data lifecycle*).

---

## 1. Tujuan & Ruang Lingkup Arsitektur Data (Purpose)

Dokumen ini merupakan cetak biru resmi (*canonical blueprint*) yang mendefinisikan seluruh struktur, relasi, dan tata kelola data dalam ekosistem **AEVYRA**:

| Pilar Arsitektur Data | Cakupan Spesifikasi Teknis |
| :--- | :--- |
| **Domain Entities & Database Schemas** | Struktur tabel relasional, tipe data terstandar, dan integritas kolom. |
| **Entity Relationships & Cardinality** | Kardinalitas antarentitas, kunci asing, dan relasi Eloquent. |
| **Ownership & Authorization Context** | Batasan hak kepemilikan data, isolasi data klinis, dan RBAC. |
| **Health Records & Metric Types** | Format rekam kesehatan otoritatif, standardisasi unit, dan audit mutasi. |
| **Behavioral Baselines & Signals** | Mesin kalkulasi acuan personal, deteksi sinyal, dan wawasan perilaku. |
| **AI Conversations & Tool Execution** | Isolasi riwayat percakapan LLM, eksekusi perkakas, dan pagar pengaman. |
| **Consultations & Instructor Schemas** | Manajemen slot ketersediaan, kontrak penugasan, dan sesi konsultasi. |
| **Gamification, Streaks & Challenges** | Buku besar poin imutabel, pencapaian lencana, dan konsistensi kebiasaan. |
| **Community Posts & Moderation Audit** | Forum publik terisolasi, tombstone deletion, dan jejak audit moderasi. |
| **Security Logs & Sensitive Auditing** | Jejak forensik akses data sensitif, enkripsi, dan mitigasi pelanggaran. |
| **Data Lifecycle & Retention Rules** | Kebijakan retensi 5+ tahun, pemusnahan bertahap, dan pemulihan derivatif. |
| **Laravel Migrations & Model Rules** | Standar implementasi Eloquent, proteksi mass assignment, dan testing. |

Spesifikasi ini menjadi rujukan teknis mengikat untuk:
1. **Laravel Database Migrations:** Penentuan tipe data kolom, *primary key*, *foreign key constraints*, dan pengindeksan.
2. **Eloquent Models & Relationships:** Definisi relasi (`hasMany`, `belongsTo`, `belongsToMany`), *casts*, *mutators*, dan *query scopes*.
3. **Repository & Query Services:** Pemisahan akses baca-tulis, pencegahan masalah kueri $N+1$, dan optimasi agregasi.
4. **API Resources & Transformers:** Penyaringan data keluar (*output data sanitization*) dan pencegahan kebocoran data sensitif.
5. **Authorization Policies & Gates:** Penegakan izin berbasis kepemilikan data (*data-ownership authorization*).
6. **Seeders & Model Factories:** Penyediaan data uji realistis dan terisolasi untuk *automated testing*.

---

## 2. Filosofi Pemodelan Data (Data Modeling Philosophy)

Arsitektur data AEVYRA dirancang dengan memadukan kekakuan integritas relasional dan kelenturan pemrosesan analitik perilaku:

> **Prinsip Inti:** $\text{Data Mentah} + \text{Konteks} + \text{Relasi} + \text{Inteligensi Derivatif} + \text{Auditabilitas} = \mathbf{Model\ Data\ Tepercaya}$

| Kategori Data | Definisi & Karakteristik Arsitektural |
| :--- | :--- |
| Data Otoritatif (Authoritative Data) | Rekaman status primer (*source of truth*) yang menjadi fakta mutlak aplikasi (Users, Records). |
| Data Derivatif (Derived Data) | Data yang dihitung secara matematis dari data otoritatif (Baselines, Features, Signals). |
| Konten Generatif AI (AI-Generated Content) | Respons dialog, rangkuman, dan draf saran yang dihasilkan LLM (bersifat penunjang non-faktual). |
| Metadata Operasional (Operational Metadata) | Jejak audit, telemetri sistem, dan informasi diagnostik penegakan keamanan platform. |

> [!IMPORTANT]
> Konten buatan AI tidak boleh disamakan atau dicampur aduk dengan data kesehatan otoritatif (*authoritative health records*). AI bertindak sebagai lapisan penjelas, bukan sumber kebenaran medis.

---

## 3. Lapisan Data Inti (Core Data Layers)

Secara konseptual dan struktural, skema basis data AEVYRA dipisahkan menjadi 13 lapisan domain modular:

| Layer | Nama Lapisan Domain | Deskripsi & Tanggung Jawab Utama |
| :---: | :--- | :--- |
| **1** | **Identitas & Akses Pengguna** (*Identity & Access*) | Autentikasi akun, peran (`roles`), hak izin (`permissions`), dan status verifikasi. |
| **2** | **Profil Member & Sasaran Hidup** (*Member Profile & Goals*) | Demografi personal, konteks gaya hidup sirkadian, dan komitmen target preventif. |
| **3** | **Rekam Metrik Kesehatan Otoritatif** (*Health Data*) | Fakta numerik biologis terukur (glukosa, tidur, langkah) dan jejak audit perubahan. |
| **4** | **Mesin Inteligensi Perilaku** (*Behavioral Intelligence*) | Nilai acuan (*baseline*), fitur analitik, sinyal deviasi, wawasan, dan rekomendasi. |
| **5** | **Intervensi & Pendampingan Manusia** (*Intervention & Support*) | Resep tindakan bimbingan oleh Instruktur dan evaluasi luaran perilaku. |
| **6** | **Percakapan & Orkestrasi AI** (*AI & Conversations*) | Utas dialog asisten cerdas, log pemanggilan perkakas, dan mitigasi keselamatan AI. |
| **7** | **Tantangan Hidup Sehat & Gamifikasi** (*Gamification*) | Buku besar poin imutabel (*points ledger*), rentetan hari (*streaks*), dan lencana prestasi. |
| **8** | **Komunitas & Forum Moderasi** (*Community*) | Postingan diskusi antarmember, interaksi komentar/reaksi, dan tindakan moderasi. |
| **9** | **Konsultasi & Jadwal Bimbingan** (*Consultation*) | Slot ketersediaan instruktur, reservasi sesi tatap muka, dan catatan konsultasi. |
| **10** | **Keanggotaan & Tingkatan Akses** (*Membership*) | Paket langganan, masa berlaku keanggotaan, dan katalog batasan fitur. |
| **11** | **Notifikasi & Pengingat Terjadwal** (*Notifications*) | Antrean notifikasi multikanal dan pengingat kebiasaan personal anggota. |
| **12** | **Tata Kelola Administratif Platform** (*Administration*) | Konfigurasi program kohor, penugasan instruktur, dan manajemen sistem. |
| **13** | **Audit Forensik & Keamanan Kepatuhan** (*Audit & Security*) | Jejak audit imutabel (*append-only*), log peristiwa keamanan, dan persetujuan privasi. |

---

## 4. Prinsip Sumber Kebenaran Tunggal (Source of Truth)

Setiap entitas bisnis dalam AEVYRA wajib memiliki **satu dan hanya satu** tabel basis data yang bertindak sebagai sumber kebenaran primer (*Single Source of Truth*):

| Entitas Bisnis Utama | Tabel Sumber Kebenaran (*Single Source of Truth*) | Peran Arsitektural |
| :--- | :--- | :--- |
| **Identitas Pengguna** | `users` | Akun autentikasi, status operasional, dan email kredensial |
| **Profil Anggota** | `member_profiles` | Konteks demografis, usia, jenis kelamin, dan preferensi tampilan |
| **Rekam Metrik Medis** | `health_records` | Fakta pengukuran biologis terstandarisasi (glukosa, tidur, aktivitas) |
| **Nilai Dasar Sehat** | `health_baselines` | Nilai acuan fisiologis bergerak (*rolling baseline*) hasil kalkulasi berkala |
| **Sinyal Perilaku** | `behavior_signals` | Kejadian deviasi kebiasaan terverifikasi yang memerlukan perhatian |
| **Tiket Konsultasi** | `consultations` | Catatan reservasi dan risalah pertemuan tatap muka instruktur-member |
| **Rencana Intervensi** | `interventions` | Resep tindakan bimbingan resmi yang divalidasi oleh instruktur manusia |
| **Status Langganan** | `memberships` | Tingkatan akses paket, masa aktif, dan kuota fitur anggota |

Dilarang keras menduplikasi atribut status primer ke tabel lain (*data duplication anti-pattern*) tanpa mekanisme sinkronisasi transaksional yang terjamin.

---

## 5. Data Otoritatif vs Data Derivatif (Authoritative vs Derived Data)

AEVYRA membedakan penanganan siklus hidup antara data otoritatif dan data hasil komputasi turunan:

| Data Otoritatif (Authoritative) | Data Derivatif (Derived Intelligence) |
| :--- | :--- |
| • Contoh: users, health_records, | • Contoh: health_baselines, |
| goals, consultations, memberships | behavior_features, behavior_signals |
| • Sifat: Fakta primer pengguna | • Sifat: Hasil kalkulasi algoritma |
| • Imutabilitas: Dilindungi ketat | • Rekonstruksi: Dapat dihitung ulang |
| • Retensi: Mengikuti regulasi hukum | • Regenerasi: Jika aturan diperbarui, |
| rekam kesehatan (5+ tahun) | tabel dapat di-rebuild menyeluruh |

---

## 6. Tata Kelola Data Generatif AI (AI-Generated Data)

Seluruh luaran yang dihasilkan oleh model kecerdasan buatan (*Large Language Models*) wajib diisolasi pada entitas tersendiri:
- **Pemisahan Entitas:** Draf pesan, ringkasan mingguan, dan interpretasi pola disimpan dalam tabel `ai_messages` atau `ai_summaries`, **bukan** di dalam tabel `health_records`.
- **Pelabelan Provenansi:** Setiap rekaman menyertakan metadata model AI (e.g., `model_version`, `prompt_tokens`, `temperature`, `confidence_score`).
- **Verifikasi Sebelum Komitmen:** Saran AI hanya dapat bertransformasi menjadi intervensi resmi setelah disetujui secara eksplisit oleh Instruktur manusia (*Human-in-the-Loop*).

---

## 7. Peta Relasi Entitas Utama (Core Entity Map)

Diagram hubungan tingkat tinggi yang berpusat pada entitas pengguna (*User-Centric Architecture*):

```text
                                  ┌──────────────┐
                                  │    USERS     │
                                  └──────┬───────┘
                                         │
        ┌───────────────────┬────────────┼────────────┬───────────────────┐
        ▼                   ▼            ▼            ▼                   ▼
  ┌───────────┐       ┌───────────┐┌───────────┐┌───────────┐       ┌───────────┐
  │ Profiles  │       │   Roles   ││   Goals   ││Memberships│       │Audit Logs │
  └───────────┘       └───────────┘└─────┬─────┘└───────────┘       └───────────┘
                                         │
        ┌───────────────────┬────────────┼────────────┬───────────────────┐
        ▼                   ▼            ▼            ▼                   ▼
  ┌───────────┐       ┌───────────┐┌───────────┐┌───────────┐       ┌───────────┐
  │  Health   │       │ Behavioral││Behavioral ││Interven-  │       │  AI Chat  │
  │  Records  │──────►│ Baselines ││  Signals  ││  tions    │       │  Threads  │
  └───────────┘       └───────────┘└─────┬─────┘└───────────┘       └───────────┘
                                         │
                                  ┌──────┴───────┐
                                  ▼              ▼
                            ┌───────────┐  ┌───────────┐
                            │ Insights  │  │ Recommen- │
                            │           │  │  dations  │
                            └───────────┘  └───────────┘
```

---

## 8. Entitas Identitas Pengguna (User Entity)

Tabel `users` bertindak sebagai jangkar otentikasi dan identitas global dalam sistem:

| Kolom | Tipe Data | Definisi & Batasan Bisnis |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key identitas unik |
| `name` | `VARCHAR(255)` | Nama lengkap pengguna |
| `email` | `VARCHAR(255)` | Email unik (case-insensitive index) |
| `password` | `VARCHAR(255)` | Hash password aman (Bcrypt/Argon2id) |
| `email_verified_at` | `TIMESTAMP NULL` | Waktu konfirmasi kepemilikan email |
| `status` | `ENUM (varchar)` | Status operasional akun pengguna |
| `last_login_at` | `TIMESTAMP NULL` | Rekam waktu sesi terakhir |
| `created_at` | `TIMESTAMP` | Waktu registrasi awal akun |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan profil terakhir |
| `deleted_at` | `TIMESTAMP NULL` | Penanda waktu hapus lunak |

---

## 9. Status Akun Pengguna (User Status Enum)

Siklus status operasional akun pengguna diatur secara tegas melalui status berikut:

```text
┌──────────────┐      Verifikasi Email      ┌──────────────┐      Pelanggaran      ┌──────────────┐
│   PENDING    ├───────────────────────────►│    ACTIVE    ├──────────────────────►│  SUSPENDED   │
└──────────────┘                            └──────┬───────┘                       └──────┬───────┘
                                                   │                                      │
                                                   ▼ Inaktif > 180 Hari                   ▼
                                            ┌──────────────┐                       ┌──────────────┐
                                            │   INACTIVE   │                       │   DELETED    │
                                            └──────────────┘                       └──────────────┘
```

- `ACTIVE`: Akun beroperasi penuh dan diizinkan mengakses fitur sesuai peran.
- `PENDING`: Menunggu verifikasi tautan email atau persetujuan dokumen instruktur.
- `SUSPENDED`: Dinonaktifkan sementara oleh Administrator akibat indikasi anomali keamanan.
- `INACTIVE`: Akun tidur (*dormant*) yang tidak aktif dalam jangka waktu lama.
- `DELETED`: Akun yang telah ditandai untuk dihapus lunak (*soft-deleted*).

---

## 10. Aturan Validasi Identitas Pengguna (User Identity Rules)

Integritas akun pengguna dilindungi oleh aturan ketat pada tingkat basis data dan aplikasi:
- **Normalisasi Email:** Alamat email secara otomatis dikonversi menjadi huruf kecil (*lowercase*) dan dipangkas spasi (*trimmed*) sebelum proses penyimpanan.
- **Kekuatan Sandi:** Sandi wajib di-hash menggunakan algoritma kriptografis adaptif (Bcrypt *work-factor* $\ge 12$ atau Argon2id). Sandi teks terbuka (*plaintext*) dilarang keras ditulis ke log atau basis data.
- **Deteksi Akses Ganda:** Setiap pembaruan email penting memicu pembatalan seluruh sesi perangkat yang aktif (*session invalidation*).

---

## 11. Penerapan Hapus Lunak Akun (User Soft Delete)

Penghapusan akun pengguna menggunakan kolom `deleted_at` guna mempertahankan keutuhan referensial:
- **Integritas Relasional:** Rekam jejak intervensi klinis dan bukti kehadiran konsultasi di masa lampau tidak boleh putus (*dangling references*).
- **Penyamaran Data Pribadi (*Data Masking*):** Saat akun dihapus, kolom nama dan email dapat di-pseudonimkan (misal: `user_deleted_84712@aevyra.id`) untuk memenuhi ketentuan hak dilupakan (*Right to be Forgotten*).
- **Masa Tenggang (*Grace Period*):** Akun berada dalam status hapus lunak selama 30 hari sebelum data non-medis diproses untuk penghapusan permanen.

---

## 12. Entitas Peran Sistem (Role Entity)

Entitas `roles` berfungsi sebagai jangkar utama sistem otorisasi berbasis peran (*Role-Based Access Control* / RBAC) di AEVYRA, menentukan batasan wewenang operasional untuk setiap pengguna:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik |
| `name` | `VARCHAR(50)` | Nama peran (e.g., 'Instructor') |
| `slug` | `VARCHAR(50)` | Identifikasi unik sistem (UNIQUE) |
| `description` | `VARCHAR(255)` | Deskripsi tanggung jawab peran |
| `created_at` | `TIMESTAMP` | Waktu pembuatan peran |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan peran |

Nilai peran inti mencakup: `member`, `instructor`, dan `admin`.

---
## 13. Entitas Hak Izin Granular (Permission Entity)

Entitas `permissions` menyediakan kendali granular terhadap kapabilitas aksi spesifik pada tingkat rute API, fungsi sistem, dan operasi domain sensitif:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik |
| `name` | `VARCHAR(100)` | Nama izin terbaca (Readable Name) |
| `slug` | `VARCHAR(100)` | Pola 'resource.action' (UNIQUE) |
| `description` | `VARCHAR(255)` | Cakupan wewenang tindakan |
| `created_at` | `TIMESTAMP` | Waktu pembuatan entitas |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan entitas |

Contoh slug kanonikal: `members.view`, `health.view_assigned`, `interventions.create`, `reports.export`, `audit.view`.

---
## 14. Relasi Peran dan Hak Izin (Role-Permission Relationship)

Relasi *Many-to-Many* antara tabel `roles` dan `permissions` dijembatani oleh tabel pivot `role_has_permissions`:

```text
┌──────────────┐         ┌────────────────────────┐         ┌──────────────┐
│    ROLES     │1       *│  ROLE_HAS_PERMISSIONS  │*       1│ PERMISSIONS  │
│  ──────────  ├────────►│  ────────────────────  │◄────────┤  ──────────  │
│  id          │         │  role_id               │         │  id          │
│  slug        │         │  permission_id         │         │  slug        │
└──────────────┘         └────────────────────────┘         └──────────────┘
```

Kunci komposit unik diterapkan pada pasangan `(role_id, permission_id)` guna mencegah duplikasi entri relasi.

---

## 15. Relasi Pengguna dan Peran (User-Role Relationship)

Sistem mendukung pengguna dengan peran multi-fungsi melalui tabel pivot relasional:

```text
┌──────────────┐         ┌────────────────────────┐         ┌──────────────┐
│    USERS     │1       *│    MODEL_HAS_ROLES     │*       1│    ROLES     │
│  ──────────  ├────────►│  ────────────────────  │◄────────┤  ──────────  │
│  id          │         │  model_id (user_id)    │         │  id          │
│  email       │         │  role_id               │         │  slug        │
└──────────────┘         └────────────────────────┘         └──────────────┘
```

Arsitektur ini memungkinkan seorang staf medis bertindak sebagai `instructor` dalam tugas harian dan beralih konteks sebagai `member` untuk mencatat kesehatan pribadinya.

---

## 16. Entitas Profil Pengguna (Member Profile Entity)

Entitas `member_profiles` memisahkan atribut demografis personal, lokalisasi, dan preferensi antarmuka anggota dari tabel kredensial autentikasi demi perlindungan privasi:

| Kolom | Tipe Data | Definisi & Kebutuhan Privasi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik profil |
| `user_id` | `Foreign Key` | Menghubungkan ke `users.id` (UNIQUE) |
| `display_name` | `VARCHAR(100)` | Nama publik komunitas/dasbor |
| `date_of_birth` | `DATE` | Tanggal lahir (Kalkulasi usia) |
| `sex` | `ENUM (MALE/FEMALE)` | Profil biologis referensi metabolik |
| `occupation` | `VARCHAR(150) NULL` | Informasi konteks stres harian |
| `timezone` | `VARCHAR(50)` | Zona waktu lokal member (e.g. WIB) |
| `locale` | `VARCHAR(10)` | Preferensi bahasa (e.g. 'id-ID') |
| `avatar_path` | `VARCHAR(255) NULL` | Tautan relatif berkas foto profil |
| `created_at` | `TIMESTAMP` | Waktu inisiasi profil |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan data profil |

---
## 17. Klasifikasi Privasi Atribut Profil (Profile Privacy Tiers)

Kolom pada profil dikelompokkan ke dalam tiga tingkat kerahasiaan (*Privacy Tiers*):

| Kategori Kerahasiaan | Atribut Kolom & Tingkat Akses Publik |
| :--- | :--- |
| Publik Komunitas (Public-facing) | `display_name`, `avatar_path` Terlihat oleh sesama anggota forum komunitas. |
| Privat Akun Pribadi (Private Account) | `date_of_birth`, `occupation`, `timezone` Hanya dapat dilihat oleh member dan sistem. |
| Sensitif Bimbingan (Clinical Sensitive) | Parameter biologis & riwayat komorbiditas Hanya dapat dilihat oleh Instruktur teralokasi. |

---

## 18. Entitas Konteks Gaya Hidup (Lifestyle Context Entity)

Entitas `lifestyle_profiles` merekam konteks ritme sirkadian harian, preferensi pola istirahat, serta kebiasaan nutrisi anggota sebagai acuan personalisasi rekomendasi:

| Kolom | Tipe Data | Penjelasan Variabel Konteks |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key identitas |
| `user_id` | `Foreign Key` | Relasi 1-to-1 ke `users.id` |
| `work_pattern` | `ENUM` | SEDENTARY, SHIFT_WORK, ACTIVE_LABOR |
| `typical_sleep_bed` | `TIME NULL` | Target estimasi jam tidur malam |
| `typical_sleep_wake` | `TIME NULL` | Target estimasi jam bangun pagi |
| `meal_pattern` | `ENUM` | 3_MEALS, INTERMITTENT, UNSTRUCTURED |
| `dietary_pref` | `JSON NULL` | Array preferensi makanan/alergi |
| `created_at` | `TIMESTAMP` | Waktu perekaman awal |
| `updated_at` | `TIMESTAMP` | Waktu modifikasi preferensi |

---
## 19. Entitas Sasaran Kesehatan (Goal Entity)

Entitas `goals` merekam komitmen target kesehatan preventif yang diinisiasi oleh anggota, baik secara mandiri maupun atas arahan Instruktur bimbingan:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik target |
| `user_id` | `Foreign Key` | Pemilik sasaran (`users.id`) |
| `type` | `VARCHAR(50)` | Kategori sasaran perilaku |
| `title` | `VARCHAR(200)` | Judul sasaran yang memotivasi |
| `description` | `TEXT NULL` | Rincian strategi pencapaian target |
| `status` | `VARCHAR(30)` | Status progres sasaran |
| `priority` | `SMALLINT UNSIGNED` | Bobot urgensi sasaran (1=Utama) |
| `start_date` | `DATE` | Tanggal mulai komitmen |
| `target_date` | `DATE NULL` | Target batas waktu evaluasi |
| `completed_at` | `TIMESTAMP NULL` | Waktu resmi penyelesaian sasaran |
| `created_at` | `TIMESTAMP` | Waktu inisiasi pembentukan sasaran |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan data sasaran |

---
## 20. Tipe Sasaran Perilaku (Goal Types Enum)

Taksonomi target kesehatan terstandar dalam AEVYRA:
- `SLEEP_ROUTINE`: Konsistensi jadwal istirahat malam dan perbaikan durasi tidur.
- `PHYSICAL_ACTIVITY`: Peningkatan langkah harian atau frekuensi latihan aerobik.
- `NUTRITION_AWARENESS`: Pengurangan konsumsi gula berlebih dan pemantauan karbohidrat.
- `ROUTINE_CONSISTENCY`: Peningkatan kedisiplinan pencatatan log mandiri setiap hari.
- `WEIGHT_MANAGEMENT`: Pengendalian indeks massa tubuh melalui keseimbangan kalori.
- `GENERAL_PREVENTIVE_HEALTH`: Pemeliharaan parameter biologis stabil jangka panjang.

---

## 21. Siklus Status Sasaran (Goal Status Lifecycle)

Status sasaran dikelola menggunakan mesin keadaan terhingga (*Finite State Machine*):

```text
┌──────────────┐      Aktivasi Komitmen      ┌──────────────┐      Target Tercapai      ┌──────────────┐
│    DRAFT     ├────────────────────────────►│    ACTIVE    ├──────────────────────────►│  COMPLETED   │
└──────────────┘                             └──────┬───────┘                           └──────────────┘
                                                    │
                                                    ├── Jeda Sementara ──► [ PAUSED ] ──► (Reaktivasi)
                                                    │
                                                    ├── Dibatalkan     ──► [ CANCELLED ]
                                                    │
                                                    └── Kedaluwarsa    ──► [ ARCHIVED ]
```

---

## 22. Entitas Metrik Sasaran (Goal Metrics Entity)

Entitas `goal_metrics` memetakan parameter kuantitatif terukur dan ambang batas keberhasilan untuk setiap sasaran perilaku anggota:

```text
┌───────────────────┬───────────────────┬─────────────────────────────────────┐
│ Kolom             │ Tipe Data         │ Definisi                            │
├───────────────────┼───────────────────┼─────────────────────────────────────┤
│ id                │ BIGINT UNSIGNED   │ Primary Key unik                    │
│ goal_id           │ Foreign Key       │ Terhubung ke `goals.id`             │
│ metric_type       │ VARCHAR(50)       │ Jenis metrik (steps, sleep, dll.)   │
│ target_value      │ DECIMAL(10,2)     │ Angka target capaian kuantitatif    │
│ unit              │ VARCHAR(30)       │ Satuan standar metrik               │
│ priority          │ SMALLINT          │ Prioritas pengukuran metrik         │
│ created_at        │ TIMESTAMP         │ Waktu pemetaan metrik               │
│ updated_at        │ TIMESTAMP         │ Waktu pembaruan target metrik       │
└───────────────────┴───────────────────┴─────────────────────────────────────┘
```

---
## 23. Entitas Rekam Kesehatan Otoritatif (Health Record Entity)

Entitas `health_records` bertindak sebagai repositori fakta kesehatan primer (*source of truth*) yang dicatat mandiri oleh anggota atau disinkronisasi otomatis melalui perangkat medis/IoT:

| Kolom | Tipe Data | Definisi Kolom |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | ID unik rekam kesehatan |
| `user_id` | `Foreign Key` | Pemilik sah data (`users.id`) |
| `metric_type` | `VARCHAR(50)` | Tipe metrik (glucose, sleep, steps) |
| `value_numeric` | `DECIMAL(12,4)NULL` | Nilai metrik kuantitatif terstandar |
| `value_text` | `VARCHAR(255) NULL` | Nilai kategorikal / teks singkat |
| `unit` | `VARCHAR(30)` | Satuan baku pengukuran (mg/dL, min) |
| `recorded_at` | `TIMESTAMP` | Waktu kejadian biologis sebenarnya |
| `source` | `VARCHAR(30)` | Kanal sumber data (manual, iot, dll) |
| `source_reference` | `VARCHAR(100) NULL` | ID transaksi eksternal perangkat |
| `quality_status` | `VARCHAR(30)` | Status validasi kualitas data |
| `metadata` | `JSON NULL` | Konteks sekunder (posisi, alat) |
| `created_at` | `TIMESTAMP` | Waktu data tersimpan di server |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan data jika diedit |
| `deleted_at` | `TIMESTAMP NULL` | Jejak waktu hapus lunak |

---
## 24. Prinsip Desain Rekam Kesehatan (Health Record Design Principle)

AEVYRA menolak pendekatan anti-pola *"Satu Tabel Raksasa Berbasis JSON Penuh"* (*Everything-in-JSON Anti-Pattern*):

> [!TIP]
> **Praktik Terbaik Desain Skema Rekam Kesehatan:**
> - **Disetujui (*Approved*):**
>   - Kolom metrik bernilai angka (`value_numeric`) diindeks secara kuat untuk kecepatan kueri analitik.
>   - Kolom waktu rekaman (`recorded_at`) terindeks untuk kueri rentang waktu dan linimasa longitudinal.
>   - JSON hanya digunakan untuk metadata sekunder terstruktur yang jarang difilter.
> - **Ditolak (*Anti-Pattern*):**
>   - Menyimpan seluruh data kesehatan dalam satu kolom `payload` JSON raksasa.
>   - Mengabaikan integritas referensial dan tipe data numerik asli basis data.

---

## 25. Registri Jenis Metrik Kesehatan (Health Metric Types)

Taksonomi metrik kesehatan yang didukung oleh sistem:
- `blood_glucose`: Kadar gula darah sesaat / puasa (satuan: `mg/dL`).
- `sleep_duration`: Total durasi istirahat tidur malam (satuan: `minutes`).
- `sleep_quality`: Skor kualitas tidur subjektif / sensor (skala `1..100`).
- `steps`: Total langkah kaki harian (satuan: `steps`).
- `active_minutes`: Waktu aktivitas fisik dengan denyut jantung meningkat (satuan: `minutes`).
- `water_intake`: Asupan hidrasi air putih (satuan: `milliliters`).
- `weight`: Berat badan penimbangan berkala (satuan: `kilograms`).
- `mood_score`: Indeks suasana hati subjektif (skala `1..5`).

---

## 26. Model Penampungan Nilai Metrik (Health Record Value Model)

Setiap tipe data biologis memiliki karakteristik penyimpanan yang berbeda:
- **Metrik Numerik Tunggal:** Glukosa, langkah, dan berat badan tersimpan langsung pada kolom `value_numeric`.
- **Metrik Kategorikal:** Suasana hati (*mood*) atau konsistensi buang air besar tersimpan pada `value_text`.
- **Metrik Acara Kompleks:** Log rincian komposisi makanan (*meal breakdown*) memanfaatkan tabel khusus `meal_records` atau kolom `metadata` terstruktur.

---

## 27. Arsitektur Dekomposisi Metrik Lanjutan (Better Metric Architecture)

Ketika volume data meningkat drastis, arsitektur skema dapat didekomposisi secara vertikal tanpa merusak lapisan antarmuka:

```text
                               health_records (Tabel Induk Metadata)
                                          │
                  ┌───────────────────────┼───────────────────────┐
                  ▼                       ▼                       ▼
       health_records_numeric  health_records_category   health_records_events
       (Glukosa, Berat, Langkah)(Suasana Hati, Gejala)   (Pola Makan Terstruktur)
```

> [!TIP]
> Untuk fase MVP hingga skala 100.000 pengguna, tabel tunggal `health_records` dengan pengindeksan komposit optimal memberikan performa kueri tertinggi dan kemudahan pemeliharaan.

---

## 28. Standardisasi Satuan Pengukuran (Canonical Units)

Seluruh nilai metrik dikonversi ke dalam satuan kanonikal baku sebelum dimasukkan ke dalam basis data:
- **Durasi Tidur & Olahraga:** Wajib disimpan dalam satuan menit (`minutes`).
- **Jarak Aktivitas:** Wajib disimpan dalam satuan meter (`meters`).
- **Volume Cairan:** Wajib disimpan dalam satuan mililiter (`milliliters`).
- **Gula Darah:** Standar nasional Indonesia mengadopsi miligram per desiliter (`mg/dL`).

Antarmuka klien bertanggung jawab melakukan konversi visual ramah pengguna (misal: menampilkan jam dan menit).

---

## 29. Kanal Sumber Data (Data Sources)

Kolom `source` pada rekam kesehatan mengidentifikasi kanal asal data:
- `manual`: Entri mandiri oleh member melalui antarmuka aplikasi.
- `scanner`: Ekstraksi otomatis dari foto makanan atau strip glukosa via OCR/Vision AI.
- `wearable`: Sinkronisasi otomatis dari perangkat jam pintar atau sensor kontinu (IoT).
- `import`: Berkas unggahan riwayat rekam medis (CSV/HealthKit/Google Fit).
- `instructor`: Koreksi atau verifikasi langsung oleh Instruktur pendamping.
- `system`: Perhitungan otomatis yang dihasilkan oleh proses latar belakang.

---

## 30. Referensi Sumber Data Eksternal (Source Reference)

Untuk data yang bersumber dari perangkat eksternal:
- Kolom `source_reference` menampung UUID catatan eksternal dari SDK penyedia (misal: ID sinkronisasi Apple HealthKit atau Google Health Connect).
- Kredensial rahasia, OAuth access tokens, dan refreshToken milik penyedia perangkat pihak ketiga **dilarang keras** disimpan di tabel rekam kesehatan. Kredensial tersebut wajib diisolasi di tabel `oauth_identities` terenkripsi.

---

## 31. Koreksi & Riwayat Mutasi Data Kesehatan (Health Data Correction)

Koreksi data rekam kesehatan tidak penimpaan data secara langsung tanpa audit (*silent overwrite*):
- Setiap perubahan nilai memicu pencatatan otomatis ke tabel `health_record_audits`.
- Struktur histori merekam: `health_record_id`, `old_value`, `new_value`, `reason`, `updated_by`, dan `timestamp`.
- Fitur ini menjamin keandalan medikolegal apabila terjadi ketidaksesuaian data dalam analisis tren glukosa.

---

## 32. Kedaulatan & Kepemilikan Data Kesehatan (Health Record Ownership)

Kedaulatan data kesehatan ditegakkan pada tingkat arsitektural:

> [!IMPORTANT]
> **Prinsip Kedaulatan:** Member adalah pemilik sah tunggal atas seluruh rekam kesehatannya.

- Kolom `health_records.user_id` menjadi penentu batas otorisasi utama.
- Instruktur hanya dapat membaca rekaman kesehatan melalui relasi penugasan aktif (*active assignment contract*).
- Administrator sistem **tidak memiliki hak bawaan** untuk menjelajahi data kesehatan individual tanpa prosedur darurat resmi (*Break-Glass Access*).

---

## 33. Tingkat Visibilitas Rekam Medis (Health Record Visibility)

Setiap rekaman kesehatan memiliki penanda visibilitas eksplisit:
- `PRIVATE`: Hanya dapat diakses oleh member yang bersangkutan.
- `SHARED_WITH_ASSIGNED_INSTRUCTOR`: Dibagikan secara aman kepada instruktur pendamping resmi.
- `PROGRAM_SCOPED`: Terbuka bagi tim medis yang mengelola program kohor terkait.

Nilai bawaan (*default*) untuk seluruh rekaman baru adalah `PRIVATE` kecuali pengguna memberikan persetujuan berbagi (*data-sharing consent*).

---

## 34. Silsilah & Keaslian Data Kesehatan (Health Data Provenance)

Setiap baris data kesehatan wajib mampu menjawab 5 pertanyaan forensik tanpa ambiguitas:
1. **Siapa yang membuat? (*Who*):** Dilacak via `user_id` atau `created_by`.
2. **Kapan kejadian berlangsung? (*When*):** Dipisahkan antara waktu peristiwa biologis (`recorded_at`) dan waktu penyimpanan server (`created_at`).
3. **Dari mana asalnya? (*Where/Source*):** Dilacak via kolom `source` dan `source_reference`.
4. **Alat apa yang digunakan? (*Device Context*):** Direkam dalam metadata perangkat.
5. **Apakah pernah diubah? (*Integrity*):** Dilacak via penanda `updated_at` dan catatan audit revisi.

---

## 35. Entitas Nilai Dasar Kesehatan (Health Baseline Entity)

Entitas `health_baselines` mengelola nilai acuan fisiologis bergerak (*rolling personal baseline*) yang dihitung berkala dari riwayat data anggota sebagai dasar deteksi deviasi perilaku:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik baseline |
| `user_id` | `Foreign Key` | Pemilik data acuan (`users.id`) |
| `metric_type` | `VARCHAR(50)` | Jenis metrik (glucose, sleep, steps) |
| `window_start` | `DATE` | Batas awal jendela observasi |
| `window_end` | `DATE` | Batas akhir jendela observasi |
| `sample_count` | `INT UNSIGNED` | Jumlah titik sampel data valid |
| `value_primary` | `DECIMAL(12,4)` | Nilai acuan utama (Rata-rata/Median) |
| `value_secondary` | `DECIMAL(12,4)NULL` | Nilai deviasi standar / variabilitas |
| `method` | `VARCHAR(30)` | Metode kalkulasi statistik |
| `status` | `VARCHAR(30)` | Status kesiapan data acuan |
| `rule_version` | `VARCHAR(20)` | Versi algoritma mesin perilaku |
| `generated_at` | `TIMESTAMP` | Waktu kalkulasi dieksekusi |
| `created_at` | `TIMESTAMP` | Waktu rekaman disimpan |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status baseline |

---
## 36. Metode Kalkulasi Nilai Dasar (Baseline Methods Enum)

Metode kalkulasi statistik acuan ditentukan secara eksplisit:
- `MEAN`: Rata-rata aritmatika untuk metrik berdistribusi normal (e.g., durasi tidur).
- `MEDIAN`: Titik tengah untuk metrik yang rentan terhadap data pencilan (*outliers*).
- `WEIGHTED_MEAN`: Rata-rata terbobot yang memberi bobot lebih tinggi pada data 7 hari terakhir.
- `RANGE`: Rentang batas minimum dan batas maksimum normal individu.
- `FREQUENCY`: Frekuensi kepatuhan perilaku per satuan minggu.

---

## 37. Siklus Status Kesiapan Nilai Dasar (Baseline Status Lifecycle)

Status kesiapan data acuan dipandu oleh siklus kualitas:

```text
[ Data Kurang (< 7 Hari) ] ──► Status: INSUFFICIENT_DATA
                                         │
                                         ▼ Pengumpulan Data Cukup
                             Status: AVAILABLE (Aktif Digunakan Mesin)
                                         │
                                         ▼ Usia Data > 14 Hari Tanpa Update
                             Status: STALE (Perlu Rekalkulasi)
                                         │
                                         ▼ Deteksi Intervensi Baru
                             Status: REBUILDING (Sedang Dihitung Ulang)
```

---

## 38. Tata Kelola Versi Nilai Dasar (Baseline Versioning)

Untuk menjamin reproduktibilitas analisis ilmiah dan audit medis:
- Setiap rekaman baseline menyimpan informasi versi algoritma (`rule_version`).
- Apabila formula statistik diperbarui dari versi `v1.2` ke `v2.0`, baseline lama tidak dihapus secara destruktif, melainkan ditandai sebagai `SUPERSEDED` dan baseline versi baru diterbitkan dengan tanggal berlaku yang baru.

---

## 39. Perlindungan Riwayat Nilai Dasar (Baseline History)

Relasi historis data acuan disimpan secara berurutan:

```text
User ──► HasMany: HealthBaselines
           ├── Baseline v1 (Januari 2026) -> Status: SUPERSEDED
           ├── Baseline v2 (Februari 2026)-> Status: SUPERSEDED
           └── Baseline v3 (Maret 2026)   -> Status: AVAILABLE (CURRENT)
```

Model ini memungkinkan peninjauan komparatif jangka panjang untuk melihat apakah intervensi gaya hidup berhasil menggeser nilai dasar fisiologis member ke arah yang lebih sehat.

---

## 40. Entitas Fitur Perilaku Derivatif (Behavioral Feature Entity)

Entitas `behavior_features` menyimpan variabel analitik turunan hasil agregasi berkala (seperti variabilitas, rasio konsistensi, dan kemiringan tren):

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key fitur analitik |
| `user_id` | `Foreign Key` | Pengguna terkait (`users.id`) |
| `metric_type` | `VARCHAR(50)` | Metrik dasar yang dianalisis |
| `feature_type` | `VARCHAR(50)` | Karakteristik fitur perilaku |
| `value_numeric` | `DECIMAL(12,4)` | Nilai hasil kalkulasi fitur |
| `period_start` | `TIMESTAMP` | Waktu awal periode kalkulasi |
| `period_end` | `TIMESTAMP` | Waktu akhir periode kalkulasi |
| `source_version` | `VARCHAR(20)` | Versi pemroses fitur |
| `created_at` | `TIMESTAMP` | Waktu penyimpanan fitur |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan nilai fitur |

---
## 41. Taksonomi Jenis Fitur Perilaku (Feature Types)

Kategori fitur perilaku yang dihasilkan oleh *feature extractor*:
- `AVERAGE`: Rata-rata metrik dalam jendela 7 hari atau 14 hari.
- `VARIABILITY`: Standar deviasi yang menunjukkan ketidakteraturan gaya hidup.
- `CONSISTENCY`: Rasio kepatuhan jadwal tidur atau waktu makan harian.
- `TREND`: Kemiringan garis tren linier (*linear regression slope*) yang mengindikasikan arah progres.
- `DEVIATION`: Besaran persentase selisih antara nilai riil saat ini terhadap nilai dasar (*baseline*).
- `STREAK`: Jumlah hari berurutan suatu target perilaku berhasil dipenuhi.

---

## 42. Entitas Sinyal Perilaku (Behavioral Signal Entity)

Entitas `behavior_signals` merekam deteksi deviasi atau anomali pola kebiasaan yang diterbitkan oleh mesin perilaku (*Behavior Engine*) secara transparan dan terukur:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key sinyal perilaku |
| `user_id` | `Foreign Key` | Member pemilik sinyal (`users.id`) |
| `metric_type` | `VARCHAR(50)` | Metrik biologis yang memicu sinyal |
| `signal_type` | `VARCHAR(100)` | Kode pola anomali terstandar |
| `severity` | `VARCHAR(30)` | Tingkat perhatian operasional |
| `status` | `VARCHAR(30)` | Status siklus hidup sinyal |
| `detected_at` | `TIMESTAMP` | Waktu pertama kali pola terdeteksi |
| `observation_start` | `TIMESTAMP` | Awal rentang data pendukung sinyal |
| `observation_end` | `TIMESTAMP` | Akhir rentang data pendukung sinyal |
| `baseline_id` | `Foreign Key NULL` | Relasi ke acuan pembanding |
| `rule_version` | `VARCHAR(20)` | Versi aturan logika deteksi |
| `evidence_quality` | `DECIMAL(5,2)` | Skor keandalan bukti data (0..100) |
| `priority_score` | `DECIMAL(6,2)` | Bobot urutan antrean triage |
| `resolved_at` | `TIMESTAMP NULL` | Waktu sinyal berhasil dituntaskan |
| `created_at` | `TIMESTAMP` | Waktu rekaman dibuat di database |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status sinyal |

---
## 43. Relasi Bukti Pendukung Sinyal (Signal Evidence Relationship)

Untuk menghindari penyimpanan data mentah berulang di dalam baris sinyal, bukti pendukung dihubungkan melalui tabel pivot `behavior_signal_records`:

```text
┌─────────────────────────┐         ┌──────────────────────────────┐         ┌─────────────────────────┐
│     BEHAVIOR_SIGNALS    │1       *│   BEHAVIOR_SIGNAL_RECORDS    │*       1│      HEALTH_RECORDS     │
│   ───────────────────   ├────────►│   ───────────────────────    │◄────────┤   ───────────────────   │
│   id                    │         │   signal_id                  │         │   id                    │
│   signal_type           │         │   health_record_id           │         │   value_numeric         │
└─────────────────────────┘         └──────────────────────────────┘         └─────────────────────────┘
```

Model relasional ini memberikan penelusuran forensik instan (*instant drill-down*) terhadap data log fisik yang mendasari terbitnya sebuah sinyal anomali.

---

## 44. Siklus Status Sinyal Perilaku (Signal Status Lifecycle)

Alur transisi status sinyal perilaku dari deteksi hingga resolusi:

```text
┌──────────────┐      Validasi Aturan      ┌──────────────┐      Disajikan di Dasbor      ┌──────────────┐
│   DETECTED   ├──────────────────────────►│  QUALIFIED   ├──────────────────────────────►│  PRESENTED   │
└──────────────┘                           └──────────────┘                               └──────┬───────┘
                                                                                                 │
                                   ┌─────────────────────────────────────────────────────────────┘
                                   │
                                   ▼ Instruktur Membuat Intervensi
                           ┌──────────────┐      Member Konfirmasi Aksi      ┌──────────────┐
                           │   ACTED_ON   ├─────────────────────────────────►│   RESOLVED   │
                           └──────┬───────┘                                  └──────────────┘
                                  │
                                  ▼ Pola Salah / Data Anomali Ditolak
                           ┌──────────────┐
                           │  DISMISSED   │
                           └──────────────┘
```

---

## 45. Tingkat Perhatian Sinyal (Signal Severity Enum)

Tingkat urgensi sinyal menggunakan terminologi operasional terukur tanpa klaim gawat darurat medis:
- `INFO`: Informasi kebiasaan positif atau kestabilan metrik yang memuaskan.
- `NOTICE`: Deviasi minor yang belum memerlukan intervensi langsung.
- `ATTENTION`: Deviasi konsisten selama beberapa hari yang memerlukan perhatian member.
- `FOLLOW_UP`: Pola anomali signifikan yang membutuhkan tinjauan langsung oleh Instruktur bimbingan.

---

## 46. Skor Prioritas Sinyal (Signal Priority Score)

Entitas `behavior_signal_records` menjembatani sinyal anomali dengan titik-titik data rekam kesehatan mentah yang menjadi bukti pembuktiannya (*evidence traceability*):
- Skor menggabungkan besaran deviasi, kualitas kelengkapan data, dan frekuensi terjadinya pola.
- Angka ini murni digunakan untuk mengurutkan antrean tugas (*triaging queue*) pada dasbor Instruktur.
- **Larangan Desain:** Skor prioritas dilarang keras ditampilkan kepada pengguna awam sebagai "Skor Kesehatan Pasien" (*Health Risk Score*) karena dapat memicu kecemasan biologis yang keliru.

---
## 47. Entitas Wawasan Perilaku (Behavior Insight Entity)

Tabel `behavior_insights` menampung narasi penjelasan manusiawi yang dapat dipahami member:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key wawasan perilaku |
| `user_id` | `Foreign Key` | Pemilik wawasan (`users.id`) |
| `behavior_signal_id` | `Foreign Key NULL` | Sinyal anomali yang mendasari |
| `title` | `VARCHAR(200)` | Judul wawasan yang menarik empati |
| `observation` | `TEXT` | Fakta objektif yang teramati |
| `context` | `TEXT NULL` | Konteks situasi pemicu kebiasaan |
| `why_it_matters` | `TEXT` | Penjelasan dampak terhadap tubuh |
| `status` | `VARCHAR(30)` | Status relevansi wawasan |
| `generated_by` | `VARCHAR(30)` | Aktor pembuat: 'ENGINE', 'AI', 'HUMAN' |
| `expires_at` | `TIMESTAMP NULL` | Batas kedaluwarsa relevansi wawasan |
| `created_at` | `TIMESTAMP` | Waktu penerbitan wawasan |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan data wawasan |

---

## 48. Siklus Status Wawasan (Insight Status Enum)

Entitas `behavior_insights` menyajikan interpretasi edukatif berbasis bukti dalam bahasa ramah pengguna yang menerjemahkan arti sinyal deviasi:
- `ACTIVE`: Wawasan relevan dan aktif tampil di beranda aplikasi pengguna.
- `VIEWED`: Telah dibuka dan dibaca oleh pengguna.
- `DISMISSED`: Ditutup oleh pengguna karena dianggap telah dipahami.
- `EXPIRED`: Telah melewati jendela waktu relevansi (misal: lebih dari 7 hari).
- `SUPERSEDED`: Digantikan oleh wawasan baru yang membawa data lebih mutakhir.

---
## 49. Struktur Bukti Kuantitatif Wawasan (Structured Insight Evidence)

Untuk menjamin prinsip keterjelasan (*Explainable AI/Engine*), wawasan dapat menyertakan atribut bukti kuantitatif:
- `baseline_value`: Nilai acuan normal member (e.g., $105\text{ mg/dL}$).
- `current_value`: Nilai rata-rata pada periode anomali (e.g., $145\text{ mg/dL}$).
- `difference_value`: Besaran lonjakan deviasi (e.g., $+40\text{ mg/dL}$ atau $+38\%$).
- `data_points_count`: Jumlah pencatatan log yang menjadi dasar pembuktian wawasan.

Struktur ini memungkinkan kartu wawasan menampilkan grafik komparasi yang transparan dan dapat dipercaya.

---

## 50. Entitas Rekomendasi Tindakan (Recommendation Entity)

Entitas `recommendations` menyediakan opsi tindakan mikro terukur yang dapat diadopsi anggota secara mandiri untuk menindaklanjuti wawasan perilaku:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik rekomendasi |
| `user_id` | `Foreign Key` | Penerima rekomendasi (`users.id`) |
| `insight_id` | `Foreign Key NULL` | Wawasan pemicu rekomendasi |
| `type` | `VARCHAR(50)` | Kategori tindakan (HABIT, CHALLENGE) |
| `title` | `VARCHAR(200)` | Judul tindakan yang jelas & ringkas |
| `description` | `TEXT` | Panduan praktis pelaksanaan aksi |
| `status` | `VARCHAR(30)` | Status adopsi rekomendasi oleh user |
| `priority` | `SMALLINT` | Urutan prioritas penyajian |
| `expires_at` | `TIMESTAMP NULL` | Batas waktu berlakunya saran |
| `created_at` | `TIMESTAMP` | Waktu rekomendasi dirumuskan |
| `updated_at` | `TIMESTAMP` | Waktu status rekomendasi diperbarui |

---
## 51. Status Rekomendasi Tindakan (Recommendation Status Enum)

Siklus adopsi rekomendasi oleh member dikelola melalui status terstruktur:

```text
┌──────────────┐      Member Menerima Saran      ┌──────────────┐      Aksi Dijalankan      ┌──────────────┐
│ RECOMMENDED  ├────────────────────────────────►│   ACCEPTED   ├──────────────────────────►│   STARTED    │
└──────┬───────┘                                 └──────┬───────┘                           └──────┬───────┘
       │                                                │                                          │
       ├── Member Menolak ──► [ DISMISSED ]             └── Batal Dilakukan ──► [ CANCELLED ]      │
       │                                                                                           ▼ Target Terpenuhi
       └── Kadaluwarsa    ──► [ EXPIRED ]                                                   ┌──────────────┐
                                                                                            │  COMPLETED   │
                                                                                            └──────────────┘
```

- `RECOMMENDED`: Saran baru diterbitkan dan tampil di antarmuka member.
- `ACCEPTED`: Member menyetujui rekomendasi untuk dimasukkan ke dalam agenda harian.
- `STARTED`: Member mulai mencatat aktivitas yang berkaitan dengan rekomendasi.
- `COMPLETED`: Target perilaku yang direkomendasikan berhasil diselesaikan.
- `DISMISSED`: Member secara sadar menolak saran dengan alasan tertentu.
- `EXPIRED`: Rekomendasi tidak direspons hingga batas waktu berlakunya habis.
- `CANCELLED`: Dibatalkan oleh member atau digantikan oleh intervensi baru.

---

## 52. Tautan Objek Aksi Rekomendasi (Recommendation Action Binding)

Entitas `interventions` menampung rencana bimbingan dan resep tindakan terarah yang dirancang langsung oleh Instruktur profesional (*Human-in-the-Loop*):

```text
                                 ┌────────────────────────┐
                                 │     RECOMMENDATION     │
                                 └───────────┬────────────┘
                                             │
             ┌───────────────────┬───────────┼───────────┬───────────────────┐
             ▼                   ▼           ▼           ▼                   ▼
       ┌───────────┐       ┌───────────┐┌───────────┐┌───────────┐       ┌───────────┐
       │ Reminder  │       │ Challenge ││Interven-  ││ Tracking  │       │ Consulta- │
       │ Schedule  │       │Enrollment ││tion Ticket││  Action   │       │tion Booking│
       └───────────┘       └───────────┘└───────────┘└───────────┘       └───────────┘
```

Pengikatan ini memungkinkan pengguna mengklik *"Jadikan Pengingat Rutin"* atau *"Ikuti Challenge Terkait"* langsung dari kartu rekomendasi dengan satu ketukan.

---
## 53. Entitas Intervensi Perilaku (Behavioral Intervention Entity)

Tabel `interventions` merekam resep tindakan preventif terarah yang dirumuskan oleh Instruktur bimbingan:

| Kolom | Tipe Data | Definisi Kolom |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik tiket intervensi |
| `user_id` | `Foreign Key` | Member sasaran intervensi (`users`) |
| `instructor_id` | `Foreign Key` | Instruktur penanggung jawab |
| `created_by` | `Foreign Key` | Aktor pembuat tiket sebenarnya |
| `goal_id` | `Foreign Key NULL` | Sasaran kesehatan yang didukung |
| `behavior_signal_id` | `Foreign Key NULL` | Sinyal anomali yang memicu tindakan |
| `type` | `VARCHAR(50)` | Tipe: HABIT_CHANGE, NUTRITION_PLAN |
| `title` | `VARCHAR(200)` | Judul intervensi yang jelas |
| `description` | `TEXT` | Protokol langkah preventif terinci |
| `status` | `VARCHAR(30)` | Status siklus pelaksanaan tiket |
| `start_at` | `TIMESTAMP` | Waktu rencana intervensi dimulai |
| `due_at` | `TIMESTAMP` | Tenggat waktu evaluasi tindak lanjut |
| `completed_at` | `TIMESTAMP NULL` | Waktu konfirmasi penuntasan tiket |
| `created_at` | `TIMESTAMP` | Waktu pembuatan resep intervensi |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status intervensi |

---

## 54. Atribusi Pembuat Intervensi (Intervention Creator Attribution)

Tabel intervensi memisahkan antara konsep penanggung jawab bimbingan (`instructor_id`) dan pembuat rekaman fisik (`created_by`):
- **Audit Medikolegal:** Memungkinkan pelacakan jika seorang Admin atau Instruktur Pengganti membuat tiket atas nama Instruktur Utama selama masa delegasi tugas.
- **Sistem vs Manusia:** Membedakan apakah intervensi diinisiasi langsung oleh Instruktur Manusia (`HUMAN_INSTRUCTOR`) atau diterbitkan melalui persetujuan template program terakreditasi (`SYSTEM_PROTOCOL`).

---

## 55. Siklus Status Intervensi (Intervention Status Lifecycle)

Status intervensi dikendalikan melalui tahapan kepatuhan yang ketat:

```text
[ DRAFT ] ──► [ ACTIVE ] ──┬──► [ COMPLETED ] (Member Menuntaskan Komitmen)
                           │
                           ├──► [ PAUSED ]    (Penundaan Sementara Karena Kondisi)
                           │
                           ├──► [ EXPIRED ]   (Jatuh Tempo Tanpa Evaluasi)
                           │
                           └──► [ CANCELLED ] (Dibatalkan / Diganti Intervensi Lain)
```

---

## 56. Entitas Evaluasi Luaran Intervensi (Intervention Outcome Entity)

Entitas `intervention_outcomes` mencatat evaluasi formal atas efektivitas rencana intervensi setelah periode bimbingan selesai:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik evaluasi luaran |
| `intervention_id` | `Foreign Key` | Tiket intervensi terkait (UNIQUE) |
| `status` | `VARCHAR(30)` | Status peninjauan: DRAFT, FINAL |
| `observation_start` | `TIMESTAMP` | Awal rentang waktu pemantauan hasil |
| `observation_end` | `TIMESTAMP` | Akhir rentang waktu pemantauan hasil |
| `result_type` | `VARCHAR(30)` | Hasil evaluasi komparatif |
| `summary` | `TEXT` | Catatan naratif kesimpulan instruktur |
| `evaluated_by` | `Foreign Key` | Instruktur yang melakukan evaluasi |
| `created_at` | `TIMESTAMP` | Waktu pencatatan evaluasi |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan ulasan |

Kategori `result_type` terstandar mencakup:
- `IMPROVING`: Parameter metrik biologis menunjukkan perbaikan signifikan mendekati target.
- `STABLE`: Kestabilan tercapai tanpa adanya deviasi berisiko lebih lanjut.
- `UNCHANGED`: Pola kebiasaan belum menunjukkan respons adaptasi yang memadai.
- `DECLINING`: Metrik mengalami penurunan kualitas; memerlukan kalibrasi rencana aksi.
- `INSUFFICIENT_DATA`: Data pencatatan member tidak mencukupi untuk menarik kesimpulan.

---
## 57. Entitas Komparasi Perilaku Sebelum-Sesudah (Behavior Outcome Entity)

Entitas `behavior_outcomes` mendokumentasikan luaran perilaku jangka panjang anggota untuk memverifikasi apakah intervensi berhasil membentuk kebiasaan berkelanjutan:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik komparasi |
| `user_id` | `Foreign Key` | Member pemilik data (`users.id`) |
| `intervention_id` | `Foreign Key NULL` | Relasi ke tiket intervensi terkait |
| `metric_type` | `VARCHAR(50)` | Metrik yang diukur (glucose, steps) |
| `before_value` | `DECIMAL(12,4)` | Nilai rata-rata sebelum intervensi |
| `after_value` | `DECIMAL(12,4)` | Nilai rata-rata sesudah intervensi |
| `before_window` | `INT UNSIGNED` | Durasi observasi awal (dalam hari) |
| `after_window` | `INT UNSIGNED` | Durasi observasi akhir (dalam hari) |
| `outcome_type` | `VARCHAR(30)` | Klasifikasi pergeseran tren |
| `evaluated_at` | `TIMESTAMP` | Waktu evaluasi komputasi dijalankan |

> [!CAUTION]
> Nilai komparasi sebelum-sesudah ini murni menunjukkan **korelasi temporal operasional**, bukan pembuktian kausalitas klinis mutlak (*causality claim*). Faktor eksternal seperti kepatuhan obat dan stres harian tetap harus dipertimbangkan oleh dokter.

---
## 58. Entitas Versi Aturan Perilaku (Behavior Rule Version Entity)

Entitas `behavior_rule_versions` mengelola tata kelola parameter logika algoritma mesin perilaku guna menjamin reproduktibilitas analisis ilmiah:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik versi aturan |
| `rule_key` | `VARCHAR(100)` | Kunci pengenal aturan deteksi |
| `version` | `VARCHAR(20)` | Nomor semantik versi (e.g. '2.1.0') |
| `configuration` | `JSON` | Bobot ambang batas, window & formula |
| `status` | `VARCHAR(30)` | Status: DRAFT, ACTIVE, DEPRECATED |
| `effective_from` | `TIMESTAMP` | Waktu aturan mulai berlaku aktif |
| `effective_until` | `TIMESTAMP NULL` | Waktu aturan dipensiunkan |
| `created_by` | `Foreign Key` | Administrator / Engineer pembuat |
| `approved_by` | `Foreign Key NULL` | Tim Medis peninjau (*Sign-off*) |
| `created_at` | `TIMESTAMP` | Waktu inisiasi entitas |
| `updated_at` | `TIMESTAMP` | Waktu modifikasi parameter |

---
## 59. Tujuan Penomoran Versi Aturan (Rule Versioning Purpose)

Penomoran versi aturan memungkinkan audit medikolegal menjawab pertanyaan kritis di masa depan:

> **Pertanyaan Kunci Forensik:** *"Berdasarkan formula matematis apa sinyal deviasi ini diterbitkan pada tanggal tersebut?"*

```text
Contoh Penelusuran:
Sinyal ID: SIG-89421-GLUCOSE
Rule Key: 'postprandial_spike_detector'
Rule Version: '2.0' (Berlaku: Jan 2026 - Sekarang)
Konfigurasi:
  - baseline_window: 14 hari
  - spike_threshold: +40 mg/dL di atas rata-rata baseline
  - confidence_minimum: 85%
```

---

## 60. Entitas Rekam Jejak Analisis Perilaku (Data Analysis Trace Entity)

Entitas `behavior_analysis_runs` merekam telemetri komprehensif dari setiap siklus eksekusi kalkulasi latar belakang (*background job telemetries*):

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key jejak komputasi |
| `user_id` | `Foreign Key` | Member yang sedang dianalisis |
| `analysis_type` | `VARCHAR(50)` | Jenis tugas: BASELINE, SIGNAL, ML |
| `input_reference` | `VARCHAR(100) NULL` | Rentang ID rekam medis yang dibaca |
| `rule_version` | `VARCHAR(20)` | Versi aturan yang digunakan |
| `status` | `VARCHAR(30)` | SUCCESS, PARTIAL, FAILED |
| `started_at` | `TIMESTAMP` | Waktu pemrosesan job dimulai |
| `completed_at` | `TIMESTAMP NULL` | Waktu pemrosesan job berakhir |
| `error_code` | `VARCHAR(50) NULL` | Kode galat jika terjadi kegagalan |

---
## 61. Entitas Sesi Konsultasi (Consultation Entity)

Entitas `consultations` memfasilitasi penjadwalan dan dokumentasi sesi bimbingan tatap muka langsung antara anggota dan Instruktur profesional:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik tiket konsultasi |
| `member_id` | `Foreign Key` | Pengguna bimbingan (`users.id`) |
| `instructor_id` | `Foreign Key` | Instruktur penyedia sesi (`users.id`) |
| `program_id` | `Foreign Key NULL` | Program kohor yang menaungi sesi |
| `status` | `VARCHAR(30)` | Status sesi konsultasi |
| `scheduled_start` | `TIMESTAMP` | Waktu mulai sesi terjadwal |
| `scheduled_end` | `TIMESTAMP` | Waktu selesai sesi terjadwal |
| `purpose` | `VARCHAR(255)` | Agenda pembahasan konsultasi |
| `meeting_url` | `VARCHAR(255) NULL` | Tautan panggilan video terenkripsi |
| `notes_reference` | `Foreign Key NULL` | Catatan evaluasi pasca-konsultasi |
| `cancelled_at` | `TIMESTAMP NULL` | Rekam waktu jika dibatalkan |
| `completed_at` | `TIMESTAMP NULL` | Rekam waktu jika sukses selesai |
| `created_at` | `TIMESTAMP` | Waktu pembuatan reservasi slot |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status jadwal |

---
## 62. Siklus Status Sesi Konsultasi (Consultation Status Lifecycle)

Alur manajemen reservasi sesi konsultasi tatap muka:

```text
┌──────────────┐      Konfirmasi Otomatis/Manual      ┌──────────────┐      Sesi Terlaksana      ┌──────────────┐
│  REQUESTED   ├─────────────────────────────────────►│  CONFIRMED   ├──────────────────────────►│  COMPLETED   │
└──────┬───────┘                                      └──────┬───────┘                           └──────────────┘
       │                                                     │
       ├── Ditolak / Tidak Cocok                             ├── Perubahan Waktu ──► [ RESCHEDULED ]
       ▼                                                     │
┌──────────────┐                                             ├── Dibatalkan      ──► [ CANCELLED ]
│   EXPIRED    │                                             │
└──────────────┘                                             └── Member Absen    ──► [ NO_SHOW ]
```

---

## 63. Entitas Ketersediaan Waktu Instruktur (Instructor Availability Entity)

Entitas `instructor_availabilities` mendefinisikan jadwal kerja reguler mingguan yang dibuka oleh Instruktur untuk menerima reservasi sesi konsultasi:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key slot ketersediaan |
| `instructor_id` | `Foreign Key` | Instruktur pemilik jadwal (`users`) |
| `day_of_week` | `TINYINT UNSIGNED` | Hari dalam minggu (0=Minggu, 6=Sabtu |
| `start_time` | `TIME` | Jam buka slot layanan |
| `end_time` | `TIME` | Jam tutup slot layanan |
| `timezone` | `VARCHAR(50)` | Zona waktu resmi ketersediaan |
| `is_active` | `BOOLEAN` | Status keaktifan jadwal rutin |
| `created_at` | `TIMESTAMP` | Waktu pendaftaran jadwal |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan jam kerja |

---
## 64. Entitas Pengecualian Jadwal Instruktur (Availability Exceptions Entity)

Entitas `instructor_availability_exceptions` mengelola penyesuaian khusus terhadap jadwal rutin instruktur, seperti hari libur atau cuti profesional:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key pengecualian |
| `instructor_id` | `Foreign Key` | Instruktur terkait (`users.id`) |
| `date` | `DATE` | Tanggal spesifik pengecualian |
| `start_time` | `TIME NULL` | Batas awal waktu yang diblokir |
| `end_time` | `TIME NULL` | Batas akhir waktu yang diblokir |
| `type` | `VARCHAR(30)` | HOLIDAY, LEAVE, BLOCKED_SLOT, EXTRA |
| `reason` | `VARCHAR(255) NULL` | Alasan penyesuaian ketersediaan |
| `created_at` | `TIMESTAMP` | Waktu pencatatan pengecualian |
| `updated_at` | `TIMESTAMP` | Waktu modifikasi rekaman |

---
## 65. Entitas Kontrak Penugasan Instruktur-Member (Assignment Entity)

Entitas `instructor_member_assignments` bertindak sebagai kontrak yuridis aktif yang menjadi prasyarat mutlak bagi Instruktur untuk membaca rekam kesehatan anggota:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik kontrak penugasan |
| `instructor_id` | `Foreign Key` | Instruktur bimbingan (`users.id`) |
| `member_id` | `Foreign Key` | Member yang dibimbing (`users.id`) |
| `program_id` | `Foreign Key NULL` | Program kohor yang menaungi relasi |
| `status` | `VARCHAR(30)` | Status keaktifan kontrak bimbingan |
| `starts_at` | `TIMESTAMP` | Tanggal efektif mulai bimbingan |
| `ends_at` | `TIMESTAMP NULL` | Tanggal resmi bimbingan berakhir |
| `assigned_by` | `Foreign Key` | Admin yang menetapkan penugasan |
| `created_at` | `TIMESTAMP` | Waktu pembuatan penugasan |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status kontrak |

---
## 66. Siklus Status Penugasan Instruktur (Assignment Status Enum)

Status kontrak relasi bimbingan:
- `PENDING`: Penugasan telah dirancang namun menunggu tanggal efektif program dimulai.
- `ACTIVE`: Kontrak aktif; instruktur memiliki hak otorisasi membaca sinyal member.
- `PAUSED`: Bimbingan ditangguhkan sementara atas permohonan cuti member.
- `ENDED`: Masa program telah selesai dengan sukses; akses mutasi ditutup.
- `REVOKED`: Akses bimbingan dicabut seketika akibat rotasi tugas atau evaluasi kepatuhan.

---

## 67. Entitas Program Bimbingan Kohor (Program Entity)

Entitas `programs` mengelola kurikulum bimbingan kesehatan terstruktur (misal: Program Pengelolaan Glukosa 8 Minggu) yang diikuti kohor anggota:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik program |
| `name` | `VARCHAR(150)` | Nama program bimbingan kohor |
| `slug` | `VARCHAR(150)` | Identifikasi ramah URL (UNIQUE) |
| `description` | `TEXT` | Penjelasan kurikulum & sasaran sehat |
| `status` | `VARCHAR(30)` | Status ketersediaan program |
| `starts_at` | `DATE` | Tanggal resmi pembukaan kohor |
| `ends_at` | `DATE NULL` | Tanggal penutupan kohor |
| `created_by` | `Foreign Key` | Administrator penyusun program |
| `created_at` | `TIMESTAMP` | Waktu inisiasi modul program |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan kurikulum |

---
## 68. Siklus Status Program Kohor (Program Status Lifecycle)

Status operasional kurikulum program:
- `DRAFT`: Modul sedang disusun dan belum dibuka untuk pendaftaran.
- `ACTIVE`: Kohor sedang berjalan dan peserta aktif mengikuti bimbingan.
- `PAUSED`: Aktivitas program ditangguhkan sementara untuk pemeliharaan kurikulum.
- `COMPLETED`: Seluruh tahapan kohor telah berakhir secara formal.
- `ARCHIVED`: Program ditutup permanen dan seluruh data beralih ke mode baca-saja (*read-only*).

---

## 69. Entitas Keanggotaan Peserta Program (Program Membership Entity)

Entitas `program_members` mencatat status partisipasi, progres kurikulum, dan capaian target anggota dalam program bimbingan tertentu:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik pendaftaran |
| `program_id` | `Foreign Key` | Menghubungkan ke `programs.id` |
| `user_id` | `Foreign Key` | Member peserta (`users.id`) |
| `status` | `VARCHAR(30)` | Status: ENROLLED, ACTIVE, COMPLETED |
| `joined_at` | `TIMESTAMP` | Waktu pendaftaran disetujui |
| `left_at` | `TIMESTAMP NULL` | Waktu pengunduran diri jika ada |
| `created_at` | `TIMESTAMP` | Waktu pembuatan entitas |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan progres |

Kunci komposit unik diterapkan pada pasangan `(program_id, user_id)` untuk mencegah pendaftaran ganda pada kohor yang sama.

---
## 70. Entitas Instruktur Pengampu Program (Program Instructor Entity)

Entitas `program_instructors` memetakan alokasi tim instruktur dan penanggung jawab medis yang mengampu kurikulum suatu program:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key pengampu program |
| `program_id` | `Foreign Key` | Menghubungkan ke `programs.id` |
| `instructor_id` | `Foreign Key` | Instruktur pengampu (`users.id`) |
| `role` | `VARCHAR(50)` | LEAD_INSTRUCTOR, SPECIALIST, COACH |
| `created_at` | `TIMESTAMP` | Waktu penugasan ke kurikulum |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan peran pengampu |

---
## 71. Entitas Tantangan Hidup Sehat (Challenge Entity)

Entitas `challenges` menyajikan aktivitas mikro berbatas waktu yang dirancang untuk membangun momentum dan keterikatan positif anggota:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik tantangan |
| `program_id` | `Foreign Key NULL` | Keterikatan program (jika bertarget) |
| `name` | `VARCHAR(150)` | Judul tantangan (e.g., 'Bebas Gula') |
| `slug` | `VARCHAR(150)` | Slug URL unik tantangan |
| `description` | `TEXT` | Panduan & aturan main tantangan |
| `goal_type` | `VARCHAR(50)` | Tipe kebiasaan: NUTRITION, STEPS |
| `duration_days` | `SMALLINT UNSIGNED` | Target durasi hari (misal: 7 Hari) |
| `points_reward` | `INT UNSIGNED` | Hadiah poin gamifikasi penyelesaian |
| `status` | `VARCHAR(30)` | DRAFT, ACTIVE, COMPLETED, ARCHIVED |
| `starts_at` | `TIMESTAMP` | Waktu tantangan mulai dibuka publik |
| `ends_at` | `TIMESTAMP NULL` | Batas akhir penutupan tantangan |
| `created_by` | `Foreign Key` | Admin pembuat modul tantangan |
| `created_at` | `TIMESTAMP` | Waktu inisiasi data tantangan |
| `updated_at` | `TIMESTAMP` | Waktu modifikasi parameter |

---
## 72. Entitas Tugas Harian Tantangan (Challenge Task Entity)

Entitas `challenge_tasks` mendefinisikan rincian misi harian terukur yang wajib diselesaikan anggota untuk menuntaskan suatu tantangan:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik misi |
| `challenge_id` | `Foreign Key` | Terhubung ke `challenges.id` |
| `title` | `VARCHAR(200)` | Judul misi harian |
| `description` | `TEXT NULL` | Instruksi teknis penyelesaian misi |
| `type` | `VARCHAR(50)` | LOG_MEAL, STEPS_TARGET, SLEEP_CHECK |
| `target_value` | `DECIMAL(10,2)` | Angka target capaian (e.g. 8000) |
| `target_unit` | `VARCHAR(30)` | Satuan target (steps, minutes) |
| `sort_order` | `SMALLINT` | Urutan hari pelaksanaan misi |
| `created_at` | `TIMESTAMP` | Waktu inisiasi misi |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan misi |

---
## 73. Entitas Partisipasi Tantangan (Challenge Participation Entity)

Entitas `challenge_participations` melacak pendaftaran, tanggal mulai, dan status kemajuan anggota dalam tantangan tertentu:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key tiket partisipasi |
| `challenge_id` | `Foreign Key` | Terhubung ke `challenges.id` |
| `user_id` | `Foreign Key` | Member peserta (`users.id`) |
| `status` | `VARCHAR(30)` | ENROLLED, IN_PROGRESS, COMPLETED |
| `progress_percent` | `DECIMAL(5,2)` | Persentase capaian misi (0..100%) |
| `joined_at` | `TIMESTAMP` | Waktu menekan tombol ikuti |
| `started_at` | `TIMESTAMP NULL` | Waktu menyelesaikan misi pertama |
| `completed_at` | `TIMESTAMP NULL` | Waktu seluruh misi tuntas 100% |
| `created_at` | `TIMESTAMP` | Waktu inisiasi partisipasi |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan progres partisipasi |

---
## 74. Entitas Penyelesaian Tugas Tantangan (Task Completion Entity)

Entitas `challenge_task_completions` memverifikasi penyelesaian tugas tantangan harian beserta bukti data kesehatan yang mendukungnya:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key bukti penuntasan |
| `participation_id` | `Foreign Key` | Terhubung ke tabel partisipasi |
| `challenge_task_id` | `Foreign Key` | Terhubung ke misi yang dituntaskan |
| `completed_at` | `TIMESTAMP` | Waktu penyelesaian misi |
| `evidence_reference` | `VARCHAR(100) NULL` | Tautan ke log kesehatan pemicu |
| `created_at` | `TIMESTAMP` | Waktu penyimpanan bukti penuntasan |
| `updated_at` | `TIMESTAMP` | Waktu modifikasi status bukti |

> [!NOTE]
> Kunci unik komposit diterapkan pada pasangan `(participation_id, challenge_task_id)` guna menjamin prinsip idempoten: satu misi harian tidak dapat diklaim dua kali oleh peserta yang sama.

---
## 75. Entitas Buku Besar Poin Gamifikasi (Points Ledger Entity)

Entitas `points_ledger` menerapkan arsitektur buku besar berbasis peristiwa (*event-sourced ledger*) yang mencatat setiap mutasi penambahan dan penukaran poin secara imutabel:

| Kolom | Tipe Data | Definisi Kolom |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key transaksi buku besar |
| `user_id` | `Foreign Key` | Member penerima poin (`users.id`) |
| `event_type` | `VARCHAR(50)` | Pemicu: CHALLENGE_REWARD, STREAK_BONUS |
| `points` | `INT` | Nilai mutasi poin (+100, -50 redeem) |
| `reference_type` | `VARCHAR(100) NULL` | Nama kelas model entitas pemicu |
| `reference_id` | `VARCHAR(100) NULL` | ID entitas pemicu penambahan poin |
| `created_at` | `TIMESTAMP` | Waktu transaksi dicatat imutabel |

---
## 76. Prinsip Desain Buku Besar Gamifikasi (Points Ledger Principle)

Model buku besar menjamin saldo poin pengguna selalu dapat diverifikasi ulang melalui perhitungan matematis:

> **Kalkulasi Saldo Poin Terkini:** $\text{User Balance} = \sum_{i=1}^{n} \text{points}_i$

- **Mencegah Klaim Ganda (*Double-Credit Prevention*):** Kunci unik komposit pada `(user_id, reference_type, reference_id)` mencegah eksploitasi di mana pengiriman sinyal jaringan yang lambat menyebabkan pemberian reward dua kali untuk satu pencapaian.
- **Auditabilitas Akuntansi:** Penghitungan riwayat transaksi dapat dilacak secara forensik jika member mengajukan klaim ketidaksesuaian perolehan poin.

---

## 77. Entitas Master Lencana Prestasi (Achievement Entity)

Entitas `achievements` mengelola katalog medali apresiasi dan lencana kebiasaan sehat yang dapat dibuka anggota:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik lencana |
| `key` | `VARCHAR(100)` | Kunci pengenal sistem (UNIQUE) |
| `name` | `VARCHAR(150)` | Nama lencana (e.g. 'Pahlawan Puasa') |
| `description` | `VARCHAR(255)` | Kriteria capaian untuk meraih medali |
| `category` | `VARCHAR(50)` | Kategori: CONSISTENCY, MILESTONE |
| `icon_path` | `VARCHAR(255)` | Tautan relatif aset grafis lencana |
| `rules_config` | `JSON` | Parameter evaluasi pemenuhan syarat |
| `status` | `VARCHAR(30)` | ACTIVE, DEPRECATED |
| `created_at` | `TIMESTAMP` | Waktu inisiasi lencana master |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan aturan lencana |

---
## 78. Entitas Perolehan Lencana Pengguna (User Achievement Entity)

Entitas `user_achievements` merekam riwayat perolehan lencana yang berhasil dibuka anggota beserta waktu pencapaiannya:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key perolehan lencana |
| `user_id` | `Foreign Key` | Member pemilik lencana (`users.id`) |
| `achievement_id` | `Foreign Key` | Lencana master (`achievements.id`) |
| `earned_at` | `TIMESTAMP` | Waktu resmi pemenuhan syarat medali |
| `reference_type` | `VARCHAR(100) NULL` | Entitas pembuktian prestasi |
| `reference_id` | `VARCHAR(100) NULL` | ID entitas pembuktian |
| `created_at` | `TIMESTAMP` | Waktu penyimpanan perolehan medali |
| `updated_at` | `TIMESTAMP` | Waktu sinkronisasi data |

Kunci komposit unik pada `(user_id, achievement_id)` menjamin lencana yang bersifat sekali seumur hidup (*one-time badge*) tidak diduplikasi di akun pengguna.

---
## 79. Entitas Deret Hari Kebiasaan (Streak Entity)

Entitas `user_streaks` mengelola penghitungan rentetan hari berturut-turut (*consistency streaks*) dalam menjaga rutinitas pencatatan data hidup sehat:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key entitas streak |
| `user_id` | `Foreign Key` | Member pemilik rutinitas (`users`) |
| `type` | `VARCHAR(50)` | DAILY_LOGGING, HABIT_COMPLIANCE |
| `current_count` | `INT UNSIGNED` | Jumlah hari berurutan saat ini |
| `best_count` | `INT UNSIGNED` | Rekor deret hari terpanjang member |
| `started_at` | `DATE` | Tanggal awal deret aktif dimulai |
| `last_activity_at` | `DATE` | Tanggal terakhir aktivitas tercatat |
| `created_at` | `TIMESTAMP` | Waktu pencatatan deret pertama kali |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan rekor deret |

> [!IMPORTANT]
> Deret hari (*streak*) adalah instrumen motivasi psikologis murni, **bukan skor kesehatan fisiologis**. Jika seorang member terputus streak-nya karena sakit, antarmuka menyajikan pesan pemulihan yang berempati tanpa hukuman penalti poin.

---
## 80. Entitas Postingan Komunitas (Community Post Entity)

Entitas `community_posts` memfasilitasi ruang diskusi positif, berbagi kisah perjalanan kesehatan, dan tanya-jawab edukatif antar-anggota komunitas:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik postingan |
| `user_id` | `Foreign Key` | Penulis postingan (`users.id`) |
| `category_id` | `Foreign Key` | Topik forum diskusi |
| `title` | `VARCHAR(200)` | Judul topik diskusi |
| `body` | `TEXT` | Konten naratif postingan |
| `visibility` | `VARCHAR(30)` | Lingkup keterlihatan postingan |
| `status` | `VARCHAR(30)` | PUBLISHED, UNDER_REVIEW, HIDDEN |
| `created_at` | `TIMESTAMP` | Waktu publikasi postingan |
| `updated_at` | `TIMESTAMP` | Waktu pengeditan postingan |
| `deleted_at` | `TIMESTAMP NULL` | Jejak waktu hapus lunak postingan |

---
## 81. Tingkat Keterlihatan Postingan (Community Visibility Enum)

Cakupan sebaran diskusi forum:
- `PUBLIC`: Terbuka untuk seluruh anggota komunitas terdaftar di AEVYRA.
- `COMMUNITY`: Dibatasi untuk kelompok minat atau topik kesehatan spesifik.
- `PROGRAM`: Terisolasi hanya untuk rekan peserta dalam satu kohor bimbingan yang sama.
- `PRIVATE`: Mode draf pribadi yang hanya dapat dibaca oleh penulis sendiri.

---

## 82. Entitas Komentar Komunitas (Community Comment Entity)

Entitas `community_comments` menampung komentar dan diskusi bersarang (*threaded discussions*) pada postingan komunitas:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik komentar |
| `post_id` | `Foreign Key` | Postingan induk (`community_posts`) |
| `user_id` | `Foreign Key` | Penulis komentar (`users.id`) |
| `body` | `TEXT` | Teks komentar balasan |
| `status` | `VARCHAR(30)` | PUBLISHED, HIDDEN, REMOVED |
| `created_at` | `TIMESTAMP` | Waktu penulisan komentar |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan teks komentar |
| `deleted_at` | `TIMESTAMP NULL` | Jejak waktu hapus lunak komentar |

---
## 83. Entitas Reaksi Komunitas (Community Reaction Entity)

Entitas `community_reactions` mencatat apresiasi positif (*likes, celebrates, supports*) anggota terhadap konten komunitas tanpa memicu kompetisi toksik:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key reaksi |
| `user_id` | `Foreign Key` | Pemberi reaksi (`users.id`) |
| `reactable_type` | `VARCHAR(100)` | Polimorfis: Post atau Comment |
| `reactable_id` | `VARCHAR(100)` | ID entitas target reaksi |
| `reaction_type` | `VARCHAR(30)` | LIKE, SUPPORT, CELEBRATE, EMPATHY |
| `created_at` | `TIMESTAMP` | Waktu pemberian reaksi |

Kunci unik komposit pada `(user_id, reactable_type, reactable_id)` memastikan seorang pengguna hanya dapat menyematkan satu jenis reaksi per konten.

---
## 84. Entitas Pelaporan Konten Komunitas (Community Report Entity)

Entitas `community_reports` menyediakan kanal bagi anggota untuk melaporkan konten atau interaksi komunitas yang melanggar standar keselamatan:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key aduan laporan |
| `reporter_id` | `Foreign Key` | Member pelapor (`users.id`) |
| `target_type` | `VARCHAR(100)` | Entitas terlapor (Post / Comment) |
| `target_id` | `VARCHAR(100)` | ID entitas konten yang dilaporkan |
| `reason` | `VARCHAR(50)` | Kategori: SPAM, MEDICAL_MISINFO, HATE |
| `description` | `TEXT NULL` | Keterangan tambahan bukti laporan |
| `status` | `VARCHAR(30)` | PENDING, INVESTIGATING, RESOLVED |
| `reviewed_by` | `Foreign Key NULL` | Moderator/Admin peninjau laporan |
| `reviewed_at` | `TIMESTAMP NULL` | Waktu tindakan moderasi diambil |
| `resolution` | `VARCHAR(50) NULL` | DISMISSED, CONTENT_REMOVED, WARNED |
| `created_at` | `TIMESTAMP` | Waktu pelaporan diajukan |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status laporan |

---
## 85. Entitas Tindakan Moderasi Komunitas (Moderation Action Entity)

Entitas `moderation_actions` merekam jejak tindakan penegakan disiplin konten yang dieksekusi oleh staf moderator atau Administrator:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key tindakan moderasi |
| `moderator_id` | `Foreign Key` | Staf penindak (`users.id`) |
| `target_type` | `VARCHAR(100)` | Objek sanksi (User, Post, Comment) |
| `target_id` | `VARCHAR(100)` | ID objek yang dikenai sanksi |
| `action` | `VARCHAR(50)` | HIDE_POST, DELETE_POST, BAN_USER |
| `reason` | `TEXT` | Justifikasi pelanggaran standar |
| `created_at` | `TIMESTAMP` | Waktu eksekusi sanksi dicatat |

---
## 86. Entitas Keanggotaan Berlangganan (Membership Entity)

Entitas `memberships` melacak status langganan aktif, masa berlaku layanan, dan riwayat paket keanggotaan pengguna:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik transaksi langganan |
| `user_id` | `Foreign Key` | Member pelanggan (`users.id`) |
| `tier_id` | `Foreign Key` | Paket tingkatan (`membership_tiers`) |
| `status` | `VARCHAR(30)` | Status langganan aktif/kedaluwarsa |
| `starts_at` | `TIMESTAMP` | Waktu awal hak akses dimulai |
| `ends_at` | `TIMESTAMP NULL` | Batas akhir masa berlaku langganan |
| `created_at` | `TIMESTAMP` | Waktu transaksi dicatat di database |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status langganan |

---
## 87. Entitas Paket Tingkatan Layanan (Membership Tier Entity)

Entitas `membership_tiers` mendefinisikan tingkatan paket layanan berlangganan (misal: Free, Pro, Premium Health Cohort):

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key unik paket |
| `name` | `VARCHAR(50)` | Nama tingkatan: Silver, Gold, Plat |
| `slug` | `VARCHAR(50)` | Slug pengenal sistem (UNIQUE) |
| `description` | `TEXT` | Ringkasan fasilitas yang didapat |
| `price` | `DECIMAL(12,2)` | Biaya langganan |
| `currency` | `VARCHAR(3)` | Mata uang transaksi (e.g. 'IDR') |
| `billing_interval` | `VARCHAR(20)` | Siklus: MONTHLY, QUARTERLY, ANNUAL |
| `status` | `VARCHAR(30)` | Status ketersediaan paket: ACTIVE |
| `created_at` | `TIMESTAMP` | Waktu pembuatan katalog |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan tarif / deskripsi |

---
## 88. Entitas Fitur Tingkatan Keanggotaan (Membership Features Entity)

Entitas `membership_features` memetakan kuota fitur dan batas akses spesifik untuk setiap tingkatan paket keanggotaan:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key pemetaan fitur |
| `membership_tier_id` | `Foreign Key` | Terhubung ke `membership_tiers.id` |
| `feature_key` | `VARCHAR(100)` | Kunci: 'ai_chats', 'consultations' |
| `limit_value` | `INT` | Batas kuota (-1 = Kuota Tak Terbatas |
| `configuration` | `JSON NULL` | Parameter izin fitur lanjutan |
| `created_at` | `TIMESTAMP` | Waktu inisiasi entitas |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan kuota fitur |

---
## 89. Siklus Status Keanggotaan (Membership Status Lifecycle)

Status operasional langganan member:
- `PENDING`: Pembayaran sedang diverifikasi oleh gateway transaksi.
- `ACTIVE`: Langganan aktif; member berhak mengakses seluruh kuota fitur tingkatan.
- `PAUSED`: Penangguhan sementara fasilitas bimbingan atas permintaan cuti member.
- `EXPIRED`: Masa langganan telah berakhir; akun kembali ke tingkatan dasar (*Silver/Free*).
- `CANCELLED`: Pembatalan perpanjangan otomatis di akhir periode berjalan.

---

## 90. Batasan Etis Konseptual Membership (Membership Boundary Principle)

AEVYRA memisahkan secara tegas model bisnis keanggotaan dari integritas keselamatan kesehatan:

> [!WARNING]
> **Prinsip Mutlak:** Tingkatan Membership $\neq$ Tingkat Keparahan atau Prioritas Medis.

- Membership adalah model tata kelola fasilitas layanan bernilai tambah (*service access tier*), seperti alokasi pendampingan personal instruktur manusia atau sesi konsultasi tatap muka.
- Membership **bukanlah penentu skor kesehatan** ataupun penentu prioritas triase klinis. Seluruh member pada tingkatan apa pun berhak mendapatkan perlindungan keselamatan dasar dan isolasi darurat yang setara.

---

## 91. Entitas Sesi Percakapan AI (AI Conversation Entity)

Entitas `ai_conversations` mengelola sesi percakapan tematik antara anggota dan asisten cerdas AEVYRA dengan isolasi konteks yang ketat:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik sesi percakapan |
| `user_id` | `Foreign Key` | Member pemilik sesi (`users.id`) |
| `context_type` | `VARCHAR(50) NULL` | Konteks awal: GLUCOSE_SPIKE, MEAL |
| `context_id` | `VARCHAR(100) NULL` | ID entitas data yang sedang dibahas |
| `status` | `VARCHAR(30)` | ACTIVE, ARCHIVED, ESCALATED |
| `title` | `VARCHAR(200)` | Judul ringkas topik dialog |
| `created_at` | `TIMESTAMP` | Waktu utas percakapan dibuka |
| `updated_at` | `TIMESTAMP` | Waktu respons pesan terakhir |
| `deleted_at` | `TIMESTAMP NULL` | Jejak waktu hapus lunak sesi |

---
## 92. Entitas Pesan Percakapan AI (AI Message Entity)

Entitas `ai_messages` menyimpan riwayat dialog percakapan secara kronologis dengan pemisahan peran (*system, user, assistant*):

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key pesan individual |
| `conversation_id` | `Foreign Key` | Utas induk (`ai_conversations.id`) |
| `role` | `VARCHAR(20)` | Peran: SYSTEM, USER, ASSISTANT, TOOL |
| `content` | `TEXT` | Teks isi pesan |
| `message_type` | `VARCHAR(30)` | Kategori format pesan |
| `model` | `VARCHAR(100)` | Nama model: 'gemini-2.5-flash', dll. |
| `provider` | `VARCHAR(50)` | Penyedia infrastruktur (Google, dsb) |
| `prompt_version` | `VARCHAR(20)` | Versi system instruction yang aktif |
| `created_at` | `TIMESTAMP` | Waktu pesan dikirimkan |

---
## 93. Tipe Pesan Percakapan AI (AI Message Types Enum)

Format pesan yang didukung dalam pipeline AI AEVYRA:
- `TEXT`: Pesan percakapan standar dalam format Markdown ramah baca.
- `TOOL_CALL`: Instruksi pemanggilan perkakas internal terstruktur (JSON RPC).
- `TOOL_RESULT`: Data balasan dari sistem internal yang disanitasi untuk AI.
- `SYSTEM_EVENT`: Peringatan sistem (e.g., penyerahan ke instruktur manusia).
- `ERROR`: Indikasi kegagalan transmisi API model AI yang tertangani dengan aman.

---

## 94. Entitas Eksekusi Perkakas AI (AI Tool Execution Entity)

Entitas `ai_tool_executions` merekam jejak forensik setiap kali model AI memanggil fungsi atau perkakas sistem (*function calling*):

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key eksekusi tool calling |
| `conversation_id` | `Foreign Key` | Utas percakapan terkait |
| `message_id` | `Foreign Key` | Pesan pemicu pemanggilan perkakas |
| `tool_name` | `VARCHAR(100)` | Nama fungsi (e.g. 'getGlucoseTrend') |
| `input_schema_ver` | `VARCHAR(20)` | Versi kontrak skema input |
| `input_hash` | `CHAR(64)` | Hash SHA-256 parameter masukan |
| `status` | `VARCHAR(30)` | AUTHORIZED, EXECUTED, BLOCKED, ERROR |
| `auth_result` | `VARCHAR(50)` | Hasil pengecekan izin data |
| `result_reference` | `VARCHAR(100) NULL` | ID referensi hasil yang disaring |
| `started_at` | `TIMESTAMP` | Waktu inisiasi eksekusi tool |
| `completed_at` | `TIMESTAMP NULL` | Waktu eksekusi selesai |

> [!CAUTION]
> Dilarang keras menyimpan payload teks mentah parameter input yang memuat data pribadi atau token sesi di dalam kolom tabel ini. Gunakan kolom `input_hash` untuk verifikasi integritas audit.

---
## 95. Entitas Versi Perintah Induk AI (AI Prompt Version Entity)

Entitas `ai_prompt_versions` mendokumentasikan riwayat dan variasi perintah induk (*system prompts*) guna memastikan konsistensi dan evaluasi mutu luaran AI:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key versi prompt |
| `prompt_key` | `VARCHAR(100)` | Kunci pengenal: 'copilot.lifestyle' |
| `version` | `VARCHAR(20)` | Nomor semantik versi instruksi |
| `prompt_type` | `VARCHAR(50)` | SYSTEM_INSTRUCTION, TOOL_DESCRIPTOR |
| `content_hash` | `CHAR(64)` | Hash SHA-256 isi teks instruksi |
| `status` | `VARCHAR(30)` | ACTIVE, DRAFT, RETIRED |
| `effective_from` | `TIMESTAMP` | Waktu instruksi mulai aktif |
| `effective_until` | `TIMESTAMP NULL` | Waktu instruksi dipensiunkan |
| `created_by` | `Foreign Key` | AI Engineer penyusun draf |
| `reviewed_by` | `Foreign Key NULL` | Clinical Lead peninjau batas medis |
| `created_at` | `TIMESTAMP` | Waktu pembuatan entitas |
| `updated_at` | `TIMESTAMP` | Waktu modifikasi parameter |

---
## 96. Entitas Peristiwa Pagar Pengaman AI (AI Safety Event Entity)

Entitas `ai_safety_events` mencatat setiap kali sistem pertahanan keamanan atau pagar pengaman klinis (*guardrails*) AI terpicu:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key log peristiwa keamanan |
| `conversation_id` | `Foreign Key` | Utas percakapan pemicu pagar aman |
| `message_id` | `Foreign Key` | Pesan spesifik yang melanggar aturan |
| `classification` | `VARCHAR(50)` | Kategori pelanggaran batas aman |
| `reason_code` | `VARCHAR(100)` | Kode aturan sistem yang terlanggar |
| `action_taken` | `VARCHAR(100)` | Tindakan mitigasi yang dieksekusi |
| `created_at` | `TIMESTAMP` | Waktu insiden keamanan tercatat |

Kategori klasifikasi mencakup:
- `DIAGNOSIS_REQUEST`: Pengguna meminta vonis diagnosis penyakit medis.
- `MEDICATION_REQUEST`: Pengguna meminta resep obat atau perubahan dosis insulin.
- `PROMPT_INJECTION`: Upaya jailbreak atau manipulasi instruksi sistem asisten.
- `EMERGENCY_SENSITIVE`: Deteksi gejala bahaya akut (nyeri dada, hipoglikemia berat).
- `PRIVACY_REQUEST`: Permintaan data pribadi pengguna lain yang tidak sah.

---
## 97. Entitas Eskalasi AI ke Manusia (AI Human Handoff Entity)

Entitas `ai_handoffs` mengelola protokol eskalasi otomatis dari dialog asisten AI ke Instruktur manusia ketika mendeteksi kebutuhan bimbingan mendalam:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key tiket eskalasi |
| `conversation_id` | `Foreign Key` | Utas dialog yang dialihkan |
| `user_id` | `Foreign Key` | Member yang membutuhkan pendampingan |
| `reason` | `VARCHAR(100)` | Alasan eskalasi: CLINICAL_QUERY, dsb |
| `status` | `VARCHAR(30)` | PENDING, ASSIGNED, RESOLVED |
| `assigned_to` | `Foreign Key NULL` | Instruktur penerima tugas (`users`) |
| `created_at` | `TIMESTAMP` | Waktu permintaan eskalasi dibuat |
| `updated_at` | `TIMESTAMP` | Waktu status tiket diperbarui |
| `resolved_at` | `TIMESTAMP NULL` | Waktu eskalasi selesai ditangani |

---
## 98. Entitas Notifikasi Pengguna (Notification Entity)

Entitas `notifications` menampung antrean pesan notifikasi personal lintas saluran (*in-app, push, email*) dengan prioritas pengiriman yang terkelola:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key notifikasi (UUID Laravel |
| `user_id` | `Foreign Key` | Penerima pesan (`users.id`) |
| `type` | `VARCHAR(150)` | Kelas notifikasi (e.g. Intervention) |
| `title` | `VARCHAR(200)` | Judul pemberitahuan yang memikat |
| `body` | `TEXT` | Isi pesan ringkas dan jelas |
| `data` | `JSON NULL` | Payload tautan navigasi (deep link) |
| `read_at` | `TIMESTAMP NULL` | Waktu pesan dibaca oleh pengguna |
| `delivered_at` | `TIMESTAMP NULL` | Waktu pesan berhasil diterima gawai |
| `created_at` | `TIMESTAMP` | Waktu notifikasi diterbitkan server |

> [!NOTE]
> Kolom payload `data` dilarang menyertakan rincian numerik gula darah atau diagnosis medis sensitif untuk mencegah bocornya data pribadi ke layar notifikasi gawai publik (*lock screen leakage*).

---
## 99. Entitas Preferensi Saluran Notifikasi (Notification Preferences Entity)

Entitas `notification_preferences` menyimpan kendali mandiri anggota atas saluran dan kategori notifikasi yang ingin diterimanya:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key preferensi |
| `user_id` | `Foreign Key` | Member pengatur (`users.id`) |
| `category` | `VARCHAR(50)` | REMINDERS, SIGNALS, COMMUNITY, SYSTEM |
| `channel` | `VARCHAR(30)` | PUSH, IN_APP, EMAIL, WHATSAPP |
| `enabled` | `BOOLEAN` | Status keaktifan saluran komunikasi |
| `quiet_hours_start` | `TIME NULL` | Jam mulai mode hening malam |
| `quiet_hours_end` | `TIME NULL` | Jam akhir mode hening malam |
| `created_at` | `TIMESTAMP` | Waktu penyimpanan awal |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan preferensi |

---
## 100. Entitas Pengingat Kebiasaan Mandiri (Reminder Entity)

Entitas `reminders` mengelola alarm mikro personal yang membantu anggota menjaga konsistensi kebiasaan harian (misal: pengingat hidrasi atau jalan santai):

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik pengingat |
| `user_id` | `Foreign Key` | Member pemilik pengingat (`users`) |
| `type` | `VARCHAR(50)` | MEAL_LOG, HYDRATION, POST_MEAL_WALK |
| `title` | `VARCHAR(150)` | Judul pengingat yang menyemangati |
| `description` | `VARCHAR(255) NULL` | Petunjuk singkat pelaksanaan aksi |
| `scheduled_at` | `TIME` | Waktu spesifik pengingat berbunyi |
| `timezone` | `VARCHAR(50)` | Zona waktu lokal member |
| `status` | `VARCHAR(30)` | ACTIVE, PAUSED, MUTED |
| `reference_type` | `VARCHAR(100) NULL` | Relasi ke sasaran atau intervensi |
| `reference_id` | `VARCHAR(100) NULL` | ID entitas pemicu pengingat |
| `created_at` | `TIMESTAMP` | Waktu pendaftaran pengingat |
| `updated_at` | `TIMESTAMP` | Waktu modifikasi jadwal pengingat |

---
## 101. Entitas Peristiwa Darurat Medis (Emergency Event Entity)

Entitas `emergency_events` mencatat peristiwa kritis saat anggota mengindikasikan kondisi darurat medis guna memicu pengalihan ke saluran medis resmi:

| Kolom | Tipe Data | Definisi Kolom |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik insiden darurat |
| `user_id` | `Foreign Key` | Member yang mengalami krisis |
| `type` | `VARCHAR(50)` | PANIC_BUTTON, HYPO_CRISIS, CHEST_PAIN |
| `loc_perm_status` | `VARCHAR(30)` | Status izin lokasi: GRANTED, DENIED |
| `loc_reference` | `VARCHAR(100) NULL` | ID referensi fasilitas faskes terdekat |
| `action_taken` | `VARCHAR(100)` | DIAL_119, NOTIFY_EMERGENCY_CONTACT |
| `created_at` | `TIMESTAMP` | Waktu peristiwa krisis tercatat |

> [!CAUTION]
> Dilarang keras menyimpan koordinat GPS garis lintang dan bujur presisi secara permanen di basis data tanpa enkripsi tingkat tinggi. Cukup simpan nama faskes rujukan terdekat atau hilangkan koordinat setelah proses panggilan darurat selesai.

---
## 102. Entitas Persetujuan Privasi Pengguna (Privacy Consent Entity)

Entitas `consents` menyimpan bukti persetujuan eksplisit anggota atas pengolahan data pribadi dan rekam kesehatan sesuai regulasi PDP/GDPR:

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key dokumen persetujuan |
| `user_id` | `Foreign Key` | Member pemberi persetujuan (`users`) |
| `consent_type` | `VARCHAR(50)` | Kategori izin pemrosesan data |
| `version` | `VARCHAR(20)` | Versi dokumen hukum (e.g. '1.0.0') |
| `status` | `VARCHAR(30)` | GRANTED, WITHDRAWN, EXPIRED |
| `granted_at` | `TIMESTAMP` | Waktu pengguna menyatakan setuju |
| `withdrawn_at` | `TIMESTAMP NULL` | Waktu persetujuan ditarik kembali |
| `created_at` | `TIMESTAMP` | Waktu pencatatan di basis data |
| `updated_at` | `TIMESTAMP` | Waktu pembaruan status izin |

---
## 103. Taksonomi Kategori Persetujuan (Consent Types Enum)

Pemisahan persetujuan data dilakukan secara granular (*Granular Opt-in*):
- `PRIVACY_POLICY`: Persetujuan terhadap ketentuan layanan dan kebijakan privasi umum.
- `HEALTH_DATA_PROCESSING`: Izin pemrosesan metrik biologis (glukosa, tidur, aktivitas).
- `AI_PERSONALIZATION`: Izin analisis data oleh model AI untuk memberikan rekomendasi gaya hidup.
- `INSTRUCTOR_DATA_SHARING`: Izin membagikan rekam kesehatan kepada Instruktur bimbingan.
- `COMMUNITY_PARTICIPATION`: Izin menampilkan profil publik di papan diskusi forum.
- `MARKETING`: Izin menerima penawaran program baru melalui surat elektronik.

---

## 104. Entitas Jejak Audit Forensik (Audit Log Entity)

Entitas `audit_logs` bertindak sebagai buku besar forensik imutabel (*Append-Only*) yang mencatat setiap aksi mutasi penting dalam ekosistem platform:

| Kolom | Tipe Data | Definisi Kolom |
| :--- | :--- | :--- |
| `id` | `UUIDv7 (Chronolog)` | Primary Key urut waktu (Time-sorted) |
| `actor_id` | `Foreign Key` | Pengguna pelaku aksi (`users.id`) |
| `actor_role` | `VARCHAR(50)` | Peran aktif pelaku pada saat aksi |
| `action` | `VARCHAR(100)` | Format terstandar 'resource.action' |
| `target_type` | `VARCHAR(100)` | Kelas entitas sasaran (Target Model) |
| `target_id` | `VARCHAR(100)` | ID unik objek yang diakses/dimutasi |
| `context` | `JSON NULL` | Payload perubahan nilai (old vs new) |
| `result` | `VARCHAR(20)` | ALLOWED, DENIED, ERROR |
| `request_id` | `UUID NULL` | ID korelasi permintaan HTTP |
| `ip_reference` | `VARCHAR(64)` | Hash alamat IP atau referensi aman |
| `created_at` | `TIMESTAMP` | Waktu audit presisi mikrodetik (UTC) |

---
## 105. Contoh Rekaman Jejak Audit (Audit Log Practical Example)

Contoh representasi data ketika seorang Instruktur membuka ringkasan kesehatan seorang member:

| Atribut Audit | Nilai Rekaman Sistem |
| :--- | :--- |
| id | '01923e7a-9b41-7c12-88f1-3a4b9c1d2e3f' |
| actor_id | 'usr_instructor_0812' |
| actor_role | 'instructor' |
| action | 'member.health_summary.viewed' |
| target_type | 'App\Models\MemberProfile' |
| target_id | 'usr_member_042' |
| context | {"program_id": 14, "reason": "Pre-consultation review"} |
| result | 'ALLOWED' |
| ip_reference | 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49...' |
| created_at | '2026-09-17T17:20:00.124567Z' |

---

## 106. Entitas Peristiwa Keamanan Sistem (Security Event Entity)

Entitas `security_events` merekam anomali keamanan sistem (seperti kegagalan login beruntun, percobaan eskalasi wewenang, atau kebocoran token):

| Kolom | Tipe Data | Definisi |
| :--- | :--- | :--- |
| `id` | `UUIDv7 / BigInt` | Primary Key unik insiden keamanan |
| `event_type` | `VARCHAR(50)` | LOGIN_FAILED, SUSPICIOUS_TRAVEL, dll |
| `severity` | `VARCHAR(20)` | LOW, MEDIUM, HIGH, CRITICAL |
| `actor_identifier` | `VARCHAR(255) NULL` | Email atau ID akun yang dicurigai |
| `ip_address` | `VARCHAR(45)` | Alamat IP v4 atau IP v6 penyerang |
| `user_agent` | `VARCHAR(255) NULL` | String agen peramban klien |
| `metadata` | `JSON NULL` | Parameter teknis kegagalan |
| `created_at` | `TIMESTAMP` | Waktu peristiwa keamanan terjadi |

---
## 107. Entitas Peristiwa Telemetri Sistem (System Event Entity)

Entitas `system_events` mencatat telemetri operasional infrastruktur (seperti kegagalan koneksi pihak ketiga atau penumpukan antrean antrean pekerja):
- `BEHAVIOR_ANALYSIS_STARTED`: Pemicu awal kalkulasi batch sinyal mingguan.
- `BEHAVIOR_ANALYSIS_COMPLETED`: Laporan sukses komputasi dengan jumlah sinyal terbit.
- `AI_PROVIDER_FAILED`: Telemetri kegagalan koneksi ke API eksternal (timeout, 503).
- `QUEUE_JOB_FAILED`: Informasi kegagalan antrean latar belakang untuk peringatan developer.

---
## 108. Model Hierarki Kepemilikan Data (Data Ownership Model)

Arsitektur data AEVYRA menegakkan batas kepemilikan yang terbagi menjadi tiga domain otoritas:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA DOMAIN OWNERSHIP HIERARCHY                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ DOMAIN KEDAULATAN MEMBER ]                                               │
│  └── User Identity ──► Member Profile ──► Goals ──► Health Records          │
│                    ──► AI Chat Threads ──► Memberships ──► Notifications    │
│                                                                             │
│  [ DOMAIN RELASI KONTRAK (RELATIONSHIP-BOUND) ]                             │
│  ├── Instructor ◄── (Active Assignment) ──► Member                          │
│  ├── Program Kohor ◄── (Curriculum) ──► Cohort Participants                 │
│  └── Consultations ◄── (Scheduled Booking) ──► Staf Medis                   │
│                                                                             │
│  [ DOMAIN SISTEM & PLATFORM (ENGINE-OWNED) ]                                │
│  └── Health Baselines ──► Behavioral Signals ──► Insights ──► Audit Logs    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 109. Otoritas Tunggal Kepemilikan Data Kesehatan (Health Data Ownership Rule)

Hubungan kepemilikan rekam kesehatan bersifat langsung dan mutlak:

> **Prinsip Otoritas:** `health_records.user_id` $\equiv$ **Pemilik Sah Rekam Medis**

Sistem dilarang keras menyimpulkan kepemilikan rekam medis secara tidak langsung melalui entitas perantara (seperti melalui ID instansi korporasi atau ID instruktur).

---

## 110. Prinsip Penegakan Kunci Asing (Foreign Key Principle)

Integritas relasional dijamin pada tingkat mesin basis data (*Database Engine Level*):
- Setiap kolom relasi wajib dideklarasikan sebagai `FOREIGN KEY` formal dengan indeks pendukung.
- Mengabaikan pendefinisian foreign key demi alasan kepraktisan adalah **anti-pola arsitektural**.
- Kebijakan penghapusan (*Delete Constraints*) wajib ditentukan secara eksplisit pada setiap migrasi Laravel (`onDelete('cascade')`, `onDelete('restrict')`, atau `nullOnDelete()`).

---

## 111. Kebijakan Perilaku Penghapusan (Delete Behavior Policies)

Matriks kebijakan penghapusan relasi entitas:

```text
┌──────────────────────────────┬───────────────────┬──────────────────────────┐
│ Pasangan Relasi              │ Kebijakan Hapus   │ Rasional Arsitektural    │
├──────────────────────────────┼───────────────────┼──────────────────────────┤
│ User ──► Profiles            │ CASCADE           │ Profil terikat identitas │
│ User ──► Health Records      │ SOFT / RESTRICT   │ Wajib simpan medikolegal │
│ Program ──► Cohort Members   │ RESTRICT          │ Cegah putus histori bimb.│
│ Challenge ──► Tasks          │ CASCADE           │ Misi bagian dari modul   │
│ Instructor ──► Assignments   │ RESTRICT          │ Lindungi bukti kontrak   │
└──────────────────────────────┴───────────────────┴──────────────────────────┘
```

---

## 112. Integritas Referensial Anti-Orphan (Referential Integrity)

Basis data menolak pembuatan catatan anak yang tidak memiliki induk sah (*Orphan Prevention*):
- Sinyal perilaku (`behavior_signals`) wajib merujuk pada `user_id` yang terdaftar aktif.
- Tiket konsultasi (`consultations`) wajib merujuk pada `instructor_id` dan `member_id` yang valid.
- Misi tantangan (`challenge_tasks`) wajib merujuk pada entitas induk `challenges` yang eksis.

---

## 113. Penegakan Batasan Unik (Unique Constraints Matrix)

Integritas data bisnis dilindungi oleh indeks unik tunggal dan komposit pada tingkat basis data:

| Tabel Sasaran | Kolom Batasan Unik (Unique Indexes) |
| :--- | :--- |
| users | `email` (Case-Insensitive) |
| roles | `slug` |
| permissions | `slug` |
| challenge_participations | `(challenge_id, user_id)` |
| challenge_task_completions | `(participation_id, challenge_task_id)` |
| user_achievements | `(user_id, achievement_id)` |
| community_reactions | `(user_id, reactable_type, reactable_id)` |
| points_ledger | `(user_id, reference_type, reference_id)` |

---

## 114. Kunci Idempoten Operasional (Idempotency Keys)

Untuk operasi yang rentan terhadap pengiriman berulang akibat latensi jaringan seluler (*Network Retries*):
- Endpoint import data, pemesanan konsultasi, klaim reward lencana, dan penerbitan notifikasi wajib mendukung header `Idempotency-Key` (UUIDv4).
- Kunci idempoten disimpan dalam cache Redis selama 24 jam untuk mengembalikan respons transaksi yang sama tanpa mengeksekusi mutasi ganda pada basis data.

---

## 115. Strategi Penanda Waktu (Timestamp Strategy)

AEVYRA menerapkan disiplin pemisahan antara waktu administratif server dan waktu kejadian biologis riil:

| Kolom Timestamp | Makna & Konteks Penggunaan |
| :--- | :--- |
| created_at | Waktu data fisik tersimpan di database server |
| updated_at | Waktu baris data terakhir kali mengalami pembaruan |
| recorded_at | Waktu peristiwa kesehatan/biologis sebenarnya terjadi |
| detected_at | Waktu mesin perilaku pertama kali menemukan anomali |
| scheduled_at | Waktu agenda intervensi/konsultasi direncanakan |
| completed_at | Waktu target/misi secara resmi tuntas diselesaikan |

> [!WARNING]
> Dilarang menyalahgunakan `created_at` sebagai waktu kejadian biologis. Seorang member mungkin mencatat tidur tadi malam pada sore hari keesokan harinya.

---

## 116. Perbedaan Waktu Kejadian vs Waktu Pencatatan (Recorded vs Created Time)

Ilustrasi skenario pencatatan log tidur member:
- **Waktu Peristiwa Fisik (`recorded_at`):** `2026-09-16 07:00:00` (Saat member bangun tidur).
- **Waktu Penyimpanan Server (`created_at`):** `2026-09-17 16:30:00` (Saat member baru sempat membuka aplikasi dan memasukkan log).

Mesin perilaku dan kalkulasi tren glukosa wajib menggunakan `recorded_at` agar korelasi kronologis tetap akurat secara ilmiah.

---

## 117. Tata Kelola Zona Waktu Baku (Timezone Governance)

Standar penyimpanan waktu pada basis data AEVYRA:
- **Penyimpanan Internal:** Seluruh kolom timestamp disimpan secara konsisten dalam zona waktu **UTC (Coordinated Universal Time)** dengan presisi mikrodetik.
- **Penyajian Antarmuka:** Antarmuka klien dan transformer API bertugas mengonversi timestamp UTC ke zona waktu lokal member (misal: WIB/WITA/WIT di Indonesia) berdasarkan kolom `timezone` pada profil pengguna.

---

## 118. Penanganan Data Terjadwal (Scheduled Data Integrity)

Untuk data jadwal konsultasi dan pengingat harian:
- Kolom jadwal menyimpan waktu beserta konteks zona waktu pembuat (*Timezone-Aware Timestamps*).
- Server tidak pernah mengasumsikan bahwa zona waktu server identik dengan zona waktu pengguna. Hal ini mencegah bergesernya jadwal konsultasi tatap muka saat jam operasional musim panas/dingin atau perpindahan wilayah dinas.

---

## 119. Batasan Penggunaan Kolom JSON (JSON Fields Usage Boundary)

AEVYRA memberlakukan aturan ketat kapan kolom tipe data `JSON` diizinkan untuk digunakan:

> [!IMPORTANT]
> **Panduan Arsitektur Kolom JSON:**
> - **Penggunaan yang Disetujui (*Allowed*):**
>   - Metadata peristiwa yang strukturnya dinamis / fleksibel.
>   - Preferensi antarmuka pengguna dan konfigurasi notifikasi personal.
>   - Payload log audit historis dan jejak snapshot audit.
> - **Penggunaan yang Dilarang (*Forbidden*):**
>   - Foreign key relasi primer aplikasi.
>   - Kolom status atau enum yang menjadi filter kueri utama.
>   - Metrik numerik yang sering diagregasi (misal: rata-rata gula darah harian).

---

## 120. Batas Kolom JSON pada Rekam Kesehatan (Health Data JSON Boundary)

Contoh penerapan batas JSON yang bersih pada tabel `health_records`:

```sql
-- PRAKTIK TERBAIK (BEST PRACTICE):
CREATE TABLE health_records (
    id UUID PRIMARY KEY,
    user_id BIGINT NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    value_numeric DECIMAL(12,4) NOT NULL, -- Diindeks & bertipe pasti
    unit VARCHAR(30) NOT NULL,
    recorded_at TIMESTAMP NOT NULL,        -- Diindeks untuk rentang waktu
    metadata JSON NULL                    -- Konteks sekunder (e.g. {"model": "AccuChek"})
);
```

---

## 121. Strategi Pengindeksan Berperforma Tinggi (High-Value Indexing Strategy)

Daftar indeks kunci yang wajib dibangun pada skema migrasi database:
- `users`: Indeks unik pada `email`, indeks tunggal pada `status`.
- `health_records`: Indeks pada `user_id`, `metric_type`, dan `recorded_at`.
- `behavior_signals`: Indeks komposit pada `(user_id, status, detected_at)`.
- `interventions`: Indeks komposit pada `(user_id, instructor_id, status)`.
- `consultations`: Indeks pada `(instructor_id, scheduled_start)` dan `(member_id, status)`.
- `notifications`: Indeks pada `(user_id, read_at)` untuk penghitungan *unread badge count*.
- `audit_logs`: Indeks pada `actor_id` dan `created_at` untuk penelusuran forensik cepat.

---

## 122. Contoh Desain Indeks Komposit (Composite Index Architecture)

Contoh kueri yang dioptimasi oleh indeks gabungan (*Composite Indexes*):

```sql
-- 1. Optimasi kueri grafik tren kesehatan member 14 hari terakhir:
CREATE INDEX idx_health_records_lookup 
ON health_records (user_id, metric_type, recorded_at);

-- 2. Optimasi antrean sinyal aktif di dasbor instruktur:
CREATE INDEX idx_behavior_signals_active 
ON behavior_signals (user_id, status, detected_at);

-- 3. Optimasi kalender ketersediaan bimbingan:
CREATE INDEX idx_assignments_active 
ON instructor_member_assignments (instructor_id, status);
```

---

## 123. Standardisasi Paginasi Koleksi Data (Pagination Architecture)

Seluruh endpoint API yang menyajikan koleksi data berskala besar wajib menerapkan paginasi:
- **Paginasi Berbasis Kursor (*Cursor-based Pagination*):** Wajib diterapkan pada aliran linimasa kesehatan (*timeline*), obrolan AI, dan audit log guna mencegah pergeseran data (*page drift*) dan menjamin performa kueri konstan $O(1)$.
- **Paginasi Berbasis Offset (*Offset-based Pagination*):** Diizinkan secara terbatas pada tabel data manajerial admin (misal: direktori master tantangan atau katalog lencana) yang memerlukan navigasi nomor halaman langsung.

---

## 124. Kueri Linimasa Kesehatan Terpadu (Unified Timeline Query)

Linimasa kesehatan member merupakan tampilan agregat dari berbagai jenis peristiwa biologis:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       UNIFIED MEMBER HEALTH TIMELINE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [ health_records ]       ──► Log Kadar Gula Darah Puasa (105 mg/dL)       │
│   [ behavior_insights ]    ──► Wawasan: "Lonjakan Gula Pasca Makan Siang"   │
│   [ interventions ]        ──► Resep: "Jalan Santai 15 Menit Setelah Makan" │
│   [ consultations ]        ──► Catatan Sesi: Bimbingan Bersama dr. Andi     │
│   [ challenge_completions ]──► Misi Tuntas: "7 Hari Bebas Minuman Manis"    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Linimasa ini dibangun di tingkat layanan aplikasi (*application service aggregation*) menggunakan kontrak data terpadu, bukan memaksakan satu tabel fisik raksasa di basis data.

---

## 125. Kontrak Format Peristiwa Linimasa (Timeline Event Contract)

Skema JSON terstandar untuk respons linimasa klien:

```json
{
  "event_id": "01923e7a-9b41-7c12-88f1-3a4b9c1d2e3f",
  "category": "INSIGHT",
  "occurred_at": "2026-09-17T12:45:00Z",
  "title": "Lonjakan Glukosa Terdeteksi",
  "summary": "Pola makan siang hari ini menghasilkan kenaikan glukosa 42 mg/dL di atas baseline.",
  "severity": "ATTENTION",
  "action_url": "aevyra://insights/01923e7a-9b41",
  "metadata": {
    "metric_type": "blood_glucose",
    "peak_value": 158.0
  }
}
```

---

## 126. Kemampuan Rekonstruksi Data Derivatif (Derived Data Rebuildability)

Prinsip dasar arsitektur data analitik AEVYRA:

> **Prinsip Rekonstruksi:** $\text{Data Derivatif} = f(\text{Data Otoritatif})$

Seluruh tabel `health_baselines`, `behavior_features`, `behavior_signals`, dan ringkasan progres mingguan wajib mampu dihitung ulang dan dibangun kembali dari tabel mentah `health_records` kapan pun dibutuhkan tanpa kehilangan fakta historis.

---

## 127. Strategi Pemulihan Data Derivatif (Rebuild Strategy)

Apabila terjadi galat algoritma atau korupsi pada cache derivatif:
- Sistem tidak melakukan penambalan manual baris per baris (*no manual row patching*).
- Administrator menjalankan perintah artisan rekalkulasi (e.g. `php artisan behavior:recalculate-baseline --user=42`).
- Mesin membaca ulang data mentah historis, mengaplikasikan versi aturan terbaru, dan memperbarui baris derivatif secara bersih.

---

## 128. Data Memori Cache vs Data Derivatif Persisten (Cache vs Persistent)

Pemisahan media penyimpanan antara komputasi sementara dan data analitik:
- **Cache Ephemeral (Redis):** Ringkasan kartu dasbor harian, penghitung lencana belum dibaca (*unread counts*), dan sesi login sementara.
- **Data Derivatif Persisten (Basis Data Relasional):** Nilai acuan baseline, sinyal anomali terverifikasi, wawasan naratif, dan evaluasi luaran intervensi disimpan permanen karena memiliki nilai medikolegal dan historis.

---

## 129. Tata Kelola Versi Data Ilmiah (Data Versioning)

Versi data dicatat secara ketat pada domain yang memerlukan pembuktian saintifik:
- **Baseline Algorithm Versioning:** Versi formula statistik (e.g. `v1.2`).
- **Behavior Rule Logic:** Versi logika ambang batas pola gaya hidup.
- **AI System Prompts:** Versi instruksi asisten edukasi kesehatan.
- **Kurikulum Edukasi:** Versi artikel panduan gizi terakreditasi.

---

## 130. Perlindungan Integritas Riwayat Masa Lampau (Historical Integrity)

Basis data AEVYRA melarang pembaruan destruktif (*no destructive in-place updates*) pada:
- Resep intervensi masa lalu yang telah diselesaikan.
- Bukti kehadiran dan catatan evaluasi sesi konsultasi.
- Seluruh baris entitas audit log forensik.
- Status pencapaian misi tantangan yang telah dikonfirmasi.
- Nilai dasar acuan historis (*previous baselines*).

---

## 131. Kebijakan Retensi Data Sensitif (Data Retention Policies)

Jadwal masa simpan data disesuaikan dengan mandat regulasi perlindungan data medis:

| Kategori Data | Masa Simpan Aktif | Kebijakan Pengarsipan |
| :--- | :--- | :--- |
| Rekam Medis (Health Records) | 5 Tahun | Cold Storage Terenkripsi |
| Percakapan AI (AI Messages) | 12 Bulan | Hapus / Anonimisasi |
| Catatan Privat Instruktur | 5 Tahun | Diarsipkan bersama Rekam |
| Jejak Audit Forensik | 12 Bulan Aktif | Arsip Append-Only 5 Thn |
| Postingan Komunitas Terhapus | 30 Hari | Dihapus Permanen |

---

## 132. Prinsip Minimisasi Pengumpulan Data (Data Minimization)

AEVYRA menganut prinsip minimisasi data (*Data Minimization Principle*):
- Hanya mengumpulkan data yang secara nyata memberikan nilai preventif bagi kesehatan member.
- Menolak praktik pengumpulan data pribadi spekulatif *"untuk cadangan di masa depan"*.
- Kolom yang tidak memiliki fungsi operasional langsung dalam 6 bulan ke depan wajib dikeluarkan dari draf migrasi database.

---

## 133. Klasifikasi Kerahasiaan Data Platform (Data Sensitivity Classification)

Data dalam basis data dikelompokkan ke dalam 4 zona klasifikasi keamanan:

| Tingkat Klasifikasi | Contoh Entitas Data & Atribut |
| :--- | :--- |
| 1. Publik (Public) | Artikel edukasi kurasi, katalog tantangan publik, postingan komunitas umum, nama tingkatan membership. |
| 2. Internal (Internal) | Konfigurasi modul sistem, batas kuota fitur, metrik telemetri sistem, agregasi analitik platform. |
| 3. Privat (Private) | Tanggal lahir profil, target sasaran hidup pribadi, riwayat obrolan asisten AI, preferensi notifikasi. |
| 4. Sensitif Medis (Sensitive) | Kadar glukosa darah, catatan evaluasi instruktur, rekam audio/video konsultasi, rekam darurat 119. |

---

## 134. Matriks Akses Data Lintas Peran (Data Access Matrix)

Tabel penegakan izin membaca (*read access*) antar-peran dalam sistem:

| Entitas Data | Member | Instruktur Tugas | Admin Sistem |
| :--- | :--- | :--- | :--- |
| Profil Akun Pribadi | Penuh | Konteks Terbatas | Terbatas |
| Rekam Kesehatan Mandiri | Penuh | Sesuai Kontrak | Hanya Agregat |
| Target Sasaran Hidup | Penuh | Sesuai Kontrak | Terbatas |
| Sinyal Perilaku Anomali | Terbuka | Triage Bimbingan | Operasional |
| Utas Percakapan AI | Pribadi | Hanya jika Eskalas | Dilarang |
| Catatan Privat Instruktur | Dilarang | Penulis / Sah | Investigasi |
| Catatan Evaluasi Konsultasi | Ringkasan | Penuh | Terbatas |
| Buku Besar Log Audit | Dilarang | Terbatas Tugas | Penuh |
| Konfigurasi Parameter Sistem | Dilarang | Dilarang | Penuh |

---

## 135. Perlindungan Privasi Sejak Desain (Privacy by Default)

Pengaturan privasi awal seluruh data member berstatus tertutup (*Default to Private*):
- Member harus secara sadar mencentang kotak persetujuan (*explicit opt-in*) jika ingin membagikan rekam kesehatan kepada instruktur atau bergabung ke papan peringkat komunitas.
- Pengaturan bawaan akun tidak pernah membuka data kesehatan ke ranah publik secara otomatis.

---

## 136. Otorisasi Berbasis Kontrak Relasi (Relationship-Based Access)

Akses Instruktur ke rekam medis member **bukan berasal dari status peran semata**:

> [!IMPORTANT]
> **Aturan Keamanan:** Peran Instruktur + **Kontrak Penugasan Aktif** $\Longrightarrow$ Akses Data Bimbingan

Memiliki peran `instructor` di sistem tidak memberikan hak untuk membaca data member di luar kohor penugasan resminya. Percobaan akses tanpa relasi penugasan langsung memicu respons `403 Forbidden`.

---

## 137. Akses Data Terkendali oleh Asisten AI (AI Data Access Boundaries)

Model AI tidak memiliki koneksi langsung ke basis data (*No Direct Database Connections*):
- AI hanya menerima data melalui *Function Calling / Domain Tools* resmi (misal: `getRecentGlucoseSummary()`).
- Setiap pemanggilan tool melewati lapisan *Policy Gate* di backend yang memverifikasi kepemilikan data sebelum mengembalikan ringkasan data yang telah disanitasi.
- Dilarang keras membiarkan model AI mengeksekusi kueri SQL mentah (*No Raw SQL Execution by AI*).

---

## 138. Akses Data Administratif Berbasis Kebijakan (Admin Data Access Boundaries)

Akses Administrator diatur oleh prinsip hak istimewa terkecil (*Principle of Least Privilege*):
- Administrator mengelola integritas akun dan ketersediaan sistem, **bukan membaca catatan harian makanan atau glukosa member**.
- Kebutuhan data manajerial dipenuhi melalui data agregat statistik yang teranonimkan (*Anonymized Aggregate Reporting*).

---

## 139. Auditabilitas Akses Data Sensitif (Sensitive Access Auditing)

Setiap aksi pembacaan data sensitif (*Read Auditing*) wajib dicatat ke dalam log:
- Saat Instruktur membuka halaman profil dan grafik glukosa member bimbingannya.
- Saat Administrator mengunduh berkas rekapitulasi data kohor.
- Saat asisten AI memanggil fungsi pembacaan data kesehatan.
- Saat staf keamanan mengeksekusi mekanisme akses darurat (*Break-Glass*).

---

## 140. Standar Enkripsi Data (Encryption Standards)

Perlindungan kriptografis data platform:
- **Enkripsi Saat Berpindah (*In-Transit*):** Protokol TLS 1.3 wajib pada seluruh komunikasi antara aplikasi seluler, antarmuka web, dan server API backend.
- **Enkripsi Saat Disimpan (*At-Rest*):** Menggunakan enkripsi tingkat penyimpanan AES-256 pada media disk basis data. Kolom data sangat sensitif (catatan privat, token identitas IoT) dienkripsi pada tingkat aplikasi (*Laravel Model Encryption*).
- **Hashing Kredensial:** Seluruh kata sandi pengguna dienkripsi menggunakan algoritma Argon2id atau Bcrypt.

---

## 141. Tata Kelola Kunci Rahasia Sistem (Secrets Management)

Kredensial rahasia sistem dikelola secara terisolasi:
- Kunci API LLM (Google AI API Key), kredensial basis data, kunci enkripsi aplikasi, dan rahasia pembayaran **dilarang keras ditulis di kode sumber, migrasi basis data, atau berkas JSON commit**.
- Seluruh rahasia wajib dimuat melalui *Environment Variables* (`.env`) atau manajer kunci rahasia (*Secret Vaults*) terenkripsi.

---

## 142. Pemisahan Lingkungan Server (Environment Separation)

Skema dan data dipisahkan secara kedap udara antar-lingkungan:
- `local`: Menggunakan SQLite atau MySQL kontainer dengan data rekaan murni.
- `testing`: Basis data memori (*in-memory*) yang dibangun ulang pada setiap uji otomatis.
- `staging`: Replika konfigurasi produksi dengan data sintetis bervolume tinggi.
- `production`: Basis data utama dengan proteksi replikasi dan pencadangan harian otomatis.
- **Larangan Mutlak:** Dilarang menyalin data rekam medis produksi ke server lokal pengembang tanpa sanitasi data menyeluruh.

---

## 143. Pembuatan Data Uji Sintetis (Synthetic Test Data)

Pengujian perangkat lunak wajib menggunakan data palsu buatan (*Synthetic Data*):
- Memanfaatkan library *Faker* yang disesuaikan dengan konteks demografi kesehatan Indonesia (misal: nama lokal, jenis makanan khas Nusantara).
- Menjamin tidak ada data identitas asli member yang bocor ke dalam lingkungan pengujian otomatis CI/CD.

---

## 144. Registri Pabrik Model Data (Laravel Model Factories)

Katalog pabrik data otomatis (*Eloquent Factories*) untuk pengujian unit dan fitur:
- `UserFactory`, `MemberProfileFactory`, `LifestyleProfileFactory`
- `GoalFactory`, `GoalMetricFactory`
- `HealthRecordFactory`, `HealthBaselineFactory`
- `BehaviorSignalFactory`, `BehaviorInsightFactory`, `RecommendationFactory`
- `InterventionFactory`, `InterventionOutcomeFactory`
- `ConsultationFactory`, `InstructorAvailabilityFactory`
- `ProgramFactory`, `ChallengeFactory`, `ChallengeTaskFactory`
- `AIConversationFactory`, `AIMessageFactory`
- `MembershipFactory`, `PointsLedgerFactory`

---

## 145. Tata Kelola Pengisian Awal Data (Production-Safe Seeders)

Seeder yang dieksekusi di server produksi hanya diizinkan mengisi data acuan sistem (*System Reference Data*):
- Master peran dan izin sistem (`RoleSeeder`, `PermissionSeeder`).
- Master paket tingkatan langganan (`MembershipTierSeeder`).
- Katalog tantangan terakreditasi dan lencana master (`AchievementSeeder`).
- **Pagar Keamanan:** Seeder memeriksa lingkungan aplikasi (`app()->environment('production')`) dan otomatis memblokir pembuatan akun pengguna palsu di server produksi.

---

## 146. Strategi Transaksi Basis Data (Database Transactions Strategy)

Operasi mutasi data multi-tabel wajib dibungkus dalam blok transaksi atomik (*ACID Transactions*):

```php
DB::transaction(function () use ($dto, $member) {
    // 1. Buat tiket intervensi
    $intervention = Intervention::create([...]);
    
    // 2. Hubungkan ke sinyal terkait
    $intervention->signal()->associate($dto->signalId);
    
    // 3. Terbitkan notifikasi ke member
    NotificationService::dispatchInterventionNotice($member, $intervention);
    
    // 4. Rekam jejak audit forensik
    AuditLogService::logAction('intervention.created', $intervention);
});
```

Jika salah satu langkah mengalami kegagalan, seluruh mutasi dibatalkan otomatis (*Rollback*).

---

## 147. Batasan Transaksi Basis Data (Transaction Boundaries)

AEVYRA memberlakukan aturan batasan ketat untuk transaksi database:

> [!CAUTION]
> **Aturan Emas:** Dilarang keras menjalankan panggilan API eksternal di dalam blok transaksi basis data.

- Permintaan ke API AI (LLM inference) atau gateway SMS notifikasi pihak ketiga memiliki latensi jaringan yang tidak dapat diprediksi.
- Menempatkan panggilan eksternal di dalam transaksi database akan menahan kunci baris tabel (*row locks*) terlalu lama, memicu kemacetan basis data (*database starvation*).
- Pola yang benar: *Commit transaksi database terlebih dahulu $\rightarrow$ Kirimkan pekerjaan panggilan API via Queue Worker.*

---

## 148. Struktur Data Pekerjaan Antrean (Lightweight Queue Payloads)

Muatan data yang dikirimkan ke worker antrean (*background jobs*) harus berukuran seringan mungkin:
- Kirimkan **hanya kunci primer** (ID model), bukan seluruh objek pohon relasi yang diserialisasi besar.
- Worker antrean bertugas mengambil data mutakhir langsung dari basis data saat job dieksekusi.
- Pola ini mencegah ketidaksinkronan data (*stale data*) jika data telah dimodifikasi sebelum worker sempat memproses antrean.

---

## 149. Idempotensi Pekerjaan Antrean Latar Belakang (Job Idempotency)

Seluruh job pemrosesan latar belakang harus dirancang agar aman jika dieksekusi berulang kali (*Safe for Retries*):
- `GenerateDailyBaselinesJob`: Memeriksa apakah baseline hari ini telah dihitung sebelum menimpa.
- `EvaluateChallengeProgressJob`: Menggunakan kunci komposit unik agar progres tidak dihitung ganda.
- `DispatchScheduledReminderJob`: Memeriksa flag penanda waktu kirim agar tidak mengirim pesan spam ganda ke perangkat member.

---

## 150. Strategi Penentuan Hapus Lunak (Soft Delete Strategy)

Penerapan *Soft Delete* (`deleted_at`) dievaluasi secara selektif:
- **Wajib Soft Delete:** `users`, `member_profiles`, `community_posts`, `challenges`, `programs`, `interventions`. Entitas ini mempertahankan relasi historis dan akuntabilitas audit masa lampau.
- **Dilarang Soft Delete:** `audit_logs`, `security_events`, `points_ledger`. Buku besar forensik bersifat imutabel (*Append-Only*); catatan di tabel ini tidak pernah boleh dihapus secara lunak maupun permanen melalui antarmuka aplikasi.

---

## 151. Pengarsipan vs Penghapusan Data (Archived vs Deleted)

AEVYRA membedakan secara tegas perlakuan siklus akhir hidup data antara pengarsipan dan pemusnahan:

| Status: ARCHIVED (Diarsipkan) | Status: DELETED (Dihapus / Dimusnahkan) |
| :--- | :--- |
| • Tujuan: Menjaga integritas riwayat | • Tujuan: Memenuhi kepatuhan privasi |
| operasional dan pembuktian klinis. | (Hak untuk Dilupakan / UU PDP). |
| • Sifat: Read-Only (Mode Baca Saja). | • Sifat: Anonimisasi atau pemusnahan |
| • Entitas: Program selesai, tantangan | permanen data identitas pribadi. |
| tutup, catatan konsultasi lampau. | • Entitas: Akun pengguna mengundurkan |
| • Dampak: Tidak muncul di antrean | diri, permohonan pembersihan data |
| tugas harian, namun tetap diaudit. | sesuai permintaan tertulis. |

---

## 152. Kebijakan Anonimisasi Data (Data Anonymization Protocol)

Ketika regulasi perlindungan data pribadi (*Right to be Forgotten*) berbenturan dengan kewajiban retensi data analitik kesehatan publik:
- **Penghapusan Tautan Identitas (*De-identification*):** Kolom identitas langsung (nama, email, nomor kontak, foto) dihapus secara permanen atau diganti dengan hash satu arah (*pseudonymization*).
- **Pelestarian Data Agregat:** Titik data glukosa, indeks massa tubuh, dan metrik aktivitas tetap dipertahankan dalam basis data penelitian kohor tanpa dapat dilacak kembali ke individu pemilik aslinya.

---

## 153. Tata Kelola Penghapusan Konten Komunitas (Community Deletion - Tombstone)

Penghapusan postingan atau komentar forum menerapkan pola nisan (*Tombstone Pattern*):

```text
[ Postingan Asli: Dilaporkan / Dihapus Penulis ]
                        │
                        ▼
       [ Tampilan Publik Komunitas ]
       "Konten ini telah dihapus oleh penulis atau moderator."
                        │
                        ▼
       [ Basis Data Internal: soft_deleted ]
       - ID penulis tetap tersimpan untuk rekam jejak audit
       - Balasan komentar anak tidak rusak (pohon diskusi utuh)
```

Pola ini menjaga keutuhan struktur pohon diskusi (*threaded comments*) tanpa membingungkan anggota lain yang membaca alur percakapan.

---

## 154. Perlindungan Riwayat Sesi Konsultasi (Consultation Deletion Protection)

Sesi konsultasi tatap muka memuat tanggung jawab profesional dan bukti medikolegal:
- Sesi konsultasi **dilarang keras dihapus secara destruktif** dari basis data.
- Jika jadwal dibatalkan oleh member atau instruktur, status diubah menjadi `CANCELLED` disertai pencatatan pihak pembatal dan alasan pembatalan.
- Bukti slot waktu, durasi panggilan, dan catatan evaluasi instruktur disimpan permanen untuk akuntabilitas operasional.

---

## 155. Perlindungan Riwayat Intervensi (Intervention Deletion Protection)

Tiket rekomendasi intervensi yang telah dirumuskan oleh Instruktur dilindungi dari penghapusan keras:
- Intervensi masa lalu mencerminkan riwayat klinis perjalanan gaya hidup member.
- Menghapus baris intervensi akan merusak analisis luaran perilaku (*Behavior Outcomes*).
- Status yang diizinkan untuk siklus akhir: `COMPLETED`, `CANCELLED`, atau `ARCHIVED`.

---

## 156. Protokol Penghapusan Rekam Kesehatan (Health Record Deletion Flow)

Alur penanganan saat member meminta penghapusan log metrik kesehatan secara mandiri:

```text
Permintaan Hapus Log ──► Validasi Kebijakan ──► Hapus / Samarkan Baris ──► Rekalkulasi Derivatif ──► Catat Audit
```

1. **Permintaan Pengguna (*User Request*):** Member menandai rekaman data glukosa atau makanan yang salah diinput.
2. **Validasi Kebijakan (*Policy Check*):** Memastikan rekaman tersebut bukan merupakan bukti sengketa yang sedang diinvestigasi.
3. **Pemusnahan Data (*Record Deletion*):** Baris data dihapus lunak atau dimusnahkan sesuai status verifikasi.
4. **Rekalkulasi Derivatif (*Cascade Recalculation*):** Memicu antrean evaluasi ulang baseline dan sinyal anomali terkait.
5. **Pencatatan Audit (*Audit Trail*):** Merekam peristiwa penghapusan oleh aktor pemilik data.

---

## 157. Dampak Penghapusan terhadap Data Derivatif (Derived Data Invalidation)

Penghapusan suatu log metrik kesehatan memicu reaksi berantai yang teratur pada data turunan:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CASCADE DERIVED DATA RECALCULATION                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [ Log Metrik Dihapus ]                                                    │
│             │                                                               │
│             ├──► 1. Nilai Dasar (Baseline): Ditandai 'STALE' / Dihitung Ulang│
│             │                                                               │
│             ├──► 2. Sinyal Anomali: Kualitas bukti dievaluasi kembali       │
│             │                                                               │
│             ├──► 3. Wawasan Terbit: Ditandai 'SUPERSEDED' jika bukti hilang │
│             │                                                               │
│             └──► 4. Skor Progres: Dihitung ulang secara otomatis            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 158. Integritas Referensial Saat Penonaktifan Akun (Account De-provisioning)

Prosedur berurutan saat sebuah akun pengguna dinonaktifkan atau dihapus secara menyeluruh:
1. **Pencabutan Hak Sesi (*Access Termination*):** Seluruh token otentikasi (JWT/Sanctum) seketika dicabut.
2. **Pemutusan Relasi Aktif (*Contract Dissolution*):** Penugasan instruktur aktif ditutup dengan status `ENDED`.
3. **Penyamaran Data Identitas (*PII Anonymization*):** Nama, email, dan nomor telepon disanitasi.
4. **Pembersihan Cache Ephemeral (*Cache Purge*):** Seluruh data linimasa member di Redis dihapus.
5. **Pelestarian Log Kepatuhan (*Audit Preservation*):** Seluruh log audit forensik tetap dipertahankan secara utuh.

---

## 159. Pemisahan Model Eloquent dan Lapisan API (API Resource Separation)

AEVYRA mewajibkan pemisahan tegas antara model basis data (*Eloquent Models*) dan representasi data keluar (*API Resources / Transformers*):

```text
┌─────────────────────────┐         ┌─────────────────────────┐         ┌─────────────────────────┐
│     ELOQUENT MODEL      │         │   LARAVEL API RESOURCE  │         │      JSON RESPONSE      │
│  ─────────────────────  │────────►│  ─────────────────────  │────────►│  ─────────────────────  │
│  Memuat seluruh kolom   │ (Transform)Hanya memilih atribut  │ (Client) Bersih dari hash sandi,  │
│  internal & relasi data │         │  yang diizinkan publik  │         │  token, & metadata audit│
└─────────────────────────┘         └─────────────────────────┘         └─────────────────────────┘
```

Pola ini menjamin tidak ada kebocoran informasi (*Data Leakage*) seperti kolom `password`, `remember_token`, atau metadata internal server.

---

## 160. Disiplin Pemilihan Kolom Kueri (Database Query Discipline)

Untuk mengoptimalkan penggunaan memori dan performa basis data, kueri aplikasi wajib mendefinisikan kolom yang dibutuhkan secara eksplisit:
- **Larangan `SELECT *`:** Dilarang menggunakan pemanggilan tanpa filter kolom pada tabel berskala besar (`health_records`, `behavior_signals`, `audit_logs`).
- **Proyeksi Kolom Minimalis:** Hanya mengambil atribut yang akan ditampilkan pada kartu antarmuka komponen terkait.

---

## 161. Pencegahan Masalah Kueri N+1 (N+1 Query Prevention)

Pengambilan koleksi data relasional wajib mengimplementasikan pemuatan cepat (*Eager Loading*):

```php
// CONTOH PRAKTIK TERBAIK DI AEVYRA:
$assignedMembers = MemberProfile::query()
    ->where('instructor_id', $instructor->id)
    ->with([
        'user:id,name,email',
        'activeInterventions' => function ($query) {
            $query->latest()->limit(3);
        },
        'latestSignal'
    ])
    ->withCount('unreadNotifications')
    ->cursorPaginate(20);
```

Pengujian integrasi otomatis wajib menyertakan assertion pendeteksi kueri berulang (*DB Query Count Assertions*).

---

## 162. Optimasi Kueri Linimasa Kesehatan (Timeline Performance Optimization)

Menyajikan aliran data linimasa kesehatan harian dalam waktu < 200 milidetik:
- Membatasi jendela kueri awal maksimal **30 hari terakhir**.
- Mengandalkan indeks komposit `(user_id, recorded_at DESC)`.
- Menghindari penggabungan kueri tabel relasi (*JOIN*) yang kompleks secara langsung di basis data; lakukan penggabungan data pada lapisan *service aggregate memory*.

---

## 163. Pemisahan Kueri Agregasi dan Transaksi (Health Data Aggregation)

Untuk melindungi basis data transaksional primer dari beban komputasi analitik:
- Kueri pelaporan manajerial dan kalkulasi statistik populasi dialihkan ke replika baca (*Read Replicas*).
- Metrik dasbor mingguan dihitung di latar belakang melalui worker terjadwal dan disimpan ke dalam tabel rekap.

---

## 164. Tabel Rekapitulasi Analitik (Reporting & Metric Tables)

Untuk mendukung dasbor eksekutif tanpa memperlambat kueri operasional, sistem menyediakan tabel agregasi terdedikasi:
- `daily_health_summaries`: Agregasi rata-rata glukosa, total langkah, dan kualitas tidur harian per member.
- `program_cohort_metrics`: Tingkat penyelesaian modul dan angka kepatuhan bimbingan per kohor.
- `platform_engagement_metrics`: Statistik DAU, MAU, volume intervensi, dan sesi konsultasi per bulan.

---

## 165. Batasan Gudang Data Eksternal (Data Warehouse Boundary)

Jika skala data analitik melampaui kapasitas basis data operasional OLTP:
- Data dialirkan secara asinkron menggunakan saluran peristiwa (*Event-Driven Pipeline / Change Data Capture*) ke gudang data analitik (OLAP / BigQuery / ClickHouse).
- Basis data produksi utama tetap ramping dan berfokus murni pada kecepatan transaksi pengguna harian.

---

## 166. Taksonomi Peristiwa Domain (Domain Event Taxonomy)

Katalog peristiwa bisnis (*Domain Events*) yang menjadi pemicu reaktivitas sistem:
- `UserRegistered`, `UserProfileCompleted`
- `HealthRecordCreated`, `HealthRecordCorrected`
- `BaselineGenerated`, `BaselineInvalidated`
- `BehaviorSignalDetected`, `BehaviorSignalQualified`
- `InsightPublished`, `RecommendationAdopted`
- `InterventionPrescribed`, `InterventionOutcomeEvaluated`
- `ConsultationBooked`, `ConsultationConcluded`
- `ChallengeGoalAchieved`, `AchievementBadgeUnlocked`
- `MembershipTierUpgraded`, `EmergencyProtocolTriggered`

---

## 167. Prinsip Muatan Ringan Peristiwa (Event Payload Principle)

Setiap kelas peristiwa domain (*Event Class*) dirancang dengan muatan seminimal mungkin:

> [!TIP]
> **Panduan Muatan Domain Event (Event Payload):**
> - **Disetujui (*Approved*):** Hanya membawa `event_id`, `occurred_at`, `actor_id`, dan kunci identitas referensi entitas terkait (`id`, `user_id`).
> - **Ditolak (*Rejected*):** Membawa seluruh objek model Eloquent besar atau rekam riwayat kesehatan mentah di dalam payload event.

---

## 168. Tata Kelola Versi Peristiwa (Event Versioning)

Untuk mendukung integrasi subsistem yang tangguh terhadap perubahan skema:
- Setiap kelas peristiwa membawa metadata versi kontrak (misal: `schema_version = '1.2'`).
- Konsumen antrean memeriksa versi muatan sebelum melakukan penguraian (*deserialization*), memastikan kompatibilitas mundur saat rilis pembaruan server.

---

## 169. Peta Hierarki Relasi Domain Lengkap (Domain Relationships Overview)

Pohon relasi arsitektural dari jangkar pengguna hingga intervensi pendampingan:

```text
USERS (Identitas Utama)
 ├── MEMBER_PROFILES (Konteks Demografi)
 ├── LIFESTYLE_PROFILES (Konteks Kebiasaan Hidup)
 ├── GOALS (Target Perubahan Perilaku)
 │    └── GOAL_METRICS (Parameter Ukur)
 │
 ├── HEALTH_RECORDS (Fakta Metrik Otoritatif)
 │    └── HEALTH_BASELINES (Nilai Acuan Individu Dinamis)
 │         └── BEHAVIOR_FEATURES (Fitur Tren & Deviasi)
 │              └── BEHAVIOR_SIGNALS (Deteksi Pola Anomali)
 │                   └── BEHAVIOR_INSIGHTS (Narasi Penjelasan Empatis)
 │                        └── RECOMMENDATIONS (Saran Opsi Aksi)
 │                             └── ACTIONS (Pengingat / Misi Tantangan)
 │
 ├── INTERVENTIONS (Resep Bimbingan Human-in-the-Loop)
 │    └── INTERVENTION_OUTCOMES (Evaluasi Capaian Pemulihan)
 ├── CONSULTATIONS (Sesi Tatap Muka Virtual)
 ├── PROGRAM_MEMBERS (Pendaftaran Kurikulum Kohor)
 ├── CHALLENGE_PARTICIPATIONS (Misi Tantangan Hidup Sehat)
 ├── POINTS_LEDGER & USER_ACHIEVEMENTS (Gamifikasi Positif)
 ├── AI_CONVERSATIONS & AI_MESSAGES (Dialog Edukasi AI)
 ├── COMMUNITY_POSTS & COMMENTS (Forum Dukungan Teman Sebaya)
 ├── MEMBERSHIPS (Tingkatan Akses Layanan)
 └── AUDIT_LOGS (Buku Besar Forensik Imutabel)
```

---

## 170. Peta Relasi Domain Instruktur (Instructor Domain Relationships)

Arsitektur relasi yang berpusat pada peran staf Instruktur:

```text
INSTRUCTOR (Pengguna dengan Peran 'instructor')
 ├── INSTRUCTOR_PROFILE (Kredensial, STR, Sertifikasi Medis)
 ├── INSTRUCTOR_AVAILABILITIES (Jadwal Kerja Rutin)
 ├── INSTRUCTOR_MEMBER_ASSIGNMENTS (Kontrak Penugasan Bimbingan)
 │    └── MEMBER_PROFILES (Data Pasien Bimbingan Terotorisasi)
 ├── PROGRAM_INSTRUCTORS (Kurikulum yang Diampu)
 ├── INTERVENTIONS (Resep Tindakan yang Diterbitkan)
 ├── CONSULTATIONS (Jadwal Sesi Tatap Muka Terjadwal)
 └── PRIVATE_NOTES (Catatan Evaluasi Klinis Terenkripsi)
```

---

## 171. Peta Relasi Domain Administrator (Admin Domain Relationships)

Arsitektur pengawasan yang berpusat pada peran Administrator:

```text
ADMINISTRATOR (Pengguna dengan Hak 'roles.manage', 'settings.manage')
 ├── USER & ROLE GOVERNANCE (Manajemen Akun & Penugasan)
 ├── PROGRAM & CURRICULUM MANAGEMENT (Penerbitan Kohor)
 ├── CHALLENGE & BADGE GOVERNANCE (Manajemen Gamifikasi)
 ├── COMMUNITY MODERATION QUEUE (Antrean Aduan Konten)
 ├── AGGREGATE HEALTH REPORTS (Analitik Tren Populasi)
 ├── SYSTEM CONFIGURATION & FEATURE FLAGS (Parameter Operasional)
 └── GLOBAL AUDIT LOGS (Penelusuran Forensik Kepatuhan Sistem)
```

---

## 172. Diagram Hubungan Entitas Inti (Core Conceptual ERD)

```text
┌─────────────────┐       1:1       ┌───────────────────┐
│      users      ├────────────────►│  member_profiles  │
└────────┬────────┘                 └───────────────────┘
         │
         │ 1:N
         ├──────────────────────────┬──────────────────────────┐
         ▼                          ▼                          ▼
┌─────────────────┐        ┌───────────────────┐      ┌─────────────────┐
│  health_records │        │       goals       │      │  consultations  │
└────────┬────────┘        └─────────┬─────────┘      └─────────────────┘
         │                           │
         │ 1:N (Derivasi)            │ 1:N
         ▼                           ▼
┌─────────────────┐        ┌───────────────────┐
│ health_baselines│        │   goal_metrics    │
└────────┬────────┘        └───────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│behavior_features│
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐        1:N      ┌───────────────────┐
│behavior_signals ├────────────────►│ behavior_insights │
└────────┬────────┘                 └─────────┬─────────┘
         │                                    │ 1:N
         │ 1:1                                ▼
         ▼                          ┌───────────────────┐
┌─────────────────┐                 │  recommendations  │
│  interventions  │◄────────────────┴───────────────────┘
└─────────────────┘  (Human Coach)
```

---

## 173. Hubungan Pengguna ke Rekam Kesehatan (User → Health Record Cardinality)

Kardinalitas hubungan:
- **Satu Pengguna Memiliki Banyak Rekam Kesehatan ($1 : N$):** Seorang member mencatat ratusan log glukosa, aktivitas fisik, dan durasi tidur sepanjang keikutsertaannya.
- **Setiap Rekam Kesehatan Dimiliki Tepat Satu Pengguna:** Dilarang keras ada rekam kesehatan tanpa pemilik akun sah.

---

## 174. Hubungan Pengguna ke Sasaran Hidup (User → Goal Cardinality)

Kardinalitas hubungan:
- **Satu Pengguna Memiliki Banyak Sasaran ($1 : N$):** Member dapat merancang berbagai target perilaku sepanjang waktu.
- **Batasan Operasional:** Sistem membatasi maksimal **3 sasaran berstatus `ACTIVE` secara simultan** guna menjaga fokus perhatian member dan mencegah kejenuhan mental (*habit burnout*).

---

## 175. Hubungan Pengguna ke Nilai Dasar (User → Baseline Cardinality)

Kardinalitas hubungan:
- **Satu Pengguna Memiliki Banyak Versi Acuan ($1 : N$):** Nilai acuan dihitung berkala setiap 14 hari atau saat fase program baru dimulai.
- Hanya ada **satu nilai acuan berstatus `AVAILABLE` per tipe metrik** pada satu waktu aktif.

---

## 176. Hubungan Sinyal Perilaku ke Sumber Pembuktian (Signal Relationships)

Hubungan relasional sinyal:
- Sinyal merujuk pada pemilik akun (`users.id`).
- Sinyal terikat secara opsional pada acuan pembanding (`baseline_id`).
- Sinyal terhubung secara relasional ke tabel pivot `behavior_signal_records` yang mengidentifikasi baris log rekam kesehatan spesifik yang memicu anomali.

---

## 177. Hubungan Sinyal ke Wawasan Perilaku (Signal → Insight Cardinality)

Kardinalitas hubungan:
- Sebuah sinyal perilaku anomali ($1$) dapat menghasilkan satu atau beberapa wawasan naratif ($N$) yang disesuaikan dengan tingkat literasi member.
- Algoritma deduplikasi memastikan tidak ada dua wawasan dengan topik dan rekomendasi identik yang aktif bersamaan dalam 72 jam.

---

## 178. Hubungan Wawasan ke Rekomendasi (Insight → Recommendation Cardinality)

Kardinalitas hubungan:
- Satu wawasan perilaku ($1$) dapat menawarkan dua hingga tiga alternatif rekomendasi tindakan konkret ($N$).
- Contoh: Wawasan lonjakan gula darah menawarkan opsi (a) Jalan kaki santai 15 menit pasca makan, atau (b) Mengganti minuman manis dengan teh tanpa gula.

---

## 179. Hubungan Intervensi Pendampingan (Intervention Relationships)

Hubungan segitiga intervensi:
- Menghubungkan Instruktur perumus (`instructor_id`), Member penerima (`user_id`), dan Sinyal anomali pemicu (`behavior_signal_id`).
- Hak akses intervensi diverifikasi melalui kebijakan bahwa Instruktur tersebut terdaftar dalam penugasan aktif member yang bersangkutan.

---

## 180. Hubungan Sesi Konsultasi (Consultation Relationships)

Hubungan sesi konsultasi:
- Menghubungkan secara eksplisit satu Member (`member_id`) dan satu Instruktur profesional (`instructor_id`).
- Menautkan sesi ke program kohor terkait (`program_id`) untuk pencatatan kuota bimbingan.

---

## 181. Hubungan Partisipasi Tantangan (Challenge Relationships)

Kardinalitas hubungan:
- Relasi *Many-to-Many* antara `challenges` dan `users` dijembatani oleh tabel `challenge_participations`.
- Setiap partisipasi memiliki banyak rekaman penyelesaian tugas harian di tabel `challenge_task_completions`.

---

## 182. Hubungan Percakapan AI (AI Conversation Relationships)

Hubungan hierarki dialog AI:
- `users` ($1$) $\rightarrow$ `ai_conversations` ($N$) $\rightarrow$ `ai_messages` ($N$).
- Pesan bertipe perkakas terhubung ke rekaman eksekusi `ai_tool_executions`.

---

## 183. Hubungan Forum Komunitas (Community Relationships)

Hubungan forum diskusi:
- `users` ($1$) $\rightarrow$ `community_posts` ($N$) $\rightarrow$ `community_comments` ($N$).
- Reaksi dukungan terhubung secara polimorfis melalui `community_reactions`.

---

## 184. Hubungan Saluran Notifikasi (Notification Relationships)

Hubungan notifikasi:
- `users` ($1$) $\rightarrow$ `notifications` ($N$).
- Pengaturan preferensi terhubung secara 1-to-Many melalui `notification_preferences` per kategori saluran.

---

## 185. Hubungan Tingkatan Keanggotaan (Membership Relationships)

Hubungan langganan layanan:
- `users` ($1$) $\rightarrow$ `memberships` ($N$ riwayat transaksi).
- Sistem membatasi hanya **satu kontrak langganan berstatus `ACTIVE`** pada satu waktu berjalan.

---

## 186. Hubungan Buku Besar Log Audit (Audit Relationships)

Hubungan buku besar keamanan:
- Merekam aktor pelaksana (`actor_id` $\rightarrow$ `users.id`).
- Mengaitkan objek sasaran secara polimorfis (`target_type`, `target_id`).

---

## 187. Kebijakan Penggunaan Relasi Polimorfis (Polymorphic Relationships Policy)

AEVYRA membatasi penggunaan relasi polimorfis (*Polymorphic Relations*) hanya pada domain yang benar-benar membutuhkan kelenturan objek:
- **Diizinkan:** `community_reactions` (bisa mereaksi Post atau Comment), `community_reports` (melaporkan Post/Comment/User), `audit_logs` (target entitas dinamis).
- **Dilarang:** Menggunakan polimorfis untuk rekam kesehatan, tiket konsultasi, atau penugasan instruktur. Domain inti medis wajib menggunakan kunci asing eksplisit (*Strict Foreign Keys*) guna menjamin integritas referensial basis data.

---

## 188. Standar Pemilihan Identitas Unik: UUIDv7 vs BigInt (ID Strategy)

AEVYRA mengadopsi pendekatan hibrida terstandar:

| UUIDv7 (Time-Ordered 128-bit) | BIGINT UNSIGNED (Auto-Increment) |
| :--- | :--- |
| Digunakan Pada: • users, member_profiles • health_records, behavior_signals • interventions, consultations • ai_conversations, audit_logs | Digunakan Pada: • roles, permissions • membership_tiers, achievements • challenge_tasks, categories • tabel master referensi sistem |
| Keunggulan: • Aman dari tebakan enumerasi URL • Dapat dibuat di sisi klien (Client) • Terurut secara waktu kronologis • Ramah partisi basis data terdistr. | Keunggulan: • Ukuran indeks sangat kecil (8 byte) • Pengurutan tabel master cepat • Kinerja kueri JOIN tabel acuan sangat efisien |

---

## 189. Pemisahan Identifikasi Publik dan Internal (Public Identifiers)

Untuk entitas yang terekspos ke antarmuka publik atau tautan URL:
- Menggunakan UUIDv7 atau kode unik alfanumerik (*NanoID*) sebagai identifikasi publik (`public_id`).
- Primary key internal basis data tidak pernah diekspos secara mentah di URL peramban untuk mencegah serangan enumerasi ID (*IDOR Attacks*).

---

## 190. Konvensi Pembuatan Slug URL Ramah (Slug Conventions)

Penggunaan slug URL ramah baca (*Human-readable Slugs*):
- Diterapkan pada entitas publik: `programs.slug` (e.g., `program-kendali-glukosa-14-hari`), `challenges.slug`, `articles.slug`.
- **Aturan Keamanan:** Rekam kesehatan, tiket konsultasi, dan sinyal perilaku dilarang keras menggunakan slug publik yang dapat ditebak.

---

## 191. Konvensi Penamaan Basis Data (Database Naming Standards)

Mengikuti konvensi resmi framework Laravel:
- **Nama Tabel:** Huruf kecil, format jamak, pemisah garis bawah (`snake_case` plural), contoh: `health_records`, `behavior_signals`.
- **Nama Kolom:** Huruf kecil, format tunggal (`snake_case`), contoh: `recorded_at`, `value_numeric`.
- **Nama Model Eloquent:** Huruf besar di awal kata, bentuk tunggal (`PascalCase` singular), contoh: `HealthRecord`, `BehaviorSignal`.
- **Nama Kunci Asing:** Nama model tunggal diikuti akhiran `_id`, contoh: `user_id`, `instructor_id`.

---

## 192. Strategi Pengelolaan Enum (Enum Architecture Strategy)

Penanganan nilai pilihan terbatas:
- **PHP 8.2+ Backed Enums:** Digunakan untuk status siklus hidup yang bersifat tetap dalam logika aplikasi (misal: `UserStatus`, `SignalSeverity`, `ConsultationStatus`).
- **Tabel Acuan Basis Data (*Database Registry*):** Digunakan untuk kategori yang dinamis dan dapat ditambah oleh Administrator tanpa deployment kode (misal: master jenis tantangan, kategori postingan komunitas).

---

## 193. Strategi Pembaruan Nilai Enum (Enum Change Management)

Menjaga kompatibilitas mundur saat menambahkan status baru:
- Menghindari pengasumsian logika kode bahwa status *hanya bernilai 3 opsi*.
- Gunakan klausa `default` atau penanganan pengecualian pada blok `match()` di PHP untuk mengantisipasi status baru yang belum dikenali antarmuka versi lama.

---

## 194. Kaidah Perancangan Migrasi Basis Data (Migration Rules)

Setiap berkas migrasi Laravel wajib mematuhi 5 kaidah rekayasa:
1. **Fokus Tunggal (*Single Responsibility*):** Satu berkas migrasi hanya membuat atau memodifikasi satu entitas tabel.
2. **Dapat Dibalik (*Reversible*):** Fungsi `down()` wajib mengembalikan kondisi skema ke status sebelum migrasi dijalankan.
3. **Sadar Ketergantungan (*Dependency-Aware*):** Urutan pembuatan tabel mematuhi hierarki kunci asing.
4. **Bebas Galat Sintaks:** Telah diuji pada lingkungan lokal dan CI/CD pengujian otomatis.
5. **Indeks Otomatis:** Setiap kunci asing didefinisikan bersama indeks pencariannya.

---

## 195. Urutan Eksekusi Kronologis Migrasi (Migration Execution Order)

Daftar urutan 21 tahapan migrasi untuk menjamin pemenuhan dependensi relasional:

```text
 1. create_users_table
 2. create_roles_and_permissions_tables
 3. create_member_and_lifestyle_profiles_tables
 4. create_goals_and_metrics_tables
 5. create_health_records_table
 6. create_health_baselines_table
 7. create_behavior_features_table
 8. create_behavior_rule_versions_table
 9. create_behavior_signals_table
10. create_behavior_signal_records_pivot_table
11. create_behavior_insights_table
12. create_recommendations_table
13. create_programs_and_cohort_members_tables
14. create_instructor_assignments_table
15. create_interventions_and_outcomes_tables
16. create_consultations_and_availabilities_tables
17. create_challenges_and_participations_tables
18. create_points_ledger_and_achievements_tables
19. create_community_posts_and_comments_tables
20. create_memberships_and_tiers_tables
21. create_ai_conversations_and_audit_logs_tables
```

---

## 196. Pola Pembaruan Skema Tanpa Downtime (Zero-Downtime Migration Pattern)

AEVYRA menerapkan pola *Expand and Contract* saat mengubah skema di lingkungan produksi:

```text
Langkah 1: Tambahkan Kolom Baru (Expand) ──► Kode Mendukung Kedua Kolom
                                                    │
                                                    ▼
Langkah 2: Migrasikan Nilai Data Historis ──► Data Terisi di Kolom Baru
                                                    │
                                                    ▼
Langkah 3: Hapus Referensi Kolom Lama (Contract) ──► Skema Bersih & Mutakhir
```

Dilarang keras langsung mengganti nama (*rename*) atau menghapus kolom penting dalam satu langkah deployment produksi karena akan memicu galat runtime pada container aplikasi yang sedang aktif.

---

## 197. Tata Kelola Pengisian Ulang Data Massal (Data Backfill Strategy)

Proses pengisian data historis berskala besar (*Data Backfill*):
- Dijalankan secara terpisah dari migrasi skema melalui perintah *Artisan Command* atau *Job Queue*.
- Menggunakan pemrosesan bertahap (*Chunking*) dengan jeda istirahat (*sleep*) mikrodetik untuk mencegah lonjakan beban CPU dan *table locking*.
- Bersifat dapat dilanjutkan kembali (*Resumable*) jika terputus di tengah jalan.

---

## 198. Kebijakan Rilis Migrasi Server Produksi (Production Migration Rules)

Sebelum migrasi dieksekusi di basis data produksi:
- **Pencadangan Wajib (*Mandatory Backup*):** Snapshot cadangan basis data otomatis selesai dibuat.
- **Uji Coba Staging (*Dry-run Verification*):** Migrasi telah lolos uji coba pada basis data replika staging yang memuat volume data nyata.
- **Jendela Pemeliharaan (*Maintenance Window*):** Migrasi besar yang memodifikasi indeks tabel raksasa dijadwalkan pada jam lalu lintas terendah (pukul 02:00 - 04:00 WIB).

---

## 199. Pemeriksaan Integritas Data Berkala (Data Integrity Health Checks)

Skrip pemeliharaan otomatis dijalankan mingguan untuk mendeteksi anomali integritas:
- Memindai rekaman anak yang kehilangan induk (*Orphan Records Scan*).
- Memeriksa inkonsistensi saldo buku besar poin terhadap riwayat perolehan.
- Mendeteksi tumpang tindih slot jadwal konsultasi instruktur (*Overlapping Bookings*).
- Memvalidasi keberadaan rekam kesehatan tanpa pemilik akun yang sah.

---

## 200. Pemantauan Kualitas Data Kesehatan (Health Data Quality Monitoring)

Pipeline pemrosesan data kesehatan secara kontinu memantau metrik kualitas data (*Data Quality Signals*):
- **Nilai Kosong Abnormal (*Missing Rate*):** Lonjakan akun member yang berhenti mencatat log harian.
- **Deviasi Satuan (*Unit Mismatch*):** Peringatan otomatis jika pembacaan sensor menghasilkan angka di luar rentang fisiologis manusia (e.g. glukosa $> 1000\text{ mg/dL}$ atau berat badan $< 10\text{ kg}$).
- **Keterlambatan Sinkronisasi (*Data Staleness*):** Deteksi perangkat wearable pihak ketiga yang gagal menyinkronkan data selama lebih dari 48 jam.

---

## 201. Strategi Pengujian Model Data (Data Model Test Strategy)

Setiap entitas model Eloquent dalam AEVYRA wajib memiliki rangkaian pengujian otomatis (*Automated Test Suite*) yang mencakup 8 dimensi verifikasi:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    8-DIMENSIONAL MODEL TESTING MATRIX                       │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ Dimensi Uji       │ Cakupan Verifikasi Teknis                               │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ 1. Factory        │ Memastikan pabrik model dapat membuat baris valid.      │
│ 2. Validasi Kolom │ Batasan panjang teks, format email, dan rentang numerik.│
│ 3. Relasi Data    │ Keutuhan `belongsTo`, `hasMany`, dan kunci pivot.       │
│ 4. Otorisasi Akses│ Penolakan pembacaan lintas pengguna (User A vs User B). │
│ 5. Transisi State │ FSM status (e.g. DRAFT -> ACTIVE -> COMPLETED).         │
│ 6. Perilaku Hapus │ Uji pencegahan orphan record & kepatuhan soft delete.   │
│ 7. Efisiensi Kueri│ Verifikasi penggunaan indeks pada kueri berulang.       │
│ 8. Batasan Unik   │ Menolak duplikasi email, slug, atau klaim lencana ganda.│
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 202. Contoh Pengujian Relasi & Isolasi Akses (Relationship Test Example)

Pengujian unit untuk memvalidasi kedaulatan data kesehatan antar-member:

```php
/** @test */
public function test_health_record_belongs_to_owner_and_is_isolated_from_strangers(): void
{
    // Given: Dua member terdaftar secara independen
    $memberA = User::factory()->create();
    $memberB = User::factory()->create();

    // When: Member A mencatat log glukosa
    $recordA = HealthRecord::factory()->create([
        'user_id' => $memberA->id,
        'metric_type' => 'blood_glucose',
        'value_numeric' => 110.0
    ]);

    // Then: Member A dapat membaca datanya sendiri
    $this->assertTrue($memberA->healthRecords->contains($recordA));

    // And: Member B ditolak mengakses data Member A via Policy
    $this->assertFalse(Gate::forUser($memberB)->allows('view', $recordA));
}
```

---

## 203. Pengujian Keterlacakan Sinyal Perilaku (Signal Traceability Test)

Uji integrasi untuk memastikan setiap sinyal memiliki bukti pendukung empiris:

```text
Given: Mesin mendeteksi anomali pada log glukosa member
When: Entitas 'BehaviorSignal' diterbitkan
Then:
  [ ] Sinyal wajib memiliki 'baseline_id' yang sah
  [ ] Sinyal wajib memiliki minimal 1 relasi di 'behavior_signal_records'
  [ ] Nilai 'rule_version' wajib terdaftar di tabel 'behavior_rule_versions'
  [ ] Nilai 'priority_score' berada dalam rentang valid (0..100)
```

---

## 204. Pengujian Integritas Resep Intervensi (Intervention Trace Test)

Uji verifikasi hubungan intervensi pendampingan manusia:

```text
Given: Instruktur merumuskan intervensi
When: Model 'Intervention' disimpan ke basis data
Then:
  [ ] Wajib merujuk pada 'member_id' yang memiliki penugasan aktif
  [ ] Kolom 'created_by' terisi identitas instruktur pembuat
  [ ] Terhubung ke 'goal_id' atau 'behavior_signal_id' yang mendasari
  [ ] Status awal bernilai 'ACTIVE' dan 'due_at' berada di masa depan
```

---

## 205. Pengujian Pencegahan Konflik Reservasi (Consultation Integrity Test)

Uji konkurensi reservasi konsultasi (*Race Condition Prevention Test*):

```text
Given: Instruktur membuka 1 slot konsultasi pada pukul 10:00 WIB
When: Dua member mencoba memesan slot tersebut pada detik yang sama secara simultan
Then:
  [ ] Hanya 1 transaksi reservasi yang berhasil (201 Created)
  [ ] Permintaan kedua ditolak secara anggun (409 Conflict / 422 Unprocessable)
  [ ] Tidak terjadi pemesanan ganda (Double-booking) pada basis data
```

---

## 206. Pengujian Idempotensi Hadiah Gamifikasi (Achievement Idempotency Test)

Uji pencegahan eksploitasi perolehan poin dan medali ganda:

```text
Given: Member menyelesaikan seluruh misi dalam Challenge 7 Hari
When: Peristiwa 'ChallengeCompleted' diproses sebanyak 2 kali oleh worker antrean
Then:
  [ ] Tabel 'user_achievements' hanya memuat 1 baris lencana terkait
  [ ] Tabel 'points_ledger' hanya mencatat 1 kali mutasi penambahan reward poin
  [ ] Saldo total poin member tidak bertambah dua kali lipat
```

---

## 207. Pengujian Kepemilikan Utas Percakapan AI (AI Conversation Ownership Test)

Uji kepatuhan privasi riwayat obrolan asisten cerdas:

```text
Given: Member A memiliki riwayat dialog keluhan kesehatan dengan AI
When: Member B mencoba memanggil endpoint 'GET /api/v1/ai/conversations/{id_A}'
Then:
  [ ] Server mengembalikan kode status 403 Forbidden
  [ ] Isi pesan keluhan Member A tidak bocor dalam respons JSON
  [ ] Insiden akses tidak sah dicatat ke dalam 'security_events'
```

---

## 208. Pengujian Integritas Buku Besar Audit (Audit Integrity Test)

Uji verifikasi pencatatan otomatis mutasi peran administratif:

```text
Given: Administrator mengubah peran seorang Member menjadi Instruktur
When: Mutasi peran dieksekusi di database
Then:
  [ ] Peran pengguna target terbarui menjadi 'instructor'
  [ ] Tepat 1 baris baru diterbitkan di tabel 'audit_logs'
  [ ] Kolom 'actor_id' mencatat ID admin penanggung jawab
  [ ] Kolom 'action' bernilai 'user.role.elevated'
```

---

## 209. Daftar Periksa Keamanan Model Data (Data Model Security Checklist)

Daftar periksa 12 poin kepatuhan keamanan sebelum migrasi dirilis ke produksi:

```text
[ ] 1. Kepemilikan Eksplisit: Setiap tabel memiliki kolom 'user_id' penentu wewenang.
[ ] 2. Kunci Asing Ditegakkan: Seluruh relasi diproteksi constraint foreign key database.
[ ] 3. Kolom Sensitif Terklasifikasi: Data medis dan PII telah dipetakan dengan benar.
[ ] 4. Policy Otorisasi Siap: Terdapat Laravel Policy untuk tiap operasi CRUD model.
[ ] 5. Batasan Unik Aktif: Indeks unik mencegah duplikasi email, slug, dan klaim reward.
[ ] 6. Pengindeksan Efisien: Indeks komposit terpasang pada kolom filter kueri utama.
[ ] 7. Kebijakan Hapus Didefinisikan: Soft delete dan restrict diatur secara sadar.
[ ] 8. Kebutuhan Audit Ditentukan: Mutasi kritis terhubung ke audit logger.
[ ] 9. Aturan Retensi Jelas: Masa simpan data aktif dan arsip telah terdokumentasi.
[ ] 10. Enkripsi Terpasang: Kolom sangat rahasia terlindungi enkripsi AES-256 aplikasi.
[ ] 11. Pengidentifikasi Publik Aman: URL publik menggunakan UUIDv7 / NanoID acak.
[ ] 12. Minimisasi Data Ditegakkan: Tidak ada kolom redundan tanpa tujuan terbukti.
```

---

## 210. Daftar Periksa Keselamatan Klinis Data (Data Model Health-Safety Checklist)

Pagar pengaman arsitektur data medis:
- [ ] **Pemisahan Fisik Rekam Medis:** Data kesehatan tersimpan di tabel otoritatif terstruktur, bukan di dalam tabel obrolan AI atau komentar forum.
- [ ] **Tanpa Vonis Diagnosis Palsu:** Basis data tidak menyediakan kolom label diagnosis permanen seperti *"Diabetes Kronis Stadium 3"*; fokus pada metrik terukur (*glucose reading*).
- [ ] **Isolasi Sinyal Perilaku:** Sinyal perilaku diposisikan sebagai indikator deviasi gaya hidup, bukan klasifikasi keparahan gawat darurat medis.
- [ ] **Reproduktibilitas Ilmiah:** Setiap nilai acuan baseline dan sinyal dapat ditelusuri kembali ke titik data log mentah dan versi formula algoritma.
- [ ] **Isolasi Catatan Privat:** Catatan bimbingan instruktur terlindungi dari intipan member tanpa persetujuan tim medis.
- [ ] **Penanganan Insiden Darurat Terpisah:** Log darurat 119 diisolasi dengan retensi audit tingkat tinggi.

---

## 211. Siklus Hidup Data Umum Platform (General Data Lifecycle)

Perjalanan hidup setiap rekaman data dalam sistem AEVYRA:

```text
Penciptaan (Create) ──► Validasi Format & Izin ──► Pemanfaatan Aktif ──► Pembaruan Terkelola
                                                                                │
┌───────────────────────────────────────────────────────────────────────────────┘
│
▼
Pengarsipan Operasional (Archive) ──► Pemusnahan / Anonimisasi Permanen (Purge/PDP)
```

---

## 212. Siklus Hidup Rekam Data Kesehatan (Health Data Lifecycle)

Alur penanganan metrik biologis pengguna:
1. **Penangkapan Data (*Capture*):** Input mandiri member, hasil scan OCR foto strip, atau sinkronisasi perangkat IoT.
2. **Validasi Mutu (*Validation Gates*):** Pengecekan rentang fisiologis dan standardisasi satuan kanonikal.
3. **Penyimpanan Otoritatif (*Storage*):** Penulisan baris data ke tabel `health_records` dengan cap waktu UTC.
4. **Pemrosesan Analitik (*Feature Extraction*):** Data mentah diagregasi ke dalam fitur perilaku harian.
5. **Kalkulasi Derivatif (*Derivation*):** Pembaruan nilai acuan baseline dinamis 14 hari.
6. **Penyajian Antarmuka (*Presentation*):** Ditampilkan dalam bentuk grafik tren ramah pengguna.
7. **Koreksi Terkendali (*Audited Correction*):** Koreksi nilai jika member melakukan kesalahan input log.
8. **Pengarsipan Jangka Panjang (*Retention/Cold Storage*):** Penyimpanan aman selama 5 tahun sesuai regulasi rekam kesehatan.

---

## 213. Siklus Hidup Data Mesin Perilaku (Behavioral Data Lifecycle)

Alur transformasi data dari angka mentah menjadi hasil evaluasi bimbingan:

```text
Log Metrik Mentah ──► Ekstraksi Fitur ──► Nilai Dasar (Baseline) ──► Sinyal Deviasi
                                                                            │
┌───────────────────────────────────────────────────────────────────────────┘
│
▼
Wawasan Edukatif ──► Resep Intervensi ──► Evaluasi Luaran Perilaku ──► Arsip Historis
```

---

## 214. Siklus Hidup Data Percakapan AI (AI Data Lifecycle)

Alur pemrosesan percakapan asisten cerdas:
1. **Inisiasi Sesi (*Conversation Start*):** Member membuka topik obrolan baru terkait keluhan gaya hidup.
2. **Pemilihan Konteks Minim (*Context Assembly*):** Sistem menyusun ringkasan data kesehatan terkini (tanpa membocorkan seluruh database).
3. **Inferensi Model (*LLM Processing*):** Model menghasilkan draf jawaban edukatif berbasis instruksi sistem (*system prompt*).
4. **Pemanggilan Perkakas Terotorisasi (*Tool Calling*):** AI memanggil tool pencarian wawasan dengan validasi izin backend.
5. **Pencatatan Peristiwa Keamanan (*Safety Audit*):** Jika terdeteksi permintaan diagnosis obat, sistem memblokir pesan dan mencatat insiden.
6. **Retensi & Pembersihan (*Retention & Purge*):** Riwayat percakapan disimpan selama 12 bulan sebelum dibersihkan otomatis.

---

## 215. Siklus Hidup Data Bimbingan Instruktur (Instructor Data Lifecycle)

Alur pendampingan manusia (*Human-in-the-Loop*):
- **Awal Penugasan:** Kontrak penugasan diterbitkan oleh Admin; akses bimbingan dibuka.
- **Pemantauan Rutin:** Instruktur meninjau antrean sinyal anomali dan membuka profil bimbingan.
- **Penerbitan Intervensi:** Instruktur merumuskan rekomendasi tindakan preventif dengan target tanggal evaluasi.
- **Tindak Lanjut & Evaluasi:** Instruktur mengevaluasi kepatuhan member dan menutup tiket intervensi.
- **Akhir Penugasan:** Masa kohor selesai; hak akses aktif ditutup dan riwayat tersimpan sebagai catatan historis.

---

## 216. Siklus Hidup Tata Kelola Administratif (Admin Data Lifecycle)

Alur pemeliharaan sistem oleh Administrator:
- **Konfigurasi Parameter:** Penerbitan aturan sistem, bobot sinyal, dan katalog program.
- **Pemanfaatan Operasional:** Pemantauan metrik agregat kesehatan dan antrean moderasi.
- **Pencatatan Audit Otomatis:** Setiap mutasi konfigurasi tersimpan imutabel di buku besar audit.
- **Pengarsipan & Pembaruan:** Revisi silabus program berkala dengan manajemen nomor versi.

---

## 217. Anti-Pola Desain: Satu Tabel Raksasa (One Giant Table Anti-Pattern)

AEVYRA secara tegas menolak pembuatan satu tabel raksasa (*God-Table Anti-Pattern*):

> [!CAUTION]
> **Mengapa Anti-Pola "Health Everything" Ditolak:**
> - Merusak integritas skema dan validasi tipe data bawaan SQL (*strict typing*).
> - Menghilangkan kemampuan pengindeksan komposit performa tinggi pada rentang waktu.
> - Mempersulit penegakan izin akses granular (*column-level security*) dan audit kepatuhan PDP/GDPR.

Solusi AEVYRA: Pemisahan domain modular dengan batas kepemilikan dan skema relasional yang bersih.

---

## 218. Anti-Pola Desain: Semua Disimpan di JSON (Everything JSON Anti-Pattern)

Menolak kebiasaan malas menampung seluruh atribut dinamis ke dalam kolom `user.metadata` berbasis JSON:
- Kolom JSON tidak dapat menegakkan tipe data numerik yang kaku pada tingkat basis data.
- Kueri pencarian dan agregasi di dalam array JSON lambat dan sulit dioptimalkan dengan indeks B-Tree standar.
- Kolom yang sering difilter atau dihitung wajib menjadi kolom relasional formal.

---

## 219. Anti-Pola Desain: Duplikasi Sumber Kebenaran (Duplicate Source of Truth)

Menghindari penyimpanan nilai yang sama di berbagai tabel tanpa konsistensi transaksional:
- **Contoh Buruk:** Menyimpan `health_score` di tabel `users`, tabel `member_profiles`, dan tabel `dashboard_summaries`.
- Jika terjadi kegagalan sinkronisasi, data akan saling bertentangan dan merusak kepercayaan pengguna.
- **Solusi AEVYRA:** Tetapkan satu tabel pemilik fakta otoritatif; data lain mengambil via relasi atau dihitung saat dibutuhkan (*Single Source of Truth*).

---

## 220. Anti-Pola Desain: Menjadikan AI Sebagai Basis Data (AI as Database Anti-Pattern)

Menolak anggapan bahwa riwayat obrolan teks AI dapat menggantikan basis data kesehatan terstruktur:
- Teks percakapan AI tidak terstruktur, rentan terhadap halusinasi model, dan tidak dapat diaudit secara kuantitatif.
- Rekam kesehatan wajib memiliki skema relasional terstandar yang diverifikasi oleh aturan validasi backend.

---

## 221. Anti-Pola Desain: Instruktur Memiliki Data Kesehatan Member (Instructor-Owned Data)

Menolak struktur basis data yang menempatkan data kesehatan sebagai milik pribadi instruktur:
- **Pola Keliru:** Member hanya menjadi atribut anak dari entitas instruktur.
- **Pola Sejati AEVYRA:** Member adalah pemilik berdaulat atas rekam kesehatannya. Instruktur hanyalah profesional berlisensi yang menerima hak akses terbatas dan berbatas waktu melalui relasi penugasan resmi.

---

## 222. Anti-Pola Desain: Mode Dewa Admin (Admin God-Mode Anti-Pattern)

Menolak asumsi bahwa kolom `is_admin = true` otomatis membuka seluruh enkripsi rekam medis pengguna:
- Kuasa administratif difokuskan pada infrastruktur dan kepatuhan sistem.
- Akses ke rekam medis individual wajib melewati protokol pintu darurat resmi (*Break-Glass*) dengan alasan yuridis dan otorisasi ganda.

---

## 223. Anti-Pola Desain: Mutasi Tanpa Jejak Audit (No Audit History Anti-Pattern)

Menolak eksekusi aksi mutasi kritis secara langsung tanpa meninggalkan jejak:
- Pengubahan peran pengguna, pembatalan langganan, penghapusan postingan komunitas, atau penyesuaian resep intervensi tanpa audit log adalah cacat arsitektur kepatuhan medikolegal.

---

## 224. Anti-Pola Desain: Hapus Destruktif Massal (Delete Everything Anti-Pattern)

Menolak penggunaan `ON DELETE CASCADE` secara serampangan pada entitas induk pengguna:
- Menghapus akun pengguna tidak boleh menghapus riwayat intervensi klinis dan jejak audit keamanan masa lampau yang diwajibkan oleh undang-undang kesehatan untuk disimpan selama minimal 5 tahun.

---

## 225. Tabel Fondasi Tahap MVP (Recommended MVP Tables)

Daftar 17 tabel prioritas utama untuk fondasi rilis awal platform (*Minimum Viable Product*):

| No | Nama Tabel | Domain Arsitektural | Keterangan & Peran Inti |
| :---: | :--- | :--- | :--- |
| 1 | `users` | Identitas & Akses | Akun autentikasi utama dan status operasional |
| 2 | `roles` | Identitas & Akses | Peran otorisasi sistem (member, instructor, admin) |
| 3 | `permissions` | Identitas & Akses | Hak akses fungsional granular |
| 4 | `member_profiles` | Profil Anggota | Data demografis dan preferensi anggota |
| 5 | `goals` | Sasaran Hidup | Target komitmen perilaku preventif |
| 6 | `health_records` | Rekam Kesehatan | Repositori fakta pengukuran biologis primer |
| 7 | `health_baselines` | Inteligensi Perilaku | Acuan fisiologis bergerak (*rolling baseline*) |
| 8 | `behavior_features` | Inteligensi Perilaku | Variabel analitik turunan agregasi harian |
| 9 | `behavior_signals` | Inteligensi Perilaku | Sinyal deviasi kebiasaan terstandar |
| 10 | `behavior_insights` | Inteligensi Perilaku | Narasi wawasan edukatif ramah pengguna |
| 11 | `recommendations` | Inteligensi Perilaku | Opsi tindakan mikro terukur untuk anggota |
| 12 | `interventions` | Pendampingan | Resep bimbingan instruktur profesional |
| 13 | `instructor_member_assignments` | Pendampingan | Kontrak penugasan aktif (dasar otorisasi akses) |
| 14 | `programs` | Pendampingan | Kurikulum kohor bimbingan kesehatan terstruktur |
| 15 | `consultations` | Konsultasi | Reservasi dan dokumentasi sesi tatap muka |
| 16 | `notifications` | Saluran Komunikasi | Antrean notifikasi dan pengingat terdistribusi |
| 17 | `audit_logs` | Audit Forensik | Buku besar imutabel pencatatan mutasi sensitif |

---

## 226. Tabel Peningkatan Prioritas 1 (Recommended P1 Tables)

Penambahan 8 tabel untuk modul tantangan hidup sehat dan orkestrasi asisten AI:

| No | Nama Tabel | Domain Arsitektural | Keterangan & Peran Inti |
| :---: | :--- | :--- | :--- |
| 18 | `challenges` | Gamifikasi Sehat | Master tantangan hidup sehat berbatas waktu |
| 19 | `challenge_tasks` | Gamifikasi Sehat | Rincian misi harian terukur dalam tantangan |
| 20 | `challenge_participations` | Gamifikasi Sehat | Pendaftaran dan progres partisipasi anggota |
| 21 | `challenge_task_completions` | Gamifikasi Sehat | Bukti verifikasi penyelesaian tugas harian |
| 22 | `ai_conversations` | Percakapan AI | Utas dialog tematik dengan asisten cerdas |
| 23 | `ai_messages` | Percakapan AI | Riwayat kronologis pesan dialog percakapan |
| 24 | `ai_tool_executions` | Percakapan AI | Jejak forensik eksekusi perkakas (*function calls*) |
| 25 | `instructor_availabilities` | Konsultasi | Slot jadwal reguler ketersediaan instruktur |

---

## 227. Tabel Peningkatan Prioritas 2 (Recommended P2 Tables)

Penambahan 9 tabel untuk ekosistem gamifikasi positif, forum komunitas, dan keanggotaan:

| No | Nama Tabel | Domain Arsitektural | Keterangan & Peran Inti |
| :---: | :--- | :--- | :--- |
| 26 | `points_ledger` | Gamifikasi Sehat | Buku besar mutasi poin imutabel (*event-sourced*) |
| 27 | `achievements` | Gamifikasi Sehat | Katalog medali dan lencana apresiasi |
| 28 | `user_achievements` | Gamifikasi Sehat | Rekam perolehan lencana yang berhasil dibuka |
| 29 | `community_posts` | Komunitas Sehat | Ruang diskusi publik dan berbagi kisah perjalanan |
| 30 | `community_comments` | Komunitas Sehat | Tanggapan dan diskusi interaktif antarmember |
| 31 | `community_reactions` | Komunitas Sehat | Reaksi apresiasi positif tanpa kompetisi toksik |
| 32 | `community_reports` | Moderasi Komunitas | Kanal pelaporan konten yang melanggar keselamatan |
| 33 | `membership_tiers` | Keanggotaan | Paket tingkatan langganan layanan |
| 34 | `memberships` | Keanggotaan | Status langganan aktif dan riwayat pembaruan |

---

## 228. Tabel Arsitektur Masa Depan (Future Advanced Tables)

Tabel eksplorasi untuk fase kemitraan institusi klinis dan perangkat IoT tingkat lanjut:
- `wearable_connections`: Manajemen token OAuth perangkat IoT (Garmin, Fitbit, Oura).
- `external_clinical_records`: Integrasi rekam medis rumah sakit standar HL7/FHIR.
- `daily_health_summaries`: Tabel agregasi materialisasi kueri analitik performa tinggi.
- `organization_contracts`: Tata kelola kemitraan korporasi program kesehatan karyawan.

---

## 229. Diagram ERD Minimal Tahap MVP (Minimal MVP ERD)

Cetak biru hubungan entitas paling ringkas untuk pembuktian konsep kompetisi:

```text
users ──┬──► member_profiles
        ├──► goals ──► goal_metrics
        ├──► health_records ──► health_baselines ──► behavior_signals ──► behavior_insights ──► recommendations
        ├──► instructor_member_assignments ◄── instructors (users)
        │                                          │
        ├──► interventions ◄───────────────────────┘
        ├──► consultations ◄───────────────────────┘
        └──► notifications
```

---

## 230. Keselarasan Model Data dengan Lingkaran Tertutup (Closed-Loop Alignment)

Skema basis data AEVYRA dirancang secara presisi untuk menopang siklus lingkaran tertutup (*Closed-Loop Behavioral Engine*):

```text
1. HealthRecord Dibuat ──► 2. Baseline Dihitung ──► 3. Sinyal Anomali Terbit
                                                               │
┌──────────────────────────────────────────────────────────────┘
│
▼
4. Wawasan Diterbitkan ──► 5. Saran Rekomendasi ──► 6. Intervensi Dilaksanakan
                                                               │
┌──────────────────────────────────────────────────────────────┘
│
▼
7. Log Kesehatan Baru Tercatat ──► 8. Luaran Hasil Dievaluasi ──► 9. Baseline Diperbarui
```

---

## 231. Matriks Keterlacakan Data Multi-Lapis (Data Traceability Matrix)

Kemampuan penelusuran relasional antar-tabel dalam AEVYRA:
- **Melacak Wawasan:** `behavior_insights` $\rightarrow$ `behavior_signal_id` $\rightarrow$ `health_baselines` $\rightarrow$ `health_records`.
- **Melacak Intervensi:** `interventions` $\rightarrow$ `instructor_id` + `behavior_signal_id` + `user_id`.
- **Melacak Luaran:** `intervention_outcomes` $\rightarrow$ `intervention_id` $\rightarrow$ rentang waktu observasi sebelum dan sesudah.

---

## 232. Penegakan Keterjelasan Narasi Wawasan (Data Explainability)

Setiap klaim yang tampil di antarmuka member wajib didukung oleh rujukan kolom basis data empiris:

```text
Pernyataan di Layar Pengguna:
"Pola tidur Anda mengalami penurunan konsistensi 3 malam terakhir."

Wajib Dapat Dibuktikan Melalui Kueri Basis Data:
- Metrik: metric_type = 'sleep_duration'
- Rentang Observasi: 3 hari terakhir vs window_start..window_end di health_baselines
- Deviasi: value_numeric vs value_primary pada health_baselines
- Versi Aturan: rule_version = '2.0' di behavior_rule_versions
```

---

## 233. Keterjelasan Konteks Masukan Model AI (AI Context Explainability)

Asisten cerdas menerima konteks terstruktur yang telah disaring, bukan kueri liar:
- AI menerima ringkasan: `baseline_value`, `recent_average`, `deviation_percent`, dan `goal_title`.
- Model AI tidak pernah diberikan akses langsung ke tabel basis data mentah tanpa melalui filter lapisan keamanan API domain.

---

## 234. Penegakan Privasi Melalui Struktur Data (Privacy-by-Design Data Model)

Struktur skema mempermudah penegakan hukum privasi:
- Kolom `user_id` yang konsisten di seluruh tabel mempermudah kueri ekspor data hak subjek (*Data Subject Access Request*).
- Pemisahan data profil publik dan data klinis sensitif mencegah kebocoran data pada fitur forum komunitas.

---

## 235. Narasi Nilai Arsitektur untuk Penjurian Kompetisi (Competition Architecture Pitch)

Struktur model data AEVYRA membuktikan keunggulan rekayasa perangkat lunak kepada dewan juri:

> **Diferensiasi Rekayasa:** Bukan sekadar aplikasi CRUD percakapan biasa, melainkan platform rekam jejak inteligensi perilaku berstandar industri medis.

Skema data AEVYRA membuktikan:
1. **Fakta Medis Otoritatif** yang terlindungi dan terstandarisasi.
2. **Mesin Derivatif Matematis** yang dapat dihitung ulang dan diuji secara objektif.
3. **Sentuhan Empati Manusia (*Human-in-the-Loop*)** yang terdokumentasi akuntabel.
4. **Buku Besar Forensik Imutabel** yang siap memenuhi audit kepatuhan industri kesehatan.

---

## 236. Rekomendasi Struktur Direktori Model Laravel (Eloquent Model IA)

Struktur pengorganisasian berkas model pada framework Laravel:

```text
app/Models/
├── User.php                          ├── Intervention.php
├── Role.php                          ├── InterventionOutcome.php
├── Permission.php                    ├── Consultation.php
├── MemberProfile.php                 ├── InstructorAvailability.php
├── LifestyleProfile.php              ├── Program.php
├── Goal.php                          ├── Challenge.php
├── GoalMetric.php                    ├── ChallengeTask.php
├── HealthRecord.php                  ├── ChallengeParticipation.php
├── HealthBaseline.php                ├── PointsLedger.php
├── BehaviorFeature.php               ├── Achievement.php
├── BehaviorRuleVersion.php           ├── CommunityPost.php
├── BehaviorSignal.php                ├── CommunityComment.php
├── BehaviorInsight.php               ├── Membership.php
├── Recommendation.php                ├── Notification.php
└── AuditLog.php
```

---

## 237. Evolusi Struktur Domain Modular (Domain-Driven Architecture)

Ketika kompleksitas basis kode meningkat di fase lanjutan:

```text
app/Domain/
├── Identity/       (User, Role, Permission, Auth Policies)
├── Health/         (HealthRecord, UnitTransformers, MetricRegistries)
├── BehaviorEngine/ (BaselineCalculator, SignalDetectors, RuleEngines)
├── Support/        (Intervention, Consultation, Availability, Notes)
├── AI/             (PromptManager, ToolExecutors, HandoffManager)
├── Gamification/   (PointsLedger, AchievementEngine, Streaks)
├── Community/      (Posts, Comments, Reactions, ModerationService)
└── Audit/          (AuditLogger, ForensicSearchQuery, PrivacyGuards)
```

---

## 238. Prinsip Definisi Relasi Eloquent (Model Relationship Principles)

Relasi antar-model didefinisikan secara eksplisit menggunakan metode resmi Eloquent:

```php
// User.php
public function healthRecords(): HasMany
{
    return $this->hasMany(HealthRecord::class);
}

// BehaviorSignal.php
public function baseline(): BelongsTo
{
    return $this->belongsTo(HealthBaseline::class, 'baseline_id');
}

public function supportingRecords(): BelongsToMany
{
    return $this->belongsToMany(
        HealthRecord::class, 
        'behavior_signal_records', 
        'signal_id', 
        'health_record_id'
    )->withTimestamps();
}
```

---

## 239. Proteksi Keamanan Model Eloquent (Model Protection Architecture)

Setiap kelas model wajib mengonfigurasi proteksi keamanan atribut:
- **Penetapan Kolom Aman (`$fillable`):** Hanya mendaftarkan kolom yang sah diubah oleh formulir pengguna.
- **Penyembunyian Kolom Sensitif (`$hidden`):** Menyembunyikan `password`, `remember_token`, dan token rahasia dari serialisasi JSON.
- **Pengecekan Otorisasi Form Request:** Memastikan input divalidasi sebelum menyentuh lapisan model.

---

## 240. Pencegahan Kerentanan Mass Assignment (Mass Assignment Protection)

AEVYRA melarang keras memasukkan payload mentah permintaan klien langsung ke dalam metode pembuatan model:

> [!CAUTION]
> **Dilarang (Rentan Eksploitasi):**
> ```php
> HealthRecord::create($request->all());
> ```

> [!TIP]
> **Diwajibkan (Tervalidasi Aman):**
> ```php
> HealthRecord::create($request->validated());
> ```

---

## 241. Pemanfaatan Eloquent Attribute Casting (Attribute Casting Standards)

Memanfaatkan fitur casting otomatis PHP 8.2+ untuk integritas tipe data:

```php
protected $casts = [
    'recorded_at'       => 'datetime',
    'value_numeric'     => 'decimal:4',
    'status'            => HealthRecordStatus::class,
    'quality_status'    => QualityStatusEnum::class,
    'metadata'          => 'array',
    'is_active'         => 'boolean',
];
```

---

## 242. Kebijakan Model Events vs Domain Actions (Model Events Policy)

AEVYRA membatasi penggunaan *Eloquent Observers / Model Magic Events*:
- Logika bisnis kritis (seperti penerbitan intervensi atau transfer poin) **tidak boleh disembunyikan** di dalam event model `saved()` atau `updated()`.
- Logika bisnis wajib dieksekusi secara transparan melalui *Domain Action Classes* (e.g. `PrescribeInterventionAction::execute()`) agar alur data mudah dibaca dan diuji.

---

## 243. Registri Layanan Domain Khusus (Domain Services Architecture)

Tugas komputasi kompleks dipisahkan ke dalam layanan domain terdedikasi:
- `BaselineCalculationService`: Menghitung nilai acuan 14 hari member.
- `SignalDetectionService`: Mengevaluasi aturan deteksi anomali pada log baru.
- `InterventionPrescriptionService`: Mengelola alokasi tiket bimbingan instruktur.
- `ConsultationSchedulingService`: Menangani booking tatap muka dengan pessimistic lock.
- `AIToolExecutionService`: Memvalidasi dan mengeksekusi tool calling asisten cerdas.

---

## 244. Kapan Lapisan Repository Diperlukan (Repository Layer Policy)

Penggunaan pola *Repository* diterapkan secara pragmatis:
- Tidak perlu membuat repository untuk operasi CRUD model sederhana.
- Gunakan *Query Service / Repository* khusus saat kueri melibatkan agregasi multi-tabel yang rumit, penggabungan cache Redis, atau kueri linimasa kesehatan terpadu.

---

## 245. Prinsip Kesederhanaan Akses Data (Data Access Simplicity)

Memilih abstraksi paling sederhana yang tetap memenuhi:
1. **Kebenaran Faktual (*Correctness*)**
2. **Keamanan Otorisasi (*Security*)**
3. **Kemudahan Pengujian (*Testability*)**
4. **Kemudahan Pemeliharaan (*Maintainability*)**

---

## 246. Standar Dokumentasi Entitas Baru (Entity Documentation Standard)

Setiap pengembang yang mengajukan tabel baru di AEVYRA wajib melampirkan spesifikasi 10 poin:
1. Tujuan Bisnis Entitas (*Purpose*)
2. Pemilik Data Sah (*Data Owner*)
3. Tingkat Sensitivitas Privasi (*Sensitivity Tier*)
4. Peta Relasi Kunci Asing (*Foreign Keys*)
5. Siklus Hidup Status (*Lifecycle*)
6. Desain Indeks Kueri (*Index Strategy*)
7. Aturan Otorisasi Akses (*Authorization Rules*)
8. Jadwal Retensi (*Retention Policy*)
9. Perilaku Penghapusan (*Delete Constraints*)
10. Kemampuan Rekonstruksi (*Rebuildability*)

---

## 247. Daftar Periksa Pembuatan Entitas Baru (New Entity Checklist)

Sebelum membuat berkas migrasi baru, jawablah pertanyaan arsitektur berikut:
- [ ] Mengapa entitas ini harus berupa tabel tersendiri di basis data?
- [ ] Siapa pengguna atau sistem pemilik sah baris data ini?
- [ ] Apakah data ini bersifat otoritatif (fakta primer) atau derivatif (bisa dihitung ulang)?
- [ ] Siapa saja peran yang memiliki hak membaca dan menulis data ini?
- [ ] Apakah entitas ini memuat data rekam medis atau PII yang memerlukan audit log?
- [ ] Indeks apa saja yang dibutuhkan agar kueri tabel ini tidak lambat?

---

## 248. Pertanyaan Peninjauan Model Data (Data Model Review Questions)

Pertanyaan audit sebelum arsitektur basis data disetujui:
> *"Dapatkah kita menjelaskan dengan pasti dari mana asal setiap baris data ini?"*  
> *"Dapatkah kita membuktikan secara forensik siapa yang membaca data kesehatan member ini?"*  
> *"Dapatkah kita menghitung ulang seluruh analisis sinyal jika rumusnya kami perbarui besok?"*  
> *"Dapatkah member menghapus akun pribadinya dengan aman tanpa merusak keutuhan riwayat sistem?"*  

---

## 249. Kriteria Penyelesaian Arsitektur Data (Completion Acceptance Criteria)

Arsitektur data AEVYRA dinyatakan siap untuk tahap produksi (*Production-Ready*) apabila:

- [ ] Seluruh 34 tabel relasional utama telah didefinisikan dengan tipe data
- [ ] Batasan foreign key dan aturan delete constraint terpasang di database
- [ ] Kunci unik komposit aktif untuk mencegah klaim ganda dan duplikasi akun
- [ ] Indeks komposit terpasang pada seluruh kolom pencarian frekuensi tinggi
- [ ] Pemisahan kedaulatan data member, instruktur, dan admin ditegakkan
- [ ] Data kesehatan otoritatif terisolasi dari konten teks asisten AI
- [ ] Rekonstruksi data derivatif terbukti dapat berjalan dari data mentah
- [ ] Pola transaksi ACID membungkus mutasi data multi-tabel yang sensitif
- [ ] Pabrik data model (Factories) siap digunakan untuk pengujian otomatis
- [ ] Urutan kronologis 21 berkas migrasi Laravel bebas dari konflik dependensi

---

## 250. Diagram Arsitektur Data Menyeluruh (Final Comprehensive Data Architecture)

Cetak biru holistik platform AEVYRA yang mengintegrasikan seluruh aktor dan pipeline komputasi:

```text
                                  ┌──────────────┐
                                  │    USERS     │
                                  └──────┬───────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
            ┌───────────────┐                         ┌───────────────┐
            │MEMBER_PROFILES│                         │     GOALS     │
            └───────┬───────┘                         └───────┬───────┘
                    │                                         │
                    └────────────────────┬────────────────────┘
                                         ▼
                                ┌─────────────────┐
                                │ HEALTH_RECORDS  │ ◄── (Manual / OCR / IoT)
                                └────────┬────────┘
                                         │
                                         ▼ (Pipeline Komputasi Derivatif)
                                ┌─────────────────┐
                                │HEALTH_BASELINES │ (Acuan 14 Hari Dinamis)
                                └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │BEHAVIOR_FEATURES│ (Tren, Deviasi, Variabilitas)
                                └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │BEHAVIOR_SIGNALS │ (Deteksi Pola Anomali Gaya Hidup)
                                └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │BEHAVIOR_INSIGHTS│ (Narasi Penjelasan Empatis)
                                └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │ RECOMMENDATIONS │ (Pilihan Tindakan Konkret)
                                └────────┬────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
            ┌───────────────┐                         ┌───────────────┐
            │  USER ACTION  │                         │ INTERVENTIONS │ (Human-in-the-Loop)
            │(Habit/Reminder│                         │  Resep Tim    │
            │ / Challenge)  │                         │  Instruktur   │
            └───────┬───────┘                         └───────┬───────┘
                    │                                         │
                    └────────────────────┬────────────────────┘
                                         ▼
                                ┌─────────────────┐
                                │ NEW HEALTH DATA │ (Pencatatan Log Siklus Baru)
                                └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │BEHAVIOR_OUTCOMES│ (Evaluasi Efektivitas Intervensi)
                                └─────────────────┘

          INSTRUCTOR SUPPORT                       ADMIN GOVERNANCE
        ┌─────────────────────┐                 ┌─────────────────────┐
        │ INSTRUCTOR_PROFILES │                 │ USER & ROLE MANAGEM.│
        │ INSTRUCTOR_ASSIGNM. │                 │ COMMUNITY MODERATION│
        │ CONSULTATIONS       │                 │ CONFIG & FEAT. FLAGS│
        │ PRIVATE_NOTES       │                 │ AUDIT_LOGS FORENSIK │
        └─────────────────────┘                 └─────────────────────┘
```

---

## 251. Prinsip Puncak Arsitektur Data AEVYRA (Final Guiding Principle)

> [!TIP]
> **Prinsip Puncak Model Data AEVYRA:**  
> **"Arsitektur data AEVYRA wajib membuat kepemilikan data, silsilah asal-usul, relasi entitas, batas otorisasi, dan keterlacakan ilmiah menjadi eksplisit, transparan, dan tidak terbantahkan."**

Arsitektur data AEVYRA dirancang untuk memungkinkan alur bernilai tinggi yang berkesinambungan:

$$\mathbf{TANGKAP} \longrightarrow \mathbf{PAHAMI} \longrightarrow \mathbf{DETEKSI} \longrightarrow \mathbf{JELASKAN} \longrightarrow \mathbf{INTERVENSI} \longrightarrow \mathbf{PANTAU} \longrightarrow \mathbf{EVALUASI}$$

Sambil secara teguh memegang pilar integritas teknologi kesehatan modern:

```text
Kedaulatan Privasi Member (Privacy by Default)
                     +
Keutuhan Relasional Mutlak (Referential Integrity)
                     +
Auditabilitas Forensik Imutabel (Append-Only Audit)
                     +
Reproduktibilitas Saintifik (Scientific Reproducibility)
                     +
Keamanan Berlapis (Defense-in-Depth Security)
                     +
Pagar Keselamatan Klinis (Clinical Safety Boundaries)
```

> [!IMPORTANT]
> **Pernyataan Pamungkas:**  
> **Data kesehatan otoritatif tetap terstruktur secara relasional, inteligensi perilaku tetap terlacak secara ilmiah, AI bertindak sebagai pendukung dialog edukatif tanpa wewenang vonis sepihak, dan setiap akses terhadap data sensitif dibatasi secara ketat oleh kontrak relasi bimbingan yang sah.**