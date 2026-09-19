# AEVYRA — Documentation Index

> **Peta Navigasi & Indeks Dokumentasi Resmi AEVYRA**  
> Panduan terpadu untuk memahami arsitektur produk, spesifikasi teknis, model kecerdasan perilaku, batasan keselamatan medis, dan strategi implementasi sistem.

---

## 1. Purpose

Dokumen ini berfungsi sebagai **peta navigasi utama (master navigation index)** untuk seluruh dokumentasi produk dan rekayasa perangkat lunak AEVYRA.

Direktori `docs/` merumuskan secara komprehensif:

- **Product Vision:** Identitas strategis, tujuan, proposisi nilai, dan diferensiasi produk.
- **User Problems & Personas:** Profil pengguna, tantangan perilaku, dan *jobs-to-be-done*.
- **Product Features:** Inventaris fungsional seluruh modul bagi Member, Instructor, dan Admin.
- **User Journeys:** Alur pengalaman pengguna dari hulu ke hilir (*end-to-end*).
- **Behavioral Intelligence:** Arsitektur *baseline*, deteksi deviasi kebiasaan, dan skoring kesehatan.
- **AI Assistant:** Orkestrasi model bahasa, batas keamanan, *prompting*, dan mekanisme *fallback*.
- **Operations & Support:** Alur kerja Instructor, konsultasi, intervensi, dan administrasi platform.
- **Data Model:** Entitas basis data, relasi relasional, kepemilikan data, dan auditabilitas.
- **API Contracts:** Spesifikasi antarmuka RESTful, struktur request/response, dan penanganan error.
- **Security & Privacy:** Klasifikasi data sensitif, enkripsi, kendali akses, dan retensi data.
- **Health Safety:** Batasan non-diagnostik, kepatuhan medis, mitigasi risiko, dan alur darurat.
- **UX/UI Design:** Desain antarmuka, hierarki visual, micro-interactions, dan pola interaksi PWA.
- **Gamification & Membership:** Sistem poin, badge, streak, tantangan, dan tier keanggotaan.
- **MVP Roadmap:** Prioritas peluncuran bertahap dari fondasi hingga kesiapan kompetisi.
- **Testing & Acceptance:** Kriteria penerimaan fungsional, pengujian keselamatan, dan verifikasi loop.

> [!NOTE]
> **Inti Peran `docs/`:** 
> Direktori ini mendefinisikan **apa yang dibangun oleh AEVYRA dan mengapa hal tersebut dibangun (*What & Why*)**.  
> Direktori ini **tidak menggantikan** [`AGENTS.md`](../AGENTS.md) (pedoman kerja agen workspace) maupun [`.agents/rules/`](../.agents/rules/) (aturan arsitektur dan batasan teknis kode). Kedua instrumen tersebut mengatur *bagaimana agen dan developer mengeksekusi kode (*How*)*.

---

## 2. Documentation Hierarchy

Dokumentasi repositori AEVYRA distrukturkan ke dalam tiga lapisan hierarki yang saling melengkapi:

```text
AGENTS.md
     ↓  [Instruksi Utama Workspace]
.agents/
     ↓  [Aturan Teknis Kode & Agen Spesialis]
docs/
     ↓  [Spesifikasi Produk, Domain & Arsitektur]
Application Code
```

### 1. `AGENTS.md` (Workspace-Wide Instructions)
Mengatur:
- Pedoman perilaku agen kecerdasan buatan di tingkat workspace.
- Prinsip-prinsip mutlak yang tidak boleh dilanggar (*non-negotiable principles*).
- Batas keamanan global dan penanganan data sensitif.
- Standar alur kerja pengembangan dan verifikasi.

### 2. `.agents/` (Agent Behavior & Technical Rules)
Mengatur:
- Agen-agen spesialis (`health-architect`, `health-safety`).
- Aturan arsitektur (`01-architecture.md`).
- Aturan keamanan (`02-security.md`).
- Aturan keselamatan kesehatan (`03-health-safety.md`).
- Aturan rekayasa teknis: Frontend (`04-frontend.md`), Backend (`05-backend.md`), Database (`06-database.md`), API (`07-api.md`), Testing (`08-testing.md`), dan PWA (`09-pwa.md`).

### 3. `docs/` (Product & Technical Specifications)
Mengatur:
- Definisi visi produk dan lanskap kompetitif.
- Spesifikasi detail fitur dan perilaku pengguna.
- Logika mesin kecerdasan perilaku (*Health Behavior Engine*).
- Struktur data domain, kontrak API, dan peta jalan rilis.

---

## 3. Document Reading Strategy

Untuk mengoptimalkan efisiensi kerja agen dan developer, **hindari membaca seluruh dokumen sekaligus**. Bacalah dokumen yang relevan sesuai dengan konteks tugas yang sedang dikerjakan:

| Fokus Pekerjaan | Dokumen Rekomendasi Utama | Dokumen Pendukung |
| :--- | :--- | :--- |
| **Product Planning & Strategy** | [`01-product-vision.md`](01-product-vision.md), [`02-problem-and-users.md`](02-problem-and-users.md) | [`03-core-features.md`](03-core-features.md), [`14-mvp-roadmap.md`](14-mvp-roadmap.md) |
| **Feature Development** | [`03-core-features.md`](03-core-features.md), [`04-user-journeys.md`](04-user-journeys.md) | Dokumen domain teknis terkait |
| **Behavioral Intelligence** | [`05-health-behavior-engine.md`](05-health-behavior-engine.md), [`06-ai-assistant.md`](06-ai-assistant.md) | [`08-data-model.md`](08-data-model.md), [`11-health-safety.md`](11-health-safety.md), [`15-testing-acceptance.md`](15-testing-acceptance.md) |
| **AI Assistant Development** | [`05-health-behavior-engine.md`](05-health-behavior-engine.md), [`06-ai-assistant.md`](06-ai-assistant.md) | [`11-health-safety.md`](11-health-safety.md), [`08-data-model.md`](08-data-model.md), [`09-api-contracts.md`](09-api-contracts.md) |
| **Instructor & Admin Workflows** | [`03-core-features.md`](03-core-features.md), [`07-instructor-admin.md`](07-instructor-admin.md) | [`04-user-journeys.md`](04-user-journeys.md), [`08-data-model.md`](08-data-model.md), [`10-security-privacy.md`](10-security-privacy.md) |
| **Database Engineering** | [`03-core-features.md`](03-core-features.md), [`08-data-model.md`](08-data-model.md) | [`05-health-behavior-engine.md`](05-health-behavior-engine.md), [`.agents/rules/06-database.md`](../.agents/rules/06-database.md) |
| **API Contract & Backend** | [`08-data-model.md`](08-data-model.md), [`09-api-contracts.md`](09-api-contracts.md) | [`10-security-privacy.md`](10-security-privacy.md), [`11-health-safety.md`](11-health-safety.md), [`.agents/rules/07-api.md`](../.agents/rules/07-api.md) |
| **Frontend, UI & PWA** | [`03-core-features.md`](03-core-features.md), [`04-user-journeys.md`](04-user-journeys.md), [`12-ux-ui.md`](12-ux-ui.md) | [`11-health-safety.md`](11-health-safety.md), [`.agents/rules/04-frontend.md`](../.agents/rules/04-frontend.md), [`.agents/rules/09-pwa.md`](../.agents/rules/09-pwa.md) |
| **Competition Review & Demo** | [`01-product-vision.md`](01-product-vision.md), [`05-health-behavior-engine.md`](05-health-behavior-engine.md) | [`03-core-features.md`](03-core-features.md), [`14-mvp-roadmap.md`](14-mvp-roadmap.md), [`15-testing-acceptance.md`](15-testing-acceptance.md) |

---

## 4. Document List

Katalog lengkap 16 dokumen spesifikasi AEVYRA (`docs/00` hingga `docs/15`):

| Kode | Berkas Dokumen | Domain Utama | Fokus Pertanyaan Kunci |
| :---: | :--- | :--- | :--- |
| **00** | [`00-index.md`](00-index.md) | **Navigation Index** | *Bagaimana struktur dan navigasi dokumentasi proyek?* |
| **01** | [`01-product-vision.md`](01-product-vision.md) | **Product Strategy** | *Mengapa AEVYRA ada dan apa inovasi utamanya?* |
| **02** | [`02-problem-and-users.md`](02-problem-and-users.md) | **User Research** | *Masalah siapa yang sedang kita selesaikan?* |
| **03** | [`03-core-features.md`](03-core-features.md) | **Functional Specs** | *Apa saja kapabilitas konkret yang disediakan aplikasi?* |
| **04** | [`04-user-journeys.md`](04-user-journeys.md) | **Experience Flow** | *Bagaimana alur pengguna dari awal hingga akhir?* |
| **05** | [`05-health-behavior-engine.md`](05-health-behavior-engine.md) | **Core Intelligence** | *Bagaimana data perilaku diubah menjadi aksi preventif?* |
| **06** | [`06-ai-assistant.md`](06-ai-assistant.md) | **AI Engineering** | *Di mana, kapan, dan bagaimana AI dimanfaatkan secara aman?* |
| **07** | [`07-instructor-admin.md`](07-instructor-admin.md) | **Operations** | *Bagaimana operator manusia (Instructor/Admin) berinteraksi?* |
| **08** | [`08-data-model.md`](08-data-model.md) | **Data Architecture** | *Entitas data apa saja yang ada dan bagaimana relasinya?* |
| **09** | [`09-api-contracts.md`](09-api-contracts.md) | **API Design** | *Bagaimana antarmuka komunikasi antara frontend dan backend?* |
| **10** | [`10-security-privacy.md`](10-security-privacy.md) | **Security & Privacy** | *Bagaimana privasi dan kerahasiaan data pengguna dilindungi?* |
| **11** | [`11-health-safety.md`](11-health-safety.md) | **Clinical Safety** | *Bagaimana sistem menjaga batasan non-diagnostik & aman?* |
| **12** | [`12-ux-ui.md`](12-ux-ui.md) | **Interface Standards** | *Bagaimana sistem terasa dan berinteraksi secara visual?* |
| **13** | [`13-gamification-membership.md`](13-gamification-membership.md) | **Engagement** | *Bagaimana menjaga retensi kebiasaan sehat secara berkelanjutan?* |
| **14** | [`14-mvp-roadmap.md`](14-mvp-roadmap.md) | **Delivery Roadmap** | *Apa yang wajib dibangun lebih dulu menuju MVP kompetisi?* |
| **15** | [`15-testing-acceptance.md`](15-testing-acceptance.md) | **Verification** | *Bagaimana membuktikan bahwa sistem berfungsi secara benar & aman?* |

