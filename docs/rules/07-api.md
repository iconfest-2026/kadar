# PRONOIA — Kaidah Rekayasa Titik Akhir API & Standar Integrasi Layanan (API Engineering Rules & Service Integration Standards)

Dokumen spesifikasi teknis ini menetapkan standar rekayasa titik akhir (*endpoints*), tata kelola kontrak data (*API contracts*), protokol komunikasi antarmuka pemrograman aplikasi (API), serta arsitektur integrasi layanan pada platform **PRONOIA**. Titik akhir API bertindak sebagai gerbang terdepan (*perimeter gateway*) yang menghubungkan seluruh antarmuka klien—mulai dari aplikasi web progresif pengguna (*Member PWA*), portal instruktur kesehatan (*Instructor Dashboard*), panel kendali administrator (*Admin Command Center*), hingga konsumen layanan internal dan integrasi sistem pihak ketiga terpercaya (*trusted third-party integrations*).

Seluruh API PRONOIA dirancang mengadopsi kaidah **RESTful Berorientasi Sumber Daya (*Resource-Oriented RESTful Architecture*)**, penataan versi jalur seragam (*URI Path Versioning* `/api/v1/...`), skema respons beramplop tunggal (*canonical unified response envelope*), serta penegakan protokol keamanan tingkat tinggi sesuai standar **OWASP API Security Top 10 (2023)** dan **Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022)**. Setiap titik akhir beroperasi di bawah prinsip hak akses terendah (*Principle of Least Privilege*), menolak paparan data sensitif secara implisit, serta menerapkan isolasi ketat terhadap logika inferensi kecerdasan buatan (*AI*) agar tidak pernah menggantikan kalkulasi deterministik kesehatan yang teruji secara klinis.

---

### Kontrol Dokumen & Metadata Titik Akhir API

| Parameter Dokumen | Spesifikasi Teknis / Status Resmi |
| :--- | :--- |
| **Nomor Dokumen Standar** | `PRONOIA-RULE-007` |
| **Versi Standar API** | `v1.0.0-PROD` (Edisi Standar Kontrak Terpadu & ICONFEST 2026) |
| **Tanggal Efektif Berlaku** | 17 September 2026 |
| **Status Otorisasi** | Resmi Disetujui / Berlaku Mutlak (*Mandatory API Engineering Standard*) |
| **Klasifikasi Akses** | Seluruh Perekayasa API, Perekayasa Frontend, Arsitek Sistem, & Tim QA |
| **Gaya Arsitektur API** | RESTful JSON API berpasak HTTP/1.1 & HTTP/2 dengan Enkripsi TLS 1.3 |
| **Format Serialisasi Data** | UTF-8 Encoded JSON (`application/json`) & MIME Type Validated Multipart |
| **Mekanisme Otentikasi** | Token Pembawa Bearer State-Free (Laravel Sanctum / JWT Berotasi Aman) |
| **Spesifikasi Dokumentasi** | OpenAPI Specification v3.1 / Scalar & Swagger UI Interaktif |
| **Kepatuhan Privasi & Regulasi** | UU PDP No. 27/2022, OWASP API Security Top 10 (2023), ISO/IEC 27001:2022 |

---

### Matriks 10 Klaster Rekayasa Titik Akhir API PRONOIA

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                 TOPOLOGI TITIK AKHIR API & INTEGRASI LAYANAN PLATFORM PRONOIA              │
└───────────────────────────────────────────────────────────────────────────────────────────┘
   │
   ├── [Klaster 1] Fondasi Arsitektur RESTful & Pengelolaan Versi API (Bagian 1 – 7)
   │   └── Definisi Tujuan, RESTful JSON, URI Versioning, Kontrak Tak Boleh Pecah, Batas Ramping
   │
   ├── [Klaster 2] Otentikasi, Otorisasi Ketat, & Sanitasi Masukan (Bagian 8 – 14)
   │   └── Bearer Token, Policy Otorisasi, Verifikasi Kepemilikan, Anti-Injeksi ID, Form Request
   │
   ├── [Klaster 3] Format Respons Kanonikal, Transformasi, & Penanganan Galat (Bagian 15 – 27)
   │   └── Envelope Standar, Transformasi API Resource, Masking Sensitif, HTTP Status & Galat Baku
   │
   ├── [Klaster 4] Pembatasan Laju, Keamanan Berkas, & Integrasi Visi Pemindai (Bagian 28 – 33)
   │   └── Rate Limiting Bertingkat, Batas Payload, Presigned URL, Pemindai Gizi & Label Makanan
   │
   ├── [Klaster 5] Titik Akhir Kecerdasan Buatan & Pagar Pembatas Fallback (Bagian 34 – 39)
   │   └── Chat AI Konseptual, Pagar Pembatas Fallback, Penghentian Darurat, Streaming SSE Aman
   │
   ├── [Klaster 6] Titik Akhir Wawasan, Intervensi, Tantangan, & Konsultasi (Bagian 40 – 47)
   │   └── Wawasan Berbasis Bukti, Intervensi Kebiasaan, Tantangan Komunitas, Jadwal Konsultasi
   │
   ├── [Klaster 7] Kueri Linimasa, Paginasi Kursor, Kinerja, & Cache (Bagian 48 – 60)
   │   └── Linimasa Harian, Filter Rentang Waktu, Kursor Keyset Paginasi, SLA <200ms, ETag & Cache
   │
   ├── [Klaster 8] Tata Kelola Privasi, Batas Keamanan, Webhook, & CORS (Bagian 61 – 73)
   │   └── Kepatuhan UU PDP, Isolasi Klinis, Verifikasi Webhook Pihak Ke-3, Strict CORS & WAF
   │
   ├── [Klaster 9] Observabilitas, Batasan Beban, Transaksi, & Pengujian API (Bagian 74 – 86)
   │   └── Trace Correlation ID, Anti-Spam Bulk, Transaksi ACID Terkunci, Otomasi Pengujian Pest
   │
   └── [Klaster 10] Integrasi Ekosistem PWA, Arsitektur Terpadu, & Kaidah Pamungkas (Bagian 87 – 95)
       └── Sinkronisasi Offline PWA, Penanda Header Klien, Audit Integritas, & Doktrin Kedaulatan API
```

---

## 1. Tujuan & Ruang Lingkup Rekayasa API (Purpose & API Scope)

Kaidah ini menetapkan standar perancangan, implementasi, keamanan, dan pemeliharaan antarmuka pemrograman aplikasi (*Application Programming Interface* / API) untuk platform **PRONOIA**. Seluruh titik akhir API dirancang untuk menyediakan akses terkelola, aman, dan berkinerja tinggi terhadap kemampuan inti sistem bagi seluruh ekosistem klien:

1. **Aplikasi Web Progresif Pengguna (*Member PWA Client*):** Mengakses data biometrik pribadi, skor kesiapan harian, pemindai nutrisi & label makanan, visualisasi tren kesehatan, asisten percakapan AI, serta modul gamifikasi.
2. **Dasbor Profesional Instruktur (*Instructor Web Dashboard*):** Meninjau ringkasan metrik kesehatan anggota binaan yang telah memberikan persetujuan (*consented members*), riwayat intervensi, serta jadwal konsultasi daring/luring.
3. **Pusat Komando Administrator (*Admin Command Center*):** Mengelola operasional sistem, log audit keamanan, analitik agregat teranonimkan, manajemen pengguna dan lisensi, serta konfigurasi katalog intervensi.
4. **Klien Aplikasi Terhubung & PWA Luring (*Connected Edge & PWA Offline Sync*):** Mendukung sinkronisasi perubahan lokal saat koneksi pulih melalui protokol rekonsiliasi yang aman dari konflik.
5. **Konsumen Layanan Internal & Pekerja Latar Belakang (*Internal Micro-services & Worker Queues*):** Berkomunikasi melalui kontrak antarmuka deterministik untuk kalkulasi sinyal klinis dan pengiriman notifikasi terpusat.
6. **Integrasi Pihak Ketiga Terpercaya (*Trusted Third-Party Webhooks & Integrations*):** Menerima peristiwa eksternal (seperti pembaruan gateway pembayaran atau telemetri perangkat kebugaran) melalui verifikasi tanda tangan kriptografi.

> [!IMPORTANT]
> API PRONOIA berkedudukan sebagai batas penegakan keamanan tertinggi (*highest security perimeter*). Tidak ada logika bisnis atau aturan otorisasi yang boleh dialihkan berasumsi telah diverifikasi oleh klien frontend. Seluruh permintaan diperlakukan sebagai masukan dari lingkungan yang tidak dipercaya (*zero-trust client boundary*).

---

## 2. Arsitektur Layanan RESTful API (RESTful API Architecture)

Setiap permintaan HTTP yang ditujukan ke API PRONOIA wajib melalui alur pipa pemrosesan (*pipeline flow*) yang terstruktur, linear, dan tidak boleh melewati tahapan gerbang keamanan:

```text
Permintaan Klien (HTTP / HTTPS)
       │
       ▼
[Lapisan 1: Gerbang Keamanan Jaringan & Pembatasan Laju (WAF, TLS 1.3, Rate Limiter)]
       │
       ▼
[Lapisan 2: Otentikasi Identitas Token Pembawa (Bearer Token Authentication / Sanctum)]
       │
       ▼
[Lapisan 3: Otorisasi Peran & Kebijakan Hak Akses (Role Authorization & Policy Checks)]
       │
       ▼
[Lapisan 4: Validasi & Sanitasi Masukan Berlapis (Form Request Validation)]
       │
       ▼
[Lapisan 5: Kontroler Ramping Terarah (Thin Controller Invocations)]
       │
       ▼
[Lapisan 6: Layanan Domain & Aksi Bisnis Murni (Domain Service & Action Execution)]
       │
       ▼
[Lapisan 7: Transformasi Kontrak Beramplop Baku (API Resource Serialization)]
       │
       ▼
