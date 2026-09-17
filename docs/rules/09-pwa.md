# PRONOIA — Kaidah Rekayasa Aplikasi Web Progresif & Ketahanan Klien (Progressive Web App Engineering Rules & Client Resilience Standards)

Dokumen spesifikasi teknis ini menetapkan standar rekayasa Aplikasi Web Progresif (*Progressive Web App* / PWA), protokol ketahanan mode luring (*offline resilience*), manajemen daur hidup *Service Worker*, integrasi perangkat keras peramban, serta tata kelola privasi penyimpanan sisi klien untuk seluruh antarmuka pengguna pada platform **PRONOIA**. Sebagai gerbang interaksi utama bagi para anggota pengguna, klien PWA PRONOIA dirancang untuk menghadirkan pengalaman aplikasi seluler kelas satu (*first-class app-like experience*) langsung melalui peramban web modern tanpa kewajiban pemasangan dari toko aplikasi pihak ketiga (*app stores*).

Platform PWA PRONOIA mengadopsi arsitektur **Shell Aplikasi (*App Shell Architecture*)**, penyimpanan *cache* bertingkat (*Tiered Caching Strategy*), antrean mutasi data lokal terenkripsi (*Encrypted Offline Mutation Queue via IndexedDB*), serta sinkronisasi pasca-luring idempoten yang aman dari konflik. Setiap interaksi hardware peramban (kamera pemindai nutrisi, notifikasi web push, dan rujukan lokasi darurat) dikendalikan secara transparan berlandaskan prinsip privasi tertinggi sesuai amanat **Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022)** dan pedoman aksesibilitas global **WCAG 2.1 Level AA**.

---

### Kontrol Dokumen & Metadata Rekayasa PWA

| Parameter Dokumen | Spesifikasi Teknis / Status Resmi |
| :--- | :--- |
| **Nomor Dokumen Standar** | `PRONOIA-RULE-009` |
| **Versi Standar PWA** | `v1.0.0-PROD` (Edisi Ketahanan Klien & Kepatuhan ICONFEST 2026) |
| **Tanggal Efektif Berlaku** | 17 September 2026 |
| **Status Otorisasi** | Resmi Disetujui / Berlaku Mutlak (*Mandatory PWA Engineering Standard*) |
| **Klasifikasi Akses** | Seluruh Perekayasa Frontend, Pengembang PWA, UI/UX Designer, & Tim QA |
| **Teknologi Inti PWA** | HTML5 Semantic, Modern TypeScript/ESNext, CSS3 Design Tokens, Native Service Worker |
| **Spesifikasi Standar Web** | W3C Web App Manifest v1, Service Worker API, CacheStorage API, IndexedDB API |
| **Strategi Jaringan Baku** | Cache-First (Aset Statis), Network-First (Data Kesehatan), Stale-While-Revalidate (Katalog) |
| **Integrasi Perangkat Keras** | MediaDevices API (Kamera), Geolocation API (Darurat Faskes), Web Push API |
| **Kepatuhan Privasi & Desain** | UU PDP No. 27/2022, OWASP Client-Side Top 10, Standar Aksesibilitas WCAG 2.1 Level AA |

---

### Matriks 10 Klaster Rekayasa PWA PRONOIA

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                 TOPOLOGI APLIKASI WEB PROGRESIF & KETAHANAN KLIEN PRONOIA                 │
└───────────────────────────────────────────────────────────────────────────────────────────┘
   │
   ├── [Klaster 1] Filosofi PWA, Arsitektur, & Manifest Web (Bagian 1 – 10)
   │   └── Doktrin PWA, Arsitektur Klien, Batasan Lingkup, Web App Manifest, Ikon Maskable, & Tema
   │
   ├── [Klaster 2] Service Worker, Kebijakan Cache, & Privasi Klien (Bagian 11 – 21)
   │   └── Siklus Service Worker, Cache Bertingkat, Isolasi Data Medis, Bahaya Perangkat Bersama
   │
   ├── [Klaster 3] Mode Luring, Deteksi Jaringan, & Sinkronisasi (Bagian 22 – 30)
   │   └── Indikator Sinyal, Operasi Tulis Luring, Draf Aman, Idempotensi Sinkronisasi, & Konflik
   │
   ├── [Klaster 4] Pembaruan Versi PWA, App Shell, & Instalasi (Bagian 31 – 39)
   │   └── Rotasi Versi Cache, App Shell Luring, Fallback Registrasi, Ajakan Pemasangan Standalone
   │
   ├── [Klaster 5] Integrasi Notifikasi Dorong & Tata Kelola Privasi (Bagian 40 – 44)
   │   └── Web Push API, Etika Permintaan Izin, Sensor Konten Preview, Anti-Spam, & Jadwal Cerdas
   │
   ├── [Klaster 6] Integrasi Kamera, Lokasi Darurat, & Latar Belakang (Bagian 45 – 52)
   │   └── MediaDevices Kamera, Fallback Kamera, Etika Lokasi, Faskes Darurat, & Background Sync
   │
   ├── [Klaster 7] Integrasi Modul Inti: AI, Pemindai, & Metrik (Bagian 53 – 58)
   │   └── PWA & AI Chat, Pemindai Nutrisi, Konsultasi, Linimasa Glukosa, & Visualisasi Skor
   │
   ├── [Klaster 8] Keamanan Klien, Pembersihan Sesi, & Enkripsi HTTPS (Bagian 59 – 69)
   │   └── Anti-Cache Poisoning, Purging Logout, Multi-Akun, Batas Kuota Penyimpanan, & Wajib HTTPS
   │
   ├── [Klaster 9] Kinerja, Pemuatan Malas, & Strategi Jaringan (Bagian 70 – 78)
   │   └── Metrik Web Vitals, Lazy Loading, Pemrosesan Citra Cepat, Aksesibilitas, & Anti-Cache-First
   │
   └── [Klaster 10] Pengujian PWA, Daftar Periksa Rilis, & Kaidah Pamungkas (Bagian 79 – 87)
       └── Simulasi Luring Vitest, Uji Keamanan Penyimpanan, Audit Kompatibilitas API, & Doktrin Puncak
```

---

## 1. Tujuan & Ruang Lingkup Standar PWA (PWA Purpose & Scope)

Kaidah ini menetapkan standar arsitektur teknis, rekayasa antarmuka, dan protokol keandalan untuk **Aplikasi Web Progresif (*Progressive Web App* / PWA)** pada platform **PRONOIA**. Klien PWA PRONOIA bertindak sebagai saluran interaksi terdepan yang menghubungkan anggota pengguna dengan layanan kesehatan preventif, pemantauan biometrik, asisten AI, dan konsultasi profesional.

Klien PWA PRONOIA dirancang mengutamakan pendekatan berorientasi perangkat seluler (*mobile-first approach*) dengan kapabilitas standar modern:
1. **Dapat Dipasang (*Installable*):** Mampu dipasang langsung ke layar beranda (*Home Screen*) perangkat Android, iOS, Windows, dan macOS tanpa melalui toko aplikasi pihak ketiga (*app stores*).
2. **Kinerja Cepat & Responsif (*Instant App Shell*):** Memuat kerangka antarmuka dalam waktu kurang dari 1 detik melalui penyimpanan *cache* cerdas.
3. **Ketahanan Mode Luring (*Offline Resilient*):** Tetap dapat dibuka dan digunakan untuk mencatat data kesehatan darurat saat koneksi internet terputus atau tidak stabil.
4. **Integrasi Perangkat Keras Asli (*Native Hardware Integration*):** Memanfaatkan kamera peramban untuk pemindaian label nutrisi, geolokasi untuk rujukan fasilitas kesehatan darurat, dan notifikasi dorong web (*Web Push*).
5. **Kepatuhan Privasi Tertinggi (*Zero-Trust Local Privacy*):** Mengisolasi dan mengenkripsi data lokal di peramban guna mencegah kebocoran informasi pada perangkat yang digunakan bersama (*shared devices*).

---

## 2. Prinsip Fundamental Aplikasi Web Progresif (Progressive Web App Principles)

Aplikasi PWA PRONOIA wajib berperilaku seandal dan senyaman aplikasi ponsel asli (*native application experience*), namun tetap mempertahankan keunggulan keterbukaan web:

```text
PRINSIP FUNDAMENTAL REKAYASA PWA PRONOIA:
├── 1. CEPAT (FAST) ───────────> Pemuatan instan melalui App Shell ter-cache (< 1 detik FCP)
├── 2. DAPAT DIANDALKAN (RELIABLE) -> Tidak pernah menampilkan dinosaurus layar mati saat luring
├── 3. MENARIK (ENGAGING) ──────> Tampilan layar penuh mandiri (Standalone) tanpa baris URL
└── 4. AMAN (SECURE) ──────────> Enkripsi TLS 1.3 wajib & isolasi data sensitif di peramban
```

Setiap elemen interaksi visual (animasi transisi halaman, getaran umpan balik haptik, dan respons sentuhan tombol) dirancang agar terasa alami, luwes, dan bebas dari fenomena jeda (*no input latency*).

---

## 3. Arsitektur Klien PWA PRONOIA (PRONOIA PWA Client Architecture)

Arsitektur antarmuka klien PWA PRONOIA dibangun dengan memisahkan secara tegas antara **Cangkang Aplikasi (*App Shell*)** dengan **Data Dinamis Domain (*Dynamic Data Streams*)**:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                     ARSITEKTUR KLIEN PWA PLATFORM PRONOIA                │
├──────────────────────────────────────────────────────────────────────────┤
│ [1. App Shell: UI Statis Ter-Cache]                                      │
│  - Header Aplikasi, Navigasi Bawah, Modul Desain CSS, Komponen Inti      │
│  - Di-cache secara agresif oleh Service Worker (Cache-First)             │
├──────────────────────────────────────────────────────────────────────────┤
│ [2. Dynamic Data: Stream Data Terotentikasi]                             │
│  - Glukosa Darah, Tekanan Darah, Skor Kesiapan, Wawasan, Chat AI         │
│  - Diambil langsung dari Backend API (Network-First / Network-Only)      │
├──────────────────────────────────────────────────────────────────────────┤
│ [3. Local Client Storage: Penyimpanan Sementara & Draf Luring]           │
│  - CacheStorage: Aset Berkas Statis (HTML/CSS/JS/WebP/Woff2)             │
│  - IndexedDB: Antrean Mutasi Luring Terenkripsi (Offline Sync Queue)     │
└──────────────────────────────────────────────────────────────────────────┘
```

Pemisahan ini menjamin bahwa saat pengguna membuka aplikasi dalam kondisi tanpa sinyal, tata letak antarmuka langsung menyala seketika dan menyajikan indikator status luring yang ramah.

---

