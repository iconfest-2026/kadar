# PRONOIA — Instructor & Admin

> Spesifikasi komprehensif arsitektur operasional, batasan otorisasi (*role-based & relationship-based access control*), alur kerja pendampingan manusia (*human-in-the-loop*), dasbor analitik, manajemen intervensi, sistem konsultasi, moderasi komunitas, tata kelola konfigurasi sistem, hingga kepatuhan audit untuk peran Instructor dan Administrator dalam platform PRONOIA.

---

## 1. Purpose

Dokumen ini mendefinisikan arsitektur dan tata kelola dua peran operasional utama dalam platform **PRONOIA**:

| Peran Operasional (*Role*) | Fokus Utama Peran | Tanggung Jawab Kunci |
| :--- | :--- | :--- |
| **Instructor** | Pendampingan Manusia (*Member Support*) | Tinjauan sinyal perilaku, perancangan intervensi preventif terarah, sesi konsultasi langsung, dan pemantauan pemulihan kebiasaan. |
| **Administrator** | Tata Kelola Platform (*Platform Governance*) | Manajemen pengguna & instruktur, kurasi konten kesehatan, moderasi komunitas, konfigurasi aturan sistem, dan audit kepatuhan. |

Kedua peran ini beroperasi dengan batasan akses yang terisolasi secara ketat guna menjamin kedaulatan data dan privasi pengguna.

---

## 2. Role Philosophy

Dalam PRONOIA, peran (*role*) bukan sekadar label visual pada antarmuka, melainkan kontrak penegakan izin multi-dimensi (*multi-dimensional authorization contract*):

```text
Autentikasi (Siapa Pengguna?)
              +
Peran (Apa Status Resmi Pengguna?)
              +
Izin (Tindakan Apa yang Boleh Dilakukan?)
              +
Relasi Penugasan (Apakah Terhubung Resmi dengan Member Ini?)
              +
Kepemilikan Sumber Daya (Apakah Ini Data Milik Lingkup Kerjanya?)
              +
Konteks Keamanan (Kapan & Melalui Saluran Apa Akses Dilakukan?)
              =
   AKSES DIIZINKAN (ALLOWED ACCESS)
```

---

## 3. Role Hierarchy

Struktur hierarki peran operasional platform PRONOIA:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     PLATFORM TATA KELOLA PRONOIA                       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                 ┌─────────────────┴─────────────────┐
                 ▼                                   ▼
           ADMINISTRATOR                        INSTRUCTOR
      (Operasional Platform & Audit)      (Bimbingan Personal Member)
                 │                                   │
                 └─────────────────┬─────────────────┘
                                   ▼
                             MEMBER PENGGUNA
                        (Pemilik Sah Data Mandiri)
```

> [!IMPORTANT]
> **Prinsip Non-Omnipresen:** Status Administrator tidak memberikan hak otomatis untuk mengintip seluruh riwayat kesehatan privat member. Seluruh akses data kesehatan tetap dibatasi oleh kebijakan (*Policy-based Access Control*).

---

## 4. Member vs Instructor vs Admin

Matriks komparasi kapabilitas lintas-peran:

| Kapabilitas & Hak Akses Sistem | Member | Instructor | Administrator |
| :--- | :---: | :---: | :---: |
| **Kelola Profil Mandiri** | ✅ Penuh | ✅ Penuh | ✅ Penuh |
| **Catat & Akses Data Kesehatan Pribadi** | ✅ Milik Sendiri | ✅ Milik Sendiri | ❌ Terisolasi |
| **Akses Dasbor Member Binaan** | ❌ Dilarang | ✅ Member yang Ditugaskan | ❌ Terbatas Agregat |
| **Buat & Terbitkan Intervensi Terarah** | ❌ Dilarang | ✅ Khusus Binaan | ❌ Dilarang |
| **Buka Slot & Pimpin Konsultasi** | ❌ Dilarang | ✅ Resmi Terverifikasi | ❌ Dilarang |
| **Kelola Akun & Penugasan Pengguna** | ❌ Dilarang | ❌ Dilarang | ✅ Otoritas Penuh |
| **Kurasi & Terbitkan Program/Tantangan**| Partisipasi Pasif | Usulan Draf | ✅ Validasi & Rilis |
| **Moderasi Konten Forum Komunitas** | Laporkan (*Report*) | Moderasi Terbatas | ✅ Hapus / Bekukan |
| **Konfigurasi Aturan Mesin & Fitur** | ❌ Dilarang | ❌ Dilarang | ✅ Kontrol Penuh |
| **Akses Buku Besar Audit (*Audit Logs*)**| ❌ Dilarang | ❌ Dilarang | ✅ Riwayat Lengkap |

---

## 5. Instructor Definition

Instructor adalah profesional atau pendamping gaya hidup terverifikasi yang bermitra dengan PRONOIA untuk memberikan bimbingan preventif berbasis bukti:
- **Bukan Pengganti Dokter:** Peran instruktur berfokus pada pendampingan kebiasaan (*behavioral coaching*), bukan penegakan diagnosis klinis patologis.
- **Kredensial Resmi:** Instruktur wajib melalui verifikasi dokumen keahlian, afiliasi organisasi kebugaran/kesehatan, dan persetujuan pakta integritas etika privasi.

---

## 6. Instructor Goals

Instruktur memanfaatkan PRONOIA melalui siklus pendampingan tertutup (*Support Loop*):

```text
Pahami Konteks Member ──▶ Tinjau Deviasi Sinyal ──▶ Berikan Bimbingan Preventif
                                                               │
         ┌─────────────────────────────────────────────────────┘
         ▼
Rancang Intervensi ──▶ Pantau Progres Harian ──▶ Evaluasi Tindak Lanjut
```

---

## 7. Instructor Core Responsibilities

Tanggung jawab utama instruktur dalam ekosistem PRONOIA:
- **Memantau Dasbor Binaan (*Caseload Monitoring*):** Meninjau status anggota yang ditugaskan secara berkala.
- **Mengevaluasi Sinyal Perilaku:** Mempelajari ringkasan deviasi yang dihasilkan oleh *Health Behavior Engine*.
- **Merancang Rencana Intervensi (*Intervention Plan*):** Menetapkan aksi mikro bertahap yang selaras dengan kapasitas member.
- **Menyelenggarakan Sesi Konsultasi:** Melakukan tatap muka atau panggilan terstruktur untuk bimbingan langsung.
- **Menulis Catatan Evaluasi Profesional:** Mendokumentasikan observasi perkembangan kebiasaan secara aman.
- **Eskalasi Medis Saat Butuh:** Mengarahkan member ke tenaga medis klinis saat terdeteksi keluhan di luar batas pencegahan gaya hidup.

---

## 8. Instructor Non-Responsibilities

Batasan operasional yang DILARANG dilakukan oleh instruktur:
- Mengakses data pengguna di luar daftar penugasan resminya (*out-of-scope access*).
- Memberikan diagnosis medis atau mengklaim kepastian penyakit.
- Mengubah atau meresepkan obat farmasi kimia.
- Memanipulasi angka statistik mentah hasil kalkulasi engine.
- Mengubah setelan konfigurasi platform atau peran pengguna lain.

---

## 9. Instructor Onboarding

Alur orientasi instruktur baru sebelum diaktifkan ke sistem:

```text
Registrasi Akun ──▶ Unggah Sertifikasi / Kredensial ──▶ Verifikasi Administrator
                                                                  │
         ┌────────────────────────────────────────────────────────┘
         ▼
Penetapan Afiliasi Program ──▶ Penandatanganan Pakta Privasi ──▶ Aktivasi Dasbor Instruktur
```

---

## 10. Instructor Verification

Kriteria verifikasi administratif instruktur oleh platform:
- Verifikasi identitas resmi (KTP / Paspor).
- Sertifikasi keahlian yang relevan (misal: sertifikasi pelatih kebugaran, sertifikasi pendamping gizi olahraga).
- Afiliasi institusi atau kampus mitra jika berada dalam program khusus.

---

## 11. Instructor Status

Siklus hidup status instruktur:

| Status Instruktur | Definisi Kondisi Akun | Dampak Operasional |
| :--- | :--- | :--- |
| `PENDING` | Menunggu verifikasi dokumen oleh Administrator. | Akses dasbor terkunci pada layar verifikasi. |
| `ACTIVE` | Terverifikasi resmi dan aktif membina member. | Akses penuh ke fitur pendampingan binaan. |
| `SUSPENDED` | Dinonaktifkan sementara akibat pelanggaran etika/audit. | Seluruh akses data dibekukan seketika. |
| `INACTIVE` | Tidak lagi bertugas atau mengajukan cuti pendampingan. | Member binaan dialihkan ke instruktur pengganti. |

---

## 12. Instructor Assignment

Mekanisme penugasan member ke instruktur:
- **Penugasan Mandiri Program:** Member mendaftar ke program bimbingan tertentu dan memilih instruktur yang tersedia.
- **Penugasan Administratif:** Administrator menugaskan member ke instruktur berdasarkan kapasitas beban kerja (*workload balance*).

---

## 13. Instructor-Member Relationship

Relasi legal antara instruktur dan member dikelola dalam entitas basis data terpisah:

```sql
CREATE TABLE instructor_member_assignments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instructor_id BIGINT UNSIGNED NOT NULL,
    member_id BIGINT UNSIGNED NOT NULL,
    program_id BIGINT UNSIGNED NULL,
    status ENUM('active', 'paused', 'completed', 'transferred') DEFAULT 'active',
    assigned_at DATETIME NOT NULL,
    ended_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_instructor_member_active (instructor_id, member_id, status)
);
```

---

## 14. Assignment Lifecycle

Tahapan penugasan bimbingan:
`PENUGASAN AKTIF` ──▶ `PEMERIKSAAN RUTIN` ──▶ `SESI INTERVENSI` ──▶ `PROGRAM SELESAI / TRANFER`.

---

## 15. Assignment Boundaries

Batas akses penugasan (*Access Boundary*):
- Instruktur hanya diizinkan membaca data member yang berstatus `active` dalam tabel penugasan bersamanya.
- Saat penugasan berakhir (`ended_at IS NOT NULL`), hak akses instruktur terhadap data harian member langsung dicabut secara otomatis oleh sistem.

---

## 16. Scoped Access

Prinsip akses berlingkup (*Scoped Access*):
- Kueri data pada dasbor instruktur selalu diinjeksi dengan klausa pembatas: `WHERE instructor_id = :auth_id AND status = 'active'`.
- Mencegah potensi kebocoran data (*data bleeding*) antarmember secara komputasional.

---

## 17. Instructor Dashboard

Tata letak dasbor instruktur dirancang mengutamakan aksi bimbingan cepat:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     DASBOR INSTRUKTUR PRONOIA                          │
├────────────────────────────────────────────────────────────────────────┤
│ [METRIK BINAAN]                                                        │
│  Total Member: 24 | Butuh Perhatian: 3 | Agenda Sesi Hari Ini: 2       │
├────────────────────────────────────────────────────────────────────────┤
│ [DAFTAR PRIORITAS INTERVENSI]                                          │
│  • Budi Santoso   - Sinyal: SLEEP_DECLINE (-65m)   [Buat Intervensi]   │
│  • Siti Rahma     - Sinyal: ACTIVITY_DROP (-40%)   [Kirim Saran]       │
│  • Dian Pratama   - Status: Selesai Intervensi     [Review Evaluasi]   │
├────────────────────────────────────────────────────────────────────────┤
│ [JADWAL KONSULTASI MENDATANG]                                          │
│  • 10:00 WIB - Sesi Refleksi Bersama Budi Santoso (Online Chat)        │
│  • 14:30 WIB - Bimbingan Rutinitas Bersama Ahmad Fauzi                 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 18. Instructor Dashboard Overview

Komponen ringkasan yang disajikan kepada instruktur:
- **Kartu Beban Binaan:** Menampilkan rasio member aktif terhadap kapasitas maksimal bimbingan.
- **Indikator Tindak Lanjut Tertunda:** Menyorot intervensi yang telah melewati masa review 3–7 hari.
- **Umpan Sinyal Perilaku:** Aliran deviasi terbaru dari member binaan yang telah divalidasi engine.

---

## 19. Instructor Priority Model

Hierarki pengurutan daftar binaan pada dasbor instruktur:

```text
1. Member dengan Sinyal ATTENTION / FOLLOW_UP (Butuh Aksi Segera)
                     │
                     ▼
2. Jadwal Konsultasi Terdekat Hari Ini
                     │
                     ▼
3. Intervensi yang Memasuki Jendela Evaluasi Luaran
                     │
                     ▼