---

## 5. Product Documentation

Lapisan ini mendefinisikan identitas strategis, target audiens, dan seluruh kapabilitas aplikasi:

### 01 — Product Vision
- **File:** [`01-product-vision.md`](01-product-vision.md)
- **Pertanyaan Kunci:** *"Why does AEVYRA exist?"*
- **Tujuan:** Menetapkan arah strategis, proposisi nilai, dan narasi pembeda AEVYRA di pasar kesehatan preventif digital.
- **Ruang Lingkup:** Visi, misi, positioning, value proposition, inovasi inti (*Behavioral Health Loop*), filosofi produk, dan peta jalan jangka panjang.

### 02 — Problem and Users
- **File:** [`02-problem-and-users.md`](02-problem-and-users.md)
- **Pertanyaan Kunci:** *"Whose problem are we solving?"*
- **Tujuan:** Memetakan akar masalah perilaku kesehatan masyarakat serta menganalisis kebutuhan dan karakteristik pengguna.
- **Ruang Lingkup:** Problem statement, akar penyebab fragmentasi data, persona utama (Member, Mahasiswa, Pekerja Muda, Instructor, Admin), pain points, dan *Jobs-to-be-Done (JTBD)*.

### 03 — Features
- **File:** [`03-core-features.md`](03-core-features.md)
- **Pertanyaan Kunci:** *"What does AEVYRA actually do?"*
- **Tujuan:** Menyajikan katalog spesifikasi lengkap seluruh fitur untuk setiap role pengguna.
- **Ruang Lingkup:**
  - **Member:** Authentication, Health Profile, Dashboard, Health Timeline, Tracker, Smart Scanner, AI Assistant, Insights, Rekomendasi, Intervensi, Tantangan, Konsultasi, Komunitas, Badge, Membership, Darurat.
  - **Instructor:** Dashboard Operasional, Monitoring Member, Behavioral Signals, Review Intervensi, Konsultasi & Catatan, Laporan.
  - **Admin:** User Management, Instructor Assignment, Moderasi Komunitas, Challenge Management, Audit Trail, Pengaturan Platform.

---

## 6. User Journey Documentation

### 04 — User Journeys
- **File:** [`04-user-journeys.md`](04-user-journeys.md)
- **Pertanyaan Kunci:** *"How does a user experience the product from beginning to end?"*
- **Tujuan:** Menjabarkan skenario alur perjalanan pengguna secara menyeluruh (*step-by-step*).
- **Alur Utama:**
  - Member Onboarding & Progressive Profiling
  - Quick Food Scan → Analisis Nutrisi → Timeline
  - Logging Kebiasaan Sehari-hari (Tidur, Aktivitas, Hidrasi)
  - Deteksi Deviasi Perilaku & Pemaparan Insight
  - Partisipasi Tantangan Kesehatan (Challenge)
  - Konsultasi Asisten AI & Eskalasi ke Instructor Manusia
  - Akses Cepat Tombol Darurat Ambulan 119
  - Alur Kerja Pendampingan Instructor & Supervisi Admin

---

## 7. Intelligence Documentation

Lapisan kecerdasan yang menjadi diferensiasi inovasi utama AEVYRA:

### 05 — Health Behavior Engine
- **File:** [`05-health-behavior-engine.md`](05-health-behavior-engine.md)
- **Pertanyaan Kunci:** *"How does AEVYRA turn health behavior data into meaningful preventive action?"*
- **Tujuan:** Mendefinisikan algoritma analitik perilaku personal dan pembentukan siklus preventif tertutup (*closed-loop*).
- **Alur Data Mesin:**
  ```text
  Data Mentah → Normalisasi → Baseline Pribadi → Window Analisis → Deviasi → Sinyal Perilaku → Insight → Intervensi → Evaluasi Hasil
  ```
- **Ruang Lingkup:** Logika baseline personal, metriks deviasi, confidence scoring, explainability, skoring perilaku sehat, dan pemetaan intervensi.

