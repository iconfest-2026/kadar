# PRONOIA — Health Behavior Engine

> Spesifikasi komprehensif arsitektur, algoritma, dan perilaku *Health Behavior Engine* sebagai inti sistem kecerdasan (*intelligence system*) PRONOIA. Engine ini bertanggung jawab membangun *personal baseline* adaptif, mendeteksi deviasi pola perilaku secara dini, menghasilkan sinyal preventif yang transparan dan dapat dijelaskan (*explainable*), mendukung intervensi terarah, serta mengevaluasi luaran kesehatan secara longitudinal tanpa melanggar batasan non-diagnostik medis.

---

## 1. Purpose

*Health Behavior Engine* adalah modul kecerdasan sentral dalam ekosistem **PRONOIA** yang mengolah data catatan kesehatan (*health-related logs*) mentah menjadi pemahaman mendalam atas pola dan perubahan kebiasaan pengguna.

Engine ini memegang tanggung jawab teknis penuh terhadap:
- **Normalisasi Data (*Data Normalization*):** Penyeragaman satuan, zona waktu, dan format log dari berbagai instrumen input.
- **Evaluasi Kualitas Data (*Data Quality Evaluation*):** Pengukuran reliabilitas, kelengkapan, dan kebaruan catatan sebelum diproses.
- **Pembentukan Baseline Personal (*Personal Baseline Builder*):** Kalkulasi patokan statistik kebiasaan unik per individu.
- **Analisis Tren (*Trend Analysis*):** Pelacakan arah pergerakan metrik kesehatan harian dan mingguan.
- **Deteksi Pola Perilaku (*Behavioral Pattern Detection*):** Pengenalan siklus rutinitas hidup sehat serta anomali variasi.
- **Deteksi Pergeseran Pola (*Change Detection*):** Pengidentifikasian deviasi yang melampaui rentang variabilitas wajar pengguna.
- **Kualifikasi Sinyal (*Signal Qualification*):** Penyaringan perubahan berdasarkan ambang batas, durasi, dan signifikansi bukti.
- **Prioritisasi Sinyal (*Signal Prioritization*):** Pengurutan urgensi intervensi untuk mencegah kelelahan notifikasi (*alert fatigue*).
- **Penyedia Konteks Wawasan (*Explainable Insight Input*):** Pengemasan data bukti (*evidence*) transparan bagi asisten AI dan antarmuka.
- **Konteks Rekomendasi (*Recommendation Context*):** Pemberian landasan data konkret bagi modul saran aksi mikro preventif.
- **Evaluasi Luaran Intervensi (*Progress Evaluation & Monitoring*):** Pemantauan dampak aksi pengguna terhadap pemulihan baseline.
- **Analisis Longitudinal (*Longitudinal Behavioral Analysis*):** Pemeliharaan riwayat adaptasi gaya hidup jangka panjang seumur hidup.

> [!CAUTION]
> **Batasan Medis Fundamental:** Health Behavior Engine dirancang murni untuk *Behavioral Intelligence* dan gaya hidup preventif proaktif. Engine ini **bukan sistem diagnosis medis** dan secara tegas dilarang menyimpulkan kondisi patologis atau status kegawatdaruratan klinis.

---

## 2. Core Principle

PRONOIA dibangun dengan filosofi bahwa angka metrik kesehatan tidak memiliki arti tanpa konteks personal. Sistem tidak sekadar bertanya:

> *"Berapa nilai metrik kesehatan pengguna saat ini?"*

Melainkan secara aktif menyelidiki:

> *"Bagaimana perilaku pengguna bergeser dari pola kebiasaan pribadinya, dan tindakan pencegahan terkecil apa yang paling efektif untuk memulihkannya?"*

Transformasi hierarkis data dalam engine berlangsung melalui rantai nilai tertutup:

```text
Data Mentah (Raw Health Data)
            │
            ▼
Data Ternormalisasi (Normalized Data)
            │
            ▼
Data Tervalidasi & Lolos Kualitas (Validated Data)
            │
            ▼
Baseline Personal 14 Hari (Personal Baseline)
            │
            ▼
Pola Perilaku Rutin (Behavioral Pattern)
            │
            ▼
Deteksi Perubahan Bermakna (Meaningful Change)
            │
            ▼
Kualifikasi Sinyal Perilaku (Behavioral Signal)
            │
            ▼
Wawasan Edukatif Transparan (Explainable Insight)
            │
            ▼
Aksi Nyata Pencegahan (Preventive Action)
            │
            ▼
Evaluasi Luaran Kesehatan (Health Outcome)
```

---

## 3. Product Boundary

Batasan ruang lingkup fungsional *Health Behavior Engine* ditetapkan secara ketat untuk menjamin kepatuhan etika dan keselamatan pengguna:

| Kapabilitas yang Diizinkan (*In-Scope / Boleh*) | Batasan Ketat & Larangan Medis (*Out-of-Scope / Tidak Boleh*) |
| :--- | :--- |
| Mendeteksi perubahan tren dan anomali kebiasaan harian. | Mendiagnosis penyakit akut, kronis, maupun gangguan kejiwaan. |
| Membandingkan data terkini dengan baseline statistik personal. | Menentukan status klinis medis atau prognosis kesembuhan pasien. |
| Mengidentifikasi konsistensi pencatatan dan kepatuhan rutinitas. | Menetapkan status kegawatdaruratan medis (*emergency status*). |
| Menghasilkan sinyal perilaku (*behavioral signals*) probabilistik. | Menggantikan nasihat, pemeriksaan, atau putusan dokter resmi. |
| Memprioritaskan sinyal agar pengguna terhindar dari spam notifikasi. | Memberikan resep obat (*prescription*), suplemen kimia, atau diet ekstrem. |
| Memberikan konteks data berbasis bukti pada mesin rekomendasi. | Menginstruksikan penghentian atau perubahan dosis obat pengguna. |
| Memantau pemulihan metrik setelah aksi preventif dijalankan. | Menghitung kalkulasi probabilitas penyakit tanpa kerangka klinis bersertifikasi. |

---

## 4. Why Personal Baseline Matters

Kebiasaan dan respons biologis manusia bersifat sangat heterogen. Target populasi universal (seperti *"setiap orang wajib tidur 8 jam"*) sering kali menyesatkan dan menimbulkan kecemasan yang tidak beralasan.

Dua pengguna dapat mencatat angka metrik yang identik, namun memiliki implikasi kesehatan yang bertolak belakang:

| Parameter Evaluasi | Profil Pengguna A (Kebutuhan Tidur Panjang) | Profil Pengguna B (Kebutuhan Tidur Pendek Alami) |
| :--- | :--- | :--- |
| **Baseline Personal Normal** | 7 jam 30 menit / malam | 6 jam 10 menit / malam |
| **Catatan Durasi Terkini** | 6 jam 00 menit | 6 jam 00 menit |
| **Deviasi Terhadap Baseline** | **-1 jam 30 menit** *(Defisit Signifikan)* | **-10 menit** *(Fluktuasi Wajar)* |
| **Tindakan Engine** | Picu sinyal `SLEEP_DECLINE` & sarankan relaksasi dini. | Anggap stabil, pertahankan pemantauan pasif tanpa interupsi. |

Engine wajib mengevaluasi data melalui 6 lensa personalisasi: **baseline individu**, **riwayat tren historis**, **konteks aktivitas**, **durasi anomali**, **konsistensi pencatatan**, dan **kualitas sumber data**.

---

## 5. Engine Architecture

Arsitektur logis *Health Behavior Engine* dirancang berlapis (*layered pipeline*) dengan isolasi tanggung jawab yang tegas:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     DATA INGESTION & QUALITY LAYER                     │
│  Health Logs ──▶ Normalizer ──▶ Quality Evaluator ──▶ Feature Extractor│
└──────────────────────────────────┬─────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    ANALYTICS & INTELLIGENCE LAYER                      │
│  Personal Baseline ──▶ Behavioral Analysis ──▶ Change Detector         │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SIGNAL & INTERVENTION DISPATCH LAYER                 │
│  Signal Qualification ──▶ Prioritization ──▶ Context Packaging         │
└──────────────────┬───────────────────────────────┬─────────────────────┘
                   ▼                               ▼
         Insight Generation Service       Instructor Alert Service
                   │                               │
                   └───────────────┬───────────────┘
                                   ▼
                    PREVENTIVE ACTION BY USER
                                   │
                                   ▼
                    OUTCOME EVALUATION & RE-LOOP
