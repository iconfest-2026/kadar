@extends('errors.layout')

@section('title', '429 Batas Permintaan Tercapai')

@section('content')
    <!-- Top Status Strip -->
    <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#e6eee9]">
        <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-amber-100 text-amber-800">
                <span class="material-symbols-outlined text-[22px]">speed</span>
            </div>
            <div>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border bg-amber-50 text-amber-800 border-amber-200">
                    KODE 429 • BATAS LAJU AKSES TERCAPAI
                </span>
                <span class="text-[11px] text-[#63746f] block mt-0.5">
                    Rate Limit Throttling Aktif
                </span>
            </div>
        </div>

        <span class="font-mono text-2xl sm:text-3xl font-bold text-[#1c6454]/40 tracking-wider">
            HTTP 429
        </span>
    </div>

    <!-- Editorial Headline & Explanation -->
    <div class="space-y-2.5">
        <h1 class="font-serif text-2xl sm:text-3xl font-normal text-[#142320] leading-snug">
            Laju Permintaan Melebihi Batas Kecepatan
        </h1>
        <p class="text-xs sm:text-sm text-[#4d605a] leading-relaxed">
            Sistem mendeteksi frekuensi pengiriman data atau pemindaian OCR yang terlalu padat dalam interval singkat. Pembatasan ini diterapkan untuk menjaga ketersediaan server bagi seluruh pengguna.
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
                <span class="leading-relaxed">Tunggu 30–60 detik sebelum mengirimkan permintaan analisis kamera atau formulir berikutnya.</span>
            </li>
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Hindari menekan tombol submit secara bertubi-tubi.</span>
            </li>
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Sistem akan otomatis membuka pembatasan setelah interval pendinginan selesai.</span>
            </li>
        </ul>
    </div>

    <!-- Diagnostic Trace Info -->
    <div class="p-3 rounded-xl bg-[#f3f7f5] border border-[#e6eee9] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#61736d] font-mono">
        <span>Trace ID: <strong class="text-[#142320]">AEV-429-{{ rand(100000, 999999) }}</strong></span>
        <span>Waktu: {{ now()->timezone('Asia/Jakarta')->format('H:i:s') }} WIB</span>
        <span>Enkripsi: AES-256 Valid</span>
    </div>

    <!-- Action Button Row -->
    <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
            type="button"
            onclick="window.location.reload()"
            class="min-h-11 px-5 py-2.5 rounded-full bg-[#1c6454] text-white text-xs font-medium hover:bg-[#144c40] transition-all active:scale-95 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
            <span class="material-symbols-outlined text-[17px]">update</span>
            <span>Coba Lagi Nanti</span>
        </button>
        <a
            href="/"
            class="min-h-11 px-4 py-2.5 rounded-full bg-white text-[#31433f] text-xs font-medium hover:bg-[#f4faf6] transition-all active:scale-95 border border-[#dce6e1] flex items-center justify-center gap-1.5"
        >
            <span class="material-symbols-outlined text-[17px]">home</span>
            <span>Kembali ke Beranda</span>
        </a>
    </div>
@endsection