4. Member dengan Pola Kebiasaan Stabil (Pemantauan Pasif)
```

---

## 20. Instructor Member List

Fitur tabel daftar binaan:
- Pencarian cepat berdasarkan nama atau program kebiasaan.
- Penyaringan berdasarkan status sinyal (`Semua`, `Butuh Intervensi`, `Konsisten`, `Jadwal Temu Hari Ini`).
- Indikator visual tingkat kepatuhan pencatatan log harian.

---

## 21. Instructor Member Card

Kartu ringkasan member memuat informasi padat:
- Nama panggilan member & program aktif.
- Sasaran kebiasaan utama (misal: *"Meningkatkan Jam Tidur"*).
- Status sinyal perilaku terkini (`SLEEP_DECLINE` berkedip kuning).
- Tombol aksi cepat: `[Buka Profil]`, `[Buat Rencana]`, `[Atur Sesi]`.

---

## 22. Instructor Member Profile

Tampilan profil lengkap member binaan:
1. **Tab Konteks Sasaran:** Target preventif jangka pendek dan menengah yang dipilih member.
2. **Tab Tren Perilaku:** Grafik perbandingan data 14 hari terhadap baseline personal.
3. **Tab Riwayat Intervensi:** Catatan aksi preventif lampau dan hasil evaluasi dampaknya.
4. **Tab Konsultasi:** Rekam log sesi bimbingan tatap muka yang pernah dilaksanakan.

---

## 23. Member Context Summary

Sebelum instruktur merancang intervensi, sistem menyajikan kartu konteks terpadu:
- **Baseline Personal:** Patokan normal member (misal: tidur normal 7h 10m).
- **Deviasi Aktif:** Selisih riil 5 hari terakhir (-65 menit/malam).
- **Kepatuhan Terkini:** Catatan bahwa member aktif mengisi log setiap pagi.

---

## 24. Raw Data Access

Kebijakan akses data mentah (*Raw Logs Access Policy*):
- Instruktur disajikan ringkasan statistik dan agregat tren terlebih dahulu.
- Data log mentah individual hanya ditampilkan jika instruktur membutuhkan audit mendalam atas lonjakan anomali.

---

## 25. Instructor Signal View

Tampilan kartu sinyal pada panel instruktur:

```text
┌────────────────────────────────────────────────────────┐
│ SINYAL: PERGESERAN POLA TIDUR (SLEEP_DECLINE)          │
├────────────────────────────────────────────────────────┤
│ Member          : Budi Santoso (ID: 1042)              │
│ Waktu Deteksi   : 17 September 2026, 06:30 WIB         │
│ Nilai Baseline  : 7 jam 10 menit (Observasi 14 Hari)   │
│ Rerata Terkini  : 6 jam 05 menit (Observasi 5 Hari)    │
│ Tingkat Urgensi : ATTENTION (Konsisten menurun)        │
│ Skor Data (DQS) : 0.94 (Kualitas Bukti Tinggi)         │
└────────────────────────────────────────────────────────┘
```

---

## 26. Instructor Signal Actions

Tindakan yang dapat dieksekusi instruktur terhadap sinyal aktif:
- **Tandai Ditinjau (*Mark as Reviewed*):** Mengonfirmasi bahwa deviasi telah dipelajari.
- **Rancang Intervensi (*Create Intervention*):** Menyusun rencana panduan mikro bagi member.
- **Jadwalkan Konsultasi (*Book Session*):** Mengundang member ke sesi bimbingan langsung.
- **Abaikan Sinyal (*Dismiss*):** Memberi catatan alasan (misal: *"Member sedang bepergian luar kota"*).

---

## 27. Intervention Definition

*Intervensi Instruktur* adalah aksi bimbingan manusia terstruktur yang dirancang untuk membantu member mengatasi deviasi kebiasaan dan memulihkan kondisi menuju baseline personal yang sehat.

---

## 28. Intervention Types

Katalog 8 jenis intervensi yang dapat dirancang oleh instruktur:

| Jenis Intervensi | Deskripsi Tindakan Bimbingan | Target Luaran |
| :--- | :--- | :--- |
| **Edukasi Terarah** | Pengiriman artikel ilmiah spesifik seputar kendala member. | Meningkatkan pemahaman konsep kesehatan. |
| **Panduan Rutinitas**| Penyusunan jadwal jeda relaksasi atau jadwal tidur baru. | Membangun kembali konsistensi sirkadian. |
| **Penyesuaian Sasaran**| Menurunkan beban target harian agar lebih realistis. | Mencegah keputusasaan (*burnout*). |
| **Tantangan Khusus** | Mendaftarkan member ke tantangan hidrasi/langkah terarah. | Mendorong momentum keterlibatan kelompok. |
| **Sesi Bimbingan** | Konsultasi tatap muka daring 1-on-1. | Diskusi mendalam membedah kendala hidup. |
| **Pengingat Khusus** | Mengaktifkan notifikasi dorong pada jam kritis kebiasaan. | Membantu kedisiplinan eksekusi tindakan. |
| **Pemantauan Pasif** | Menetapkan jendela observasi metrik selama 7 hari ke depan. | Mengamati dinamika pemulihan alami. |
| **Eskalasi Medis** | Menerbitkan rujukan tertulis untuk evaluasi tenaga medis. | Melindungi keselamatan jika ada risiko klinis. |

---

## 29. Intervention Structure

Skema atribut rekaman intervensi resmi:

```json
{
  "intervention_id": "int_77201",
  "member_id": 1042,
  "instructor_id": 305,
  "type": "routine_guidance",
  "title": "Stabilisasi Jam Istirahat Malam",
  "guidance_text": "Coba redupkan pencahayaan kamar 30 menit sebelum jam 22:00 dan hindari menatap layar kerja.",
  "target_metric": "sleep_duration",
  "observation_window_days": 4,
  "status": "ACTIVE",
  "created_at": "2026-09-17T08:00:00Z"
}
```

---

## 30. Intervention Status

Mesin status siklus intervensi:
`DRAFT` ──▶ `ACTIVE` ──▶ `PAUSED` ──▶ `COMPLETED` *(atau `CANCELLED` / `EXPIRED`)*.

---

## 31. Intervention Creation Flow

Alur kerja instruktur dalam menerbitkan intervensi:
1. Membuka kartu sinyal member binaan pada dasbor.
2. Memilih jenis intervensi yang relevan dari katalog.
3. Menuliskan pesan panduan dengan bahasa yang hangat, empatik, dan bebas istilah vonis klinis.
4. Menentukan durasi jendela observasi tindak lanjut (misal: 4 hari).
5. Meninjau draf intervensi dan menekan tombol `[Terbitkan Intervensi]`.
6. Sistem mengirimkan kartu bimbingan langsung ke beranda aplikasi member.

---

## 32. Intervention Validation

Validasi keselamatan sistem sebelum intervensi disimpan:
- Memastikan instruktur memiliki relasi penugasan aktif dengan member terkait.
- Memindai teks panduan terhadap kata-kata terlarang (resep obat keras, diagnosis penyakit).
- Memastikan tanggal target observasi berada dalam rentang wajar (1 hingga 30 hari ke depan).

---

## 33. Intervention Notification

Pemberitahuan kepada member:
- Notifikasi ramah dikirimkan ke gawai member: *"Instruktur Sarah telah merancang panduan istirahat baru untuk mendukung kebugaran Anda."*
- Pesan menghormati jam tenang (*quiet hours*) pengguna.

---

## 34. Intervention Follow-up

Tindak lanjut intervensi terjadwal:
- Setelah jendela observasi berakhir (misal: hari ke-4), sistem memicu pengingat otomatis di dasbor instruktur: *"Waktunya meninjau progres tidur Budi Santoso pasca-intervensi"*.

---

## 35. Intervention Outcome

Penilaian luaran hasil bimbingan:

| Status Luaran | Hasil Evaluasi Statistik | Tindak Lanjut Instruktur |
| :--- | :--- | :--- |
| `IMPROVING` | Deviasi membaik $> 50\%$ mendekati baseline. | Berikan apresiasi dan tutup intervensi sebagai sukses. |
| `STABLE` | Kondisi terkendali tanpa penurunan lebih lanjut. | Pertahankan pola bimbingan saat ini. |
| `DECLINING` | Deviasi tetap memburuk pasca-intervensi. | Rencanakan sesi konsultasi 1-on-1 langsung. |
| `INSUFFICIENT_DATA`| Member tidak mencatat data selama periode observasi.| Kirim pesan pengingat ramah untuk melanjutkan pencatatan log. |

---

## 36. Instructor Notes

Instruktur dapat mencatat catatan observasi privat (*Private Professional Notes*):
- **Catatan Sesi:** Poin-poin penting yang dibahas saat konsultasi tatap muka.
- **Catatan Hambatan:** Faktor eksternal yang diungkapkan member (misal: lembur kerja pekan ujian).

---

## 37. Instructor Notes Privacy

> [!CAUTION]
> **Kerahasiaan Catatan Profesional:**  
> Catatan instruktur bersifat privat 100%. Catatan ini tidak dapat dibaca oleh member, instruktur lain di luar tim, maupun forum publik, kecuali jika dibagikan secara resmi untuk keperluan audit medis.

---

## 38. AI Access to Instructor Notes

Batasan ketat keterlibatan kecerdasan buatan terhadap catatan instruktur:
- Standar sistem: **Akses Terkunci (*Zero Access by Default*)**.
- AI hanya dapat membaca draf catatan jika instruktur secara eksplisit mengeklik tombol: `[Bantu Ringkas Catatan Ini Menggunakan AI]`.

---

## 39. Consultation System

Modul konsultasi memfasilitasi interaksi langsung antara member dan instruktur:
- Pengelolaan ketersediaan jadwal bimbingan instruktur (*Availability Slots*).
- Reservasi sesi terintegrasi dengan pengingat otomatis multikanal.
- Rekam ringkasan hasil konsultasi pasca-sesi.

---

## 40. Instructor Availability

Pengaturan jadwal kerja instruktur:
- Menentukan hari kerja aktif (Senin – Jumat).
- Menetapkan jam buka konsultasi (misal: 09:00 – 16:00 WIB) dengan durasi per sesi 30 menit.
- Menetapkan waktu jeda istirahat antar-sesi (minimal 15 menit).

---

## 41. Availability Validation

Validasi komputasi penjadwalan:
- Sistem menjamin tidak ada jadwal yang bentrok (*Zero Slot Overlap*).
- Pembatasan maksimal 6 sesi konsultasi per hari per instruktur untuk menjaga stamina mental pendamping.

---

## 42. Consultation Status

Status siklus hidup sesi konsultasi:
`REQUESTED` ──▶ `CONFIRMED` ──▶ `COMPLETED` *(atau `RESCHEDULED`, `CANCELLED`, `NO_SHOW`)*.

---

## 43. Consultation Flow

Alur lengkap penyelenggaraan konsultasi bimbingan:
`Member Pilih Slot Waktu` ──▶ `Konfirmasi Otomatis / Manual` ──▶ `Tautan Sesi Aktif pada Hari-H` ──▶ `Konsultasi Berjalan` ──▶ `Instruktur Tuliskan Ringkasan`.

---

## 44. Consultation Conflict Handling

Penanganan konflik reservasi bersamaan (*Race Condition Prevention*):
- Menerapkan *Pessimistic Locking* pada baris slot ketersediaan di basis data.
- Permintaan reservasi kedua pada slot yang sama langsung menerima pesan ramah: *"Slot waktu ini baru saja dipilih oleh member lain, silakan pilih slot alternatif."*

---

## 45. Consultation Cancellation

Aturan pembatalan sesi konsultasi:
- Pembatalan dapat dilakukan maksimal **2 jam sebelum jadwal** dimulai.
- Slot waktu yang dibatalkan langsung dibuka kembali secara otomatis untuk member lain.
- Notifikasi pembatalan langsung dikirimkan ke pihak terkait.

---

## 46. Consultation Rescheduling

Alur penjadwalan ulang (*Reschedule Flow*):
1. Member atau instruktur memilih tiket konsultasi aktif.
2. Memilih slot waktu baru yang tersedia pada kalender instruktur.
3. Alasan penjadwalan ulang dicatat secara opsional.
4. Tiket lama diperbarui statusnya menjadi `RESCHEDULED` dan slot baru terkunci.

---

## 47. Consultation Notes

Dokumentasi ringkasan pasca-sesi bimbingan:
- **Ringkasan untuk Member (*Shared Summary*):** Poin kesepakatan target mikro yang dapat dibaca member di aplikasinya.
- **Catatan Refleksi Instruktur (*Private Notes*):** Observasi mendalam instruktur untuk persiapan sesi bimbingan berikutnya.

---

## 48. Instructor Communication

Saluran komunikasi pesan terarah (*In-app Direct Messaging*):
- Komunikasi pesan hanya diizinkan antara instruktur dan member yang memiliki relasi penugasan aktif.
- Seluruh obrolan terekam dalam saluran resmi platform; dilarang mengalihkan komunikasi bimbingan ke aplikasi perpesanan pribadi tanpa izin.

---

## 49. Instructor Message Safety

Kode etik komunikasi pesan instruktur:
- Menggunakan bahasa yang profesional, santun, dan suportif.
- Dilarang melakukan pelecehan, intimidasi, perundungan (*body shaming*), atau pemaksaan target ekstrem.

---

## 50. Instructor Reports

Laporan rekapitulasi efektivitas bimbingan instruktur:
- **Tingkat Keberhasilan Intervensi:** Rasio intervensi berstatus `IMPROVING` dibanding total intervensi diterbitkan.
- **Tingkat Kehadiran Konsultasi:** Rasio kehadiran sesi tatap muka.
- **Rata-rata Waktu Respons:** Kecepatan merespons sinyal berstatus `ATTENTION`.

---

## 51. Instructor Report Privacy

Perlindungan privasi dalam pelaporan:
- Laporan kinerja yang diserahkan ke manajemen atau institusi mitra disajikan dalam bentuk agregat statistik teranonimkan.
- Nama pribadi atau catatan privat member tidak dicantumkan dalam laporan evaluasi umum.

---

## 52. Instructor Export

Ekspor data binaan oleh instruktur:
- Dibatasi hanya untuk format rekap PDF/CSV ringkasan progres program binaan.
- Setiap unduhan berkas dicatat dalam log audit sistem (`report_exported`).

---

## 53. Instructor Search

Fitur pencarian instan pada dasbor instruktur:
- Mencari nama member binaan, ID program, atau jenis intervensi.
- Pencarian dibatasi secara ketat hanya pada ruang lingkup penugasan instruktur yang bersangkutan.

---

## 54. Instructor Filters

Filter multi-parameter untuk manajemen beban bimbingan:
- Filter berdasarkan tingkat urgensi sinyal: `Kritis (ATTENTION)`, `Waspada (NOTICE)`, `Stabil (INFO)`.
- Filter berdasarkan program: Kampus Sehat, Kebugaran Karyawan, Mandiri.
- Filter berdasarkan status bimbingan: Belum Ada Intervensi, Menunggu Review Tindak Lanjut.

---

## 55. Instructor Bulk Actions

Tindakan massal terkurasi untuk efisiensi instruktur:
- Mengirimkan pesan motivasi atau tips kesehatan mingguan ke seluruh member dalam satu program bimbingan.
- Menandai beberapa sinyal ringan (`INFO`) sebagai telah ditinjau secara bersamaan.

---

## 56. Bulk Action Safety

Pengamanan tindakan massal:
- Dilarang menerbitkan intervensi personalisasi secara serampangan (*mass blasting*).
- Konfirmasi ganda diwajibkan saat melakukan aksi massal yang berdampak pada > 10 member sekaligus.

---

## 57. Instructor Escalation

Prosedur eskalasi kasus oleh instruktur (*Escalation Protocol*):

```text
Instruktur Temukan Deviasi Ekstrem / Dugaan Masalah Medis
                             │
                             ▼
Terbitkan Rujukan Eskalasi Resmi pada Profil Member
                             │
                             ▼
Notifikasi ke Member & Rekomendasi Pemeriksaan Faskes Klinis
                             │
                             ▼