```

---

## 6. Engine Components

Health Behavior Engine diorganisasikan ke dalam 10 komponen modular Laravel yang mandiri dan dapat diuji:

| No | Komponen (*Service Component*) | Peran & Tanggung Jawab Utama |
| :---: | :--- | :--- |
| **01** | **Data Normalizer** | Mengonversi format satuan metrik heterogen ke representasi kanonikal baku. |
| **02** | **Data Quality Evaluator** | Menghitung skor kualitas data berdasarkan kelengkapan, konsistensi, dan kebaruan. |
| **03** | **Baseline Builder** | Mengalkulasi rerata, median, dan variansi personal dalam jendela waktu observasi. |
| **04** | **Feature Extractor** | Mengekstraksi fitur perilaku (*variability, streak, consistency index*) dari data mentah. |
| **05** | **Trend Analyzer** | Menentukan arah pergerakan metrik longitudinal (*increasing, decreasing, stable*). |
| **06** | **Pattern Detector** | Mengidentifikasi kebiasaan berulang mingguan, siklus harian, dan anomali akhir pekan. |
| **07** | **Change Detector** | Menghitung deviasi delta antara jendela observasi aktif dengan baseline pribadi. |
| **08** | **Signal Qualifier** | Memverifikasi apakah suatu deviasi memenuhi ambang batas urgensi dan durasi minimum. |
| **09** | **Signal Prioritizer** | Menyortir antrean sinyal berdasarkan relevansi sasaran pengguna dan skor dampak. |
| **10** | **Outcome Evaluator** | Menilai pemulihan metrik pasca-intervensi untuk menutup siklus perilaku preventif. |

---

## 7. Data Sources

Engine menerima aliran data dari 6 sumber berbeda, masing-masing dengan karakteristik validasi dan tingkat kepercayaan (*trust weight*):

| Kode Sumber | Deskripsi Sumber Data | Tingkat Kepercayaan (*Confidence*) | Mekanisme Validasi |
| :--- | :--- | :---: | :--- |
| `manual` | Input langsung pengguna via form Quick Log harian. | Sedang | Validasi rentang nilai wajar (*sanity bounds*). |
| `scanner` | Ekstraksi teks label gizi via kamera OCR gawai. | Tinggi (Bila dikonfirmasi) | *Human-in-the-loop confirmation step*. |
| `wearable` | Sinkronisasi otomatis dari sensor kebugaran terhubung. | Sangat Tinggi | Verifikasi stempel waktu perangkat & tanda tangan API. |
| `instructor`| Penyesuaian metrik atau target oleh instruktur resmi. | Tinggi | Otorisasi peran instruktur terdaftar. |
| `imported` | Berkas riwayat kesehatan yang diunggah pengguna (CSV/JSON).| Sedang | Audit integritas berkas dan pembersihan anomali format. |
| `system` | Nilai turunan hasil kalkulasi internal engine. | Sangat Tinggi | Komputasi deterministik berbasis aturan teruji. |

---

## 8. Data Provenance

Setiap catatan kesehatan yang masuk ke dalam sistem wajib memiliki riwayat asal-usul (*data provenance*) lengkap guna mendukung auditabilitas dan pembuktian wawasan:

```sql
-- Skema Asal-Usul Data Kesehatan (Health Data Provenance)
CREATE TABLE health_records (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    metric_type VARCHAR(64) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(32) NOT NULL,
    recorded_at DATETIME NOT NULL,
    source ENUM('manual', 'scanner', 'wearable', 'instructor', 'imported', 'system') NOT NULL,
    source_reference VARCHAR(255) NULL,
    confidence_score DECIMAL(3, 2) DEFAULT 1.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_metric_recorded (user_id, metric_type, recorded_at)
);
```

---

## 9. Data Normalization

Normalisasi menjamin keseragaman komparasi statistik antarwaktu dan antarsumber. Nilai input mentah dikonversi ke unit standar kanonikal:

- **Durasi Waktu:** Dikonversi ke satuan **menit** (*minutes*) atau **detik** (*seconds*), e.g., `7h 30m` ──▶ `450 minutes`.
- **Volume Cairan:** Dikonversi ke satuan **mililiter** (*ml*), e.g., `2 gelas standar` ──▶ `500 ml`.
- **Jarak & Aktivitas:** Dikonversi ke satuan **langkah** (*steps*) dan **meter** (*m*).
- **Massa Tubuh:** Dikonversi ke satuan **kilogram** (*kg*).
- **Zona Waktu:** Diselaraskan ke UTC di tingkat penyimpanan basis data dan dirender kembali ke zona waktu lokal pengguna pada antarmuka.

---

## 10. Canonical Metric Model

Model metrik kanonikal merepresentasikan entitas terstandarisasi yang dikonsumsi oleh seluruh algoritma analitik engine:

```json
{
  "metric_id": "met_slp_99210",
  "user_id": 1042,
  "category": "sleep",
  "name": "sleep_duration",
  "canonical_value": 390.0,
  "canonical_unit": "minutes",
  "raw_input": "6.5 hours",
  "recorded_at": "2026-09-17T06:30:00Z",
  "source": "manual",
  "is_outlier": false,
  "quality_score": 0.95
}
```

---

## 11. Supported Metric Categories

PRONOIA mengelompokkan metrik perilaku ke dalam 9 domain gaya hidup preventif terintegrasi:

| No | Kategori Metrik | Fokus Pengukuran Perilaku | Metrik Kunci |
| :---: | :--- | :--- | :--- |
| **01** | **Sleep** | Pemulihan energi biologis dan keteraturan ritme sirkadian. | Durasi tidur, konsistensi jam tidur, latensi lelap. |
| **02** | **Activity** | Volume pergerakan fisik harian dan olahraga terstruktur. | Jumlah langkah, menit aktif, frekuensi latihan. |
| **03** | **Nutrition** | Pola konsumsi nutrisi seimbang dan frekuensi makan. | Frekuensi makan, estimasi kalori, rasio makronutrisi. |
| **04** | **Hydration** | Keseimbangan asupan cairan harian terhadap target personal. | Volume air diminum, interval hidrasi rutin. |
| **05** | **Weight** | Stabilitas massa tubuh jangka panjang secara longitudinal. | Berat badan (kg), tren perubahan 30 hari. |
| **06** | **Routine** | Keteraturan waktu bangun, waktu makan, dan jeda istirahat. | Indeks variabilitas rutinitas, kepatuhan jadwal. |
| **07** | **Mood / Wellbeing** | Persepsi kenyamanan fisik dan ketenangan mental mandiri. | Skor suasana hati harian, tingkat stres subjektif. |
| **08** | **Energy** | Persepsi kesiapan fisik untuk menjalani rutinitas harian. | Skala energi subjektif (1–5), stamina sore. |
| **09** | **Engagement** | Kedisiplinan berinteraksi dengan program hidup sehat. | *Logging streak*, kepatuhan aksi mikro, partisipasi tantangan. |

---

## 12. Sleep Metrics

Metrik tidur mengevaluasi kestabilan istirahat tanpa mengklaim diagnosis gangguan tidur klinis (*sleep disorder*):

- **`sleep_duration` (Menit):** Total durasi tidur efektif dalam satu siklus malam.
- **`sleep_start` (Waktu):** Titik jam pengguna mulai tertidur (*bedtime consistency*).
- **`sleep_end` (Waktu):** Titik jam pengguna terbangun di pagi hari (*wake consistency*).
- **`sleep_quality` (Skala 1–5):** Penilaian subjektif kualitas kesegaran saat bangun tidur.
- **`sleep_variability` (Menit):** Deviasi standar jam tidur selama periode observasi 7–14 hari.

> [!NOTE]
> Engine mengevaluasi rerata, variansi, tren kemerosotan, dan konsistensi jam tidur terhadap baseline pribadi. Engine dilarang menyimpulkan vonis seperti *"Pengguna menderita insomnia kronis"*.

---

## 13. Activity Metrics

Metrik aktivitas memantau volume dan kontinuitas gerakan fisik harian pengguna:

- **`steps` (Langkah):** Akumulasi total langkah kaki per hari.
- **`active_minutes` (Menit):** Durasi aktivitas fisik dengan intensitas sedang hingga tinggi.
- **`exercise_duration` (Menit):** Sesi latihan olahraga yang dicatat secara eksplisit.
- **`exercise_frequency` (Sesi/Minggu):** Kerapatan sesi latihan dalam siklus 7 hari.
- **`sedentary_breaks` (Kali):** Frekuensi jeda bergerak di sela waktu duduk statis berkepanjangan.

---

## 14. Nutrition Metrics

Metrik nutrisi mengukur pola konsumsi pangan dengan memperhitungkan keterbatasan estimasi mandiri:

- **`meal_count` (Kali):** Frekuensi waktu makan utama yang terekam.
- **`food_log_frequency` (Log/Hari):** Kedisiplinan mencatat sajian santapan.
- **`estimated_calories` (kkal):** Estimasi energi harian berdasarkan bahan atau label gizi.
- **`sugar_sodium_flags` (Boolean):** Indikator kandungan gula atau natrium tinggi dari hasil pemindaian.

> [!IMPORTANT]
> **Aturan Validitas Nutrisi:** Item hasil deteksi visi komputer (*scanner*) berstatus probabilitas sebelum disetujui pengguna:  
> `Item Terdeteksi Kamera (Recognized)` ≠ `Item Terkonfirmasi Pengguna (Confirmed)`.  
> Engine hanya memproses data nutrisi yang telah memperoleh konfirmasi final pengguna.

---

## 15. Hydration Metrics

Metrik hidrasi mencatat asupan cairan dengan mempertimbangkan kondisi fisiologis dan aktivitas fisik:
- **`water_intake` (ml):** Akumulasi volume air putih yang diminum dalam 24 jam.
- **`hydration_logging_frequency` (Kali):** Kerapatan pencatatan jeda minum sepanjang hari.
- **Target Adaptif:** Target hidrasi tidak dipatok kaku 2.000 ml untuk semua orang, melainkan disesuaikan dengan bobot tubuh, cuaca lingkungan, dan intensitas olahraga hari tersebut.

---

## 16. Weight Metrics

Metrik berat badan difokuskan pada analisis pergerakan longitudinal, bukan penilaian harian yang bergejolak akibat retensi air:
- **`weight` (kg):** Berat badan terukur pada penimbangan berkala.
- **`rate_of_change` (kg/minggu):** Laju fluktuasi rata-rata bergerak (*moving average*) 14–30 hari.
- **Konsistensi Penimbangan:** Mendorong rutinitas penimbangan pada kondisi seragam (misal: pagi hari setelah bangun tidur).

---

## 17. Wellbeing Metrics

Metrik kesejahteraan merefleksikan persepsi kualitatif pengguna secara mandiri (*self-reported wellbeing*):
- **`mood_score` (Skala 1–5):** Suasana hati (*Sangat Buruk, Buruk, Netral, Baik, Sangat Baik*).
- **`energy_level` (Skala 1–5):** Tingkat stamina fisik yang dirasakan pengguna.
- **`stress_self_report` (Skala 1–5):** Tingkat tekanan emosional harian.
- **`routine_feeling` (Tag):** Persepsi kepuasan terhadap keteraturan aktivitas harian.

---

## 18. Engagement Metrics

Metrik keterlibatan mengukur tingkat interaksi pengguna dengan platform PRONOIA sebagai konteks perilaku:
- **`logging_frequency` (Hari aktif / 7 hari):** Konsistensi kehadiran mencatat data.
- **`challenge_adherence` (%):** Rasio penyelesaian tantangan kebiasaan aktif.
- **`insight_interaction_rate` (%):** Rasio pembacaan kartu wawasan dan penerimaan saran aksi.

> [!NOTE]
> Skor keterlibatan (*engagement*) digunakan untuk memahami kebiasaan pengguna, bukan sebagai representasi derajat kesehatan biologis.

---

## 19. Data Quality

Engine tidak memperlakukan seluruh data secara setara. Validitas analitik bertumpu pada 6 dimensi kualitas data:

| Dimensi Kualitas | Kriteria Evaluasi | Bobot Dampak |
| :--- | :--- | :---: |
| **Completeness** | Ketersediaan seluruh atribut wajib (nilai, satuan, stempel waktu). | Tinggi |
| **Consistency** | Kesesuaian pola catatan dengan rentang biologis wajar. | Sangat Tinggi |
| **Recency** | Kebaruan data terhadap siklus hidup observasi analitik (data < 48 jam). | Tinggi |
| **Source Reliability** | Bobot kredibilitas sumber instrumen pencatatan (`wearable` > `manual`). | Sedang |
| **User Confirmation** | Status verifikasi manusia pada data hasil deteksi kecerdasan buatan. | Sangat Tinggi |
| **Timestamp Validity**| Kepastian stempel waktu tanpa konflik masa depan (*future timestamps*). | Kritis |

---

## 20. Data Quality Score

Engine menghitung skor kualitas komposit (*Data Quality Score / DQS*) berskala 0.00 hingga 1.00 untuk setiap batch data:

```text
DQS = (W_comp × Completeness) + (W_cons × Consistency) + (W_rec × Recency) + (W_src × SourceConfidence)
```

Ambang batas kelayakan data (*Quality Gates*):
- **DQS ≥ 0.75:** Kualitas tinggi; data langsung diserap ke dalam kalkulasi baseline dan sinyal.
- **0.50 ≤ DQS < 0.75:** Kualitas cukup; data digunakan untuk tren umum dengan bobot teredam.
- **DQS < 0.50:** Kualitas rendah; data ditandai (*flagged*) dan ditahan dari kalkulasi perubahan bermakna.

---

## 21. Missing Data

Data yang hilang (*Missing Data*) tidak boleh diasumsikan sebagai perilaku tidak sehat. Engine menerapkan distingsi tegas antara ketiadaan data dan nilai nol aktual:

```text
┌────────────────────────────┐          ┌────────────────────────────┐
│         NO DATA            │          │        ACTUAL ZERO         │
│  (Tidak Ada Log Tidur)     │    ≠     │     (0 Jam Tidur Semalam)  │
│  Status: Data Hilang / Gap │          │  Status: Anomali Fisiologis│
└────────────────────────────┘          └────────────────────────────┘
```

Jika pengguna tidak mencatat tidur selama 2 hari, engine memperlakukannya sebagai *data gap*, bukan menyimpulkan pengguna terjaga tanpa tidur selama 48 jam.

---

## 22. Data Gap Handling

Ketika terjadi kesenjangan data dalam rentang observasi, engine mengaktifkan protokol penanganan celah:
- **Prinsip Kehati-hatian:** Ketiadaan data (*Insufficient Data*) tidak pernah diartikan sebagai sinyal negatif (*Negative Signal*).
- **Ambang Observasi Minimum:** Jika dalam 7 hari observasi hanya tersedia catatan 4 hari, engine menahan sinyal dan menampilkan pesan: *"Mengumpulkan data tambahan untuk wawasan akurat"*.
- **Interpolasi Terbatas:** Engine hanya boleh melakukan estimasi tren lembut jika gap ≤ 1 hari pada metrik aktivitas dengan histori stabilitas tinggi.

---

## 23. Outlier Handling

Satu nilai ekstrem tunggal tidak boleh serta-merta memicu sinyal perubahan tren perilaku:

```text
Hari 1: 7 jam 10 menit
Hari 2: 6 jam 50 menit
Hari 3: 19 jam 00 menit  ──▶ [ANOMALI INPUT / TYPO]
Hari 4: 7 jam 05 menit
```

Alur pemrosesan nilai pencilan (*outliers*):
1. **Deteksi Nilai Ekstrem:** Nilai melebihi 3 deviasi standar ($> 3\sigma$) atau di luar rentang fisiologis wajar ditandai `is_outlier = true`.
2. **Isolasi Statistik:** Nilai pencilan dikeluarkan dari kalkulasi rerata baseline berjalan.
3. **Konfirmasi Pengguna:** Pengguna menerima notifikasi lembut untuk memvalidasi: *"Apakah catatan 19 jam tidur pada Hari 3 sudah sesuai, atau ingin dikoreksi?"*

---

## 24. Baseline Definition

*Personal Baseline* adalah model representasi statistik dari pola kebiasaan unik pengguna yang dihitung dari rentang waktu observasi terstandarisasi.

Baseline **bukan**:
- Standar kesehatan ideal generik populasi.
- Skor peringkat persaingan antarpengguna.
- Diagnosis medis atau vonis klinis tetap.
- Nilai permanen yang tidak pernah berubah.

Baseline memiliki 4 sifat fundamental: **Personal** (unik per individu), **Temporal** (terikat jendela waktu), **Kontekstual** (mempertimbangkan jadwal kerja/libur), dan **Dinamis** (berevolusi secara adaptif terkontrol).

---

## 25. Baseline Components

Struktur baseline personal merangkum 7 parameter statistik komprehensif:
- **Rerata (*Mean*):** Nilai tengah data observasi yang telah dibersihkan dari outlier.
- **Median:** Nilai persentil ke-50 untuk mengimbangi kemencengan data (*skewness*).
- **Rentang Normal (*Interquartile Range / IQR*):** Batas rentang $Q_1$ hingga $Q_3$ sebagai koridor fluktuasi wajar.
- **Variansi & Standar Deviasi ($\sigma$):** Ukuran stabilitas kebiasaan harian pengguna.
- **Frekuensi:** Kerapatan kejadian per minggu (misal: 3 sesi olahraga / minggu).
- **Indeks Konsistensi:** Skor kepatuhan jadwal waktu pencatatan (0.00 – 1.00).
- **Arah Tren Historis:** Kecenderungan pergerakan garis dasar dalam periode 30 hari.

---

## 26. Baseline Window

Engine menerapkan konfigurasi jendela observasi bertahap sesuai siklus biologis dan ketersediaan data:

| Durasi Jendela | Karakteristik Penggunaan | Kategori Metrik |
| :---: | :--- | :--- |
| **7 Hari** | *Early Rolling Window* untuk orientasi pengguna baru. | Hidrasi, keteraturan jam makan. |
| **14 Hari** | **Jendela Standar PRONOIA** (*Default Golden Baseline*). | Durasi tidur, langkah harian, variabilitas rutinitas. |
| **30 Hari** | Jendela stabilitas jangka menengah untuk tren musiman. | Frekuensi olahraga, fluktuasi berat badan. |
| **90 Hari** | Jendela analisis longitudinal untuk tinjauan instruktur. | Perubahan kebiasaan seumur hidup (*lifestyle evolution*). |

---

## 27. Baseline Readiness

Baseline hanya diaktifkan ke tahap produksi apabila telah memenuhi syarat observasi minimum (*readiness lifecycle*):

```text
NOT_STARTED ──▶ COLLECTING ──▶ INSUFFICIENT_DATA ──▶ AVAILABLE ──▶ STALE ──▶ REBUILDING
```

| Status Kesiapan | Definisi Kondisi Sistem | Perilaku Antarmuka Pengguna |
| :--- | :--- | :--- |
| `NOT_STARTED` | Pengguna baru terdaftar, belum ada log tercatat. | Tampilkan sambutan dan ajakan pencatatan perdana. |
| `COLLECTING` | Sedang mengumpulkan data (hari 1–6). | Indikator progres: *"Mengumpulkan data: Hari 3 dari 7"*. |
| `INSUFFICIENT_DATA`| Jendela waktu tercapai namun data valid < ambang minimum. | Imbauan untuk melengkapi catatan yang terlewat. |
| `AVAILABLE` | Ambang minimum terpenuhi, baseline aktif penuh. | Tampilkan baseline personal dan kartu wawasan cerdas. |
| `STALE` | Tidak ada data baru selama > 14 hari berturut-turut. | Tandai baseline kedaluwarsa, tawarkan kalibrasi ulang. |
| `REBUILDING` | Baseline sedang dikalkulasi ulang pasca-intervensi. | Tampilkan indikator proses kalibrasi latar belakang. |

---

## 28. Baseline Example

Contoh struktur model baseline tidur aktif pengguna:

```json
{
  "metric": "sleep_duration",
  "window_days": 14,
  "total_records_analyzed": 14,
  "valid_records_used": 13,
  "outliers_excluded": 1,
  "mean_value_minutes": 424.0,
  "mean_formatted": "7h 04m",
  "median_value_minutes": 430.0,
  "standard_deviation": 28.5,
  "normal_range_lower": 395.0,
  "normal_range_upper": 455.0,
  "consistency_status": "MODERATE",
  "readiness_state": "AVAILABLE",
  "calculated_at": "2026-09-17T02:00:00Z"
}
```

---

## 29. Baseline Refresh

Baseline disegarkan (*refreshed*) secara otomatis setiap minggu pada pemrosesan batch malam hari. Namun, laju adaptasi dikontrol secara ketat:
- **Pembobotan Eksponensial Terkendali:** Data baru diintegrasikan dengan bobot bertahap agar tidak menghapus histori stabilitas.
- **Proteksi Degradasi Tersembunyi:** Jika pengguna mengalami penurunan kualitas kebiasaan selama seminggu, baseline tidak boleh langsung merosot mengikuti kebiasaan buruk tersebut sehingga anomali menjadi tersamarkan.

---

## 30. Baseline Drift

Fenomena *Baseline Drift* terjadi ketika sistem beradaptasi terlalu cepat terhadap penurunan gaya hidup pengguna:

```text
Kebiasaan Sehat (7.5 jam) ──▶ Begadang Beruntun (5 jam) ──▶ Baseline Otomatis Turun (5 jam)
                                                                  │
                                                                  ▼
                                      BAHAYA: Defisit Tidur Kronis Dianggap "Normal Baru"
