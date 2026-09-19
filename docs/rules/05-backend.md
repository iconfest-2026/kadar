# AEVYRA — Kaidah Arsitektur Backend & Rekayasa Layanan Terdistribusi (Backend Architecture & Service Engineering Rules)

Dokumen spesifikasi teknis ini mendefinisikan standar rekayasa backend, arsitektur layanan aplikasi, tata kelola logika domain bisnis, serta protokol integrasi eksternal untuk platform **AEVYRA**. Lapisan backend berkedudukan sebagai pusat otoritas pengendali yang memikul tanggung jawab penuh terhadap penegakan logika bisnis, otorisasi peran pengguna (*role-based access control*), validasi masukan berlapis, orkestrasi pemrosesan deret waktu biometrik, eksekusi mesin perilaku preventif (*behavioral health engine*), integrasi model kecerdasan buatan (*AI & Computer Vision*), penanganan transaksi reservasi konsultasi, pengiriman notifikasi, serta pemrosesan antrean latar belakang (*asynchronous worker jobs*).

Arsitektur backend AEVYRA dibangun dengan pola **Monolit Modular (*Modular Monolith*)** berbasis **Laravel 11+** dan **PHP 8.3+** dengan pengetikan ketat (*strict typing*). Pendekatan ini memisahkan secara jernih antara kontroler ramping (*Thin Controllers*), lapisan layanan murni (*Service & Action Layer*), objek transfer data (*DTO*), serta transformasi kontrak API yang terprediksi (*API Resources*). Seluruh kalkulasi klinis dan status perilaku dijamin deterministik, bebas dari efek samping spekulatif AI, serta terisolasi secara kokoh demi menjamin keselamatan pengguna dan kepatuhan terhadap Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022).

---

### Kontrol Dokumen & Metadata Arsitektur

| Parameter Dokumen | Spesifikasi Teknis / Status Resmi |
| :--- | :--- |
| **Nomor Dokumen Standar** | `AEVYRA-RULE-005` |
| **Versi Standar Backend** | `v1.0.0-PROD` (Edisi Kepatuhan Rekayasa Layanan & ICONFEST 2026) |
| **Tanggal Efektif Berlaku** | 17 September 2026 |
| **Status Otorisasi** | Resmi Disetujui / Berlaku Mutlak (*Mandatory Backend Engineering Standard*) |
| **Klasifikasi Akses** | Seluruh Perekayasa Backend, Tim DevOps, Arsitek Sistem, & Pengembang AI |
| **Bahasa & Kerangka Utama** | PHP 8.3+ (Strict Types Enabled) & Laravel Framework 11+ |
| **Mesin Basis Data & Cache** | PostgreSQL 16+ (Basis Data Primer) & Redis 7+ (Cache & Antrean Horizon) |
| **Kerangka Pengujian** | Pest PHP v3+ / PHPUnit 11+ (Unit, Feature, Integration, & Architecture Tests) |
| **Kepatuhan Privasi & Keamanan** | UU PDP No. 27/2022, OWASP API Security Top 10 (2023), ISO/IEC 27001:2022 |
| **Paradigma Perancangan** | Modular Monolith, Domain-Driven Design (DDD) Lightweight, Clean Action Services |

---

### Matriks 10 Klaster Arsitektur Backend AEVYRA

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                    TOPOLOGI REKAYASA BACKEND & LOGIKA DOMAIN PLATFORM AEVYRA             │
└───────────────────────────────────────────────────────────────────────────────────────────┘
   │
   ├── [Klaster 1] Fondasi Arsitektur Backend, Kontroler Ramping, & Layanan (Bagian 1 – 10)
   │   └── Modular Monolith, Thin Controllers, Form Request, Policies, Single Action Services, Testability
   │
   ├── [Klaster 2] Mesin Analitik Perilaku & Kalkulasi Deterministik (Bagian 11 – 15)
   │   └── Deterministic Purity, Baseline Calculation, Signal Creation, Evidence Grounding, Insight Generation
   │
   ├── [Klaster 3] Orkes Integrasi Kecerdasan Buatan & Pemindai Visi (Bagian 16 – 25)
   │   └── Provider Interfaces, Fallback Resilience, Secret Hygiene, Context Sanitization, Scanner Integrity
   │
   ├── [Klaster 4] Persistensi Data Kesehatan, Integritas Transaksi, & Konkurensi (Bagian 26 – 36)
   │   └── Health Data Persistence, Missing vs Zero, Explicit Units, Freshness, N+1 Shield, ACID Locks, Idempotency
   │
   ├── [Klaster 5] Antrean Asinkron, Penjadwalan, Peristiwa, & Penanganan Galat (Bagian 37 – 46)
   │   └── Asynchronous Queues, Dead Letter Queue, Crons, Domain Events, Safe Notifications, Centralized Exceptions
   │
   ├── [Klaster 6] Kontrak Respons API, DTO, Enums, & Mesin Status Domain (Bagian 47 – 53)
   │   └── API Resources, Typed DTOs, PHP 8.3 Backed Enums, State Machines, Business Invariants, Ownership Policies
   │
   ├── [Klaster 7] Analitik Agregat, Pencarian, Paginasi, & Pemrosesan Berkas (Bagian 54 – 60)
   │   └── Anonymous Aggregation, Scoped Search, Keyset Cursor Pagination, Storage Management, Background Files
   │
   ├── [Klaster 8] Strategi Cache, Dukungan PWA, & Pagar Pembatas Penyedia Luar (Bagian 61 – 72)
   │   └── Cache Invalidation, Offline PWA Sync, Security Perimeter, Clinical Guardrails, Timeouts, Rate Limits
   │
   ├── [Klaster 9] Observabilitas, Ketahanan Sistem, & Standar Kerapian Kode (Bagian 73 – 86)
   │   └── Correlation IDs, Logging Severity, No Silent Failure, Graceful Degradation, Dependency Injection
   │
   └── [Klaster 10] Strategi Pengujian Otomatis, DoD, & Kaidah Pamungkas (Bagian 87 – 95)
       └── Test Pyramid, Unit/Feature/Integration, Safety Regression, Definition of Done, Final Sovereign Rule
```

---

## 1. Tujuan & Ruang Lingkup Rekayasa Backend (Purpose & Backend Scope)

Kaidah rekayasa backend ini menetapkan standar arsitektur layanan, tata kelola logika domain, serta protokol keamanan komputasi untuk platform **AEVYRA**. Lapisan backend bertindak sebagai pusat kedaulatan operasional sistem yang memikul tanggung jawab atas:

* **Penegakan Logika Bisnis & Domain:** Eksekusi aturan alur kerja, validasi status, dan pemeliharaan invarian domain.
* **Otorisasi & Keamanan Akses:** Penegakan kebijakan hak akses tingkat baris (*Row-Level Policies*) dan otentikasi identitas.
* **Validasi Masukan Berlapis:** Pemeriksaan keabsahan skema, tipe data, rentang fisiologis, dan sanitasi payload HTTP.
* **Persistensi & Integritas Relasional:** Manajemen transaksi ACID pada basis data PostgreSQL dan penanganan cache Redis.
* **Mesin Analitik Perilaku Preventif:** Pengolahan deret waktu biometrik, kalkulasi garis acuan personal, dan deteksi sinyal deviasi kebiasaan.
* **Orkestrasi Layanan Kecerdasan Buatan:** Penghubung aman (*bridge*) ke model AI generatif dan model visi pemindai makanan.
* **Manajemen Konsultasi & Komunikasi:** Alur reservasi jadwal instruktur, pencegahan *double-booking*, dan perpesanan terenkripsi.
* **Pemrosesan Latar Belakang & Asinkron:** Antrean pekerja (*queue workers*), tugas pemeliharaan terjadwal (*crons*), dan pengiriman notifikasi.

---

## 2. Pilihan Teknologi & Ekosistem Backend (Backend Technology Stack)

Ekosistem teknologi backend AEVYRA distandarisasi menggunakan teknologi modern berkinerja tinggi yang teruji dalam skala produksi:

| Komponen Teknologi | Pilihan Standar Platform | Karakteristik & Peran Arsitektural |
| :--- | :--- | :--- |
| **Bahasa Pemrograman** | **PHP 8.3+** | Pengetikan ketat (`declare(strict_types=1);`), *readonly classes*, dan *Backed Enums*. |
| **Kerangka Kerja Web** | **Laravel 11+** | Kerangka kerja modular tangguh dengan ekosistem *Eloquent, Form Requests, Queues, & Events*. |
| **Basis Data Relasional** | **PostgreSQL 16+** | Mesin basis data utama dengan kepatuhan ACID penuh, tipe JSONB, dan integritas referensial. |
| **Penyimpanan Cache & Antrean**| **Redis 7+** | Cache memori berkecepatan tinggi, pengendali sesi, serta broker antrean melalui *Laravel Horizon*. |
| **Kerangka Pengujian** | **Pest PHP v3+ / PHPUnit 11+** | Pengujian unit, fitur, arsitektur, dan integrasi terotomasi pada alur CI/CD. |

---

## 3. Pola Arsitektur Monolit Modular (Modular Monolith Architecture)

Platform AEVYRA menerapkan pola arsitektur **Monolit Modular (*Modular Monolith Architecture*)** yang mengelompokkan kode sumber ke dalam modul-modul fungsional independen di dalam satu repositori terpadu:

```text
+-------------------------------------------------------------------------+
|                ARSITEKTUR MONOLIT MODULAR PLATFORM AEVYRA              |
+-------------------------------------------------------------------------+
|  [Modul Identity]    : Pengguna, Peran, Izin, Sesi Otentikasi           |
|  [Modul Biometrics]  : Profil Kesehatan, Metrik Deret Waktu, Satuan     |
|  [Modul Behavioral]  : Garis Acuan Personal, Sinyal Deviasi, Wawasan    |
|  [Modul Nutrition]   : Log Asupan, Pemindai Kamera, Deteksi Alergen     |
|  [Modul Coaching]    : Reservasi Konsultasi, Chat Pembinaan, Evaluasi   |
|  [Modul Gamification]: Lencana Prestasi, Tantangan, Poin Keanggotaan    |
+-------------------------------------------------------------------------+
|                  INFRASTRUKTUR & LAYANAN PENDUKUNG BERSAMA              |
|  (Database Migrations, Queue Horizon, Event Bus, Storage, Notification) |
+-------------------------------------------------------------------------+
```

Pola ini menghadirkan kecepatan pengembangan monolit tanpa mengorbankan batas isolasi domain, serta menghindari kompleksitas jaringan dan latensi terdistribusi dari arsitektur *microservices* prematur.

---

## 4. Disiplin Kontroler Ramping (Thin Controllers Discipline)

Lapisan kontroler HTTP wajib mematuhi disiplin **Kontroler Ramping (*Thin Controllers Discipline*)**. Kontroler hanya bertindak sebagai pengatur lalu lintas HTTP (*traffic coordinator*) dan dilarang memuat logika bisnis langsung:

```php
// ✅ CONTOH IMPLEMENTASI KONTROLER RAMPING SESUAI STANDAR
namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreHealthMetricRequest;
use App\Http\Resources\HealthMetricResource;
use App\Actions\\Biometrics\RecordHealthMetricAction;
use Illuminate\Http\JsonResponse;

