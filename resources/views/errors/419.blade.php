@extends('errors.layout')

@section('title', '419 - Sesi Kedaluwarsa')

@section('content')
    <!-- Status Icon Badge -->
    <div class="mx-auto w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-b from-[#fef8ed] to-[#fcefd8] border border-[#f5dfb8] flex items-center justify-center text-[#996312] shadow-[0_4px_20px_rgba(153,99,18,0.06)] mb-5">
        <span class="material-symbols-outlined text-[32px] sm:text-[36px]">history_toggle_off</span>
    </div>

    <!-- Status Code Chip -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef8ed] border border-[#f5dfb8] text-[11px] font-mono font-semibold text-[#996312] tracking-wider mb-3">
        <span>KODE 419</span>
        <span class="text-[#c79a55]">•</span>
        <span>SESI KEDALUWARSA</span>
    </div>

    <!-- Editorial Headline -->
    <h1 class="font-serif text-2xl sm:text-3xl font-normal text-[#12221e] leading-snug tracking-tight">
        Sesi Keamanan Telah Kedaluwarsa
    </h1>

    <!-- Empathetic & Clear Explanation -->
    <p class="text-xs sm:text-sm text-[#4d635c] leading-relaxed max-w-md mx-auto mt-2.5 mb-7">
        Untuk menjaga kerahasiaan data kesehatan Anda, sistem secara otomatis mengunci formulir setelah beberapa waktu tanpa interaksi. Silakan muat ulang halaman untuk melanjutkan.
    </p>

    <!-- Clean Action Buttons -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-sm mx-auto">
        <button
            type="button"
            onclick="window.location.reload()"
            class="w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-full bg-[#00433e] text-white text-xs sm:text-sm font-medium hover:bg-[#0c5348] transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
            <span class="material-symbols-outlined text-[18px]">refresh</span>
            <span>Muat Ulang Halaman</span>
        </button>
        <a
            href="/"
            class="w-full sm:w-auto min-h-11 px-4 py-2.5 rounded-full bg-white text-[#203630] text-xs sm:text-sm font-medium hover:bg-[#f3f8f5] border border-[#d2e0d7] transition-all active:scale-98 flex items-center justify-center gap-1.5 shadow-2xs"
        >
            <span class="material-symbols-outlined text-[18px]">home</span>
            <span>Kembali ke Beranda</span>
        </a>
    </div>

    <!-- Subtle Trace & Token Refresh Note -->
    <div class="mt-7 pt-4 border-t border-[#ebf2ee] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6b8078] font-mono">
        <span>Ref ID: <strong class="text-[#1a2e29] font-medium">AEV-419-{{ rand(100000, 999999) }}</strong></span>
        <span class="text-[#728780] font-sans">Token CSRF Diperbarui</span>
    </div>
@endsection