```

Strategi mitigasi PRONOIA untuk mencegah *harmful drift*:
1. Mengunci jendela referensi historis (*Historical Anchor Baseline*) selama 30–60 hari.
2. Membutuhkan intervensi aktif atau persetujuan eksplisit pengguna sebelum menurunkan baseline target kebiasaan.
3. Menyimpan riwayat versi baseline agar tren penurunan jangka panjang tetap terdeteksi.

---

## 31. Baseline Versioning

Setiap iterasi baseline disimpan dengan riwayat versi lengkap dalam basis data:

```sql
CREATE TABLE user_baselines (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    metric_type VARCHAR(64) NOT NULL,
    version INT UNSIGNED DEFAULT 1,
    window_start DATE NOT NULL,
    window_end DATE NOT NULL,
    mean_value DECIMAL(10, 2) NOT NULL,
    median_value DECIMAL(10, 2) NOT NULL,
    std_dev DECIMAL(10, 2) NOT NULL,
    calculation_method VARCHAR(32) DEFAULT 'rolling_mean_iqr',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_metric_active (user_id, metric_type, is_active)
);
```

---

## 32. Feature Extraction

Feature Extractor mentransformasikan deret metrik mentah menjadi vektor fitur perilaku (*behavioral features*) bernilai analitik tinggi:

```text
Log Durasi Tidur Mentah [360, 390, 370, 350, 380]
                       │
                       ▼
┌──────────────────────────────────────────────────────────┐
│               VEKTOR FITUR PERILAKU                      │
│  • average_duration       : 370 menit                    │
│  • sleep_variability      : ±15.8 menit (Rendah)         │
│  • baseline_delta         : -54 menit dari baseline      │
│  • consistency_score      : 0.88                         │
│  • rolling_trend_slope    : -4.2 menit / hari (Menurun)  │
└──────────────────────────────────────────────────────────┘
```

---

## 33. Behavioral Features

Daftar fitur perilaku yang diekstraksi oleh engine:
- **`central_tendency`:** Rerata dan median nilai metrik.
- **`dispersion`:** Rentang, variansi, dan standar deviasi fluktuasi harian.
- **`frequency`:** Frekuensi kejadian per satuan waktu (hari/minggu).
- **`streak`:** Rentetan hari berturut-turut pencatatan atau pencapaian target.
- **`deviation_delta`:** Selisih matematis antara rata-rata berjalan dengan nilai baseline.
- **`trend_direction`:** Arah kemiringan garis regresi tren linear (*slope*).
- **`consistency_index`:** Koefisien keseragaman jadwal waktu pelaksanaan kebiasaan.
- **`recency_gap`:** Jeda waktu sejak pencatatan terakhir dilakukan.

---

## 34. Trend Detection

Deteksi tren menggunakan analisis regresi linear sederhana atau uji tren non-parametrik pada deret waktu observasi aktif (3–7 hari):

| Status Tren | Kriteria Kemiringan (*Slope*) | Makna Perilaku |
| :--- | :--- | :--- |
| `INCREASING` | Kemiringan positif signifikan ($p < 0.05$). | Peningkatan konsisten pada nilai metrik kebiasaan. |
| `DECREASING` | Kemiringan negatif signifikan ($p < 0.05$). | Penurunan konsisten pada nilai metrik kebiasaan. |
| `STABLE` | Fluktuasi berada di dalam rentang $\pm 0.5\sigma$. | Kebiasaan berjalan stabil dan teratur. |
| `VOLATILE` | Variansi tinggi tanpa pola arah yang konsisten. | Rutinitas tidak menentu atau jam istirahat bergejolak. |
| `INSUFFICIENT_DATA` | Titik data valid kurang dari batas minimum ($N < 3$). | Data belum mencukupi untuk penarikan garis tren. |

---

## 35. Trend Example

Analisis deret data durasi tidur 5 hari berturut-turut:

```text
Senin   : 7 jam 20 menit (440m)
Selasa  : 7 jam 10 menit (430m)
Rabu    : 6 jam 55 menit (415m)
Kamis   : 6 jam 30 menit (390m)
Jumat   : 6 jam 15 menit (375m)
```

Hasil evaluasi engine:
- **Status Tren:** `DECREASING` (Kemiringan: -16.5 menit / hari).
- **Signifikansi Deviasi:** Hari ke-5 berada 49 menit di bawah median baseline (424m).
- **Tindakan Sistem:** Tren penurunan terdeteksi konsisten selama 5 hari, memenuhi kualifikasi untuk evaluasi sinyal preventif awal.

---

## 36. Change Detection

Deteksi perubahan berfokus mengidentifikasi pergeseran nyata (*meaningful shifts*) antara kondisi terkini dengan baseline personal pengguna:

```text
Δ Perilaku = Nilai Jendela Terkini (Current Window) - Nilai Baseline Personal (Baseline Window)
```

Contoh Kasus Nyata:
- **Baseline Personal Tidur:** 7 jam 10 menit (430 menit).
- **Rerata 5 Hari Terkini:** 6 jam 05 menit (365 menit).
- **Deviasi Terhitung ($\Delta$):** **-65 menit / malam** (Defisit terakumulasi > 5 jam dalam seminggu).

---

## 37. Change Qualification

Tidak semua deviasi layak dijadikan sinyal intervensi. Kualifikasi perubahan (*Change Qualification*) dievaluasi melalui matriks 5 dimensi:

```text
Kelayakan Sinyal = Magnitudo + Durasi + Konsistensi + Kualitas Data + Relevansi Konteks
```

Hanya deviasi yang memiliki skor kelayakan gabungan di atas ambang batas sistem yang akan diloloskan menjadi *Behavioral Signal*. Hal ini mencegah sistem menjadi terlalu reaktif terhadap variasi hidup yang normal.

---

## 38. Magnitude

Magnitudo merefleksikan seberapa jauh nilai metrik menyimpang dari rentang normal pengguna:
- **Kecil (*Small*):** Deviasi $< 1.0\sigma$ dari baseline (misal: selisih tidur 15 menit). Diabaikan atau dicatat pasif.
- **Sedang (*Moderate*):** Deviasi antara $1.0\sigma$ hingga $2.0\sigma$ (misal: selisih tidur 45–60 menit). Memerlukan observasi keberlanjutan.
- **Besar (*Large*):** Deviasi $> 2.0\sigma$ (misal: selisih tidur > 90 menit). Menjadi kandidat sinyal intervensi prioritas tinggi jika bertahan lebih dari 3 hari.

---

## 39. Duration

Faktor durasi membedakan antara fluktuasi situasional satu hari dengan pembentukan tren kebiasaan baru:

```text
┌──────────────────────────────────┐          ┌──────────────────────────────────┐
│     DEVIASI 1 HARI (ACUTE)       │          │     TREN 5-7 HARI (PERSISTENT)   │
│  Tidur larut karena nonton bola. │    ≠     │  Kurang tidur 5 hari kerja.      │
│  Tindakan: Variasi Hidup Normal  │          │  Tindakan: Sinyal Perlu Intervensi│
└──────────────────────────────────┘          └──────────────────────────────────┘
```

---

## 40. Consistency

Konsistensi arah deviasi memperkuat derajat keyakinan sistem:
- **Pola Monoton Konsisten:** `Rendah` ──▶ `Rendah` ──▶ `Rendah` ──▶ `Rendah` menghasilkan skor keyakinan sinyal sangat tinggi.
- **Pola Fluktuatif Berganti:** `Rendah` ──▶ `Normal` ──▶ `Tinggi` ──▶ `Rendah` mengindikasikan ketidakteraturan ritme (*volatility*), bukan tren penurunan searah.

---

## 41. Recency

Perubahan perilaku yang terjadi baru-baru ini (*recency*) memiliki bobot urgensi lebih tinggi untuk intervensi preventif dini:
- **Pembobotan Peluruhan Waktu (*Time Decay Weighting*):** Deviasi dalam 48 jam terakhir diberi bobot 1.5× lebih besar daripada deviasi yang terjadi 6 hari lalu.
- **Keseimbangan Sensitivitas:** Faktor kebaruan tidak boleh membuat sistem bereaksi panik terhadap anomali semalam jika histori sebelumnya sangat stabil.

---

## 42. Context

Engine mempertimbangkan variabel kontekstual eksternal sebelum mengonfirmasi sinyal deviasi:

| Variabel Konteks | Contoh Situasi Riil | Pengaruh Terhadap Analisis Sinyal |
| :--- | :--- | :--- |
| **Sasaran Pribadi (*Goal*)** | Pengguna sedang dalam program peningkatan tidur. | Tingkatkan prioritas deteksi deviasi tidur. |
| **Hari Kerja vs Akhir Pekan** | Perbedaan jam bangun hari Sabtu vs hari kerja. | Pisahkan baseline hari kerja (*weekday*) dan akhir pekan (*weekend*). |
| **Jadwal Perjalanan / Liburan** | Pengguna menandai status cuti atau bepergian. | Redam sinyal anomali rutinitas secara sementara. |
| **Tantangan Aktif (*Challenge*)** | Mengikuti program hidrasi 30 hari. | Tingkatkan toleransi pada kenaikan volume minum. |

> [!WARNING]
> Konteks tidak boleh dijadikan pembenaran spekulatif tanpa bukti data eksplisit. Sistem tidak boleh berasumsi *"pengguna sedang stres"* kecuali ada catatan mandiri dari pengguna.

---

## 43. Behavioral Signal Definition

*Behavioral Signal* adalah entitas komputasional terstruktur yang merepresentasikan hasil deteksi perubahan bermakna yang telah lolos uji kualifikasi dan membutuhkan perhatian pengguna atau instruktur.

Struktur atribut wajib sebuah sinyal:
- **`signal_type`:** Pengenal jenis sinyal (misal: `SLEEP_DECLINE`, `ACTIVITY_DROP`).
- **`severity`:** Tingkat kepentingan antarmuka (`INFO`, `NOTICE`, `ATTENTION`, `FOLLOW_UP`).
- **`confidence_score`:** Skor reliabilitas data pendukung (0.00 – 1.00).
- **`detected_at`:** Stempel waktu pertama kali deviasi terkualifikasi.
- **`metric_ref`:** Referensi metrik yang mendasari sinyal.
- **`baseline_ref`:** ID baseline personal yang menjadi tolok ukur perbandingan.
- **`current_window_summary`:** Ringkasan statistik observasi aktif.
- **`status`:** Status mesin status sinyal saat ini.

---

## 44. Signal Types

PRONOIA mendefinisikan 8 tipe sinyal perilaku inti:

| Kode Sinyal | Kondisi Pemicu Komputasional | Relevansi Tindakan Preventif |
| :--- | :--- | :--- |
| `SLEEP_DECLINE` | Durasi tidur rata-rata 3–5 hari turun $> 1.0\sigma$ dari baseline. | Mencegah kelelahan kronis dan defisit pemulihan biologis. |
| `ACTIVITY_DECLINE` | Penurunan langkah $> 30\%$ selama 4 hari berturut-turut. | Mengingatkan jeda peregangan dan pemulihan mobilitas. |
| `ROUTINE_INCONSISTENCY` | Variabilitas jam tidur melonjak $> 60$ menit dalam seminggu. | Menstabilkan kembali ritme sirkadian tubuh. |
| `NUTRITION_LOG_DROP` | Berhenti mencatat makanan selama 3 hari setelah streak panjang. | Mempertahankan kesadaran asupan gizi seimbang. |
| `WEIGHT_RAPID_SHIFT` | Fluktuasi bobot $> 2\%$ dalam 7 hari tanpa riwayat serupa. | Evaluasi retensi cairan atau pola makan tidak wajar. |
| `HYDRATION_DEFICIT` | Asupan cairan harian $< 60\%$ target personal selama 3 hari. | Peringatan dehidrasi dini dan pemulihan asupan air. |
| `ENGAGEMENT_DROP` | Aktivitas aplikasi terhenti mendadak di tengah program. | Dorongan ramah untuk mencegah putus kebiasaan (*churn*). |
| `GOAL_PROGRESS_SHIFT` | Laju pencapaian target mingguan mengalami stagnasi. | Penyesuaian target mikro agar lebih realistis. |

---

## 45. Signal Is Not Diagnosis

Setiap representasi teks dari sinyal wajib menjaga batas non-diagnostik:

```text
┌────────────────────────────────────────────────────────────┐
│                     SINYAL: SLEEP_DECLINE                  │
├─────────────────────────────┬──────────────────────────────┤
│      ARTINYA DI PRONOIA     │       BUKAN DIAGNOSIS        │
│ "Penurunan rata-rata durasi │ "Pengguna menderita insomnia │
│ tidur sebesar 60 menit dari │ klinis atau gangguan tidur   │
│ baseline dalam 5 hari ini." │ saraf yang memerlukan obat." │
└─────────────────────────────┴──────────────────────────────┘
```

---

## 46. Signal Severity

Tingkat keparahan (*severity*) merefleksikan kebutuhan perhatian antarmuka produk, bukan tingkat kegawatan klinis medis:

| Tingkat (*Severity*) | Makna Operasional Sistem | Dampak Tampilan Antarmuka |
| :--- | :--- | :--- |
| `INFO` | Konfirmasi positif atau pencapaian konsistensi kebiasaan. | Kartu hijau pada lini masa, tanpa lencana notifikasi. |
| `NOTICE` | Fluktuasi minor yang menarik untuk dicermati pengguna. | Kartu biru informatif pada dasbor harian. |
| `ATTENTION` | Deviasi konsisten yang memenuhi kriteria aksi preventif. | Kartu kuning mencolok dengan tombol saran tindakan mikro. |
| `FOLLOW_UP` | Deviasi berlanjut pasca-intervensi atau membutuhkan instruktur. | Peringatan evaluasi bimbingan atau konsultasi instruktur. |

---

## 47. Signal State Machine

Siklus hidup setiap sinyal dikelola menggunakan mesin status terbatas (*Finite State Machine*):

```text
   [DETECTED]
       │
       ▼
  [VALIDATING] ──(Kualitas data buruk / Gap)──▶ [SUPPRESSED]
       │
       ▼
  [QUALIFIED]
       │
       ├────────────────────────┐
       ▼                        ▼
  [PRESENTED]              [DISMISSED] (Pengguna mengabaikan sinyal)
       │
       ▼
  [ACTED_ON] (Pengguna mengambil saran aksi)
       │
       ▼
  [MONITORING] (Jendela observasi dampak 3-7 hari)
       │
       ├────────────────────────┐
       ▼                        ▼
   [RESOLVED]              [PERSISTENT] (Deviasi tetap berlanjut)