### 06 — AI Assistant
- **File:** [`06-ai-assistant.md`](06-ai-assistant.md)
- **Pertanyaan Kunci:** *"Where and how should AI be used?"*
- **Tujuan:** Mengatur integrasi asisten generatif cerdas berbasis konteks riwayat pengguna dengan pagar pembatas klinis yang ketat.
- **Ruang Lingkup:** Konstruksi prompt berpagar (*system safety guardrails*), ekstraksi konteks personal, abstraksi provider AI, format output terstruktur, mitigasi halusinasi, dan mekanisme *fallback* saat AI offline.

---

## 8. Human Support Documentation

### 07 — Instructor and Admin
- **File:** [`07-instructor-admin.md`](07-instructor-admin.md)
- **Pertanyaan Kunci:** *"How do human operators interact with the system?"*
- **Tujuan:** Menjamin kehadiran manusia profesional dalam ekosistem kesehatan digital tanpa membiarkan AI bertindak tanpa pengawasan.
- **Ruang Lingkup:** Relasi pendampingan Member–Instructor, jadwal dan reservasi konsultasi, tinjauan rencana intervensi, pencatatan klinis aman, supervisi administratif, dan moderasi konten.

---

## 9. Technical Documentation

Spesifikasi fondasi teknis rekayasa perangkat lunak:

### 08 — Data Model
- **File:** [`08-data-model.md`](08-data-model.md)
- **Pertanyaan Kunci:** *"What data does AEVYRA need and how is it related?"*
- **Tujuan:** Mendefinisikan skema basis data konseptual, entitas, atribut, dan relasi referensial.
- **Entitas Inti:** `User`, `Role`, `HealthProfile`, `HealthMetric`, `FoodLog`, `Scan`, `ScanResult`, `BehaviorBaseline`, `BehaviorSignal`, `HealthInsight`, `InterventionPlan`, `InterventionProgress`, `Challenge`, `ChallengeParticipation`, `Consultation`, `ConsultationMessage`, `Notification`, `Badge`, `UserBadge`, `Subscription`, `AuditLog`.

### 09 — API Contracts
- **File:** [`09-api-contracts.md`](09-api-contracts.md)
- **Pertanyaan Kunci:** *"How do application clients communicate with the backend?"*
- **Tujuan:** Mengatur standar komunikasi client-server yang aman, terprediksi, dan konsisten.
- **Ruang Lingkup:** Versi API (`/api/v1`), konvensi RESTful, format request/response seragam, kode status HTTP, validasi FormRequest, idempotency, paginasi, pembatasan rate limit, serta endpoint AI dan scanner.

---

## 10. Privacy and Safety Documentation

### 10 — Security and Privacy
- **File:** [`10-security-privacy.md`](10-security-privacy.md)
- **Pertanyaan Kunci:** *"How should AEVYRA protect user data?"*
- **Tujuan:** Menetapkan tata kelola perlindungan data sensitif pengguna dan hak privasi.
- **Ruang Lingkup:** Klasifikasi kerahasiaan data (publik, internal, sensitif medis), enkripsi data, kendali akses berbasis kepemilikan (anti-IDOR), retensi & penghapusan akun, serta audit jejak akses data.

### 11 — Health Safety
- **File:** [`11-health-safety.md`](11-health-safety.md)
- **Pertanyaan Kunci:** *"How should AEVYRA behave safely around health-related decisions?"*
- **Tujuan:** Menjaga sistem agar mutlak berfungsi sebagai **pendamping preventif**, bukan instrumen diagnostik medis.
- **Ruang Lingkup:** Pagar batas non-diagnostik, larangan mengubah dosis obat, disclaimer wajib, validasi alergen, pemisahan mutlak tombol darurat (119) dari ketergantungan AI, dan penanganan ketidakpastian data.

---

## 11. UX Documentation

### 12 — UX/UI
- **File:** [`12-ux-ui.md`](12-ux-ui.md)
- **Pertanyaan Kunci:** *"How should AEVYRA feel and behave for the user?"*
- **Tujuan:** Memandu standar estetika visual premium, kenyamanan navigasi, dan aksesibilitas antarmuka.
- **Ruang Lingkup:** Skema warna klinis modern (Medical Deep Teal `#00433e`, Soft Mint Surface `#f3fbf6`, Alert Amber `#ba1a1a`), tipografi berkarakter (Newsreader & Inter/IBM Plex), tata letak dashboard intuitif, kartu insight yang jelas, interaksi scanner mulus, dan adaptasi PWA ramah mobile.

---

## 12. Engagement Documentation

### 13 — Gamification and Membership
- **File:** [`13-gamification-membership.md`](13-gamification-membership.md)
- **Pertanyaan Kunci:** *"How does AEVYRA encourage sustainable engagement?"*
- **Tujuan:** Membangun dorongan psikologis positif untuk mempertahankan rutinitas hidup sehat tanpa pendekatan yang memaksa atau memalukan pengguna (*non-punitive*).
- **Ruang Lingkup:** Poin partisipasi, lencana pencapaian (*badges*), pemantau konsistensi (*streaks* non-toksik), tantangan komunitas, dan tier keanggotaan (Silver, Gold, Platinum).