Laporan Insiden Dicatat untuk Supervisi Administrator
```

---

## 58. Instructor Cannot Override Emergency System

> [!CAUTION]
> **Isolasi Alur Tanggap Darurat:**  
> Dasbor instruktur bukan terminal tanggap darurat medis. Jika member berada dalam situasi gawat darurat (misal: pingsan, nyeri dada akut), instruktur wajib mengarahkan member untuk segera menekan tombol darurat 119 dan dilarang mencoba menangani sendiri via obrolan aplikasi.

---

## 59. Instructor Safety Review

Tinjauan kepatuhan keselamatan instruktur:
- Seluruh intervensi dan pesan instruktur tunduk pada audit kepatuhan non-diagnostik.
- Pelanggaran berulang terhadap larangan pemberian resep obat atau vonis penyakit berakibat pada pembekuan akun (*SUSPENDED*).

---

## 60. Admin Definition

Administrator adalah pengelola operasional platform tingkat tertinggi yang bertanggung jawab atas ketersediaan layanan, integritas keamanan, kepatuhan regulasi, tata kelola pengguna, dan pengawasan mutu ekosistem PRONOIA.

---

## 61. Admin Core Responsibilities

Tanggung jawab utama administrator platform:
- **Manajemen Pengguna & Peran (*Identity & RBAC*):** Pendaftaran, verifikasi instruktur, perubahan peran, dan penangguhan akun bermasalah.
- **Tata Kelola Program & Tantangan (*Program Operations*):** Pembuatan inisiatif kesehatan kampus/perusahaan dan moderasi tantangan.
- **Moderasi Komunitas:** Penegakan pedoman etika forum, pembersihan konten terlarang, dan tindak lanjut laporan pelanggaran.
- **Kurasi Pustaka Edukasi:** Verifikasi materi artikel kesehatan preventif sebelum dipublikasikan ke repositori RAG.
- **Konfigurasi Mesin & Fitur (*System Flags*):** Pengaturan ambang batas deviasi engine, fitur baru (*feature flags*), dan integrasi AI.
- **Audit & Keamanan:** Pemantauan buku besar audit (*Audit Trail*), investigasi insiden kebocoran, dan pencadangan data.

---

## 62. Admin Dashboard

Arsitektur modul pada Dasbor Administrator PRONOIA:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     DASBOR ADMINISTRATOR PRONOIA                       │
├────────────────────────────────────────────────────────────────────────┤
│ [RINGKASAN OPERASIONAL PLATFORM]                                       │
│  Total Pengguna: 12.450 | Instruktur Aktif: 48 | Program Berjalan: 12  │
│  Antrean Moderasi: 4    | Tiket Eskalasi: 2    | Status Sistem: NORMAL │
├────────────────────────────────────────────────────────────────────────┤
│ [NAVIGASI UTAMA TATA KELOLA]                                           │
│  [Pengguna & Instruktur]  [Program & Tantangan]  [Moderasi Komunitas]  │
│  [Pustaka Edukasi]        [Konfigurasi Aturan]   [Buku Besar Audit]    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 63. Admin Dashboard Metrics

Metrik operasional yang dipantau administrator:
- **Pertumbuhan Pengguna (*User Growth*):** Pendaftaran harian, konversi onboarding, dan retensi 30 hari.
- **Aktivitas Bimbingan:** Volume konsultasi terlaksana dan rasio penyelesaian intervensi.
- **Kesehatan Sistem (*System Health*):** Rata-rata latensi API, konsumsi kuota token AI, dan status antrean antartugas.

---

## 64. User Management

Fitur pengelolaan akun pengguna oleh administrator:
- Pencarian pengguna berdasarkan email, nama, atau nomor ID.
- Mengaktifkan, membekukan (*suspend*), atau menonaktifkan akun.
- Mengatur ulang kata sandi dengan pengiriman tautan verifikasi aman ke email terdaftar.

---

## 65. User Management Boundaries

Batasan keselamatan administrator atas akun pengguna:
- **Larangan Penyamaran Diam-diam (*No Silent Impersonation*):** Setiap tindakan impersonasi untuk debugging wajib dicatat dalam log audit dengan persetujuan ganda.
- **Larangan Manipulasi Data Kesehatan:** Administrator dilarang mengedit atau memalsukan log kesehatan riil milik pengguna.

---

## 66. Role Management

Pengelolaan wewenang peran sistem:
- Pemberian (*Grant*) atau pencabutan (*Revoke*) peran `Instructor` atau `Admin`.
- Setiap perubahan peran memicu pencatatan audit tingkat tinggi (*High-severity Audit Event*).

---

## 67. Role Change Flow

Alur pengubahan peran pengguna:
`Admin Buka Profil Akun` ──▶ `Pilih Peran Baru` ──▶ `Sistem Minta Masukkan Ulang Kata Sandi Admin (Re-auth)` ──▶ `Konfirmasi & Catat Log Audit` ──▶ `Hak Akses Berubah Seketika`.

---

## 68. Instructor Management

Pengawasan khusus instruktur oleh administrator:
- Meninjau antrean permohonan verifikasi instruktur baru.
- Menilai kelayakan sertifikasi dan menentukan batas kuota member binaan.
- Menonaktifkan instruktur yang melanggar kode etik keselamatan.

---

## 69. Instructor Assignment Management

Distribusi penugasan bimbingan:
- Menautkan instruktur ke program kemitraan kampus atau perusahaan.
- Memindahkan member dari satu instruktur ke instruktur lain jika terjadi rotasi tugas atau cuti dinas.

---

## 70. Program Management

Pengelolaan inisiatif kesehatan terorganisir (*Health Programs*):
- Merancang program bertema (misal: *"Program Kebugaran Civitas Akademika"* atau *"Gerakan Tidur Nyenyak Mahasiswa Akhir"*).
- Menentukan kriteria kelayakan peserta, durasi program, dan instruktur penanggung jawab.

---

## 71. Program Structure

Struktur entitas program kesehatan:

```text
PROGRAM KESEHATAN TERORGANISIR
├── Profil: Nama, Deskripsi, Sasaran Target Utama
├── Periode: Tanggal Mulai, Tanggal Selesai
├── Kapasitas: Kuota Maksimal Peserta, Instruktur yang Ditugaskan
├── Kurikulum: Modul Edukasi Terkait, Tantangan Kebiasaan Wajib
└── Status: DRAFT / ACTIVE / COMPLETED / ARCHIVED
```

---

## 72. Program Status

Status siklus program: `DRAFT` ──▶ `ACTIVE` ──▶ `PAUSED` ──▶ `COMPLETED` ──▶ `ARCHIVED`.

---

## 73. Program Lifecycle

Evolusi program dari inisiasi hingga evaluasi:
1. **Perancangan (*Draft*):** Penentuan silabus dan aturan bimbingan.
2. **Publikasi (*Active*):** Pembukaan pendaftaran peserta.
3. **Pelaksanaan (*Monitoring*):** Instruktur memantau deviasi member dalam program.
4. **Penutupan (*Completed*):** Evaluasi luaran kesehatan kohort peserta.
5. **Pengarsipan (*Archived*):** Data disimpan dalam mode baca untuk riset lanjutan.

---

## 74. Challenge Management

Administrasi tantangan kebiasaan komunitas:
- Membuat tantangan baru (misal: *"Tantangan 10.000 Langkah 14 Hari"* atau *"Tantangan Rutin Minum Air 2 Liter"*).
- Menentukan mekanisme validasi pencapaian dan lencana apresiasi non-adiktif.

---

## 75. Challenge Safety Review

Audit keselamatan sebelum tantangan dirilis ke publik:
- Target fisik wajib berada dalam batas biologis aman (dilarang membuat tantangan puasa ekstrem atau olahraga tanpa henti).
- Memastikan tantangan memiliki klausul inklusivitas bagi berbagai tingkat kebugaran.

---

## 76. Community Administration

Pengawasan ruang diskusi komunitas:
- Memantau topik yang sedang tren dan partisipasi interaksi.
- Mengelola kebijakan pedoman komunitas (*Community Guidelines*).

---

## 77. Community Moderation Queue

Antrean moderasi konten yang dilaporkan pengguna:

```text
Postingan Dilaporkan Pengguna ──▶ Masuk Antrean Moderasi ──▶ Prioritas Berdasarkan Skor Risiko
                                                                     │
         ┌───────────────────────────────────────────────────────────┘
         ▼
Pemeriksaan Manual Administrator ──▶ Tindakan Moderasi ──▶ Catat Log Audit
```

---

## 78. Moderation Actions

Pilihan tindakan moderasi konten:
- **`NO_ACTION`:** Laporan tidak terbukti melanggar pedoman.
- **`WARN`:** Mengirimkan teguran edukatif privat kepada penulis konten.
- **`HIDE` / `REMOVE`:** Menyembunyikan atau menghapus postingan dari forum publik.
- **`RESTRICT_USER`:** Membatasi hak komentar pengguna selama 7 hari.
- **`SUSPEND_USER`:** Membekukan akun pengguna karena pelanggaran berat.

---

## 79. Moderation Principles

Prinsip penegakan moderasi PRONOIA:
- **Proporsional:** Sanksi disesuaikan dengan tingkat keparahan pelanggaran.
- **Transparan:** Pengguna yang dikenai sanksi menerima penjelasan pasal pedoman yang dilanggar.
- **Auditabel:** Setiap tindakan moderasi mencatat nama admin penanggung jawab.

---

## 80. User Report Handling

Struktur data tiket laporan pelanggaran:
- `reporter_id`: Pengguna yang melapor.
- `target_type`: Postingan, komentar, atau profil pengguna.
- `violation_reason`: Spam, klaim medis berbahaya, kata kasar, pelecehan.
- `status`: `OPEN`, `UNDER_REVIEW`, `RESOLVED`, `DISMISSED`.

---

## 81. Moderation Status

Siklus tiket moderasi: `OPEN` ──▶ `UNDER_REVIEW` ──▶ `RESOLVED` *(atau `DISMISSED` / `ESCALATED`)*.

---

## 82. Content Management

Pengelolaan pustaka konten edukasi kesehatan:
- Pembuatan dan pembaruan artikel edukatif sains preventif.
- Pengelolaan pertanyaan umum (*FAQ*) dan panduan fitur aplikasi.
- Pengumuman resmi sistem (*System Broadcast Notices*).

---

## 83. Health Content Governance

Tata kelola materi kesehatan preventif:
- Wajib mencantumkan sumber rujukan ilmiah resmi (misal: jurnal terindeks, standar Kemenkes).
- Dilarang memuat klaim penyembuhan instan (*miracle cure*) atau produk komersial tidak teruji.

---

## 84. Content Status

Status publikasi artikel edukasi: `DRAFT` ──▶ `PEER_REVIEW` ──▶ `PUBLISHED` ──▶ `ARCHIVED`.

---

## 85. Content Revision

Pencatatan riwayat revisi artikel:
- Setiap perubahan materi menyimpan nomor versi, nama penulis, nama kurator peninjau, dan ringkasan pembaruan sains.

---

## 86. Admin Configuration

Pengaturan parameter dinamis platform:
- Nilai ambang deviasi *Behavioral Engine* (misal: batas defisit tidur 60 menit).
- Masa kedaluwarsa sesi token login dan batas laju API (*Rate Limits*).
- Sakelar aktivasi fitur baru (*Feature Flags*).

---

## 87. Configuration Safety

Protokol keamanan konfigurasi kritis:
- Perubahan konfigurasi mesin wajib divalidasi skemanya dan dapat dikembalikan (*instant rollback*) jika menimbulkan lonjakan galat.

---

## 88. Feature Flags

Pelepasan fitur secara bertahap (*Gradual Rollout*):
- Mengontrol fitur seperti: Pemindai Kamera OCR, Asisten Chat AI, Modul Komunitas, atau Integrasi Sensor Eksternal.

---

## 89. Feature Flag Lifecycle

Siklus hidup fitur baru: `DISABLED` ──▶ `INTERNAL_TESTING` ──▶ `PILOT_BETA (10%)` ──▶ `GENERAL_AVAILABILITY (100%)` ──▶ `DEPRECATED`.

---

## 90. AI Administration

Tata kelola infrastruktur kecerdasan buatan:
- Mengatur penyedia model utama (Gemini) dan penyedia cadangan.
- Memantau konsumsi token dan kuota biaya harian per pengguna.
- Dilarang melonggarkan batasan pagar pengaman keselamatan medis tanpa persetujuan komite etik.

---

## 91. AI Prompt Management

Pengelolaan versi prompt sistem (*System & Safety Prompts*):
- Seluruh pembaruan templat prompt harus melalui tahap pengujian red-teaming sebelum diaktifkan ke lingkungan produksi.

---

## 92. AI Model Configuration

Setelan parameter inferensi AI:
- Nama model aktif, batas token maksimal, suhu (*temperature*), dan setelan timeout jaringan.
- Seluruh setelan disimpan aman di environment server dan tidak pernah terekspos ke antarmuka publik.

---

## 93. Notification Management

Konfigurasi saluran pengiriman notifikasi:
- Pengaturan templat pesan dorong (*Push Notification*), email berkala, dan notifikasi dalam aplikasi (*In-App*).
- Menghormati preferensi jam tenang yang ditetapkan masing-masing member.

---

## 94. Notification Template Governance

Standar mutu templat pesan notifikasi:
- Menggunakan nada bicara yang ramah, informatif, dan tidak memicu kepanikan.
- Bebas dari pesan jebakan atau umpan klik (*clickbait*).

---

## 95. Membership Management

Tata kelola tingkat keanggotaan platform (*Membership Tiers*):
- Mengonfigurasi ketersediaan fitur per tingkatan (misal: akun Standar vs akun Premium Kampus).
- **Prinsip Keselamatan Universal:** Tingkatan keanggotaan hanya membedakan fasilitas bimbingan tambahan; algoritma deteksi deviasi dan keselamatan dasar tetap beroperasi identik bagi seluruh member.

---

## 96. Aturan Akses Tingkatan Membership (Membership Access Rules)

Sistem otorisasi PRONOIA menerapkan pemetaan akses berbasis tingkatan (*membership tiering*) yang dapat dikonfigurasi secara dinamis oleh Administrator tanpa memerlukan deployment ulang kode.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MEMBERSHIP TIER ACCESS MATRIX HIERARCHY                  │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ Tier Level        │ Cakupan Layanan & Akses Fitur Operasional               │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Silver (Dasar)    │ • Pelacakan metrik dasar (Core Tracking: Glukosa, Aktivitas, Makanan)│
│                   │ • Akses edukasi pencegahan kurasi umum                   │
│                   │ • AI Assistant mode standar (tanya-jawab dasar)         │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Gold (Menengah)   │ • Seluruh kapabilitas Tier Silver                       │
│                   │ • Fitur analitik lanjutan (korelasi gaya hidup & tren)  │
│                   │ • Partisipasi Challenge Komunitas bertarget             │
│                   │ • AI Assistant proaktif dengan pemetaan konteks riwayat │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Platinum (Tinggi) │ • Seluruh kapabilitas Tier Gold                         │
│                   │ • Alokasi Dedicated Human Instructor (Human-in-the-Loop)│
│                   │ • Intervensi personal berkala & evaluasi mingguan       │
│                   │ • Akses sesi konsultasi 1-on-1 (chat sinkron / video)   │
│                   │ • Dukungan prioritas operasional platform               │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

> [!NOTE]
> Seluruh matriks hak akses tingkatan tersimpan dalam konfigurasi database dinamis (`membership_tiers` & `tier_permissions`). Hal ini memungkinkan ekspansi tingkatan korporasi (Enterprise Tier) atau program kemitraan klinis di masa depan.

---

## 97. Laporan Analitik Administratif (Admin Reports)

Modul laporan eksekutif menyajikan visibilitas makro terhadap dinamika platform, memungkinkan Administrator mengambil keputusan strategis berbasis data empiris:

1. **Pertumbuhan Pengguna (*User Growth*):** Registrasi harian/mingguan/bulanan, rasio aktivasi akun, dan tingkat retensi per kohor.
2. **Keterlibatan (*Engagement Rate*):** *Daily Active Users* (DAU), *Monthly Active Users* (MAU), serta frekuensi pencatatan log mandiri (*self-logging frequency*).
3. **Partisipasi Program (*Program Participation*):** Angka pendaftaran program kohor, laju penyelesaian tahapan (*completion rate*), dan retensi peserta.
4. **Penyelesaian Challenge (*Challenge Completion*):** Tingkat keberhasilan tantangan mikro dan kelompok sasaran berkinerja tinggi.
5. **Volume Konsultasi (*Consultation Volume*):** Total sesi konsultasi terjadwal, rasio kehadiran (*show-up rate*), dan pembatalan/reschedule.
6. **Aktivitas Instruktur (*Instructor Activity*):** Volume intervensi aktif, waktu respons rata-rata (*mean time to intervene*), dan kepatuhan tindak lanjut.
7. **Kesehatan Komunitas (*Community Health*):** Jumlah postingan, rasio moderasi pelanggaran, serta interaksi positif antar-anggota.
8. **Penggunaan Sistem (*System Usage*):** Beban antrean komputasi sinyal, latensi pemrosesan mesin perilaku, dan statistik eksekusi AI.

---

## 98. Perlindungan Data Kesehatan dalam Laporan Admin (Health Data in Admin Reports)

Platform PRONOIA memberlakukan postur kepatuhan privasi yang ketat dalam perancangan laporan manajerial:

$$\mathbf{Prinsip\ Utama:}\quad \text{Data Agregat} \gg \text{Data Mentah Individual}$$

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PRIVACY-PRESERVING REPORTING ARCHITECTURE                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ Data Mentah Member ] ──> ( Anonymization & Differential Privacy )        │
│                                           │                                 │
│                                           ▼                                 │
│                           [ Metrik Agregat Platform ]                       │
│                                           │                                 │
│                                           ▼                                 │
│                           [ Admin Reporting Dashboard ]                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Data individual hanya diizinkan untuk diakses pada laporan manajerial jika dan hanya jika memenuhi seluruh kondisi berikut:
- **Tujuan Operasional yang Jelas (*Clear Operational Purpose*):** Misalnya investigasi kegagalan pengiriman resep intervensi darurat.
- **Otorisasi Eksplisit (*Explicit Authorization*):** Memerlukan hak akses `reports.view_pii` dengan persetujuan ganda (*dual sign-off*).
- **Cakupan Minimum (*Minimum Necessary Scope*):** Kolom data kesehatan yang tidak relevan harus disamarkan secara otomatis (*dynamic data masking*).

---

## 99. Tata Kelola Ekspor Laporan (Report Export Governance)

Setiap pengunduhan data keluar dari sistem PRONOIA wajib melewati gerbang verifikasi ketat guna mencegah kebocoran data (*data exfiltration*):

```text
Permintaan Ekspor ──> Verifikasi Hak ──> Batasi Filter ──> Tentukan Format ──> Catat Audit ──> Tautan Bertarget (TTL)
```

- **Otorisasi Ketat (*Authorization*):** Hanya pengguna dengan izin `reports.export` yang dapat menginisiasi proses pengunduhan.
- **Pembatasan Cakupan (*Scope Restriction*):** Batas rentang waktu maksimum dan batas volume record per berkas.
- **Filter Ketat (*Strict Filtering*):** Peniadaan kolom nomor identitas pribadi (NIK/KTP, alamat fisik, nomor kartu pembayaran).
- **Format Aman (*Secure Format*):** Berkas CSV/XLSX/PDF dienkripsi dengan kata sandi acak yang dikirimkan via kanal terpisah (*out-of-band*).
- **Audit Komprehensif (*Comprehensive Audit*):** Pencatatan ID pemohon, filter parameter, jumlah baris, hash berkas, dan alamat IP.
- **Masa Kedaluwarsa (*Time-to-Live Expiration*):** Tautan unduhan berkas sementara dihapus permanen dari server penyimpanan dalam waktu 24 jam.

---

## 100. Pencatatan Audit Keamanan (Audit Logs)

Sistem audit logging bertindak sebagai buku besar forensik (*forensic ledger*) yang merekam seluruh mutasi dan akses terhadap data sensitif:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SECURITY AUDIT EVENT COVERAGE MATRIX                     │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Kategori Peristiwa       │ Contoh Aksi yang Wajib Dicatat                   │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Tata Kelola Peran        │ Perubahan role pengguna, promosi/demosi admin    │
│ Penugasan Instruktur     │ Alokasi instruktur ke member, pencabutan tugas   │
│ Akses Rekam Medis        │ Pembukaan detail riwayat glukosa & profil member │
│ Tindakan Intervensi      │ Pembuatan rekomendasi, pembaruan status tindak   │
│ Mutasi Data Kesehatan    │ Modifikasi manual atau koreksi pembacaan metrik  │
│ Moderasi Komunitas       │ Penghapusan postingan, pemblokiran akun member   │
│ Konfigurasi Platform     │ Pengubahan feature flag, ambang batas sinyal     │
│ Orkestrasi AI            │ Eksekusi AI Tool calling berstatus sensitif      │
│ Ekspor Data              │ Pengunduhan rekap laporan analitik atau log      │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 101. Struktur Skema Entitas Audit (Audit Event Structure)

Setiap rekaman peristiwa audit disimpan dalam skema relasional terstandar yang dioptimalkan untuk penelusuran forensik cepat:

```text
┌───────────────────┬─────────────────────────────────────────────────────────┐
│ Kolom Skema       │ Penjelasan & Spesifikasi Teknis                         │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ id                │ UUIDv7 (berurutan secara kronologis)                    │
│ actor_id          │ ID unik pengguna yang mengeksekusi tindakan             │
│ actor_role        │ Peran aktif pelaku pada saat aksi (e.g., 'instructor')  │
│ action            │ Nama tindakan terstandar (e.g., 'member.profile.view')  │
│ target_type       │ Entitas sasaran (e.g., 'App\Models\MemberProfile')      │
│ target_id         │ ID entitas sasaran yang dimutasi atau diakses           │
│ context           │ Payload JSON terfilter (metadata, perubahan old vs new) │
│ ip_address        │ Alamat IP v4/v6 asal permintaan klien                   │
│ user_agent        │ String agen peramban atau perangkat seluler             │
│ result            │ Status hasil aksi: 'SUCCESS', 'DENIED', atau 'ERROR'    │
│ timestamp         │ Presisi timestamp UTC mikrodetik (ISO 8601)             │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

