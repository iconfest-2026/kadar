# PRONOIA — Product Vision

> **Visi Produk, Arah Strategis & Diferensiasi Inovasi PRONOIA**  
> Sumber kebenaran tingkat produk (*product-level source of truth*) yang mendefinisikan identitas, tujuan, persona sasaran, proposisi nilai, siklus kecerdasan perilaku, batasan keselamatan, dan peta jalan jangka panjang.

---

## 1. Document Purpose

Dokumen ini mendefinisikan visi produk dan arah strategis PRONOIA secara menyeluruh.

Dokumen ini menguraikan:

- **Identitas & Tujuan Produk:** Karakteristik mendasar, alasan keberadaan, dan orientasi pencegahan.
- **Problem Statement & Target Audiens:** Akar permasalahan fragmentasi data kesehatan dan profil pengguna.
- **Proposisi Nilai & Filosofi Produk:** Mengapa PRONOIA berbeda dari aplikasi pelacak kebugaran biasa.
- **Inovasi Inti (*Behavioral Health Loop*):** Siklus pencegahan tertutup berbasis data perilaku personal.
- **Ekosistem & Modul Produk:** Struktur modul bagi Member, Instructor, dan Admin.
- **Batasan Produk & Etika:** Pagar pembatas klinis non-diagnostik dan perlindungan data pribadi.
- **Metrik Keberhasilan Produk:** Metrik aktivasi, retensi, intervensi, dan *North Star Metric*.
- **Posisi Kompetitif & Narasi Demo:** Strategi pembuktian keunggulan produk secara objektif.
- **Arah Jangka Panjang:** Visi ekspansi institusional dan integrasi ekosistem kesehatan masa depan.

Dokumen ini menjawab 6 pertanyaan fundamental produk:
1. *What is PRONOIA?*
2. *Why does PRONOIA exist?*
3. *Who is PRONOIA for?*
4. *What problem does PRONOIA solve?*
5. *What makes PRONOIA fundamentally different?*
6. *What should PRONOIA become in the long run?*

Seluruh rincian arsitektur teknis dan implementasi kode wajib merujuk pada intensi produk yang ditetapkan dalam dokumen ini.

---

## 2. Product Identity

### Product Name
> **PRONOIA**

### Full Product Name
> **PRONOIA — Personal Preventive Health & Early Intervention Platform**

### Product Type
> **Progressive Web App (PWA)** — Aplikasi web modern dengan keandalan mobile-first, instalabilitas instan, kesadaran jaringan (*network-aware*), dan alur luring (*offline*) yang aman.

### Primary Domain
> **Preventive Health, Health Behavior Monitoring, Personalized Intervention, and Human Health Support.**

### Primary Audience
- **Individual Health-Conscious Users:** Individu yang ingin membangun dan mempertahankan kebiasaan hidup sehat.
- **University Students:** Mahasiswa dengan pola hidup dinamis yang rentan terhadap penurunan kualitas tidur dan nutrisi.
- **Young Professionals:** Pekerja muda yang membutuhkan pemantauan kebiasaan preventif dengan friksi minimal.
- **Instructors / Health Coaches:** Tenaga profesional yang memberikan pendampingan, validasi, dan intervensi manusia.
- **Health Program Administrators:** Pengelola program kesehatan komunitas atau institusi kampus.

---

## 3. Product Definition

PRONOIA adalah platform kesehatan preventif digital yang membantu pengguna melalui 7 kapabilitas utama:

1. **Memahami Informasi Kesehatan:** Mengonversi data nutrisi, label produk, dan metriks tubuh menjadi pemahaman praktis.
2. **Melacak Kebiasaan Sehari-hari:** Mencatat pola tidur, hidrasi, nutrisi, dan aktivitas secara konsisten dengan friksi rendah.
3. **Mengidentifikasi Perubahan Perilaku:** Mendeteksi deviasi signifikan dari *baseline* pribadi sebelum menjadi masalah persisten.
4. **Memberikan Insight yang Dapat Dijelaskan:** Menyajikan wawasan berbasis bukti (*explainable*) tanpa vonis medis.
5. **Menjalankan Intervensi Terstruktur:** Menawarkan rekomendasi tindakan konkret dan tantangan (*challenges*) yang terukur.
6. **Mengevaluasi Efektivitas Tindakan:** Memantau apakah intervensi yang dijalankan benar-benar memperbaiki kebiasaan.
7. **Menghubungkan ke Pendamping Manusia:** Menyediakan akses konsultasi dengan Instructor saat pengguna membutuhkan arahan profesional.

> [!NOTE]
> **Premis Fundamental:**  
> Masalah kesehatan metabolik dan kebiasaan buruk tidak muncul secara tiba-tiba. Pola yang tidak sehat berkembang secara perlahan melalui pergeseran kecil dalam rutinitas harian. PRONOIA hadir untuk membantu pengguna mendeteksi perubahan tersebut sedini mungkin.

---

## 4. Product Vision

### Vision Statement
> *"To make preventive health more understandable, personalized, actionable, and accessible by turning everyday health data into meaningful insight and measurable behavior change."*

PRONOIA dirancang menjadi pendamping kesehatan pribadi (*personal health companion*) yang melampaui sekadar buku catatan digital (*passive tracker*). Platform ini memandu transformasi pengguna secara terukur:

```text
"I have health data"
        ↓
"I understand what changed"
        ↓
"I know what I can do next"
        ↓
"I can see whether the action actually helped"
```

---

## 5. Product Mission

### Mission Statement
> **"Membantu masyarakat mengenali perubahan perilaku yang tidak sehat lebih awal, serta mengambil tindakan preventif praktis sebelum pola tersebut berkembang menjadi masalah kesehatan yang persisten."**

