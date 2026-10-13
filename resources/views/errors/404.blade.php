@extends('errors.layout')

@section('title', '404 - Halaman Tidak Ditemukan')

@section('content')
    <!-- Status Icon Badge -->
    <div class="mx-auto w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-b from-[#eaf5f0] to-[#d8ede1] border border-[#cbe3d6] flex items-center justify-center text-[#00433e] shadow-[0_4px_20px_rgba(0,67,62,0.06)] mb-5">
        <span class="material-symbols-outlined text-[32px] sm:text-[36px]">travel_explore</span>
    </div>

    <!-- Status Code Chip -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7f2] border border-[#d3e7dc] text-[11px] font-mono font-semibold text-[#00433e] tracking-wider mb-3">
        <span>KODE 404</span>
        <span class="text-[#8eab9f]">•</span>
        <span>TIDAK DITEMUKAN</span>
    </div>

    <!-- Editorial Headline -->
    <h1 class="font-serif text-2xl sm:text-3xl font-normal text-[#12221e] leading-snug tracking-tight">
        Halaman Tidak Ditemukan
    </h1>

    <!-- Empathetic & Clear Explanation -->
    <p class="text-xs sm:text-sm text-[#4d635c] leading-relaxed max-w-md mx-auto mt-2.5 mb-7">
        Tautan yang Anda tuju mungkin telah dipindahkan, diubah, atau tidak lagi terdaftar dalam indeks sistem AEVYRA.
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
        <button
            type="button"
            onclick="window.history.length > 1 ? window.history.back() : window.location.href = '/'"
            class="w-full sm:w-auto min-h-11 px-4 py-2.5 rounded-full bg-white text-[#203630] text-xs sm:text-sm font-medium hover:bg-[#f3f8f5] border border-[#d2e0d7] transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Halaman Sebelumnya</span>
        </button>
    </div>

    <!-- Subtle Trace & Primary Shortcut -->
    <div class="mt-7 pt-4 border-t border-[#ebf2ee] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6b8078] font-mono">
        <span>Ref ID: <strong class="text-[#1a2e29] font-medium">AEV-404-{{ rand(100000, 999999) }}</strong></span>
        <a href="/member/scanner" class="text-[#00433e] font-sans font-medium hover:underline inline-flex items-center gap-1">
            <span>Buka Pemindai Nutrisi</span>
            <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
        </a>
    </div>
@endsection