```

---

## 48. Signal Deduplication

Engine menerapkan mekanisme deduplikasi ketat untuk mencegah spamming:
- **Idempotensi Sinyal:** Jika sinyal `SLEEP_DECLINE` berstatus `QUALIFIED` atau `PRESENTED` masih aktif untuk metrik yang sama, log baru pada hari yang sama tidak boleh menerbitkan entri sinyal baru.
- **Pembaruan Konteks Berjalan:** Data baru hanya memperbarui atribut `current_window_summary` dan `confidence_score` pada rekaman sinyal yang telah ada.

---

## 49. Signal Cooldown

Setiap kategori sinyal memiliki masa jeda (*cooldown period*) yang dapat dikonfigurasi:
- Setelah notifikasi sinyal dikirimkan atau ditutup oleh pengguna, sinyal sejenis memasuki masa *cooldown* selama 48–72 jam.
- Selama masa *cooldown*, deviasi baru tetap dicatat dalam basis data untuk analitik, namun tidak memicu notifikasi dorong (*push notification*) yang mengganggu fokus pengguna.

---

## 50. Signal Prioritization

Ketika beberapa sinyal terdeteksi bersamaan, antrean tampilan diprioritaskan melalui skor komposit:

```text
Skor Prioritas = (Relevansi Sasaran × 0.35) + (Tingkat Deviasi × 0.25) + (Ketahanan Pola × 0.20) + (Aksionabilitas × 0.20)
```

Dasbor pengguna dibatasi maksimal menampilkan **2 sinyal aktif teratas** dalam satu waktu guna menjaga kejernihan visual dan kenyamanan mental pengguna.

---

## 51. Signal Prioritization Example

Skenario Multi-Sinyal:
- Pengguna memilih sasaran: *"Meningkatkan Konsistensi Tidur"*.
- Sinyal Terdeteksi A: `SLEEP_DECLINE` (Deviasi tidur 1 jam).
- Sinyal Terdeteksi B: `ACTIVITY_DECLINE` (Penurunan langkah kaki).

Keputusan Prioritisasi: Sinyal A diberikan bobot prioritas `0.92` karena selaras langsung dengan sasaran aktif pengguna, sedangkan Sinyal B memperoleh prioritas `0.65` dan diletakkan pada tab ringkasan sekunder.

---

## 52. Signal Suppression

Engine secara aktif menahan (*suppress*) penerbitan sinyal dalam kondisi berikut:
- Kualitas data (*Data Quality Score*) berada di bawah 0.50.
- Sinyal merupakan duplikasi dari kejadian yang sedang dalam penanganan.
- Pengguna telah menyelesaikan aksi preventif terkait dan masih dalam jendela observasi dampak (*effect window*).
- Pengguna mengaktifkan mode jeda liburan (*vacation mode*).

Seluruh peristiwa *suppression* dicatat dalam log telemetri untuk evaluasi performa algoritma.

---

## 53. Insight Generation Context

Komponen *Insight Service* menerima paket konteks lengkap dari engine sebelum menyusun kartu wawasan:

```text
Konteks Pengguna + Sasaran Aktif + Sinyal Berkualifikasi + Baseline + Bukti Observasi + Batasan Keamanan
                                           │
                                           ▼
                 KARTU WAWASAN CERDAS (EXPLAINABLE HEALTH INSIGHT)
```

Output kartu wawasan selalu merangkum 3 elemen: **Observasi Fakta**, **Penjelasan Relevansi**, dan **Langkah Solutif Terukur**.

---

## 54. Insight Structure

Struktur data kanonikal untuk kartu wawasan perilaku pengguna:

```json
{
  "insight_id": "ins_77491",
  "user_id": 1042,
  "source_signal_id": "sig_slp_0032",
  "title": "Pola Tidur Menurun dalam 5 Hari Terakhir",
  "observation": "Rata-rata tidur Anda tercatat 6 jam 05 menit, berkurang 65 menit dibandingkan baseline normal Anda.",
  "context": "Penurunan ini konsisten terjadi pada hari kerja saat jadwal aktivitas malam Anda meningkat.",
  "why_it_matters": "Pemulihan tubuh yang stabil menjaga stamina dan daya konsentrasi Anda sepanjang hari.",
  "suggested_actions": [
    {
      "action_id": "act_bedtime_remind",
      "title": "Nyalakan Pengingat Siap Tidur",
      "description": "Aktifkan alarm relaksasi 30 menit sebelum jam 22:30 malam ini."
    }
  ],
  "evidence_summary": "14-day baseline: 7h 10m vs 5-day active: 6h 05m",
  "generated_at": "2026-09-17T08:00:00Z"
}
```

---

## 55. Explainability Requirement

Setiap wawasan kesehatan yang ditampilkan wajib memenuhi kerangka 5 pertanyaan transparansi (*5-Question Explainability Framework*):
1. **Apa yang berubah? (*What changed?*):** Paparkan metrik dan angka riil yang bergeser.
2. **Dibandingkan dengan apa? (*Compared to what?*):** Tunjukkan baseline personal pengguna secara gamblang.
3. **Kapan periode terjadinya? (*During which period?*):** Jelaskan rentang hari observasi (misal: 5 hari terakhir).
4. **Mengapa ini ditampilkan? (*Why was this shown?*):** Berikan alasan relevansi terhadap sasaran pengguna.
5. **Langkah apa selanjutnya? (*What can the user do next?*):** Berikan opsi tindakan konkret yang realistis.

---

## 56. Explainability Example

Perbandingan kualitas komunikasi edukatif antarmuka:

| Format Komunikasi | Contoh Redaksi Pesan | Dampak Psikologis Pengguna |
| :--- | :--- | :--- |
| ❌ **Buruk (*Black-box & Menakut-nakuti*)** | *"Skor kesehatan Anda turun drastis ke 60%! Anda berisiko sakit."* | Memicu kecemasan tanpa pemahaman konteks. |
| ✅ **Benar (*PRONOIA Explainable Standard*)** | *"Rata-rata tidur Anda dalam 5 hari terakhir adalah 6 jam 05 menit, yaitu 65 menit lebih rendah dari baseline biasa Anda (7 jam 10 menit)."* | Pengguna paham bukti fakta dan merasa berdaya untuk memperbaiki diri. |

---

## 57. Evidence Object

Objek bukti (*Evidence Object*) disimpan bersama wawasan untuk audit transparansi data:

```json
{
  "metric_name": "sleep_duration",
  "baseline_value": 430.0,
  "current_value": 365.0,
  "delta": -65.0,
  "delta_percentage": -15.1,
  "baseline_window_days": 14,
  "observation_window_days": 5,
  "data_points_collected": 5,
  "data_quality_score": 0.94,
  "supporting_record_ids": [10901, 10923, 10955, 10982, 11012]
}
```

---

## 58. Recommendation Context

Rekomendasi tindakan preventif disaring melalui 5 filter relevansi:
1. **Sinyal & Bukti Data:** Rekomendasi wajib menjawab deviasi spesifik yang terbukti.
2. **Preferensi Pengguna:** Menghormati batasan fisik, jam istirahat, dan gaya hidup pengguna.
3. **Bebas Kontradiksi:** Tidak menyarankan olahraga intensitas tinggi jika pengguna baru saja terdeteksi mengalami kelelahan berat atau defisit tidur ekstrem.
4. **Ketersediaan Sumber Daya:** Menyarankan tindakan yang dapat dikerjakan secara mandiri tanpa memerlukan peralatan mahal.

---

## 59. Recommendation Strategy

PRONOIA menerapkan prinsip **Tindakan Mikro Berbasis Bukti (*Evidence-based Micro-actions*)**:
- **Rendah Risiko (*Low-risk*):** Berupa perbaikan kebiasaan hidup sehari-hari, bukan terapi invasif.
- **Praktikal (*Practical*):** Dapat dieksekusi dalam hitungan menit.
- **Dapat Dicapai (*Achievable*):** Beban target realistis (misal: memajukan jam tidur 20 menit, bukan 2 jam seketika).
- **Terukur (*Measurable*):** Dampaknya dapat dipantau pada pencatatan log hari-hari berikutnya.

---

## 60. Actionability

Setiap rekomendasi wajib berorientasi pada tindakan nyata (*actionable*):

```text
❌ REKOMENDASI PASIF : "Perhatikanlah pola istirahat Anda."
✅ REKOMENDASI AKTIF : "Coba jadwalkan pengingat redup layar pada pukul 21:45 malam ini, 
                       dan catat waktu bangun Anda besok pagi."