---

## 13. Delivery Documentation

### 14 — MVP Roadmap
- **File:** [`14-mvp-roadmap.md`](14-mvp-roadmap.md)
- **Pertanyaan Kunci:** *"What should be built first?"*
- **Tujuan:** Menentukan pentahapan rilis terukur untuk memastikan eksekusi tepat sasaran.
- **Pentahapan:**
  - **Phase 0:** Fondasi Arsitektur, Lingkungan Pengembangan, & Skema DB.
  - **Phase 1:** Health Core (Auth, Profil, Tracker, Timeline).
  - **Phase 2:** Behavioral Intelligence (Baseline, Deteksi Deviasi, Sinyal).
  - **Phase 3:** Closed-Loop Intervention (Insight, Rekomendasi, Evaluasi Progres).
  - **Phase 4:** AI Assistant Berpagar & Workflow Instructor.
  - **Phase 5:** Polish UI/UX, Smart Scanner, & Kesiapan Demo Kompetisi.
  - **Phase 6:** Ekspansi Masa Depan (Wearables, Analisis Longitudinal).

### 15 — Testing and Acceptance
- **File:** [`15-testing-acceptance.md`](15-testing-acceptance.md)
- **Pertanyaan Kunci:** *"How do we know the product works correctly and safely?"*
- **Tujuan:** Menetapkan matriks kriteria penerimaan produk, pengujian ketahanan keamanan, dan verifikasi alur kritis.
- **Ruang Lingkup:** Piramida pengujian (Unit, Feature, Authorization/IDOR, AI Fallback, Health Boundary), data sintesis wajib, dan skenario verifikasi *Definition of Done (DoD)*.

---

## 14. Documentation Dependencies

Seluruh berkas dokumentasi saling terhubung membentuk rantai pemahaman yang utuh:

```text
01 Product Vision
        ↓
02 Problem & Users
        ↓
03 Features
        ↓
04 User Journeys
        ↓
05 Behavior Engine ──→ 06 AI Assistant
        ↓                      ↓
07 Instructor & Admin          │
        ↓                      │
08 Data Model ←────────────────┘
        ↓
09 API Contracts
        ↓
10 Security & Privacy ──→ 11 Health Safety
        ↓                      ↓
12 UX/UI                       │
        ↓                      │
13 Gamification & Membership   │
        ↓                      │
14 MVP Roadmap                 │
        ↓                      │
15 Testing & Acceptance ←──────┘
```

> [!TIP]
> Bagan di atas bukan menandakan bahwa satu dokumen tidak dapat dibuka sebelum dokumen sebelumnya selesai dibaca. Bagan tersebut merepresentasikan **urutan pemahaman logis** untuk merancang sistem secara koheren.

---

## 15. Core Documents

Bila Anda membutuhkan orientasi kilat, empat pilar dokumen ini merupakan inti dari AEVYRA:

```text
┌────────────────────────────────────────────────────────┐
│                   PRODUCT CORE                         │
│   01-product-vision.md  •  03-core-features.md         │
│                 04-user-journeys.md                    │
├───────────────────────────┬────────────────────────────┤
│      INNOVATION CORE      │       TECHNICAL CORE       │
│ 05-health-behavior-engine │      08-data-model.md      │
│     06-ai-assistant.md    │    09-api-contracts.md     │
├───────────────────────────┴────────────────────────────┤
│                   SAFETY & ETHICS                      │
│ 10-security-privacy.md  •  11-health-safety.md         │
└────────────────────────────────────────────────────────┘
```

---

## 16. Most Important Innovation Document

Di antara seluruh dokumen yang ada, berkas yang paling menentukan keunggulan inovasi AEVYRA adalah:

### 👉 [`05-health-behavior-engine.md`](05-health-behavior-engine.md)

Dokumen ini mendefinisikan siklus tertutup (*closed loop*) pencegahan metabolik:

```text
Personal Baseline
       ↓
Behavior Deviation Detection
       ↓
Explainable Signal & Context
       ↓
Targeted Preventive Intervention
       ↓
Measurable Progress & Follow-up
```

Inilah diferensiasi fundamental yang memisahkan AEVYRA dari sekadar aplikasi pencatat kalori biasa atau chatbot medis generik.

---

## 17. Documentation and AI Agents

Agen cerdas Antigravity harus membaca dokumentasi secara efisien berdasarkan lingkup tugas (*task-driven context loading*):

### Skenario 1: Implementasi Tracking Metriks Kesehatan
- **Wajib Dibaca:** [`03-core-features.md`](03-core-features.md), [`04-user-journeys.md`](04-user-journeys.md), [`08-data-model.md`](08-data-model.md), [`15-testing-acceptance.md`](15-testing-acceptance.md).
- **Aturan Terkait:** [`.agents/rules/05-backend.md`](../.agents/rules/05-backend.md), [`.agents/rules/06-database.md`](../.agents/rules/06-database.md).