Misi ini dieksekusi melalui rantai aksi sistematis:

```text
Observe → Understand → Detect Change → Explain → Intervene → Monitor → Escalate (Human Support) → Improve
```

---

## 6. The Core Product Idea

Gagasan sentral PRONOIA bukanlah sekadar membuat *"Chatbot AI penjawab pertanyaan kesehatan"*, melainkan:

> **Memanfaatkan data perilaku kesehatan longitudinal untuk mendeteksi perubahan personal yang bermakna, menjelaskan konteks perubahan tersebut, merekomendasikan intervensi terarah, dan mengukur apakah intervensi tersebut terbukti berhasil.**

AI hanyalah salah satu komponen pendukung dalam ekosistem ini, bukan keseluruhan produk.

---

## 7. Core Innovation

Inovasi utama yang membedakan PRONOIA dari aplikasi kesehatan lain adalah:

### Behavioral Health Loop (Siklus Pencegahan Tertutup)

Sistem mengintegrasikan berbagai kapabilitas mandiri ke dalam satu alur kerja berkelanjutan:

```text
User Profile
     ↓
Health Data (Tracker / Scanner)
     ↓
Personal Behavioral Baseline (30-day context)
     ↓
Behavioral Change Detection (Recent window deviation)
     ↓
Explainable Health Insight (Transparan & bebas vonis)
     ↓
Personalized Intervention (Tantangan & rencana aksi)
     ↓
Progress Monitoring (Evaluasi kepatuhan)
     ↓
Instructor Support (Validasi & eskalasi manusia)
     ↓
Measurable Outcome (Hasil nyata perubahan perilaku)
```

---

## 8. Why the Product Is Different

Banyak aplikasi kesehatan di pasar mampu menyediakan fitur-fitur berikut secara terpisah:
- Pencatat kalori / aktivitas,
- Pemindai makanan (*food scanner*),
- Chatbot AI,
- Reservasi konsultasi,
- Tantangan kebugaran & gamifikasi.

**Keunggulan PRONOIA terletak pada bagaimana kapabilitas tersebut berinteraksi:**

```text
Food Scan / Tracker Log
     ↓
Data Nutrisi & Aktivitas Masuk ke Timeline
     ↓
Mesin Perilaku Membandingkan dengan Baseline Pribadi
     ↓
Pola Perubahan Terdeteksi (Deviasi Signifikan)
     ↓
Insight Edukatif & Rekomendasi Terarah Dihasilkan
     ↓
Pengguna Bergabung dalam Tantangan Terukur
     ↓
Progress Dipantau dan Dievaluasi Bersama Instructor
```

Pengguna tidak merasakan fitur-fitur yang terisolasi, melainkan satu perjalanan preventif yang utuh dan koheren.

---

## 9. The Problem PRONOIA Addresses

### Problem 1 — Health Information Is Difficult to Interpret

Masyarakat modern dikelilingi oleh informasi gizi: label kemasan, daftar komposisi, klaim kesehatan, dan artikel nutrisi. Namun, ketersediaan informasi tidak otomatis menghasilkan pemahaman praktis. Pengguna kerap harus mencari manual, menerjemahkan istilah medis teknis, dan menebak relevansinya bagi tubuh mereka.

#### PRONOIA Response
Menghadirkan pemrosesan instan berbasis konteks:
```text
Scan Kemasan / Log → Informasi Terstruktur → Penjelasan Bahasa Sederhana → Relevansi Konteks Personal
```

---

## 10. Problem 2 — Users Often Notice Problems Too Late

Perubahan perilaku metabolik berlangsung secara bertahap dan sering kali tidak disadari secara sadar:

```text
Minggu 1: Tidur rata-rata 7.1 jam/hari
Minggu 2: Tidur rata-rata 6.8 jam/hari
Minggu 3: Tidur rata-rata 6.2 jam/hari
Minggu 4: Tidur rata-rata 5.8 jam/hari (Kelelahan kronis mulai terasa)
```

### PRONOIA Response
Membangun **Baseline Personal** (rata-rata bergerak 30 hari) dan membandingkan jendela perilaku terkini (7 hari) untuk mendeteksi tren penurunan sebelum pengguna mengalami keletihan ekstrem atau gangguan kesehatan.

---

## 11. Problem 3 — Generic Recommendations Do Not Fit Everyone

Saran kesehatan umum (*"minumlah 8 gelas air"* atau *"tidurlah 8 jam"*) mengabaikan variasi tujuan, tingkat aktivitas fisik, preferensi pola makan, riwayat alergi, dan ritme sirkadian masing-masing individu.

### PRONOIA Response
Menerapkan **Personalisasi Berbasis Konteks**:
```text
Profil Pengguna + Riwayat Pola Hidup + Sasaran Personal + Tren Deviasi Terkini = Panduan Tindakan Kontekstual
```

---

## 12. Problem 4 — Users Have Difficulty Maintaining Healthy Habits

Mengetahui kebiasaan yang baik tidak serta-merta mendorong tindakan nyata. Seseorang mungkin tahu bahwa ia kurang hidrasi, namun tetap lupa minum tanpa adanya pemicu perilaku yang terstruktur.

### PRONOIA Response
Mengubah rekomendasi pasif menjadi **Rencana Aksi & Tantangan Terukur**:
```text
Insight ("Hidrasi menurun 25%") → Rekomendasi Praktis → Tantangan 5 Hari → Progres Harian → Validasi Hasil
```

---

## 13. Problem 5 — AI Alone Is Not Enough