> [!CAUTION]
> Dilarang keras merekam data payload mentah yang memuat kredensial akun, token akses, atau informasi klinis yang tidak disamarkan ke dalam kolom `context`.

---

## 102. Prinsip Imutabilitas Log Audit (Audit Immutability)

Buku besar audit log dirancang dengan arsitektur berorientasi penambahan saja (*append-only architecture*):
- Antarmuka aplikasi web dan endpoint API **tidak menyediakan** fungsi edit (`UPDATE`) maupun hapus (`DELETE`) terhadap rekaman audit.
- Baris tabel audit diproteksi pada tingkat basis data menggunakan hak akses *read-and-insert only* bagi koneksi aplikasi standar.
- Pengujian integritas log berkala dilakukan menggunakan penautan hash kriptografis (*cryptographic hashing*) untuk mendeteksi manipulasi database internal.

---

## 103. Visibilitas Akses Log Audit (Audit Visibility)

Akses pembacaan terhadap rekaman jejak audit dikendalikan secara ketat berdasarkan hierarki peran:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                      AUDIT LOG ACCESS VISIBILITY TIERS                      │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Peran Pengguna           │ Hak Akses Log yang Diizinkan                     │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Super Administrator      │ Akses penuh terhadap seluruh log audit platform  │
│ Compliance Officer       │ Akses pencarian log keamanan, kepatuhan, & privasi│
│ Instructor               │ Hanya melihat log aktivitas intervensi & tindak  │
│                          │ lanjut milik member yang ditugaskan kepadanya    │
│ Member                   │ Hanya melihat riwayat aktivitas akun personal    │
│                          │ (misal: histori login, pembaruan profil)         │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 104. Standar Keamanan Akun Administrator (Admin Security Standards)

Mengingat tingginya wewenang administratif, seluruh akun Administrator wajib tunduk pada protokol keamanan tingkat tinggi:
- **Kebijakan Sandi Kompleks (*Strong Password Policy*):** Minimal 16 karakter yang mengombinasikan huruf besar, huruf kecil, angka, dan simbol khusus.
- **Autentikasi Multifaktor Wajib (*Mandatory MFA/2FA*):** Penggunaan aplikasi autentikator berbasis TOTP (*Time-based One-Time Password*) atau kunci perangkat keras FIDO2/WebAuthn.
- **Proteksi Sesi Terenkripsi (*Encrypted Session Security*):** Cookie sesi bertanda tangan (*cryptographically signed*), berflag `HttpOnly`, `Secure`, dan `SameSite=Strict`.
- **Pembatasan Laju Akses (*Aggressive Rate Limiting*):** Pemblokiran otomatis terhadap alamat IP yang mengalami kegagalan login berulang.
- **Pencatatan Audit Akses (*Continuous Access Auditing*):** Perekaman setiap transaksi sesi login ke dalam repositori audit khusus.

---

## 105. Manajemen Siklus Sesi Admin (Admin Session Management)

Sesi Administrator memiliki batasan operasional yang ketat guna meminimalkan risiko pembajakan sesi (*session hijacking*):
- **Waktu Henti Singkat (*Inactivity Timeout*):** Sesi administratif dinyatakan kedaluwarsa otomatis setelah 15 menit tanpa aktivitas pengguna.
- **Autentikasi Ulang Aksi Kritis (*Step-up Re-authentication*):** Permintaan konfirmasi kata sandi atau kode MFA ulang sebelum menjalankan aksi berisiko tinggi.
- **Invalidasi Sesi Global (*Global Session Invalidation*):** Kemampuan untuk mencabut seluruh sesi aktif lainnya secara instan dari menu profil pengguna.
- **Deteksi Anomali Perangkat (*Device Anomaly Detection*):** Penolakan otomatis sesi jika terdeteksi lonjakan perubahan alamat IP geografis yang mencurigakan (*impossible travel*).

---

## 106. Daftar Aksi Wajib Autentikasi Ulang (Re-authentication Actions)

Sebelum server mengeksekusi operasi kritis berikut, Administrator diwajibkan memasukkan kembali kredensial aktif (*step-up challenge*):

```text
[ Tindakan Kritis Diajukan ]
             │
             ├──► 1. Perubahan Peran Pengguna (Role Promotion / Demotion)
             ├──► 2. Penonaktifan Massal atau Penghapusan Akun Pengguna
             ├──► 3. Pengubahan Pengaturan Konfigurasi Global Platform
             ├──► 4. Ekspor Data Laporan Bervolume Besar (Mass Export)
             └──► 5. Pengubahan Parameter Kunci Keamanan & Kredensial Sistem
             │
   [ Input Ulang Password / Biometrik / TOTP ]
             │
             ▼
     [ Eksekusi Aman ]
```

---

## 107. Pipeline Eksekusi Operasi Massal Admin (Admin Bulk Operations)

Aksi massal (*bulk operations*) yang berdampak pada banyak entitas wajib dijalankan melalui pipeline bertahap untuk mencegah malafungsi operasional:

```text
Pratinjau (Preview) ──> Validasi Seleksi ──> Konfirmasi Bertingkat ──> Eksekusi Asinkron ──> Audit Lengkap
```

1. **Pratinjau (*Preview*):** Menampilkan daftar persis entitas yang terdampak beserta indikator status terkini.
2. **Validasi (*Validate*):** Mesin mengevaluasi apakah ada batasan bisnis yang dilanggar (misal: menonaktifkan pengguna dengan sesi darurat aktif).
3. **Konfirmasi (*Confirm*):** Administrator wajib mengetikkan frasa verifikasi (misal: frasa `"NONAKTIFKAN 25 PENGGUNA"`) dan memasukkan alasan operasional.
4. **Eksekusi (*Execute*):** Pemrosesan dilakukan di latar belakang (*background job queue*) dengan pelaporan progres secara berkala.
5. **Audit (*Audit*):** Menerbitkan satu entri audit induk (*batch audit log*) yang merujuk pada seluruh ID anak yang terdampak.

---

## 108. Alur Penonaktifan Pengguna Massal (Bulk User Deactivation Flow)

Diagram operasional penonaktifan akun secara massal:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                     BULK USER DEACTIVATION WORKFLOW                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [ Pilih Daftar Pengguna ]                                                 │
│               │                                                             │
│               ▼                                                             │
│   [ Tinjau Dampak & Keterikatan Program ]                                   │
│               │                                                             │
│               ▼                                                             │
│   [ Masukkan Alasan Operasional Wajib (Audit Trail) ]                       │
│               │                                                             │
│               ▼                                                             │
│   [ Verifikasi Autentikasi Ulang (Step-up MFA) ]                            │
│               │                                                             │
│               ▼                                                             │
│   [ Eksekusi via Queue Worker (Soft Deactivate) ]                           │
│               │                                                             │
│               ▼                                                             │
│   [ Rekam Log Audit Lengkap & Notifikasi Pengguna Terkait ]                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 109. Batasan Akses Data Kesehatan oleh Admin (Admin Data Access Boundary)

PRONOIA menegakkan pemisahan wewenang yang tegas antara pengelolaan infrastruktur sistem dan rekam data personal:

$$\mathbf{Prinsip\ Mutlak:}\quad \text{Hak Istimewa Admin} \neq \text{Akses Tanpa Batas ke Rekam Medis}$$

- Administrator bertugas memelihara kelancaran ekosistem, perizinan, dan kepatuhan sistem.
- Administrator **tidak memiliki hak bawaan** untuk membaca riwayat gula darah harian, catatan harian makanan personal, atau catatan konsultasi privat member.
- Setiap akses terhadap data sensitif yang melampaui batas operasional standar diklasifikasikan sebagai pelanggaran keamanan kecuali melalui prosedur darurat resmi.

---

## 110. Protokol Akses Pintu Darurat (Break-Glass Access Protocol)

Apabila terjadi situasi darurat teknis, penyelidikan hukum, atau ancaman keselamatan jiwa yang membutuhkan investigasi mendalam, platform mengaktifkan mekanisme *Break-Glass*:

```text
Pengajuan Darurat ──> Alasan Yuridis ──> Re-autentikasi MFA ──> Persetujuan Supervisor ──> Akses Berbatas Waktu ──> Audit Forensik
```

1. **Permintaan Resmi (*Formal Request*):** Administrator mengajukan tiket darurat ke sistem keamanan internal.
2. **Justifikasi Legal (*Documented Reason*):** Pengisian formulir wajib yang mencakup nomor insiden atau surat perintah penyelidikan.
3. **Otentikasi Ulang (*Step-up Re-auth*):** Verifikasi kredensial tingkat tinggi dengan token khusus.
4. **Persetujuan Ganda (*Dual-Control Approval*):** Memerlukan tanda tangan digital minimal dua pimpinan eksekutif/keamanan (*dual sign-off*).
5. **Akses Berbatas Waktu (*Time-Boxed Access*):** Izin akses hanya berlaku dalam jendela waktu sempit (misal: maksimum 2 jam) dan dicabut otomatis.
6. **Pencatatan Audit Forensik (*Forensic Logging*):** Setiap kueri basis data dan pembacaan record direkam dengan tingkat rincian tertinggi.

---

## 111. Delegasi Tugas Instruktur (Instructor Delegation)

Ketika seorang Instruktur berhalangan hadir (misal: cuti medis atau perjalanan dinas), tanggung jawab pemantauan member dapat didelegasikan secara aman:

```text
Instruktur Utama ──> Permintaan Delegasi ──> Verifikasi Kualifikasi ──> Otorisasi Admin/Lead ──> Akses Berbatas Waktu ──> Jejak Audit
```

- **Cakupan Terikat (*Bound Scope*):** Instruktur pengganti hanya menerima hak akses terhadap member program terkait, bukan seluruh portofolio instruktur utama.
- **Jangka Waktu Pasti (*Fixed Duration*):** Hak akses delegasi memiliki cap waktu mulai dan cap waktu kedaluwarsa otomatis (*auto-expiry*).
- **Transparansi Member (*Member Transparency*):** Member menerima notifikasi resmi bahwa pendampingan sementara dialihkan ke instruktur pengganti.
- **Akuntabilitas Penuh (*Full Accountability*):** Setiap catatan intervensi yang dibuat instruktur pengganti mencantumkan metadata delegasi secara gamblang.

---

## 112. Otorisasi Tingkat Program (Program-Level Permissions)

Untuk mendukung organisasi kesehatan atau korporasi yang mengelola beragam program kohor mandiri, PRONOIA mendukung izin terisolasi (*scoped permissions*):

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROGRAM-SCOPED RBAC ARCHITECTURE                         │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Area Otoritas Program    │ Kapabilitas Administratif Terisolasi             │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Manajemen Program        │ Mengedit kurikulum kohor, tanggal mulai & selesai│
│ Pendaftaran Peserta      │ Menyetujui pendaftaran member baru ke program    │
│ Tata Kelola Challenge    │ Membuat dan mempublikasikan challenge internal   │
│ Alokasi Instruktur       │ Menugaskan instruktur terverifikasi ke peserta   │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> Administrator Program tidak memiliki hak untuk mengubah peran pengguna global, mengakses audit log seluruh sistem, atau mengubah konfigurasi inti server PRONOIA.

---

## 113. Model Daftar Hak Izin Terstandar (Standard Permission Model)

PRONOIA mengadopsi taksonomi perizinan granular yang dapat digabungkan ke dalam peran (*Role-Based Access Control*):

```text
users.view               users.manage
roles.view               roles.manage
instructors.view         instructors.manage
programs.view            programs.manage
members.view_assigned    health.view_assigned
health.view_summary      interventions.create
interventions.update     consultations.manage
community.moderate       reports.view
reports.export           audit.view
settings.manage          system.maintenance
```

---

## 114. Konvensi Penamaan Hak Izin (Permission Naming Convention)

Penamaan hak izin mengikuti pola baku yang konsisten dan mudah dipetakan pada gerbang otorisasi backend:

$$\mathbf{Format:}\quad \texttt{resource.action}$$

```text
Contoh:
• members.view           ──> Hak membaca data umum member yang ditugaskan
• members.update         ──> Hak memperbarui profil administratif member
• interventions.create   ──> Hak menerbitkan rekomendasi intervensi baru
• reports.export         ──> Hak mengunduh berkas laporan analitik agregat
```

---

## 115. Implementasi Kebijakan Otorisasi Laravel (Policy Model)

Kebijakan backend (*Laravel Policies*) bertindak sebagai baris pertahanan penentu apakah suatu aksi diizinkan:

```php
namespace App\Policies;

use App\Models\User;
use App\Models\MemberProfile;

class MemberProfilePolicy
{
    /**
     * Menentukan apakah instruktur berhak melihat profil & data sinyal member.
     */
    public function view(User $user, MemberProfile $profile): bool
    {
        // 1. Verifikasi peran aktif pengguna
        if (!$user->hasRole('instructor')) {
            return false;
        }

        // 2. Evaluasi status verifikasi instruktur
        if (!$user->instructorProfile || !$user->instructorProfile->isVerified()) {
            return false;
        }

        // 3. Verifikasi apakah ada relasi penugasan aktif
        return $profile->isAssignedToInstructor($user->id)
            && $profile->hasActiveProgramEnrollment();
    }
}
```

---

## 116. Alur Otorisasi Akses Instruktur (Instructor Access Pipeline)

Pipeline evaluasi keamanan saat Instruktur meminta data sinyal perilaku member:

```text
Permintaan Klien (GET /api/v1/instructor/members/{id}/signals)
                    │
                    ▼
          [ Terautentikasi? ] ──(Tidak)──► 401 Unauthorized
                    │ (Ya)
                    ▼
        [ Memiliki Peran Instruktur? ] ──(Tidak)──► 403 Forbidden
                    │ (Ya)
                    ▼
     [ Terverifikasi & Aktif? ] ──(Tidak)──► 403 Forbidden
                    │ (Ya)
                    ▼
     [ Terikat Penugasan Member Tersebut? ] ──(Tidak)──► 403 Forbidden
                    │ (Ya)
                    ▼
      [ Memiliki Izin health.view_assigned? ] ──(Tidak)──► 403 Forbidden
                    │ (Ya)
                    ▼
   [ Kembalikan Payload Sinyal yang Disaring ]
```