class HealthMetricController extends Controller
{
    public function store(
        StoreHealthMetricRequest $request, 
        RecordHealthMetricAction $action
    ): JsonResponse {
        $metric = $action->execute($request->toDTO());

        return (new HealthMetricResource($metric))
            ->response()
            ->setStatusCode(201);
    }
}
```

Kontroler hanya bertanggung jawab untuk:
1. Menerima permintaan HTTP dan mendelegasikannya ke *Form Request* untuk validasi.
2. Memanggil *Service* atau *Action Class* yang memproses logika domain.
3. Mengembalikan respons menggunakan *API Resource Transformer*.

---

## 5. Validasi Melalui Form Request Terisolasi (Form Request Validation)

Seluruh validasi data masukan dari klien wajib didelegasikan ke kelas **Laravel Form Request** terisolasi. Dilarang menjalankan validasi manual di dalam badan kontroler (`$request->validate([...])`):

* Menyediakan metode validasi aturan (`rules()`).
* Menyediakan metode otorisasi awal (`authorize()`).
* Menyediakan metode konversi ke objek data terstruktur (`toDTO()`).

```text
Daftar Form Request Baku Sistem:
- StoreHealthMetricRequest
- CreateFoodScanRequest
- BookConsultationRequest
- UpdateHealthProfileRequest
- EnrollChallengeRequest
```

Validasi sisi klien (*client-side validation*) hanyalah pelengkap kenyamanan antarmuka dan dilarang dipercaya sebagai lapisan keamanan.

---

## 6. Standarisasi Kaidah Validasi Masukan (Input Validation Rules)

Setiap masukan data wajib divalidasi secara komprehensif mencakup sepuluh dimensi integritas masukan:

```php
public function rules(): array
{
    return [
        'metric_type' => ['required', 'string', Rule::enum(MetricTypeEnum::class)],
        'value'       => ['required', 'numeric', 'min:0.1', 'max:500.0'],
        'unit'        => ['required', 'string', Rule::in(['kg', 'cm', 'hours', 'L', 'mL', 'steps'])],
        'recorded_at' => ['required', 'date', 'before_or_equal:now'],
        'source'      => ['sometimes', 'string', Rule::enum(MetricSourceEnum::class)],
    ];
}
```

Validasi wajib menolak masukan yang tidak sah sebelum kode logika domain atau kueri basis data dieksekusi.

---

## 7. Otorisasi Berbasis Kebijakan & Hak Akses (Policy-Based Authorization)

Otorisasi akses data wajib ditegakkan di sisi server (*Server-Side Authorization*) memanfaatkan kelas **Laravel Policies**:

```php
// Contoh Kebijakan Otorisasi Metrik Kesehatan
class HealthMetricPolicy
{
    public function view(User $user, HealthMetric $metric): bool
    {
        // Pengguna pemilik sah atau instruktur yang ditugaskan resmi
        return $user->id === $metric->user_id 
            || $user->hasActiveAssignmentWith($metric->user_id);
    }

    public function update(User $user, HealthMetric $metric): bool
    {
        // Hanya pemilik data yang boleh mengoreksi metriknya
        return $user->id === $metric->user_id;
    }
}
```

> [!CAUTION]
> Dilarang menyimpulkan otorisasi dari parameter URL tersembunyi, peran yang dikirimkan klien di body JSON, atau visibilitas tombol di antarmuka frontend.

---

## 8. Lapisan Layanan & Aksi Tunggal (Service and Action Layer)

Seluruh alur kerja bisnis bermakna wajib dimodelkan ke dalam kelas layanan berfokus tunggal (**Single Action Classes / Dedicated Services**):

```text
+-------------------------------------------------------------------------+
|                  CONTOH STRUKTUR AKSI DOMAIN AEVYRA                    |
+-------------------------------------------------------------------------+
|  App\Actions\Behavioral\CalculatePersonalBaselineAction.php             |
|  App\Actions\Behavioral\DetectBehavioralDeviationAction.php             |
|  App\Actions\Behavioral\SynthesizeHealthInsightAction.php               |
|  App\Actions\Coaching\BookConsultationSlotAction.php                    |
|  App\Actions\Nutrition\ProcessFoodScanResultAction.php                  |
|  App\Actions\Gamification\ClaimChallengeRewardAction.php                |
+-------------------------------------------------------------------------+
```

Dilarang membuat kelas raksasa generik tanpa batas seperti `GeneralService`, `CommonHelper`, atau `DataManager` yang mencampurkan lusinan tanggung jawab berbeda.

---

## 9. Granularitas & Tanggung Jawab Layanan (Service Granularity & Boundaries)

Granularitas lapisan layanan harus seimbang dan proporsional terhadap kompleksitas domain:

* **Tepat & Bernilai Domain:** Aksi untuk alur kerja yang melibatkan validasi status, mutasi data, dan orkestrasi peristiwa (`BookConsultationAction`, `CalculateBehaviorBaselineAction`).
* **Berlebihan & Tidak Perlu (*Anti-Pattern*):** Membuat kelas aksi terpisah hanya untuk fungsi sepele seperti membaca nama pengguna (`GetUserNameAction`) atau memformat tanggal (`FormatDateAction`).
* Gunakan abstraksi hanya pada bagian sistem yang memberikan manfaat pengujian, keterbacaan, dan pemeliharaan kode jangka panjang.

---

## 10. Keterujian Logika Domain Tanpa Efek Samping (Testable Domain Logic)

Logika bisnis domain wajib dirancang bebas dari efek samping (*pure domain logic*) sehingga dapat diuji secara terisolasi tanpa memerlukan simulasi HTTP atau dependensi eksternal yang rumit:

* Dilarang menempatkan logika matematika perhitungan garis acuan di dalam *Blade templates*, kontroler, atau skrip JavaScript antarmuka.
* Dilarang mengandalkan instruksi teks bebas (*prompts*) model AI untuk mengeksekusi aturan logika bisnis kritis.
* Logika inti domain wajib memiliki cakupan pengujian unit (*Unit Test Coverage*) minimal 90%.

---

## 11. Kalkulasi Deterministik Beban Logika Klinis (Deterministic Calculations)

Seluruh kalkulasi kuantitatif yang berdampak pada penilaian kebiasaan, tren deviasi, dan skor kesehatan wajib bersifat **Deterministik Murni (*Purely Deterministic*)**:

```text
Parameter Masukan Sama (Input X)  ──►  Hasil Keluaran Identik (Output Y)
```

Perhitungan rata-rata bergerak (*moving average*), persentase pergeseran (*delta percentage*), deviasi standar, serta Skor Perilaku Kesehatan dihitung menggunakan formula matematika eksak di lapisan kode PHP, bukan ditebak secara probabilistik oleh model kecerdasan buatan (*Large Language Models*).

---

## 12. Arsitektur Mesin Analitik Perilaku (Behavioral Health Engine Backend)

Arsitektur backend **Mesin Kesehatan Perilaku (*Behavioral Health Engine*)** mendukung pipa pemrosesan bertahap yang modular dan transparan:

```text
+-------------------------------------------------------------------------+
|             PIPELINE ANALITIK MESIN KESEHATAN PERILAKU AEVYRA          |
+-------------------------------------------------------------------------+
|  1. Data Mentah Masuk (Raw Biometric & Habit Logs)                      |
|                         ↓                                               |
|  2. Normalisasi Satuan & Filter Validitas Mutu Data (Data Sanitization) |
|                         ↓                                               |
|  3. Agregasi Historis Jendela Waktu 30 Hari (Historical Aggregation)    |
|                         ↓                                               |
|  4. Kalkulasi Garis Acuan Personal (Calculate Personal Baseline)        |
|                         ↓                                               |
|  5. Evaluasi Jendela Pengamatan Terkini 3-7 Hari (Recent Window Eval)   |
|                         ↓                                               |
|  6. Deteksi Deviasi Kebiasaan Signifikan (Deviation Detection)          |
|                         ↓                                               |
|  7. Penerbitan Sinyal Perilaku Terverifikasi (Emit Behavior Signal)     |
|                         ↓                                               |
|  8. Sintesis Wawasan Edukatif Berbasis Bukti (Synthesize Health Insight)|
|                         ↓                                               |
|  9. Pemetaan Rekomendasi Tindakan Mikro (Map Preventive Intervention)   |
+-------------------------------------------------------------------------+
```

Setiap tahapan pipa diimplementasikan sebagai kelas terpisah yang dapat diuji secara independen.

---

## 13. Algoritma Kalkulasi Garis Acuan Personal (Personal Baseline Calculation)

Algoritma kalkulasi garis acuan kebiasaan personal (*Personal Baseline*) beroperasi secara eksplisit dan berbasis bukti statistik:

```php
namespace App\Actions\\Behavioral;

use App\Models\User;
use App\Enums\MetricTypeEnum;
use Carbon\Carbon;

class CalculatePersonalBaselineAction
{
    public function execute(User $user, MetricTypeEnum $type): ?BaselineResultDTO
    {
        $windowStart = Carbon::now()->subDays(30);
        
        $metrics = $user->healthMetrics()
            ->where('metric_type', $type->value)
            ->where('quality_status', 'valid')
            ->where('recorded_at', '>=', $windowStart)
            ->get();

        // Wajib memiliki minimal 7 titik data sampel untuk garis acuan valid
        if ($metrics->count() < 7) {
            return null;
        }

        $baselineValue = $metrics->avg('value');

        return new BaselineResultDTO(
            metricType: $type,
            baselineValue: round($baselineValue, 2),
            unit: $metrics->first()->unit,
            sampleCount: $metrics->count(),
            windowStart: $windowStart,
            windowEnd: Carbon::now()
        );
    }
}
```

Dilarang mengarang batas rujukan klinis atau memaksakan ambang batas populasi umum tanpa data historis personal yang memadai.

---

## 14. Deteksi & Pembuatan Sinyal Deviasi Perilaku (Behavioral Signal Generation)

Ketika nilai kebiasaan terkini menyimpang melampaui batas ambang yang ditentukan (misalnya deviasi durasi tidur > 20% selama 3 hari beruntun), sistem menerbitkan rekaman `BehaviorSignal`:

* Menyimpan nilai garis acuan asal (`baseline_value`).
* Menyimpan nilai rata-rata periode pengamatan terkini (`recent_value`).
* Menghitung nilai selisih absolut dan persentase deviasi (`delta`).
* Melampirkan arah pergeseran (`increase`, `decrease`, `volatile`).
* Merekam tingkat keyakinan bukti statistik (*confidence score*).

Sinyal perilaku ini bersifat *reproducible*: dapat dibuktikan kembali perhitungannya kapan pun dibutuhkan audit klinis.

---

## 15. Sintesis Wawasan Kesehatan Preventif (Health Insight Generation)

Wawasan kesehatan preventif (*Health Insights*) diracik berdasarkan bukti sinyal perilaku nyata yang dihasilkan oleh mesin sistem:

```text
Sinyal Perilaku Terverifikasi (Behavior Signal)
                      ↓
  Pembangun Wawasan Berbasis Aturan (Rule-Based Insight Builder)
                      ↓
  Wawasan Terstruktur (Structured Insight: What, Why, Evidence, Next)
                      ↓
  Penyempurnaan Bahasa oleh AI (Optional Generative AI Polishing)
                      ↓
  Penyajian ke Antarmuka Anggota (User Dashboard Presentation)