Meskipun model bahasa cerdas (LLM) dapat memberikan jawaban instan, AI tidak memiliki akuntabilitas emosional, penilaian klinis manusia, empati nyata, maupun kewenangan formal.

### PRONOIA Response
Mengadopsi model kolaborasi **Human-in-the-Loop**:
```text
AI Assistant (Pendamping Edukatif Tahap Pertama)
        ↓  [Bila Kompleksitas Meningkat / Diminta Pengguna]
Instructor Manusia (Review Klinis, Validasi Intervensi, & Konsultasi Langsung)
```

---

## 14. Problem 6 — Health Data Is Often Fragmented

Data kesehatan pengguna saat ini tersebar tak beraturan di berbagai tempat: aplikasi pencatat lari, catatan ponsel, tabel spreadsheet, hasil lab cetak, dan ingatan pribadi. Akibatnya, hubungan sebab-akibat antar-kebiasaan menjadi kabur.

### PRONOIA Response
Menyediakan **Health Timeline Terpadu** yang merajut seluruh peristiwa harian (makanan, tidur, aktivitas, hidrasi, insight, intervensi) ke dalam satu kronologi visual yang mudah dievaluasi.

---

## 15. Problem 7 — Tracking Without Feedback Has Limited Value

Aplikasi yang hanya mencatat data tanpa memberikan umpan balik cepat atau panduan tindak lanjut akan segera ditinggalkan pengguna karena terasa seperti pekerjaan administratif yang melelahkan.

### PRONOIA Response
Menekankan nilai tambah di setiap pencatatan:
```text
Track (Catat) → Analyze (Analisis) → Explain (Jelaskan) → Act (Beri Aksi) → Measure (Ukur Dampak)
```

---

## 16. Target User

PRONOIA dirancang untuk melayani masyarakat luas, dengan prioritas awal pada kelompok yang:
- Ingin memperbaiki rutinitas gaya hidup dan mencegah risiko metabolik sejak dini.
- Nyaman menggunakan aplikasi berbasis web/mobile dalam aktivitas sehari-hari.
- Membutuhkan ringkasan informasi gizi yang mudah dipahami tanpa jargon medis rumit.
- Menghargai panduan intervensi bertahap yang fleksibel dan tidak menghakimi.

---

## 17. Primary Persona — University Student

- **Profil:** Mahasiswa aktif (usia 18–24 tahun) dengan jadwal kuliah, tugas, dan aktivitas kampus yang padat.
- **Tantangan Khas:** Waktu tidur yang tidak teratur, sering mengonsumsi makanan cepat saji atau minuman manis tinggi gula, stres akademik, dan jarang berolahraga.
- **Kebutuhan Produk:** Pemindai makanan cepat (*smart scanner*) untuk mengecek kandungan gula/kalori jajanan kampus, asisten AI untuk konsultasi rutinitas praktis, serta pengingat hidrasi yang bersahabat.

---

## 18. Persona — Health-Conscious Young Adult

- **Profil:** Profesional muda atau pekerja kantoran yang sadar akan pentingnya menjaga kebugaran di tengah tuntutan kerja.
- **Tantangan Khas:** Gaya hidup sedenter (banyak duduk), kelelahan visual (*screen fatigue*), dan sulit konsisten menjalankan resolusi kesehatan.
- **Kebutuhan Produk:** Dashboard analitik yang bersih, visualisasi tren mingguan, serta tantangan terstruktur (*challenges*) untuk menjaga motivasi.

---

## 19. Persona — Instructor

- **Profil:** Instruktur kebugaran, konselor gaya hidup sehat, atau ahli gizi mitra PRONOIA.
- **Kebutuhan Utama:**
  - Ringkasan kondisi dan sinyal perilaku member yang didampingi (*member overview*).
  - Sistem pencatatan rencana intervensi dan tindak lanjut (*follow-up*).
  - Antarmuka manajemen jadwal dan riwayat konsultasi.
- **Prinsip:** Instructor tidak perlu membaca ribuan log mentah pengguna; PRONOIA menyajikan sinyal dan ringkasan tren yang telah diolah.

---

## 20. Persona — Admin

- **Profil:** Pengelola operasional platform PRONOIA.
- **Kebutuhan Utama:**
  - Manajemen akun pengguna dan alokasi instruktur.
  - Pengelolaan katalog tantangan dan konten edukasi.
  - Moderasi komunitas publik dan penanganan laporan pelanggaran.
  - Metrik agregat penggunaan sistem dan audit jejak operasional.
- **Prinsip:** Admin fokus pada kelancaran operasional platform, bukan interpretasi data medis personal pengguna.

---

## 21. User Value Proposition

PRONOIA memberikan nilai nyata melalui 5 pilar fungsional:

1. **Understand (Pahami):** Membantu pengguna menerjemahkan data nutrisi dan sinyal tubuh menjadi pemahaman logis.
2. **Detect (Deteksi):** Menyadarkan pengguna terhadap pergeseran kebiasaan harian melalui deteksi deviasi baseline.
3. **Act (Bertindak):** Menyediakan rekomendasi tindakan preventif dan tantangan mikro yang aplikatif.
4. **Measure (Ukur):** Memperlihatkan bukti nyata apakah kebiasaan membaik dari waktu ke waktu.
5. **Connect (Terhubung):** Menyediakan jembatan komunikasi ke pendamping manusia saat dibutuhkan.

---

## 22. Value Proposition Statement

> **"PRONOIA mentransformasikan data perilaku harian menjadi pemahaman yang jelas, rekomendasi tindakan personal, hasil yang terukur, dan akses pendampingan manusia profesional."**

---

## 23. Product Promise

PRONOIA berkomitmen secara transparan hanya pada hal-hal yang dapat dipertanggungjawabkan:

| ✅ Hal yang Dijanjikan Sistem | ❌ Hal yang TIDAK Dijanjikan |
| :--- | :--- |
| Visibilitas tren kebiasaan yang lebih transparan | Garansi mutlak pencegahan penyakit |
| Pemahaman nutrisi dan metriks tubuh yang mudah | Diagnosis medis atau identifikasi klinis penyakit |
| Rekomendasi tindakan preventif berbasis konteks | Peresepan atau penggantian instruksi dokter |
| Peningkatan kebiasaan melalui tantangan terukur | Janji kesembuhan instan tanpa bukti ilmiah |
| Akses cepat ke pendamping manusia (*Instructor*) | Penggantian peran fasilitas gawat darurat medis |

---

## 24. Core Product Loop

Siklus fundamental yang menjiwai seluruh keputusan perancangan fitur di PRONOIA:

```text
OBSERVE   → Catat data kesehatan pengguna (Scanner / Tracker / Log)
   ↓
UNDERSTAND → Olah dan kontekstualisasikan informasi ke Timeline
   ↓
DETECT    → Identifikasi deviasi signifikan dari Baseline Personal
   ↓
EXPLAIN   → Tampilkan bukti data dan alasan ilmiah tanpa menakuti
   ↓
INTERVENE → Berikan rekomendasi aksi konkret & tantangan terukur
   ↓
MONITOR   → Pantau kepatuhan dan dampak tindakan dari hari ke hari
   ↓
ESCALATE  → Hubungkan dengan Instructor manusia bila pola memburuk
   ↓
OUTCOME   → Ukur perbaikan perilaku nyata dan perbarui Baseline
```

---

## 25. Product Layers

Arsitektur PRONOIA dibangun di atas 5 lapisan yang saling menopang:

```text
┌────────────────────────────────────────────────────────┐
│  Layer 5: ENGAGEMENT (Badges, Gamifikasi, Membership) │
├────────────────────────────────────────────────────────┤
│  Layer 4: HUMAN SUPPORT (Instructor, Konsultasi)       │
├────────────────────────────────────────────────────────┤
│  Layer 3: INTERVENTION (Tantangan, Rencana Aksi)       │
├────────────────────────────────────────────────────────┤
│  Layer 2: INTELLIGENCE (Baseline, Sinyal, Skor, AI)    │
├────────────────────────────────────────────────────────┤
│  Layer 1: DATA (Profil, Tracker, Scanner, Timeline)    │
└────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> Fitur-fitur pada **Layer 5 (Engagement)** berfungsi sebagai pemicu motivasi untuk memperkuat Layer 1–4, bukan untuk menggantikan esensi pencegahan kesehatan itu sendiri.

---

## 26. Product Ecosystem

Interaksi menyeluruh ekosistem PRONOIA:

```text
                       PRONOIA PLATFORM
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    [LAYER DATA]     [LAYER INTELLIGENCE]   [HUMAN SUPPORT]
     Profil Member      Baseline Personal      Instructor
     Log Harian         Sinyal Deviasi         Konsultasi
     Smart Scanner      Insight Cerdas         Review Rencana
     Health Timeline    AI Guardrails          Follow-up
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                     [INTERVENSI TERARAH]
                    Tantangan & Rencana Aksi
                              │
                    [EVALUASI HASIL NYATA]
                  Perubahan Perilaku Terukur
