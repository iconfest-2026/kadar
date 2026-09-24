@extends('errors.layout')

@section('title', '403 Akses Direstriksi')

@section('content')
    <!-- Top Status Strip -->
    <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#e6eee9]">
        <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-rose-100 text-rose-700">
                <span class="material-symbols-outlined text-[22px]">lock</span>
            </div>
            <div>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border bg-rose-50 text-rose-700 border-rose-200">
                    AKSES DIRESTRIKSI • OTORISASI DIPERLUKAN
                </span>
                <span class="text-[11px] text-[#63746f] block mt-0.5">
                    Otorisasi Khusus Diperlukan
                </span>
            </div>
        </div>

        <span class="font-mono text-2xl sm:text-3xl font-bold text-[#1c6454]/40 tracking-wider">
            HTTP 403
        </span>
    </div>

    <!-- Editorial Headline & Explanation -->
    <div class="space-y-2.5">
        <h1 class="font-serif text-2xl sm:text-3xl font-normal text-[#142320] leading-snug">
            Akses Dibatasi oleh Protokol Keamanan Medis
        </h1>
        <p class="text-xs sm:text-sm text-[#4d605a] leading-relaxed">
            Anda tidak memiliki hak otorisasi untuk mengakses area data klinis atau konsol tata kelola ini. Area ini dilindungi oleh regulasi privasi rekam medis digital UU PDP No. 27/2022 dan hanya dapat diakses oleh peran tertentu (Admin / Dokter Terverifikasi).
        </p>
    </div>

    <!-- Clinical Recommendations & Action Guidance -->
    <div class="p-4 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] space-y-2.5">
        <span class="text-[11px] font-bold text-[#1c6454] uppercase tracking-wider flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">info</span>
            Langkah Panduan Penanganan:
        </span>
        <ul class="space-y-2 text-xs text-[#445652]">
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Pastikan Anda telah masuk dengan akun yang memiliki hak akses yang sesuai (Role Admin / Instruktur Terverifikasi).</span>
            </li>
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Jika Anda adalah dokter binaan, pastikan nomor STR dan SIP Anda telah selesai divalidasi oleh Administrator.</span>
            </li>
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Hubungi tim administrator faskes jika Anda membutuhkan eskalasi hak istimewa operasional.</span>
            </li>
        </ul>
    </div>

    <!-- Diagnostic Trace Info -->
    <div class="p-3 rounded-xl bg-[#f3f7f5] border border-[#e6eee9] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#61736d] font-mono">
        <span>Trace ID: <strong class="text-[#142320]">AEV-403-{{ rand(100000, 999999) }}</strong></span>
        <span>Waktu: {{ now()->timezone('Asia/Jakarta')->format('H:i:s') }} WIB</span>
        <span>Enkripsi: AES-256 Valid</span>
    </div>

    <!-- Action Button Row -->
    <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <a
            href="/"
            class="min-h-11 px-5 py-2.5 rounded-full bg-[#1c6454] text-white text-xs font-medium hover:bg-[#144c40] transition-all active:scale-95 shadow-xs flex items-center justify-center gap-2"
        >
            <span class="material-symbols-outlined text-[17px]">home</span>
            <span>Kembali ke Beranda</span>
        </a>
        <a
            href="/login"
            class="min-h-11 px-4 py-2.5 rounded-full bg-white text-[#31433f] text-xs font-medium hover:bg-[#f4faf6] transition-all active:scale-95 border border-[#dce6e1] flex items-center justify-center gap-1.5"
        >
            <span class="material-symbols-outlined text-[17px]">switch_account</span>
            <span>Masuk Akun Lain</span>
        </a>
    </div>
@endsection

