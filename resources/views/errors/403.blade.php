@extends('errors.layout')

@section('title', '403 - Akses Dibatasi')

@section('content')
    <!-- Status Icon Badge -->
    <div class="mx-auto w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-b from-[#fdf2f1] to-[#fae2e0] border border-[#f5cbca] flex items-center justify-center text-[#992a24] shadow-[0_4px_20px_rgba(153,42,36,0.06)] mb-5">
        <span class="material-symbols-outlined text-[32px] sm:text-[36px]">lock</span>
    </div>

    <!-- Status Code Chip -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2f1] border border-[#f5cbca] text-[11px] font-mono font-semibold text-[#992a24] tracking-wider mb-3">
        <span>KODE 403</span>
        <span class="text-[#cf7a75]">•</span>
        <span>AKSES DIRESTRIKSI</span>
    </div>

    <!-- Editorial Headline -->
    <h1 class="font-serif text-2xl sm:text-3xl font-normal text-[#12221e] leading-snug tracking-tight">
        Akses Memerlukan Otorisasi
    </h1>

    <!-- Empathetic & Clear Explanation -->
    <p class="text-xs sm:text-sm text-[#4d635c] leading-relaxed max-w-md mx-auto mt-2.5 mb-7">
        Halaman atau data klinis ini dilindungi oleh protokol keamanan medis. Anda memerlukan peran otorisasi khusus atau akun terverifikasi untuk dapat mengaksesnya.
    </p>

    <!-- Clean Action Buttons -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-sm mx-auto">
        <a
            href="/"
            class="w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-full bg-[#00433e] text-white text-xs sm:text-sm font-medium hover:bg-[#0c5348] transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-xs"
        >
            <span class="material-symbols-outlined text-[18px]">home</span>
            <span>Kembali ke Beranda</span>
        </a>
        <a
            href="/login"
            class="w-full sm:w-auto min-h-11 px-4 py-2.5 rounded-full bg-white text-[#203630] text-xs sm:text-sm font-medium hover:bg-[#f3f8f5] border border-[#d2e0d7] transition-all active:scale-98 flex items-center justify-center gap-1.5 shadow-2xs"
        >
            <span class="material-symbols-outlined text-[18px]">switch_account</span>
            <span>Masuk Akun Lain</span>
        </a>
    </div>

    <!-- Subtle Trace & Regulatory Note -->
    <div class="mt-7 pt-4 border-t border-[#ebf2ee] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6b8078] font-mono">
        <span>Ref ID: <strong class="text-[#1a2e29] font-medium">AEV-403-{{ rand(100000, 999999) }}</strong></span>
        <span class="text-[#728780] font-sans">UU PDP No. 27/2022</span>
    </div>
@endsection