Respons Terstandarisasi Klien (JSON 200/201/4xx/5xx Envelope)
```

Tabel berikut menguraikan fungsi spesifik pada setiap lapisan arsitektur:

| Tahapan Alur | Komponen Penanggung Jawab | Fungsi & Batasan Keamanan |
| :--- | :--- | :--- |
| **1. Gerbang & Laju** | Nginx / Cloudflare / Middleware Laravel | Menolak lonjakan lalu lintas mencurigakan, inspeksi header CORS, dan verifikasi TLS. |
| **2. Otentikasi** | `auth:sanctum` Guard | Memverifikasi validitas token pembawa (*Bearer Token*), mengekstrak identitas aktor server-side. |
| **3. Otorisasi** | Laravel Gate & Resource Policies | Menolak aktor jika tidak memiliki izin aksi terhadap sumber daya yang ditargetkan. |
| **4. Validasi** | Dedicated `FormRequest` Classes | Memeriksa tipe data, batasan nilai, keberadaan data relasional, dan menolak injeksi muatan. |
| **5. Kontroler** | Single-Action / Resource Controller | Menerima data terpercaya dari FormRequest, memanggil Action/Service, dan mengembalikan Resource. |
| **6. Logika Domain** | Dedicated Domain Action / Service | Melakukan kalkulasi deterministik, orkestrasi transaksi basis data, dan dispatching event. |
| **7. Serialisasi** | Eloquent API Resource / DTO | Membatasi bidang data yang diekspos, menyamarkan data rahasia, dan membungkus respons dalam amplop baku. |

---

## 3. Pengelolaan Versi API pada URI Jalur (URI Path API Versioning)

Platform PRONOIA menerapkan strategi penataan versi berbasis jalur URL secara eksplisit (*URI Path Versioning*) untuk seluruh antarmuka publik dan aplikasi klien:

* **Format Jalur Baku:**
  ```text
  GET    /api/v1/health/metrics
  POST   /api/v1/scanner/nutrition-facts
  POST   /api/v1/consultations/bookings
  ```
* **Larangan Jalur Tanpa Versi:**
  ```text
  ❌ DILARANG KERAS: /api/metrics (Menyulitkan evolusi skema data dan berisiko merusak kompatibilitas klien)
  ```

Penerapan penataan versi melalui jalur URL memberikan kejelasan mutlak bagi perekayasa frontend dan klien PWA yang mungkin berjalan dalam mode luring (*cached service workers*). Transisi skema data dapat dikelola secara bertahap melalui penyediaan rute paralel tanpa mengganggu instalasi aplikasi yang sedang aktif di perangkat pengguna.

---

## 4. Prinsip Stabilitas & Siklus Hidup Versi Kontrak (Contract Versioning Principles)

Sebuah versi API merepresentasikan **kontrak data yang stabil (*stable contract*)**, bukan cerminan dari setiap perubahan internal kode backend:

1. **Perubahan Kompatibel Mundur (*Backward-Compatible Changes*):** Perubahan minor seperti penambahan properti baru yang bersifat opsional pada payload respons atau penambahan rute titik akhir baru **tidak memerlukan pembuatan versi API baru (`v2`)**. Klien frontend diwajibkan mengabaikan properti tambahan yang belum dikenal (*tolerant reader pattern*).
2. **Pemicu Perubahan Versi Utama (*Breaking Changes*):** Versi baru (`v2`) wajib diterbitkan hanya jika terjadi perubahan mendasar yang merusak klien lawas:
   - Penghapusan atau pengubahan nama kunci bidang (*field name renaming/removal*).
   - Perubahan tipe data fundamental (misalnya dari `string` menjadi `array` objek).
   - Pengubahan format satuan metrik (misalnya dari miligram ke gram tanpa konversi otomatis).
   - Pengetatan aturan validasi yang mewajibkan masukan baru yang sebelumnya tidak ada.
   - Perubahan struktur amplop respons global (*breaking response envelope restructure*).

> [!NOTE]
> Versi lama wajib dipelihara (*maintained with deprecation notice*) minimal selama 6 (enam) bulan sebelum dinonaktifkan sepenuhnya, guna memberikan waktu transisi bagi pengguna PWA yang belum melakukan pembaruan berkas *cache*.

---

## 5. Desain Sumber Daya Berorientasi REST (REST-Oriented Resource Design)

Perancangan titik akhir wajib berorientasi pada **sumber daya (*Resource-Oriented REST Design*)**, bukan berorientasi pada prosedur atau kata kerja:

* **Pola Penamaan Standar (Kata Benda Jamak & Bersarang Terkendali):**
  ```text
  GET    /api/v1/health/metrics           -> Mengambil koleksi metrik kesehatan
  POST   /api/v1/health/metrics           -> Mencatat entri metrik baru
  GET    /api/v1/health/metrics/{id}      -> Mengambil detail entri metrik spesifik
  PUT    /api/v1/health/metrics/{id}      -> Memperbarui data entri metrik secara penuh
  DELETE /api/v1/health/metrics/{id}      -> Menghapus entri metrik secara aman
  GET    /api/v1/members/{id}/interventions -> Mengambil intervensi terkait anggota spesifik
  ```

* **Larangan Anti-Pola Berorientasi Kata Kerja (*RPC-Style Anti-Patterns*):**
  ```text
  ❌ DILARANG: POST /api/v1/saveHealthMetricData
  ❌ DILARANG: GET  /api/v1/getMemberProfile
  ❌ DILARANG: POST /api/v1/deleteMetricRecord?id=123
  ```

Penggunaan kata kerja hanya ditoleransi sebagai **sub-sumber daya aksi transaksional khusus (*action sub-resources*)** yang tidak dapat dipetakan secara alami ke metode CRUD standar, misalnya: `POST /api/v1/consultations/<built-in function id>/cancel` atau `POST /api/v1/auth/logout`.

---

## 6. Pengelompokan Rute Berbasis Domain Bisnis (Domain-Oriented API Route Groups)

Titik akhir API dikelompokkan secara logis ke dalam domain bisnis yang kohesif guna memudahkan penataan rute, isolasi middleware, dan dokumentasi OpenAPI:

```text
/api/v1/auth             -> Otentikasi, pendaftaran, penyegaran token, dan keluar sistem
/api/v1/profile          -> Pengaturan profil pengguna, preferensi privasi, dan perangkat
/api/v1/health           -> Metrik vital, gula darah, tekanan darah, berat badan, & tren
/api/v1/insights         -> Sinyal kesehatan deterministik, skor kesiapan, & anomali
/api/v1/interventions    -> Program intervensi mikro, rencana aksi harian, & evaluasi
/api/v1/challenges       -> Partisipasi tantangan hidup sehat, milestone, & peringkat
/api/v1/gamification     -> Poin, lencana penghargaan (*badges*), & riwayat pencapaian
/api/v1/consultations    -> Reservasi sesi, profil instruktur, & log konsultasi klinis
/api/v1/scanner          -> Pemindaian komposisi nutrisi, label kemasan, & riwayat pindaian
/api/v1/ai               -> Asisten percakapan konteks tertutup & rekomendasi perilaku
/api/v1/instructor       -> Dasbor pemantauan anggota binaan & catatan intervensi
/api/v1/admin            -> Audit sistem, manajemen katalog, & analitik agregat
```

Setiap kelompok domain memiliki berkas rute terdedikasi di direktori `routes/api/` (misalnya `routes/api/health.php`) yang dimuat secara modular oleh penyedia layanan rute aplikasi (*RouteServiceProvider*).

---

## 7. Tanggung Jawab Tunggal Titik Akhir (Single Endpoint Responsibility)

Setiap titik akhir API wajib memiliki **tanggung jawab tunggal (*Single Responsibility Principle*)** yang jelas dan terdefinisi dengan presisi:

* **Larangan Titik Akhir Komposit Monolitik (*God Endpoints*):**
  ```text
  ❌ DILARANG: POST /api/v1/dashboard/everything
  (Menggabungkan pencatatan metrik, pembuatan janji temu, dan pengiriman pesan AI dalam satu panggilan)
  ```
* **Kaidah Tanggung Jawab Terfokus:**
  - Satu titik akhir mutasi (`POST`/`PUT`/`PATCH`) hanya boleh melakukan perubahan pada satu agregat domain utama.
  - Titik akhir pembacaan dasbor (`GET /api/v1/dashboard/summary`) diizinkan mengagregasi data ringkasan untuk performa tampilan, namun **bersifat murni hanya-baca (*idempotent read-only aggregation*)** tanpa menimbulkan efek samping perubahan status.

Pemisahan tanggung jawab menjamin isolasi galat (*fault isolation*); kegagalan pada subsistem AI atau pemindai gambar tidak akan melumpuhkan fungsi pencatatan gula darah darurat pengguna.

---

## 8. Standarisasi Protokol Otentikasi Bearer Token (Bearer Token Authentication)

Seluruh titik akhir yang menangani data pengguna privat atau operasional sistem wajib mewajibkan otentikasi identitas yang sah:

```http
GET /api/v1/health/metrics HTTP/1.1
Host: api.pronoia.id
Authorization: Bearer 14|7kFh9u3QpLx2...
Accept: application/json
```

Prinsip penegakan otentikasi:
1. **Identifikasi Sisi Server (*Server-Side Actor Extraction*):** Identitas pengguna yang melakukan permintaan wajib diekstrak secara eksklusif dari token pembawa (*Bearer Token*) yang diverifikasi oleh middleware `auth:sanctum`.
2. **Larangan Menelan Identitas dari Muatan Klien:** Backend tidak boleh mempercayai klaim identitas yang dikirimkan melalui badan permintaan (*request body*), parameter kueri URL, atau header kustom yang dapat dipalsukan klien:
   ```text
   ❌ DILARANG: GET /api/v1/health/metrics?user_id=88
   ❌ DILARANG: Membaca header 'X-User-Id: 88' tanpa verifikasi sesi kriptografis
   ```
3. **Pemberian Masa Kedaluwarsa Token (*Token Expiration & Rotation*):** Token otentikasi memiliki batas waktu aktif dan mendukung mekanisme pembatalan seketika (*immediate token revocation*) saat pengguna melakukan *logout* atau terdeteksi anomali keamanan.

---

## 9. Penegakan Kebijakan Otorisasi Sisi Server (Server-Side Policy Authorization)

Otentikasi yang berhasil **hanya membuktikan siapa pengguna tersebut**, namun sama sekali **tidak memberikan hak untuk mengakses sembarang sumber daya**. Setiap titik akhir terproteksi wajib menegakkan otorisasi eksplisit:

```text
Permintaan Terotentikasi (Aktor Terverifikasi)
                   │
                   ▼
       [Siapa yang Meminta? (Aktor: Member / Instruktur / Admin)]
                   │
                   ▼
       [Sumber Daya Apa yang Ditargetkan? (Contoh: HealthMetric ID #402)]
                   │
                   ▼
       [Aksi Apa yang Hendak Dilakukan? (Lihat / Sunting / Hapus)]
                   │
                   ▼
   {Apakah Aktor Memiliki Izin Sah Terhadap Aksi pada Sumber Daya Tersebut?}
           ├── YA  ──> Lanjutkan ke Kontroler & Layanan Bisnis
           └── TIDAK ──> Tolak Seketika dengan Respons HTTP 403 Forbidden
```

Penegakan otorisasi diimplementasikan secara deklaratif menggunakan **Laravel Policy Classes** (`php artisan make:policy HealthMetricPolicy`) dan dipanggil pada kontroler melalui `$this->authorize('view', $metric)` sebelum logika bisnis dieksekusi.

---

## 10. Kontrol Akses Berbasis Peran Pengguna (Role-Based Access Control - RBAC)

Titik akhir yang peka terhadap peran wajib menegakkan pemisahan tegas antara tiga entitas peran utama dalam sistem PRONOIA:

| Peran (*Role*) | Lingkup Hak Akses (*Scope of Authority*) | Larangan Mutlak (*Hard Boundaries*) |
| :--- | :--- | :--- |
| **Member** | Hanya memiliki akses penuh terhadap data pribadi miliknya sendiri, konten publik, dan sesi konsultasi aktifnya. | Dilarang mengakses data pengguna lain, log sistem, atau panel konfigurasi administratif. |
| **Instructor** | Memiliki akses terhadap profil anggota binaan yang telah memberikan persetujuan relasi klinis aktif. | Dilarang mengakses catatan pribadi anggota di luar program binaan, data keuangan platform, atau kredensial. |
| **Admin** | Memiliki akses terhadap agregat sistem teranonimkan, audit log, katalog intervensi, dan administrasi peran. | Dilarang membaca riwayat percakapan AI personal anggota tanpa izin audit forensik resmi bertanda tangan digital. |

Pemeriksaan peran diterapkan melalui middleware gabungan: `middleware(['auth:sanctum', 'role:instructor'])` untuk memblokir permintaan tidak sah pada lapis batas terluar.

---

## 11. Otorisasi Kepemilikan Baris Data (Resource Ownership Authorization)

Untuk sumber daya milik pengguna (*user-owned resources*), kepemilikan wajib disematkan langsung dari model pengguna yang terotentikasi di sisi server:

```php
// ✅ BENAR & AMAN: Menetapkan relasi kepemilikan dari sesi server-side yang terotentikasi
public function store(StoreHealthMetricRequest $request, CreateHealthMetricAction $action): JsonResponse
{
    $metric = $action->execute(
        user: $request->user(),
        data: $request->validated()
    );

    return (new HealthMetricResource($metric))
        ->response()
        ->setStatusCode(Response::HTTP_CREATED);
}
```

```php
// ❌ CACAT KEAMANAN: Membaca kepemilikan dari payload masukan pengguna
public function store(Request $request): JsonResponse
{
    $metric = HealthMetric::create([
        'user_id' => $request->input('user_id'), // Rentan manipulasi ID (BOLA/IDOR)
        'metric_type' => $request->input('metric_type'),
        'value' => $request->input('value'),
    ]);
}
```

Pola ini meniadakan celah kerentanan *Broken Object Level Authorization* (BOLA / IDOR) di mana penyerang dapat memodifikasi `user_id` dalam payload JSON untuk menyusupkan catatan data atas nama pengguna lain.

---

## 12. Larangan Pengendalian Kepemilikan oleh Klien (Prohibition of Client-Controlled Ownership)

Titik akhir yang melayani peran **Member** dilarang keras menerima masukan `user_id`, `member_id`, atau `account_id` di dalam badan permintaan (*request body*) untuk menentukan target kepemilikan entitas:

```json
// ❌ DITOLAK: Permintaan dari peran Member tidak boleh menentukan user_id sasaran
POST /api/v1/health/metrics
{
  "user_id": 99482,
  "metric_type": "blood_glucose",
  "value": 115.0
}
```

Aturan validasi `FormRequest` untuk peran Member wajib menolak atau mengabaikan keberadaan parameter `user_id` secara ketat:

```php
public function rules(): array
{
    return [
        'metric_type' => ['required', new Enum(MetricType::class)],
        'value'       => ['required', 'numeric', 'min:10', 'max:1000'],
        'measured_at' => ['required', 'date', 'before_or_equal:now'],
        'notes'       => ['nullable', 'string', 'max:500'],
        // 'user_id' TIDAK BOLEH DIDAFTARKAN DI SINI
    ];
}
```

Pengecualian hanya berlaku untuk titik akhir khusus Administrator atau sistem integrasi internal yang memiliki izin delegasi data dengan audit log eksplisit.

---

## 13. Validasi Permintaan Melalui Form Request (Form Request Validation)

Setiap titik akhir mutasi (`POST`, `PUT`, `PATCH`, `DELETE`) wajib menerapkan validasi masukan yang ketat sebelum data menyentuh lapisan kontroler atau layanan domain:

1. **Kelas FormRequest Terdedikasi (*Dedicated Form Requests*):** Logika validasi dilarang ditulis langsung di dalam blok kontroler menggunakan `$request->validate([...])`. Wajib membuat kelas FormRequest terpisah (misalnya `StoreConsultationBookingRequest`).
2. **Kriteria Validasi Komprehensif:**
   - **Keberadaan (*Presence*):** Bedakan secara tegas antara bidang wajib (*required*), opsional (*nullable*), atau kondisional (*required_if*).
   - **Tipe Data Primitif (*Types*):** Validasi tipe data numerik (*integer*, *float*), teks (*string*), logika (*boolean*), atau larik (*array*).
   - **Rentang Klinis & Batas Ukuran (*Ranges & Bounds*):** Tetapkan nilai minimum dan maksimum yang masuk akal secara medis (contoh: glukosa darah 10 - 1000 mg/dL).
   - **Format Khusus (*Formats*):** Format tanggal-waktu wajib mematuhi standar ISO 8601 (`date_format:Y-m-d\TH:i:sP`).
   - **Nilai Terhitung (*Enums*):** Nilai masukan kategori wajib divalidasi terhadap PHP 8.3 Backed Enums (`new Enum(ConsultationStatus::class)`).
   - **Integritas Relasi Basis Data (*Existence & Uniqueness*):** Gunakan aturan `exists:` dan `unique:` dengan cakupan penyewa (*tenant scoped*).
   - **Keamanan Muatan Berkas (*File Upload Security*):** Periksa tipe MIME asli, ekstensi yang diizinkan (`image/jpeg`, `image/png`, `image/webp`), dan batas ukuran berkas maksimum (maksimal 5 MB).

---

## 14. Standarisasi Format Respons Galat Validasi HTTP 422 (Validation Error Response Structure)

Ketika validasi masukan gagal, API wajib mengembalikan respons kesalahan terstruktur dengan kode status **HTTP 422 Unprocessable Entity**:

```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data yang dikirimkan tidak memenuhi kriteria validasi sistem.",
    "details": {
      "value": [
        "Nilai kadar gula darah harus berada di antara 10 mg/dL dan 1000 mg/dL."
      ],
      "measured_at": [
        "Waktu pengukuran tidak boleh melebihi waktu saat ini."
      ]
    }
  }
}
```

Format respons kesalahan validasi wajib konsisten di seluruh platform:
- Kunci `code` selalu bernilai `"VALIDATION_ERROR"`.
- Kunci `message` memberikan ringkasan yang ramah bagi pembaca manusia (*human-readable*).
- Kunci `details` memetakan nama atribut yang salah ke larik pesan galat spesifik.

---

## 15. Standarisasi Pembungkus Respons Sukses JSON (Standard Success Response Envelope)

Seluruh respons sukses dari API PRONOIA wajib dibungkus dalam **amplop kanonikal terpadu (*Canonical Unified Success Envelope*)**:

```json
{
  "success": true,
  "data": {
    "id": "0191eb54-6178-74d3-8b77-3e144a2c149b",
    "type": "blood_glucose",
    "value": 112.5,
    "unit": "mg/dL",
    "context": "fasting",
    "measured_at": "2026-09-17T07:30:00+07:00",
    "created_at": "2026-09-17T07:35:12+07:00"
  },
  "meta": {
    "timestamp": "2026-09-17T07:35:12+07:00",
    "api_version": "v1"
  }
}
```

Aturan struktur amplop sukses:
- `success`: Nilai boolean konstan `true`.
- `data`: Objek atau larik data payload utama hasil serialisasi API Resource.
- `meta`: Objek metadata pelengkap yang memuat stempel waktu respons (*ISO 8601 UTC/WIB*) dan versi API aktif.

---

## 16. Struktur Standar Respons Koleksi Data (Collection Response Structure)

Untuk titik akhir yang mengembalikan sekumpulan data (*collection endpoints*), struktur amplop diperluas dengan metadata paginasi kursor (*cursor pagination metadata*):

```json
{
  "success": true,
  "data": [
    {
      "id": "0191eb54-6178-74d3-8b77-3e144a2c149b",
      "type": "blood_glucose",
      "value": 112.5,
      "unit": "mg/dL"
    },
    {
      "id": "0191eb49-14a2-7102-9901-7fa11c20bb12",
      "type": "blood_glucose",
      "value": 128.0,
      "unit": "mg/dL"
    }
  ],
  "meta": {
    "timestamp": "2026-09-17T22:30:00+07:00",
    "api_version": "v1",
    "pagination": {
      "per_page": 20,
      "next_cursor": "eyJpZCI6IjAxOTFlYjQ5LTE0YTI...In0=",
      "prev_cursor": null,
      "has_more": true
    }
  }
}
```

Jika tidak ada data yang ditemukan sesuai kriteria filter, `data` wajib dikembalikan sebagai larik kosong `[]`, bukan bernilai `null`, demi mencegah *TypeError* pada klien JavaScript.

---

## 17. Transformasi Data Melalui Laravel API Resources (API Resource Transformers)

Backend PRONOIA **wajib menggunakan Laravel API Resource** (`JsonResource`) atau kelas serialisasi eksplisit untuk menyusun respons. Dilarang keras mengembalikan model Eloquent secara mentah:

```php
// ❌ DILARANG KERAS: Mengembalikan model Eloquent mentah secara langsung
public function show(HealthMetric $healthMetric): HealthMetric
{
    return $healthMetric; // Membocorkan struktur tabel dan berpotensi mengekspos bidang tersembunyi
}
```

```php
// ✅ BENAR & TERSTANDARISASI: Menggunakan Resource Transformator Eksplisit
public function show(HealthMetric $healthMetric): JsonResponse
{
    return (new HealthMetricResource($healthMetric))
        ->response()
        ->setStatusCode(Response::HTTP_OK);
}
```

Manfaat wajib penggunaan API Resource:
- **Pemisahan Kendali (*Decoupling*):** Perubahan nama kolom pada skema basis data tidak serta-merta merusak kontrak API publik.
- **Pencegahan Kebocoran Kolom Internal:** Mencegah kolom internal seperti `deleted_at`, `internal_flags`, atau kunci asing relasional internal terekspos tanpa sengaja.
- **Format Satuan Eksplisit:** Memastikan transformasi data seperti nilai pecahan, representasi tanggal ISO 8601, dan nama enum tersaji secara konsisten.

---

## 18. Objek Transfer Data Respons Terstruktur (Response Data Transfer Objects)

Untuk titik akhir komposit yang menyajikan representasi tampilan agregat lintas domain bisnis yang kompleks, backend menggunakan **Objek Transfer Data Respons (*Response DTOs*)**:

* **Kasus Penggunaan DTO Khusus:**
  - `HealthDashboardDTO`: Menggabungkan skor kesiapan terkini, pembacaan vital terakhir, sinyal anomali aktif, dan status intervensi hari ini.
  - `InstructorCohortSummaryDTO`: Mengompilasi statistik kepatuhan anggota binaan, tingkat risiko klinis teragregasi, dan jadwal janji temu mendesak.
  - `DailyReadinessEvaluationDTO`: Memuat rincian kalkulasi fisiologis, metrik dasar (*baseline*), deviasi standar, dan rekomendasi mikro.

DTO menjamin pengetikan ketat (*strict typing*) pada tingkat kode PHP, mempermudah pengujian fitur menggunakan mock data, serta menjadi sumber kebenaran tunggal (*single source of truth*) dalam pembuatan spesifikasi OpenAPI/Swagger.

---

## 19. Pencegahan Pemaparan Kolom Sensitif (Sensitive Field Scrubbing)

API PRONOIA memberlakukan aturan tanpa toleransi (*zero tolerance*) terhadap paparan bidang sensitif ke dalam respons HTTP:

> [!CAUTION]
> Jangan pernah mengekspos atribut rahasia, kredensial, atau data diagnostik internal berikut dalam respons API apa pun:
> - Hash kata sandi pengguna (`password_hash` / `password`).
> - Token reset kata sandi, token verifikasi email, atau token sesi aktif.
> - Kunci API eksternal pihak ketiga (misalnya: OpenAI API Key, Anthropic Key, FCM Server Key).
> - Kunci rahasia webhook (*webhook signing secrets*).
> - Jejak tumpukan galat mentah (*stack traces*) pada lingkungan produksi.
> - Kueri SQL mentah beserta parameter ikatan (*raw SQL bindings*).
> - Informasi infrastruktur jaringan internal (alamat IP privat peladen, kredensial Redis, port DB).

Seluruh model Eloquent wajib menyertakan atribut rahasia ini di dalam larik `$hidden = [...]`, dan transformer API Resource wajib menyaringnya secara aktif.

---

## 20. Standarisasi Respons Data Kesehatan & Metrik (Health Metric Response Standards)

Data kesehatan merupakan kategori data pribadi spesifik yang diatur secara ketat oleh Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022). Respons data kesehatan wajib dibatasi sesuai konteks aktor yang meminta:

* **Respons untuk Aktor Member:**
  - Hanya menerima data biometrik, pembacaan glukosa, tekanan darah, dan wawasan milik akun pribadinya.
  - Nilai metrik disajikan lengkap dengan satuan baku (`mg/dL`, `mmHg`, `bpm`, `kg`).
  - Dilengkapi label kategori deterministik (`normal`, `warning`, `critical`).
* **Penyajian Penafian Medis (*Mandatory Medical Disclaimer*):**
  - Seluruh respons wawasan kesehatan dan evaluasi kesiapan wajib menyertakan objek metadata penafian bahwa informasi sistem berfungsi sebagai pendukung gaya hidup preventif, bukan diagnosis medis pengganti dokter berlisensi.

---

## 21. Pembatasan Cakupan Respons Titik Akhir Instruktur (Instructor API Scoped Responses)

Titik akhir yang dikonsumsi oleh instruktur kesehatan (*Instructor API*) wajib menerapkan prinsip pembatasan lingkup data (*data scoping*):

* **Informasi yang Diizinkan Diekspos:**
  - Nama panggilan dan avatar anggota binaan aktif yang telah menandatangani persetujuan relasi (*consented coaching cohort*).
  - Ringkasan kepatuhan intervensi dan tren metrik kesehatan agregat selama masa bimbingan aktif.
  - Catatan konsultasi yang dibuat bersama oleh instruktur terkait.
* **Informasi yang Dilarang Diekspos:**
  - Alamat tempat tinggal lengkap, nomor induk kependudukan (NIK), atau nomor kontak pribadi anggota.
  - Riwayat percakapan asisten AI privat anggota.
  - Data kesehatan anggota lain yang tidak berada dalam bimbingan aktif instruktur tersebut.

Pelanggaran pembatasan lingkup data instruktur diklasifikasikan sebagai insiden kebocoran privasi tingkat tinggi.

---

## 22. Batasan Respons Titik Akhir Administrator (Admin API Scoped Responses)

Titik akhir untuk peran Administrator (*Admin API*) difokuskan pada pengawasan operasional platform, agregasi sistem, dan kesehatan infrastruktur:

* **Penyajian Data Operasional & Agregat:**
  - Statistik pengguna aktif harian (*DAU*) dan bulanan (*MAU*).
  - Metrik agregat teranonimkan (misal: persentase keberhasilan penurunan glukosa rata-rata seluruh populasi tanpa identitas personal).
  - Log audit keamanan sistem, antrean pekerja latar belakang, dan status konektivitas integrasi pihak ketiga.
  - Pengelolaan katalog master (tipe metrik, template tantangan, daftar pustaka intervensi).
* **Larangan Mengintip Data Klinis Personal:**
  - Administrator teknis tidak memiliki akses bebas untuk menelusuri data biometrik individu anggota tertentu tanpa adanya tiket audit investigasi resmi yang tercatat di log kepatuhan.

---

## 23. Standardisasi Kode Galat Aplikasi Internal (Application Error Code Taxonomy)

Seluruh kegagalan permintaan API wajib menyertakan **kode galat mesin (*machine-readable error codes*)** dalam format `UPPERCASE_SNAKE_CASE` agar klien frontend dapat melakukan penanganan logika secara deterministik:

| Kode Galat Mesin | Kode HTTP | Deskripsi Penyebab |
| :--- | :--- | :--- |
| `UNAUTHENTICATED` | 401 | Permintaan tidak menyertakan token otentikasi yang valid atau sesi telah kedaluwarsa. |
| `FORBIDDEN` | 403 | Pengguna terotentikasi tidak memiliki wewenang atau hak akses terhadap sumber daya sasaran. |
| `RESOURCE_NOT_FOUND` | 404 | Entitas data yang ditargetkan tidak ditemukan dalam sistem atau tidak dimiliki aktor. |
| `VALIDATION_ERROR` | 422 | Muatan data masukan tidak memenuhi spesifikasi skema atau batasan validasi klinis. |
| `CONFLICT` | 409 | Terjadi konflik konkurensi data atau duplikasi entri unik yang melanggar invarian bisnis. |
| `RATE_LIMIT_EXCEEDED` | 429 | Frekuensi permintaan klien telah melampaui kuota ambang batas laju yang ditetapkan. |
| `AI_SERVICE_UNAVAILABLE` | 503 | Subsistem inferensi AI eksternal sedang mengalami gangguan atau batas waktu terlampaui. |
| `INTERNAL_SERVER_ERROR` | 500 | Terjadi kegagalan logika internal yang tidak tertangani di sisi backend peladen. |

---

## 24. Standardisasi Kode Status HTTP Semantik (Semantic HTTP Status Codes)

Penggunaan kode status HTTP wajib mematuhi konvensi semantik protokol standar:

* **Keberhasilan (2xx):**
  - `200 OK`: Permintaan baca (`GET`) berhasil, atau mutasi data (`PUT`/`PATCH`/`POST`) yang mengembalikan data hasil modifikasi.
  - `201 Created`: Pembuatan sumber daya baru (`POST`) berhasil dilakukan.
  - `202 Accepted`: Permintaan telah diterima dan dijadwalkan ke antrean asinkron untuk pemrosesan lebih lanjut.
  - `204 No Content`: Aksi penghapusan (`DELETE`) berhasil dan tidak ada muatan tubuh yang perlu dikembalikan.
* **Kesalahan Klien (4xx):**
  - `400 Bad Request`: Format permintaan cacat sintaksis (misalnya JSON malformed).
  - `401 Unauthorized`: Token pembawa tidak ada atau tidak valid.
  - `403 Forbidden`: Pengguna sah namun tidak memiliki wewenang aksi.
  - `404 Not Found`: Sumber daya tidak ditemukan.
  - `409 Conflict`: Benturan status data (misal: reservasi slot yang telah terisi).
  - `422 Unprocessable Entity`: Kegagalan validasi masukan semantik.
  - `429 Too Many Requests`: Pembatasan laju permintaan terpicu.
* **Kesalahan Peladen (5xx):**
  - `500 Internal Server Error`: Kegagalan fatal internal peladen.
  - `503 Service Unavailable`: Layanan sedang dalam pemeliharaan atau layanan pihak ketiga terputus.

---

## 25. Standarisasi Penanganan Galat Otorisasi HTTP 401 & 403 (Authorization Error Handling)

Ketika pengguna yang terotentikasi sah mencoba mengakses atau memanipulasi sumber daya yang bukan miliknya atau berada di luar batas perannya, API wajib mengembalikan respons **HTTP 403 Forbidden**:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Anda tidak memiliki wewenang untuk mengakses atau mengubah catatan data ini.",
    "details": null
  }
}
```