---

## 117. Alur Otorisasi Akses Admin (Admin Access Pipeline)

Pipeline evaluasi keamanan saat Administrator mengubah konfigurasi peran pengguna:

```text
Permintaan Klien (POST /api/v1/admin/users/{id}/roles)
                    │
                    ▼
          [ Terautentikasi? ] ──(Tidak)──► 401 Unauthorized
                    │ (Ya)
                    ▼
       [ Memiliki Peran Administrator? ] ──(Tidak)──► 403 Forbidden
                    │ (Ya)
                    ▼
       [ Memiliki Izin roles.manage? ] ──(Tidak)──► 403 Forbidden
                    │ (Ya)
                    ▼
       [ Lolos Validasi Target & Kuorum? ] ──(Tidak)──► 422 Unprocessable
                    │ (Ya)
                    ▼
        [ Eksekusi Pembaruan Peran ]
                    │
                    ▼
       [ Catat Transaksi ke Audit Log ]
```

---

## 118. Otorisasi UI vs Otorisasi Backend (UI vs Backend Authorization)

PRONOIA memperlakukan keamanan antarmuka dan keamanan server sebagai dua disiplin yang terpisah namun saling melengkapi:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    UI HIDING (UX) vs BACKEND POLICIES (SECURITY)            │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ Menyembunyikan Tombol di Antarmuka   │ Penolakan Permintaan di Server       │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Tujuan: Mengoptimalkan User        │ • Tujuan: Mencegah Pelanggaran Akses │
│   Experience & mencegah kebingungan  │   dan Penetrasi Data Tidak Sah       │
│ • Sifat: Kenyamanan Visual (UX)      │ • Sifat: Benteng Keamanan Absolut    │
│ • Dapat dimanipulasi via DevTools    │ • Tidak dapat ditembus via API       │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

> [!WARNING]
> Menyembunyikan tombol aksi pada dashboard antarmuka **bukanlah mekanisme keamanan**. Setiap controller dan route endpoint di backend wajib menyertakan verifikasi middleware dan policy independen.

---

## 119. Manajemen Pengalihan Konteks Peran (Role Switching)

Bagi staf yang memiliki peran ganda yang sah (misalnya seorang dokter spesialis yang juga berperan sebagai Member untuk melacak kesehatannya sendiri):
- Antarmuka menampilkan indikator visual yang kontras mengenai ruang kerja yang sedang aktif (*Active Workspace Banner*).
- Pengalihan ruang kerja (*Switch Workspace*) membutuhkan pertukaran token sesi atau penegasan ulang konteks operasional.
- Backend memvalidasi hak akses berdasarkan token konteks aktif pada header permintaan, bukan sekadar riwayat akun pengguna di basis data.

```text
[ Profil Akun: Dr. Andi ] ──┬──► Mode Aktif: [ Ruang Kerja Instruktur ] ──► Akses Data Member Bimbingan
                            │
                            └──► Mode Aktif: [ Ruang Kerja Member Pribadi ] ──► Akses Data Kesehatan Sendiri
```

---

## 120. Peta Navigasi Ruang Kerja Instruktur (Instructor Workspace IA)

Arsitektur informasi pada panel navigasi utama Instruktur dioptimalkan untuk responsivitas intervensi:

```text
Ruang Kerja Instruktur (Instructor Workspace)
├── 1. Ringkasan (Overview)          ── Dashboard metrik harian & antrean tugas
├── 2. Member (Assigned Members)     ── Direktori member bimbingan & riwayat
├── 3. Sinyal (Behavioral Signals)   ── Feed sinyal kepatuhan & anomali gaya hidup
├── 4. Intervensi (Interventions)    ── Manajemen tiket rekomendasi & evaluasi
├── 5. Konsultasi (Consultations)    ── Kalender booking, link video, & catatan
├── 6. Program (Programs)            ── Modul kohor yang diampu & materi panduan
├── 7. Laporan (Reports)             ── Ringkasan kepatuhan kohor & progres bimbingan
└── 8. Profil & Jadwal (Profile)     ── Pengaturan jam kerja & data sertifikasi
```

---

## 121. Peta Navigasi Ruang Kerja Admin (Admin Workspace IA)

Arsitektur navigasi panel Administrator difokuskan pada pengawasan operasional dan tata kelola platform:

```text
Ruang Kerja Admin (Admin Workspace)
├── 1. Ringkasan (Overview)          ── Metrik operasional global & peringatan sistem
├── 2. Pengguna (User Management)    ── Tata kelola akun, status, & penetapan peran
├── 3. Instruktur (Instructors)      ── Verifikasi kredensial, beban kerja, & evaluasi
├── 4. Program (Programs)            ── Pengaturan kohor, silabus, & kuota peserta
├── 5. Challenge (Challenges)        ── Manajemen tantangan hidup sehat & gamifikasi
├── 6. Komunitas (Community)         ── Antrean moderasi konten & pengawasan forum
├── 7. Laporan (Analytics & Reports) ── Agregasi tren kesehatan & utilisasi sistem
├── 8. Audit Log (Audit Trail)       ── Penelusuran rekaman forensik & investigasi
├── 9. Konfigurasi (Settings)        ── Feature flags, parameter mesin, & integrasi
└── 10. Profil Keamanan (Security)   ── Kredensial admin, sesi aktif, & konfigurasi MFA
```

---

## 122. Isolasi Peran Antarmuka (Role Isolation Principle)

Aplikasi klien PRONOIA menerapkan prinsip isolasi aset antarmuka secara tegas:
- Bundel JavaScript dan modul antarmuka Administrator **tidak pernah dimuat** pada sesi pengguna dengan peran Member biasa.
- Modul administrasi dipisahkan menjadi *code-splitting bundle* tersendiri yang diproteksi oleh *auth-guard* rute sebelum diunduh oleh peramban klien.
- Kegagalan otorisasi rute langsung me-redirect pengguna ke halaman aman tanpa menampilkan struktur UI internal.

---

## 123. Saluran Notifikasi Berbasis Peran (Role-Based Notification Channels)

Sistem perutean notifikasi memilah pesan berdasarkan tingkat kepentingan dan tanggung jawab operasional masing-masing aktor:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                   ROLE-BASED NOTIFICATION ROUTING MATRIX                    │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ Peran Sasaran     │ Pemicu Peristiwa Notifikasi                             │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Instruktur        │ • Penugasan member bimbingan baru                       │
│                   │ • Sinyal kritis member memerlukan tindak lanjut cepat   │
│                   │ • Member melakukan booking jadwal konsultasi baru       │
│                   │ • Member menandai intervensi sebagai "Selesai/Tuntas"   │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Administrator     │ • Pelaporan konten komunitas oleh member                │
│                   │ • Peringatan anomali beban kerja / kegagalan antrean    │
│                   │ • Notifikasi percobaan akses tidak sah (Security Alert) │
│                   │ • Pendaftaran verifikasi akun instruktur baru           │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Member            │ • Tindakan preventif baru disarankan oleh Instruktur    │
│                   │ • Pengingat jadwal konsultasi yang akan datang          │
│                   │ • Evaluasi progres mingguan diterbitkan                 │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 124. Siklus Operasional Harian Instruktur (Instructor Operational Loop)

Alur kerja harian seorang Instruktur berjalan melalui siklus terstruktur 8 tahap:

```text
Sinyal Perilaku Diterima ──► Tinjau Bukti & Pola ──► Pahami Konteks Member
                                                            │
┌───────────────────────────────────────────────────────────┘
│
▼
Rancang Intervensi ──► Kirim Notifikasi ke Member ──► Pantau Tindak Lanjut
                                                            │
┌───────────────────────────────────────────────────────────┘
│
▼
Evaluasi Respons ──► Tutup Tiket / Sesuaikan Rekomendasi Lanjutan
```

---

## 125. Siklus Operasional Harian Admin (Admin Operational Loop)

Alur tata kelola harian Administrator berfokus pada pengawasan dan mitigasi proaktif:

```text
Pantau Dasbor Sistem ──► Deteksi Peristiwa Operasional ──► Tinjau Akar Masalah
                                                                 │
┌────────────────────────────────────────────────────────────────┘
│
▼
Eksekusi Tindakan Korektif ──► Verifikasi Hasil Perbaikan ──► Dokumentasi Audit Log
```

---

## 126. Metrik Kualitas Kinerja Instruktur (Instructor Quality Metrics)

Evaluasi kinerja Instruktur diukur berdasarkan profesionalisme pendampingan, bukan membebani instruktur atas fluktuasi biologis di luar kendali mereka:

1. **Tingkat Kepatuhan Tindak Lanjut (*Follow-up Completion Rate*):** Persentase peninjauan tepat waktu terhadap komitmen yang jatuh tempo.
2. **Laju Penyelesaian Intervensi (*Intervention Resolution Rate*):** Efektivitas penutupan tiket intervensi dengan konfirmasi aksi member.
3. **Keandalan Sesi Konsultasi (*Consultation Adherence*):** Rasio kehadiran tepat waktu pada sesi konsultasi terjadwal.
4. **Kecepatan Respons Awal (*Mean Time to Intervene*):** Rata-rata waktu yang dibutuhkan untuk merespons sinyal anomali perilaku baru.
5. **Keterlibatan Member Bimbingan (*Mentee Engagement Index*):** Keaktifan member yang didampingi dalam merespons arahan instruktur.

---

## 127. Metrik Kesehatan Operasional Platform Admin (Admin Operational Metrics)

Indikator kinerja kunci (*KPI*) operasional yang dipantau oleh Administrator:
- **Tingkat Ketersediaan Sistem (*System Availability & Uptime*):** Rasio operasional layanan (target: 99.9% uptime).
- **Waktu Penyelesaian Moderasi (*Moderation Turnaround Time*):** Rata-rata waktu pemrosesan laporan konten bermasalah (< 2 jam).
- **Keberhasilan Antrean Latar Belakang (*Job Queue Health*):** Persentase eksekusi sukses kalkulasi mesin perilaku dan pengiriman pesan.
- **Keandalan Infrastruktur AI (*AI Service Reliability*):** Rasio keberhasilan inferensi LLM dan latensi pemanggilan API.
- **Efisiensi Pengiriman Notifikasi (*Notification Delivery Rate*):** Tingkat keterkiriman push notification dan email transaksional.

---

## 128. Menghindari Metrik Kinerja yang Menyesatkan (Avoid Misleading Performance Metrics)

PRONOIA secara tegas **melarang penggunaan metrik reduktif klinis** untuk mengevaluasi kinerja Instruktur:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ANTI-PATTERN EVALUASI KINERJA INSTRUKTUR                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  KLAIM SALAH:                                                               │
│  "Kinerja Instruktur dinilai dari rata-rata penurunan HbA1c member"         │
├─────────────────────────────────────────────────────────────────────────────┤
│  MENGAPA KLAIM INI BERBAHAYA DAN SALAH:                                     │
│  • Respon biologis sangat dipengaruhi faktor genetik, obat, & lingkungan.   │
│  • Mendorong fenomena pemilihan member yang mudah ("cherry-picking").       │
│  • Menciptakan tekanan untuk memalsukan data demi mencapai target numerik.  │
│  • Mengabaikan member dengan kondisi resistensi metabolik yang kompleks.    │
└─────────────────────────────────────────────────────────────────────────────┘
```

Evaluasi instruktur yang adil berfokus pada: empati komunikasi, konsistensi pendampingan, kepatuhan jadwal, dan ketepatan metodologi intervensi.

---

## 129. Desain State Kosong Dasbor Instruktur (Instructor Dashboard Empty States)

Antarmuka dasbor wajib memberikan arahan yang menenangkan dan informatif saat tidak ada data yang perlu ditampilkan:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                   INSTRUCTOR DASHBOARD EMPTY STATES UX                      │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Kondisi Komponen         │ Teks Panduan & Panggilan Aksi (CTA)              │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Belum Ada Member         │ "Belum ada member yang ditugaskan kepada Anda.   │
│                          │ Koordinasikan dengan tim Admin untuk alokasi."   │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Sinyal Nihil             │ "Seluruh member bimbingan Anda berada dalam pola │
│                          │ stabil. Tidak ada sinyal anomali saat ini."      │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Tindak Lanjut Bersih     │ "Luar biasa! Tidak ada evaluasi atau intervensi  │
│                          │ yang jatuh tempo hari ini."                      │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 130. Desain State Kosong Dasbor Admin (Admin Dashboard Empty States)

Pesan instruktif saat komponen manajerial berada dalam status tanpa data:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD EMPTY STATES UX                        │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Kondisi Komponen         │ Teks Panduan & Panggilan Aksi (CTA)              │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Data Laporan Kosong      │ "Belum ada aktivitas pada rentang tanggal ini.   │
│                          │ Silakan sesuaikan filter pencarian Anda."        │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Moderasi Bersih          │ "Komunitas berjalan kondusif. Tidak ada laporan  │
│                          │ konten yang memerlukan investigasi."             │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Instruktur Nihil         │ "Belum ada instruktur aktif yang terdaftar.      │
│                          │ [Tombol: Undang atau Tambah Instruktur Baru]"    │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 131. Penanganan Kondisi Gagal Instruktur (Instructor Failure States)

Ketika terjadi disrupsi atau kegagalan transaksi pada alur instruktur, sistem menyediakan umpan balik konstruktif beserta pemulihan:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INSTRUCTOR RECOVERY & ERROR HANDLING                     │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Skenario Kegagalan       │ Mekanisme Pemulihan & Panduan Sistem             │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Penugasan Dicabut        │ Tampilkan notifikasi: "Hak akses telah beralih.  │
│ Saat Membuka Profil      │ Riwayat Anda tersimpan aman dalam arsip audit."  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Konflik Intervensi       │ Deteksi *optimistic locking*: "Rekan instruktur  │
│ Bersamaan                │ lain telah memperbarui tiket ini. [Muat Ulang]"  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Slot Konsultasi Terisi   │ Blokir pemesanan ganda: "Slot ini baru saja      │
│ Secara Konkuren          │ dipesan oleh member lain. Silakan pilih waktu."  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Program Berakhir         │ Kunci formulir mutasi menjadi mode baca-saja     │
│ (*Archived Cohort*)      │ dengan label penjelas program selesai.           │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 132. Penanganan Kondisi Gagal Admin (Admin Failure States)

Panduan sistem dalam mengatasi kebuntuan operasional administratif:
- **Konflik Perubahan Peran (*Role Conflict*):** Larangan mencabut peran Super Admin terakhir untuk mencegah situasi *lock-out* sistem.
- **Penonaktifan Berulang (*Redundant Suspension*):** Notifikasi jelas apabila akun target telah berada dalam status nonaktif sebelumnya.
- **Blokir Hapus Program Aktif (*Delete Constraint Block*):** Menolak penghapusan entitas program yang masih memiliki member dan instruktur aktif; sarankan opsi Arsipkan (*Archive*).
- **Muatan Ekspor Terlalu Besar (*Export Payload Limit Exceeded*):** Sarankan penyempitan rentang tanggal atau jadwalkan ekspor asinkron dengan pengiriman tautan via email.

---

## 133. Kebijakan Penghapusan Aman Entitas (Safe Deletion Policy)

PRONOIA memberlakukan aturan ketergantungan relasional ketat guna melindungi integritas data ekosistem:

```text
[ Permintaan Hapus Entitas: Program / Kohor ]
                     │
                     ▼
       [ Evaluasi Ketergantungan ]
                     ├── Memiliki Member Aktif? ────(Ya)──► TOLAK PENGHAPUSAN KERAS
                     ├── Memiliki Intervensi?   ────(Ya)──► SARANKAN: ARSIPKAN (SOFT DELETE)
                     └── Tanpa Relasi Historis? ────(Ya)──► Izinkan Penghapusan Keras