```

---

## 27. Product Modules

Platform PRONOIA menyediakan antarmuka khusus untuk tiga kelompok pengguna utama:

### Member Module
- **Dashboard & Profil:** Ringkasan capaian harian, sasaran kesehatan, dan baseline.
- **Health Timeline:** Kronologi riwayat nutrisi, tidur, hidrasi, dan aktivitas fisik.
- **Smart Scanner & AI Assistant:** Pengenalan komposisi kemasan dan tanya-jawab preventif.
- **Intervensi & Komunitas:** Partisipasi tantangan, forum dukungan, dan tombol darurat.

### Instructor Module
- **Dashboard Member:** Daftar member yang dialokasikan beserta sinyal peringatan aktif.
- **Intervention Manager:** Pembuatan rencana pendampingan, catatan klinis, dan follow-up.
- **Consultation Scheduler:** Jadwal konsultasi dan riwayat interaksi tatap maya.

### Admin Module
- **Platform Overview:** Statistik agregat pengguna, retensi, dan aktivitas sistem.
- **User & Instructor Management:** Alokasi role dan verifikasi kredensial instruktur.
- **Content & Moderation:** Manajemen tantangan, moderasi postingan komunitas, dan audit log.

---

## 28. Scanner Positioning

Smart Scanner diposisikan sebagai **alat bantu identifikasi awal (*candidate identification*)**, bukan sebagai penentu mutlak kandungan kimia laboratorium. Pengguna selalu diberikan kendali untuk mengonfirmasi, mengoreksi, atau melengkapi hasil pindaian sebelum data disimpan ke Timeline.

---

## 29. AI Positioning

Asisten AI diposisikan sebagai **fasilitator edukasi preventif tingkat pertama**. AI tidak pernah menggantikan dokter, tidak boleh meresepkan obat, tidak boleh memvonis penyakit, dan wajib mengarahkan pengguna ke fasilitas medis atau Instructor bila mendeteksi gejala risiko tinggi.

---

## 30. Instructor Positioning

Instructor diposisikan sebagai **rekan pendamping manusia profesional (*human accountability partner*)**. Kehadirannya memberikan sentuhan empati, validasi rencana intervensi, dan bimbingan yang tidak dapat ditiru oleh algoritma semata.

---

## 31. Intervention Philosophy

Intervensi di PRONOIA harus selalu memenuhi 4 kriteria:
- **Praktis:** Mudah dijalankan dalam rutinitas sehari-hari tanpa perlengkapan rumit.
- **Bertahap:** Dimulai dari target mikro yang realistis (*micro-habits*).
- **Kontekstual:** Disesuaikan dengan preferensi makan, rutinitas, dan toleransi tubuh pengguna.
- **Terukur:** Memiliki parameter keberhasilan yang jelas untuk dievaluasi pada akhir periode.

---

## 32. Outcome Philosophy

Keberhasilan di PRONOIA diukur dari **konsistensi perbaikan perilaku nyata (*behavioral outcome*)**, bukan sekadar banyaknya angka atau grafik yang berhasil dicatat pengguna.

---

## 33. Explainability Philosophy

Setiap rekomendasi dan sinyal peringatan yang muncul di aplikasi wajib memaparkan dasar logikanya secara transparan kepada pengguna:
- Data apa yang mendasari munculnya sinyal tersebut.
- Berapa nilai deviasi yang terdeteksi dari baseline normal pengguna.
- Mengapa hal tersebut patut diperhatikan secara preventif.

---

## 34. Trust Model

Kepercayaan pengguna terhadap PRONOIA dibangun di atas 4 fondasi utama:

```text
Transparansi Sumber Data  +  Komunikasi Ketidakpastian  +  Privasi Tertutup  +  Pengawasan Manusia
```

Sistem secara terbuka mengakui tingkat keyakinan (*confidence level*) pada hasil pemindaian dan analisis data, tanpa berpura-pura tahu melampaui fakta yang tersedia.

---

## 35. Personalization Philosophy

Personalisasi sejati di PRONOIA bukan sekadar menyapa nama pengguna di dashboard, melainkan menyesuaikan ambang batas (*threshold*) analitik berdasarkan data historis pengguna itu sendiri, bukan memaksakan standar rata-rata populasi umum.

---

## 36. Progressive Personalization

Tingkat ketepatan personalisasi berkembang seiring waktu penggunaan:
- **Hari 1–3:** Berdasarkan data profil statis awal dan preferensi umum.
- **Hari 7–14:** Mulai mengadopsi ritme *baseline* tidur, hidrasi, dan aktivitas harian.
- **Hari 30+:** Mampu memprediksi pemicu stres kebiasaan dan menyajikan intervensi presisi tinggi.

---

## 37. Data Maturity Model

Maturitas pemahaman data pengguna bergerak dalam empat tingkatan:

```text
Level 1: Raw Logging (Pencatatan data mentah harian)
   ↓
Level 2: Baseline Established (Stabilitas pola kebiasaan terpetakan)
   ↓
Level 3: Deviation Awareness (Pengguna sadar saat terjadi pergeseran rutinitas)
   ↓
Level 4: Autonomous Habit Correction (Pengguna mandiri memperbaiki pola hidup)
```

---

## 38. Minimum Viable Personalization

Untuk dapat memberikan rekomendasi yang bermakna pada fase awal, sistem minimal memerlukan:
1. Sasaran kesehatan utama pengguna (*Health Goal*),
2. Catatan kebiasaan minimal 3–7 hari berturut-turut,
3. Riwayat batasan medis/alergi yang dilaporkan mandiri.

---

## 39. Product Trust Boundaries

PRONOIA secara tegas membatasi diri untuk **TIDAK PERNAH**:
- Menjual atau membagikan data rekam kebiasaan kesehatan ke pihak ketiga/pengiklan.
- Menyajikan konten promosi obat keras atau suplemen tanpa izin edar resmi.
- Mengakses sensor kamera atau lokasi secara diam-diam tanpa izin eksplisit pengguna.

---

## 40. Product Safety Boundary

Batas keselamatan kesehatan di PRONOIA bersifat mutlak:
- **Bukan Alat Diagnosis:** Dilarang menyatakan vonis penyakit apa pun.
- **Bukan Dokter AI:** Dilarang menginstruksikan perubahan dosis obat resep.
- **Bebas Halusinasi Medis:** AI wajib menolak pertanyaan klinis berat dan mengarahkan ke tenaga medis profesional.

---

## 41. Emergency Feature Position

Fitur darurat (tombol panggil Ambulan 119) dirancang sebagai **jalur pintas keselamatan murni**. Fitur ini bekerja secara instan tanpa bergantung pada pemrosesan server AI, tanpa menunggu respons analisis perilaku, dan dapat diakses dengan sekali sentuh saat situasi darurat terjadi.

---

## 42. Community Position

Forum komunitas PRONOIA diposisikan sebagai wadah berbagi motivasi positif antar-pengguna dalam menyelesaikan tantangan gaya hidup sehat. Komunitas diawasi secara ketat agar tidak berubah menjadi ajang debat medis atau konsultasi kesehatan ilegal.

---

## 43. Gamification Position

Elemen gamifikasi (poin, lencana, level) dirancang untuk memberikan penguatan positif (*positive reinforcement*). Gamifikasi tidak boleh bersifat menghukum (*non-punitive*), tidak boleh memicu kecemasan saat streak terputus, dan tidak boleh mendorong perilaku ekstrem demi mengejar skor.

---

## 44. Membership Position

Tingkatan keanggotaan (Membership Tiers) adalah pembeda tingkat aksesibilitas layanan tambahan (seperti frekuensi konsultasi Instructor atau analitik lanjutan), **bukan status pembeda derajat kesehatan pengguna**.

---

## 45. Product Business Model

Model keberlanjutan bisnis PRONOIA bertumpu pada skema Freemium yang etis:

### Free Tier (Akses Fundamental)
- Pencatatan tracker harian tanpa batas.
- Pembuatan baseline personal dan pengenalan smart scanner dasar.
- Partisipasi tantangan kesehatan komunitas publik.
- Akses penuh tombol darurat Ambulan 119.

### Premium Tier (Pendampingan Intensif)
- Sesi konsultasi berkala dengan Instructor manusia.
- Analitik tren lanjutan dan integrasi laporan komprehensif.
- Rekomendasi rencana aksi yang disesuaikan langsung oleh pakar gizi.

---

## 46. Product Retention Strategy

Retensi pengguna dibangun melalui penciptaan nilai nyata yang dirasakan (*perceived value*):
- Pengguna merasa terbantu karena memahami sinyal tubuh mereka.
- Adanya rasa pencapaian saat menyelesaikan tantangan 7 hari.
- Kehadiran pendamping manusia nyata yang peduli pada kemajuan kesehatan mereka.

PRONOIA secara sadar menolak taktik retensi manipulatif seperti spam notifikasi berulang atau pesan yang menakut-nakuti pengguna (*fear-based engagement*).

---

## 47. Product Success Definition

PRONOIA dinyatakan sukses apabila mampu membawa pengguna bertransformasi:

```text
"Saya tidak sadar apa yang berubah dari tubuh saya"
                       ↓