### Skenario 2: Pembangunan Mesin Deteksi Sinyal Perilaku
- **Wajib Dibaca:** [`03-core-features.md`](03-core-features.md), [`05-health-behavior-engine.md`](05-health-behavior-engine.md), [`08-data-model.md`](08-data-model.md), [`11-health-safety.md`](11-health-safety.md).
- **Aturan Terkait:** [`.agents/rules/01-architecture.md`](../.agents/rules/01-architecture.md), [`.agents/rules/03-health-safety.md`](../.agents/rules/03-health-safety.md), [`.agents/rules/08-testing.md`](../.agents/rules/08-testing.md).

### Skenario 3: Pembangunan Fitur Chat AI Edukasi Kesehatan
- **Wajib Dibaca:** [`03-core-features.md`](03-core-features.md), [`05-health-behavior-engine.md`](05-health-behavior-engine.md), [`06-ai-assistant.md`](06-ai-assistant.md), [`09-api-contracts.md`](09-api-contracts.md), [`11-health-safety.md`](11-health-safety.md).
- **Aturan Terkait:** [`.agents/rules/02-security.md`](../.agents/rules/02-security.md), [`.agents/rules/03-health-safety.md`](../.agents/rules/03-health-safety.md).

---

## 18. Product-to-Code Traceability

Setiap baris kode implementasi harus dapat ditelusuri kembali ke kebutuhan produk asalnya:

```text
Product Requirement (docs/01 & 02)
        ↓
Feature Definition (docs/03)
        ↓
User Journey Flow (docs/04)
        ↓
Domain Entity & DB Schema (docs/08)
        ↓
API Contract (docs/09)
        ↓
UI / Component (docs/12)
        ↓
Backend Implementation (.agents/rules/05)
        ↓
Automated Test & Verification (docs/15 & .agents/rules/08)
```

Struktur ini memastikan bahwa tim pengembang dan AI dapat menjawab dua pertanyaan vital kapan pun dibutuhkan:
1. *"Di mana spesifikasi kebutuhan produk ini diimplementasikan di kode?"*
2. *"Fitur atau kebutuhan produk apa yang diwakili oleh potongan kode ini?"*

---

## 19. Documentation Consistency

Saat melakukan perubahan pada fitur atau arsitektur utama, evaluasi dampaknya secara lintas-dokumen:

- [ ] Apakah memengaruhi visi produk atau proposisi nilai? (`01-product-vision.md`)
- [ ] Apakah memengaruhi hak akses atau definisi peran? (`02-problem-and-users.md`)
- [ ] Apakah mengubah alur navigasi atau interaksi pengguna? (`04-user-journeys.md`)
- [ ] Apakah menuntut perubahan skema basis data? (`08-data-model.md`)
- [ ] Apakah mengubah struktur endpoint atau parameter API? (`09-api-contracts.md`)
- [ ] Apakah memengaruhi prinsip privasi atau enkripsi? (`10-security-privacy.md`)
- [ ] Apakah berpotensi menyentuh batasan keselamatan medis? (`11-health-safety.md`)
- [ ] Apakah mengubah kriteria pengujian dan verifikasi? (`15-testing-acceptance.md`)

Jangan pernah memperbarui satu dokumen saja jika perubahan tersebut berdampak pada lapisan sistem lainnya.

---

## 20. Documentation Update Rule

Bila kode implementasi mengubah perilaku aplikasi secara substansial, berkas dokumentasi wajib segera diperbarui:

- **Fitur Baru / Diperluas:** Perbarui [`03-core-features.md`](03-core-features.md) dan [`04-user-journeys.md`](04-user-journeys.md).
- **Perubahan Skema Data:** Perbarui [`08-data-model.md`](08-data-model.md).
- **Perubahan Kontrak API:** Perbarui [`09-api-contracts.md`](09-api-contracts.md).
- **Penyesuaian Batasan Klinis/Keselamatan:** Perbarui [`11-health-safety.md`](11-health-safety.md).
- **Penyesuaian Target Rilis MVP:** Perbarui [`14-mvp-roadmap.md`](14-mvp-roadmap.md).

---

## 21. Avoid Documentation Duplication

Pegang teguh prinsip **Single Source of Truth (SSOT)**: Jangan menduplikasi aturan bisnis yang sama di banyak dokumen secara berlebihan. Setiap topik memiliki dokumen otoritatif utama:

- **Visi & Strategi Produk:** [`01-product-vision.md`](01-product-vision.md)
- **Katalog Fitur & Spesifikasi:** [`03-core-features.md`](03-core-features.md)
- **Mesin Kecerdasan Perilaku:** [`05-health-behavior-engine.md`](05-health-behavior-engine.md)
- **Arsitektur & Pagar AI:** [`06-ai-assistant.md`](06-ai-assistant.md)
- **Model Data & Entitas:** [`08-data-model.md`](08-data-model.md)
- **Kontrak Antarmuka API:** [`09-api-contracts.md`](09-api-contracts.md)
- **Pagar Batas Medis & Keselamatan:** [`11-health-safety.md`](11-health-safety.md)