## 4. Batasan Lingkup & Peran Klien PWA (PWA Scope & Role Boundaries)

Klien PWA PRONOIA difokuskan secara khusus untuk peran **Member (Pengguna Mandiri)** yang membutuhkan akses cepat pada perangkat ponsel pintar sehari-hari:

| Peran Pengguna | Jalur Akses Aplikasi | Optimasi PWA |
| :--- | :--- | :--- |
| **Member (Anggota)** | `https://app.pronoia.id/` | **PWA Penuh (Installable, Offline Sync, Camera Scanner, Push Notifications)** |
| **Instructor (Instruktur)** | `https://instructor.pronoia.id/` | Web Dashboard Desktop (Dukungan Responsif Layar Lebar, Audit Kohor) |
| **Administrator** | `https://admin.pronoia.id/` | Web Dashboard Desktop (Manajemen Sistem, Keamanan, & Katalog) |

PWA tidak dirancang untuk menggantikan kebutuhan dasbor analitik instruktur yang membutuhkan multi-jendela dan perbandingan tabel kohor masif di layar monitor komputer meja.

---

## 5. Konfigurasi Web App Manifest (Web App Manifest Configuration)

Aplikasi wajib menyertakan dokumen manifest web standar (*Web App Manifest*) pada tautan kepala HTML (`<link rel="manifest" href="/manifest.webmanifest">`) dengan spesifikasi lengkap:

```json
{
  "name": "PRONOIA — Health Companion",
  "short_name": "PRONOIA",
  "description": "Pendamping gaya hidup preventif dan pemantau kesehatan biometrik cerdas",
  "start_url": "/dashboard?source=pwa",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#0F172A",
  "background_color": "#020617",
  "lang": "id-ID",
  "dir": "ltr",
  "categories": ["health", "lifestyle", "medical"],
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

---

## 6. Identitas Aplikasi & Metadata Manifest (Application Identity & Metadata)

Penetapan identitas nama aplikasi pada manifest web wajib konsisten di seluruh lingkungan produksi:

* **Nama Lengkap (*name*):** `"PRONOIA — Health Companion"` (Ditampilkan saat proses konfirmasi instalasi peramban).
* **Nama Pendek (*short_name*):** `"PRONOIA"` (Maksimal 12 karakter; ditampilkan di bawah ikon layar beranda ponsel pengguna).
* **Larangan Identitas Non-Produksi:** Dilarang keras membiarkan nama lingkungan pengembangan (seperti `"PRONOIA Dev"`, `"PRONOIA Staging"`, atau `"Test App"`) bocor ke manifest produksi.

---

## 7. Aset Ikon Aplikasi & Maskable Icon (Application Icons & Maskable Assets)

Klien PWA wajib menyediakan rangkaian berkas ikon aplikasi dalam format PNG dengan resolusi tajam dan kepatuhan terhadap standar *Maskable Icon*:

* **Ukuran Ikon Standar Wajib:**
  - `icon-192x192.png`: Digunakan untuk layar ponsel standar dan menu pengalih aplikasi (*app switcher*).
  - `icon-512x512.png`: Digunakan untuk layar resolusi tinggi (Retina/AMOLED) dan layar pembuka (*splash screen*).
* **Ikon Maskable (*Maskable Purpose*):**
  - Menyediakan berkas `maskable-icon-512x512.png` dengan zona aman (*safe zone*) 80% di tengah kanvas.
  - Memastikan ikon PRONOIA tidak terpotong saat sistem operasi ponsel (khususnya Android Adaptive Icons) menerapkan pemotongan bentuk lingkaran, persegi tumpul, atau tetesan air.

---

## 8. Penetapan Tema Warna & Gaya Visual (Theme Color & Visual Styling)

Pewarnaan tema PWA wajib memancarkan estetika medis modern bernuansa premium (*sleek dark mode / clinical deep slate*):

* **Warna Tema (*theme_color*):** `#0F172A` (Slate gelap berkelas; mengendalikan warna bilah status sistem operasi dan bilah judul jendela).
* **Warna Latar Belakang (*background_color*):** `#020617` (Deep obsidian; ditampilkan saat peramban pertama kali meluncurkan layar pembuka sebelum aset CSS dimuat).
* **Tag Meta HTML Wajib:**
  ```html
  <meta name="theme-color" content="#0F172A" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  ```

---

## 9. Mode Tampilan Mandiri Antarmuka (Standalone Display Mode)

Mode tampilan PWA PRONOIA ditetapkan secara mutlak ke **Mode Mandiri (*Standalone Display Mode*)**:

```json
"display": "standalone"
```

Karakteristik Mode Standalone:
- Menyembunyikan seluruh kontrol antarmuka peramban standar (bilah alamat URL, tombol navigasi maju/mundur bawaan peramban, dan menu tab).
- Aplikasi berjalan dalam jendela terdedikasi yang setara dengan aplikasi asli (*native application look and feel*).
- Memberikan kontrol navigasi penuh kepada desainer antarmuka PRONOIA melalui komponen *AppBar* dan *Bottom Navigation*.

---

## 10. Penetapan URL Awal & Titik Masuk (Start URL & Entry Point Configuration)

URL awal aplikasi (`start_url`) wajib mengarahkan pengguna ke titik masuk yang bermakna dengan penanda sumber analitik:

```json
"start_url": "/dashboard?source=pwa"
```

Perilaku Titik Masuk:
- Jika pengguna telah memiliki sesi login aktif yang sah, perutean otomatis mengantarkan pengguna langsung ke Dasbor Kesiapan Harian (*Daily Readiness Dashboard*).
- Jika sesi belum terotentikasi, perantara perutean sisi klien (*Client Router Middleware*) mengalihkan pengguna ke layar `/login` tanpa mengubah parameter `start_url` pada manifest.
- Parameter `?source=pwa` memungkinkan pelacakan analitik agregat terhadap persentase anggota yang mengakses platform melalui instalasi PWA dibanding peramban biasa.

---

## 11. Arsitektur & Siklus Hidup Service Worker (Service Worker Architecture & Lifecycle)

*Service Worker* berkedudukan sebagai tulang punggung arsitektur PWA yang mengendalikan intersepsi jaringan, manajemen cache, dan sinkronisasi latar belakang:

```text
Daur Hidup Service Worker PRONOIA:
[1. Pendaftaran (Registration via navigator.serviceWorker.register('/sw.js'))]
               │
               ▼
[2. Pemasangan (Install Event: Pra-Cache Seluruh Aset Statis App Shell)]
               │
               ▼
[3. Pengaktifan (Activate Event: Pembersihan Cache Usang & Klaim Klien Segera)]
               │
               ▼
[4. Operasi Aktif (Fetch Event: Intersepsi Permintaan Jaringan & Strategi Cache)]
```

Pengaktifan Service Worker wajib menggunakan `self.skipWaiting()` pada fase instal dan `self.clients.claim()` pada fase aktivasi agar pembaruan versi segera mengendalikan seluruh tab aplikasi terbuka.

---

## 12. Cakupan Jalur Layanan Service Worker (Service Worker Scope Enforcement)

Cakupan layanan Service Worker (*Service Worker Scope*) wajib dibatasi secara ketat pada direktori akar aplikasi:

```javascript
navigator.serviceWorker.register('/sw.js', {
    scope: '/'
});
```

Batasan Lingkup Operasi:
- Hanya boleh mengintersepsi permintaan aset dan rute yang berada di bawah domain `app.pronoia.id`.
- Dilarang keras mengintersepsi atau mencoba menyimpan cache rute dasbor instruktur (`/instructor/*`) atau portal administrator (`/admin/*`).
- Mengabaikan intersepsi terhadap pemanggilan pustaka analitik eksternal atau berkas CDN pihak ketiga yang tidak terdaftar dalam daftar putih domain terpercaya.

---

## 13. Klasifikasi Kategori Penyimpanan Cache (Cache Storage Categorization)

Sumber daya yang diakses oleh klien PWA diklasifikasikan ke dalam 4 tingkatan kategori penyimpanan cache:

| Kategori Sumber Daya | Contoh Aset | Strategi Cache Service Worker |
| :--- | :--- | :--- |
| **Aset Statis Shell (*Static App Shell*)** | Berkas JS, CSS, Font Woff2, SVG Ikon, Manifest | **Cache-First (Pemuatan Instan)** |
| **Konten Publik (*Public Content*)** | Pustaka Artikel Edukasi, FAQ, Template Intervensi | **Stale-While-Revalidate (1 Jam)** |
| **Data Terotentikasi Non-Kritis** | Profil Ringan, Lencana Hadiah, Papan Peringkat | **Network-First dengan Fallback Cache Pendek** |
| **Data Medis & Biometrik Sensitif** | Pembacaan Glukosa, Catatan Klinis, Chat AI | **Network-Only (DILARANG CACHE STATIS)** |

Pemisahan kategori ini mencegah pencemaran data pribadi ke dalam cache perantara peramban.

---

## 14. Strategi Cache Aset Statis Aplikasi (Static Asset Caching Strategy)

Aset statis aplikasi (*App Shell Static Assets*) disimpan menggunakan strategi **Cache-First (Cache Prioritas)**:

```javascript
// Service Worker: Strategi Cache-First untuk Aset Statis
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.origin === self.location.origin && isStaticAsset(url.pathname)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(STATIC_CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});
```

Aset yang masuk kriteria statis wajib memuat penanda hash konten pada nama berkas (misalnya `app.8f11a2.js`) guna mendukung *cache-busting* otomatis saat rilis baru.

---

## 15. Strategi Cache Konten Publik & Edukasi (Public & Educational Content Caching)

Konten publik yang tidak memuat data pribadi (seperti katalog pustaka intervensi atau artikel panduan tidur) disimpan menggunakan strategi **Stale-While-Revalidate**:

1. Service Worker segera menyajikan salinan data yang tersimpan di cache lokal kepada pengguna (*stale response*).
2. Secara bersamaan di latar belakang, Service Worker mengirimkan permintaan ke jaringan peladen untuk mengambil data terbaru (*revalidate*).
3. Jika data peladen lebih mutakhir, cache lokal diperbarui dan antarmuka memperbarui konten secara halus tanpa kedipan layar (*seamless re-render*).

Pendekatan ini memberikan latensi baca mendekati 0 milidetik sambil mempertahankan kesegaran informasi edukasi kesehatan.

---

## 16. Kebijakan Cache Data Terotentikasi (Authenticated Data Caching Policies)

Titik akhir API yang memerlukan otentikasi identitas pengguna (`/api/v1/*`) tunduk pada kebijakan penyimpanan yang sangat ketat:

> [!CAUTION]
> Dilarang keras menerapkan strategi "Cache Seluruh Respons API" (*Blind API Caching*).