"Saya melihat ada pola tidur dan gula yang bergeser minggu ini"
                       ↓
"Saya paham mengapa hal ini berdampak pada energi saya"
                       ↓
"Saya tahu aksi preventif konkret apa yang harus saya lakukan"
                       ↓
"Saya melihat bukti bahwa pola kebiasaan saya kembali membaik"
```

---

## 48. Primary Product Outcomes

Enam dimensi hasil utama yang ditargetkan oleh produk:

1. **Awareness (Kesadaran):** Pengguna mengenali pola dan pemicu kebiasaan mereka.
2. **Actionability (Keterlaksanaan):** Rekomendasi yang diberikan mudah diwujudkan seketika.
3. **Consistency (Konsistensi):** Terjaganya rutinitas hidup sehat dalam jangka panjang.
4. **Personalization (Relevansi):** Saran semakin akurat seiring bertambahnya data.
5. **Support (Dukungan):** Pengguna merasa aman karena didampingi oleh profesional.
6. **Measurement (Keterukuran):** Ada metrik nyata untuk membuktikan perbaikan kebiasaan.

---

## 49. Product Metrics

Pengukuran keberhasilan operasional sistem dipetakan ke dalam 5 kategori:

| Kategori Metrik | Indikator Kunci |
| :--- | :--- |
| **Activation** | Tingkat kelengkapan profil, log data pertama, scan pertama, insight pertama dilihat. |
| **Engagement** | Weekly Active Users (WAU), konsistensi pencatatan mingguan, partisipasi tantangan. |
| **Intervention** | Tingkat adopsi rekomendasi, penyelesaian tantangan (*completion rate*). |
| **Outcome** | Tren perbaikan deviasi perilaku, pemulihan baseline, evaluasi berkala Instructor. |
| **Support** | Volume reservasi konsultasi, tingkat kehadiran, kepuasan terhadap pendampingan. |

---

## 50. Metrics Are Not Medical Outcomes

Metrik perangkat lunak (seperti *streak completion* atau *Health Behavior Score*) adalah indikator kepatuhan rutinitas digital. Metrik tersebut **bukan bukti klinis sembuhnya suatu penyakit** dan tidak boleh dipromosikan sebagai klaim kesembuhan medis.

---

## 51. North Star Metric

Metrik pemandu utama (*North Star Metric*) PRONOIA adalah:

### ⭐ Completed Preventive Health Loops

> **Definisi:** Jumlah siklus penuh pencegahan yang berhasil dituntaskan pengguna:  
> `Perubahan Terdeteksi → Insight Dipahami → Intervensi Dijalankan → Hasil Terukur Dievaluasi`.

---

## 52. Secondary Metrics

- Rata-rata hari aktif pencatatan per minggu (*Logging Frequency*).
- Rasio konversi dari insight menuju pengambilan tindakan preventif (*Insight-to-Action Rate*).
- Tingkat retensi pengguna pada siklus 30 hari (*30-Day Cohort Retention*).
- Rasio penyelesaian konsultasi bersama Instructor (*Consultation Fulfillment Rate*).

---

## 53. Product Anti-Goals

Untuk menjaga kemurnian visi, PRONOIA secara sadar **menolak** menjadi:

- ❌ **A Generic Chatbot:** Sekadar chatbot obrolan kosong tanpa integrasi data longitudinal pengguna.
- ❌ **A Generic Tracker:** Gudang penimbun angka statistik tanpa analisis makna dan tindak lanjut.
- ❌ **A Food Scanner Only:** Pemindai kalori instan yang melupakan tren kebiasaan jangka panjang.
- ❌ **A Medical Diagnosis Tool:** Aplikasi yang lancang memvonis penyakit tanpa lisensi klinis.
- ❌ **A Pure Social Network:** Ruang media sosial terbuka yang mengorbankan privasi data kesehatan.
- ❌ **A Toxic Gamified Fitness App:** Sistem adiktif yang menghukum pengguna saat melewatkan satu hari pencatatan.

---

## 54. Competitive Differentiation

Diferensiasi PRONOIA di pasar dibuktikan secara nyata melalui arsitektur perangkat lunak:

```text
Aplikasi Lain:  Catat Data Mentah  ──→  Pengguna Harus Menganalisis Sendiri
PRONOIA:        Data Mentah  ──→  Baseline  ──→  Deviasi  ──→  Insight  ──→  Intervensi  ──→  Evaluasi
```

Keunggulan kami terletak pada **alur pencegahan yang utuh dan tertutup (*closed-loop execution*)**, bukan klaim kecerdasan buatan yang berlebihan.

---

## 55. Competition Narrative

Narasi utama PRONOIA di hadapan publik dan dewan juri kompetisi:

> *"Aplikasi kesehatan saat ini sangat pandai mengumpulkan data, namun membiarkan pengguna kebingungan mengartikan maknanya. PRONOIA hadir merajut seluruh rantai: dari deteksi dini kebiasaan, penjelasan yang mudah dipahami, tindakan preventif terukur, hingga pendampingan manusia nyata."*

---

## 56. Product Demonstration Story

Skenario demonstrasi ideal PRONOIA berfokus pada perjalanan seorang mahasiswa:

```text
Mahasiswa Aktif (Merasa Sehat)
     ↓  [Hari 1–7]