```

---

## 134. Penerapan Hapus Lunak (Soft Delete Implementation)

Entitas operasional berikut wajib mengimplementasikan trait *Soft Delete* (`deleted_at` timestamp):
- **Akun Pengguna (`users`):** Mempertahankan integritas relasi masa lalu dan kepatuhan hukum.
- **Program & Kohor (`programs`, `cohorts`):** Menjaga riwayat keterlibatan peserta terdahulu.
- **Tantangan Komunitas (`challenges`):** Menjaga catatan perolehan lencana (*badges*) dan poin member.
- **Konten Edukasi & Artikel (`articles`):** Menjaga tautan yang telah dibagikan di komunitas.
- **Postingan Komunitas (`community_posts`):** Disembunyikan dari publik namun tetap tersimpan untuk kebutuhan penyelidikan moderasi.

> [!NOTE]
> Catatan rekam medis dan metrik biologis member diatur oleh kebijakan retensi rekam kesehatan tersendiri yang diatur oleh regulasi privasi data medis yang berlaku.

---

## 135. Perlindungan Integritas Riwayat Operasional (Historical Integrity)

Tindakan administratif **tidak boleh menghapus atau merusak riwayat historis** secara diam-diam:
- Riwayat intervensi yang pernah diselesaikan harus tetap dapat dibaca oleh member.
- Bukti kehadiran konsultasi masa lalu tidak boleh hilang ketika akun instruktur dinonaktifkan.
- Jejak audit keamanan tidak boleh terputus atau terhapus ketika sebuah entitas target mengalami perubahan status.

---

## 136. Standar Pengemasan Berkas Ekspor Data (Export Packaging Standards)

Setiap berkas data yang diekspor oleh Instruktur atau Admin wajib mematuhi standar sanitasi data:
- **Cakupan Terbatas (*Minimal Scope*):** Berkas hanya menyertakan kolom yang benar-benar diminta dalam kueri.
- **Pembersihan Kolom Sensitif (*Sanitization*):** Kolom hash kata sandi, token otentikasi, dan nomor identitas pribadi wajib dibuang (*stripped*).
- **Metadata Pelacak (*Watermarking & Provenance*):** Setiap berkas laporan menyematkan baris metadata tak terlihat yang mencatat ID pengunduh dan timestamp guna mencegah kebocoran dokumen rahasia.

---

## 137. Pelatihan & Disiplin Privasi Instruktur (Instructor Privacy Training)

Sebagai bagian dari pakta integritas profesional, setiap Instruktur wajib menyetujui pedoman privasi berikut:
1. **Larangan Tangkapan Layar (*No Screenshots*):** Dilarang mengambil tangkapan layar data bimbingan member untuk dibagikan di media sosial atau forum publik.
2. **Larangan Ekspor ke AI Eksternal (*No External AI Ingestion*):** Dilarang menyalin dan menempelkan teks keluhan atau data klinis member ke aplikasi pihak ketiga yang tidak tersertifikasi.
3. **Prinsip Kebutuhan Minimum (*Need-to-Know Basis*):** Hanya mengakses data member yang menjadi tanggung jawab aktif bimbingannya.
4. **Kepatuhan Kanal Resmi (*Official Channel Adherence*):** Seluruh komunikasi intervensi wajib dilakukan melalui infrastruktur PRONOIA demi akuntabilitas rekam jejak.

---

## 138. Tanggung Jawab Etis Privasi Admin (Admin Privacy Responsibilities)

Administrator memegang kekuasaan teknis yang besar, sehingga wajib menjunjung tinggi etika privasi:

$$\mathbf{Prinsip\ Tata\ Kelola:}\quad \text{Kemampuan Akses Teknis} \neq \text{Kebutuhan Akses yang Sah}$$

Fakta bahwa Administrator memiliki akses langsung ke pangkalan data (*database queries*) tidak serta merta memberikan hak moral atau hukum untuk membaca privasi member tanpa adanya tiket investigasi resmi yang disetujui dewan kepatuhan.

---

## 139. Sinergi Kolaborasi AI dan Instruktur (AI + Instructor Symbiosis)

Kecerdasan Buatan bertindak sebagai kopilot penganalisis, sedangkan keputusan akhir tetap berada di tangan manusia:

```text
[ Data Perilaku Member ] ──► [ Mesin AI: Analisis Pola & Draf Rekomendasi ]
                                                  │
                                                  ▼
                                 [ Instruktur: Tinjauan Manusia ]
                                                  │
                                                  ├── Menyetujui Draf
                                                  ├── Mengedit Konteks
                                                  └── Menolak Saran AI
                                                  │
                                                  ▼
                                     [ Intervensi Diterbitkan ]
```

---

## 140. Batasan Peran AI dalam Tata Kelola Admin (AI + Admin Boundaries)

AI dapat dimanfaatkan oleh Administrator untuk tugas-tugas penunjang efisiensi operasional:
- Merangkum ringkasan metrik dari ribuan baris log laporan bulanan.
- Menyusun draf pengumuman pemeliharaan sistem atau pembaruan silabus.
- Mengelompokkan jenis laporan komplain komunitas berdasarkan urgensi isu.

> [!CAUTION]
> Mesin AI **dilarang keras mengeksekusi aksi administratif secara otonom**, seperti: menaikkan/menurunkan peran pengguna, menghapus basis data, atau mengubah kebijakan keamanan platform tanpa otorisasi langsung dari Administrator manusia.

---

## 141. Prinsip Pengawasan Manusia (Human-in-the-Loop Principle)

Kecerdasan Buatan (AI) dalam platform PRONOIA tidak pernah mengambil tindakan klinis atau intervensi perilaku kritis secara sepihak tanpa supervisi manusia:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HUMAN-IN-THE-LOOP (HITL) WORKFLOW                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [ Algoritma AI ] ──► [ Rekomendasi / Prediksi ]                           │
│                                   │                                         │
│                                   ▼                                         │
│                    [ Tinjauan Profesional Manusia ]                         │
│                    (Instruktur / Ahli Gizi Berlisensi)                      │
│                                   │                                         │
│                                   ▼                                         │
│                       [ Otorisasi Tindakan Nyata ]                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Prinsip HITL ini bersifat mengikat dan wajib diterapkan pada skenario berisiko:
- **Intervensi Sensitif Keamanan (*Safety-Sensitive Interventions*):** Rekomendasi penyesuaian intensitas aktivitas fisik tinggi bagi member berisiko kardiovaskular.
- **Akses Data Luar Biasa (*Exceptional Data Access*):** Pembukaan riwayat kesehatan member untuk investigasi anomali klinis.
- **Eskalasi Medis (*Medical Escalations*):** Arahan rujukan ke fasilitas kesehatan primer terdekat.

---

## 142. Kolaborasi Instruktur dan Mesin Perilaku (Instructor + Behavioral Engine)

Pembagian beban kerja antara komputasi algoritmik dan empati manusia dirancang secara komplementer:

```text
Mesin Perilaku (Behavior Engine) ──► Menghitung Agregat Metrik ──► Menerbitkan Sinyal Anomali
                                                                             │
                                                                             ▼
Instruktur Manusia (Human Coach) ◄── Membaca Sinyal Kontekstual ◄── Dasbor Triage Instruktur
```

- **Otomatisasi Komputasi:** Instruktur **tidak perlu menghitung manual** regresi logaritma glukosa, standar deviasi aktivitas, atau skor kepatuhan kebiasaan. Mesin perilaku menangani pemrosesan data mentah.
- **Penilaian Kontekstual:** Instruktur memfokuskan keahliannya pada interpretasi faktor kualitatif: stres psikososial, dinamika lingkungan kerja, dan hambatan emosional member yang tidak teraba oleh sensor.

---

## 143. Pengawasan Mesin Perilaku oleh Administrator (Admin + Behavioral Engine)

Peran Administrator terhadap mesin perilaku berfokus pada kesehatan infrastruktur dan kepatuhan sistem:
- **Pemantauan Ketersediaan Layanan (*Engine Health Monitoring*):** Memantau beban CPU worker, latensi pemrosesan batch data, dan laju throughput per menit.
- **Penanganan Kesalahan (*Error & Exception Tracking*):** Mendeteksi kueri yang mengalami *timeout* atau kegagalan parsing format data sensor dari perangkat IoT.
- **Tata Kelola Versi Aturan (*Rule Version Governance*):** Memastikan transisi antar-versi mesin (misal: *Behavior Engine v1.2* ke *v2.0*) berjalan mulus tanpa merusak sinyal historis.
- **Integritas Konfigurasi (*Production Safety*):** Administrator dilarang keras mengubah bobot matematis algoritma secara spontan di lingkungan produksi tanpa melalui pengujian *staging*.

---

## 144. Tata Kelola Perubahan Aturan Sistem (Rule Change Governance)

Setiap modifikasi logika perhitungan sinyal perilaku wajib melewati siklus *governance* yang ketat:

```text
Draf Usulan (Draft) ──► Tinjauan Klinis/Teknis ──► Pengujian Regresi ──► Persetujuan Bersama ──► Rilis Bertahap ──► Pemantauan Metrik
```

1. **Penyusunan Draf (*Draft Proposal*):** Tim klinis dan rekayasa perangkat lunak menyusun spesifikasi perubahan ambang batas.
2. **Tinjauan Kualifikasi (*Peer Review*):** Evaluasi dampak terhadap beban kerja instruktur dan sensitivitas sinyal member.
3. **Pengujian Regresi (*Backtesting & Staging*):** Menjalankan aturan baru terhadap data historis teranonimkan untuk mengukur rasio *false positive*.
4. **Persetujuan Berganda (*Dual Sign-off Approval*):** Otorisasi resmi dari pimpinan medis (*Chief Medical Advisor*) dan Lead Engineer.
5. **Rilis Bertahap (*Canary Deployment*):** Penerapan aturan pada 5% kohor member sebelum peluncuran menyeluruh.
6. **Pemantauan Pasca-Rilis (*Post-Deployment Telemetry*):** Pengawasan volume sinyal abnormal selama 72 jam pertama.

---

## 145. Penanganan Insiden Operasional Sistem (Operational Incident Response)

Prosedur mitigasi cepat saat terjadi malafungsi pada komponen mesin perilaku atau integrasi:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OPERATIONAL INCIDENT RESPONSE WORKFLOW                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [ Deteksi Anomali / Peringatan Sistem ]                                   │
│   (Contoh: Mesin menerbitkan sinyal duplikat ke 500 member bimbingan)       │
│               │                                                             │
│               ▼                                                             │
│   [ Investigasi Cepat oleh Tim Admin & Rekayasa ]                           │
│               │                                                             │
│               ▼                                                             │
│   [ Aktivasi Feature Flag "Kill Switch" pada Fitur Terdampak ]              │
│               │                                                             │
│               ▼                                                             │
│   [ Perbaikan Kode & Validasi Database ]                                    │
│               │                                                             │
│               ▼                                                             │
│   [ Pembersihan Data Palsu / Komputasi Ulang (Reprocess) ]                  │
│               │                                                             │
│               ▼                                                             │
│   [ Rekam Jejak Forensik Audit & Publikasi Laporan Pasca-Insiden ]          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 146. Dokumentasi Audit Pasca-Insiden (Postmortem & Incident Audit)

Setiap insiden operasional wajib didokumentasikan dalam format retrospektif standar (*Incident Postmortem*):
- **Kode & Nama Insiden (*Incident Identifier*):** Penomoran unik tiket insiden (e.g., `INC-2026-09-003`).
- **Kronologi Waktu (*Timeline*):** Titik awal terjadinya anomali, waktu deteksi pertama, waktu eskalasi, dan waktu penuntasan (*Mean Time to Detect & Resolve*).
- **Akar Penyebab Masalah (*Root Cause Analysis - 5 Whys*):** Analisis kegagalan logika atau kelemahan arsitektur yang memicu insiden.
- **Dampak Operasional (*Business & Member Impact*):** Jumlah member dan instruktur yang terdampak, serta potensi kekeliruan notifikasi.
- **Langkah Pencegahan Permanen (*Preventative Action Items*):** Rencana penambahan unit test, automasi deteksi, atau perbaikan kebijakan.

---

## 147. Keamanan Mutasi Konfigurasi Administratif (Admin Configuration Safety)

Setiap perubahan pada konfigurasi global platform diproteksi dengan mekanisme validasi nilai ganda (*state-diff capture*):

```text
┌───────────────────┬─────────────────────────────────────────────────────────┐
│ Atribut Audit     │ Nilai Rekaman Sistem                                    │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ parameter_key     │ 'behavior_engine.glucose_spike_threshold'               │
│ previous_value    │ '140 mg/dL'                                             │
│ updated_value     │ '150 mg/dL'                                             │
│ altered_by        │ 'admin_user_uuid_789'                                   │
│ justification     │ 'Menyesuaikan pedoman klinis baru PERKENI 2026'         │
│ approved_by       │ 'lead_medical_officer_uuid_101'                         │
│ timestamp         │ '2026-09-17T17:15:00.000Z'                              │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 148. Dasbor Pemantauan Jejak Audit Admin (Admin Audit Dashboard)

Panel audit internal menyajikan visualisasi telemetri keamanan dan tata kelola secara *real-time*:
- **Aliran Aktivitas Keamanan Terkini (*Recent Security Feed*):** Perekaman instan login mencurigakan, kegagalan otentikasi berturut-turut, dan eskalasi hak istimewa.
- **Log Mutasi Peran (*Role Mutation Log*):** Pelacakan kronologis pengangkatan instruktur baru, pemberian hak Super Admin, atau penonaktifan staf.
- **Akses Data Sensitif (*Sensitive Data Access Log*):** Pencatatan pembacaan profil member dan pembukaan kunci darurat (*break-glass*).
- **Riwayat Pengubahan Konfigurasi (*Config Change Ledger*):** Rekapitulasi aktivasi feature flag dan pembaruan parameter sistem.
- **Rekap Aksi Moderasi Komunitas (*Moderation Action Log*):** Audit terhadap postingan yang ditangguhkan atau akun yang dibekukan.

---

## 149. Kemampuan Pencarian & Filter Audit Forensik (Audit Search & Filtering)

Sistem audit menyediakan mesin pencarian berkecepatan tinggi dengan berbagai kriteria filter komposit:
- **Aktor Pelaksana (*Actor Criteria*):** ID pengguna, nama, atau peran akun.
- **Tindakan (*Action Type*):** `user.login`, `role.elevate`, `member.health.view`, `setting.update`.
- **Entitas Target (*Target Resource*):** ID pengguna sasaran, ID tiket konsultasi, atau ID modul program.
- **Rentang Tanggal (*Date & Time Window*):** Filter spesifik hingga satuan detik dengan pemetaan zona waktu UTC.
- **Hasil Tindakan (*Outcome Status*):** Status `SUCCESS`, `DENIED`, atau `FAILED`.

---

## 150. Kebijakan Retensi & Pengarsipan Log Audit (Audit Retention Policy)

Log audit keamanan dikelola dengan kepatuhan regulasi perlindungan data yang ketat:
- **Masa Penyimpanan Aktif (*Hot Storage*):** Log tersimpan dalam basis data performa tinggi selama **12 bulan** untuk kebutuhan investigasi instan.
- **Pengarsipan Jangka Panjang (*Cold Storage Archive*):** Setelah 12 bulan, rekaman dipindahkan ke penyimpanan terenkripsi yang *append-only* selama minimal **5 tahun** guna mematuhi regulasi kepatuhan hukum kesehatan.
- **Larangan Penghapusan Acak (*Prohibition of Deletion*):** Tidak ada staf teknis maupun administrator yang diizinkan memangkas (*truncate*) log audit demi menyembunyikan riwayat kesalahan sistem.

---

## 151. Postur Keamanan Operasional Platform (Operational Security Standards)

Infrastruktur PRONOIA mengimplementasikan strategi pertahanan berlapis (*Defense-in-Depth*):

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                   DEFENSE-IN-DEPTH OPERATIONAL SECURITY                     │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Komponen Keamanan        │ Mekanisme Pertahanan                             │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Proteksi CSRF            │ Validasi token anti-CSRF pada setiap mutasi POST │
│ Pembatasan Laju (Rate)   │ Throttling API bertingkat per IP & per sesi akun │
│ Keamanan Cookie Sesi     │ Flag HttpOnly, Secure, SameSite=Strict, Encrypted│
│ Otorisasi Berlapis       │ Verifikasi Middleware, Gate, & Laravel Policy    │
│ Autentikasi Multifaktor  │ Wajib MFA/2FA berbasis TOTP/WebAuthn bagi Admin  │
│ Enkripsi Dalam Transit   │ Enkripsi TLS 1.3 wajib pada seluruh koneksi API  │
│ Enkripsi Saat Diam (Rest)│ Enkripsi AES-256 pada kolom database sensitif    │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 152. Cakupan & Pembatasan API Instruktur (Instructor API Scope)