Penyimpanan cache sembarangan pada titik akhir terotentikasi dapat mengakibatkan:
- Anggota melihat data usang yang berisiko klinis (misalnya pembacaan glukosa kemarin ditampilkan seolah hari ini).
- Paparan rekaman kesehatan anggota sebelumnya saat ponsel dipinjamkan ke anggota keluarga lain.

Oleh karena itu, seluruh rute data pengguna wajib mengutamakan jaringan peladen (*Network-First* atau *Network-Only*).

---

## 17. Kebijakan Penyimpanan Cache Data Kesehatan (Health Data Caching Restrictions)

Penyimpanan cache terhadap data kesehatan privat (`/api/v1/health/*`, `/api/v1/insights/*`) dilarang keras dilakukan oleh *CacheStorage* Service Worker standar:

* **Alasan Larangan CacheStorage Medis:**
  - *CacheStorage* menyimpan data dalam bentuk berkas teks mentah (*plain HTTP response text*) yang dapat diakses oleh skrip ekstensi peramban pihak ketiga yang tidak tepercaya.
  - *CacheStorage* tidak memiliki mekanisme enkripsi bawaan di tingkat peramban.
* **Solusi Persistensi Luring Resmi:**
  - Jika data kesehatan perlu diakses saat luring, data wajib disimpan di **IndexedDB terenkripsi** di sisi klien menggunakan kunci yang diturunkan dari sesi otentikasi aktif pengguna, bukan di CacheStorage publik.

---

## 18. Kebijakan Default Penanganan Data Sensitif (Default Sensitive Data Policy)

Asumsi default penanganan data sensitif pada arsitektur PWA:

> "Seluruh respons API yang memuat data kesehatan pribadi, riwayat percakapan AI, dan catatan konsultasi dianggap TIDAK BISA DI-CACHE (*NON-CACHEABLE*) oleh Service Worker, kecuali ada dokumen persetujuan arsitektur eksplisit."

Kaidah ini menjamin bahwa pengembang tidak akan pernah secara tidak sengaja mengorbankan kepatuhan hukum privasi hanya demi menaikkan skor kecepatan peramban secara semu.

---

## 19. Mitigasi Risiko Perangkat Bersama (Shared Device Privacy Risk Mitigation)

Aplikasi PWA sering kali terpasang pada gawai keluarga yang digunakan bersama (*Shared Household Devices*). Arsitektur klien wajib memitigasi risiko kebocoran data antar-pengguna:

* **Larangan Asumsi Perangkat Privat Tunggal:**
  - Sistem tidak boleh mengasumsikan bahwa perangkat yang telah memasang PWA hanya akan digunakan oleh satu orang seumur hidup.
* **Protokol Perlindungan Sesi Bersama:**
  - Menyediakan opsi kunci biometrik lokal (*WebAuthn / Fingerprint*) sebelum menampilkan ringkasan catatan medis sensitif pada perangkat yang dipasang.
  - Sesi aplikasi otomatis mengunci antarmuka setelah 15 menit tidak ada aktivitas sentuhan (*inactivity auto-lock*).

---

## 20. Tata Kelola Penyimpanan Lokal Peramban (Browser Storage Governance)

Tata kelola penyimpanan lokal peramban (*Browser Storage Governance*) menetapkan hierarki penggunaan media penyimpanan sisi klien:

| Media Penyimpanan Peramban | Tujuan yang Diizinkan | Larangan Mutlak |
| :--- | :--- | :--- |
| **`localStorage`** | Preferensi antarmuka non-sensitif (Tema Gelap/Terang, Bahasa Pilihan, Status Tour). | **Dilarang keras menyimpan Token Otentikasi, Kata Sandi, & Rekam Medis.** |
| **`sessionStorage`** | Status navigasi sementara, formulir multi-langkah yang belum selesai, ID sesi audit. | Dilarang menyimpan data yang perlu bertahan setelah tab ditutup. |
| **`IndexedDB`** | Antrean draf mutasi luring terenkripsi (*Encrypted Offline Sync Queue*). | Dilarang menyimpan rekaman medis tanpa enkripsi lapis aplikasi. |
| **`CacheStorage`** | Berkas biner statis App Shell (JS, CSS, WebP, Woff2). | Dilarang menyimpan badan respons JSON endpoint pribadi. |

---

## 21. Interaksi Otentikasi & Sesi PWA (Authentication & PWA Session Management)

Klien PWA wajib tunduk pada arsitektur otentikasi terpusat platform:

1. **Penyimpanan Kredensial Aman:** Token otentikasi sesi disimpan pada mekanisme *HttpOnly, Secure, SameSite=Strict Cookies* atau memori kerja JavaScript terisolasi, bukan pada *localStorage* yang rentan serangan Cross-Site Scripting (XSS).
2. **Pemeriksaan Status Sesi Teratur:** Setiap kali aplikasi PWA diluncurkan kembali dari status latar belakang (*foreground transition*), klien memverifikasi kesegaran sesi ke titik akhir `/api/v1/auth/me`.
3. **Penanganan Sesi Kedaluwarsa:** Jika token telah habis masa aktifnya, klien menghentikan akses ke halaman pribadi dan menampilkan dialog masuk kembali dengan mempertahankan draf pencatatan yang belum tersimpan.

---

## 22. Desain Pengalaman Pengguna Mode Luring (Offline Mode User Experience)

Dukungan mode luring pada PWA PRONOIA dirancang secara spesifik per kemampuan fitur (*Capability-Specific Offline Support*):

```text
Matriks Kapabilitas Mode Luring PWA PRONOIA:
├── 1. Navigasi Antarmuka (App Shell) ──> DIDUKUNG PENUH (Buka aplikasi lancar tanpa sinyal)
├── 2. Pencatatan Metrik Mandiri ───────> DIDUKUNG (Disimpan ke draf lokal antrean sync)
├── 3. Pustaka Intervensi & Edukasi ────> DIDUKUNG TERBATAS (Membaca modul yang telah ter-cache)
├── 4. Pemindai Kamera Label Makanan ───> TERBATAS (Bisa ambil foto, analisis tertunda saat daring)
├── 5. Percakapan Asisten Cerdas AI ────> DINONAKTIFKAN SEMENTARA (Menampilkan pesan ramah)
└── 6. Reservasi Konsultasi Dokter ─────> DINONAKTIFKAN (Memerlukan konfirmasi jadwal real-time)
```

Desain ini memberikan kepastian fungsional: pengguna tahu persis fitur apa yang dapat digunakan saat tidak ada jaringan dan fitur apa yang membutuhkan koneksi aktif.

---

## 23. Indikator Visual Konektivitas Jaringan (Network Connectivity Visual Indicators)

Saat koneksi internet terputus, antarmuka PWA wajib menampilkan status konektivitas secara elegan dan non-intrusif:

```text
[Bilah Notifikasi Halus di Bawah AppBar]
⚠️ Anda sedang dalam Mode Luring. Data yang Anda catat akan disimpan secara lokal dan disinkronkan otomatis saat koneksi internet pulih.
```

Kaidah Desain Indikator Konektivitas:
- Menggunakan banner tipis dengan aksen oranye lembut (*warning banner*) di bagian atas layar atau lencana status pada tombol pencatatan.
- Dilarang menampilkan dialog modal yang memblokir seluruh layar secara agresif (*no blocking modal alerts*) yang menghalangi pengguna membaca konten yang telah terbuka.
- Elemen yang membutuhkan koneksi aktif (seperti tombol "Mulai Sesi Chat AI") otomatis berubah status menjadi nonaktif (*disabled*) disertai keterangan penjelasan yang ramah.

---

## 24. Deteksi Perubahan Status Koneksi Real-Time (Real-Time Online/Offline State Detection)

Deteksi status konektivitas peramban (`navigator.onLine`) tidak menjamin bahwa peladen backend benar-benar dapat dijangkau:

```javascript
// ✅ DETEKSI KONEKTIVITAS GANDA (BROWSER EVENT + HEARTBEAT PING)
window.addEventListener('online', async () => {
    const isBackendReachable = await checkBackendHealth();
    if (isBackendReachable) {
        triggerBackgroundSync();
    } else {
        showConnectivityNotice('Koneksi internet terdeteksi, namun peladen belum merespons.');
    }
});

async function checkBackendHealth() {
    try {
        const response = await fetch('/api/v1/health/ping', {
            method: 'HEAD',
            cache: 'no-store'
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}
```

Pemeriksaan detak jantung (*heartbeat ping*) ringan mencegah pemicuan badai sinkronisasi saat perangkat terhubung ke jaringan Wi-Fi publik yang terhalang halaman masuk (*captive portal*).

---

## 25. Operasi Tulis & Mutasi dalam Mode Luring (Offline Write & Mutation Operations)

Operasi tulis data kesehatan saat luring wajib ditangani dengan prinsip kehati-hatian tingkat tinggi:

1. **Penyimpanan Draf Terenkripsi:** Rekaman metrik biometrik yang dicatat saat luring disimpan ke dalam pangkalan data lokal peramban (*IndexedDB*) yang dienkripsi menggunakan kunci enkripsi sesi.
2. **Penetapan Pengenal Idempotensi Klien:** Setiap draf pencatatan wajib memiliki UUID v7 unik yang dibuat langsung di perangkat pengguna (`idempotency_key`).
3. **Pemberian Stempel Waktu Pengukuran Nyata:** Mencatat stempel waktu lokal (`measured_at`) saat tombol simpan ditekan, bukan saat data berhasil terkirim ke peladen berjam-jam kemudian.

---

## 26. Manajemen Draf Catatan Luring yang Aman (Safe Offline Draft Management)

Draf catatan luring wajib dikelola dengan protokol isolasi pengguna yang ketat:

- **Terikat Akun Pengguna Aktif:** Draf pencatatan yang disimpan di IndexedDB wajib menyertakan identitas `user_id`. Jika pengguna keluar (*logout*) dan pengguna lain masuk di perangkat yang sama, draf pengguna sebelumnya tidak boleh terlihat atau disinkronkan ke akun baru.
- **Masa Kedaluwarsa Draf:** Draf luring yang belum tersinkronisasi dalam waktu **7 (tujuh) hari** diberi penanda peringatan kedaluwarsa dan meminta konfirmasi pengguna sebelum disinkronkan ke peladen.
- **Transparansi Visual:** Daftar riwayat menampilkan ikon awan terputus (*cloud-off icon*) di samping setiap rekaman yang masih berstatus draf lokal.

---

## 27. Protokol Sinkronisasi Data Pasca-Luring (Post-Offline Synchronization Protocol)

Ketika koneksi internet pulih, antarmuka PWA secara otomatis mengeksekusi **Protokol Sinkronisasi Pasca-Luring (*Post-Offline Synchronization*)**:

```text
Koneksi Pulih & Peladen Terverifikasi
                │
                ▼
[1. Baca Antrean Mutasi Tertunda dari IndexedDB Terenkripsi]
                │
                ▼
[2. Urutkan Berdasarkan Stempel Waktu (Kronologis: Terlama ke Terbaru)]
                │
                ▼
[3. Kirimkan Batch Permintaan ke POST /api/v1/health/metrics/bulk-sync]
                │  └── Menyertakan Idempotency-Key & Stempel Waktu measured_at
                ▼
[4. Terima Konfirmasi dari Peladen (200 OK Status Terstruktur)]
                │
                ▼
[5. Hapus Entri dari Antrean Lokal IndexedDB & Perbarui UI Menjadi 'SYNCED']
```

---

## 28. Pencegahan Duplikasi Sinkronisasi Data (Duplicate Synchronization Prevention)

Pengiriman ulang otomatis saat jaringan tidak stabil rentan menimbulkan pencatatan ganda. Pencegahan duplikasi ditegakkan di dua sisi:

* **Di Sisi Klien PWA:**
  - Mengunci antrean mutasi dengan penanda status `SYNCING` selama proses pengiriman berlangsung, mencegah pemicuan ganda oleh beberapa tab aplikasi yang terbuka bersamaan.
* **Di Sisi Peladen Backend:**
  - Memeriksa header `Idempotency-Key` pada Redis cache. Jika kunci yang sama telah diproses dalam 24 jam terakhir, peladen mengembalikan respons sukses asli tanpa membuat rekaman ganda di basis data.

---

## 29. Penyelesaian Konflik Pembaruan Data (Sync Conflict Resolution Strategies)

Ketika terjadi perbedaan status antara data lokal klien dengan data mutakhir peladen, sistem menerapkan strategi resolusi konflik terprediksi:

```text
Konflik Data Sinkronisasi:
├── 1. Pencatatan Metrik Deret Waktu ──> Tambahkan Seluruhnya (Berdasarkan measured_at Nyata)
│   └── Tidak ada konflik penimpaan karena setiap pengukuran adalah entri historis unik.
│
├── 2. Pembaruan Profil & Preferensi ──> Aturan Penulisan Terakhir (Last-Write-Wins / LWW)
│   └── Membandingkan stempel waktu updated_at klien vs peladen.
│
└── 3. Reservasi Sesi Konsultasi ──────> Peladen Menolak dengan Status 409 Conflict
    └── Membuka dialog pemulihan: "Slot telah terisi, silakan pilih jadwal pengganti."
```

---

## 30. Umpan Balik Status Sinkronisasi Klien (Sync Status Client Feedback)

Antarmuka klien wajib mengomunikasikan siklus status sinkronisasi secara transparan:

```text
Indikator Siklus Status Sinkronisasi:
[DRAFT]      -> Data tersimpan aman di memori perangkat lokal Anda.
[SYNCING]    -> Mengirimkan data ke peladen PRONOIA (Animasi putaran halus)...
[SYNCED]     -> Seluruh data berhasil tersinkronisasi dan diverifikasi aman.
[SYNC_ERROR] -> Gagal sinkronisasi. Sentuh untuk mencoba mengirimkan ulang.
```

Pengguna tidak boleh dibiarkan menebak-nebak apakah data gula darah yang baru mereka masukkan telah sampai ke peladen atau masih tertahan di ponsel.

---

## 31. Strategi Pembaruan Versi Aset PWA (PWA Asset Version Update Strategy)

Pembaruan versi aset PWA (*PWA Update Strategy*) wajib dikelola agar pengguna tidak terjebak pada versi kode JavaScript lama yang tidak kompatibel dengan kontrak backend:

* **Pemeriksaan Pembaruan Service Worker:**
  - Peramban otomatis memeriksa perubahan pada berkas `/sw.js` setiap kali pengguna membuka aplikasi.
  - Jika terdeteksi *byte difference* pada Service Worker baru, fase instalasi latar belakang segera berjalan.
* **Pemberitahuan Pembaruan Ramah Pengguna (*Soft Update Banner*):**
  - Ketika Service Worker baru telah siap (*waiting state*), aplikasi memunculkan snackbar di bagian bawah layar: *"Versi baru PRONOIA telah tersedia. [Perbarui Sekarang]"*.
  - Menekan tombol perbarui memicu pengiriman pesan `postMessage({ type: 'SKIP_WAITING' })` dan memuat ulang halaman secara mulus.

---

## 32. Penamaan Versi Cache Terstruktur (Versioned Cache Naming Conventions)

Penamaan keranjang penyimpanan cache (*Cache Storage Names*) wajib menyertakan penanda versi rilis aplikasi yang terstruktur:

```javascript
// sw.js: Penamaan Cache Terversi Baku
const APP_VERSION = 'v1.4.2';
const STATIC_CACHE_NAME = `pronoia-shell-${APP_VERSION}`;
const PUBLIC_CONTENT_CACHE = `pronoia-content-${APP_VERSION}`;

// Pembersihan Cache Versi Lama pada Fase Aktivasi
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName.startsWith('pronoia-') && !cacheName.endsWith(APP_VERSION)) {
                        return caches.delete(cacheName); // Hapus cache versi lama
                    }
                })
            );
        })
    );
});
```

Pola ini menjamin memori peramban pengguna tidak dipenuhi oleh berkas cache dari puluhan versi rilis masa lalu.

---

## 33. Pencegahan Retensi Aset Usang (Stale Asset Retention Prevention)

Mencegah situasi berbahaya di mana **Aplikasi Klien Lama Berkomunikasi dengan Kontrak API Baru (*Stale Asset Prevention*)**:

> [!WARNING]
> Jika backend API merilis perubahan skema validasi yang ketat sementara pengguna menjalankan bundle JavaScript dari cache lawas, permintaan mutasi dapat gagal secara misterius.

Mitigasi Pencegahan Aset Usang:
- Menyematkan header respons peladen `X-Client-Version-Check: 1.4.2` pada setiap pemanggilan API.
- Jika terdeteksi selisih versi mayor, klien PWA otomatis membersihkan *CacheStorage* dan memicu pembaruan halaman (*hard refresh*).

---

## 34. Arsitektur Shell Aplikasi (App Shell Architecture Pattern)

Arsitektur Shell Aplikasi (*App Shell Architecture*) mendefinisikan kerangka minimal yang dibutuhkan untuk merender antarmuka pertama kali:

* **Komponen yang Masuk ke App Shell:**
  - Dokumen HTML dasar (`index.html`).
  - Berkas CSS inti pengatur token desain, palet warna, dan tipografi.
  - Komponen kerangka navigasi (*AppBar*, *Bottom Navigation Bar*, *Skeleton Loaders*).
  - Skrip pengelola sesi dan perutean (*Client Router*).
* **Komponen yang Dilarang Masuk App Shell:**
  - Data pribadi pengguna, rekam medis, atau token sesi pengguna tertentu.
  - Citra berukuran besar yang tidak diperlukan pada pemuatan awal.

---

## 35. Ketersediaan Shell Aplikasi Mode Luring (Offline App Shell Availability)

Saat aplikasi diluncurkan dalam kondisi tanpa jaringan internet, App Shell wajib dapat dimuat dalam waktu kurang dari **800 milidetik**:

```text
Tampilan App Shell Saat Mode Luring:
┌────────────────────────────────────────────────────────┐
│ PRONOIA                         [Indikator Mode Luring]│
├────────────────────────────────────────────────────────┤
│                                                        │
│ [Skeleton Meter Skor Kesiapan...]                      │
│                                                        │
│ [Tombol: Catat Metrik Darurat (Tersimpan Lokal)]       │
│                                                        │
│ [Daftar Draf Pencatatan yang Belum Tersinkronisasi]   │
│                                                        │
├────────────────────────────────────────────────────────┤
│ [🏠 Dasbor]   [📊 Riwayat]   [📷 Pemindai]   [👤 Profil]│
└────────────────────────────────────────────────────────┘
```

Pengguna disambut dengan antarmuka yang fungsional dan siap menerima pencatatan, bukan layar kosong putih atau pesan galat jaringan peramban.

---

## 36. Mitigasi Kegagalan Registrasi Service Worker (Service Worker Registration Failure Mitigation)

Jika registrasi Service Worker gagal (karena mode penyamaran/incognito tertentu, pemblokiran ekstensi peramban, atau kebijakan privasi ketat), aplikasi **wajib tetap dapat digunakan sepenuhnya sebagai aplikasi web biasa**:

```javascript
// Registrasi Service Worker dengan Penanganan Kegagalan yang Anggun
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.info('Service Worker PRONOIA aktif pada cakupan:', registration.scope);
        })
        .catch((error) => {
            console.warn('Peringatan: PWA berjalan dalam mode Web Standar tanpa cache luring:', error);
            // Aplikasi tetap berjalan normal tanpa menghentikan eksekusi kode UI lainnya
        });
}
```

Kegagalan PWA tidak boleh melumpuhkan fungsi dasar platform.

---

## 37. Dukungan Kompatibilitas Lintas Peramban (Cross-Browser Compatibility Standards)

Klien PWA PRONOIA menjamin pengalaman pengguna yang konsisten di berbagai peramban modern:

* **Google Chrome & Edge (Chromium):** Mendukung penuh instalasi standalone otomatis, background sync, web push, dan maskable icons.
* **Apple Safari (iOS & iPadOS):** Mendukung instalasi melalui menu *"Add to Home Screen"*, pengenalan ikon Apple Touch Icon (`apple-touch-icon.png`), dan integrasi Web Push (iOS 16.4+).
* **Mozilla Firefox (Android & Desktop):** Mendukung fungsionalitas Service Worker penuh dan deteksi luring standar.

Pendeteksian fitur (*Feature Detection*) selalu digunakan sebelum memanggil API modern (`if ('Notification' in window)`).

---

## 38. Pengelolaan Ajakan Instalasi Aplikasi (Install Prompt User Experience)

Ajakan pemasangan aplikasi (*Install Prompt UX*) wajib disajikan secara etis dan tepat waktu:

> [!IMPORTANT]
> Dilarang keras menampilkan dialog ajakan instalasi (*install banner*) secara agresif pada detik pertama pengguna membuka halaman muka.

Waktu yang Tepat untuk Menampilkan Ajakan Instalasi:
- Setelah anggota berhasil mencatat metrik kesehatan pertamanya dengan sukses.
- Setelah anggota menyelesaikan tur pengenalan aplikasi (*Onboarding Tour*).
- Disediakan tombol permanen yang tidak mencolok pada menu Pengaturan Profil: *"Pasang Aplikasi PRONOIA ke Layar Utama"*.

---