```

Model kecerdasan buatan dilarang keras mengarang wawasan kesehatan tanpa adanya sinyal perilaku nyata yang tercatat di basis data.

---

## 16. Arsitektur Backend Layanan Kecerdasan Buatan (AI Backend Architecture)

Seluruh integrasi dengan penyedia model kecerdasan buatan (*AI Providers* seperti Google Gemini API atau OpenAI) wajib berada di balik lapisan abstraksi layanan (*Service Abstraction Layer*):

```text
+-------------------------------------------------------------------------+
|                  ARSITEKTUR ABSTRAKSI PENYEDIA AI AEVYRA               |
+-------------------------------------------------------------------------+
|  Lapisan Domain Aplikasi (Actions & Services)                           |
|                         ↓                                               |
|  Antarmuka Kontrak Standar (App\Contracts\AIProviderInterface)          |
|                         ↓                                               |
|  Adaptor Konkret (GeminiProviderAdapter / OpenAIProviderAdapter)        |
|                         ↓                                               |
|  Klien SDK / HTTP Client dengan Circuit Breaker & Timeout               |
|                         ↓                                               |
|  Layanan Cloud Eksternal (Google Cloud Vertex AI / Gemini API)          |
+-------------------------------------------------------------------------+
```

Logika domain bisnis aplikasi dilarang keras terikat erat (*tightly coupled*) pada format respons atau SDK vendor AI tertentu.

---

## 17. Antarmuka Abstraksi Penyedia AI (AI Provider Interface)

Kontrak antarmuka penyedia AI distandarisasi untuk mendukung kebutuhan pertukaran vendor secara mulus:

```php
namespace App\Contracts;

use App\DTOs\AI\AIRequestDTO;
use App\DTOs\AI\AIResponseDTO;

interface AIProviderInterface
{
    /**
     * Mengirimkan konteks terstruktur dan mengembalikan respons terverifikasi.
     *
     * @throws \App\Exceptions\AIProviderException
     */
    public function generateStructuredResponse(AIRequestDTO $request): AIResponseDTO;
}
```

Struktur respons dari vendor eksternal dinormalisasi seketika menjadi `AIResponseDTO` sebelum diserahkan ke lapisan logika aplikasi.

---

## 18. Mitigasi Kegagalan Penyedia AI (AI Provider Failure Mitigation)

Kegagalan koneksi atau pemadaman total penyedia AI eksternal (*AI Outage*) sama sekali tidak boleh melumpuhkan operasional sistem utama AEVYRA:

* Menerapkan pola pemutus sirkuit (*Circuit Breaker Pattern*) jika tingkat kegagalan API mencapai ambang batas tertentu.
* Menyiapkan mekanisme cadangan (*Deterministic Fallback*): jika layanan AI gagal, antarmuka menyajikan teks wawasan berbasis aturan (*rule-based fallback*) yang telah terverifikasi secara klinis.
* Dilarang merekayasa respons palsu (*hallucinated mock*) saat terjadi kegagalan jaringan.

---

## 19. Tata Kelola Kunci Rahasia API Eksternal (AI Secrets & Credential Storage)

Kredensial dan kunci rahasia API kecerdasan buatan (*API Keys & Service Account Secrets*) wajib dikelola secara ketat pada lingkungan backend:

* Disimpan eksklusif pada berkas konfigurasi lingkungan server (`.env`) atau manajer rahasia cloud (*Cloud Secret Manager*).
* Dilarang keras mengekspos kunci API ke template Blade, kode JavaScript, atau berkas manifest PWA.
* Akses kunci dikurasi melalui berkas konfigurasi terpusat `config/services.php`.

---

## 20. Penyiapan Konteks Masukan AI yang Bersih (AI Context Preparation & Sanitization)

Penyiapan konteks masukan AI (*AI Context Preparation*) wajib mematuhi kaidah sanitasi dan minimisasi data privasi:

* **Larangan Serialisasi Model Mentah:** Dilarang melempar objek model Eloquent utuh (`$user->toJson()`) ke prompt AI, karena dapat membocorkan hash password, email pribadi, atau riwayat audit.
* **Pembentukan DTO Konteks Ringkas:** Hanya mengekstraksi data biometrik yang relevan dengan pertanyaan (misalnya: tren durasi tidur 3 malam terakhir).
* Menghilangkan data pengidentifikasi pribadi (*Personally Identifiable Information - PII*) sebelum payload teks dikirimkan ke cloud AI.

---

## 21. Validasi Skema Keluaran Model AI (AI Output Schema Validation)

Keluaran teks dari model AI selalu diperlakukan sebagai masukan eksternal yang belum tepercaya (*untrusted external input*):

1. **Validasi Skema JSON Terikat:** Memeriksa struktur kunci dan tipe data menggunakan skema validasi ketat sebelum diproses lebih lanjut.
2. **Penyaringan Konten Berbahaya:** Memeriksa ketiadaan instruksi farmakologis terlarang (resep obat keras) atau klaim diagnosis penyakit palsu.
3. **Pemeriksaan Batas Rentang:** Memastikan nilai kuantitatif yang diusulkan berada dalam ambang batas fisiologis aman.

---

## 22. Otorisasi Eksekusi Perkakas Sistem oleh AI (AI Tool Execution Authorization)

Jika model AI diberikan kemampuan memanggil perkakas sistem (*Function Calling / AI Tools*):

```text
Keluaran Permintaan Alat dari AI (Tool Call Request)
                        ↓
  Validasi Parameter & Argumen oleh Server
                        ↓
  Pengecekan Otorisasi Peran Pengguna Aktif (Policy Check)
                        ↓
  Verifikasi Batas Keamanan Domain Bisnis
                        ↓
  Eksekusi Aman oleh Kode Aplikasi Server
```

Model AI **tidak memiliki wewenang** mengeksekusi mutasi basis data secara mandiri tanpa persetujuan eksplisit dan otorisasi dari kode backend server.

---

## 23. Arsitektur Backend Pemindai Makanan (Scanner Backend Architecture)

Alur pemrosesan citra makanan dari pemindai kamera (*Food Scanner*) dipisahkan ke dalam alur kerja terstruktur di luar kontroler HTTP:

1. **Penerimaan & Validasi Berkas:** Memeriksa tipe MIME citra (`image/jpeg`, `image/png`, `image/webp`) dan ukuran maksimum (maks 5MB).
2. **Penyimpanan Aman Terenkripsi:** Menyimpan berkas ke penyimpanan objek privat (*Private Object Storage*) dengan penamaan UUID acak.
3. **Pemrosesan Visi Komputer:** Mengirimkan citra ke layanan ekstraksi gizi (*Computer Vision Pipeline*).
4. **Normalisasi Hasil Zat Gizi:** Memetakan estimasi kalori dan makronutrien ke dalam struktur `ScanResultDTO`.
5. **Evaluasi Tingkat Keyakinan:** Menilai skor keyakinan model (*Confidence Score*).

---

## 24. Batas Isolasi Layanan Pemindai Kamera (Scanner Provider Boundary)

Layanan pemindai citra eksternal diisolasi di balik kontrak antarmuka `ScannerProviderInterface`:

* Memisahkan logika adaptasi API pihak ketiga dari logika pencatatan log asupan harian anggota.
* Memungkinkan pengujian fungsionalitas pemindai menggunakan *Mock / Fake Scanner Provider* tanpa perlu mengunggah foto asli saat eksekusi *unit test*.

---

## 25. Penanganan Hasil Pemindaian Keyakinan Rendah (Low-Confidence Scanner Results)

Ketika skor keyakinan pemindai kamera berada di bawah batas ambang aman (< 0.70):

* Sistem menandai status hasil pemindaian sebagai `unverified` atau `uncertain`.
* Sistem dilarang mengarang nilai zat gizi mikro secara spekulatif.
* Backend mengirimkan respons yang mewajibkan pengguna memilih atau mengonfirmasi nama makanan secara manual sebelum dicatat sebagai log asupan resmi.

---

## 26. Persistensi Data Kesehatan Berintegritas (Health Data Persistence)

Penyimpanan metrik kesehatan pengguna ke basis data wajib menyertakan atribut konteks lengkap:

* **Tipe Metrik (*Metric Type*):** Mengacu pada taksonomi terstandarisasi (`weight`, `hydration`, `sleep_duration`, `steps`).
* **Nilai Numerik Presisi (*Numeric Value*):** Disimpan dengan tipe desimal presisi (`NUMERIC(10,2)`).
* **Satuan Pengukuran Eksplisit (*Unit*):** Wajib tercatat bersama angka (misalnya `kg`, `hours`, `L`).
* **Waktu Kejadian Aktual (*Recorded Timestamp*):** Mencatat waktu aktivitas biologis riil, bukan waktu akses sistem.
* **Asal-Usul Sumber Data (*Provenance*):** Menandai apakah data bersumber dari `manual`, `scanner`, `wearable`, atau `system`.

Dilarang keras menyimpan angka kuantitatif tanpa konteks tipe dan satuan (misalnya hanya menyimpan `value = 68` tanpa penjelas).

---

## 27. Pembedaan Nilai Kosong vs Nilai Nol (Missing Data vs Zero Value)

Lapisan backend wajib membedakan secara tegas antara kondisi data belum dicatat (**`null` / *missing***) dan nilai pengukuran aktual nol (**`0` / *measured zero***):

| Nilai di Database | Interpretasi Logika Domain | Perlakuan Sistem Backend |
| :--- | :--- | :--- |
| **`hydration = null`** | Pengguna belum mengisi catatan air minum hari ini. | Ditampilkan status kosong; diabaikan dari perhitungan pembagi rata-rata. |
| **`hydration = 0.00 L`** | Pengguna secara sadar mencatat konsumsi 0 liter air. | Diproses sebagai masukan dehidrasi riil; memicu peringatan edukatif hidrasi. |

Menyubstitusi nilai `null` menjadi `0` secara diam-diam (*silent zero conversion*) dilarang keras karena merusak akurasi garis acuan personal pengguna.

---

## 28. Penegakan Satuan Metrik Eksplisit (Mandatory Metric Units)

Setiap metrik kesehatan wajib menggunakan satuan pengukuran standar kanonikal platform:

* Jika antarmuka pengguna mendukung preferensi imperial (seperti pound `lb` atau inci `in`), lapisan backend wajib mengonversi nilai tersebut ke satuan metrik standar internasional (**kg**, **cm**, **liter**) sebelum disimpan ke basis data.
* Rumus konversi wajib teruji secara presisi dalam *unit test*:
  * Massa: `$kg = $lbs * 0.45359237;`
  * Panjang: `$cm = $inches * 2.54;`
* Dilarang mencampuradukkan satuan secara sembarangan di dalam basis data.

---

## 29. Validasi Kesegaran Data Kesehatan (Health Data Freshness Validation)

Rekomendasi tindakan preventif wajib mengevaluasi tingkat kesegaran data (*Data Freshness*):

* **Terkini (*Current*):** Data dicatat dalam 14 hari terakhir; dapat dijadikan dasar rekomendasi berkeyakinan tinggi.
* **Kedaluwarsa (*Stale*):** Data dicatat antara 15 hingga 90 hari yang lalu; memicu imbauan pembaruan data sebelum intervensi dimulai.
* **Tidak Diketahui (*Unknown*):** Belum ada data atau data berusia > 90 hari; sistem dilarang berspekulasi dan menyajikan rekomendasi umum.

---

## 30. Interaksi Basis Data Berkinerja Tinggi (High-Performance Database Interaction)

Interaksi basis data wajib memanfaatkan **Eloquent ORM** atau **Laravel Query Builder** sesuai konvensi standar proyek:

* Hindari penulisan kueri SQL mentah (*Raw SQL*) kecuali untuk kalkulasi agregasi kompleks yang membutuhkan optimasi performa ekstrem.
* Jika kueri mentah terpaksa digunakan, wajib menggunakan pengikatan parameter (*Parameter Binding* via PDO) untuk mencegah serangan injeksi SQL:
  ```php
  DB::select('SELECT * FROM health_metrics WHERE user_id = :userId AND value > :minVal', [
      'userId' => $user->id,
      'minVal' => 100.0,
  ]);
  ```

---

## 31. Pencegahan Anomali Kueri N+1 (N+1 Query Prevention)

Seluruh kueri relasional wajib diperiksa dari potensi anomali kueri N+1 (*N+1 Query Problem*) dengan menerapkan pemuatan awal (*Eager Loading*):

```php
// ✅ PENDEKATAN BENAR (Eager Loading Terencana)
$members = User::role('member')
    ->with([
        'healthProfile',
        'activeInterventions' => fn($q) => $q->where('status', 'active'),
        'recentSignals'       => fn($q) => $q->latest()->limit(3)
    ])
    ->paginate(20);