Endpoint API khusus Instruktur tunduk pada pembatasan cakupan yang ketat:
- **Autentikasi Sesi Wajib (*Stateful / Bearer Token Verification*):** Menolak seluruh permintaan tanpa token otentikasi aktif.
- **Verifikasi Status Profesional (*Active Credentials Check*):** Memvalidasi bahwa akun instruktur tidak dalam masa suspensi administratif.
- **Pengecekan Relasi Penugasan (*Relationship Binding Check*):** Menolak kueri data member apabila tidak terikat kontrak bimbingan aktif.
- **Penyaringan Kolom (*Data Minimalization*):** Payload respons hanya menyertakan data yang diperlukan untuk bimbingan preventif, tanpa mengekspos data pribadi finansial.

---

## 153. Cakupan & Pembatasan API Administrator (Admin API Scope)

Spesifikasi endpoint manajemen administratif:
- **Grup Rute Terisolasi (*Isolated Route Grouping*):** Seluruh rute berada di bawah rute terpisah (`/api/v1/admin/*`) dengan middleware otorisasi khusus.
- **Penegakan Hak Akses Granular (*Permission Middleware*):** Setiap endpoint memeriksa izin spesifik, bukan sekadar memeriksa apakah peran pengguna bernilai "admin".
- **Pencatatan Audit Otomatis (*Automatic Auditing Middleware*):** Setiap permintaan mutasi data secara otomatis dicatat ke dalam antrean audit log.

---

## 154. Struktur Rekomendasi Grup Rute Backend (Recommended Route Groups)

Pemisahan rute secara modular mempermudah audit keamanan dan isolasi logika aplikasi:

```text
routes/
├── member.php       ──> Grup rute /api/v1/member/* (Khusus Akses Member)
├── instructor.php   ──> Grup rute /api/v1/instructor/* (Khusus Fasilitas Instruktur)
└── admin.php        ──> Grup rute /api/v1/admin/* (Khusus Tata Kelola Administratif)
```

> [!NOTE]
> Struktur pemisahan rute adalah praktik penataan arsitektur kode yang bersih (*clean architecture*). Namun, proteksi keamanan sesungguhnya tetap berada pada penegakan *Authorization Policies* di tingkat controller server.

---

## 155. Contoh Spesifikasi Rute Endpoint Instruktur (Instructor Route Examples)

```http
GET    /api/v1/instructor/dashboard              -> Menampilkan ringkasan metrik & tugas harian
GET    /api/v1/instructor/members                -> Daftar seluruh member yang ditugaskan resmi
GET    /api/v1/instructor/members/{member}       -> Profil bimbingan & riwayat kepatuhan member
GET    /api/v1/instructor/signals                -> Feed sinyal anomali perilaku bimbingan
POST   /api/v1/instructor/interventions          -> Menerbitkan rekomendasi intervensi baru
PATCH  /api/v1/instructor/interventions/{id}     -> Memperbarui status/evaluasi intervensi
GET    /api/v1/instructor/consultations          -> Kalender jadwal konsultasi mendatang
PATCH  /api/v1/instructor/consultations/{id}     -> Mengonfirmasi kehadiran / catatan konsultasi
```

---

## 156. Contoh Spesifikasi Rute Endpoint Administrator (Admin Route Examples)

```http
GET    /api/v1/admin/dashboard                   -> Dasbor kesehatan operasional platform
GET    /api/v1/admin/users                       -> Direktori manajemen pengguna sistem
PATCH  /api/v1/admin/users/{user}/roles          -> Memperbarui hak peran pengguna
GET    /api/v1/admin/instructors                 -> Daftar instruktur & status verifikasi
POST   /api/v1/admin/instructors/verify          -> Menyetujui kredensial instruktur baru
GET    /api/v1/admin/programs                    -> Manajemen kurikulum kohor & program
POST   /api/v1/admin/programs                    -> Menerbitkan program bimbingan baru
GET    /api/v1/admin/reports/analytics           -> Mengambil agregasi tren analitik
GET    /api/v1/admin/audit-logs                  -> Mesin pencarian jejak audit forensik
PATCH  /api/v1/admin/settings/system             -> Memperbarui konfigurasi sistem & feature flags
```

---

## 157. Daftar Periksa Otorisasi Backend (Backend Authorization Checklist)

Setiap controller endpoint yang menangani alur Instruktur dan Admin wajib lolos dari daftar periksa 8 lapis:

```text
[ ] 1. Autentikasi Pengguna: Apakah token sesi valid dan belum kedaluwarsa?
[ ] 2. Status Akun Aktif: Apakah akun pengguna tidak sedang disuspensi?
[ ] 3. Pengecekan Peran (Role): Apakah pengguna memiliki peran yang sesuai?
[ ] 4. Izin Granular (Permission): Apakah memiliki hak akses tindakan spesifik?
[ ] 5. Batasan Relasi (Relationship): Apakah terikat tugas bimbingan resmi dengan target?
[ ] 6. Validasi Input Klien: Apakah payload masukan bebas dari injeksi data berbahaya?
[ ] 7. Logika Bisnis & Transaksi: Apakah seluruh aturan invarian sistem terpenuhi?
[ ] 8. Pencatatan Audit: Apakah aksi sensitif telah dikirimkan ke worker audit log?
```

---

## 158. Kriteria Penerimaan Modul Instruktur (Instructor Acceptance Criteria)

Modul Instruktur dinyatakan siap produksi (*production-ready*) jika memenuhi kriteria berikut:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 INSTRUCTOR MODULE ACCEPTANCE CRITERIA                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ [ ] Instruktur dapat masuk akun dengan kredensial terverifikasi             │
│ [ ] Profil profesional dan data sertifikasi tampil dengan akurat            │
│ [ ] Dasbor hanya menampilkan daftar member yang ditugaskan secara sah       │
│ [ ] Akses terhadap data member di luar penugasan ditolak (403 Forbidden)    │
│ [ ] Feed sinyal perilaku menyajikan anomali terkini secara berurutan        │
│ [ ] Instruktur dapat menerbitkan tiket intervensi dengan tenggat jelas       │
│ [ ] Jadwal konsultasi terintegrasi dengan kalender ketersediaan             │
│ [ ] Catatan privat instruktur terlindungi dari pembacaan member             │
│ [ ] Fitur draf AI bertindak sebagai pendukung dan membutuhkan konfirmasi    │
│ [ ] Seluruh aksi peninjauan dan penerbitan intervensi tercatat di audit log │
│ [ ] Antarmuka responsif dan nyaman diakses melalui perangkat tablet/seluler │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 159. Kriteria Penerimaan Modul Admin (Admin Acceptance Criteria)

Modul Administrator dinyatakan memenuhi standar kelayakan rilis jika lolos verifikasi:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ADMIN MODULE ACCEPTANCE CRITERIA                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ [ ] Administrator wajib menyelesaikan verifikasi MFA sebelum masuk dasbor   │
│ [ ] Manajemen pengguna mendukung penonaktifan dan penyesuaian peran aman    │
│ [ ] Verifikasi dokumen instruktur memiliki alur persetujuan yang transparan │
│ [ ] Manajemen program dan kurikulum dapat dikonfigurasi secara dinamis      │
│ [ ] Antrean moderasi komunitas menyajikan bukti pelanggaran secara lengkap  │
│ [ ] Laporan analitik menyajikan data agregat tanpa membocorkan data medis   │
│ [ ] Mesin pencarian jejak audit forensik dapat menyaring log dalam < 1 detik│
│ [ ] Eksekusi aksi massal memerlukan autentikasi ulang (step-up challenge)   │
│ [ ] Sistem menolak penghapusan entitas yang memiliki keterikatan relasi     │
│ [ ] Pengubahan feature flags berdampak instan tanpa restart aplikasi server │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 160. Matriks Hak Akses Lintas Peran (Instructor + Admin Test Matrix)

Matriks pengujian otorisasi matriks peran untuk evaluasi unit dan integrasi otomatis:

```text
┌──────────────────────────────┬────────────┬─────────────┬───────────────────┐
│ Skenario Operasional         │ Member     │ Instructor  │ Administrator     │
├──────────────────────────────┼────────────┼─────────────┼───────────────────┤
│ Lihat Profil Akun Sendiri    │ Diizinkan  │ Diizinkan   │ Diizinkan         │
│ Akses Rekam Medis Pribadi    │ Diizinkan  │ Milik Sendiri│ Hanya Agregat    │
│ Akses Data Member Bimbingan  │ Ditolak    │ Diizinkan   │ Dibatasi (Scoped) │
│ Akses Data Member Asing      │ Ditolak    │ Ditolak     │ Dibatasi (Scoped) │
│ Menerbitkan Intervensi Medis │ Ditolak    │ Diizinkan   │ Ditolak           │
│ Mengubah Peran Pengguna      │ Ditolak    │ Ditolak     │ Diizinkan         │
│ Moderasi Konten Komunitas    │ Melaporkan │ Melaporkan  │ Diizinkan         │
│ Menelusuri Log Audit Global  │ Ditolak    │ Terbatas    │ Diizinkan         │
│ Mengunduh Rekap Laporan      │ Personal   │ Kohor Tugas │ Seluruh Sistem    │
└──────────────────────────────┴────────────┴─────────────┴───────────────────┘
```

---

## 161. Skenario Pengujian Keamanan Lintas Peran (Cross-Role Security Tests)

Rangkaian skenario pengujian penetrasi dan batas keamanan (*security boundary test suites*):

### Uji 1 — Isolasi Member Instruktur (Instructor Isolation Test)
- **Kondisi Awal (*Given*):** Instruktur A resmi membimbing Member A.
- **Tindakan (*When*):** Instruktur A mencoba memanggil endpoint API data kesehatan milik Member B melalui ID manipulasi (IDOR attack).
- **Hasil yang Diharapkan (*Then*):** Server wajib mengembalikan kode respons `403 Forbidden` dan mencatat upaya akses tidak sah ke audit log.

### Uji 2 — Manajemen Peran Admin (Admin Role Management Test)
- **Kondisi Awal (*Given*):** Pengguna masuk dengan akun Admin yang memiliki izin `roles.manage`.
- **Tindakan (*When*):** Admin menaikkan status peran seorang Member menjadi Instruktur.
- **Hasil yang Diharapkan (*Then*):** Basis data memperbarui peran, profil instruktur dibuat, dan diterbitkan satu entri audit log lengkap dengan identitas admin penanggung jawab.

### Uji 3 — Penetrasi Member ke Endpoint Admin (Unauthorized Admin Access Test)
- **Kondisi Awal (*Given*):** Pengguna biasa dengan peran tunggal Member memiliki token sesi aktif.
- **Tindakan (*When*):** Pengguna mengirimkan permintaan HTTP `GET /api/v1/admin/dashboard`.
- **Hasil yang Diharapkan (*Then*):** Server menolak dengan kode `403 Forbidden`, tanpa membocorkan informasi struktur direktori internal admin.

### Uji 4 — Penolakan Instruktur yang Dinonaktifkan (Revoked Instructor Access Test)
- **Kondisi Awal (*Given*):** Akun Instruktur diubah statusnya menjadi `REVOKED` oleh Administrator.
- **Tindakan (*When*):** Instruktur tersebut mencoba membuka kembali dasbor bimbingan membernya.
- **Hasil yang Diharapkan (*Then*):** Seluruh permintaan API diblokir dengan respons `403 Forbidden / Account Suspended`.

### Uji 5 — Pencabutan Tugas Bimbingan (Assignment Revocation Test)
- **Kondisi Awal (*Given*):** Instruktur A sebelumnya ditugaskan membimbing Member A, namun penugasan telah dipindahkan ke Instruktur B.
- **Tindakan (*When*):** Instruktur A mencoba membuat catatan intervensi baru untuk Member A.
- **Hasil yang Diharapkan (*Then*):** Server menolak aksi mutasi karena relasi bimbingan aktif telah berakhir.

---

## 162. Optimasi Kinerja Antarmuka Instruktur (Performance Considerations)

Dasbor Instruktur memuat data banyak member secara simultan, sehingga membutuhkan arsitektur kueri yang efisien:
- **Paginasi Berbasis Kursor (*Cursor-based Pagination*):** Memastikan performa pemuatan daftar member tetap konstan meskipun database bertumbuh pesat.
- **Pengindeksan Komposit (*Composite Database Indexes*):** Menambahkan indeks pada kombinasi kolom `(instructor_id, status, last_activity_at)` untuk mempercepat kueri filter.
- **Pemuatan Bertahap (*Lazy Loading & On-demand Data*):** Hanya memuat ringkasan kepatuhan pada tabel utama. Grafik riwayat glukosa detail hanya dimuat saat kartu member diklik (*drawer expansion*).
- **Penembolokan Cerdas (*Safe Derived Caching*):** Menggunakan Redis untuk menampung agregasi metrik harian instruktur dengan masa kedaluwarsa pendek (TTL 5 menit).

---

## 163. Optimasi Kinerja Dasbor Administratif (Admin Dashboard Performance)

Penanganan volume data analitik skala besar pada modul Administrator:
- **Agregasi Terjadwal (*Pre-calculated Materialized Views*):** Metrik pertumbuhan pengguna dan tren kohor dihitung secara berkala di latar belakang, bukan dieksekusi secara instan pada saat halaman dasbor dibuka.
- **Pemrosesan Laporan Asinkron (*Async Background Reporting*):** Pengunduhan laporan dengan volume > 10.000 baris dialihkan menjadi tugas antrean (*job queue*), di mana berkas hasil dikirimkan melalui notifikasi unduhan.
- **Optimasi Kueri Audit Log (*Partitioned Audit Tables*):** Tabel audit dipartisi berdasarkan rentang bulan kalender guna mencegah degradasi kecepatan kueri investigasi forensik.

---

## 164. Pemisahan Tanggung Jawab Layanan Notifikasi (Notification Responsibility)

Layanan bisnis dan layanan perutean notifikasi dirancang dengan arsitektur *event-driven* terpisah:

```text
[ Instruktur Menerbitkan Intervensi ] ──► Menerbitkan Event: 'InterventionCreated'
                                                            │
                                                            ▼
                                    [ Service Notifikasi Berlangganan Event ]
                                                            │
                                                            ├── Verifikasi Preferensi Saluran Member
                                                            ├── Memilih Media: Push Notification / Email
                                                            └── Menjadwalkan Pengiriman Pesan
```

Dengan pemisahan ini, kegagalan penyedia layanan push notifikasi pihak ketiga tidak akan menggagalkan transaksi penyimpanan data intervensi di basis data utama.

---

## 165. Tata Kelola Multi-Program & Keanggotaan (Program Management and Membership)

Seorang member dimungkinkan untuk mengikuti lebih dari satu program kohor secara paralel (misalnya: *Program Pengendalian Glukosa* dan *Program Peningkatan Kebugaran Jantung*):
- Otorisasi data bimbingan diisolasi pada tingkat relasi program.
- Instruktur pada Program Kebugaran tidak otomatis memiliki akses terhadap catatan gizi mendalam milik Program Pengendalian Glukosa, kecuali member memberikan persetujuan berbagi (*data sharing consent*).

---

## 166. Skenario Penugasan Multi-Instruktur (Multi-Instructor Scenario)

Ketika seorang member didampingi oleh beberapa profesional kesehatan secara terpadu:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INTEGRATED CARE TEAM COLLABORATION                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                            [ Member Bimbingan ]                             │
│                                     │                                       │
│                ┌────────────────────┴────────────────────┐                  │
│                │                                         │                  │
│                ▼                                         ▼                  │
│      [ Instruktur Nutrisi ]                    [ Instruktur Kebugaran ]     │
│       Fokus: Pola Makanan &                     Fokus: Target Langkah &     │
│       Respons Glikemik                          Latihan Beban Kardio        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Setiap instruktur beroperasi dalam koridor kepakaran dan modul bimbingannya masing-masing, menjaga batasan wewenang profesional yang jelas.