## 39. Pelacakan Status Instalasi Standalone (Standalone Installation State Tracking)

Antarmuka aplikasi wajib memantau status instalasi standalone dan tidak menampilkan promosi instalasi jika aplikasi telah terpasang:

```javascript
// Deteksi Apakah Aplikasi Sedang Berjalan dalam Mode Terpasang (Standalone)
function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) ||
           (window.navigator.standalone === true); // Khusus iOS Safari
}

if (isRunningStandalone()) {
    // Sembunyikan seluruh banner promosi instalasi
    document.querySelectorAll('.pwa-install-prompt').forEach(el => el.remove());
}
```

Menghindari redundansi tampilan yang mengganggu kenyamanan anggota setia yang telah memasang aplikasi.

---

## 40. Arsitektur Notifikasi Dorong Web (Web Push Notification Architecture)

Arsitektur Notifikasi Dorong (*Web Push Notifications*) mengalirkan pembaruan penting secara asinkron dari backend ke perangkat anggota:

```text
Backend PRONOIA (Pemicu Event Jadwal Konsultasi)
               │
               ▼
[Web Push Service (Enkripsi Payload via Kunci Publik VAPID)]
               │
               ▼
[Push Gateway Vendor (Google FCM / Apple APNs / Mozilla Push)]
               │
               ▼
[Perangkat Pengguna -> Service Worker 'push' Event Diterima]
               │
               ▼
[Pemeriksaan Mode Sesi & Tampilkan Notifikasi Bersensor Aman]
```

Seluruh transmisi pesan notifikasi wajib diotentikasi menggunakan standar VAPID (*Voluntary Application Server Identification*).

---

## 41. Pengelolaan Izin Notifikasi Beretika (Ethical Notification Permission UX)

Permintaan izin notifikasi peramban (*Notification Permission UX*) wajib didahului oleh dialog persiapan internal (*Permission Pre-prompt Dialog*):

* **Alur Perizinan Dua Langkah:**
  1. Aplikasi menampilkan modal kartu penjelasan: *"Dapatkan pengingat jadwal konsultasi dan tips hidrasi harian tepat waktu. [Aktifkan Notifikasi]"*.
  2. Hanya ketika pengguna menekan tombol persetujuan kartu tersebut, aplikasi memanggil fungsi bawaan peramban: `Notification.requestPermission()`.
* **Mencegah Penolakan Permanen:** Jika peramban langsung menolak izin tanpa konteks, peramban akan memblokir dialog perizinan selamanya. Pendekatan dua langkah ini menjaga rasio persetujuan (*opt-in rate*) tetap tinggi.

---

## 42. Perlindungan Privasi Konten Notifikasi (Notification Content Privacy Shield)

Perlindungan privasi konten notifikasi (*Notification Content Privacy Shield*) melarang penyertaan data klinis eksplisit pada pratinjau:

* ❌ **Contoh Notifikasi Tidak Aman (Dilarang):**
  ```text
  "Gula darah Anda naik tajam menjadi 220 mg/dL setelah sarapan!"
  (Bisa terbaca oleh rekan kerja di sebelah pengguna pada layar terkunci)
  ```
* ✅ **Contoh Notifikasi Aman (Standar PRONOIA):**
  ```text
  Judul: "Pengingat Metrik Kesehatan PRONOIA"
  Isi:   "Ada evaluasi baru pada tren harian Anda. Buka aplikasi untuk meninjau."
  ```

Prinsip ini menjaga kehormatan dan kerahasiaan data medis anggota di ruang publik.

---

## 43. Pencegahan Penyalahgunaan Notifikasi Spam (Notification Anti-Spam & Frequency Capping)

Notifikasi dorong dilarang keras disalahgunakan sebagai sarana penekan retensi semu (*Anti-Notification Spam & Fatigue Policy*):

> [!CAUTION]
> Dilarang menggunakan notifikasi untuk memicu ketakutan (*fear*), rasa bersalah (*guilt*), atau tekanan retensi berlebihan:
> - DILARANG: "Anda belum mencatat glukosa hari ini, kesehatan Anda dalam bahaya!"
> - DILARANG: Mengirimkan lebih dari 3 notifikasi otomatis dalam 24 jam tanpa interaksi aktif pengguna.

Setiap notifikasi wajib memberikan nilai manfaat nyata, memberdayakan, dan mendukung kebiasaan sehat secara positif.

---

## 44. Penjadwalan Pengingat Kesehatan Cerdas (Smart Health Reminder Scheduling)

Penjadwalan pengingat kesehatan (*Health Reminder Scheduling*) diselaraskan dengan ritme sirkadian dan kebiasaan pribadi anggota:

- **Pengingat Glukosa Puasa:** Dijadwalkan pada jendela waktu bangun pagi pengguna (misal: 06:30 - 07:30).
- **Pengingat Hidrasi Seimbang:** Didistribusikan secara proporsional sepanjang jam aktif siang hari.
- **Jam Tenang Malam Hari (*Quiet Hours*):** Dilarang keras mengirimkan notifikasi rutin antara pukul **21:30 hingga 06:00 waktu lokal pengguna**, kecuali terdapat eskalasi kedaruratan klinis yang mendesak.

---

## 45. Integrasi Perangkat Keras Kamera (Hardware Camera Integration)

Integrasi perangkat keras kamera peramban (*MediaDevices API*) diperuntukkan secara spesifik bagi fitur Pemindai Nutrisi & Komposisi Makanan:

* **Prinsip Tepat Konteks (*Contextual Invocation*):**
  - Permintaan izin akses kamera **hanya boleh dipicu saat pengguna secara sadar menekan tombol "Mulai Pindai Label"** pada modul pemindai.
  - Dilarang keras meminta izin akses kamera pada halaman pendaftaran (*onboarding*) atau saat aplikasi pertama kali dibuka.
* **Pengaturan Konfigurasi Video:**
  - Mengutamakan kamera belakang ponsel (`facingMode: 'environment'`).
  - Mengatur resolusi optimal pemindaian teks: `width: { ideal: 1920 }, height: { ideal: 1080 }`.

---

## 46. Alur Perizinan Akses Kamera yang Ramah (Friendly Camera Permission Flow)

Alur perizinan kamera (*Camera Permission Flow*) wajib didahului oleh panduan antarmuka yang transparan:

```text
[Dialog Persiapan Izin Kamera]
📷 PRONOIA Memerlukan Akses Kamera Anda
Akses kamera digunakan secara eksklusif untuk memotret tabel informasi nilai gizi pada kemasan makanan yang ingin Anda evaluasi. PRONOIA tidak pernah merekam video latar belakang atau mengakses galeri tanpa persetujuan Anda.

[Izinkan Kamera Sekarang]   [Nanti Saja]
```

Transparansi ini memberikan ketenangan psikologis bagi anggota dan meningkatkan kepercayaan terhadap komitmen privasi platform.

---

## 47. Penanganan Kegagalan & Penolakan Izin Kamera (Camera Failure & Permission Denial Recovery)

Jika akses kamera ditolak pengguna atau perangkat tidak memiliki sensor kamera, aplikasi wajib menyediakan jalur alternatif (*Graceful Degradation*):

```text
Kamera Tidak Tersedia / Izin Ditolak
               │
               ├──> 1. Sediakan Tombol: "Pilih Foto dari Galeri Berkas"
               │       └── Menggunakan <input type="file" accept="image/*">
               │
               └──> 2. Sediakan Tombol: "Ketik Manual Komposisi Nutrisi"
                       └── Membuka form entri kalori, gula, dan takaran saji
```

Kegagalan akses kamera peramban tidak boleh menghentikan anggota dalam mencatat asupan nutrisi mereka.

---

## 48. Integrasi Layanan Lokasi Geografis (Geolocation Service Integration)

Integrasi layanan geolokasi (*Geolocation API*) pada PWA PRONOIA tunduk pada batasan etika ketat:

- **Penggunaan Tunggal yang Sah:** Hanya diaktifkan saat terjadi **Eskalasi Kedaruratan Medis (*Emergency Escalation*)** untuk menampilkan daftar rumah sakit, klinik IGD, dan puskesmas rujukan terdekat.
- **Larangan Pelacakan Latar Belakang:** Dilarang keras melacak atau merekam koordinat lokasi pengguna secara terus-menerus di latar belakang (*no background location tracking*).
- **Penolakan Persistensi Koordinat:** Koordinat lintang dan bujur (*latitude/longitude*) hanya diproses sementara di memori peramban dan tidak disimpan di basis data profil pengguna.

---

## 49. Etika & Batasan Izin Lokasi Pengguna (User Location Permission Ethics)

Permintaan izin lokasi wajib menjelaskan secara eksplisit apa yang diproses dan apa yang tidak diproses:

```text
[Dialog Izin Lokasi Kedaruratan]
📍 Cari Fasilitas Gawat Darurat Terdekat?
PRONOIA memerlukan perkiraan lokasi Anda untuk menemukan rute tercepat ke Instalasi Gawat Darurat (IGD) rumah sakit terdekat. Lokasi Anda tidak akan disimpan di profil atau dibagikan ke pihak ketiga.

[Bagikan Lokasi Sekali Ini Saja]   [Pilih Kota Manual]
```

Menghormati hak privasi lokasi anggota sesuai ketentuan Undang-Undang Perlindungan Data Pribadi (UU PDP).

---

## 50. Layanan Lokasi Kedaruratan Medis (Emergency Location Routing Services)

Alur lokasi darurat (*Emergency Location Routing Workflow*) dirancang beroperasi instan tanpa jeda verifikasi:

```text
Pencatatan Kondisi Krisis Fisiologis (Glukosa < 50 mg/dL atau Sistolik > 200 mmHg)
                           │
                           ▼
[Tampilkan Kartu Peringatan Darurat Layar Penuh]
                           │
                           ├──> Tombol Hubungi Ambulans Nasional (Panggilan 119)
                           │
                           └──> Tombol Navigasi IGD Terdekat (Google Maps / Waze Link)
```

Tautan navigasi eksternal dibuka langsung melalui format URI aman `geo:latitude,longitude?q=hospital` atau skema peta bawaan ponsel.

---

## 51. Sinkronisasi Latar Belakang Berkala (Background Sync & Periodic Sync)

Fitur *Background Sync API* peramban hanya diizinkan untuk tugas ringan non-kritis:

* **Tugas yang Diizinkan:**
  - Sinkronisasi antrean draf pencatatan metrik harian saat koneksi internet tersambung kembali di latar belakang.
  - Pengiriman telemetri laporan cacat (*crash reports*) yang tertunda.
* **Tugas yang Dilarang:**
  - Dilarang menjalankan kalkulasi biometrik berat atau analisis pola tidur kompleks di *Background Sync*.
  - Dilarang mengeksekusi transaksi pembayaran atau pemesanan konsultasi tanpa kehadiran aktif pengguna.