```

Pengambilan koleksi data besar wajib menyertakan paginasi terukur dan dilarang memuat seluruh relasi pohon keluarga tanpa batasan.

---

## 32. Ruang Lingkup Kueri & Penggunaan Scope (Eloquent Query Scopes)

Kueri basis data wajib dibatasi hanya untuk mengambil data yang dibutuhkan oleh konteks operasi aktif (*Query Scoping*):

* Gunakan klausa *Eloquent Local Scopes* untuk menyaring data secara modular:
  ```php
  public function scopeRecentWindow(Builder $query, int $days = 14): Builder
  {
      return $query->where('recorded_at', '>=', now()->subDays($days));
  }
  ```
* Dilarang memuat seluruh riwayat data seumur hidup pengguna (*lifetime history*) jika antarmuka hanya menampilkan grafik 7 hari terakhir.

---

## 33. Transaksi ACID pada Mutasi Data Kritis (Database ACID Transactions)

Operasi yang melibatkan perubahan status multi-tabel wajib dibungkus di dalam transaksi basis data ACID (**`DB::transaction`**):

```php
// Alur Transaksi Atomik Reservasi Konsultasi
DB::transaction(function () use ($dto) {
    // 1. Kunci slot jadwal instruktur
    $slot = ScheduleSlot::lockForUpdate()->findOrFail($dto->slotId);
    $slot->markAsBooked();

    // 2. Buat rekaman reservasi konsultasi
    $consultation = Consultation::create([...]);

    // 3. Kurangi kuota sesi anggota
    $dto->member->decrement('consultation_quota');

    return $consultation;
});
```

Jika terjadi kegagalan pada salah satu langkah, seluruh mutasi data akan digulung balik (*rollback*) secara otomatis tanpa meninggalkan status parsial yang rusak.

---

## 34. Pemisahan Transaksi DB dari Panggilan HTTP Luar (External APIs & Transactions)

Dilarang keras mempertahankan transaksi basis data aktif (*open transaction lock*) saat melakukan panggilan jaringan ke API pihak ketiga:

> [!CAUTION]
> **Anti-Pattern Transaksi Berbahaya:**
> Membuka `DB::beginTransaction()` lalu memanggil API eksternal (seperti OpenAI, Gemini, atau Payment Gateway) yang membutuhkan waktu 5-20 detik akan mengunci baris basis data, menahan koneksi *pool*, dan melumpuhkan server produksi saat beban tinggi.

Pola yang benar: siapkan draf data di basis data, komit transaksi, lalu jalankan panggilan API eksternal melalui *queued background job*.

---

## 35. Pengendalian Konkurensi & Penguncian Pesimis (Concurrency Control & Locking)

Alur kerja yang rentan terhadap perebutan sumber daya bersama (seperti reservasi slot jadwal instruktur atau klaim kuota hadiah tantangan) wajib dilindungi dari kondisi balapan (*race condition*):

* Menggunakan transaksi dengan penguncian baris pesimis (`lockForUpdate()`).
* Menegakkan indeks unik komposit pada lapisan basis data.
* Dilarang hanya mengandalkan logika sederhana `if ($slot->isAvailable()) { $slot->book(); }` tanpa penguncian transaksi.

---

## 36. Jaminan Idempotensi Permintaan Kritis (Request Idempotency Assurance)

Operasi mutasi kritis yang berpotensi dipicu berulang kali oleh pengguna atau sistem penjadwalan wajib dirancang secara **Idempoten (*Idempotent Operations*)**:

* Menggunakan kunci idempotensi (*Idempotency Key*) pada header HTTP (`X-Idempotency-Key`).
* Pemrosesan *webhook* pembayaran atau notifikasi berulang harus menghasilkan status yang sama tanpa menggandakan pencatatan transaksi atau kredit poin.

---

## 37. Pemanfaatan Antrean Pemrosesan Latar Belakang (Asynchronous Queue Processing)

Pemrosesan tugas-tugas komputasi berat wajib didelegasikan ke antrean latar belakang (*Asynchronous Queue Jobs*) yang dikelola oleh **Laravel Horizon**:

* Pemrosesan citra pemindai makanan dan inferensi model visi AI.
* Pengiriman notifikasi push, SMS, atau email massal.
* Pembuatan berkas laporan PDF / rekapitulasi kesehatan bulanan.
* Sinkronisasi data dari penyedia eksternal (Health Connect / Apple Health).

Operasi yang membutuhkan respons balik seketika ke antarmuka pengguna tidak boleh dialihkan ke antrean jika pengguna sedang menunggu respons HTTP sinkron.

---

## 38. Keamanan Percobaan Ulang Pekerjaan Antrean (Queue Retry Safety & Idempotency)

Pekerjaan antrean (*Queue Jobs*) harus dirancang dengan asumsi bahwa pekerjaan dapat mengalami kegagalan dan dijalankan ulang (*retried*):

* Pastikan eksekusi ulang job tidak menghasilkan entri baris ganda di basis data.
* Gunakan batas percobaan maksimum yang terukur (`public int $tries = 3;`).
* Terapkan strategi jeda eksponensial (*Exponential Backoff*): `public array $backoff = [10, 30, 60];`.

---

## 39. Penanganan & Pemantauan Kegagalan Job (Job Failure Handling & Dead Letter Queue)

Ketika sebuah pekerjaan antrean mengalami kegagalan permanen melampaui batas percobaan:

* Tangkap kegagalan melalui metode `failed(Throwable $exception)`.
* Catat detail kegagalan ke tabel pekerjaan gagal (*Failed Jobs / Dead Letter Queue*).
* Perbarui status entitas terkait menjadi `failed` dan berikan notifikasi kegagalan yang santun kepada pengguna.
* Dilarang memalsukan status berhasil (*fake success*) untuk menutupi kegagalan integrasi.

---

## 40. Penjadwalan Tugas Pemeliharaan Otomatis (Scheduled Tasks & Crons)

Tugas-tugas pemeliharaan berkala diotomatisasi melalui penjadwal bawaan **Laravel Scheduler (`app/Console/Kernel.php` / `routes/console.php`)**:

* Evaluasi kedaluwarsa tantangan harian (eksekusi setiap tengah malam WIB).
* Pengiriman pengingat jadwal sesi konsultasi H-1 jam.
* Pembersihan data sementara dan berkas draf yang tidak dikonfirmasi (> 24 jam).
* Setiap tugas terjadwal wajib dilindungi dengan metode `withoutOverlapping()` untuk mencegah eksekusi tumpang tindih.

---

## 41. Desain Peristiwa Domain (Domain Events Architecture)

Platform memanfaatkan **Peristiwa Domain (*Domain Events*)** untuk mendekopel alur kerja bisnis utama dari efek samping sekundernya:

```text
Contoh Peristiwa Domain Baku:
- BehaviorSignalDetected
- HealthInsightGenerated
- InterventionPlanStarted
- ChallengeCompleted
- ConsultationBooked
- ConsultationCompleted
```

Peristiwa domain hanya dipicu untuk kejadian bisnis yang bermakna, bukan pada setiap perubahan atribut sepele model Eloquent.

---

## 42. Pendengar Peristiwa & Dekopling Logika (Event Listeners & Decoupling)

Pendengar peristiwa (*Event Listeners*) bertanggung jawab menangani efek samping sekunder secara independen:

```text
Event: ConsultationBooked
   ├── Listener 1: SendBookingConfirmationNotification (Queued)
   ├── Listener 2: SyncToInstructorCalendar (Queued)
   └── Listener 3: RecordSecurityAuditTrail (Queued)