---

## 167. Kolaborasi Intervensi Bersama (Shared Intervention Protocol)

Apabila dibutuhkan rekomendasi gabungan antara beberapa instruktur pendamping:
- **Instruktur Penanggung Jawab (*Primary Lead Instructor*):** Instruktur utama yang bertindak sebagai pemegang kendali tiket intervensi.
- **Instruktur Pendukung (*Supporting Specialists*):** Memberikan catatan rekomendasi internal yang kemudian disintesis oleh instruktur utama sebelum diterbitkan kepada member.
- **Transparansi Tim (*Care Team Attribution*):** Kartu intervensi menampilkan nama seluruh instruktur yang berkontribusi dalam perumusan saran.

---

## 168. Protokol Alih Kelola Pendampingan (Instructor Handoff Protocol)

Ketika penugasan bimbingan dialihkan dari satu instruktur ke instruktur lainnya:

```text
Instruktur Sebelumnya (A) ──► Menulis Ringkasan Alih Tugas ──► Admin Menyetujui Mutasi
                                                                          │
                                                                          ▼
Instruktur Pengganti (B)  ◄── Menerima Riwayat Kontekstual ◄── Akses Baru Diberikan
```

- Instruktur lama kehilangan akses pembacaan aktif terhadap data harian member terhitung sejak tanggal efektif mutasi.
- Instruktur baru mendapatkan akses terhadap ringkasan kepatuhan dan histori intervensi terdahulu demi menjaga kesinambungan pendampingan (*care continuity*).

---

## 169. Hak Kepemilikan Historis Catatan (Historical Instructor Ownership)

Meskipun hak akses aktif seorang instruktur terhadap seorang member telah berakhir:
- Nama instruktur pembuat catatan terdahulu tetap diabadikan pada kolom `created_by` dan `author_id` untuk tujuan audit dan tanggung jawab medikolegal.
- Instruktur baru tidak diizinkan mengedit atau menimpa catatan yang diterbitkan oleh instruktur terdahulu.

---

## 170. Penutupan & Pengarsipan Program Kohor (Program Archive Lifecycle)

Saat program bimbingan mencapai akhir periode:
- Status program diubah menjadi `COMPLETED` atau `ARCHIVED`.
- Member tetap memiliki akses seumur hidup terhadap seluruh materi edukasi dan riwayat capaian intervensinya.
- Akses mutasi harian instruktur dikunci menjadi mode baca-saja (*read-only*), membebaskan alokasi kapasitas instruktur untuk kohor baru.

---

## 171. Antrean Layanan Bantuan Administratif (Admin Support Queue)

Saluran bantuan manajerial menangani isu non-klinis dan kendala operasional ekosistem:
- Kendala teknis login, lupa sandi bertingkat, dan sinkronisasi perangkat sensor.
- Pertanyaan tagihan langganan dan peningkatan tingkatan keanggotaan (*tier upgrade*).
- Permohonan penghapusan akun atau penarikan persetujuan privasi data (GDPR/PDP compliance).

---

## 172. Antrean Triase Bimbingan Instruktur (Instructor Support Queue)

Ruang kerja instruktur menyusun prioritas pekerjaan bimbingan berdasarkan urgensi kebutuhan member:
1. **Sinyal Kepatuhan Kritis (*Critical Behavioral Signals*):** Member yang menunjukkan deviasi drastis dari kebiasaan sehat normal.
2. **Intervensi Jatuh Tempo (*Due Follow-ups*):** Member yang telah berkomitmen pada rencana aksi dan memerlukan evaluasi kepatuhan.
3. **Pemesanan Konsultasi Mendatang (*Upcoming Consultations*):** Sesi tatap muka virtual yang memerlukan persiapan berkas tinjauan.
4. **Member Baru dalam Kohor (*Newly Assigned Members*):** Memerlukan pesan sambutan personal dan orientasi target pencegahan.

---

## 173. Aturan Penetapan Prioritas Triase (Triaging Priority Rules)

Sistem penyusunan antrean bimbingan dipandu oleh algoritma prioritas yang transparan:

```text
Urgensi Dukungan Langsung ──► Tindak Lanjut Jatuh Tempo ──► Sinyal Anomali Persisten ──► Sinyal Anomali Baru ──► Pemantauan Rutin
```

Prioritas ini disajikan secara intuitif dengan penanda warna dan skor urgensi tanpa mengaburkan penilaian klinis mandiri dari instruktur.

---

## 174. Menghindari Pelabelan Tingkat Keparahan Klinis (Avoid Clinical Severity Claims)

Platform PRONOIA **bukanlah sistem instalasi gawat darurat (IGD)** rumah sakit:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ANTI-PATTERN PELABELAN KLINIS PADA TRIASE                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  LABEL YANG DILARANG DIGUNAKAN DI DASBOR TRIASE:                            │
│  "Pasien Kritis", "Pasien Risiko Tinggi Akut", "Pasien Stabil / Rendah"     │
├─────────────────────────────────────────────────────────────────────────────┤
│  TERMINOLOGI RESMI PRONOIA YANG BENAR & AMAN:                               │
│  • "Perlu Tindak Lanjut" (Follow-up Needed)                                 │
│  • "Sinyal Anomali Baru Terdeteksi" (Recent Signal Detected)                │
│  • "Menunggu Tinjauan Instruktur" (Awaiting Review)                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

Pendekatan ini menegaskan posisi PRONOIA sebagai platform intervensi preventif gaya hidup, bukan unit penanganan krisis medis gawat darurat.

---

## 175. Templat Komunikasi Terstandar Instruktur (Instructor Communication Templates)

Instruktur dilengkapi dengan templat pesan yang dapat dipersonalisasi guna menjaga efisiensi dan nada empati:
- **Pengingat Komitmen Santai (*Gentle Habit Reminder*):** Mendorong member melanjutkan kebiasaan jalan kaki setelah makan.
- **Undangan Partisipasi Challenge (*Challenge Invitation*):** Mengajak member bergabung dalam tantangan pengurangan asupan gula mingguan.
- **Konfirmasi Sesi Konsultasi (*Consultation Prep Guide*):** Panduan ringkas persiapan data sebelum sesi konsultasi video dimulai.
- **Apresiasi Capaian (*Milestone Celebration*):** Ucapan selamat atas pencapaian kepatuhan logging 14 hari berturut-turut.

---

## 176. Templat Pengumuman Ekosistem Admin (Admin Broadcast Content Templates)

Administrator menggunakan templat resmi untuk komunikasi terpusat ke seluruh pengguna:
- **Pemberitahuan Pemeliharaan Sistem (*Scheduled Maintenance Notice*):** Jadwal pemeliharaan server dan estimasi durasi henti layanan.
- **Pengumuman Program Kohor Baru (*New Program Launch*):** Silabus edukasi kesehatan baru yang terbuka untuk pendaftaran.
- **Pembaruan Kebijakan Privasi (*Privacy Policy Update*):** Ringkasan transparan atas penyesuaian tata kelola perlindungan data pengguna.

---

## 177. Prinsip Pengalaman Pengguna Berbasis Peran (Role UX Core Principles)

Desain antarmuka PRONOIA dirancang untuk secara instan menjawab satu pertanyaan fundamental bagi setiap aktor:

$$\mathbf{Prinsip\ Desain:}\quad \text{"Apa tindakan bernilai tertinggi yang harus saya ambil berikutnya?"}$$

```text
┌───────────────────┬─────────────────────────────────────────────────────────┐
│ Peran Pengguna    │ Jawaban Antarmuka Terhadap Pertanyaan Desain            │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Member            │ "Lakukan satu tindakan preventif kecil Anda berikutnya  │
│                   │ hari ini (catat makan siang, jalan kaki 15 menit)."     │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Instructor        │ "Tinjau sinyal kepatuhan dan dampingi member yang sedang│
│                   │ membutuhkan tindak lanjut atau dorongan motivasi."      │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Administrator     │ "Jaga ekosistem tetap aman, terverifikasi, berperforma  │
│                   │ tinggi, dan patuh terhadap standar tata kelola data."   │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 178. Siklus Inti Pendampingan Instruktur (Core Instructor Loop)

Diagram komprehensif alur kerja berulang pendampingan manusia:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CORE INSTRUCTOR OPERATIONAL LOOP                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   MEMBER DITUGASKAN                                                         │
│          │                                                                  │
│          ▼                                                                  │
│   SINYAL PERILAKU TERDETEKSI                                                │
│          │                                                                  │
│          ▼                                                                  │
│   TINJAUAN BUKTI & KONTEKS GAYA HIDUP                                       │
│          │                                                                  │
│          ▼                                                                  │
│   PERUMUSAN & PENERBITAN INTERVENSI                                         │
│          │                                                                  │
│          ▼                                                                  │
│   AKSI TINDAKAN NYATA OLEH MEMBER                                           │
│          │                                                                  │
│          ▼                                                                  │
│   EVALUASI TINDAK LANJUT BERKALA                                            │
│          │                                                                  │
│          ▼                                                                  │
│   CAPAIAN HASIL & KESIMPULAN (TUTUP / SESUAIKAN TIKET)                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 179. Siklus Inti Tata Kelola Admin (Core Admin Loop)

Diagram komprehensif alur kerja pemeliharaan ekosistem administratif:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CORE ADMIN GOVERNANCE LOOP                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   STATUS OPERASIONAL SISTEM                                                 │
│          │                                                                  │
│          ▼                                                                  │
│   PEMANTAUAN TELEMETRI & METRIK GLOBAL                                      │
│          │                                                                  │
│          ▼                                                                  │
│   PERISTIWA OPERASIONAL / TIKET ESKALASI                                    │
│          │                                                                  │
│          ▼                                                                  │
│   INVESTIGASI & EVALUASI RISIKO                                             │
│          │                                                                  │
│          ▼                                                                  │
│   EKSEKUSI TINDAKAN TATA KELOLA TEPAT                                       │
│          │                                                                  │
│          ▼                                                                  │
│   PEREKAMAN JEJAK AUDIT FORENSIK LENGKAP                                    │
│          │                                                                  │
│          ▼                                                                  │
│   VERIFIKASI INTEGRITAS SISTEM KEMBALI NORMAL                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 180. Prinsip Keselamatan Bimbingan Instruktur (Instructor Safety Principle)

> [!IMPORTANT]
> **Prinsip Keselamatan Instruktur:**  
> Pendampingan oleh Instruktur bertujuan meningkatkan literasi kesehatan mandiri dan membangun konsistensi perilaku preventif member, tanpa pernah melampaui batas kompetensi profesional bersertifikat yang dimiliki dan tanpa memberikan diagnosis atau instruksi pengobatan farmakologis langsung.

---

## 181. Prinsip Keselamatan Kekuasaan Admin (Admin Safety Principle)

> [!CAUTION]
> **Prinsip Keselamatan Administrator:**  
> Wewenang administratif diberikan semata-mata untuk menjamin ketersediaan infrastruktur, keselamatan ekosistem komunitas, dan penegakan tata kelola platform, tanpa pernah menciptakan akses bebas tanpa pengawasan terhadap rekaman data kesehatan pribadi member.

---

## 182. Model Interaksi Peran Ekosistem PRONOIA (Final Role Model)

Arsitektur relasi peran dalam PRONOIA menempatkan Member sebagai pusat layanan, didukung oleh dua pilar profesional:

```text
                               PRONOIA ECOSYSTEM
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
           PILAR PENCEGAHAN                      PILAR TATA KELOLA
           (PREVENTION PILLAR)                 (OPERATIONS PILLAR)
                    │                                     │
               INSTRUCTOR                             ADMIN
                    │                                     │
                    ▼                                     ▼
             PENDAMPINGAN                         KESELAMATAN &
            HUMAN-IN-THE-LOOP                   KEPATUHAN PLATFORM
                    │                                     │
                    └──────────────────┬──────────────────┘
                                       │
                                       ▼
                               MEMBER PRONOIA
                     (Kedaulatan & Kesehatan Preventif)
```

---

## 183. Alur Operasional End-to-End Platform (Full Operational Flow)

Visualisasi perjalanan data dari kebiasaan harian member hingga pengawasan eksekutif:

```text
Data Kebiasaan Member (Log Glukosa, Makanan, Aktivitas IoT)
                     │
                     ▼
          Mesin Perilaku (Behavior Engine)
                     │
                     ▼
          Sinyal Pola Kebiasaan (Behavioral Signal)
                     │
                     ▼
          Dasbor Triase Instruktur Terkait
                     │
                     ▼
          Tinjauan Profesional & Draf Rekomendasi
                     │
                     ▼
          Penerbitan Intervensi Terarah ke Member
                     │
                     ▼
          Member Menjalankan Tindakan Perbaikan
                     │
                     ▼
          Tindak Lanjut & Evaluasi Pemulihan Kebiasaan
                     │
                     ▼
          Agregasi Metrik Kohor & Pelaporan Sistem
                     │
                     ▼
          Pengawasan Tata Kelola Administratif (Admin Oversight)
```

---

## 184. Panduan Demonstrasi Kompetisi (Competition Demonstration Protocol)

Untuk kebutuhan penjurian dan demonstrasi panggung kompetisi teknologi, fokuskan alur presentasi pada **satu skenario terintegrasi yang memukau**:

```text
1. Member: Mencatat pola makan tinggi karbohidrat tanpa diimbangi aktivitas fisik
       ↓
2. Engine: Mendeteksi sinyal "Post-meal Glucose Spike Pattern" secara otomatis
       ↓
3. Dasbor: Sinyal muncul di antrean tugas Instruktur secara real-time
       ↓
4. Instruktur: Memeriksa konteks, menyesuaikan draf AI, dan menerbitkan intervensi jalan 15 menit
       ↓
5. Member: Menerima kartu intervensi di aplikasi seluler, lalu menandai "Selesai"
       ↓
6. Sistem: Sinyal teratasi dan skor kepatuhan member meningkat
       ↓
7. Admin: Menampilkan dasbor metrik kepatuhan kohor dan bukti rekaman audit trail
```

Skenario ini membuktikan secara nyata bahwa PRONOIA memiliki:
- **Pengalaman Member yang Ramah (*Member Experience*)**
- **Kecerdasan Perilaku Akurat (*Behavioral Intelligence Engine*)**
- **Dukungan Manusia Berempati (*Human-in-the-Loop Empathy*)**
- **Tata Kelola Sistem yang Bertanggung Jawab (*Robust Operational Governance*)**

---

## 185. Prinsip Puncak Ekosistem PRONOIA (Final Guiding Principle)

PRONOIA menolak paradigma usang di mana privasi dikorbankan demi efisiensi operasional. PRONOIA tidak dibangun dengan asumsi:
- *"Admin berhak melihat segalanya"*
- *"Instruktur berhak mengakses segalanya"*
- *"AI berhak mengetahui segalanya"*

Sebaliknya, arsitektur PRONOIA dibangun di atas fondasi tata kelola yang bermartabat:

```text
Member memegang kedaulatan penuh atas rekam jejak kesehatan pribadinya
                              │
                              ▼
Instruktur hanya menerima konteks relevan yang dibutuhkan untuk bimbingan
                              │
                              ▼
Admin hanya memegang visibilitas operasional makro demi keselamatan sistem
                              │
                              ▼
AI hanya beroperasi dengan data berbobot minimum yang telah disanitasi
                              │
                              ▼
Setiap akses dan mutasi tercatat secara imutabel dalam buku besar audit
```

> [!TIP]
> **Prinsip Puncak PRONOIA:**  
> *"Orang yang tepat menerima informasi yang tepat, untuk tujuan yang sah, dalam cakupan yang minimum, pada waktu yang tepat."*  
>  
> Didukung oleh komitmen pendampingan manusia yang berkesinambungan:  
> **DETEKSI SINYAL $\rightarrow$ PAHAMI KONTEKS $\rightarrow$ DAMPINGI DENGAN EMPATI $\rightarrow$ LAKUKAN INTERVENSI $\rightarrow$ TINDAK LANJUTI $\rightarrow$ RAIH PEMULIHAN KEBIASAAN.**