---

## 52. Manajemen Beban Tugas Latar Belakang (Background Task Resource Management)

Tanggung jawab komputasi analitik kesehatan tetap berada di tangan peladen backend (*Backend Authority Rule*):

> [!IMPORTANT]
> *Service Worker* peramban bukan mesin pemrosesan kesehatan (*not a health-processing engine*).

Batasan Pemrosesan Klien:
- Service Worker bertugas sebagai perantara jaringan dan penyimpan berkas statis, bukan tempat mengeksekusi model kecerdasan buatan lokal berukuran ratusan megabita yang menghabiskan baterai pengguna.
- Seluruh kalkulasi baseline, deteksi sinyal anomali, dan skoring perilaku dieksekusi secara terpusat di backend Laravel dengan isolasi transaksi yang teruji.

---

## 53. Integrasi Klien PWA dengan Asisten AI (PWA & AI Assistant Integration)

Integrasi percakapan asisten cerdas AI pada klien PWA mewajibkan koneksi jaringan aktif:

- **Kejujuran Status Koneksi:** Antarmuka dilarang berpura-pura bahwa percakapan AI dapat melayani inferensi cerdas saat luring.
- **Tampilan Ramah Mode Luring:**
  ```text
  [Layar Chat AI Saat Luring]
  🌐 Asisten Cerdas PRONOIA Membutuhkan Koneksi Internet
  Untuk memberikan penjelasan kesehatan berbasis data terkini, asisten AI memerlukan sambungan internet.
  (Riwayat percakapan sebelumnya tetap dapat Anda baca).
  ```

Pesan yang diketik pengguna saat luring dapat disimpan sebagai draf lokal dan dikirimkan otomatis setelah koneksi pulih.

---

## 54. Integrasi Klien PWA dengan Pemindai Nutrisi (PWA & Nutrition Scanner Integration)

Fitur pemindai nutrisi yang mengandalkan analisis visi komputer peladen (*Cloud Vision OCR*) mengomunikasikan ketergantungan jaringan secara jelas:

* **Saat Mode Luring:**
  - Anggota tetap dapat memotret kemasan makanan menggunakan kamera peramban.
  - Foto dikompresi dan disimpan sementara di penyimpanan lokal aman dengan status `"MENUNGGU_ANALISIS_DARING"`.
  - Ketika jaringan internet kembali tersambung, antarmuka menawarkan: *"Foto label siap dianalisis. [Kirim untuk Dianalisis Sekarang]"*.

---

## 55. Integrasi Klien PWA dengan Jadwal Konsultasi (PWA & Consultation Workflow Integration)

Pemesanan sesi konsultasi instruktur (*Consultation Booking*) mewajibkan verifikasi status peladen secara *real-time*:

- Dilarang menampilkan konfirmasi pemesanan sukses jika transaksi belum diverifikasi oleh peladen backend.
- Jika pengguna mencoba memesan saat luring, sistem menolak dengan pesan informatif: *"Pemesanan jadwal konsultasi memerlukan koneksi internet aktif untuk mencegah benturan jadwal dengan anggota lain"*.
- Jadwal sesi yang telah berhasil dipesan disalin ke pengingat kalender lokal perangkat (*iCalendar / Google Calendar sync*).

---

## 56. Penyajian Linimasa Riwayat Kesehatan PWA (PWA Health Timeline Rendering)

Penyajian linimasa riwayat kesehatan (*Health Timeline Rendering*) pada PWA wajib menyertakan stempel waktu sinkronisasi terakhir:

```text
Riwayat Metrik Kesehatan
Terakhir disinkronkan: 17 Sep 2026, pukul 18:30 WIB
[Tombol: Tarik ke Bawah untuk Menyegarkan (Pull-to-Refresh)]
```

Pengguna selalu mengetahui apakah grafik tren yang sedang mereka lihat merupakan kondisi terkini dari peladen atau salinan dari pembacaan sebelumnya.

---

## 57. Visualisasi Pengukur Skor Kesiapan PWA (PWA Readiness Score Visualizer)

Visualisasi pengukur Skor Kesiapan Harian (*Readiness Score Visualizer*) di PWA tidak boleh menghitung skor baru secara sepihak dari data luring yang usang:

* **Prinsip Otoritas Skor:**
  - Skor kesiapan dihitung secara eksklusif oleh mesin deterministik di backend peladen.
  - Saat luring, PWA menampilkan skor resmi terakhir yang tercatat di peladen dengan label status: *"Skor Terakhir Tercatat (17 Sep)"*.
  - Menghindari kebingungan pengguna jika kalkulasi lokal menghasilkan angka yang berbeda dengan kalkulasi resmi peladen.

---

## 58. Penyajian Peringatan Sinyal Perilaku PWA (PWA Behavioral Signal Display)

Peringatan sinyal perilaku (*Behavioral Signal Displays*) disajikan di antarmuka PWA sebagai kartu wawasan berbasis bukti:

- Sinyal perilaku yang berstatus `ACTIVE` ditampilkan di bagian atas dasbor dengan kode warna semantik (Hijau: Positif, Kuning: Peringatan, Merah: Perhatian Khusus).
- Setiap kartu sinyal menyediakan tombol aksi cepat (*Quick Action Button*) yang terhubung langsung ke modul intervensi mikro terkait.

---

## 59. Kaidah Keamanan Komprehensif Klien PWA (Comprehensive PWA Client Security Rules)

Klien PWA memperlakukan lingkungan peramban sebagai **lingkungan eksekusi yang tidak dipercaya (*Zero-Trust Client Perimeter*)**:

> [!CAUTION]
> Dilarang mengasumsikan bahwa kode JavaScript atau Service Worker di peramban pengguna kebal dari manipulasi alat pengembang (*DevTools*).

Prinsip Keamanan Klien:
- Seluruh keputusan otorisasi hak akses ditegakkan ulang di backend.
- Seluruh masukan dari peramban divalidasi dan disanitasi sebelum diproses.
- Token otentikasi sesi dilindungi dari pembacaan skrip berbahaya melalui kebijakan keamanan konten (*Content Security Policy* / CSP) yang ketat.

---

## 60. Pencegahan Keracunan Cache Web (Cache Poisoning Attack Awareness)

Klien PWA wajib mewaspadai dan memitigasi risiko serangan keracunan cache web (*Cache Poisoning Awareness*):

1. **Validasi Asal Respons:** Service Worker dilarang keras menyimpan respons cache dari domain luar yang tidak terdaftar dalam daftar putih aplikasi.
2. **Pemeriksaan Header Status:** Hanya respons HTTP dengan kode status `200 OK` yang diizinkan masuk ke *CacheStorage*. Respons galat (4xx, 5xx, atau respons opaque 0) dilarang disimpan ke cache statis.
3. **Pemberian Subresource Integrity (SRI):** Pemuatan berkas JavaScript eksternal wajib menyertakan atribut hash kriptografi `integrity="sha384-..."`.

---

## 61. Pembersihan Cache Data Sensitif Saat Selesai (Sensitive Cache Purging on Session End)

Ketika pengguna keluar sistem (*logout*), menutup akun, atau berganti perangkat, klien PWA wajib mengeksekusi **Protokol Pembersihan Cache Sensitif (*Sensitive Cache Purging*)**:

```javascript
// Pembersihan Menyeluruh Seluruh Jejak Data Pengguna Sisi Klien
async function purgeSensitiveClientData() {
    // 1. Kosongkan antrean draf luring di IndexedDB
    await clearUserIndexedDb();

    // 2. Hapus data sesi di sessionStorage
    sessionStorage.clear();

    // 3. Bersihkan preferensi akun spesifik di localStorage
    localStorage.removeItem('pronoia_active_user_id');
    localStorage.removeItem('pronoia_user_display_name');

    // 4. Kirim sinyal ke Service Worker untuk membuang cache dinamis pengguna
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'PURGE_USER_CACHES' });
    }
}
```

---

## 62. Perilaku Pembersihan Saat Keluar Sistem (Secure Logout Cleanup Behavior)

Perilaku keluar sistem (*Secure Logout Behavior*) memadukan koordinasi antara status peladen dan status lokal:

```text
Pengguna Menekan Tombol "Keluar dari Akun"
                   │
                   ▼
[1. Panggil Endpoint Backend: POST /api/v1/auth/logout (Cabut Token Sanctum)]
                   │
                   ▼
[2. Eksekusi Fungsi Pembersihan Lokal: purgeSensitiveClientData()]
                   │
                   ▼
[3. Batalkan Langganan Web Push (pushSubscription.unsubscribe())]
                   │
                   ▼
[4. Alihkan Pengguna ke Layar Masuk Bersih (/login) dengan Riwayat Bersih]
```

Langkah ini menjamin tidak ada riwayat data medis yang tertinggal pada peramban setelah sesi diakhiri.

---

## 63. Perlindungan Privasi Pergantian Akun (Multi-Account Switching Privacy Shield)

Jika beberapa pengguna berbagi peramban yang sama (*Account Switching Shield*):

- Aplikasi mengisolasi repositori IndexedDB berdasarkan pengenal unik pengguna (`pronoia_db_user_{id}`).
- Saat pengguna B masuk, aplikasi sama sekali tidak membuka atau membaca basis data milik pengguna A.
- Jika pengguna memilih opsi *"Hapus jejak di perangkat ini"*, seluruh pangkalan data lokal akun bersangkutan dihapus permanen dari memori peramban.

---

## 64. Pengelolaan Kuota Penyimpanan Peramban (Browser Storage Quota Management)

Pengelolaan kuota penyimpanan peramban (*Storage Quota Management*) memantau penggunaan memori secara berkala:

```javascript
if ('storage' in navigator && 'estimate' in navigator.storage) {
    const { usage, quota } = await navigator.storage.estimate();
    const percentUsed = Math.round((usage / quota) * 100);

    // Jika penggunaan memori melebihi 80% dari kuota peramban
    if (percentUsed > 80) {
        purgeExpiredCachesAndOldImages();
    }
}
```

Mencegah aplikasi mengalami galat `QuotaExceededError` yang dapat menghentikan operasi pencatatan metrik.

---

## 65. Kompresi & Penyimpanan Citra Lokal (Local Image Compression & Storage)

Citra label makanan hasil tangkapan kamera wajib dikompresi di sisi klien sebelum disimpan atau dikirim:

* **Standar Kompresi Citra Klien:**
  - Format keluaran: WebP atau JPEG dengan kualitas 80%.
  - Dimensi maksimal: Panjang sisi terpanjang dibatasi **1600 piksel**.
  - Ukuran berkas hasil kompresi biasanya turun dari 8 MB menjadi < 500 KB tanpa mengurangi keterbacaan teks gizi.