```

Jika salah satu pendengar mengalami kegagalan (misalnya penyedia kalender eksternal sedang *down*), status reservasi utama tidak ikut dibatalkan.

---

## 43. Manajemen Pengiriman Notifikasi (Notification Dispatching Architecture)

Pengiriman notifikasi ke pengguna dikelola secara terpusat melalui kelas **Laravel Notifications**:

* Mendukung multi-kanal pengiriman (*database, broadcast web socket, push notification, email*).
* Memisahkan logika komposisi pesan dari pemicu domain.
* Pengiriman notifikasi wajib dieksekusi secara asinkron (`implements ShouldQueue`).

---

## 44. Perlindungan Privasi Muatan Notifikasi (Notification Payload Privacy)

Muatan pesan notifikasi (*Notification Payload*) wajib menjunjung privasi medis pengguna:

* Dilarang mencantumkan nilai numerik glukosa darah, tekanan darah kritis, atau hasil pemindaian makanan spesifik pada teks notifikasi push publik.
* Teks notifikasi push hanya memuat informasi umum yang tenang:
  * ❌ *"Gula darah Anda 195 mg/dL. Bahaya diabetes!"*
  * ✅ *"AEVYRA: Catatan wawasan kebiasaan baru tersedia untuk ditinjau."*

---

## 45. Penanganan Eksepsi Terpusat (Centralized Exception Handling)

Seluruh eksepsi dan kegagalan sistem ditangani secara terpusat melalui penangan eksepsi terintegrasi (*Centralized Exception Handler* di `bootstrap/app.php`):

```php
// Format Standar Respons Galat JSON
return response()->json([
    'success'    => false,
    'error'      => [
        'code'    => 'SLOT_UNAVAILABLE',
        'message' => 'Slot jadwal konsultasi yang dipilih tidak lagi tersedia.',
    ],
    'meta'       => [
        'timestamp' => now()->toIso8601String(),
    ],
], 422);
```

Dilarang menampilkan pesan *stack trace* mentah PHP, nomor baris kode, atau kueri SQL kepada pengguna publik.

---

## 46. Pencatatan Log Eksepsi & Galat Sistem (Exception Logging & Audit Trails)

Pencatatan log eksepsi wajib mematuhi protokol pembersihan data pribadi (*PII Sanitization*):

* Stack trace dan konteks log wajib dibersihkan dari kata sandi, token otorisasi, nomor kartu, atau catatan alergi sensitif.
* Log kesalahan disimpan ke saluran terpusat (*Centralized Logging / Sentry / Monolog*) dengan penanda ID korelasi permintaan (*Correlation ID*).

---

## 47. Standardisasi Transformasi API Resources (API Resource Transformers)

Seluruh respons titik akhir API wajib ditransformasi menggunakan kelas **Laravel API Resources**:

```php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HealthInsightResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'title'               => $this->title,
            'summary'             => $this->summary,
            'action_type'         => $this->action_type,
            'recommended_action'  => $this->recommended_action,
            'evidence_text'       => $this->evidence_text,
            'safety_boundary_note'=> $this->safety_boundary_note,
            'status'              => $this->status,
            'created_at'          => $this->created_at->toIso8601String(),
        ];
    }
}
```

Dilarang keras mengembalikan objek model Eloquent mentah (`return $model;`) langsung ke klien.

---

## 48. Objek Transfer Data Terstruktur (Data Transfer Objects - DTOs)

Data yang mengalir antar-lapisan domain dipadatkan menggunakan **Objek Transfer Data (*Data Transfer Objects - DTOs*)** bertipe ketat:

```php
namespace App\DTOs\Biometrics;

use App\Enums\MetricTypeEnum;
use Carbon\Carbon;

readonly class StoreMetricDTO
{
    public function __construct(
        public int $userId,
        public MetricTypeEnum $metricType,
        public float $value,
        public string $unit,
        public Carbon $recordedAt,
        public string $source = 'manual'
    ) {}
}
```

DTO memberikan jaminan integritas tipe data, mencegah manipulasi atribut liar, dan mempermudah pengujian unit logika domain.

---

## 49. Penegakan Tipe Backed Enums (PHP 8.3 Backed Enums)

Seluruh status siklus hidup dan kategori domain wajib dimodelkan menggunakan fitur bawaan **PHP 8.3 Backed Enums**:

```php
namespace App\Enums;

enum ConsultationStatusEnum: string
{
    case PENDING   = 'pending_payment';
    case CONFIRMED = 'confirmed';
    case ONGOING   = 'in_progress';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
    case NO_SHOW   = 'no_show';
}
```

Dilarang menggunakan string bebas (*magic strings*) yang tersebar di berbagai kontroler atau model.

---

## 50. Mesin Status Transisi Entitas Domain (State Machine Entity Transitions)

Transisi status siklus hidup entitas domain dikendalikan melalui mesin status (*State Machine*) yang menolak transisi ilegal:

```text
Status Siklus Hidup Konsultasi:
[PENDING] ──► [CONFIRMED] ──► [IN_PROGRESS] ──► [COMPLETED]
     │              │
     ▼              ▼
[CANCELLED]    [CANCELLED / NO_SHOW]
```

Transisi terlarang (misalnya dari status `completed` kembali menjadi `pending`) wajib melemparkan eksepsi `InvalidStateTransitionException`.

---

## 51. Penegakan Invarian Bisnis Domain (Business Invariants Enforcement)

Kaidah invarian bisnis domain kritis (*Critical Business Invariants*) wajib ditegakkan secara eksplisit di lapisan logika backend:

* Slot jadwal konsultasi instruktur dilarang dapat dipesan ganda (*Double Booking Forbidden*).
* Anggota dilarang memodifikasi catatan metrik atau log makanan milik anggota lain.
* Instruktur dilarang membaca data anggota yang tidak ditugaskan secara resmi kepadanya.
* Sesi konsultasi yang telah selesai atau dibatalkan dilarang dapat dipesan kembali.
* Sebuah tantangan kebiasaan dilarang dapat diklaim hadiahnya lebih dari satu kali untuk siklus yang sama.

Penegakan aturan invarian ini berada di sisi server dan tidak boleh bergantung pada validasi antarmuka klien.

---

## 52. Kaidah Otorisasi Kepemilikan Data (Data Ownership Authorization Rules)

Ketika pengguna membuat atau mengakses sumber daya data miliknya sendiri, backend wajib menetapkan kepemilikan data langsung dari sesi otentikasi server:

```php
// ✅ PENDEKATAN AMAN: Mengambil ID dari token otentikasi aktif
$metric = HealthMetric::create([
    'user_id'     => $request->user()->id,
    'metric_type' => $dto->metricType->value,
    'value'       => $dto->value,
    'unit'        => $dto->unit,
    'recorded_at' => $dto->recordedAt,
]);

// ❌ ANTI-PATTERN BERBAHAYA (Rawan Injeksi IDOR - Insecure Direct Object Reference):
$metric = HealthMetric::create([
    'user_id'     => $request->input('user_id'), // Jangan pernah percaya input ID dari klien!
    // ...
]);
```

Jika alur kerja admin atau instruktur membutuhkan manipulasi data atas nama pengguna lain, hak akses tersebut wajib diotorisasi secara eksplisit melalui kebijakan otorisasi (*Policy*).

---

## 53. Otorisasi Tingkat Layanan & Aksi (Service-Level Authorization)

Kelas aksi dan layanan bisnis domain (*Action & Service Classes*) dilarang berasumsi bahwa pemanggil telah melakukan otorisasi sebelumnya jika aksi tersebut dapat dipanggil dari berbagai saluran masuk (seperti perintah CLI, *Queue Job*, atau API):

* Otorisasi ditegakkan pada gerbang batas eksekusi aksi.
* Menggunakan metode `Gate::authorize('action-name', $model)` di awal eksekusi aksi domain.
* Mencegah pemanggilan tidak sengaja oleh skrip internal yang tidak memiliki izin memadai.

---

## 54. Agregasi & Ekstraksi Laporan Kebugaran (Health Reporting Engine)

Modul pelaporan kesehatan (*Health Reporting Engine*) wajib menggunakan kueri yang dirancang khusus dan efisien:

* Dilarang melakukan ekspor seluruh tabel basis data secara mentah hanya karena mudah ditulis kuerinya.
* Laporan hanya memuat kolom yang relevan dengan tujuan analisis, menerapkan agregasi terukur, dan memfilter rekaman berdasarkan hak akses aktif.
* Laporan yang memuat data biometrik sensitif wajib dilindungi dengan izin otorisasi khusus dan dicatat dalam log audit forensik.

---

## 55. Pemrosesan Data Analitik Agregat (Aggregate Analytics Processing)

Untuk dasbor manajemen administrator, metrik kompetisi, dan analitik performa produk, backend wajib menyajikan data agregat teranonimkan:

```sql
-- Kueri Analitik Agregat Bebas Data Pengidentifikasi Pribadi (PII)
SELECT 
    DATE_TRUNC('week', recorded_at) AS report_week,
    metric_type,
    COUNT(DISTINCT user_id) AS active_members_logging,
    ROUND(AVG(value), 2) AS population_average
FROM health_metrics
WHERE recorded_at >= NOW() - INTERVAL '90 days'
GROUP BY DATE_TRUNC('week', recorded_at), metric_type;
```

Dilarang mengekspor nama individu, email, atau rekam medis spesifik ke dalam antarmuka pelaporan analitik publik.

---

## 56. Arsitektur Kueri Pencarian Data (Search Architecture & Scopes)

Titik akhir pencarian data (*Search Endpoints*) wajib membatasi cakupan kueri berdasarkan otorisasi peran:

* Anggota (*Member*) hanya diizinkan mencari data dalam riwayat pribadi miliknya.
* Instruktur (*Coach*) hanya dapat mencari profil anggota yang secara resmi terhubung dalam penugasan bimbingan aktif.
* Dilarang mengimplementasikan kueri pencarian global (*unrestricted global search*) yang melintasi batas partisi kepemilikan antar-pengguna.

---

## 57. Standardisasi Paginasi Berbasis Kursor (Cursor-Based Pagination)

Seluruh koleksi data yang berpotensi tumbuh besar (seperti linimasa metrik, pesan obrolan, log audit, dan notifikasi) wajib disajikan menggunakan **Paginasi Berbasis Kursor (*Keyset / Cursor-Based Pagination*)**:

```php
// Paginasi Kursor Efisien Tanpa Penurunan Performa OFFSET
$metrics = HealthMetric::where('user_id', $user->id)
    ->orderByDesc('recorded_at')
    ->cursorPaginate(25);
```

Paginasi kursor menghindari pemindaian lambat klausa `OFFSET` pada tabel bervolume jutaan baris dan mencegah duplikasi data saat terjadi penyisipan baris baru secara bersamaan.

---

## 58. Penyaringan & Pengurutan Data Dinamis (Dynamic Filtering and Sorting)

Parameter penyaringan (*filtering*) dan pengurutan (*sorting*) dari permintaan HTTP wajib divalidasi dan dicocokkan dengan daftar izin (*allowlist*):

```php
$allowedSorts = ['recorded_at', 'created_at', 'value'];
$sortColumn = in_array($request->query('sort'), $allowedSorts, true) 
    ? $request->query('sort') 
    : 'recorded_at';

