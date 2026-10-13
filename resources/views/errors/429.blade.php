@extends('errors.layout')

@section('title', '429 - Batas Akses Tercapai')

@section('content')
    <!-- Status Icon Badge -->
    <div class="mx-auto w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-b from-[#fef8ed] to-[#fcefd8] border border-[#f5dfb8] flex items-center justify-center text-[#996312] shadow-[0_4px_20px_rgba(153,99,18,0.06)] mb-5">
        <span class="material-symbols-outlined text-[32px] sm:text-[36px]">speed</span>
    </div>

    <!-- Status Code Chip -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef8ed] border border-[#f5dfb8] text-[11px] font-mono font-semibold text-[#996312] tracking-wider mb-3">
        <span>KODE 429</span>
        <span class="text-[#c79a55]">•</span>
        <span>BATAS LAJU TERCAPAI</span>
    </div>

    <!-- Editorial Headline -->
    <h1 class="font-serif text-2xl sm:text-3xl font-normal text-[#12221e] leading-snug tracking-tight">
        Terlalu Banyak Permintaan
    </h1>

    <!-- Empathetic & Clear Explanation -->
    <p class="text-xs sm:text-sm text-[#4d635c] leading-relaxed max-w-md mx-auto mt-2.5 mb-7">
        Sistem mendeteksi pengiriman data atau pemindaian yang terlalu sering dalam interval singkat. Mohon jeda 30–60 detik sebelum mengirimkan permintaan berikutnya.
    </p>

    <!-- Clean Action Buttons -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-sm mx-auto">
        <button
            type="button"
            onclick="window.location.reload()"
            class="w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-full bg-[#00433e] text-white text-xs sm:text-sm font-medium hover:bg-[#0c5348] transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
            <span class="material-symbols-outlined text-[18px]">update</span>
            <span>Coba Lagi Sekarang</span>
        </button>
        <a
            href="/"
            class="w-full sm:w-auto min-h-11 px-4 py-2.5 rounded-full bg-white text-[#203630] text-xs sm:text-sm font-medium hover:bg-[#f3f8f5] border border-[#d2e0d7] transition-all active:scale-98 flex items-center justify-center gap-1.5 shadow-2xs"
        >
            <span class="material-symbols-outlined text-[18px]">home</span>
            <span>Kembali ke Beranda</span>
        </a>
    </div>

    <!-- Subtle Trace & Rate Limiting Note -->
    <div class="mt-7 pt-4 border-t border-[#ebf2ee] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6b8078] font-mono">
        <span>Ref ID: <strong class="text-[#1a2e29] font-medium">AEV-429-{{ rand(100000, 999999) }}</strong></span>
        <span class="text-[#728780] font-sans">Throttle Rate Guard Aktif</span>
    </div>
@endsection