Melakukan log tidur dan makanan → Baseline personal terbentuk (Tidur rata-rata 7 jam)
     ↓  [Hari 14]
Tidur merosot ke 5.5 jam & konsumsi gula meningkat karena tugas kuliah
     ↓
PRONOIA mendeteksi deviasi perilaku & menyajikan Insight yang transparan
     ↓
Asisten AI menjelaskan risiko penurunan energi tanpa bahasa yang menakut-nakuti
     ↓
Mahasiswa memilih Tantangan 7 Hari "Atur Ulang Jam Tidur"
     ↓  [Hari 21]
Perilaku membaik, hasil tercatat di Timeline, dan Instructor memvalidasi progres
```

---

## 57. Product Architecture Relationship

Hubungan keselarasan antara visi produk dan arsitektur rekayasa perangkat lunak:

```text
[Lapisan Visi Produk]                          [Lapisan Rekayasa Teknis]
Member Profile & Input           ──────→       Frontend UI (Inertia.js React)
       ↓                                              ↓
Health Data & Scanner            ──────→       RESTful API Endpoints (/api/v1)
       ↓                                              ↓
Behavior Engine & Baseline       ──────→       Application Service & Actions
       ↓                                              ↓
Explainable Insight & AI         ──────→       Domain Logic & AI Guardrails
       ↓                                              ↓
Intervention & Instructor        ──────→       MySQL Database & Relational Schema
```

---

## 58. Product Principles

Delapan prinsip emas yang memandu setiap pengembangan fitur di PRONOIA:

1. **Prevention before intervention:** Prioritaskan pencegahan sebelum intervensi drastis diperlukan.
2. **Personal baseline before generic judgment:** Bandingkan pengguna dengan rekam jejak dirinya sendiri, bukan populasi umum.
3. **Evidence before assertion:** Sajikan bukti data sebelum memberikan kesimpulan wawasan.
4. **Explanation before recommendation:** Jelaskan latar belakang alasan sebelum menyarankan tindakan.
5. **Measurement after intervention:** Ukur dampak nyata setelah rencana aksi selesai dijalankan.
6. **Human support when automation reaches its boundary:** Libatkan manusia saat otomasi mencapai ambang batasnya.
7. **Privacy before unnecessary data collection:** Jangan mengumpulkan data yang tidak relevan dengan kebutuhan kesehatan preventif.
8. **Safety before engagement:** Keselamatan pengguna mutlak lebih penting daripada metriks retensi digital.

---

## 59. Long-Term Vision

Dalam jangka panjang, PRONOIA bercita-cita menjadi ekosistem pencegahan kesehatan komprehensif yang menghubungkan pengguna dengan perangkat wearable pintar, database nutrisi regional, serta program kesehatan kampus dan institusi kerja.

---

## 60. Potential University Use Case

Kasus penerapan strategis: **Program Kesejahteraan Mahasiswa Kampus (*University Student Wellness*)**:
- Kampus menyelenggarakan kampanye hidup sehat melalui tantangan kelompok di PRONOIA.
- Konselor atau dokter kampus bertindak sebagai Instructor yang mendampingi mahasiswa.
- Pihak universitas menerima laporan analitik agregat yang teranonimisasi penuh untuk mengevaluasi tingkat stres dan kelelahan mahasiswa selama masa ujian.

---

## 61. Institutional Use Case

Selain universitas, PRONOIA dirancang fleksibel untuk diadopsi oleh program kesehatan korporat (*corporate wellness*) dan komunitas pencegahan metabolik perkotaan dengan prinsip perlindungan privasi individu yang tetap terjaga utuh.

---

## 62. Product Expansion Principle

Setiap ide penambahan modul baru wajib lulus evaluasi 7 pertanyaan kelayakan:
1. *Apakah fitur ini menyelesaikan masalah nyata pengguna?*
2. *Apakah fitur ini memperkuat siklus pencegahan preventif?*
3. *Apakah fitur ini meningkatkan ketepatan personalisasi?*
4. *Apakah hasilnya dapat diukur secara konkret?*
5. *Apakah fitur ini mendukung kehadiran pendamping manusia?*
6. *Apakah privasi pengguna tetap terlindungi secara aman?*
7. *Apakah batasan keselamatan klinis tetap terjaga?*

Bila salah satu jawaban bernilai negatif, fitur tersebut ditolak dari lingkup inti produk.

---

## 63. Product Scope

Matriks ruang lingkup pengembangan sistem:

| Kategori | Fitur & Modul |
| :--- | :--- |
| **Core (MVP Wajib)** | Auth, Health Profile, Health Metrics, Health Timeline, Smart Scanner, Behavioral Engine, Insights, Recommendations, Interventions, Progress Tracking, AI Assistant, Instructor Dashboard, Konsultasi. |
| **Supporting (Penyokong)** | Challenges, Gamifikasi (Points/Badges), Membership Tiers, Komunitas, Push Notifications, Emergency 119 Shortcut. |
| **Future (Masa Depan)** | Integrasi Perangkat Wearables, API Lab Eksternal, Program Institusional Kampus Lanjutan, Analitik Longitudinal Multi-Tahun. |

---

## 64. MVP Product Definition

PRONOIA MVP dinyatakan berhasil membuktikan nilai produknya apabila skenario ini berjalan mulus tanpa cela:

> **Pengguna dapat mencatat data kebiasaan, PRONOIA mampu menyusun baseline personal, mendeteksi pergeseran perilaku yang signifikan, menjelaskan deviasi tersebut secara jernih, merekomendasikan rencana aksi terukur, memantau kemajuannya, serta membuka akses pendampingan manusia profesional bila dibutuhkan.**

---

## 65. MVP Success Scenario

Alur 11 langkah verifikasi kesuksesan MVP:

```text
1. Registrasi & pengisian profil awal
        ↓