$sortDirection = $request->query('direction') === 'asc' ? 'asc' : 'desc';

$query->orderBy($sortColumn, $sortDirection);
```

Dilarang keras menyisipkan string parameter pengurutan mentah dari klien langsung ke dalam kueri basis data (`->orderBy($request->get('sort'))`).

---

## 59. Manajemen Penyimpanan Berkas & Media (File & Media Storage Management)

Berkas unggahan yang memuat data pribadi dan citra santapan pengguna wajib disimpan pada cakram penyimpanan privat (*Private Storage Disk*):

* Berkas dilarang disimpan di direktori publik (`public_path()`) yang dapat diakses langsung oleh siapa pun tanpa otentikasi.
* Akses unduh berkas wajib melalui kontroler terotentikasi yang memverifikasi kepemilikan atau melalui URL bertanda tangan kriptografi sementara (*Temporary Signed URLs* dengan masa berlaku < 15 menit).

---

## 60. Pemrosesan & Optimasi Berkas Asinkron (Asynchronous File Processing)

Pemrosesan berkas citra dan dokumen wajib menerapkan protokol pengamanan ketat:

* Validasi tipe MIME aktual berkas (*real file inspection* via `finfo`), bukan hanya ekstensi nama berkas.
* Batasi ukuran unggahan maksimum (maks 5MB untuk foto santapan, maks 2MB untuk avatar).
* Hapus nama berkas asli dari pengguna dan ganti dengan penamaan acak kriptografi (`UUIDv7.jpg`).
* Hapus metadata EXIF citra (seperti koordinat GPS lokasi rumah pengguna) sebelum disimpan secara permanen.
* Bersihkan berkas sementara (*temporary scratch files*) setelah pemrosesan selesai.

---

## 61. Tata Kelola Strategi Cache (Cache Management & Strategy)

Strategi penyimpanan memori cepat (*Caching*) hanya diterapkan pada data yang aman untuk digunakan kembali:

* **Kandidat Ideal Cache:** Konten master tantangan publik, daftar lencana gamifikasi, konfigurasi sistem, dan artikel edukasi kesehatan statis.
* **Wajib Ekstra Berhati-hati:** Data metrik biometrik pribadi, profil kesehatan, dan riwayat pesan sesi konsultasi tidak boleh dicache pada *global cache* tanpa isolasi kunci spesifik pengguna (`cache:user:{id}:summary`).
* Dilarang mencache data yang memuat token otorisasi atau kredensial medis sensitif.

---

## 62. Invalidasi Cache Deterministik (Deterministic Cache Invalidation)

Setiap data bisnis yang disimpan ke dalam cache memori wajib memiliki strategi invalidasi yang jelas (*Deterministic Cache Invalidation*):

* Gunakan peristiwa model (*Eloquent Model Events / Observers*) untuk menghapus kunci cache seketika saat data mengalami mutasi (`saved`, `deleted`).
* Tetapkan masa berlaku kedaluwarsa (*Time-To-Live - TTL*) pada setiap entri cache (misalnya maksimal 3.600 detik).
* Dilarang memperkenalkan lapisan cache tanpa memahami dampak tampilan data usang (*stale-data behavior*) terhadap pengguna.

---

## 63. Dukungan Backend untuk Progressive Web App (Backend Support for PWA)

Lapisan backend dirancang untuk mendukung karakteristik klien **Progressive Web App (PWA)** yang dapat beroperasi dalam kondisi konektivitas fluktuatif:

* Mengantisipasi pengiriman ulang data secara massal saat perangkat kembali terhubung daring (*Offline-Sync Reconnection*).
* Memeriksa stempel waktu rekaman (`recorded_at`) untuk merekonstruksi linimasa secara kronologis benar, bukan menggunakan waktu tiba di server.
* Menolak pembaruan data yang bertentangan dengan versi basis data terbaru menggunakan mekanisme konkurensi optimis.

---

## 64. Penegakan Batas Keamanan Perimeter (Security Perimeter Boundaries)

Backend memegang batas pertahanan perimeter keamanan (*Security Perimeter Boundary*) yang tidak dapat digantikan oleh antarmuka frontend:

```text
Permintaan Klien Masuk (HTTP Request)
                ↓
  [1] Otentikasi Token Kriptografi (Sanctum / Session Auth)
                ↓
  [2] Validasi Struktur & Tipe Data (Form Request)
                ↓
  [3] Pengecekan Kebijakan Otorisasi Baris (Policy / Gates)
                ↓
  [4] Penegakan Invarian & Keselamatan Domain (Action Classes)
                ↓
  [5] Transaksi Mutasi Data Basis Data Terverifikasi (Database ACID)
```

Frontend hanyalah agen presentasi pengguna; seluruh validasi wajib diverifikasi ulang secara independen di sisi backend.

---

## 65. Penegakan Batas Keselamatan Klinis (Clinical Safety Boundaries)

Logika bisnis backend bertanggung jawab penuh menegakkan batas-batas keselamatan klinis dan bioetika sistem:

* Backend dilarang menyimpan atau memancarkan vonis diagnosis medis patologis.
* Backend dilarang mengeksekusi saran perubahan dosis obat keras (*Daftar G*).
* Jika model AI menghasilkan usulan tindakan mikro yang melanggar batas keselamatan, lapisan validator backend wajib menolak usulan tersebut (*Drop Output*) dan menggantinya dengan respons aman terverifikasi.

---

## 66. Validasi Rekomendasi Sebelum Dikirim ke Pengguna (Recommendation Safety Validation)

Setiap rekomendasi tindakan mikro yang dihasilkan oleh kecerdasan buatan wajib divalidasi terhadap daftar tipe aksi yang diizinkan (*Allowed Action Types Allowlist*):

```php
$allowedActionTypes = [
    'hydration_challenge',
    'sleep_hygiene_routine',
    'light_walking_goal',
    'educational_article_read',
    'instructor_consultation_prompt',
];

if (!in_array($aiProposedAction->type, $allowedActionTypes, true)) {
    // Tolak tipe aksi yang tidak dikenal atau berisiko klinis
    return $this->getSafeDefaultRecommendation();
}
```

Backend menolak tindakan mikro spekulatif seperti puasa ekstrem atau olahraga intensitas tinggi tanpa data kelaikan fisik.

---

## 67. Validasi Data dari Penyedia Eksternal (External Provider Data Validation)

Data respons dari penyedia eksternal (seperti Google Cloud Vision, Health Connect, atau Payment Gateway) selalu diperlakukan sebagai data yang belum divalidasi:

* Status HTTP `200 OK` dari pihak ketiga **BUKAN BERARTI** data tersebut dapat langsung disimpan tanpa pemeriksaan.
* Wajib memeriksa kelengkapan struktur skema respons, batas nilai numerik, dan status verifikasi pihak ketiga.
* Mengisolasi data asing ke dalam DTO adaptor sebelum diserahkan ke logika aplikasi internal.

---

## 68. Konfigurasi Batas Waktu Panggilan Jaringan (Network Timeout Configurations)

Seluruh integrasi panggilan HTTP ke layanan pihak ketiga wajib menetapkan konfigurasi batas waktu (*Timeout Configurations*) yang ketat:

```php
$response = Http::timeout(5)          // Batas waktu tunggu respons maksimal 5 detik
    ->connectTimeout(2)               // Batas waktu jabat tangan koneksi maksimal 2 detik
    ->withToken(config('services.ai.key'))
    ->post($endpoint, $payload);