```

Setiap rekomendasi dilengkapi satu tombol aksi cepat (*Quick Action CTA*) pada antarmuka.

---

## 61. Intervention Link

Ketika pengguna menerima sebuah rekomendasi, tindakan tersebut ditautkan sebagai intervensi terencana:

```text
Penerimaan Rekomendasi ──▶ Inisiasi Aksi Mandiri ──▶ Aktivasi Pemantauan Dampak (3 Hari)
```

Sistem menetapkan target observasi tindak lanjut: *"Memantau catatan durasi tidur selama 3 hari berturut-turut untuk mengevaluasi efektivitas intervensi."*

---

## 62. Outcome Monitoring

Sistem secara otomatis memantau metrik kesehatan pasca-tindakan pengguna untuk mengukur luaran nyata:
1. **Penetapan Jendela Review:** Mengamati data 3–7 hari pasca-intervensi dimulai.
2. **Pengumpulan Data Baru:** Mengakumulasi log harian yang masuk dalam periode berjalan.
3. **Analisis Komparatif:** Membandingkan rerata nilai pasca-aksi dengan nilai sebelum intervensi.
4. **Pembaruan Status Sinyal:** Mengubah status sinyal dari `MONITORING` menjadi `RESOLVED` atau `PERSISTENT`.

---

## 63. Outcome Categories

Klasifikasi luaran intervensi pada tingkat produk perilaku:

| Status Luaran | Kriteria Statistik Evaluasi | Tindak Lanjut Sistem |
| :--- | :--- | :--- |
| `IMPROVING` | Metrik bergerak mendekati rentang baseline ($\Delta < 0.5\sigma$). | Berikan umpan balik positif dan tutup sinyal (`RESOLVED`). |
| `STABLE` | Fluktuasi terhenti pada tingkat yang dapat diterima. | Pertahankan pemantauan pasif tanpa notifikasi baru. |
| `UNCHANGED` | Nilai metrik belum menunjukkan pergeseran berarti. | Perpanjang jendela observasi atau tawarkan variasi aksi alternatif. |
| `DECLINING` | Deviasi semakin memburuk meskipun aksi telah dicoba. | Naikkan keparahan ke `FOLLOW_UP`, rekomendasikan konsultasi instruktur. |
| `INSUFFICIENT_DATA`| Pengguna tidak mencatat log selama jendela review. | Kirim pengingat ramah untuk melanjutkan pencatatan. |

---

## 64. Outcome Example

Evaluasi komparatif sebelum dan sesudah intervensi:
- **Sebelum Intervensi:** Rata-rata tidur 5 hari = 5 jam 55 menit (Defisit tinggi).
- **Aksi yang Dijalankan:** Pengingat redup layar dan relaksasi pukul 22:00.
- **Sesudah Intervensi (4 Hari):** Rata-rata tidur = 6 jam 50 menit (Mendekati baseline 7h 10m).

Antarmuka menyajikan pesan wawasan pemulihan:

> *"Selamat! Durasi istirahat Anda dalam 4 hari terakhir telah kembali mendekati baseline normal Anda. Kebiasaan tidur teratur ini memberikan energi optimal bagi aktivitas harian Anda."*

---

## 65. Intervention Effect Window

Jendela pemantauan dampak (*Effect Window*) disesuaikan menurut sifat adaptasi biologis metrik:
- **Metrik Cepat (Hidrasi & Jam Bangun):** Jendela review 2–3 hari.
- **Metrik Sedang (Durasi Tidur & Langkah Kaki):** Jendela review 5–7 hari.
- **Metrik Lambat (Stabilitas Berat Badan & Kebugaran Otot):** Jendela review 14–30 hari.

---

## 66. Causal Interpretation Boundary

Sistem membedakan secara tegas antara urutan kronologis peristiwa (*temporal association*) dengan hubungan sebab-akibat mutlak (*causality*):

```text
❌ KLAIM KAUSALITAS SALAH : "Aksi memajukan alarm secara mutlak menyembuhkan kelelahan Anda."
✅ ASOSIASI TEMPORAL BENAR: "Durasi tidur Anda membaik selama periode pelaksanaan pengingat istirahat."
```

PRONOIA selalu menggunakan bahasa sains perilaku yang terukur dan rendah hati (*humble science*).

---

## 67. Behavioral Loop

Siklus perilaku tertutup (*Closed Preventive Behavioral Loop*) merupakan esensi pembeda sistem PRONOIA:

```text
┌──────────────────────────────────────────────────────────────────┐
│                     CLOSED BEHAVIORAL LOOP                       │
└──────────────────────────────────────────────────────────────────┘
  AMATI (Observe) ──▶ BASELINE (Model) ──▶ DETEKSI (Detect Deviation)
                                                      │
         ┌────────────────────────────────────────────┘
         ▼
  JELASKAN (Explain) ──▶ TINDAKAN (Preventive Action) ──▶ PANTAU (Monitor)
                                                               │
         ┌─────────────────────────────────────────────────────┘
         ▼
  EVALUASI (Evaluate Outcome) ──▶ ADAPTASI SEUMUR HIDUP (Continuous Lifestyle)
```

---

## 68. Multi-Metric Context

Kebiasaan manusia tidak bekerja di ruang hampa. Penurunan pada satu metrik kerap bertepatan dengan anomali pada metrik lain:

```text
Penurunan Jam Tidur (Sleep ↓) + Penurunan Langkah Kaki (Activity ↓) + Skor Mood Rendah (Mood ↓)
```

Engine membaca keterkaitan multimetrik ini untuk membangun pemahaman holistik atas dinamika energi pengguna.

---

## 69. Cross-Metric Rule

Aturan lintas-metrik (*Cross-Metric Rules*) memungkinkan interpretasi yang lebih kaya:
- **Aturan Kelelahan Rutinitas:** Jika durasi tidur menurun bersamaan dengan penurunan aktivitas fisik selama 4 hari, prioritaskan wawasan mengenai *"Pemulihan Energi dan Istirahat Berkualitas"* daripada mendorong pengguna memaksakan target langkah harian.
- **Aturan Perlindungan Beban:** Tidak memberikan rekomendasi tantangan fisik berat jika terdeteksi indikator defisit energi yang signifikan.

---

## 70. Correlation Boundary

Korelasi multimetrik dicatat sebagai relasi analitik di basis data (`related_signal_id`), namun tidak dipresentasikan sebagai vonis patologis:

```text
Korelasi Statistik (Correlation) ≠ Sebab-Akibat Biologis (Causation)
```

Sistem menyampaikan wawasan komparatif: *"Beberapa metrik kebiasaan Anda mengalami perubahan bersamaan dalam minggu ini,"* bukan klaim dogmatis bahwa salah satu faktor menjadi penyebab mutlak faktor lainnya.

---

## 71. Behavioral Cluster

Ketika beberapa sinyal terkait muncul dalam jendela waktu yang berdekatan, engine menggabungkannya ke dalam satu klaster (*Behavioral Cluster*):

```text
KLASTER: PERGESERAN RITME MINGGUAN
├── Sinyal 1: Penurunan Tidur (Durasi -50m)
├── Sinyal 2: Jam Bangun Tidak Teratur
└── Sinyal 3: Penurunan Frekuensi Olahraga Sore
```

---

## 72. Signal Clustering

Strategi klastering sinyal meringkas kompleksitas data agar pengguna tidak kewalahan:
1. Mengelompokkan sinyal-sinyal yang terjadi dalam rentang waktu $\pm 48$ jam.
2. Meringkas 3 sinyal individual menjadi **1 Kartu Wawasan Ringkasan Terpadu**.
3. Menghindari pengiriman beberapa notifikasi terpisah yang membingungkan.

---

## 73. Behavior Stability

Stabilitas perilaku menggambarkan tingkat keterprediksian ritme harian pengguna:

| Status Stabilitas | Nilai Koefisien Variasi ($CV$) | Karakteristik Perilaku Pengguna |
| :--- | :---: | :--- |
| `STABLE` | $CV \le 0.15$ | Rutinitas sangat teratur dan konsisten setiap hari. |
| `SLIGHTLY_VARIABLE` | $0.15 < CV \le 0.25$ | Fluktuasi normal akibat perbedaan aktivitas akhir pekan. |
| `VARIABLE` | $0.25 < CV \le 0.40$ | Pola harian sering bergeser, waktu istirahat fleksibel. |
| `HIGHLY_VARIABLE` | $CV > 0.40$ | Ritme aktivitas sangat bergejolak tanpa jam tidur tetap. |

---

## 74. Behavior Consistency

Konsistensi waktu pelaksanaan dievaluasi secara independen dari volume:

```text
PENGGUNA KONSISTEN   : Jam tidur [22:30, 22:45, 22:40, 22:35] ──▶ Indeks Konsistensi: 0.94
PENGGUNA NON-KONSISTEN: Jam tidur [21:00, 01:30, 23:50, 03:00] ──▶ Indeks Konsistensi: 0.38
```

Membantu tubuh menjaga jam biologis sirkadian yang stabil terbukti secara sains memberikan kebugaran lebih tinggi daripada total durasi tidur yang tidak menentu.

---

## 75. Goal Alignment

Engine menyelaraskan analisis analitik dengan tujuan personal yang dipilih pengguna:
- **Sasaran Kebugaran Fisik:** Memperbesar bobot analisis pada metrik langkah kaki, menit aktif, dan sesi olahraga.
- **Sasaran Manajemen Stres & Istirahat:** Memperbesar bobot pada konsistensi tidur, variabilitas jam istirahat, dan hidrasi.
- **Sasaran Pola Makan Sehat:** Memperbesar sensitivitas pada keteraturan log nutrisi dan asupan gula/garam.

---

## 76. Goal-Aware Signal

Setiap sinyal memiliki atribut bobot relevansi terhadap sasaran aktif (`relevance_to_goal`):
- Jika sasaran aktif adalah *"Tidur Teratur"*, maka sinyal `SLEEP_DECLINE` memperoleh skor pengganda 1.4× dalam antrean prioritisasi.
- Sinyal yang tidak terkait sasaran utama tetap dicatat, namun tidak mendominasi layar utama pengguna.

---

## 77. Personalization Layer

Lapisan personalisasi menggabungkan 5 sumber data untuk menyusun bimbingan yang tepat sasaran:
1. **Profil Pengguna:** Usia, profesi/ritme kerja, preferensi gaya hidup.
2. **Sasaran Utama:** Tujuan kesehatan preventif jangka pendek dan menengah.
3. **Baseline Pribadi:** Patokan statistik riil 14 hari terakhir.
4. **Histori Keberhasilan:** Rekam jejak intervensi yang terbukti efektif di masa lampau.
5. **Umpan Balik Subjektif:** Catatan suasana hati dan energi harian.

---

## 78. Personalization Example

Skenario Personalisasi Nyata:
- **Pengguna A (Mahasiswa Tingkat Akhir):** Sasaran fokus konsistensi tidur. Saat terdeteksi defisit tidur 1 jam, engine menyarankan: *"Pasang alarm jeda belajar malam pukul 22:00 dan minum segelas air hangat."*
- **Pengguna B (Pekerja Lapangan):** Sasaran hidrasi dan mobilitas. Saat terdeteksi dehidrasi, engine menyarankan: *"Bawa botol air 1 liter saat mulai beraktivitas pagi."*

Tindakan yang direkomendasikan selalu disesuaikan dengan konteks peran dan kapabilitas nyata individu.

---

## 79. Behavior Engine and AI

Kecerdasan buatan (*AI Assistant*) **bukan sumber kebenaran (*source of truth*)** kalkulasi data kesehatan:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     ARSITEKTUR KERJA ENGINE & AI                       │
└────────────────────────────────────────────────────────────────────────┘
  Health Logs ──▶ [BEHAVIOR ENGINE] ──▶ [QUALIFIED SIGNAL & EVIDENCE]
                   (Deterministik)                   │
                                                     ▼
                                            [AI ASSISTANT]
                                       (Penyusun Narasi Edukatif)
                                                     │
                                                     ▼
                                            Pengguna / Member
```

AI tidak diperkenankan berspekulasi menghitung ulang statistik dasar, melainkan bertugas menerjemahkan paket bukti (*evidence package*) dari engine ke dalam dialog percakapan yang empatik dan mudah dipahami.

---

## 80. AI Context Contract

Kontrak data yang dikirimkan engine kepada layanan AI dirumuskan secara terstruktur:

```json
{
  "signal_type": "SLEEP_DECLINE",
  "metric_name": "sleep_duration",
  "baseline_summary": "7 jam 10 menit (14 hari)",
  "current_observation": "6 jam 05 menit (5 hari)",
  "delta": "-65 menit / malam",
  "user_goal": "Konsistensi Jam Tidur",
  "allowed_action_types": ["bedtime_reminder", "evening_screen_dimming", "relaxation_breathing"],
  "safety_guardrails": [
    "strictly_no_medical_diagnosis",
    "no_sleep_disorder_labeling",
    "no_prescription_recommendation"
  ]
}
```

---

## 81. Deterministic vs Probabilistic

Sistem memisahkan beban kerja komputasional berdasarkan karakteristik kepastian logika:

| Ranah Komputasi | Tanggung Jawab Operasional | Karakteristik Eksekusi |
| :--- | :--- | :--- |
| **Deterministik (*Core Engine*)** | Aritmatika, validasi range, batas statistik baseline, FSM status sinyal, otorisasi data, evaluasi ambang batas. | Wajib 100% konsisten, dapat direproduksi ulang (*reproducible*), bebas halusinasi. |
| **Probabilistik (*AI Assistant / NLP*)** | Sintesis percakapan edukatif, pemformatan bahasa empatik, penyusunan analogi kesehatan ringan, penalaran konteks pengguna. | Dinamis, adaptif terhadap gaya bahasa pengguna, namun dibatasi oleh batasan keselamatan kaku. |

---

## 82. Example Processing Pipeline

Alur pemrosesan end-to-end saat sebuah catatan kesehatan masuk:

```text
Pengguna Menyimpan Log Tidur (6 Jam)
                 │
                 ▼
Simpan Record Kanonikal & Evaluasi Kualitas Data (DQS = 0.95)
                 │
                 ▼
Perbarui Vektor Fitur Perilaku Berjalan
                 │
                 ▼
Muat Baseline Personal Aktif (14 Hari: 7h 10m)
                 │
                 ▼
Hitung Deviasi Delta (-65 menit) & Arah Tren (Decreasing)
                 │
                 ▼
Evaluasi Kualifikasi Sinyal: Deviasi Konsisten 5 Hari?
               /   \
             Ya     Tidak
             │        │
             ▼        └────► Perbarui Metrik Lini Masa Pasif
Terbitkan Sinyal SLEEP_DECLINE
             │
             ▼
Bentuk Kartu Wawasan & Pasang Saran Aksi
             │
             ▼
Perbarui Dasbor Pengguna & Notifikasi Terjadwal
```

---

## 83. Processing Modes