* **Kebijakan Penghapusan Citra Sementara:**
  - Citra pindaian yang tersimpan di memori lokal otomatis dihapus dalam waktu **24 jam** setelah analisis peladen selesai atau dibatalkan oleh pengguna.

---

## 66. Keamanan & Penyensoran Log Sisi Klien (Client-Side Log Redaction & Security)

Pencatatan log pada konsol peramban (*Client-Side Console Logging*) wajib disensor di lingkungan produksi:

```javascript
// logger.js: Pengatur Log Sisi Klien
const isProd = process.env.NODE_ENV === 'production';

export const logger = {
    info: (...args) => { if (!isProd) console.info(...args); },
    warn: (...args) => { console.warn(...args); },
    error: (err, context = {}) => {
        // Kirim laporan galat teranomisasi ke Sentry/Bugsnag tanpa mencatat PII
        reportToErrorTracker(err, sanitizeContext(context));
    }
};
```

Dilarang keras menggunakan `console.log(userMedicalRecord)` pada kode yang dikompilasi ke produksi, karena dapat diintip melalui DevTools oleh siapa pun yang mengakses perangkat.

---

## 67. Manajemen Permintaan Jaringan Terkontrol (Controlled Network Request Management)

Seluruh lalu lintas komunikasi jaringan antara klien PWA dan backend wajib disalurkan melalui saluran terenkripsi berkeamanan tinggi:

- **Protokol Standar:** HTTP/2 atau HTTP/3 melalui enkripsi TLS 1.3.
- **Larangan Transportasi Tidak Aman:** Dilarang keras mengirimkan data biometrik, pembacaan glukosa, atau masukan percakapan AI melalui protokol HTTP biasa tanpa enkripsi.
- **Header Keamanan Klien:** Setiap permintaan API menyertakan header `Accept: application/json` dan penanda versi klien `X-Client-Version`.

---

## 68. Penegakan Enkripsi Wajib HTTPS & TLS (Mandatory HTTPS & TLS Enforcement)

Konteks Aman (*Secure Context*) berbasis HTTPS merupakan prasyarat mutlak bagi instalasi dan operasional PWA:

> [!IMPORTANT]
> Fitur modern web seperti Service Worker, CacheStorage, MediaDevices (Kamera), Geolocation, dan Web Push secara standar peramban HANYA AKTIF pada domain yang menggunakan sertifikat SSL/TLS valid.

Pengecualian satu-satunya hanya berlaku untuk pengujian lokal pada alamat `http://localhost` atau `http://127.0.0.1`. Seluruh lingkungan pengujian staging dan produksi wajib mengaktifkan sertifikat TLS yang diperbarui otomatis.

---

## 69. Pencegahan Konten Campuran Tidak Aman (Mixed Content Security Prevention)

Klien PWA dilarang keras memuat konten campuran tidak aman (*Mixed Content Prevention*):

* **Bahaya Konten Campuran:** Jika halaman HTTPS memuat berkas gambar, font, atau skrip dari URL `http://`, peramban akan memblokir aset tersebut seketika atau menurunkan status gembok keamanan halaman.
* **Penegakan Kebijakan Keamanan:** Menambahkan tag meta pada dokumen HTML utama:
  ```html
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
  ```
* Seluruh URL aset eksternal dan endpoint API wajib diawali dengan skema `https://`.

---

## 70. Optimalisasi Metrik Performa Web PWA (PWA Web Performance Metric Optimization)

Klien PWA dioptimalkan secara agresif untuk mencapai skor **Core Web Vitals** hijau (*Google Good Thresholds*):

| Metrik Kinerja Web | Target Ambang Batas | Strategi Pencapaian |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | **< 1.8 detik** | Pra-cache gambar banner dan pemuatan font woff2 modern via preload. |
| **Interaction to Next Paint (INP)** | **< 100 ms** | Menghindari komputasi JavaScript berat yang memblokir alur kerja utama (*main thread*). |
| **Cumulative Layout Shift (CLS)** | **< 0.05** | Menetapkan atribut lebar dan tinggi eksplisit pada seluruh gambar dan kerangka skeleton. |
| **First Input Delay (FID)** | **< 50 ms** | Pemisahan bundle kode dan pemuatan skrip asinkron (*defer / module*). |

---

## 71. Pemuatan Malas Modul & Gambar (Lazy Loading of Modules & Images)

Klien PWA menerapkan strategi pemuatan malas (*Lazy Loading*) pada seluruh modul dan aset yang berada di luar viewport awal:

- **Komponen Berat & Pustaka Grafik:** Pustaka visualisasi grafik riwayat (Chart.js) hanya diunduh saat pengguna berpindah ke tab Riwayat.
- **Pemuatan Gambar Malas:** Menggunakan atribut bawaan peramban: `<img src="..." loading="lazy" decoding="async">`.
- **Modul Kamera Pemindai:** Kode pengontrol kamera dan pemrosesan kanvas hanya diimpor saat pengguna membuka modal pemindai (`import('./scanner.js')`).

Pendekatan ini memangkas ukuran bundle awal aplikasi hingga 60%, memastikan pemuatan awal berjalan seketika pada koneksi 3G.

---

## 72. Optimalisasi Performa Pemrosesan Citra (Scanner Image Processing Optimization)

Alur penangkapan citra pada modul pemindai nutrisi dioptimalkan agar tidak membebani komputasi ponsel:

```javascript
// Pra-pemrosesan Citra Cepat di Sisi Klien Sebelum Pengunggahan
async function prepareImageForUpload(file) {
    // 1. Periksa ukuran berkas awal
    if (file.size > 10 * 1024 * 1024) {
        throw new Error('Ukuran berkas asli melebihi batas 10 MB.');
    }

    // 2. Gambar ke kanvas virtual dan kompresi ke resolusi optimal OCR
    const compressedBlob = await resizeAndCompressToWebp(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.82
    });

    return compressedBlob;
}
```

Pemotongan dimensi dan kompresi kanvas memangkas waktu pengunggahan dari 15 detik menjadi kurang dari 1.5 detik pada jaringan seluler.

---

## 73. Aksesibilitas & Inklusivitas Klien PWA (PWA Accessibility & Inclusivity Standards)

Klien PWA dirancang inklusif dan mematuhi pedoman aksesibilitas **WCAG 2.1 Level AA**:

* **Indikator Non-Visual Status Jaringan:** Perubahan status online/offline diumumkan kepada pengguna tunanetra menggunakan elemen pembaca layar ARIA:
  ```html
  <div role="status" aria-live="polite" class="sr-only">
      Anda saat ini sedang terhubung dalam mode luring.
  </div>
  ```
* **Target Sentuh Ergonomis:** Seluruh tombol aksi, tab navigasi bawah, dan kartu intervensi memiliki area sentuh minimal **48 x 48 piksel**.
* **Dukungan Skala Teks Peramban:** Tata letak antarmuka dirancang fleksibel menggunakan satuan relatif (`rem` / `em`) sehingga tetap proporsional saat pengguna memperbesar ukuran font sistem hingga 200%.

---

## 74. Pemulihan Otomatis Galat Antarmuka (Client-Side Error Recovery & Boundaries)

Jika terjadi kegagalan fatal pada Service Worker atau kerusakan penyimpanan cache lokal, aplikasi menyediakan **Jalur Pemulihan Mandiri (*Self-Healing Recovery Path*)**:

```javascript
// Mekanisme Pemulihan Mandiri Antarmuka
window.addEventListener('error', (event) => {
    if (isCriticalChunkLoadError(event)) {
        showRecoveryDialog({
            title: 'Pembaruan Antarmuka Diperlukan',
            message: 'Terjadi inkonsistensi berkas cache peramban. Sentuh tombol di bawah untuk menyegarkan aplikasi.',
            actionLabel: 'Segarkan Aplikasi',
            onAction: async () => {
                await unregisterServiceWorkers();
                await clearStaticCaches();
                window.location.reload(true);
            }
        });
    }
});
```

Mencegah pengguna terjebak selamanya pada layar putih (*blank screen of death*) akibat *cache corruption*.

---

## 75. Invalidasi Cache Dinamis Terkelola (Managed Dynamic Cache Invalidation)

Setiap strategi penyimpanan cache wajib memiliki jawaban tegas terhadap tiga pertanyaan siklus hidup:

```text
SIKLUS HIDUP STRATEGI CACHE:
├── 1. Kapan data ini dianggap usang? (Masa Berlaku / TTL Eksplisit)
├── 2. Bagaimana cara data diperbarui? (Background Revalidation / Event Bus)
└── 3. Kapan data wajib dimusnahkan? (Invalidasi Mutasi / Logout Action)
```

Dilarang keras menyimpan data dinamis ke dalam cache tanpa menentukan mekanisme penghapusan atau pembaruan otomatisnya.

---

## 76. Larangan Strategi Cache-First Buta (No Blind Cache-First Strategy on Dynamic Data)

Dilarang keras menerapkan strategi **Cache-First Buta (*No Blind Cache-First Strategy*)** pada data dinamis yang rentan terhadap perubahan berkala:

> [!CAUTION]
> Menerapkan Cache-First pada rute `/api/v1/health/metrics` atau `/api/v1/dashboard/summary` adalah kesalahan arsitektur fatal. Pengguna dapat terus disajikan data kemarin meskipun kadar gula darah mereka telah berubah secara signifikan.

Aturan Baku:
- Strategi **Cache-First** HANYA diizinkan untuk aset statis berkode hash (*immutable static assets*).
- Seluruh data kesehatan dan status intervensi wajib menggunakan strategi **Network-First** (mengutamakan data segar dari peladen) dengan toleransi pembacaan data tersimpan hanya saat koneksi jaringan terputus total.

---

## 77. Penerapan Strategi Jaringan Sesuai Konteks (Context-Aware Network Strategies)

Penerapan strategi jaringan (*Workbox / Service Worker Network Strategies*) dipetakan secara presisi berdasarkan sifat sumber daya:

```javascript
// 1. Aset Statis App Shell (CSS, JS, Fonts) -> Cache-First
registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'font',
    new CacheFirst({ cacheName: STATIC_CACHE_NAME })
);

// 2. Gambar Sampul Artikel Edukasi -> Stale-While-Revalidate
registerRoute(
    ({ url }) => url.pathname.startsWith('/storage/education/'),
    new StaleWhileRevalidate({ cacheName: 'pronoia-education-images' })
);

// 3. Titik Akhir Metrik Kesehatan & Profil -> Network-First dengan Timeout 3 Detik
registerRoute(
    ({ url }) => url.pathname.startsWith('/api/v1/'),
    new NetworkFirst({
        cacheName: 'pronoia-dynamic-api-cache',
        networkTimeoutSeconds: 3
    })
);
```