```

Dilarang membiarkan panggilan jaringan eksternal menggantung tanpa batas waktu (*infinite hang*) yang dapat menghabiskan proses pekerja PHP-FPM.

---

## 69. Strategi Percobaan Ulang Jaringan (Network Retry Strategies)

Strategi percobaan ulang panggilan jaringan (*Network Retry Strategy*) hanya diterapkan pada kegagalan yang bersifat sementara (*Transient Failures*):

* **Layak Dicoba Ulang:** Gangguan koneksi sementara (*Connection Timeout*), galat server penyedia (*HTTP 502/503/504*), atau pembatasan laju (*HTTP 429*).
* **Dilarang Dicoba Ulang:** Galat otentikasi (*HTTP 401/403*), rute tidak ditemukan (*HTTP 404*), atau kesalahan validasi muatan (*HTTP 422*).
* Gunakan jeda acak (*Jitter Backoff*) untuk mencegah badai percobaan ulang (*Retry Storm*).

---

## 70. Pengendalian Laju Panggilan Eksternal (External Rate Limiting)

Backend menerapkan pembatasan laju internal (*Internal Rate Limiting*) pada titik akhir yang mengonsumsi layanan eksternal berbayar:

```php
// Batasi pemanggilan fitur pemindai kamera maksimal 10 kali per jam per pengguna
RateLimiter::for('scanner-uploads', function (Request $request) {
    return Limit::perHour(10)->by($request->user()->id);
});
```

Pembatasan ini melindungi sistem dari kehabisan kuota API pihak ketiga dan lonjakan tagihan tak terduga (*Cost Spike Protection*).

---

## 71. Proteksi Biaya Konsumsi API Pihak Ketiga (Cost Protection & Circuit Breakers)

Untuk melindungi stabilitas finansial dan operasional platform dari eksploitasi fitur AI generatif:

* Setiap pengguna diberikan kuota penggunaan harian berdasarkan paket keanggotaannya.
* Permintaan tanpa otentikasi (*Anonymous Requests*) dilarang memicu panggilan model AI berbayar.
* Menerapkan pemantau anggaran konsumsi token API (*Token Budget Monitor*) yang memicu peringatan jika penggunaan harian melampaui batas wajar.

---

## 72. Pembatasan Ukuran Muatan Permintaan HTTP (Request Payload Size Limits)

Backend membatasi ukuran muatan permintaan HTTP (*Request Payload Size Limits*) pada lapisan middleware terluar:

* Muatan JSON dibatasi maksimal 256 KB.
* Berkas citra pemindai dibatasi maksimal 5 MB.
* Teks pesan obrolan konsultasi dibatasi maksimal 2.000 karakter per pesan.
* Permintaan dengan ukuran melampaui batas ditolak seketika dengan status HTTP `413 Payload Too Large`.

---

## 73. Urutan Penataan Transaksi & Pelepasan Event (Transaction & Event Ordering)

Peristiwa domain dan notifikasi pengguna wajib dilepaskan **HANYA SETELAH** transaksi basis data berhasil dikomit secara permanen (*Transaction and Event Ordering*):

```php
// Menjamin Peristiwa Dilepas Pasca-Komit Transaksi
DB::transaction(function () use ($dto) {
    $consultation = Consultation::create([...]);
    
    // Gunakan afterCommit() agar notifikasi tidak dikirim jika transaksi rollback!
    DB::afterCommit(function () use ($consultation) {
        ConsultationBookedEvent::dispatch($consultation);
    });
});
```

Pola ini mencegah timbulnya galat memalukan di mana anggota menerima notifikasi "Pemesanan Berhasil", namun saat membuka aplikasi data reservasi tidak ditemukan karena transaksi basis data mengalami *rollback*.

---

## 74. Observabilitas & Telemetri Sistem Backend (Observability & System Telemetry)

Backend menyediakan sinyal observabilitas dan telemetri teknis (*System Observability*) untuk memantau kesehatan operasional:

* Laju latensi respons titik akhir API (*Endpoint Latency P95/P99*).
* Frekuensi dan jenis eksepsi sistem yang tertangkap.
* Jumlah pekerjaan antrean yang tertunda atau gagal (*Queue Lag & Failed Jobs*).
* Waktu eksekusi kueri basis data lambat (*Slow Query Threshold > 200ms*).

Data telemetri teknis dilarang memuat isi rekam medis atau informasi pribadi pengguna.

---

## 75. Pelacakan Jejak Permintaan Terdistribusi (Distributed Request Correlation IDs)

Setiap permintaan HTTP yang masuk ke sistem backend diberi tanda pengenal jejak terdistribusi (**ID Korelasi / Correlation ID**):

* Diterima dari header klien `X-Correlation-ID` atau digenerasikan secara otomatis oleh middleware backend (`UUIDv7`).
* Disematkan pada setiap baris log sistem, muatan pekerjaan antrean, dan header respons balik ke klien.
* ID korelasi mempermudah pelacakan rantai eksekusi saat terjadi galat lintas-layanan tanpa melanggar batas privasi pengguna.

---

## 76. Standarisasi Tingkat Keparahan Log (Logging Severity Levels)

Pencatatan log sistem wajib menggunakan tingkatan keparahan (*Logging Levels*) standar RFC 5424 / Monolog secara proporsional:

| Tingkat Log | Kriteria Peristiwa Sistem | Contoh Kejadian |
| :--- | :--- | :--- |
| **`DEBUG`** | Informasi teknis terperinci untuk penelusuran di lingkungan lokal. | Muatan token kueri, waktu kalkulasi loop internal. |
| **`INFO`** | Kejadian bisnis normal yang penting untuk audit sistem. | Pengguna berhasil masuk akun, reservasi konsultasi terbit. |
| **`WARNING`** | Kondisi anomali yang berhasil dimitigasi namun perlu perhatian. | Percobaan ulang panggilan AI API, token kedaluwarsa. |
| **`ERROR`** | Kegagalan operasional pada alur permintaan tertentu. | Pembayaran gagal diproses, pemindai gagal membaca citra. |
| **`CRITICAL`** | Kegagalan infrastruktur masif yang membutuhkan tindakan segera. | Basis data tidak merespons, kehabisan memori server Redis. |

> [!CAUTION]
> Dilarang mencatat data biometrik atau kredensial rahasia pengguna meskipun pada tingkatan log `DEBUG`. Log debug dapat bocor jika konfigurasi lingkungan produksi berubah secara tidak sengaja.

---

## 77. Larangan Menelan Galat secara Hening (Prohibition of Silent Failures)

Sistem melarang keras praktik menelan eksepsi secara hening (*Silent Failure Anti-Pattern*):

```php
// ❌ POLA BERBAHAYA (Menyembunyikan Galat Fatal Tanpa Jejak):
try {
    $this->syncExternalHealthData($user);
} catch (\Throwable $e) {
    return null; // Galat hilang, data rusak tidak terdeteksi!
}

// ✅ POLA TEPAT (Terdokumentasi, Teramati, & Tangguh):
try {
    $this->syncExternalHealthData($user);
} catch (ExternalProviderException $e) {
    Log::warning("Sinkronisasi data eksternal gagal untuk user: {$user->id}", [
        'exception'      => $e->getMessage(),
        'correlation_id' => request()->header('X-Correlation-ID'),
    ]);
    return SyncResultDTO::failed("Layanan sinkronisasi sedang sibuk. Silakan coba lagi nanti.");
}
```

Setiap kegagalan yang tidak terduga wajib dapat diamati (*observable*) melalui sistem pemantauan telemetri.

---

## 78. Penurunan Layanan yang Anggun (Graceful Degradation Patterns)

Ketika layanan eksternal sekunder mengalami gangguan (seperti pemadaman API AI generatif atau model visi), sistem wajib mempertahankan fungsi operasional inti platform (**Penurunan Layanan yang Anggun / Graceful Degradation**):

```text
+-------------------------------------------------------------------------+
|                  MATRIKS KETAHANAN DEGRADASI LAYANAN                    |
+-------------------------------------------------------------------------+
|  Layanan AI Padam (Down)       ──► Linimasa Metrik Manual Tetap Berjalan |
|  Layanan Pemindai Citra Gagal  ──► Penginputan Formulir Gizi Tetap Aktif |
|  Sinkronisasi Sensor Terputus  ──► Catatan Kebiasaan Offline Tersimpan   |
|  Gateway Notifikasi Push Sibuk ──► Notifikasi In-App Database Berfungsi  |
+-------------------------------------------------------------------------+
```

Platform AEVYRA tidak boleh lumpuh total hanya karena satu penyedia layanan kecerdasan buatan pihak ketiga mengalami gangguan jaringan.

---

## 79. Sasaran Kinerja & Skalabilitas Backend (Backend Performance Targets)

Optimasi performa backend wajib mematuhi hierarki prioritas rekayasa perangkat lunak:

1. **Kebenaran Logika Bisnis (*Correctness*):** Sistem beroperasi sesuai aturan domain tanpa celah logika.
2. **Kepatuhan Otorisasi (*Authorization*):** Data terlindungi dari akses ilegal dan pelanggaran privasi.
3. **Keselamatan Pasien & Bioetika (*Clinical Safety*):** Tidak menghasilkan rekomendasi yang membahayakan fisik.
4. **Integritas Persistensi (*Data Integrity*):** Transaksi atomik dan bebas dari kerusakan data.
5. **Kecepatan & Kinerja Komputasi (*Performance*):** Optimasi kueri basis data, indeks, dan pemanfaatan cache.

Kinerja yang cepat tidak ada artinya jika sistem salah menghitung dosis kalori atau membocorkan data medis pengguna.

---

## 80. Penolakan Dekomposisi Layanan Prematur (Avoid Premature Microservices)

Arsitektur sistem menolak dekomposisi layanan mikro prematur (*Premature Microservices*):

* AEVYRA mempertahankan pola **Monolit Modular** terpadu selama batas operasional masih dapat ditangani secara efisien dalam satu basis kode Laravel.
* Pemisahan layanan fisik independen hanya dipertimbangkan di masa depan untuk modul dengan beban komputasi khusus (seperti klaster inferensi model visi komputer lokal), bukan memecah domain bisnis relasional menjadi puluhan layanan mikro rapuh.

---

## 81. Struktur Organisasi Berkas Modular (Modular Directory Organization)

Struktur organisasi direktori backend distandarisasi secara modular dan rapi:

```text
app/
├── Actions/          # Kelas aksi bisnis berfokus tunggal (Single Responsibility)
│   ├── Behavioral/   # Kalkulasi garis acuan, sinyal deviasi, wawasan kebiasaan
│   ├── Coaching/     # Reservasi konsultasi, obrolan instruktur
│   └── Nutrition/    # Pemrosesan log makanan, pemindaian nutrisi
├── Contracts/        # Antarmuka penyedia layanan (AI, Scanner, Storage)
├── DTOs/             # Objek transfer data bertipe ketat
├── Enums/            # PHP 8.3 Backed Enums untuk status domain
├── Events/           # Kelas peristiwa domain bisnis
├── Exceptions/       # Kelas eksepsi domain kustom
├── Http/
│   ├── Controllers/  # Kontroler API ramping (Thin Controllers)
│   ├── Requests/     # Form Requests untuk validasi masukan
│   └── Resources/    # API Resources untuk transformasi kontrak JSON
├── Integrations/     # Adaptor pihak ketiga (Gemini, HealthConnect, Midtrans)
├── Jobs/             # Pekerjaan antrean asinkron (Queue Horizon)
├── Listeners/        # Pendengar peristiwa domain
├── Models/           # Entitas relasional Eloquent
├── Notifications/    # Kelas notifikasi multi-kanal
└── Policies/         # Kebijakan otorisasi tingkat baris
```

---

## 82. Konvensi Penamaan Simbol Kode Backend (Backend Naming Conventions)

Penamaan berkas, kelas, dan metode wajib mencerminkan perilaku domain secara deskriptif (*Domain-Driven Ubiquitous Language*):

* ✅ **Nama Baik & Deskriptif:**
  * `CalculatePersonalBaselineAction`
  * `DetectBehavioralDeviationAction`
  * `BookConsultationSlotAction`
  * `ProcessFoodScanResultAction`
  * `EvaluateChallengeCompletionAction`
* ❌ **Nama Buruk & Terlalu Generik:**
  * `DataProcessor`
  * `GeneralManager`
  * `CommonHelper`
  * `SystemHandler2`
  * `ProcessService`

---

## 83. Keterbacaan & Kesederhanaan Kode (Code Readability & Simplicity)

Penulisan kode backend wajib mengutamakan keterbacaan, kesederhanaan, dan kemudahan pemeliharaan:

* Menerapkan pengembalian awal (*Early Return Pattern*) untuk mengurangi percabangan bersarang (*Nested Conditionals*).
* Batasi panjang metode maksimal 30-40 baris kode per fungsi.
* Gunakan deklarasi tipe data eksplisit pada parameter dan nilai balik fungsi (`declare(strict_types=1);`).
* Hindari efek samping tersembunyi (*Hidden Side Effects*) dalam fungsi pembantu.

---

## 84. Standar Dokumentasi & Komentar Kode (Code Documentation & Docblocks)

Komentar kode (*Docblocks & Comments*) ditulis untuk menjelaskan **ALASAN (*WHY*)**, bukan mengulang apa yang sudah jelas tertulis pada kode (*WHAT*):

```php
// ✅ KOMENTAR TEPAT: Menjelaskan alasan teknis/klinis di balik suatu logika
// Menggunakan garis acuan personal 30 hari alih-alih ambang batas medis universal
// karena sinyal ini merefleksikan pergeseran kebiasaan relatif pengguna, bukan diagnosis klinis.
if ($recentAverage < ($personalBaseline * 0.80)) {
    $this->emitBehaviorSignal(...);
}

// ❌ KOMENTAR BURUK: Hanya mengulang kode secara redundan
// Tambah skor satu
$score++;
```

---

## 85. Injeksi Ketergantungan Melalui Kontainer Layanan (Dependency Injection Patterns)

Penyedia layanan eksternal dan dependensi domain wajib diinjeksikan melalui wadah layanan Laravel (**Dependency Injection via Service Container**):

```php
namespace App\Actions\Nutrition;