Engine beroperasi dalam 2 moda pemrosesan komputasi:
- **Moda Sinkron (*Synchronous Ingestion*):** Validasi input cepat, normalisasi format, dan penyimpanan data mentah ke basis data (latensi $< 100\text{ ms}$).
- **Moda Asinkron (*Asynchronous Intelligence Queue*):** Kalkulasi baseline, perbaruan garis tren, pencocokan aturan lintas-metrik, dan pembuatan kartu wawasan dijalankan melalui antrean latar belakang (*background workers*) agar tidak membebani interaksi pengguna.

---

## 84. Event-Driven Processing

Arsitektur reaktif digerakkan oleh orkestrasi peristiwa (*Laravel Events & Listeners*):

```text
HealthDataCreated (Event)
        │
        ▼
AnalyzeBehaviorJob (Queue)
        │
        ▼
BaselineUpdated (Event)
        │
        ▼
SignalEvaluated ──▶ InsightGenerated ──▶ NotificationEligible
```

Setiap tahap dapat dipantau (*observable*) dan diisolasi jika terjadi kegagalan jaringan antarsistem.

---

## 85. Recalculation

Jika pengguna mengedit atau menghapus catatan kesehatan masa lalu (*historical correction*):
1. Mengidentifikasi seluruh metrik dan rentang tanggal yang terpengaruh.
2. Menandai cache data turunan (*derived cache*) sebagai tidak valid (*invalidated*).
3. Menjadwalkan kalkulasi ulang baseline dan tren untuk jendela waktu terkait.
4. Memperbarui atau membatalkan sinyal yang terbukti keliru (*voided signals*).

---

## 86. Cache Strategy

Data analitik turunan di-cache untuk memberikan respons instan pada dasbor:
- Kunci Cache: `user:{id}:baseline:{metric}`, TTL: 24 jam dengan *tag-based invalidation*.
- **Prinsip Otoritatif:** Cache murni berfungsi sebagai akselerator baca; basis data relasional tetap menjadi sumber kebenaran data mutlak.

---

## 87. Derived Data

Tabel turunan (*derived tables*) dipisahkan secara struktural dari tabel data mentah:
- `user_baselines`: Menyimpan parameter statistik baseline aktif dan histori.
- `behavioral_features`: Vektor fitur perilaku per siklus observasi.
- `behavior_signals`: Catatan sinyal aktif, status mesin status, dan riwayat resolusi.
- `behavior_insights`: Kartu wawasan yang telah dirender bersama paket buktinya.
- `progress_snapshots`: Rekam komparasi metrik sebelum vs sesudah intervensi.

---

## 88. Idempotency

Seluruh tugas pemrosesan engine wajib bersifat idempoten:

```text
Eksekusi Job 1x  ──▶  Sinyal Dihasilkan (Tunggal)
Eksekusi Ulang 2x ──▶  Status Tetap Sama, Tidak Menerbitkan Sinyal Ganda
```

Penerapan kunci idempotensi berbasis kombinasi unik: `{user_id}:{metric}:{date}:{rule_version}`.

---

## 89. Concurrency

Menangani potensi konflik saat beberapa log masuk dalam waktu bersamaan:
- Memanfaatkan *Atomic Locks* di Redis/Database saat kalkulasi baseline berjalan.
- Menerapkan isolasi transaksi (*Database Transactions*) untuk menjamin konsistensi pembacaan data sebelum dan sesudah penyimpanan rekaman.

---

## 90. Historical Integrity

Histori kesehatan pengguna tidak boleh diubah secara destruktif:
- Setiap koreksi catatan kesehatan mempertahankan riwayat versi log asli untuk keperluan audit kepatuhan dan integritas analitik.
- Riwayat sinyal masa lalu tidak dihapus, melainkan diperbarui statusnya menjadi `SUPERSEDED` atau `RECALIBRATED`.

---

## 91. User Privacy

Prinsip perlindungan privasi data kesehatan diterapkan secara menyeluruh:
- **Minimisasi Data (*Data Minimization*):** Engine hanya memproses metrik yang relevan dengan sasaran yang dipilih pengguna.
- **Isolasi Akses Multi-Penyewa:** Setiap kueri wajib dibatasi oleh lingkup otorisasi `user_id`.
- **Kedaulatan Pengguna:** Pengguna berhak mengekspor atau menghapus seluruh riwayat baseline dan sinyal mereka sewaktu-waktu.

---

## 92. Instructor Signal View

Tampilan data yang dapat diakses oleh instruktur kesehatan terverifikasi:

| Elemen yang Boleh Dilihat | Elemen yang Dibatasi / Disembunyikan |
| :--- | :--- |
| Ringkasan tren deviasi (misal: defisit tidur 5 hari). | Catatan harian privat non-kesehatan milik member. |
| Status kepatuhan program latihan dan aksi mikro. | Vektor komputasi internal mentah (*raw feature embeddings*). |
| Sasaran aktif member dan riwayat konsultasi bersama. | Riwayat konsultasi member dengan instruktur lain tanpa izin. |

---

## 93. Member Signal View

Antarmuka bagi pengguna (*Member*) mengedepankan kesederhanaan dan ketenangan pikiran:
- Menampilkan narasi yang jernih: **Observasi**, **Konteks**, dan **Saran Aksi**.
- Menyembunyikan kompleksitas matematis internal (seperti nilai regresi, bobot algoritma, atau istilah kode komputasi) agar tidak menimbulkan beban kognitif.

---

## 94. False Positive Handling

Pengguna memiliki kendali penuh untuk menolak sinyal yang tidak mencerminkan realitas fisik mereka:
- Tombol interaktif: `[Tidak Relevan]` atau `[Koreksi Catatan]`.
- Sinyal yang ditolak pengguna diberi tanda `DISMISSED` beserta alasannya (misal: *"Saya lembur kerja atas kemauan sendiri"*).
- Data penolakan digunakan untuk mengalibrasi sensitivitas deteksi tanpa merusak logika aturan kesehatan.

---

## 95. False Negative Awareness

Sistem mengakui secara terbuka keterbatasan teknologinya:

> [!IMPORTANT]
> **Ketiadaan Sinyal Bukan Berarti Kebal Masalah:**  
> PRONOIA tidak pernah menjamin mampu mendeteksi seluruh risiko kesehatan pengguna. Komunikasi produk menyatakan secara jujur: *"PRONOIA menganalisis tren dari data yang Anda catat. Jika Anda merasakan ketidaknyamanan fisik, selalu utamakan konsultasi medis langsung."*

---

## 96. Confidence and Evidence

Tingkat keyakinan sistem direfleksikan dalam bahasa komunikasi yang proporsional:

| Skor Keyakinan Bukti | Contoh Frasa Antarmuka yang Benar | Frasa yang DILARANG Digunakan |
| :---: | :--- | :--- |
| **Tinggi ($\ge 0.85$)** | *"Berdasarkan 5 hari catatan lengkap, terlihat tren penurunan durasi istirahat..."* | *"Anda pasti mengalami gangguan kesehatan kronis."* |
| **Sedang ($0.65–0.84$)**| *"Ada indikasi pergeseran pola tidur yang menarik untuk diperhatikan..."* | *"Sistem mendeteksi tubuh Anda sedang sakit."* |
| **Rendah ($< 0.65$)** | *"Data masih terbatas, namun ada sedikit variasi pada jam istirahat Anda..."* | *"Tidur Anda sangat buruk dan berbahaya."* |

---

## 97. Safety Guardrails

Enam pagar pengaman keselamatan (*Safety Guardrails*) yang dikunci mati dalam kode program:
1. **Zero Clinical Diagnosis:** Dilarang menyebutkan nama penyakit patologis.
2. **Zero Emergency Triage:** Tidak memproses kasus gawat darurat medis.
3. **Zero Medication Alteration:** Dilarang menyarankan perubahan dosis obat.
4. **Zero Prescription:** Dilarang merekomendasikan obat keras farmasi.
5. **Zero Fear-Mongering:** Dilarang menggunakan pesan ancaman kematian atau bahaya fatal.
6. **Evidence Grounding:** Dilarang membuat wawasan tanpa objek bukti data riil.

---

## 98. Emergency Separation

Alur kegawatdaruratan medis (*Emergency Flow*) dipisahkan 100% secara arsitektural dari Health Behavior Engine:

```text
┌───────────────────────────────┐          ┌───────────────────────────────┐
│    HEALTH BEHAVIOR ENGINE     │          │    EMERGENCY SAFETY PATHWAY   │
│  • Gaya hidup preventif       │    ≠     │  • Tombol Bantuan Darurat     │
│  • Kebiasaan & tren santai    │ (ISOLASI)│  • Kontak Rumah Sakit / 119   │
│  • Wawasan edukatif mikro     │          │  • Fasilitas Kesehatan Dekat  │
└───────────────────────────────┘          └───────────────────────────────┘
```

---

## 99. Health Score Policy

PRONOIA menolak secara sadar pembuatan skor kesehatan tunggal generik (*Global Health Score*):
- Skor tunggal seperti *"Skor Kesehatan Anda: 72/100"* menyederhanakan biologi manusia secara sembrono, memicu obsesi tidak sehat (*orthorexia*), dan tidak memberikan konteks tindakan konkret.
- PRONOIA menyajikan status multi-dimensi: **Konsistensi Tidur**, **Mobilitas Fisik**, dan **Kepatuhan Sasaran**.

---

## 100. Behavioral Score Policy

Jika diperlukan penilaian kuantitatif, sistem hanya mengukur **Konsistensi Perilaku Produk (*Behavioral Consistency Index*)**:
- Mengukur kedisiplinan beraktivitas sehat dan mencatat log.
- Tidak pernah dipromosikan sebagai *"skor kesehatan biologis"*.

---

## 101. Example Internal Score

Model matematis skor prioritas sinyal internal (*Internal Signal Priority Score*):

```text
PriorityScore = RelevansiSasaran × KetahananPola × KualitasBukti × Aksionabilitas
```

Skor ini murni digunakan oleh antrean perutean pesan internal untuk menyortir urutan tampilan antarmuka.

---

## 102. Rule Engine

Seluruh ambang batas komputasi didefinisikan melalui konfigurasi terpusat yang fleksibel (*declarative rule configuration*), bukan di-*hardcode* di dalam controller:

```php
// config/behavior_rules.php
return [
    'sleep_decline' => [
        'version' => 2,
        'min_observation_days' => 4,
        'deviation_threshold_std_dev' => 1.25,
        'min_data_quality' => 0.70,
        'cooldown_hours' => 48,
    ],
];
```

---

## 103. Configuration

Parameter aturan perilaku yang dapat diatur oleh tim ahli kesehatan & engineering:
- Rentang durasi jendela baseline (7, 14, 30 hari).
- Jumlah titik data minimum per metrik.
- Faktor pengali deviasi standar untuk ambang batas deviasi.
- Masa jeda notifikasi per kategori sinyal.

---

## 104. Versioned Behavior Rules

Aturan komputasi disimpan dengan riwayat versi (*Rule Versioning*):

```sql
CREATE TABLE behavior_rule_versions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rule_name VARCHAR(64) NOT NULL,
    version INT UNSIGNED NOT NULL,
    rule_config JSON NOT NULL,
    effective_from DATETIME NOT NULL,
    effective_until DATETIME NULL,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 105. Reproducibility

Sistem menjamin prinsip reproduksibilitas ilmiah (*Scientific Reproducibility*):
- Ketika sebuah wawasan diterbitkan, sistem menyimpan referensi ID aturan, ID baseline, dan rentang data pendukung.
- Auditor atau penilai kompetisi dapat menjalankan ulang kalkulasi pada tanggal yang sama dan mendapatkan hasil yang 100% identik.

---

## 106. Explainability Trace

Rekam jejak transparansi sistem (*Explainability Trace*) untuk setiap sinyal aktif:

```text
┌────────────────────────────────────────────────────────┐
│                EXPLAINABILITY AUDIT TRACE              │
├──────────────────────┬─────────────────────────────────┤
│ Sinyal Terpilih      │ SLEEP_DECLINE                   │
│ Versi Aturan         │ sleep_rule_v2.1                 │
│ Nilai Baseline       │ 430 menit (Jendela: 14 hari)    │
│ Nilai Observasi Aktif│ 365 menit (Jendela: 5 hari)     │
│ Deviasi Terhitung    │ -65 menit (Melampaui ambang)    │
│ Persistensi Pola     │ 4 dari 5 hari konsisten menurun │
│ Kualitas Data (DQS)  │ 0.94 (Sangat Baik)              │
│ Relevansi Sasaran    │ Tinggi (Sasaran: Tidur Nyenyak) │
│ Status Evaluasi      │ QUALIFIED FOR ACTION            │
└──────────────────────┴─────────────────────────────────┘
```

---

## 107. Auditability

Seluruh peristiwa penting dicatat dalam buku besar audit sistem (*System Audit Log*):
`baseline_calculated` ──▶ `signal_qualified` ──▶ `insight_rendered` ──▶ `action_accepted` ──▶ `outcome_evaluated`.

---

## 108. Testing Strategy

Piramida pengujian komprehensif untuk *Health Behavior Engine*:
- **Unit Tests:** Kalkulasi statistik (mean, IQR, slope), normalisasi satuan, dan isolasi filter outlier.
- **Integration Tests:** Pipeline event listener, interaksi queue job, dan persistensi state machine.
- **Feature Tests:** Pengalaman layar dasbor member, respons otorisasi instruktur, dan eksekusi aksi mikro.
- **Regression Tests:** Memastikan perubahan konfigurasi aturan baru tidak merusak komputasi historis yang sudah berjalan.

---

## 109. Test Example — Baseline

```gherkin
Scenario: Kalkulasi Baseline Berjalan 14 Hari
  Given Pengguna memiliki 14 catatan tidur valid
  When BaselineBuilder dijalankan
  Then Nilai mean, median, dan variansi dihitung dengan benar
  And Status baseline berubah menjadi "AVAILABLE"