---

## 78. Keamanan Siklus Pembaruan Service Worker (Safe Service Worker Update Workflow)

Siklus pembaruan Service Worker (*Service Worker Update Safety*) dilarang memicu pemuatan ulang halaman secara paksa di tengah-tengah alur kerja aktif pengguna:

* **Pencegahan Gangguan Alur Aktif:**
  - Jika pengguna sedang mengisi formulir pencatatan gula darah atau sedang dalam sesi percakapan dengan AI, pembaruan Service Worker ditahan pada status *waiting*.
  - Pembaruan aset hanya dieksekusi saat pengguna menekan konfirmasi pada snackbar pembaruan atau saat aplikasi berpindah rute secara alami.

---

## 79. Standar Pengujian Menyeluruh Klien PWA (Comprehensive PWA Testing Standards)

Pengujian kualitas PWA (*Comprehensive PWA Testing Standards*) wajib memvalidasi empat pilar kesiapan aplikasi:

1. **Uji Validitas Web App Manifest:** Memverifikasi dokumen manifest melalui audit otomatis Google Lighthouse dengan skor PWA minimal **95%**.
2. **Uji Daur Hidup Service Worker:** Memvalidasi siklus *install*, *activate*, dan *fetch interception* berjalan tanpa melempar eksepsi JavaScript yang tidak tertangani.
3. **Uji Keterpasangan (*Installability Verification*):** Memverifikasi pemicuan event `beforeinstallprompt` pada peramban yang mendukung.
4. **Uji Shell Luring:** Memastikan App Shell dapat dimuat sempurna saat jaringan diputus total.

---

## 80. Pengujian Simulasi Kondisi Luring Klien (PWA Offline Simulation Testing)

Pengujian simulasi kondisi luring (*PWA Offline Simulation Testing*) menggunakan Playwright memverifikasi alur pencatatan data tanpa jaringan:

```typescript
// tests/e2e/offline-sync.spec.ts
import { test, expect } from '@playwright/test';

test('klien PWA dapat mencatat glukosa saat luring dan menyinkronkannya saat daring', async ({ context, page }) => {
    await page.goto('/dashboard');

    // 1. Simulasikan pemutusan jaringan
    await context.setOffline(true);

    // 2. Catat metrik glukosa
    await page.click('#btn-log-metric');
    await page.fill('#metric-value', '118');
    await page.click('#btn-save-metric');

    // 3. Verifikasi lencana status draf lokal muncul
    await expect(page.locator('#sync-status-badge')).toHaveText('Tersimpan Lokal');

    // 4. Pulihkan kembali jaringan internet
    await context.setOffline(false);

    // 5. Verifikasi sinkronisasi otomatis berjalan dan status berubah menjadi tersinkronkan
    await expect(page.locator('#sync-status-badge')).toHaveText('Tersinkronkan', { timeout: 5000 });
});
```

---

## 81. Pengujian Keamanan Penyimpanan Klien PWA (PWA Client Storage Security Testing)

Pengujian keamanan penyimpanan klien (*PWA Client Storage Security Tests*) memvalidasi bahwa tidak ada residu data rahasia yang tertinggal:

```typescript
test('keluar dari akun membersihkan seluruh data pribadi dari IndexedDB dan localStorage', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('#btn-logout');

    // Pastikan berada di halaman masuk
    await expect(page).toHaveURL('/login');

    // Periksa bahwa localStorage tidak memuat ID pengguna atau token
    const userId = await page.evaluate(() => localStorage.getItem('pronoia_active_user_id'));
    expect(userId).toBeNull();

    // Periksa bahwa pangkalan data lokal telah dikosongkan
    const draftCount = await page.evaluate(async () => {
        return await countDraftsInIndexedDb();
    });
    expect(draftCount).toBe(0);
});
```

---

## 82. Pengujian Pagar Pembatas Medis pada PWA (PWA Health Safety Boundary Testing)

Pengujian pagar pembatas medis pada antarmuka PWA (*PWA Health Safety Boundary Tests*) memverifikasi bahwa mode luring tidak dapat disalahgunakan untuk menghasilkan kesimpulan medis palsu:

- **Larangan Diagnostik Mandiri Luring:** PWA dilarang memiliki skrip lokal yang mengeluarkan vonis diagnosis medis penyakit saat tidak tersambung ke peladen.
- **Peringatan Batas Data Usang:** Jika pengguna melihat grafik tren saat luring, sistem secara mencolok menampilkan pemberitahuan bahwa rekomendasi berbasis data lama dan tidak boleh dijadikan acuan tunggal tindakan medis darurat.

---

## 83. Pengujian Transisi Pembaruan Versi PWA (PWA Update Transition Testing)

Pengujian transisi pembaruan versi PWA (*PWA Update Transition Tests*) memvalidasi migrasi aset dari versi lama ke versi baru:

```text
Skenario Pengujian Pembaruan:
1. Pasang PWA Versi 1.0 (Cache: pronoia-shell-v1.0 aktif)
2. Deploy Versi 2.0 ke Peladen Uji
3. Buka Kembali PWA -> Verifikasi Banner "Versi Baru Tersedia" Muncul
4. Pengguna Menekan "Perbarui Sekarang"
5. Verifikasi Cache v1.0 Terhapus dari CacheStorage
6. Verifikasi Cache v2.0 Aktif dan Halaman Memuat Aset Terbaru
```

---

## 84. Pengujian Kompatibilitas Versi Klien dan API (PWA Client & Backend API Compatibility Testing)

Pengujian kompatibilitas versi klien dan backend API (*PWA & Backend API Compatibility Tests*) memverifikasi toleransi terhadap klien yang belum sempat memperbarui aset *cache*:

- **Evolusi API Kompatibel Mundur:** Menjamin penambahan bidang data baru pada backend tidak menyebabkan *JSON parsing error* pada komponen PWA yang masih menjalankan kode kemarin.
- **Deteksi Header Usang:** Menguji bahwa backend mampu merespons dengan header instruksi pembaruan jika versi klien telah mencapai status usang (*deprecated client version*).

---

## 85. Daftar Periksa Kesiapan Rilis Produksi PWA (PWA Production Release Readiness Checklist)

Sebelum suatu versi klien PWA dirilis ke lingkungan produksi (*Production Release*), seluruh daftar periksa kesiapan wajib terverifikasi secara tuntas:

```text
DAFTAR PERIKSA KESIAPAN RILIS PRODUKSI PWA PRONOIA:
[ ] Dokumen Web App Manifest valid & terindeks pada <head> HTML
[ ] Ikon aplikasi lengkap (192x192, 512x512, dan Maskable 512x512)
[ ] Service Worker terdaftar sukses pada cakupan rute akar ('/')
[ ] Enkripsi HTTPS & TLS 1.3 aktif di seluruh domain
[ ] App Shell memuat instan (< 1 detik) saat mode luring
[ ] Indikator status konektivitas jaringan (Online/Offline) berfungsi akurat
[ ] Respons API data kesehatan sensitif TIDAK DISIMPAN di CacheStorage statis
[ ] Fungsi Keluar Sistem (Logout) membersihkan seluruh cache & IndexedDB lokal
[ ] Alur ajakan instalasi (Install Prompt) tidak mengganggu alur pengguna awal
[ ] Dialog persetujuan notifikasi dorong didahului oleh kartu penjelasan etis
[ ] Izin akses kamera dan geolokasi hanya diminta saat masuk alur fitur terkait
[ ] Jalur alternatif kegagalan kamera (unggah galeri / ketik manual) berfungsi
[ ] Perilaku asisten AI dan pemindai terdefinisi dengan jelas saat mode luring
[ ] Pemesanan konsultasi instruktur tidak dapat dikonfirmasi secara sepihak saat luring
```

---

## 86. Topologi Arsitektur Utuh Ekosistem PWA (Comprehensive PWA Ecosystem Architecture)

Platform PRONOIA menerapkan topologi arsitektur utuh ekosistem PWA yang menyeimbangkan keandalan klien dengan kedaulatan otoritas backend:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 TOPOLOGI UTUH EKOSISTEM PWA PLATFORM PRONOIA                │
└─────────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
                     [PERANGKAT KLIEN ANGGOTA]
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [Aplikasi Web Standar]         [PWA Terpasang (Standalone)]
                 │                               │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                       [SHELL APLIKASI PWA]
                     (UI Framework & Komponen)
                                 │
                                 ▼
                     [SERVICE WORKER PRONOIA]
                                 │
       ┌─────────────────────────┴─────────────────────────┐
       ▼                                                   ▼
[ASET STATIS (Cache-First)]              [PERMINTAAN DATA API (Network-First)]
       │                                                   │
  CacheStorage                                             ▼
                                                 [JARINGAN AMAN HTTPS]
                                                           │
                                                           ▼
                                               [BACKEND API LARAVEL]
                                                           │
                                 ┌─────────────────────────┴─────────────────────────┐
                                 ▼                                                   ▼
                     [LOGIKA DOMAIN & ATURAN]                            [LAYANAN EKSTERNAL]
                       - Validasi Masukan                                  - Model LLM (AI)
                       - Otorisasi Kebijakan                               - Visi OCR Pemindai
                       - Persistensi Basis Data                            - Gerbang Web Push
```

Alur kedaulatan data sistem tetap berakar pada otoritas peladen (*Server-Authoritative Authority*): Klien menyajikan antarmuka yang cepat dan tangguh, sementara backend menegakkan kebenaran medis dan keamanan data.

---

## 87. Prinsip Pamungkas Kedaulatan Klien PWA (Final Sovereign PWA Principle)

Sebagai doktrin puncak rekayasa Aplikasi Web Progresif (PWA) platform PRONOIA:

Aplikasi PWA dirancang untuk menjadikan PRONOIA:
> **Lebih Cepat (*Faster*), Lebih Mudah Diakses (*More Accessible*), Mudah Dipasang (*More Installable*), dan Lebih Tangguh (*More Resilient*).**

Aplikasi PWA **SAMA SEKALI TIDAK BOLEH** menjadikan PRONOIA:
- Kurang aman dari serangan siber (*less secure*),
- Kurang terlindungi privasinya (*less private*),
- Kurang akurat secara matematis dan klinis (*less accurate*),
- Berisiko membocorkan data kesehatan sensitif kepada pengguna lain,
- Bergantung pada data usang yang menyesatkan pengguna.

Prinsip panduan mutlak rekayasa PWA:

> **"Luring di mana itu aman. Daring di mana otoritas dibutuhkan. Privat secara baku. Peladen memegang kedaulatan mutlak untuk seluruh keputusan sensitif."**
> *(Offline where safe. Online where authoritative. Private by default. Server-authoritative for sensitive decisions.)*

---