2. Pencatatan metriks kesehatan harian
        ↓
3. Pembentukan baseline personal 7 hari
        ↓
4. Pergeseran kebiasaan terjadi secara alami
        ↓
5. Mesin perilaku mendeteksi deviasi
        ↓
6. Kartu Insight memaparkan temuan secara transparan
        ↓
7. Rekomendasi tindakan disarankan
        ↓
8. Pengguna mengaktifkan rencana intervensi
        ↓
9. Pencatatan kepatuhan harian berjalan
        ↓
10. Hasil evaluasi perbaikan perilaku terbit
        ↓
11. Instructor meninjau dan memberikan catatan pendampingan
```

---

## 66. Product Quality Standard

Fitur PRONOIA berkualitas tinggi wajib memenuhi kriteria:
- **Berguna (Useful):** Menyelesaikan friksi nyata pengguna.
- **Dapat Dimengerti (Understandable):** Menggunakan bahasa manusia yang lugas dan bersahabat.
- **Aman (Safe):** Patuh pada protokol klinis non-diagnostik.
- **Dapat Dijelaskan (Explainable):** Terbuka mengenai formula dan data pendukung.
- **Personal:** Relevan dengan keunikan gaya hidup pengguna.
- **Terukur (Measurable):** Memiliki bukti hasil yang dapat diverifikasi.

---

## 67. Product Trust Standard

Kepercayaan pengguna adalah aset termahal PRONOIA. Kami menjaganya dengan memastikan bahwa:
- Setiap angka yang disajikan memiliki sumber pencatatan yang jelas.
- Asisten AI tidak pernah berbohong atau mengarang riwayat kesehatan.
- Data pengguna tersimpan dengan enkripsi dan hak kontrol privasi penuh di tangan pengguna.

---

## 68. Product Language

### ✅ Terminologi Baku yang Dianjurkan
- *Perilaku kesehatan (health behavior)*
- *Pola kebiasaan (behavioral pattern)*
- *Sinyal perilaku (behavioral signal)*
- *Wawasan kesehatan (health insight)*
- *Rencana intervensi (intervention plan)*
- *Panduan preventif (preventive guidance)*
- *Baseline personal (personal baseline)*
- *Pendampingan instruktur (instructor support)*

### ❌ Terminologi yang Dilarang
- *Diagnosis klinis (clinical diagnosis)*
- *Detektor penyakit (disease detector)*
- *Dokter kecerdasan buatan (AI doctor)*
- *Penyembuhan terjamin (guaranteed cure)*
- *Skor keparahan penyakit (disease score)*

---

## 69. Product Emotional Tone

PRONOIA bersuara dan berinteraksi dengan nada:
> **Mendukung, Cerdas, Tenang, Proaktif, dan Terpercaya.**

PRONOIA pantang bersuara dengan nada:
> Menghakimi, menakut-nakuti, invasif, terlalu klinis, atau manipulatif.

---

## 70. User Relationship

Hubungan antara PRONOIA dan penggunanya adalah kemitraan setara:
> **PRONOIA adalah sahabat cerdas yang mendampingi perjalanan gaya hidup sehat Anda, bukan dokter pengganti di rumah sakit.**

---

## 71. Final Product Vision

PRONOIA hadir untuk menutup jurang pemisah antara **Data Kesehatan Mentah** dan **Tindakan Pencegahan Nyata**:

```text
DATA KESEHATAN
      ↓
PEMAHAMAN KONTEKS
      ↓
KESADARAN PERSONAL
      ↓
PERUBAHAN PERILAKU
      ↓
INTERVENSI TERARAH
      ↓
HASIL TERUKUR
      ↓
DUKUNGAN MANUSIA
```

Kami mengubah paradigma kesehatan preventif dari:
> *"Kumpulkan data Anda sebanyak-banyaknya dan simpulkan sendiri maknanya."*

Menjadi:
> *"Pahami apa yang berubah dari tubuh Anda, ketahui aksi konkret apa yang harus dilakukan, dan buktikan sendiri apakah tindakan tersebut benar-benar membantu."*

---

## 72. North Star Statement

> **"PRONOIA membantu masyarakat melihat perubahan bermakna dalam perilaku kesehatan sehari-hari lebih awal, memahami mengapa perubahan tersebut penting, mengambil tindakan preventif praktis, mengukur hasil nyatanya, dan terhubung dengan pendamping manusia saat dibutuhkan."**

*Pernyataan ini adalah kompas pemandu abadi bagi setiap keputusan fitur, arsitektur perangkat lunak, dan pengembangan ekosistem PRONOIA.*