Dokumen lain cukup menautkan referensi ke dokumen otoritatif tersebut.

---

## 22. Documentation Naming

Penamaan file dokumentasi wajib mengikuti format baku:

```text
NN-nama-topik.md
```

- `NN` = Dua digit angka pengurutan (misal: `00`, `01`, `02`).
- `nama-topik` = Deskripsi subjek dalam huruf kecil menggunakan tanda hubung (*kebab-case*).

✅ **Contoh Baku:**
- `01-product-vision.md`
- `05-health-behavior-engine.md`
- `15-testing-acceptance.md`

❌ **Hindari:**
- `ProductVision.md`
- `doc_health_01.md`
- `final-v2.md`

---

## 23. Documentation Quality Standard

Setiap dokumen wajib memenuhi standar penulisan teknis bermutu tinggi:

- **Eksplisit:** Hindari asumsi implisit atau instruksi yang ambigu.
- **Terstruktur:** Gunakan heading hierarkis, tabel ringkasan, dan diagram alur.
- **Konsisten:** Seragam dalam peristilahan, gaya markdown, dan format data.
- **Sadar Implementasi:** Realistis terhadap kemampuan teknologi dan tenggat waktu.
- **Bebas Klaim Palsu:** Tidak memuat janji fitur yang tidak dapat diwujudkan kode.

❌ **Bad:**
> *"Sistem harus menjadi sangat pintar dalam memahami tubuh pengguna."*

✅ **Prefer:**
> *"Sistem membandingkan rata-rata bergerak (moving average) data perilaku 7 hari terakhir dengan baseline personal 30 hari untuk mendeteksi deviasi signifikan, serta menampilkan data pendukung secara transparan kepada pengguna."*

---

## 24. Documentation and Health Claims

Dokumentasi produk tidak boleh menggunakan terminologi medis diagnostik yang menyesatkan:

❌ **Bad:**
> *"AEVYRA mendeteksi dan mengobati diabetes pada stadium awal sebelum gejala muncul."*

✅ **Prefer:**
> *"AEVYRA memantau tren asupan gula harian dan konsistensi aktivitas untuk memberikan wawasan pencegahan metabolik serta mendorong kebiasaan yang lebih sehat."*

AEVYRA adalah sistem pendukung pencegahan dan pendamping gaya hidup, bukan alat diagnosis maupun instrumen pengganti dokter.

---

## 25. Documentation and Competition Claims

Dalam konteks kompetisi inovasi, posisikan keunggulan AEVYRA berdasarkan bukti fungsional perangkat lunak:

Hindari klaim kosong seperti:
- *"Aplikasi kesehatan paling revolusioner di Indonesia"*
- *"100% akurat menyembuhkan insomnia"*
- *"Satu-satunya sistem yang sempurna"*

Tunjukkan keunggulan secara objektif:
- Keberadaan siklus preventif tertutup (*closed-loop behavioral engine*).
- Integrasi asisten AI berpagar ketat (*clinical safety guardrails*).
- Keterlibatan manusia nyata (*instructor-in-the-loop*).
- Kontrak privasi dan tata kelola data yang transparan.

---

## 26. Documentation Change Control

Setiap perubahan penting pada ruang lingkup produk atau arsitektur harus dieksekusi melalui 6 langkah terkendali:

1. **Identifikasi Dampak:** Tentukan berkas dokumen mana saja yang terpengaruh.
2. **Perbarui Sumber Otoritatif:** Ubah dokumen induk (SSOT) terlebih dahulu.
3. **Perbarui Dokumen Dependen:** Sesuaikan dokumen turunan yang merujuk padanya.
4. **Tinjau Kontradiksi:** Pastikan tidak ada pernyataan yang saling bertentangan antar-dokumen.
5. **Perbarui Kode & Aturan:** Sesuaikan kode aplikasi dan berkas `.agents/rules/`.
6. **Perbarui Kriteria Uji:** Tambahkan skenario pengujian pada `15-testing-acceptance.md`.

---

## 27. Recommended Reading Order

### 1. Developer Baru di Proyek
```text
README.md → AGENTS.md → 00-index.md → 01-product-vision.md → 02-problem-and-users.md → 03-core-features.md → Dokumen Teknis Terkait
```

### 2. Juri / Reviewer Kompetisi
```text
01-product-vision.md → 02-problem-and-users.md → 03-core-features.md → 05-health-behavior-engine.md → 14-mvp-roadmap.md
```

### 3. Backend Engineer
```text
03-core-features.md → 05-health-behavior-engine.md → 08-data-model.md → 09-api-contracts.md → 10-security-privacy.md → 11-health-safety.md → 15-testing-acceptance.md
```