```

---

## 110. Test Example — Missing Data

```gherkin
Scenario: Penanganan Data yang Kurang dari Syarat Minimum
  Given Pengguna baru mencatat 2 hari dalam jendela 7 hari
  When SignalQualifier mengevaluasi deviasi
  Then Status tetap "INSUFFICIENT_DATA"
  And Sistem TIDAK menerbitkan sinyal negatif
```

---

## 111. Test Example — Outlier

```gherkin
Scenario: Isolasi Nilai Ekstrem (Outlier) Tunggal
  Given Pengguna memiliki baseline tidur 7 jam
  And Pengguna memasukkan input salah ketik "20 jam" pada hari ke-3
  When FeatureExtractor memproses deret waktu
  Then Hari ke-3 ditandai sebagai outlier
  And Rerata baseline tidak terdistorsi secara ekstrem
```

---

## 112. Test Example — Signal

```gherkin
Scenario: Penerbitan Sinyal Perilaku yang Terkualifikasi
  Given Baseline tidur tersedia (7h 10m)
  And Rata-rata tidur 5 hari terakhir konsisten 6 jam
  When ChangeDetectionService mengevaluasi deviasi
  Then Sinyal "SLEEP_DECLINE" diterbitkan dengan status "QUALIFIED"
```

---

## 113. Test Example — Duplicate

```gherkin
Scenario: Pencegahan Sinyal Duplikat
  Given Sinyal "SLEEP_DECLINE" sudah aktif untuk hari ini
  When Job analisis dijalankan ulang oleh event baru
  Then Jumlah record sinyal aktif tetap 1 (Idempoten)
```

---

## 114. Test Example — Correction

```gherkin
Scenario: Koreksi Data Historis oleh Pengguna
  Given Pengguna mengoreksi log tidur kemarin dari 4 jam menjadi 8 jam
  When Event HealthDataUpdated dipicu
  Then Cache baseline dibersihkan dan dihitung ulang
  And Status sinyal dievaluasi ulang berdasarkan data koreksi
```

---

## 115. Test Example — Authorization

```gherkin
Scenario: Perlindungan Akses Sinyal Antarpengguna
  Given Pengguna A mencoba membaca sinyal milik Pengguna B
  When Permintaan API dikirimkan
  Then Sistem mengembalikan HTTP 403 Forbidden
```

---

## 116. Test Example — AI Boundary

```gherkin
Scenario: Verifikasi Batasan Non-Diagnostik pada AI
  Given Sinyal "SLEEP_DECLINE" diteruskan ke AI Assistant
  When Respons narasi dihasilkan
  Then Narasi TIDAK memuat kata "insomnia", "penyakit", atau "resep obat"
  And Menyertakan opsi tindakan gaya hidup preventif
```

---

## 117. Performance Requirements

Ambang batas kinerja sistem (*Performance SLAs*):
- **Penyimpanan Log Tunggal (*Quick Log*):** $\le 100\text{ ms}$ (P95).
- **Kalkulasi Baseline Bertahap (*Incremental Calculation*):** $\le 250\text{ ms}$.
- **Pemuatan Ringkasan Dasbor (Cache Hit):** $\le 50\text{ ms}$.
- **Waktu Respons Analitik Lengkap (Async Queue):** Selesai dalam waktu $< 5\text{ detik}$.

---

## 118. Scalability

Sistem dirancang mampu menangani lonjakan dari 100 pengguna hingga 100.000+ pengguna aktif:
- Menerapkan pemrosesan bertahap (*Incremental Analytics*); sistem tidak pernah menghitung ulang seluruh riwayat tahunan saat log harian baru masuk.
- Partisi data analitik berdasarkan rentang bulan pada tabel log skala besar.

---

## 119. Queue Usage

Konfigurasi antrean antartugas latar belakang Laravel:
- `high`: Pemrosesan sinyal dan pembuatan kartu wawasan.
- `default`: Kalkulasi fitur perilaku dan sinkronisasi baseline.
- `low`: Pembersihan cache lama dan agregasi statistik mingguan.

---

## 120. Failure Handling

Ketahanan sistem menghadapi kegagalan eksekusi (*Resilience & Circuit Breaking*):
- Tugas antrean yang gagal mencoba ulang otomatis hingga 3 kali dengan jeda eksponensial (*exponential backoff*).
- Jika kegagalan berlanjut, tugas dipindahkan ke `failed_jobs` dan sistem mengirimkan peringatan telemetri tanpa merusak pengalaman interaksi pengguna.

---

## 121. Partial Failure

Prinsip isolasi kegagalan parsial (*Graceful Degradation*):

```text
Catatan Kesehatan Tersimpan Aman (Database ✅) ──▶ Analitik Latar Belakang Tertunda (Queue ⏳)
```

Jika antrean komputasi mengalami kelambatan, pencatatan data pengguna tetap sukses seketika. Antarmuka menampilkan status ramah: *"Catatan berhasil disimpan. Wawasan personal Anda sedang diselaraskan."*

---

## 122. Eventual Consistency

Sistem menerapkan model konsistensi bertahap (*Eventual Consistency*) antara data log mentah dan hasil sintesis wawasan:
- Data log mentah bersifat konsisten kuat (*strongly consistent*) saat disimpan.
- Pembaruan kartu wawasan dan status sinyal terpenuhi dalam jendela waktu beberapa detik secara asinkron tanpa memblokir thread antarmuka pengguna.

---

## 123. User Experience During Processing

Antarmuka dilarang menampilkan pesan keliru seperti *"Tidak ada perubahan terdeteksi"* saat komputasi latar belakang masih berjalan.

> [!TIP]
> Tampilkan indikator status progres yang tenang dan informatif: *"Menganalisis pola istirahat 5 hari terakhir..."* dengan animasi halus hingga wawasan siap dibaca.

---

## 124. Behavior Engine API Boundary

Batasan antarmuka layanan utama (*Main Service Interface*) diimplementasikan melalui kontrak teruji:

```php
namespace App\Contracts\Behavior;

interface BehaviorAnalysisServiceInterface
{
    public function analyzeUserHealthData(int $userId, string $metricType): AnalysisResult;
    public function calculateBaseline(int $userId, string $metricType, int $windowDays = 14): BaselineResult;
    public function evaluateSignals(int $userId, array $features): Collection;
    public function evaluateInterventionOutcome(int $interventionId): OutcomeResult;
}
```

---

## 125. Suggested Domain Services

Struktur layanan domain di dalam direktori `app/Services/Behavior/`:

| Layanan Domain (*Service*) | Tanggung Jawab Operasional |
| :--- | :--- |
| `MetricNormalizationService` | Standarisasi unit dan penyeragaman zona waktu input. |
| `DataQualityService` | Kalkulasi skor kelengkapan dan validitas bukti data. |
| `BaselineService` | Kalkulasi mean, median, IQR, dan versi baseline personal. |
| `BehaviorFeatureService` | Ekstraksi fitur statistik deret waktu dan variabilitas. |
| `TrendAnalysisService` | Pengujian arah kemiringan garis regresi tren linear. |
| `ChangeDetectionService` | Penghitungan delta deviasi terhadap baseline aktif. |
| `SignalQualificationService`| Validasi ambang batas, durasi minimum, dan mitigasi false-positive. |
| `SignalPrioritizationService`| Pengurutan antrean sinyal berbasis relevansi sasaran. |
| `OutcomeEvaluationService` | Pemantauan dampak intervensi pasca-tindakan pengguna. |

---

## 126. Suggested Domain Models

Model Eloquent domain di dalam direktori `app/Models/`:
- **`HealthRecord`:** Entitas catatan kesehatan mentah dan terkanonikalisasi.
- **`HealthMetric`:** Definisi katalog metrik yang didukung sistem.
- **`HealthBaseline`:** Model data baseline personal beserta versinya.
- **`BehaviorFeature`:** Vektor parameter perilaku yang diekstraksi.
- **`BehaviorSignal`:** Entitas sinyal perilaku aktif dan historis.
- **`BehaviorInsight`:** Kartu wawasan terstruktur bersama objek buktinya.
- **`BehaviorIntervention`:** Tindakan pencegahan yang diambil oleh pengguna.
- **`BehaviorOutcome`:** Hasil evaluasi luaran pasca-intervensi.

---

## 127. Suggested Database Tables

Skema tabel relasional pendukung sistem kecerdasan perilaku:
- `health_records` (Data mentah, stempel waktu, sumber provenance).
- `health_baselines` (Statistik baseline personal, rentang jendela, nomor versi).
- `behavior_features` (Vektor fitur perilaku per periode).
- `behavior_signals` (Sinyal perilaku, tingkat urgensi, status FSM).
- `behavior_insights` (Kartu wawasan, teks narasi, tombol aksi saran).
- `behavior_interventions` (Aksi yang diinisiasi pengguna, target observasi).
- `behavior_outcomes` (Komparasi nilai sebelum vs sesudah aksi).
- `behavior_rule_versions` (Konfigurasi ambang batas aturan terversi).

---

## 128. Data Relationship

Diagram relasi entitas logis yang menghubungkan seluruh rantai nilai data:

```text
Pengguna (User)
  │
  ├── Sasaran Pribadi (User Goals)
  │
  └── Catatan Kesehatan (Health Records)
            │
            ▼
       Fitur Perilaku (Behavior Features)
            │
            ▼
     Baseline Personal (Health Baselines)
            │
            ▼
      Sinyal Perilaku (Behavior Signals)
            │
            ▼
      Kartu Wawasan (Behavior Insights)
            │
            ▼
    Aksi Terencana (Behavior Interventions)
            │
            ▼
     Luaran Terukur (Behavior Outcomes)
```

---

## 129. Health Record → Signal Relationship

Setiap sinyal menyimpan tautan audit langsung ke ID rekaman kesehatan pendukungnya (`supporting_record_ids`):
- Tautan relasi `belongsToMany` antara `BehaviorSignal` dan `HealthRecord`.
- Memastikan transparansi penuh: sistem dapat menunjukkan dengan tepat titik data mana yang memicu terbentuknya sinyal.

---

## 130. Signal → Insight Relationship

Hubungan relasi sinyal ke wawasan dirancang fleksibel:
- **Relasi 1-ke-1 Standar:** Satu sinyal tunggal menghasilkan satu kartu wawasan fokus.
- **Relasi Klaster N-ke-1:** Beberapa sinyal terkait (misal: tidur berkurang + stres naik) dirangkum menjadi satu kartu wawasan terintegrasi untuk mencegah informasi berlebih.

---

## 131. Insight → Recommendation Relationship

Satu kartu wawasan dapat memuat 1 hingga 3 opsi aksi mikro terarah (*Actionable Recommendations*):
- Setiap opsi aksi memiliki tipe tindakan (`action_type`), estimasi durasi, dan tingkat keselamatan mandiri.
- Pengguna dapat memilih satu aksi yang paling sesuai dengan kesiapan mental mereka saat itu.

---

## 132. Recommendation → Outcome Relationship

Ketika rekomendasi dipilih, siklus evaluasi luaran diinisiasi:
`DIREKOMENDASIKAN` ──▶ `DITERIMA` ──▶ `DIMULAI` ──▶ `SELESAI DILAKUKAN` ──▶ `DIEVALUASI LUARANNYA`.

---

## 133. Behavior Engine and Instructor Workflow

Pemberdayaan instruktur kesehatan melalui kecerdasan engine:
- Dasbor instruktur menyajikan daftar member dengan sinyal berstatus `ATTENTION` atau `FOLLOW_UP`.
- Instruktur tidak perlu mengolah rumus statistik manual; mereka langsung menerima ringkasan tren dan bukti deviasi untuk merancang bimbingan yang tepat.

---

## 134. Behavior Engine and Notification

Integrasi engine dengan layanan notifikasi (*Notification Service*):
- Engine menerbitkan event `SignalQualified`.
- Layanan notifikasi melakukan pengecekan batas frekuensi (*rate limit*), jam tenang pengguna (*quiet hours*), dan masa jeda (*cooldown*) sebelum mengirimkan pesan.

---

## 135. Behavior Engine and Community

Perlindungan privasi data pada fitur komunitas:

> [!CAUTION]
> **Dilarang Otomatisasi Publikasi Data Pribadi:**  
> Sinyal dan wawasan kesehatan bersifat privat 100%. Engine dilarang keras mengunggah atau membagikan status deviasi pengguna ke feed komunitas tanpa tindakan persetujuan eksplisit dari pengguna.

---

## 136. Behavior Engine and Gamification

Penerapan gamifikasi yang etis dan non-adiktif:
- Poin dan lencana (*badges*) hanya diberikan untuk tindakan positif: konsistensi pencatatan log, penyelesaian aksi preventif, dan keikutsertaan tantangan sehat.
- Sistem dilarang memberikan sanksi (*punishment*) atau pengurangan poin ketika pengguna mengalami penurunan kondisi kesehatan.

---

## 137. Behavior Engine and Membership

Kesetaraan algoritma keselamatan bagi seluruh tingkatan keanggotaan:
- Logika deteksi deviasi, rumus baseline, dan batas pengaman keselamatan beroperasi secara identik bagi seluruh member, baik akun gratis maupun premium.
- Perbedaan tingkat keanggotaan hanya menyangkut fitur tambahan (seperti akses sesi konsultasi privat instruktur atau analitik visual mendalam).

---

## 138. Behavior Engine and Emergency

Pemisahan tegas dari fungsi pertolongan pertama medis:
- Engine tidak menangani deteksi henti jantung, stroke, trauma fisik, atau keracunan.
- Tombol darurat pada aplikasi memiliki rute langsung ke layanan panggilan darurat dan peta fasilitas kesehatan, tanpa melalui antrean pemrosesan engine.

---

## 139. Longitudinal Model

Model longitudinal PRONOIA memetakan evolusi gaya hidup pengguna sepanjang waktu:

```text
Bulan 1: Pembentukan Baseline Awal ──▶ Deteksi Deviasi ──▶ Intervensi 1 ──▶ Pemulihan
                                                                             │
         ┌───────────────────────────────────────────────────────────────────┘
         ▼