use App\Contracts\ScannerProviderInterface;

class ProcessFoodScanAction
{
    public function __construct(
        private readonly ScannerProviderInterface $scannerProvider
    ) {}

    public function execute(ScanDraft $draft): ScanResultDTO
    {
        return $this->scannerProvider->analyzeFoodImage($draft->image_path);
    }
}
```

Dilarang menginisialisasi kelas penyedia pihak ketiga secara langsung (`new GeminiAPIClient()`) di dalam badan logika bisnis.

---

## 86. Pembatasan Penggunaan Fungsi Pembantu Statis (Static Helper Constraints)

Hindari pembuatan fungsi pembantu statis (*Static Helper Methods*) untuk logika bisnis yang memiliki ketergantungan atau status (*stateful business logic*):

* Fungsi pembantu statis sulit diisolasi dalam pengujian unit (*hard to mock*).
* Bungkus logika bisnis ke dalam kelas layanan (*Service / Action*) yang dapat diinjeksikan melalui kontainer layanan.
* Fungsi pembantu statis hanya diperbolehkan untuk utilitas murni bebas efek samping (seperti manipulasi format teks string sederhana).

---

## 87. Piramida & Strategi Pengujian Backend (Backend Testing Strategy)

Strategi pengujian otomatis (*Automated Testing Strategy*) backend AEVYRA wajib mematuhi piramida pengujian terstruktur:

```text
+-------------------------------------------------------------------------+
|                  PIRAMIDA PENGUJIAN OTOMATIS BACKEND                    |
+-------------------------------------------------------------------------+
|               ▲                                                         |
|              /        [E2E / Integration Tests] (10% Cakupan)          |
|             /         Alur Pemindai Kamera, Panggilan Mock AI, Antrean |
|            /                                                           |
|           /           [Feature Tests - API Endpoints] (30% Cakupan)    |
|          /            Otorisasi Kebijakan, Validasi Masukan, Respons   |
|         /                                                              |
|        /              [Unit Tests - Domain Logic] (60% Cakupan)        |
|       /───────────────\Kalkulasi Garis Acuan, Sinyal, Skor, Enums      |
+-------------------------------------------------------------------------+
```

Seluruh pengujian dieksekusi secara otomatis pada setiap *commit* melalui pipeline CI/CD GitHub Actions.

---

## 88. Pengujian Unit Logika Bisnis Terisolasi (Unit Testing Standards)

Pengujian unit (*Unit Tests*) difokuskan untuk menguji logika bisnis murni secara kilat dan deterministik:

* Pengujian algoritma rata-rata bergerak garis acuan personal.
* Pengujian deteksi ambang deviasi sinyal perilaku (peningkatan, penurunan, fluktuasi).
* Pengujian formula perhitungan Skor Perilaku Kesehatan.
* Pengujian validitas aturan mesin status siklus hidup reservasi.
* Pengujian rumus konversi satuan metrik internasional.

---

## 89. Pengujian Fitur & Kontrak Titik Akhir API (Feature Testing Standards)

Pengujian fitur (*Feature Tests*) memverifikasi keabsahan kontrak HTTP dan gerbang keamanan titik akhir API:

* Menguji respons status HTTP (200, 201, 401, 403, 422).
* Menguji penolakan otorisasi: *Anggota A tidak boleh membaca atau memodifikasi profil kesehatan milik Anggota B*.
* Menguji penegakan aturan validasi Form Request pada masukan yang rusak atau ekstrem.
* Menguji mutasi status pada tabel basis data pasca-eksekusi titik akhir.

---

## 90. Pengujian Integrasi Komponen Eksternal (Integration Testing Standards)

Pengujian integrasi (*Integration Tests*) memverifikasi keandalan orkestrasi komponen eksternal:

* Menguji perilaku adaptor AI saat penyedia pihak ketiga mengembalikan galat *HTTP 500* atau *Timeout*.
* Menguji pemrosesan pekerjaan antrean (*Queued Jobs*) dan pemindahan pekerjaan gagal ke antrean surat mati (*Dead Letter Queue*).
* Menguji pelepasan peristiwa domain dan pemicuan notifikasi pasca-komit transaksi basis data.
* Memanfaatkan teknik peniruan (*Mocking / Fakes*) untuk API pihak ketiga.

---

## 91. Pengujian Regresi Celah Keselamatan (Safety Regression Testing)

Setiap kali ditemukan celah keamanan, kesalahan batas klinis, atau galat logika bisnis pada lingkungan produksi:

1. **Reproduksi Masalah:** Buat skenario pengujian otomatis baru yang gagal (*Failing Regression Test*) untuk mereplikasi galat tersebut.
2. **Perbaiki Kode Sumber:** Terapkan perbaikan teknis pada lapisan aksi atau layanan terkait.
3. **Verifikasi Ulang:** Pastikan skenario pengujian regresi kini berstatus hijau (*Passed*).
4. **Cegah Terulang:** Rekam skenario tersebut ke dalam rangkaian pengujian regresi permanen di repositori.

---

## 92. Definisi Kesiapan Kerja Backend (Backend Definition of Done)

Sebuah fitur backend dinyatakan selesai (*Definition of Done - DoD*) hanya jika memenuhi seluruh kriteria berikut:

* [x] Validasi masukan Form Request lengkap dengan pengetikan ketat dan batas rentang.
* [x] Otorisasi hak akses tingkat baris (*Policy / Gate*) ditegakkan di sisi server.
* [x] Logika bisnis dimodelkan dalam kelas layanan atau aksi berfokus tunggal.
* [x] Transaksi mutasi data kritis dilindungi blok transaksi ACID dan kunci konkurensi.
* [x] Penanganan eksepsi terpusat tanpa membocorkan data pribadi atau stack trace.
* [x] Batas keselamatan klinis dan prinsip non-diagnostik terverifikasi aman.
* [x] Pengujian unit dan fitur terotomasi berhasil lolos 100% (*Green Test Suite*).
* [x] Berkas dokumentasi arsitektur dan kontrak API diperbarui.

---

## 93. Daftar Periksa Uji Kelayakan Kode Backend (Backend Review Checklist)

Sebelum mengajukan permohonan peninjauan kode (*Pull Request*), perekayasa wajib memverifikasi 15 daftar periksa kelayakan:

```text
[ ] 1.  Otentikasi Token Kriptografi Terverifikasi
[ ] 2.  Kebijakan Otorisasi Baris (Policy) Ditegakkan
[ ] 3.  Validasi Form Request Meliputi Rentang & Tipe Data
[ ] 4.  Kepemilikan Data Diambil dari Auth User (Bukan Input Klien)
[ ] 5.  Logika Bisnis Berada di Action/Service (Bukan Controller)
[ ] 6.  Kueri Relasional Dilindungi Eager Loading (Bebas N+1)
[ ] 7.  Mutasi Kritis Dibungkus DB::transaction & afterCommit Event
[ ] 8.  Kontrol Konkurensi & Penguncian Pesimis Diterapkan
[ ] 9.  Panggilan API Eksternal Memiliki Timeout & Retry Jitter
[ ] 10. Penurunan Layanan Anggun (Fallback) Tersedia Saat AI Mati
[ ] 11. Log Error Dibersihkan dari PII & Kredensial Medis
[ ] 12. Satuan Metrik Eksplisit & Pembedaan NULL vs 0 Terjaga
[ ] 13. Batas Keselamatan Non-Diagnostik Klinis Terpenuhi
[ ] 14. Pengujian Pest/PHPUnit Lolos Tanpa Peringatan (Warnings: 0)
[ ] 15. Transformasi Kontrak JSON Menggunakan API Resource Resmi
```

---

## 94. Topologi Arsitektur Backend Terpadu (Unified Backend Architecture)

Topologi arsitektur backend terpadu platform AEVYRA menghubungkan seluruh aliran data secara aman, deterministik, dan teratur:

```text
+-------------------------------------------------------------------------+
|                  ALUR PERMINTAAN KLIEN STANDAR AEVYRA                  |
+-------------------------------------------------------------------------+
|  Permintaan Klien Masuk (Client HTTP Request)                           |
|                         ↓                                               |
|  Validasi Form Request (Input Sanitization & Schema Validation)         |
|                         ↓                                               |
|  Otorisasi Kebijakan Server (Policy & Role Check)                       |
|                         ↓                                               |
|  Eksekusi Aksi Bisnis Domain (Dedicated Action Class)                   |
|                         ↓                                               |
|  Persistensi Transaksi Basis Data PostgreSQL (ACID Transaction)         |
|                         ↓                                               |
|  Pelepasan Peristiwa Domain & Pekerjaan Antrean Pasca-Komit             |
|                         ↓                                               |
|  Transformasi Respons JSON melalui API Resource Transformer             |
+-------------------------------------------------------------------------+
|                  ALUR INTEGRASI KECERDASAN BUATAN AMAN                  |
+-------------------------------------------------------------------------+
|  Logika Domain Menyiapkan DTO Konteks Ringkas Terenkripsi               |
|                         ↓                                               |
|  Antarmuka Penyedia AI Eksternal (AIProviderInterface)                 |
|                         ↓                                               |
|  Validasi Ketat Skema Respons AI & Filter Keselamatan Klinis            |
|                         ↓                                               |
|  Keputusan Mutlak Berada pada Logika Aplikasi Backend Server            |
+-------------------------------------------------------------------------+
```

---

## 95. Kaidah Pamungkas Rekayasa Backend AEVYRA (Final Sovereign Backend Rule)

Lapisan backend adalah pusat kedaulatan dan benteng integritas tertinggi bagi seluruh ekosistem AEVYRA. Backend wajib selalu mempertahankan sifat:
* **Aman (*Secure*):** Kebijakan otorisasi ditegakkan tanpa kompromi pada setiap baris data.
* **Deterministik (*Deterministic*):** Perhitungan tren kebiasaan dan skor kesehatan dapat direkonstruksi secara eksak.
* **Tergantung Bukti (*Grounded in Evidence*):** Setiap wawasan kesehatan berpijak pada sinyal perilaku nyata.
* **Teruji Penuh (*Fully Testable*):** Seluruh logika domain dilindungi piramida pengujian otomatis.
* **Patuh Privasi (*Privacy-First*):** Menjaga kedaulatan data pribadi pengguna di bawah naungan regulasi hukum.

> **Kaidah Pamungkas Rekayasa Backend AEVYRA:**
> *"Klien diizinkan meminta sebuah tindakan. Model AI diizinkan menyarankan sebuah rekomendasi. Namun hanya lapisan backend yang memiliki wewenang untuk memvalidasi, mengotorisasi, dan mengeksekusi tindakan tersebut sesuai dengan kaidah keselamatan dan kedaulatan data AEVYRA."*