### 4. Frontend & PWA Engineer
```text
03-core-features.md → 04-user-journeys.md → 12-ux-ui.md → 11-health-safety.md → 09-api-contracts.md → 15-testing-acceptance.md
```

---

## 28. Documentation Completion Criteria

Dokumentasi dinyatakan memadai untuk memandu pengembangan MVP apabila telah mampu menjawab 13 pertanyaan inti:

- [x] **Product:** *Apa yang sedang kita bangun secara konkret?*
- [x] **Problem:** *Mengapa produk ini penting dan mendesak untuk dibangun?*
- [x] **Users:** *Siapa saja audiens sasaran dan apa motivasi mereka?*
- [x] **Features:** *Apa saja kapabilitas fungsional untuk setiap peran?*
- [x] **Journeys:** *Bagaimana alur pengalaman pengguna dari hulu ke hilir?*
- [x] **Intelligence:** *Bagaimana cara kerja Health Behavior Engine dan baseline personal?*
- [x] **AI:** *Di mana peran AI dan bagaimana batas keselamatannya?*
- [x] **Data:** *Entitas data apa saja yang disimpan dan bagaimana relasinya?*
- [x] **API:** *Bagaimana kontrak komunikasi antara frontend dan backend?*
- [x] **Safety:** *Hal apa saja yang mutlak tidak boleh dilakukan oleh sistem?*
- [x] **UX/UI:** *Bagaimana standar visual, interaksi, dan rasa aplikasi?*
- [x] **Roadmap:** *Apa urutan prioritas fitur menuju peluncuran MVP?*
- [x] **Testing:** *Bagaimana membuktikan bahwa seluruh sistem bekerja benar dan aman?*

---

## 29. Final Documentation Map

Struktur direktori `docs/` resmi AEVYRA:

```text
docs/
│
├── 00-index.md                        [Navigasi & Indeks Dokumentasi]
│
├── PRODUCT & USERS
│   ├── 01-product-vision.md           [Visi, Misi & Diferensiasi Produk]
│   ├── 02-problem-and-users.md        [Analisis Masalah, Target & Persona]
│   ├── 03-core-features.md            [Spesifikasi Lengkap Fitur Seluruh Role]
│   └── 04-user-journeys.md            [Alur Pengalaman Pengguna End-to-End]
│
├── INTELLIGENCE & AI
│   ├── 05-health-behavior-engine.md   [Mesin Analitik Perilaku & Baseline]
│   └── 06-ai-assistant.md             [Asisten AI Berkonteks & Berpagar Medis]
│
├── OPERATIONS & SUPPORT
│   └── 07-instructor-admin.md         [Workflow Instructor, Konsultasi & Admin]
│
├── ENGINEERING & ARCHITECTURE
│   ├── 08-data-model.md               [Skema Database, Entitas & Relasi]
│   └── 09-api-contracts.md            [Spesifikasi RESTful API & Kontrak Data]
│
├── SAFETY, PRIVACY & ETHICS
│   ├── 10-security-privacy.md         [Tata Kelola Keamanan Data & Hak Privasi]
│   └── 11-health-safety.md            [Batasan Klinis, Non-Diagnosis & Darurat]
│
├── EXPERIENCE & ENGAGEMENT
│   ├── 12-ux-ui.md                    [Desain Antarmuka, Token & Standar PWA]
│   └── 13-gamification-membership.md  [Poin, Badge, Streak & Tier Keanggotaan]
│
└── DELIVERY & VERIFICATION
    ├── 14-mvp-roadmap.md              [Tahapan Rilis MVP Menuju Kompetisi]
    └── 15-testing-acceptance.md       [Kriteria Penerimaan & Matriks Pengujian]
```

---

## 30. Final Rule

Direktori `docs/` adalah **pusat pengetahuan resmi (*single knowledge base*)** produk AEVYRA.

Dokumentasi ini harus secara konsisten menjawab tangga pemahaman produk:

```text
WHAT IS AEVYRA?
       ↓
WHY DOES IT EXIST?
       ↓
WHO ARE WE HELPING?
       ↓
HOW DO USERS EXPERIENCE IT?
       ↓
HOW DOES THE INTELLIGENCE WORK?
       ↓
HOW IS DATA STORED & SECURED?
       ↓
HOW DO SYSTEMS COMMUNICATE?
       ↓
HOW IS CLINICAL SAFETY PRESERVED?
       ↓
HOW DO WE BUILD IT SYSTEMATICALLY?
       ↓
HOW DO WE PROVE THAT IT WORKS?
```

> **Prinsip Panduan:**  
> Tujuan dokumentasi bukan sekadar mengumpulkan file Markdown. Tujuannya adalah memastikan setiap developer manusia maupun agen AI dapat memahami secara tepat **maksud dan tujuan produk AEVYRA** tanpa perlu menebak-nebak, ragu, atau membuat asumsi yang keliru.