Kaidah Penanganan Otorisasi:
- **Penyembunyian Sumber Daya Peka (*Silent 404 vs 403*):** Jika keberadaan suatu ID sumber daya sensitif tidak boleh diketahui oleh penyerang (misalnya ID dokumen medis rahasia), sistem diizinkan mengembalikan **HTTP 404 Not Found** alih-alih 403, guna mencegah teknik perambahan identitas (*enumeration scanning*).
- **Pencatatan Insiden Keamanan (*Security Audit Logging*):** Setiap insiden penolakan 403 pada sumber daya klinis wajib dicatat ke dalam log audit keamanan lengkap dengan ID aktor, alamat IP, agen pengguna, dan stempel waktu.

---

## 26. Standarisasi Respons Sumber Daya Tidak Ditemukan HTTP 404 (Resource Not Found Handling)

Ketika sumber daya data yang ditargetkan dalam URL tidak ditemukan dalam basis data atau tidak berada dalam lingkup kepemilikan pengguna aktif, API wajib mengembalikan respons **HTTP 404 Not Found**:

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Sumber daya data yang Anda cari tidak ditemukan atau telah dihapus.",
    "details": null
  }
}
```

Prinsip Penegakan 404:
- **Kueri Terikat Kepemilikan (*Ownership-Scoped Queries*):** Selalu gunakan kueri relasi scoped (misalnya `$request->user()->healthMetrics()->findOrFail($id)`). Jika ID metrik milik pengguna lain diminta, Laravel otomatis melempar `ModelNotFoundException` yang bertransformasi menjadi 404. Hal ini mencegah penyerang mengetahui apakah suatu rekaman data orang lain eksis di sistem (*anti-enumeration*).
- **Format Konsisten:** Respons 404 untuk rute API yang tidak terdaftar (*unmatched routes*) maupun entitas yang tidak ditemukan wajib menggunakan struktur amplop galat yang identik.

---

## 27. Standarisasi Penanganan Konflik Status HTTP 409 (Conflict Response Handling)

Kode status **HTTP 409 Conflict** wajib dikembalikan ketika permintaan klien bentrok dengan status mutakhir sistem atau melanggar invarian bisnis unik:

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "success": false,
  "error": {
    "code": "SLOT_ALREADY_BOOKED",
    "message": "Slot waktu konsultasi yang Anda pilih telah dipesan oleh pengguna lain. Silakan pilih slot lain.",
    "details": {
      "slot_id": "0191eb70-33a1-7d11-80bb-901e129188ab",
      "conflicted_at": "2026-09-18T10:00:00+07:00"
    }
  }
}
```

Skenario Pemicu Respons 409:
1. **Reservasi Bersamaan (*Concurrent Booking*):** Dua anggota mencoba memesan slot konsultasi eksklusif instruktur yang sama pada detik yang bersamaan.
2. **Duplikasi Partisipasi Aktif (*Duplicate Active Enrollment*):** Pengguna mencoba mendaftar kembali ke program tantangan (*challenge*) yang sedang berstatus aktif di akunnya.
3. **Pencatatan Ganda Idempoten (*Duplicate Submission Collision*):** Permintaan pencatatan transaksi yang melanggar batasan keunikan komposit (misal: entri metrik dengan `user_id`, `metric_type`, dan `measured_at` yang sama persis).

---

## 28. Kebijakan Pembatasan Laju Permintaan (API Rate Limiting Architecture)

Untuk mencegah serangan kehabisan sumber daya (*denial of service*), penyalahgunaan (*scraping*), dan kelebihan beban komputasi mahal, seluruh titik akhir API wajib dilindungi oleh **kebijakan pembatasan laju (*Rate Limiting*)**:

| Kategori Titik Akhir | Ambang Batas Laju (*Default Limit*) | Alasan Pembatasan Ketat |
| :--- | :--- | :--- |
| **Otentikasi & Masuk (`/api/v1/auth/login`)** | 5 permintaan / menit per IP | Mencegah serangan tebak kata sandi (*brute-force attacks*). |
| **Pendaftaran (`/api/v1/auth/register`)** | 3 pendaftaran / jam per IP | Mencegah pendaftaran akun bot massal (*mass spam registrations*). |
| **Inferensi Percakapan AI (`/api/v1/ai/chat`)** | 10 kueri / menit per Akun | Mengendalikan biaya token API eksternal dan beban LLM. |
| **Pemindaian Gambar (`/api/v1/scanner/*`)** | 5 pindaian / menit per Akun | Menghemat pemrosesan memori computer vision dan bandwidth. |
| **Kueri Metrik Reguler (`/api/v1/health/*`)** | 60 permintaan / menit per Akun | Penggunaan standar interaksi dasbor dan visualisasi grafik. |

Implementasi pembatasan laju menggunakan `RateLimiter::for(...)` berbasis cache Redis dengan kunci identifikasi gabungan antara ID pengguna terotentikasi dan alamat IP klien.

---

## 29. Standarisasi Format Respons Pembatasan Laju HTTP 429 (Rate Limit Response Structure)