Bulan 3: Baseline Lebih Sehat ──▶ Kapasitas Fisik Meningkat ──▶ Transformasi Jangka Panjang
```

---

## 140. Baseline Evolution

Evolusi baseline berjalan secara bertahap dan terukur:
- Mengarsipkan versi baseline historis saat baseline baru dibentuk.
- Memungkinkan pengguna melihat grafik refleksi kilas balik: *"Bandingkan pola tidur Anda bulan ini dengan 6 bulan yang lalu."*

---

## 141. Behavioral Memory

Memori perilaku (*Behavioral Memory*) mencatat pola historis pengguna untuk personalisasi masa depan:
- Mengingat bahwa pengguna biasanya memiliki jadwal tidur lebih malam pada hari Sabtu.
- Mengingat bahwa aksi *"Jeda Minum Air Hangat"* memiliki tingkat kepatuhan tinggi di masa lalu.

---

## 142. Successful Intervention Learning

Sistem memprioritaskan rekomendasi yang terbukti berhasil pada diri pengguna:
- Jika suatu aksi mikro berulang kali diikuti oleh pemulihan metrik (`IMPROVING`), skor bobot saran aksi tersebut ditingkatkan pada rekomendasi berikutnya.
- Tetap mematuhi kaidah sains bahwa asosiasi keberhasilan ini adalah panduan kebiasaan praktis, bukan jaminan obat klinis mutlak.

---

## 143. Avoid Reinforcing Unsafe Patterns

Mencegah normalisasi perilaku berbahaya:
- Sistem tidak boleh memberikan apresiasi (*praise*) pada penurunan jam tidur yang ekstrem meskipun pengguna mencatat produktivitas tinggi.
- Menghindari dorongan olahraga berlebihan saat tubuh berada dalam kondisi defisit istirahat berat.

---

## 144. Behavior Engine Governance

Tata kelola perubahan aturan komputasi perilaku:
- Setiap perubahan ambang batas aturan wajib ditinjau oleh komite ahli kesehatan dan tim engineering.
- Wajib melalui pengujian regresi data historis (*historical backtesting*) sebelum dirilis ke lingkungan produksi.

---

## 145. Rule Change Example

Prosedur pembaruan aturan:
- Aturan Versi 1.0 mengaktifkan sinyal tidur setelah 3 hari defisit.
- Hasil evaluasi menunjukkan rasio false-positive tinggi pada hari libur.
- Aturan Versi 2.0 disesuaikan menjadi 4 hari observasi dengan penyesuaian khusus akhir pekan.
- Versi disimpan di `behavior_rule_versions` dan dapat dikembalikan (*rollback*) seketika jika diperlukan.

---

## 146. Competition Demonstration

Skenario demonstrasi langsung (*Live Demo Protocol*) untuk dewan juri kompetisi:

```text
1. Tampilkan Dasbor Member dengan Baseline Stabil (7 Jam Tidur).
2. Simulasikan Input Data 4 Hari dengan Defisit Nyata (5.5 Jam Tidur).
3. Perlihatkan Transisi Status Engine: DETECTED ──▶ QUALIFIED.
4. Buka Kartu Wawasan Transparan (Tampilkan Bukti Deviasi & Baseline).
5. Klik Aksi Preventif: "Nyalakan Pengingat Tidur Pukul 22:00".
6. Simulasikan Pemulihan Hari ke-5 & ke-6 ──▶ Status Sinyal Berubah Menjadi RESOLVED.
```

Alur ini membuktikan bahwa PRONOIA bukan sekadar penampil grafik statis, melainkan mesin kecerdasan perilaku adaptif tertutup.

---

## 147. What Judges Should Understand

Tiga proposisi nilai unik yang wajib dipahami evaluator:
1. **Personalisasi Berbasis Bukti:** Membandingkan pengguna dengan dirinya sendiri, bukan populasi asing.
2. **Transparansi Tanpa Halusinasi:** Statistik dihitung secara deterministik dan dapat diaudit ulang 100%.
3. **Siklus Perilaku Tertutup:** Solusi tuntas dari deteksi dini hingga pembuktian luaran pemulihan gaya hidup.

---

## 148. Anti-Pattern — Dashboard-only

| Pola Salah (*Anti-Pattern*) | Pendekatan Solutif PRONOIA |
| :--- | :--- |
| ❌ Menampilkan tumpukan grafik statistik rumit dan membiarkan pengguna bingung menyimpulkan artinya sendiri. | ✅ Menerjemahkan grafik menjadi kartu wawasan ramah yang menjelaskan makna perubahan dan langkah nyata yang perlu diambil. |

---

## 149. Anti-Pattern — AI-only

| Pola Salah (*Anti-Pattern*) | Pendekatan Solutif PRONOIA |
| :--- | :--- |
| ❌ Menyerahkan seluruh analisis data mentah ke model bahasa besar (LLM) yang rentan halusinasi angka dan kesalahan berhitung. | ✅ Menghitung metrik secara deterministik melalui *Behavior Engine*, lalu menggunakan AI murni sebagai penyusun bahasa edukatif yang aman. |

---

## 150. Anti-Pattern — Alert Spam

| Pola Salah (*Anti-Pattern*) | Pendekatan Solutif PRONOIA |
| :--- | :--- |
| ❌ Mengirimkan puluhan notifikasi setiap kali ada fluktuasi angka kecil, sehingga pengguna mematikan notifikasi (*alert fatigue*). | ✅ Menerapkan ambang batas kualifikasi, masa jeda (*cooldown*), dan pembatasan maksimal 2 sinyal prioritas aktif. |

---

## 151. Anti-Pattern — Population-only Comparison

| Pola Salah (*Anti-Pattern*) | Pendekatan Solutif PRONOIA |
| :--- | :--- |
| ❌ Memaksa target populasi kaku (misal: semua orang wajib 10.000 langkah atau tidur 8 jam) yang tidak realistis bagi banyak individu. | ✅ Membangun baseline personal adaptif yang menghargai kapasitas dan ritme hidup unik masing-masing pengguna. |

---

## 152. Anti-Pattern — False Precision

| Pola Salah (*Anti-Pattern*) | Pendekatan Solutif PRONOIA |
| :--- | :--- |
| ❌ Menyajikan angka presisi semu yang menyesatkan, seperti: *"Skor Kesehatan Organ Tubuh Anda: 84.72%"*. | ✅ Menggunakan istilah sains perilaku terukur: *"Aktivitas fisik Anda minggu ini stabil dan berada dalam rentang target personal Anda."* |

---

## 153. Anti-Pattern — Hidden Computation

| Pola Salah (*Anti-Pattern*) | Pendekatan Solutif PRONOIA |
| :--- | :--- |
| ❌ Memberikan saran kesehatan tanpa membeberkan landasan data pendukung (*black-box algorithm*). | ✅ Melampirkan objek bukti transparan (*Evidence Object*) yang menjawab apa, kapan, dan mengapa saran tersebut dihadirkan. |

---

## 154. Core Engine Contract

Kontrak fungsional baku *Health Behavior Engine*:

```text
MASUKAN (INPUT) : Catatan Kesehatan Tervalidasi + Konteks Pengguna + Sasaran Aktif
                         │
                         ▼
KELUARAN (OUTPUT): Baseline Personal + Fitur Perilaku + Sinyal Terkualifikasi + Objek Bukti
```

---

## 155. Minimal Engine Result

Contoh muatan data minimal (*Payload Result*) yang dihasilkan oleh engine:

```json
{
  "status": "success",
  "metric": "sleep_duration",
  "baseline": {
    "mean_minutes": 430,
    "window_days": 14,
    "status": "AVAILABLE"
  },
  "observation": {
    "mean_minutes": 365,
    "window_days": 5,
    "trend": "DECREASING"
  },
  "delta_minutes": -65,
  "data_quality_score": 0.94,
  "signal": {
    "type": "SLEEP_DECLINE",
    "severity": "ATTENTION",
    "status": "QUALIFIED"
  }
}
```

---

## 156. Minimum Production Requirements

Daftar periksa kesiapan rilis produksi (*Production Readiness Checklist*):

- [ ] Normalisasi satuan metrik dan validasi zona waktu aktif.
- [ ] Filter isolasi pencilan (*outlier handling*) teruji.
- [ ] Siklus status kesiapan baseline personal berfungsi.
- [ ] Algoritma deteksi tren dan deviasi tervalidasi.
- [ ] Deduplikasi sinyal dan masa jeda (*cooldown*) berjalan.
- [ ] Seluruh kartu wawasan memiliki objek bukti transparan.
- [ ] Evaluasi luaran pasca-intervensi menutup siklus perilaku.
- [ ] Isolasi jalur darurat medis terverifikasi 100%.
- [ ] Uji performa memenuhi SLA: pencatatan $\le 100\text{ ms}$, analitik $\le 5\text{ detik}$.

---

## 157. Recommended First Metrics

Lima metrik prioritas utama untuk implementasi Minimum Viable Product (MVP):
1. **Durasi Tidur (*Sleep Duration*):** Landasan utama pemulihan fisik dan biologis.
2. **Langkah Kaki (*Daily Steps*):** Indikator dasar mobilitas harian.
3. **Konsistensi Jam Bangun (*Wake Time Consistency*):** Penjaga ritme sirkadian tubuh.
4. **Asupan Air Minum (*Hydration Intake*):** Kebiasaan mikro pencegah dehidrasi.
5. **Frekuensi Catatan Nutrisi (*Meal Logging Frequency*):** Pembangun kesadaran konsumsi gizi.

---

## 158. MVP Behavioral Loop

Siklus perilaku minimal yang wajib diimplementasikan pada versi perdana:

```text
Catatan Cepat Log Tidur ──▶ Baseline Personal 14 Hari ──▶ Deteksi Defisit ──▶ Sinyal Tidur
                                                                               │
         ┌─────────────────────────────────────────────────────────────────────┘
         ▼
Kartu Wawasan Edukatif ──▶ Aksi Pengingat Tidur ──▶ Evaluasi Pemulihan 3 Hari
```

---

## 159. Final Engine Model

Model komprehensif arsitektur *Health Behavior Engine* merangkum seluruh siklus kecerdasan preventif PRONOIA:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               ARSITEKTUR LENGKAP HEALTH BEHAVIOR ENGINE                │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                 KONTEKS PERSONAL & SASARAN PENGGUNA
                                   │
                                   ▼
                   LOG DATA KESEHATAN MULTI-SUMBER
                                   │
                                   ▼
               NORMALISASI & EVALUASI KUALITAS DATA (DQS)
                                   │
                                   ▼
                     EKSTRAKSI FITUR DERET WAKTU
                                   │
                                   ▼
                   BASELINE PERSONAL DINAMIS (14 HARI)
                                   │
                                   ▼
                   ANALISIS TREN & DETEKSI DEVIASI
                                   │
                                   ▼
                   KUALIFIKASI & PRIORITISASI SINYAL
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
          KARTU WAWASAN TRANSPARAN      PANEL INSTRUKTUR AHLI
                    │                             │
                    ▼                             ▼
           SARAN TINDAKAN MIKRO          INTERVENSI TERARAH
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                       AKSI NYATA PENCEGAHAN
                                   │
                                   ▼
                     LOG CATATAN KESEHATAN BARU
                                   │
                                   ▼
                     EVALUASI LUARAN (OUTCOME)
                                   │
                                   ▼
                ADAPTASI GAYA HIDUP SEUMUR HIDUP
```

---

## 160. Final Principle

> [!IMPORTANT]
> **Prinsip Pamungkas Health Behavior Engine:**  
> *"Health Behavior Engine hadir untuk mendeteksi pergeseran bermakna pada pola kebiasaan yang dicatat pengguna sedini mungkin, menjelaskan perubahan tersebut secara transparan tanpa stigma, mendukung aksi pencegahan mandiri yang aman, dan mengevaluasi dampak nyata perbaikan tersebut secara longitudinal."*

Engine ini dipandu oleh 7 pilar abadi:
- **PERSONAL:** Berpatokan pada kebiasaan unik pengguna, bukan standar populasi umum.
- **KONTEKSTUAL:** Menghargai jadwal kerja, hari libur, dan sasaran pribadi pengguna.
- **DAPAT DIJELASKAN (*EXPLAINABLE*):** Setiap wawasan dilandasi bukti data konkret.
- **DETERMINISTIK:** Komputasi kritis dieksekusi secara matematis bebas halusinasi.
- **PRIVASI TERJAMIN:** Kedaulatan data berada sepenuhnya di tangan pengguna.
- **KESELAMATAN UTAMA (*SAFETY-FIRST*):** Isolasi total dari fungsi diagnosis klinis dan darurat.
- **LONGITUDINAL:** Mendampingi perjalanan transformasi gaya hidup sehat seumur hidup.

Batas fundamental sistem ditegakkan tanpa kompromi:

```text
Kecerdasan Perilaku Hidup Sehat (Behavioral Intelligence)
                           ≠
             Diagnosis Medis Klinis (Medical Diagnosis)
```

PRONOIA tidak berusaha menjadi mesin yang menghakimi penyakit pengguna, melainkan mitra cerdas yang membantu pengguna memahami dirinya sendiri dan mengambil langkah pencegahan terbaik setiap hari.