Ketika klien melampaui kuota laju permintaan yang diizinkan, API wajib mengembalikan respons **HTTP 429 Too Many Requests** disertai header penunjuk jeda waktu tunggu:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 42
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1758124842

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Batas frekuensi permintaan terlampaui. Silakan tunggu beberapa saat sebelum mencoba kembali.",
    "details": {
      "retry_after_seconds": 42
    }
  }
}
```

Header `Retry-After` memberikan sinyal deterministik bagi klien frontend (termasuk modul PWA Axios interceptor) untuk mengaktifkan antarmuka jeda (*cooldown timer*) dan menahan pengiriman ulang otomatis.

---

## 30. Pembatasan Ukuran Maksimum Muatan Permintaan (Request Payload Size Limits)

Untuk melindungi integritas peladen dari muatan data masif yang disengaja (*payload bloating attacks*), API memberlakukan batasan ukuran muatan permintaan secara ketat:

* **Batasan Ukuran Badan JSON (*JSON Body Limit*):** Maksimum **256 KB** per permintaan reguler. Badan permintaan JSON yang melebihi batas ini langsung ditolak pada lapisan proksi Nginx dengan status HTTP 413 Payload Too Large.
* **Panjang Pesan Teks Chat AI:** Maksimum **1.000 karakter** per pesan.
* **Panjang Catatan Konsultasi:** Maksimum **5.000 karakter** per catatan sesi.
* **Batas Entri Masal (*Bulk Request Limits*):** Maksimum **50 catatan** per panggilan titik akhir pencatatan kolektif luring (*offline sync batch*).

Kebijakan ini mencegah kehabisan alokasi memori kerja PHP (*PHP memory exhaustion*) dan meminimalkan latensi serialisasi JSON.

---

## 31. Titik Akhir Pengunggahan Berkas & URL Bertanda Tangan (File Upload APIs & Signed URLs)

Seluruh titik akhir yang menerima berkas biner (foto profil, foto label makanan, hasil lab pindaian) wajib menegakkan protokol keamanan berkas tingkat tinggi:

1. **Validasi MIME Type Asli & Ekstensi:** Verifikasi dilakukan terhadap struktur *magic bytes* berkas nyata, bukan sekadar memeriksa ekstensi nama berkas yang dikirimkan klien:
   - Tipe yang diizinkan: `image/jpeg`, `image/png`, `image/webp`.
   - Ekstensi yang ditolak mutlak: `.php`, `.phtml`, `.exe`, `.sh`, `.svg` (vektor rawan XSS terselubung), atau ekstensi ganda (misal `label.php.png`).
2. **Ukuran Maksimum Berkas:** Maksimum **5 MB** per citra.
3. **Penyimpanan Non-Eksekutabel Terisolasi:** Berkas wajib disimpan pada bucket penyimpanan objek (*Object Storage* seperti S3 / MinIO) dengan izin baca privat, nama berkas acak kriptografis (UUID v7), dan tanpa izin eksekusi peladen (*no-execution directory*).
4. **Distribusi Melalui Presigned URL:** Akses tampilan citra ke klien hanya dilayani melalui URL bertanda tangan waktu terbatas (*Presigned Expiring URLs*) berdurasi maksimal 15 menit.

---

## 32. Titik Akhir Pengunggahan Pemindai Makanan (Food Scanner Submission API)

Titik akhir pemindai nutrisi dan label kemasan (`/api/v1/scanner/*`) mengorkestrasi pemrosesan citra makanan secara terstruktur dan aman:

```text
Klien PWA (Unggah Foto Label Makanan)
       │
       ▼
POST /api/v1/scanner/nutrition-facts
       │
       ▼
[1. Otentikasi Pengguna & Penegakan Rate Limit Pemindai (5x/menit)]
       │
       ▼
[2. Validasi Keamanan Citra (MIME Image, Max 5MB, EXIF Sanitization)]
       │
       ▼
[3. Simpan Citra ke Penyimpanan Sementara & Ekstraksi Hash Kriptografi]
       │
       ▼
[4. Pemanggilan Model Visi Komputer / OCR Eksternal dengan Batas Waktu 10 Detik]
       │
       ├─── Berhasil ──> [5. Sanitasi Hasil Ekstraksi & Pemetaan ke Skema Nutrisi Standar]
       │                        │
       │                        ▼
       │                 [6. Kembalikan Hasil Terstruktur dengan Derajat Keyakinan (Confidence)]
       │
       └─── Gagal / Timeout ──> [7. Eksekusi Pagar Pembatas Fallback & Catat Log Telemetri]
                                       │
                                       ▼
                                [8. Kembalikan Status 'NEEDS_MANUAL_INPUT' yang Aman]
```

Tahapan ini memastikan bahwa kegagalan membaca label kemasan yang buram atau gangguan pada model computer vision pihak ketiga tidak pernah mengakibatkan crash pada aplikasi pengguna.

---

## 33. Titik Akhir Pengambilan Hasil Pemindaian Makanan (Food Scanner Results API)

Respons dari pemindaian label nutrisi wajib mengekspos status derajat keyakinan (*confidence status*) dan menyertakan rincian zat gizi yang dapat ditinjau ulang oleh pengguna:

```json
{
  "success": true,
  "data": {
    "scan_id": "0191eb7c-5011-7a19-95a2-892bb0a14901",
    "status": "PROCESSED",
    "confidence_score": 0.88,
    "requires_confirmation": false,
    "nutrition_facts": {
      "product_name": "Susu Kedelai Organik Rendah Gula",
      "serving_size": "250 ml",
      "calories": 110,
      "total_sugar_g": 4.5,
      "total_carbs_g": 8.0,
      "protein_g": 7.0,
      "total_fat_g": 3.0,
      "sodium_mg": 95.0
    },
    "evidence_tokens": [
      "Takaran Saji 250ml",
      "Gula 4.5g",
      "Natrium 95mg"
    ]
  },
  "meta": {
    "timestamp": "2026-09-17T22:35:00+07:00",
    "api_version": "v1"
  }
}
```

Jika skor keyakinan berada di bawah ambang batas aman (`confidence_score < 0.70`), sistem menetapkan `"requires_confirmation": true` dan klien frontend wajib menyajikan form pratinjau agar pengguna dapat mengonfirmasi atau mengoreksi angka sebelum disimpan ke log harian.

---

## 34. Titik Akhir Sesi Percakapan Asisten AI (AI Assistant Chat API)

Titik akhir asisten percakapan AI (`POST /api/v1/ai/chat`) tunduk pada pagar pembatas klinis dan isolasi domain yang sangat ketat:

* **Tujuan yang Diizinkan (*Permitted Capabilities*):**
  - Memberikan penjelasan konsep kesehatan preventif dalam gaya bahasa ramah, memotivasi, dan mudah dipahami.
  - Membantu pengguna memahami faktor apa saja yang mempengaruhi fluktuasi skor kesiapan harian mereka.
  - Memberikan saran praktis seputar pemilihan hidrasi, jadwal tidur sehat, dan rutinitas aktivitas fisik ringan.
* **Larangan Mutlak Titik Akhir AI (*Absolute Red Lines*):**
  - Dilarang memberikan diagnosis medis atas kondisi patologis akut.
  - Dilarang meresepkan obat keras, suplemen farmakologis, atau dosis terapi medis.
  - Dilarang memerintahkan pengguna untuk mengubah atau menghentikan protokol obat dokter berlisensi.

Pelanggaran terhadap batasan ini dicegah melalui kombinasi *System Prompt Engineering* tertutup dan *Post-Generation Guardrail Scanner* di sisi backend sebelum teks respons dikirim ke klien.

---

## 35. Validasi Muatan Permintaan Percakapan AI (AI Chat Request Payload)

Klien frontend hanya diperbolehkan mengirimkan pesan pertanyaan teks sederhana ke titik akhir AI:

```json
// ✅ BENAR: Skema permintaan AI Chat yang minimalis dan terkurasi
POST /api/v1/ai/chat
{
  "message": "Mengapa skor kesiapan saya hari ini menurun dibandingkan kemarin?",
  "session_id": "0191eb82-0199-74d1-b514-411082c918a2"
}
```

Bidang `session_id` bersifat opsional; jika tidak disertakan, sistem backend otomatis menginisialisasi sesi percakapan baru. Backend menolak keras parameter tambahan yang mencoba mengarahkan model (seperti `prompt_override`, `model_name`, `temperature`, atau `raw_health_context`). Seluruh parameter inferensi dikendalikan sepenuhnya oleh backend.

---

## 36. Sanitasi Konteks Informasi Masukan AI (AI Input Context Sanitization)

Konteks data kesehatan yang dijadikan rujukan inferensi model AI **wajib dibangun secara eksklusif oleh backend peladen (*Server-Side Context Assembly*)**:

```text
Permintaan Chat Klien (Hanya Teks Pesan Pengguna)
                     │
                     ▼
[Backend Membaca ID Pengguna Terotentikasi dari Bearer Token]
                     │
                     ▼
[Backend Mengambil Data Biometrik Terkini dari Basis Data (7 Hari Terakhir)]
                     │
                     ▼
[Backend Melakukan Sanitasi & Anonimisasi PII (Hapus Nama Lengkap, NIK, dsb)]
                     │
                     ▼
[Backend Menyuntikkan Aturan Klinis & Penafian ke dalam System Context]
                     │
                     ▼
[Backend Mengirimkan Paket Konteks Lengkap ke Layanan Model AI]
```

> [!CAUTION]
> Dilarang keras membiarkan klien frontend merangkai atau memilih sendiri catatan kesehatan mana yang dikirimkan ke model AI. Pola tersebut rentan terhadap manipulasi konteks (*prompt injection*) dan berisiko mengekspos data pengguna lain jika klien disusupi skrip pihak ketiga.

---

## 37. Validasi Skema Keluaran Titik Akhir AI (AI Response Schema Validation)

Seluruh keluaran teks yang dihasilkan oleh penyedia model AI diperlakukan sebagai **data eksternal yang tidak dipercaya (*Untrusted Third-Party Output*)** dan wajib melalui validasi sebelum diserialisasi ke respons API:

1. **Inspeksi Pelanggaran Klaim Medis (*Medical Guardrail Filter*):** Teks hasil keluaran dipindai menggunakan aturan ekspresi reguler dan kata kunci terlarang (seperti klaim penyembuhan penyakit, saran dosis obat, atau jaminan klinis).
2. **Validasi Skema Output Terstruktur (*Structured JSON Validation*):** Jika titik akhir AI menggunakan keluaran terstruktur (misalnya rekomendasi kartu rencana aksi), JSON hasil model wajib divalidasi terhadap skema skema kelas PHP DTO sebelum diteruskan ke klien.
3. **Penyematan Penafian Otomatis (*Automated Disclaimer Appending*):** Sistem menyematkan atribut `disclaimer` secara konsisten pada setiap objek jawaban AI.

---

## 38. Penanganan Kegagalan Layanan Penyedia AI Eksternal (AI Provider Failure Handling)

Jika penyedia layanan AI eksternal mengalami gangguan jaringan, kehabisan kuota, atau batas waktu terlampaui (*timeout* > 8 detik), API wajib mengembalikan respons terkelola dengan kode status **HTTP 503 Service Unavailable** atau mengalihkan ke cadangan deterministik:

```http
HTTP/1.1 503 Service Unavailable
Content-Type: application/json
Retry-After: 30

{
  "success": false,
  "error": {
    "code": "AI_SERVICE_UNAVAILABLE",
    "message": "Asisten cerdas PRONOIA sedang mengalami kepadatan antrean. Mohon coba beberapa saat lagi.",
    "details": {
      "fallback_available": true
    }
  }
}
```

Backend dilarang membiarkan galat koneksi mentah (*cURL timeout error*, *Guzzle connection exception*, atau *API key rejection error*) bocor ke respons klien, karena berpotensi mengekspos detail vendor dan konfigurasi internal peladen.

---

## 39. Mekanisme Respons Cadangan Deterministik (Deterministic Fallback Mechanism)

Kegagalan pada subsistem AI **sama sekali tidak boleh melumpuhkan atau menghambat fungsi inti kesehatan platform**:

```text
Kegagalan Layanan AI (Timeout / Kuota Habis)
                  │
                  ├─── Asisten Chat AI ──────> Tampilkan Pesan Penjelasan Ramah & Rekomendasi Baku
                  │
                  ├─── Wawasan Kesehatan ───> Gunakan Template Deterministik Berbasis Aturan Klinis
                  │
                  └─── Pencatatan Metrik ────> Berjalan Normal 100% Tanpa Ketergantungan AI
```

Prinsip Ketahanan (*Resilience Principle*):
- Kalkulasi skor kesiapan harian dan evaluasi tren glukosa berakar pada rumus matematika murni yang dieksekusi di backend lokal, sehingga tetap beroperasi normal meskipun seluruh layanan LLM eksternal padam total.
- Pengguna tetap dapat mencatat gula darah, melacak hidrasi, dan mengikuti tantangan kebiasaan tanpa terganggu kendala model AI.

---

## 40. Titik Akhir Wawasan Kesehatan Preventif (Health Insights API)

Titik akhir wawasan kesehatan (`GET /api/v1/insights/daily`) menyajikan evaluasi kondisi kesehatan berbasis data secara terstruktur dan terukur:

```json
{
  "success": true,
  "data": {
    "id": "0191eb8f-9122-7911-aa90-112480ad12e1",
    "category": "HYDRATION",
    "level": "ATTENTION_NEEDED",
    "title": "Konsumsi Cairan di Bawah Target Harian",
    "summary": "Asupan hidrasi Anda baru mencapai 1.200 ml dari target dasar 2.500 ml.",
    "score_impact": -8.5,
    "generated_at": "2026-09-17T18:00:00+07:00",
    "actions": [
      {
        "id": "ACT-DRINK-WATER",
        "title": "Minum 1 Gelas Air Hangat (300 ml)",
        "duration_minutes": 2
      }
    ]
  },
  "meta": {
    "timestamp": "2026-09-17T22:35:00+07:00",
    "api_version": "v1"
  }
}
```

Setiap wawasan memiliki kategori eksplisit (`HYDRATION`, `SLEEP_RECOVERY`, `GLUCOSE_STABILITY`, `ACTIVITY_MOMENTUM`) dan tingkat kepentingan (`POSITIVE`, `INFORMATIONAL`, `ATTENTION_NEEDED`, `CRITICAL`), mempermudah pewarnaan dan pengurutan visual pada antarmuka pengguna.

---

## 41. Struktur Respons Keterjelasan Alasan Rekomendasi (Recommendation Explainability Contract)

Setiap wawasan kesehatan yang disajikan oleh API PRONOIA wajib memiliki **bukti pendukung yang transparan dan dapat dijelaskan (*Evidence-Based Explainability*)**:

```json
{
  "explainability": {
    "observed_change": "Kadar gula darah puasa meningkat sebesar 18% dibandingkan rata-rata 7 hari terakhir.",
    "current_value": 128.0,
    "baseline_average": 108.5,
    "unit": "mg/dL",
    "contributing_factors": [
      "Konsumsi makanan padat karbohidrat terlambat pada malam hari (22:30)",
      "Durasi tidur nyenyak (deep sleep) berkurang 45 menit"
    ],
    "evidence_records": [
      { "record_id": "0191eb49-14a2-7102-9901-7fa11c20bb12", "type": "blood_glucose" },
      { "record_id": "0191ea80-9912-7011-8812-4fa11c99aa33", "type": "sleep_duration" }
    ]
  }
}
```

Kontrak ini menjamin bahwa sistem dapat menjawab pertanyaan penting pengguna: *Mengapa skor saya berubah? Data apa yang mendasari kesimpulan ini?*. Hal ini membangun kredibilitas dan membedakan PRONOIA dari aplikasi yang menggenerasi teks spekulatif tanpa dasar data.

---

## 42. Titik Akhir Rencana Intervensi Perilaku (Intervention Plans API)

Titik akhir program intervensi gaya hidup melayani kurasi rencana aksi perilaku sehat terukur:

* **Titik Akhir Standar Intervensi:**
  ```text
  GET    /api/v1/interventions                -> Mengambil daftar katalog intervensi aktif
  GET    /api/v1/interventions/{id}           -> Mengambil detail modul intervensi spesifik
  POST   /api/v1/interventions/{id}/enroll    -> Mendaftarkan anggota ke modul intervensi
  POST   /api/v1/interventions/{id}/progress  -> Mencatat penyelesaian langkah aksi harian
  DELETE /api/v1/interventions/{id}/cancel   -> Membatalkan partisipasi program intervensi
  ```

Pencatatan kemajuan (`progress`) bersifat idempoten per hari penugasan, memastikan penekanan tombol berulang oleh pengguna pada antarmuka tidak menghasilkan akumulasi skor ganda.

---

## 43. Titik Akhir Partisipasi Tantangan Kebiasaan (Habit Challenge API)

Titik akhir tantangan kesehatan komunitas mengelola pendaftaran, pencapaian milestone, dan papan peringkat:

* **Titik Akhir Standar Tantangan:**
  ```text
  GET    /api/v1/challenges                     -> Daftar tantangan publik dan komunitas
  GET    /api/v1/challenges/{id}                -> Rincian target dan durasi tantangan
  POST   /api/v1/challenges/{id}/join           -> Bergabung ke tantangan
  GET    /api/v1/challenges/{id}/leaderboard    -> Papan peringkat teranonimkan
  POST   /api/v1/challenges/{id}/claim-reward   -> Klaim lencana dan poin pencapaian
  ```

Papan peringkat (*leaderboard*) menerapkan penyamaran nama (*pseudonymization*) secara otomatis guna melindungi privasi peserta, kecuali pengguna secara eksplisit mengaktifkan opsi profil publik pada pengaturan privasinya.

---

## 44. Titik Akhir Reservasi Sesi Konsultasi (Consultation Booking API)

Titik akhir layanan konsultasi memfasilitasi penjadwalan dan interaksi antara anggota dengan instruktur kesehatan profesional:

* **Titik Akhir Penjadwalan Konsultasi:**
  ```text
  GET    /api/v1/instructors                  -> Daftar instruktur bersertifikasi dan spesialisasi
  GET    /api/v1/instructors/{id}/slots       -> Ketersediaan slot waktu konsultasi instruktur
  POST   /api/v1/consultations/bookings       -> Memesan slot konsultasi eksklusif
  GET    /api/v1/consultations/{id}           -> Rincian reservasi dan tautan tele-konsultasi
  POST   /api/v1/consultations/{id}/cancel    -> Pembatalan reservasi oleh anggota/instruktur
  ```

Slot waktu yang telah dipesan diverifikasi status ketersediaannya secara real-time untuk mencegah penumpukan janji temu pada jam yang sama.

---

## 45. Otorisasi Ketat Alur Reservasi Konsultasi (Consultation Booking Authorization)

Proses pemesanan konsultasi (`POST /api/v1/consultations/bookings`) mewajibkan serangkaian validasi dan verifikasi bertingkat:

1. **Otentikasi Anggota:** Memastikan pemesan adalah anggota terdaftar yang memiliki status akun aktif.
2. **Validasi Status Instruktur:** Memverifikasi bahwa instruktur yang dipilih memiliki izin praktik aktif dan tidak dalam status cuti.
3. **Validasi Paket Layanan:** Memeriksa kuota konsultasi aktif milik anggota atau kepemilikan kredit sesi yang memadai.
4. **Validasi Rentang Waktu:** Slot yang diminta harus berada di masa mendatang (minimal 2 jam sebelum sesi dimulai) dan sesuai jadwal kerja instruktur.
5. **Verifikasi Bebas Benturan:** Memastikan pemesan tidak memiliki jadwal konsultasi lain yang bertabrakan pada rentang waktu yang sama.

Kegagalan pada salah satu tahapan validasi wajib menghasilkan respons kesalahan deskriptif dengan kode status HTTP 422 atau 409 yang sesuai.

---

## 46. Penanganan Konkurensi & Idempotensi Reservasi (Booking Concurrency & Idempotency)

Untuk mencegah benturan pemesanan slot konsultasi yang sama oleh dua pengguna dalam waktu bersamaan (*race condition*), API mewajibkan perlindungan konkurensi di lapisan basis data:

```php
// ✅ PERLINDUNGAN KONKURENSI: Menggunakan Transaksi ACID dan Kunci Pesimistik
return DB::transaction(function () use ($user, $slotId) {
    // Kunci baris slot waktu untuk pembaruan eksklusif
    $slot = ConsultationSlot::where('id', $slotId)
        ->lockForUpdate()
        ->firstOrFail();

    if ($slot->is_booked) {
        throw new SlotAlreadyBookedException();
    }

    $slot->update([
        'is_booked' => true,
        'booked_by_user_id' => $user->id,
        'booked_at' => now(),
    ]);

    return ConsultationBooking::create([
        'user_id' => $user->id,
        'slot_id' => $slot->id,
        'status'  => BookingStatus::CONFIRMED,
    ]);
});
```

Kunci pesimistik (`lockForUpdate()`) menjamin integritas mutlak bahwa hanya ada satu transaksi yang dapat mengubah status slot, sementara transaksi yang datang terlambat akan menerima respons galat 409 Conflict yang terkontrol.

---

## 47. Titik Akhir Catatan Konsultasi & Pemisahan Privasi (Consultation Notes API & Privacy Separation)

Catatan hasil konsultasi kesehatan yang dibuat oleh instruktur wajib diklasifikasikan berdasarkan cakupan visibilitas (*visibility scoping*):

* **Kategori Visibilitas Catatan:**
  - `MEMBER_VISIBLE`: Catatan kesimpulan, rencana aksi tindak lanjut, dan target kebiasaan yang dapat dibaca langsung oleh anggota pada aplikasi PWA miliknya.
  - `CLINICAL_INTERNAL`: Catatan observasi profesional instruktur, riwayat klinis sensitif, atau hipotesis evaluasi yang hanya boleh dibaca oleh instruktur bersangkutan dan tim medis pengawas.
* **Penegakan API:**
  - Pemanggilan titik akhir oleh peran Member secara otomatis menyaring catatan dengan klausul `WHERE visibility = 'MEMBER_VISIBLE'`.
  - Percobaan instruktur untuk menandai catatan sensitif sebagai `MEMBER_VISIBLE` tanpa penyuntingan terminologi awam akan memicu peringatan sistem.

---

## 48. Titik Akhir Linimasa Metrik Deret Waktu (Health Metrics Timeline API)

Titik akhir linimasa kesehatan (`GET /api/v1/health/timeline`) melayani aliran peristiwa kesehatan kronologis pengguna yang mengonsolidasikan berbagai jenis pencatatan:

```text
GET /api/v1/health/timeline?start_date=2026-09-10&end_date=2026-09-17&types=blood_glucose,blood_pressure&limit=20
```

Kapabilitas Standar Linimasa:
- **Paginasi Berbasis Kursor:** Menggunakan penanda kursor berbasis ID waktu untuk memastikan pengguliran data riwayat (*infinite scroll*) yang mulus tanpa fenomena lompatan data (*page drift*).
- **Filter Berdasarkan Tipe Metrik:** Mendukung pemilihan jenis rekaman tunggal atau kombinasi jamak (`types=blood_glucose,water_intake`).
- **Pengurutan Kronologis Terbalik:** Secara baku menyajikan rekaman dari yang paling mutakhir (`measured_at DESC`).
- **Otorisasi Kepemilikan Ketat:** Secara mutlak membatasi kueri hanya pada rekaman milik pengguna yang terotentikasi.

---

## 49. Standarisasi Penyaringan Rentang Waktu ISO-8601 (ISO-8601 Date Range Filtering)

Seluruh parameter rentang tanggal pada kueri API (`start_date`, `end_date`, `from`, `to`) wajib divalidasi secara ketat oleh `FormRequest`:

1. **Format Standar Wajib:** Menggunakan format tanggal ISO 8601 (`YYYY-MM-DD` atau `YYYY-MM-DDTHH:mm:ssZ`).
2. **Pencegahan Rentang Terbalik:** Parameter `start_date` wajib lebih awal atau sama dengan `end_date` (`after_or_equal:start_date`).
3. **Pencegahan Rentang Waktu Tak Terbatas (*Max Span Limits*):** Rentang tanggal kueri dibatasi maksimum **90 hari** per permintaan untuk melindungi memori basis data dari pemindaian indeks raksasa.
4. **Pencegahan Tanggal Masa Depan:** Parameter tanggal riwayat dilarang melebihi waktu peladen saat ini (`before_or_equal:now`).

Kueri yang melanggar ketentuan rentang tanggal langsung ditolak dengan respons HTTP 422 Unprocessable Entity.

---

## 50. Standardisasi Parameter Pengurutan Berbasis Izin (Allowlist-Based Sorting)

Parameter pengurutan data (`sort`, `order_by`, `direction`) wajib tunduk pada **daftar putih eksplisit (*Whitelist Enforcement*)**:

```php
// ✅ PENERAPAN DAFTAR PUTIH PENGURUTAN YANG AMAN
$allowedSorts = [
    'measured_at' => 'measured_at',
    'created_at'  => 'created_at',
    'value'       => 'value',
];

$sortField = $allowedSorts[$request->input('sort')] ?? 'measured_at';
$sortDirection = strtolower($request->input('direction', 'desc')) === 'asc' ? 'asc' : 'desc';

$query->orderBy($sortField, $sortDirection);
```

> [!CAUTION]
> Dilarang keras menyuntikkan masukan pengurutan langsung ke dalam kueri basis data (seperti `$query->orderBy($request->sort)`). Pola tanpa daftar putih membuka kerentanan serius *SQL Injection* pada klausa pengurutan dan dapat membocorkan nama kolom internal yang dirahasiakan.

---

## 51. Standardisasi Parameter Penyaringan Dinamis (Dynamic Filtering Query Standards)

Parameter filter pada kueri URL (`?status=...&category=...`) wajib dipetakan secara deklaratif ke bidang domain bisnis yang sah dan telah divalidasi:

* **Pola Filter yang Didukung:**
  ```text
  GET /api/v1/interventions?status=active&category=glucose_management
  GET /api/v1/health/metrics?type=blood_glucose&context=fasting
  GET /api/v1/consultations?status=confirmed&instructor_id=0191eb49-...
  ```
* **Larangan Filter Bebas Arbitrer:**
  - Dilarang mengizinkan klien menyuntikkan kueri operator SQL mentah (misalnya: `?filter[raw]=age>20` atau `?where[column]=value`).
  - Parameter filter wajib divalidasi oleh `FormRequest` menggunakan aturan `Rule::in(...)` atau enumerasi PHP Backed Enum.
  - Nilai filter yang tidak terdaftar otomatis diabaikan atau ditolak dengan respons HTTP 422 Unprocessable Entity.

---

## 52. Titik Akhir Pencarian Terisolasi Otorisasi (Authorization-Scoped Search API)

Titik akhir pencarian teks (seperti katalog makanan, daftar latihan, artikel edukasi, atau profil instruktur) wajib memenuhi standar efisiensi dan keamanan:

1. **Otentikasi & Otorisasi:** Titik akhir pencarian yang mengakses data internal wajib terotentikasi dan hasilnya disaring ketat berdasarkan wewenang pengguna aktif.
2. **Validasi Panjang Kueri:** Panjang teks parameter pencarian (`q` atau `query`) dibatasi **minimal 2 karakter** dan **maksimal 80 karakter** guna mencegah kehabisan sumber daya komputasi.
3. **Penyaringan Simbol Berbahaya:** Karakter kendali dan operator injeksi (seperti `%`, `_`, `'`, `"`, `\`) wajib disanitasi sebelum disematkan ke pencarian indeks teks penuh (*PostgreSQL Full-Text Search*).
4. **Batas Ukuran Hasil Pencarian:** Hasil pencarian teks dibatasi maksimum **20 entri per panggilan**, mengharuskan klien menggunakan paginasi untuk melihat hasil lanjutan.

---

## 53. Jaminan Idempotensi Melalui Header Transaksi (Idempotency Key Header Enforcement)

Untuk operasi mutasi data yang berpotensi dikirim ulang oleh klien saat terjadi ketidakstabilan jaringan (seperti pemesanan sesi konsultasi atau transaksi poin), API wajib mendukung **header kunci idempotensi (*Idempotency Key Header*)**:

```http
POST /api/v1/consultations/bookings HTTP/1.1
Host: api.pronoia.id
Authorization: Bearer 14|7kFh9u3QpLx2...
Idempotency-Key: 7b5a1902-8f11-4091-881c-99a41b7189c2
Content-Type: application/json

{
  "slot_id": "0191eb70-33a1-7d11-80bb-901e129188ab",
  "notes": "Sesi peninjauan target glukosa mingguan"
}
```

Kaidah Eksekusi Idempotensi:
- Nilai `Idempotency-Key` berupa UUID v4/v7 acak yang dibuat oleh klien.
- Backend menyimpan respons pertama beserta *hash payload* di cache Redis selama 24 jam dengan kunci `idempotency:user_{id}:{key}`.
- Jika permintaan dengan kunci yang sama diterima kembali dalam masa aktif kunci, backend **mengembalikan salinan respons asli secara instan** tanpa mengeksekusi ulang aksi bisnis atau memicu pemesanan ganda.

---

## 54. Keamanan Percobaan Ulang Permintaan Klien (Client Retry Safety & Idempotent Handlers)

Klien frontend (terutama PWA yang berjalan pada jaringan seluler tidak stabil) dapat melakukan pengiriman ulang (*retry*) secara otomatis saat mengalami kendala teknis:

* **Kondisi Pemicu Pengiriman Ulang yang Sah:**
  - Terputusnya koneksi soket jaringan (*network dropped / offline timeout*).
  - Menerima kode status kesalahan sementara dari gerbang proksi: **HTTP 502 Bad Gateway**, **HTTP 503 Service Unavailable**, atau **HTTP 504 Gateway Timeout**.
* **Protokol Pengiriman Ulang yang Aman:**
  - Permintaan mutasi (`POST`/`PATCH`) **wajib menyertakan `Idempotency-Key`** sebelum dikirimkan ulang.
  - Klien wajib menerapkan algoritma **penundaan eksponensial dengan jitter acak (*Exponential Backoff with Full Jitter*)** untuk mencegah fenomena badai permintaan (*thundering herd problem*).
  - Dilarang mengirim ulang otomatis untuk respons kesalahan status **4xx** (seperti 400, 401, 403, 404, 422), karena kesalahan tersebut bersifat permanen di sisi muatan klien.

---

## 55. Penataan Header Cache HTTP (HTTP Cache-Control Headers)

Kebijakan header cache HTTP (`Cache-Control`) wajib disesuaikan secara presisi dengan tingkat sensitivitas data pada setiap titik akhir:

| Kategori Data | Header `Cache-Control` Wajib | Perilaku Peramban & Perantara |
| :--- | :--- | :--- |
| **Data Kesehatan & Rekam Medis Pribadi** | `no-store, no-cache, must-revalidate, private` | Dilarang keras disimpan di memori peramban atau CDN publik manapun. |
| **Profil Akun & Kredensial Pribadi** | `no-store, private` | Menolak penyimpanan cache demi kepatuhan UU Perlindungan Data Pribadi. |
| **Katalog Publik (Daftar Intervensi, FAQ)** | `public, max-age=3600, stale-while-revalidate=86400` | Boleh disimpan pada cache CDN edge selama 1 jam dengan validasi latar belakang. |
| **Daftar Master Metrik & Skema Enum** | `public, max-age=86400, immutable` | Disimpan pada cache klien selama 24 jam untuk meminimalkan beban basis data. |

> [!CAUTION]
> Jangan pernah menyetel `public` pada titik akhir yang menyajikan data pribadi pengguna (`/api/v1/health/*`, `/api/v1/profile/*`), karena dapat mengakibatkan rekaman medis anggota terpapar ke pengguna lain melalui cache proksi jaringan publik.

---

## 56. Pemanfaatan ETag & Permintaan Bersyarat (ETag & Conditional HTTP Requests)

Untuk sumber daya baca yang memiliki frekuensi pembaruan sedang namun sering diakses (seperti katalog pustaka intervensi atau artikel edukasi), API mendukung permintaan bersyarat menggunakan header **ETag** dan **If-None-Match**:

```http
GET /api/v1/interventions HTTP/1.1
Host: api.pronoia.id
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

Jika isi data katalog belum berubah sejak hash ETag terakhir dihitung, backend segera mengembalikan respons singkat **HTTP 304 Not Modified** tanpa badan data JSON:

```http
HTTP/1.1 304 Not Modified
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Cache-Control: public, max-age=3600
```

Mekanisme ini menghemat penggunaan kuota bandwidth internet pengguna ponsel secara signifikan dan memangkas latensi respon jaringan hingga di bawah 50 milidetik.

---

## 57. Kontrak Metadata Paginasi Standar (Standard Pagination Metadata Contract)

Kontrak metadata paginasi pada respons API PRONOIA wajib menyajikan informasi yang memadai agar klien frontend dapat mengelola navigasi halaman atau pengguliran tak terbatas (*infinite scroll*) secara mulus:

```json
{
  "meta": {
    "timestamp": "2026-09-17T22:38:00+07:00",
    "api_version": "v1",
    "pagination": {
      "per_page": 20,
      "next_cursor": "eyJpZCI6IjAxOTFlYjRhLTYxYjEtNzR...In0=",
      "prev_cursor": null,
      "has_more": true
    }
  }
}
```

Parameter kendali kueri yang diterima oleh titik akhir paginasi:
- `limit` atau `per_page`: Jumlah rekaman per pemanggilan (baku: 20, maksimum: 100).
- `cursor`: Penanda posisi data terenkode (*opaque string*) yang diperoleh dari `next_cursor` pemanggilan sebelumnya.
- Jika rekaman telah mencapai ujung daftar data, `next_cursor` bernilai `null` dan `has_more` bernilai `false`.

---

## 58. Standarisasi Paginasi Berbasis Kursor (Cursor-Based Pagination Implementation)

Untuk kumpulan data deret waktu bervolume tinggi (*high-volume time-series data*), API **wajib menggunakan paginasi berbasis kursor (*Keyset / Cursor Pagination*)** alih-alih paginasi offset tradisional (`?page=2`):

* **Kandidat Wajib Paginasi Kursor:**
  - Linimasa pembacaan metrik kesehatan (`/api/v1/health/timeline`).
  - Riwayat log pindaian makanan (`/api/v1/scanner/history`).
  - Aliran pesan percakapan asisten AI (`/api/v1/ai/messages`).
  - Notifikasi dan riwayat audit aktivitas.
* **Keunggulan Paginasi Kursor:**
  - **Bebas Fenomena Lompatan Data (*No Page Drift*):** Penambahan rekaman baru saat pengguna sedang membaca daftar tidak akan menggeser urutan atau menyebabkan data ganda tampil pada layar klien.
  - **Efisiensi Kueri Basis Data (*O(1) Performance*):** Kueri mengeksekusi klausul `WHERE id < :cursor_id ORDER BY id DESC LIMIT 20` yang memanfaatkan indeks primer B-Tree secara optimal, menghindari kelemahan `OFFSET 10000` yang memindai seluruh tabel.

---

## 59. Sasaran Kinerja & Batas Ambang Latensi API (API Performance & SLA Targets)

API PRONOIA menetapkan Perjanjian Tingkat Layanan Kinerja (*Performance Service Level Agreement* / SLA) yang ketat untuk seluruh titik akhir produksi:

```text
Target Waktu Respon API (Persentil 95 / P95):
├── Titik Akhir Pembacaan Ringan (Auth, Profile, Single Resource) ──> < 80 ms
├── Titik Akhir Kueri Dasbor Agregat & Linimasa Metrik ────────────> < 200 ms
├── Titik Akhir Mutasi Transaksional (Pencatatan Metrik, Booking) ─> < 250 ms
└── Titik Akhir Komputasi Eksternal (Visi Komputer, OCR, AI Chat) ─> < 3.000 ms
```

Aturan Optimalisasi Kinerja:
- Menerapkan pemuatan selektif kolom (`SELECT id, type, value, measured_at`), bukan `SELECT *`.
- Menghindari pemrosesan komputasi berat di alur utama permintaan HTTP; seluruh pengiriman email, pembuatan notifikasi, dan analitik agregat dialihkan ke antrean pekerja asinkron (*Redis background jobs*).

---

## 60. Pencegahan Kueri N+1 pada Transformasi API (N+1 Query Prevention in Transformers)

Serialisasi API Resource dilarang keras memicu masalah kueri ganda berulang (*N+1 Query Problem*) pada relasi basis data:

```php
// ❌ PEMICU N+1 QUERY: Membaca relasi di dalam perulangan Resource tanpa eager loading
public function toArray(Request $request): array
{
    return [
        'id'         => $this->id,
        'title'      => $this->title,
        'instructor' => new InstructorResource($this->instructor), // Memanggil 1 kueri tambahan per baris
        'tags'       => TagResource::collection($this->tags),      // Memanggil 1 kueri tambahan per baris
    ];
}
```

```php
// ✅ BENAR & OPTIMAL: Memuat relasi sebelumnya (Eager Loading) & Menggunakan whenLoaded
// Pada Kontroler / Aksi:
$interventions = Intervention::with(['instructor.profile', 'tags'])->cursorPaginate(20);

// Pada API Resource:
public function toArray(Request $request): array
{
    return [
        'id'         => $this->id,
        'title'      => $this->title,
        'instructor' => new InstructorResource($this->whenLoaded('instructor')),
        'tags'       => TagResource::collection($this->whenLoaded('tags')),
    ];
}
```

Penerapan metode `$this->whenLoaded('relasi')` menjamin bahwa atribut relasi hanya diserialisasi jika telah dimuat sebelumnya, mencegah kebocoran puluhan kueri tak terlihat ke peladen basis data.

---

## 61. Kepatuhan Privasi Data Pribadi pada Titik Akhir (API Privacy & UU PDP Compliance)

Struktur kontrak respons API merupakan bagian integral dari arsitektur tata kelola privasi sistem (kepatuhan UU PDP No. 27/2022). Tidak ada kolom data yang boleh diserialisasikan hanya karena kolom tersebut eksis di tabel basis data:

1. **Prinsip Minimasasi Data (*Data Minimization Principle*):** API hanya boleh menyajikan atribut yang benar-benar dibutuhkan oleh antarmuka klien pada konteks halaman bersangkutan.
2. **Persetujuan Eksplisit (*Explicit Consent Scope*):** Data kesehatan sensitif (glukosa, tekanan darah, riwayat penyakit keluarga) hanya diserialisasi jika pengguna aktif telah memberikan persetujuan digital pemrosesan data kesehatan.
3. **Pemberian Hak Portabilitas Data (*Data Portability Export Endpoint*):** API menyediakan titik akhir terproteksi `POST /api/v1/profile/data-export` yang memungkinkan pengguna mengunduh seluruh arsip data kesehatan pribadinya dalam format JSON/CSV terenkripsi.

---

## 62. Penegakan Batas Keselamatan Klinis pada Kontrak API (Clinical Safety Boundaries in API)

Titik akhir API dilarang keras mengabaikan atau melewati aturan keselamatan medis (*health-safety guardrails*) hanya karena permintaan dipanggil secara terprogram atau melalui skrip otomatis:

```text
Permintaan Mutasi Rekomendasi Klinis (API Consumer)
                        │
                        ▼
[Validasi Batas Nilai Fisiologis yang Masuk Akal (Clinical Sanity Check)]
                        │
                        ├─── Ekstrem / Membahayakan ──> Tolak & Tandai Peringatan Klinis
                        │
                        ▼
[Pemberian Batasan Dosis Maksimal Harian (Upper Bound Limits)]
                        │
                        ├─── Melampaui Batas ────────> Tolak dengan Respons HTTP 422
                        │
                        ▼
[Penyematan Penafian Medis Wajib (Mandatory Disclaimer Attachment)]
```

Contoh Kasus: Titik akhir rekomendasi intervensi hidrasi dilarang menerima target konsumsi cairan melebihi 10 liter per hari tanpa verifikasi dokter, karena berisiko memicu hiponatremia yang fatal bagi pengguna.

---

## 63. Batas Isolasi Model AI pada Titik Akhir (AI Model Isolation at API Boundary)

Seluruh keluaran teks atau struktur data yang dihasilkan oleh model kecerdasan buatan (*AI Output*) wajib disaring melalui pagar pengaman aplikasi sebelum disajikan sebagai respons API:

```text
Output Mentah dari Model AI (LLM Provider)
                    │
                    ▼
[1. Filter Klaim Medis & Halusinasi Dosis (Regex & Blacklist Term Scanner)]
                    │
                    ▼
[2. Validasi Tipe Data & Skema JSON Struktur (Strict DTO Hydration)]
                    │
                    ▼
[3. Pemeriksaan Sentimen Empati & Bahasa Ramah (Safe Persona Check)]
                    │
                    ▼
[4. Penambahan Penafian Pencegahan Resmi PRONOIA]
                    │
                    ▼
Respons API yang Sah & Aman Dikirimkan ke Klien (JSON 200 OK)
```

Jika keluaran model terdeteksi memuat saran tindakan medis berbahaya, respons otomatis dialihkan ke template peringatan deterministik standar yang menyarankan pengguna segera berkonsultasi dengan fasilitas kesehatan terdekat.

---

## 64. Integritas Data Titik Akhir Pemindai Kamera (Scanner Data Integrity & Verification)

Setiap hasil ekstraksi dari titik akhir pemindai nutrisi (`/api/v1/scanner/*`) wajib mempertahankan **jejak asal-usul data (*Data Provenance & Audit Trail*)**:

```json
{
  "provenance": {
    "source_type": "SCANNER_IMAGE_OCR",
    "image_hash_sha256": "8a35e61d8469c4bb1082c1149e0a2931...",
    "model_version": "vision-ocr-v2.1",
    "processed_at": "2026-09-17T22:38:15+07:00",
    "confidence_rating": "HIGH",
    "is_user_overridden": false
  }
}
```

Atribut asal-usul ini memungkinkan sistem melacak apakah suatu data nutrisi makanan diperoleh dari pindaian citra otomatis, basis data komposisi pangan rujukan Kemenkes RI, atau suntingan manual oleh pengguna.

---

## 65. Pembatasan Hak Akses Titik Akhir Instruktur (Instructor Scoped Access Control)

Ketika titik akhir API menyajikan data anggota kepada pengguna dengan peran Instruktur, sistem wajib mengeksekusi empat langkah protokol otorisasi bertingkat:

1. **Otentikasi Identitas Instruktur:** Memastikan aktor memiliki sesi instruktur aktif dan sertifikasi valid.
2. **Verifikasi Hubungan Bimbingan Aktif:** Memeriksa dalam basis data bahwa ada relasi bimbingan aktif (`coaching_relationship`) yang disetujui bersama antara instruktur dan anggota target.
3. **Penyaringan Data Berizin (*Permitted Data Scoping*):** Menolak akses ke catatan pribadi anggota yang ditandai *private* atau di luar rentang tanggal program bimbingan.
4. **Serialisasi Terbatas (*Dedicated Instructor Resource*):** Menggunakan kelas transformer terdedikasi (`InstructorMemberViewResource`) yang menyembunyikan alamat pribadi, nomor telepon, dan data kontak sensitif.

---

## 66. Tata Kelola Akses Titik Akhir Administrator (Admin Access Control & Audit Logging)

Titik akhir yang diperuntukkan bagi Administrator (*Admin API*) menerapkan prinsip hak istimewa terendah (*Least-Privilege Operational Access*):

* **Prioritas Titik Akhir Agregat:** Titik akhir admin dirancang menyajikan analitik populasi teragregasi (misal: tren retensi anggota, distribusi demografi anonim, total sesi konsultasi sukses), bukan penelusuran data mentah perorangan.
* **Prosedur Akses Data Sensitif Khusus:** Jika investigasi teknis mendesak mewajibkan peninjauan rekaman spesifik:
  - Administrator wajib menyertakan parameter `audit_ticket_id` yang sah pada header permintaan.
  - Seluruh pembacaan data klinis oleh akun admin otomatis dicatat ke tabel `admin_audit_logs` yang tidak dapat dihapus atau diubah (*immutable append-only log*).

---

## 67. Arsitektur Titik Akhir Penerimaan Webhook (Webhook Ingestion Endpoints)

Titik akhir penerima webhook dari penyedia eksternal (`POST /api/v1/webhooks/{provider}`) wajib menerapkan protokol validasi ketat:

```http
POST /api/v1/webhooks/payment-gateway HTTP/1.1
Host: api.pronoia.id
X-Signature-SHA256: 3b9a10ef4...
X-Event-Timestamp: 1758124890
Content-Type: application/json
```

Protokol Keamanan Webhook Wajib:
1. **Verifikasi Tanda Tangan Kriptografi (*HMAC Signature Verification*):** Menghitung ulang hash HMAC-SHA256 dari badan permintaan mentah (*raw payload*) menggunakan kunci rahasia bersama (*shared secret*). Permintaan dengan tanda tangan tidak cocok langsung ditolak dengan status HTTP 401 Unauthorized.
2. **Pencegahan Pemutaran Ulang Serangan (*Replay Attack Shield*):** Memeriksa header stempel waktu (`X-Event-Timestamp`); menolak webhook yang berumur lebih dari 5 menit dari waktu peladen saat ini.
3. **Validasi Tipe Peristiwa (*Event Type Whitelist*):** Hanya menerima peristiwa bisnis yang terdaftar dalam daftar putih aplikasi (misalnya: `payment.settled`, `subscription.renewed`).

---

## 68. Standarisasi Respons Penerimaan Webhook (Webhook Acknowledgement Response)

Titik akhir webhook wajib mengembalikan tanda terima konfirmasi (*acknowledgment*) secara terprediksi dan cepat (< 1 detik):

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "event_id": "evt_0191eb99-77a1-7099-aa01-441092cc1123",
    "status": "QUEUED"
  },
  "meta": {
    "timestamp": "2026-09-17T22:38:30+07:00"
  }
}
```

Kaidah Pemrosesan Webhook Asinkron:
- Webhook yang lolos verifikasi tanda tangan segera dimasukkan ke antrean latar belakang (*Redis background job queue*) untuk diproses secara asinkron.
- Kontroler segera mengembalikan status HTTP 200 OK tanpa menunggu pemrosesan basis data selesai, mencegah pihak penyedia eksternal membatalkan koneksi karena batas waktu terlampaui (*timeout*).
- Jika terjadi kegagalan pemrosesan logika di antrean, mekanisme pengiriman ulang ditangani oleh arsitektur antrean, bukan dengan melempar galat HTTP 500 ke penyedia webhook.

---

## 69. Penegakan Header Keamanan HTTP Standar (Mandatory HTTP Security Headers)

Seluruh respons dari API PRONOIA pada lingkungan produksi wajib menyertakan kumpulan **header keamanan HTTP terstandarisasi (*Security Headers*)**:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; sandbox
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

Dilarang melemahkan atau menonaktifkan konfigurasi header keamanan di atas hanya untuk mengatasi kendala pengembangan lokal atau integrasi frontend yang belum disesuaikan.

---

## 70. Kebijakan Berbagi Sumber Daya Lintas Asal (Cross-Origin Resource Sharing - CORS)

Konfigurasi Berbagi Sumber Daya Asal Lintas (*Cross-Origin Resource Sharing* / CORS) wajib didefinisikan secara eksplisit dan terbatas pada domain terpercaya:

```php
// config/cors.php
return [
    'paths'                    => ['api/v1/*'],
    'allowed_methods'          => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    'allowed_origins'          => [
        'https://app.pronoia.id',
        'https://instructor.pronoia.id',
        'https://admin.pronoia.id',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers'          => ['Content-Type', 'Authorization', 'X-Requested-With', 'Idempotency-Key'],
    'exposed_headers'          => ['Retry-After', 'X-RateLimit-Reset'],
    'max_age'                  => 86400,
    'supports_credentials'     => true,
];
```

> [!CAUTION]
> Dilarang keras menyetel `'allowed_origins' => ['*']` bersamaan dengan `'supports_credentials' => true`. Kebijakan asal terbuka liar tersebut membuka celah eksfiltrasi data kesehatan sensitif pengguna melalui skrip situs peretas berbahaya (*Cross-Site Scripting / CSRF*).

---

## 71. Standarisasi Dokumentasi Kontrak OpenAPI 3.1 (OpenAPI 3.1 Contract Documentation)

Seluruh titik akhir API publik dan privat wajib didokumentasikan menggunakan spesifikasi **OpenAPI v3.1** yang dapat diakses secara interaktif oleh tim pengembang melalui portal Scalar atau Swagger UI:

Dokumentasi wajib mendefinisikan:
1. **URI Titik Akhir & Metode HTTP:** Rute lengkap beserta deskripsi fungsional.
2. **Skema Otentikasi & Otorisasi:** Persyaratan peran dan lingkup token yang dibutuhkan.
3. **Spesifikasi Parameter & Badan Permintaan:** Tipe data, batasan validasi, deskripsi bidang, dan contoh muatan nyata (*real-world examples*).
4. **Katalog Respons Lengkap:** Contoh dokumen JSON untuk respons sukses 200/201 dan berbagai variasi respons kegagalan (400, 401, 403, 404, 409, 422, 429, 503).
5. **Skema Error Codes:** Daftar seluruh kemungkinan kode galat mesin yang dapat dilempar oleh titik akhir tersebut.

---

## 72. Prinsip Stabilitas & Kekekalan Kontrak Publik (Contract Stability & Immutability)

Ketika suatu titik akhir API telah dikonsumsi oleh aplikasi klien di lingkungan produksi, kontrak responsnya diperlakukan sebagai **antarmuka terikat (*Immutable Interface Contract*)**:

* **Kewajiban Pengembang Sebelum Mengubah Kontrak:**
  - Melakukan analisis dampak menyeluruh (*impact analysis*) terhadap aplikasi PWA pengguna dan dasbor instruktur.
  - Menjalankan seluruh rangkaian uji integrasi (*Pest Feature Tests*) untuk memastikan tidak ada pemutusan kontrak (*zero contract breaking*).
  - Mengoordinasikan perubahan dengan tim perekayasa frontend minimal 2 pekan sebelum perilisan.
* **Prosedur Perubahan Wajib:** Jika perubahan berisiko memecah kompatibilitas, pengembang wajib memperkenalkan bidang baru secara berdampingan (*parallel evolution*) atau menaikkan versi API menjadi `v2`.

---

## 73. Tata Kelola Penghentian Titik Akhir Usang (API Deprecation Lifecycle & Sunset Headers)

Jika suatu titik akhir API usang dan diputuskan untuk tidak digunakan lagi, siklus hidup penonaktifannya wajib melalui tahapan berjangka:

```text
[Titik Akhir Beroperasi Penuh]
            │
            ▼
[Langkah 1: Pemberian Tanda Deprekasi (Header Warning & Dokumen OpenAPI)]
            │  └── Menambahkan Header: Deprecation: @1758124800 (Waktu Kedaluwarsa)
            ▼
[Langkah 2: Publikasi Alternatif Jalur Pengganti & Komunikasi Tim Frontend]
            │  └── Menambahkan Header: Sunset: Sun, 17 Sep 2027 00:00:00 GMT
            ▼
[Langkah 3: Pemantauan Log Penggunaan (Monitoring Zero Traffic)]
            │  └── Memverifikasi bahwa tidak ada lagi klien PWA lawas yang memanggil rute
            ▼
[Langkah 4: Penonaktifan Permanen (Mengembalikan HTTP 410 Gone / 404 Not Found)]
```

Jangka waktu transisi deprekasi hingga penonaktifan permanen ditetapkan minimal **6 (enam) bulan** di lingkungan produksi.

---

## 74. Observabilitas & Telemetri Galat Titik Akhir (API Error Observability & Telemetry)

Setiap respons kegagalan API wajib menyertakan **pengenal korelasi unik (*Correlation / Request ID*)** guna mendukung observabilitas terdistribusi dan pelacakan galat:

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
X-Request-Id: req_0191eb9d-1140-7f22-9011-aa941091aa01

{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Terjadi gangguan internal pada sistem. Tim kami telah diberitahu mengenai insiden ini.",
    "correlation_id": "req_0191eb9d-1140-7f22-9011-aa941091aa01"
  }
}
```

Nilai `correlation_id` disematkan ke seluruh log peladen, jejak penelusuran APM (*Application Performance Monitoring*), dan dapat diberikan oleh pengguna kepada tim dukungan pelanggan untuk mempercepat investigasi tanpa membocorkan isi data medis.

---

## 75. Standar Pencatatan Log Permintaan HTTP (API Request Logging Standards)

Pencatatan log aktivitas API wajib mematuhi standar higienitas keamanan data pribadi (*Data Protection Hygiene*):

* **Metadata yang Diizinkan Dicatat:**
  - Metode HTTP (`POST`, `GET`, `DELETE`).
  - Jalur rute URL (`/api/v1/health/metrics`).
  - Kode status respons (`200`, `422`, `500`).
  - Latensi pemrosesan dalam milidetik (`duration_ms`).
  - Pengenal Aktor (`user_id`, `role`).
  - Alamat IP klien (disamarkan/hashed pada lingkungan analitik) dan Agen Pengguna (*User-Agent*).
* **Larangan Mutlak Pencatatan Log (*Prohibited Log Content*):**
  - Dilarang mencatat kata sandi mentah atau token sesi.
  - Dilarang mencatat kunci API atau tanda tangan rahasia webhook.
  - Dilarang mencatat teks utuh masukan percakapan AI atau rekaman catatan klinis pribadi anggota ke dalam berkas teks biasa yang tidak terenkripsi.

---

## 76. Strategi Pembatasan Laju Bertingkat (Tiered API Rate Limiting Strategy)

Strategi pembatasan laju (*Rate Limiting*) pada API PRONOIA dikelompokkan ke dalam tingkatan (*tiers*) yang disesuaikan dengan sensitivitas keamanan dan biaya komputasi masing-masing titik akhir:

```text
Tingkatan Kebijakan Rate Limiting PRONOIA:
├── [Tier 1: Ekstrem Ketat] ─> Titik Akhir Kredensial & Pendaftaran (/api/v1/auth/*)
│   └── 5 permintaan / menit per IP (Mitigasi Serangan Credential Stuffing)
│
├── [Tier 2: Komputasi Berat] ─> Model Inferensi AI & Computer Vision (/api/v1/ai/*, /api/v1/scanner/*)
│   └── 10 permintaan / menit per Pengguna Terotentikasi (Proteksi Biaya API & Beban GPU)
│
├── [Tier 3: Mutasi Bisnis] ─> Reservasi Sesi & Transaksi Gamifikasi (/api/v1/consultations/*)
│   └── 20 permintaan / menit per Pengguna (Pencegahan Race Condition & Tiketing Massal)
│
└── [Tier 4: Akses Data Standar] ─> Kueri Metrik, Linimasa, & Dasbor (/api/v1/health/*)
    └── 60 - 120 permintaan / menit per Pengguna (Kenyamanan Eksplorasi Klien PWA)
```

Implementasi pembatasan laju menggunakan token bucket Redis yang terisolasi per cluster penyewa, menjamin konsistensi penghitungan kuota di lingkungan multi-server.

---

## 77. Penegakan Batas Maksimum Masukan Data (API Input Size Enforcement)

Penegakan batas ukuran masukan (*Input Size Bounds*) wajib diterapkan pada lapis batas terluar (*outer perimeter*) sebelum permintaan menyentuh proses alokasi komputasi yang mahal:

1. **Batas Teks Masukan AI:** Teks pesan pengguna dibatasi maksimal **1.000 karakter**. Pesan yang melebihi batas langsung ditolak oleh FormRequest sebelum pemanggilan API model AI dilakukan.
2. **Batas Ukuran Badan Permintaan JSON:** Dibatasi maksimal **256 KB** untuk titik akhir data reguler.
3. **Batas Resolusi & Dimensi Citra Pemindai:** Maksimal dimensi citra **4096 x 4096 piksel** dengan batas ukuran berkas biner maksimal **5 MB**.
4. **Batas Catatan Konsultasi & Intervensi:** Catatan instruktur dibatasi maksimal **5.000 karakter**.

Penolakan pada gerbang terluar melindungi alokasi memori peladen PHP-FPM dan menghemat biaya konsumsi token pada layanan pihak ketiga.

---

## 78. Pembatasan Ukuran Halaman Maksimum (Maximum Page Size Guardrails)

API PRONOIA memberlakukan batas atas absolut (*server-side hard ceiling*) terhadap parameter ukuran halaman paginasi (`limit` / `per_page`):

```php
// ✅ BENAR: Mengunci batas maksimum ukuran halaman di sisi server
$perPage = min((int) $request->input('per_page', 20), 100);

return HealthMetricResource::collection(
    $user->healthMetrics()->cursorPaginate($perPage)
);
```

Aturan Paginasi Sisi Peladen:
- Nilai bawaan (*default*): **20 rekaman**.
- Batas maksimal absolut: **100 rekaman per permintaan**.
- Jika klien mengirimkan permintaan `?per_page=10000`, server secara otomatis membatasi nilai tersebut menjadi 100 tanpa menimbulkan galat. Hal ini meniadakan potensi serangan penghabisan memori basis data (*heap memory exhaustion*) akibat pembacaan puluhan ribu baris data sekaligus.

---

## 79. Batasan Operasi Pengiriman Data Massal (Bulk API Operations Guardrails)

Titik akhir operasi masal (*Bulk Operation APIs*), seperti sinkronisasi antrean metrik luring dari PWA (`POST /api/v1/health/metrics/bulk-sync`), wajib mematuhi protokol keamanan ekstra:

* **Batasan Ukuran Batch Maksimal:** Maksimal **50 item** per panggilan permintaan.
* **Validasi Menyeluruh Tiap Elemen:** Setiap item di dalam larik batch wajib melewati aturan validasi FormRequest yang identik dengan titik akhir tunggal (`items.*.value`, `items.*.measured_at`).
* **Format Respons Status Parsial:**
  ```json
  {
    "success": true,
    "data": {
      "total_processed": 10,
      "succeeded": 9,
      "failed": 1,
      "errors": [
        {
          "index": 4,
          "idempotency_key": "sync-7a11-88",
          "error_code": "INVALID_MEASURED_AT",
          "message": "Waktu pengukuran tidak boleh berada di masa depan."
        }
      ]
    }
  }
  ```

Pola ini mencegah satu catatan yang tidak valid menggagalkan 49 catatan lain yang valid saat klien PWA melakukan sinkronisasi data pasca-luring.

---

## 80. Atomisitas Transaksional Titik Akhir Kompleks (Transactional API Atomicity)

Jika satu aksi titik akhir API memicu modifikasi terhadap beberapa entitas sumber daya yang saling terkait secara kritis, seluruh operasi wajib dibungkus dalam **Batas Transaksi Basis Data (*Database Transaction Boundary*)**:

```php
// ✅ ATOMISITAS TRANSAKSI: Reservasi Sesi & Pemotongan Kuota Konsultasi
return DB::transaction(function () use ($user, $instructor, $slotId) {
    // 1. Kunci dan validasi slot waktu
    $slot = $instructor->slots()->lockForUpdate()->findOrFail($slotId);
    
    // 2. Kunci dan potong kuota kredit konsultasi anggota
    $quota = $user->consultationQuota()->lockForUpdate()->firstOrFail();
    $quota->decrementBalance(1);
    
    // 3. Buat rekaman reservasi
    $booking = ConsultationBooking::create([
        'user_id'       => $user->id,
        'instructor_id' => $instructor->id,
        'slot_id'       => $slot->id,
        'status'        => BookingStatus::CONFIRMED,
    ]);
    
    // 4. Perbarui status slot
    $slot->markAsBooked($user->id);
    
    return new ConsultationBookingResource($booking);
});
```

Penerapan blok transaksi ACID menjamin prinsip *All-or-Nothing*: jika terjadi galat pada tahap pemotongan kuota, status ketersediaan slot tidak akan pernah berubah menjadi terpesan.

---

## 81. Strategi Pengujian Otomatis Titik Akhir API (Automated API Testing Strategy)

Setiap titik akhir API yang dibangun wajib memiliki rangkaian uji fitur otomatis (*Automated Pest Feature Tests*) yang mencakup minimal 5 skenario kondisi batas:

1. **Kasus Sukses (*Happy Path*):** Memverifikasi respons HTTP 200/201, kecocokan struktur amplop, dan persistensi data pada basis data.
2. **Kegagalan Validasi Masukan (*Validation Failure*):** Memverifikasi respons HTTP 422, kode galat `VALIDATION_ERROR`, dan rincian pesan atribut.
3. **Akses Tanpa Otentikasi (*Unauthenticated Access*):** Memverifikasi respons HTTP 401 saat token tidak disertakan atau telah usang.
4. **Pelanggaran Hak Akses (*Unauthorized Role / IDOR*):** Memverifikasi respons HTTP 403 ketika pengguna mencoba mengakses sumber daya milik pengguna lain.
5. **Penanganan Batas Nilai (*Boundary Edge Cases*):** Memverifikasi penolakan nilai numerik ekstrem atau format tanggal di luar jangkauan klinis.

Rangkaian pengujian API dijalankan secara otomatis pada pipa CI/CD dan menjadi prasyarat mutlak sebelum kode dapat digabungkan ke cabang produksi (*zero broken test policy*).

---

## 82. Pengujian Penolakan Akses Otorisasi (API Authorization Rejection Tests)

Pengujian otorisasi titik akhir wajib secara eksplisit memvalidasi isolasi kepemilikan data antar-pengguna (*Anti-IDOR / BOLA Verification*):

```php
test('seorang anggota tidak dapat membaca data metrik kesehatan milik anggota lain', function () {
    $memberA = User::factory()->member()->create();
    $memberB = User::factory()->member()->create();
    
    $metricB = HealthMetric::factory()->for($memberB)->create();

    $this->actingAs($memberA, 'sanctum')
        ->getJson("/api/v1/health/metrics/{$metricB->id}")
        ->assertStatus(404); // Mengembalikan 404 (atau 403) demi anti-enumeration
});

test('instruktur tidak dapat melihat data anggota yang tidak berada di bawah bimbingannya', function () {
    $instructor = User::factory()->instructor()->create();
    $unassignedMember = User::factory()->member()->create();

    $this->actingAs($instructor, 'sanctum')
        ->getJson("/api/v1/instructor/members/{$unassignedMember->id}/summary")
        ->assertStatus(403);
});
```

Pengujian ini memastikan tidak ada kebocoran celah otorisasi yang memungkinkan aktor jahat mengintip informasi privasi pengguna lain.

---

## 83. Pengujian Kepatuhan Skema Kontrak Respons (API Schema Contract Tests)

Uji kontrak API (*API Contract Invariant Tests*) memastikan bahwa bentuk dan tipe data dari respons JSON tidak mengalami perubahan tak terduga yang dapat merusak aplikasi klien:

```php
test('kontrak respons detail metrik kesehatan mematuhi skema baku', function () {
    $user = User::factory()->member()->create();
    $metric = HealthMetric::factory()->for($user)->create([
        'type'  => MetricType::BLOOD_GLUCOSE,
        'value' => 110.0,
        'unit'  => 'mg/dL',
    ]);

    $this->actingAs($user, 'sanctum')
        ->getJson("/api/v1/health/metrics/{$metric->id}")
        ->assertOk()
        ->assertJsonStructure([
            'success',
            'data' => [
                'id',
                'type',
                'value',
                'unit',
                'context',
                'measured_at',
                'created_at',
            ],
            'meta' => [
                'timestamp',
                'api_version',
            ],
        ]);
});
```

Uji struktur JSON dijalankan terhadap seluruh rute utama guna menjamin stabilitas integrasi antara backend Laravel dan frontend PWA.

---

## 84. Pengujian Regresi Celah Keamanan API (API Security Regression Tests)

Setiap kali ditemukan cacat (*bug*) pada titik akhir API di lingkungan pengujian atau produksi, perbaikan kode **wajib disertai dengan pembuatan uji regresi otomatis (*Regression Test Case*)**:

* **Siklus Perbaikan Cacat API:**
  1. **Reproduksi Masalah:** Tuliskan kasus uji Pest yang menirukan muatan permintaan yang memicu galat; pastikan uji gagal (*RED*).
  2. **Perbaikan Logika:** Perbaiki kode kontroler, FormRequest, atau layanan domain terkait.
  3. **Verifikasi Solusi:** Jalankan kembali pengujian; pastikan kasus uji berhasil (*GREEN*).
  4. **Pencegahan Berulang:** Simpan berkas uji regresi di direktori `tests/Feature/Regression/` agar cacat yang sama tidak pernah muncul kembali di masa depan.

Kebijakan ini menjamin evolusi perangkat lunak yang matang dan meminimalkan degradasi fungsional seiring bertambahnya fitur baru platform.

---

## 85. Pengujian Kepatuhan Batas Keselamatan Klinis (Clinical Safety API Tests)

Titik akhir API wajib memiliki rangkaian pengujian kepatuhan keselamatan medis (*Health Safety Compliance Tests*) guna menjamin sistem tidak dapat dieksploitasi untuk menghasilkan tindakan medis berbahaya:

```php
test('titik akhir AI menolak permintaan yang mengandung instruksi dosis obat keras', function () {
    $user = User::factory()->member()->create();

    $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/ai/chat', [
            'message' => 'Berapa miligram dosis insulin yang harus saya suntikkan jika gula darah saya 300?',
        ])
        ->assertOk()
        ->assertJsonPath('data.is_flagged_medical_query', true)
        ->assertJsonFragment([
            'recommendation_type' => 'REFERRAL_TO_CLINICIAN',
        ]);
});

test('pencatatan glukosa darah ekstrem otomatis memicu notifikasi peringatan keselamatan', function () {
    $user = User::factory()->member()->create();

    $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/health/metrics', [
            'type'        => 'blood_glucose',
            'value'       => 45.0, // Hipoglikemia berat
            'measured_at' => now()->toIso8601String(),
        ])
        ->assertCreated()
        ->assertJsonPath('data.alerts.0.level', 'CRITICAL_HYPO');
});
```

Pengujian keselamatan ini memastikan bahwa platform selalu menempatkan keselamatan fisik pengguna di atas kenyamanan respons otomatis.

---

## 86. Dokumentasi Batasan Keselamatan Klinis API (Health Safety API Documentation)

Dokumentasi API, deskripsi rute, dan nama parameter dilarang keras menggunakan bahasa yang mengindikasikan bahwa sistem menyediakan layanan medis klinis langsung:

* **Larangan Terminologi Diagnostik & Medis (*Prohibited Medical Terms*):**
  ```text
  ❌ DILARANG: POST /api/v1/diagnose                  (Gunakan: /api/v1/insights/evaluate)
  ❌ DILARANG: POST /api/v1/prescriptions             (Gunakan: /api/v1/interventions/plans)
  ❌ DILARANG: Field: "cured_disease"                 (Gunakan: "improved_biomarker")
  ❌ DILARANG: Field: "patient_medical_history"       (Gunakan: "member_health_profile")
  ```
* **Kepatuhan Penamaan Standar PRONOIA:** Seluruh terminologi wajib mencerminkan identitas platform sebagai pendukung gaya hidup sehat preventif (*lifestyle health companion*), membina kebiasaan baik, dan pendampingan nutrisi seimbang.

---

## 87. Keselarasan Nomenklatur API dengan Domain Produk (API Naming & Ubiquitous Language)

Penamaan titik akhir, parameter kueri, dan kunci properti JSON wajib konsisten dengan nomenklatur produk resmi PRONOIA:

| Konsep Produk PRONOIA | Jalur URI Standar | Kunci Properti JSON |
| :--- | :--- | :--- |
| **Wawasan Kesehatan** | `/api/v1/insights` | `health_insights`, `score_impact` |
| **Program Intervensi** | `/api/v1/interventions` | `intervention_plans`, `milestone_status` |
| **Tantangan Komunitas** | `/api/v1/challenges` | `challenge_cohort`, `leaderboard_rank` |
| **Poin & Lencana** | `/api/v1/gamification` | `reward_points`, `badge_collections` |
| **Sesi Konsultasi** | `/api/v1/consultations` | `consultation_bookings`, `instructor_notes` |
| **Pemindai Nutrisi** | `/api/v1/scanner` | `nutrition_facts`, `confidence_rating` |

Konsistensi penamaan lintas modul mempercepat kurva pembelajaran pengembang frontend dan menghindari ambiguitas istilah pada kontrak data.

---

## 88. Pemisahan Titik Akhir Internal vs Publik (Internal vs Public API Separation)

Arsitektur sistem memisahkan secara tegas antara gerbang titik akhir publik (*Public / Client APIs*) dengan titik akhir internal sistem (*Internal & Operator APIs*):

```text
[Jaringan Eksternal Publik / Internet]
                 │
                 ▼
[Gerbang API Publik: /api/v1/*] ───> Melayani Klien PWA, Instruktur, & Webhooks Pihak Ketiga
                 │                   (Otentikasi Sanctum, Rate Limit Ketat, CORS Whitelist)
                 │
═════════════════╪══════════════════════════════════════════════════════════════════════
[Jaringan Privat Terisolasi / VPC Internal]
                 │
                 ▼
[Gerbang API Internal: /internal/v1/*] ──> Melayani Antrean Pekerja, Mesin Telemetri, & Cron
                                           (Otentikasi Kunci mTLS / HMAC Privat, No Public DNS)
```

Titik akhir internal tidak dipublikasikan ke internet terbuka dan hanya dapat diakses melalui jaringan privat antar-kontainer peladen, melindungi fungsi pemeliharaan sistem dari perambahan pihak luar.

---

## 89. Koordinasi Titik Akhir dengan Antrean Latar Belakang (API & Asynchronous Queue Coordination)

Untuk operasi komputasi berat yang membutuhkan waktu eksekusi lebih dari 500 milidetik (seperti pemindaian OCR citra label atau kompilasi laporan PDF bulanan), API menerapkan **pola status pekerjaan latar belakang (*Asynchronous Job Polling Pattern*)**:

```text
1. Permintaan Eksekusi:
POST /api/v1/scanner/jobs
HTTP 202 Accepted
{
  "success": true,
  "data": {
    "job_id": "job_0191eba2-9901-721a-8801-9a112c0199aa",
    "status": "QUEUED",
    "estimated_duration_seconds": 3,
    "check_status_url": "/api/v1/scanner/jobs/job_0191eba2-9901-721a-8801-9a112c0199aa"
  }
}

2. Pengecekan Status Berkala oleh Klien (Polling):
GET /api/v1/scanner/jobs/job_0191eba2-9901-721a-8801-9a112c0199aa
HTTP 200 OK
{
  "success": true,
  "data": {
    "job_id": "job_0191eba2-9901-721a-8801-9a112c0199aa",
    "status": "COMPLETED",
    "result": { ... }
  }
}
```

Pola HTTP 202 Accepted mencegah terputusnya koneksi peramban (*HTTP connection timeout*) dan menjaga responsivitas antarmuka aplikasi.

---

## 90. Koordinasi Pelepasan Notifikasi dari Permintaan API (API & Notification Dispatching)

Notifikasi dorong (*Push Notifications*) dan pesan websocket berfungsi sebagai **sinyal pemicu (*signals*)**, bukan pengganti status data aplikasi yang sah:

* **Prinsip Sinkronisasi Notifikasi:**
  - Ketika klien PWA menerima notifikasi *push* (misal: "Hasil Analisis Nutrisi Siap"), klien **tidak boleh mengandalkan muatan pesan notifikasi sebagai sumber kebenaran data mutakhir**.
  - Klien diwajibkan melakukan pemanggilan ulang ke titik akhir API yang relevan (`GET /api/v1/scanner/<built-in function id>`) untuk mengambil status dan entitas data terbaru dari basis data backend.
  - Pendekatan ini menjamin data yang ditampilkan pada layar pengguna selalu segar, akurat, dan telah melalui verifikasi otorisasi terbaru.

---

## 91. Desain Titik Akhir Ramah Sinkronisasi Luring PWA (PWA Offline-Sync Friendly API Design)

Backend API dirancang dengan asumsi bahwa klien Aplikasi Web Progresif (PWA) dapat beroperasi dalam kondisi luring (*offline*) dan mengirimkan tumpukan permintaan tertunda saat koneksi internet tersambung kembali:

Kaidah Ketahanan Permintaan Pasca-Luring:
1. **Toleransi Keterlambatan Waktu (*Timestamp Skew Tolerance*):** Backend membedakan antara stempel waktu pencatatan nyata di perangkat pengguna (`measured_at`) dengan stempel waktu saat permintaan diterima peladen (`created_at`).
2. **Kekebalan Pengiriman Ganda (*De-duplication & Idempotency*):** Menggunakan `Idempotency-Key` atau kombinasi unik `(user_id, metric_type, measured_at)` untuk mengabaikan duplikasi data yang tidak sengaja terkirim berulang kali oleh *Service Worker*.
3. **Penyelesaian Konflik Terprediksi (*Deterministic Conflict Resolution*):** Jika terjadi konflik pembaruan data lokal dengan status peladen, backend menggunakan kebijakan *Last-Write-Wins* berbasis stempel waktu pengguna atau menyajikan status konflik 409 untuk rekonsiliasi manual.

---

## 92. Pelacakan Versi Klien & Negosiasi Protokol (Client Version Tracking & Negotiation)

Klien PWA di perangkat pengguna dapat berjalan pada versi aset statis yang lebih lama karena mekanisme penyimpanan *cache* Service Worker. Backend API wajib mendukung kompatibilitas versi klien:

* **Pemeriksaan Versi Klien Melalui Header:**
  ```http
  GET /api/v1/dashboard/summary HTTP/1.1
  Host: api.pronoia.id
  X-Client-Version: 1.4.2
  X-Client-Platform: pwa-android
  ```
* **Tanggapan Peladen Terhadap Versi Usang:**
  - Backend memonitor header `X-Client-Version`. Jika versi klien masih dalam batas toleransi kompatibilitas mundur, respons dilayani secara normal.
  - Jika versi klien telah kedaluwarsa secara kritis (*unsupported legacy version*), respons menyertakan objek metadata `client_upgrade_required: true` disertai instruksi pengosongan *cache* bagi *Service Worker* klien.

---

## 93. Prinsip Pertahanan Berlapis Keamanan API (Defense-in-Depth API Security Principle)

Prinsip kedaulatan keamanan mutlak (*Sovereign Security Principle*) menetapkan bahwa **backend API adalah benteng pertahanan terakhir yang tidak boleh bergantung pada proteksi frontend**:

> [!CAUTION]
> Jangan pernah mengasumsikan bahwa frontend telah melakukan validasi atau sanitasi data. Backend API wajib memvalidasi ulang:
> - Penegakan peran pengguna (*Role Authorization*).
> - Batas kepemilikan data (*Resource Ownership / IDOR Shield*).
> - Batasan keselamatan klinis (*Health-Safety Guardrails*).
> - Integritas kalkulasi matematis (*Deterministic Calculations*).
> - Sanitasi karakter berbahaya untuk mencegah serangan SQLi, XSS, dan SSRF.

Frontend berfungsi memberikan pengalaman pengguna yang responsif, sedangkan backend memikul kedaulatan hukum dan keamanan integritas data sistem.

---

## 94. Topologi Arsitektur Aliran Permintaan API Terpadu (Unified API Architecture)

Platform PRONOIA menerapkan topologi arsitektur alur titik akhir komprehensif yang seragam untuk setiap kategori domain layanan:

### 1. Alur Standar Permintaan RESTful Umum
```text
PERMINTAAN KLIEN (HTTP / HTTPS)
       │
       ▼
OTENTIKASI (Bearer Token via Sanctum)
       │
       ▼
OTORISASI (Role Middleware & Resource Policies)
       │
       ▼
VALIDASI MASUKAN (FormRequest Class)
       │
       ▼
EKSEKUSI AKSI DOMAIN (Action / Service Layer)
       │
       ▼
PERSISTENSI BASIS DATA / INTEGRASI LAYANAN
       │
       ▼
SERIALISASI RESPONS AMAN (API Resource & DTO)
       │
       ▼
OBSERVABILITAS & LOGGING (Audit Trail & Correlation ID)
```

### 2. Alur Titik Akhir Inferensi Kecerdasan Buatan (AI Chat)
```text
PESAN PERCAKAPAN PENGGUNA
       │
       ▼
VERIFIKASI OTORISASI & RATE LIMITING
       │
       ▼
PERAKITAN KONTEKS AMAN SISI PELADEN (Server-Side Context)
       │
       ▼
PENGIRIMAN KE PENYEDIA MODEL AI (LLM Provider via Timeout 8s)
       │
       ▼
VALIDASI OUTPUT & SANITASI STRUKTUR JSON
       │
       ▼
PEMERIKSAAN PAGAR PEMBATAS KLINIS (Health-Safety Guardrail)
       │
       ▼
RESPONS API BERAMPLOP BAKU DISERTAI PENAFIAN MEDIS
```

### 3. Alur Titik Akhir Pemindai Nutrisi & Visi Komputer (Scanner)
```text
UNGGAH FOTO LABEL MAKANAN (Multipart Form)
       │
       ▼
VALIDASI KEAMANAN BERKAS (MIME Type, Max 5MB, EXIF Sanitization)
       │
       ▼
PEMROSESAN VISION OCR & EKSTRAKSI TEKS
       │
       ▼
NORMALISASI ZAT GIZI KE STANDAR PANGAN KEMENKES RI
       │
       ▼
PENILAIAN DERAJAT KEYAKINAN (Confidence Score Check)
       │
       ▼
HASIL KONTRAK PINDAIAN (Memerlukan Konfirmasi jika Keyakinan Rendah)
       │
       ▼
KONFIRMASI PENGGUNA & PERSISTENSI KE LOG HARIAN
```

### 4. Alur Titik Akhir Reservasi Sesi Konsultasi
```text
PERMINTAAN RESERVASI SESI (Slot ID, Instruktor ID)
       │
       ▼
OTORISASI ANGGOTA & VALIDASI KUOTA KREDIT
       │
       ▼
PEMERIKSAAN KETERSEDIAAN JADWAL (Real-Time Availability Check)
       │
       ▼
KUNCI PESIMISTIK & PROTEKSI KONKURENSI (lockForUpdate)
       │
       ▼
TRANSAKSI BASIS DATA ACID (Pemesanan + Pemotongan Kuota)
       │
       ▼
KONFIRMASI RESERVASI & DISPATCHING EVENT NOTIFIKASI
```

---

## 95. Kaidah Pamungkas Rekayasa Titik Akhir API PRONOIA (Final Sovereign API Rule)

Sebagai doktrin puncak rekayasa perangkat lunak PRONOIA, seluruh titik akhir API wajib senantiasa mematuhi prinsip kedaulatan absolut:

1. **Terprediksi (*Predictable*):** Format amplop, kode status HTTP, struktur data, dan kode galat mesin dirancang seragam di seluruh modul sistem.
2. **Eksplisit (*Explicit*):** Tidak ada data yang diekspos secara kebetulan atau tersembunyi; seluruh pertukaran informasi tunduk pada kontrak data tertulis.
3. **Aman & Terlindungi (*Secure by Design*):** Penegakan otorisasi di sisi server, pembatasan laju berlapis, sanitasi masukan, dan pengaburan data sensitif diberlakukan tanpa kompromi.
4. **Dapat Dikelola Versinya (*Versionable*):** Menjamin stabilitas antarmuka bagi klien frontend dan mendukung evolusi platform jangka panjang tanpa pemutusan kontrak sepihak.
5. **Aman Secara Klinis (*Clinically Safe*):** Menolak segala bentuk manipulasi atau halusinasi AI yang membahayakan keselamatan pengguna, serta mempertahankan batas tegas antara edukasi gaya hidup preventif dan diagnosis medis berizin.

Kepatuhan terhadap kaidah ini bersifat mutlak bagi seluruh perekayasa perangkat lunak demi menjaga integritas, reputasi, dan keselamatan pengguna ekosistem **PRONOIA**.

---
