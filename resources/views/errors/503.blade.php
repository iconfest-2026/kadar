@extends('errors.layout')

@section('title', '503 Pemeliharaan Sistem')

@section('content')
    <!-- Top Status Strip -->
    <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#e6eee9]">
        <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-teal-100 text-teal-800">
                <span class="material-symbols-outlined text-[22px]">construction</span>
            </div>
            <div>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border bg-teal-50 text-teal-800 border-teal-200">
                    KODE 503 • PEMELIHARAAN SISTEM BERKALA
                </span>
                <span class="text-[11px] text-[#63746f] block mt-0.5">
                    Sinkronisasi Basis Data SatuSehat & Kalibrasi AI
                </span>
            </div>
        </div>

        <span class="font-mono text-2xl sm:text-3xl font-bold text-[#1c6454]/40 tracking-wider">
            HTTP 503
        </span>
    </div>

    <!-- Editorial Headline & Explanation -->
    <div class="space-y-2.5">
        <h1 class="font-serif text-2xl sm:text-3xl font-normal text-[#142320] leading-snug">
            Sistem Sedang Dalam Pemeliharaan & Peningkatan
        </h1>
        <p class="text-xs sm:text-sm text-[#4d605a] leading-relaxed">
            Platform AEVYRA sedang menjalani pemeliharaan berkala untuk peningkatan performa model visi gizi dan sinkronisasi standar interoperabilitas HL7 FHIR Kemenkes RI. Layanan akan kembali normal dalam hitungan menit.
        </p>
    </div>

    <!-- Clinical Recommendations & Action Guidance -->
    <div class="p-4 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] space-y-2.5">
        <span class="text-[11px] font-bold text-[#1c6454] uppercase tracking-wider flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">info</span>
            Informasi Layanan Pasien:
        </span>
        <ul class="space-y-2 text-xs text-[#445652]">
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Seluruh data biomarker dan rekam konsultasi Anda aman dan terenkripsi.</span>
            </li>
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Layanan darurat hotline Ambulan 119 tetap beroperasi 24 jam melalui sambungan telepon langsung.</span>
            </li>
            <li class="flex items-start gap-2">
                <span class="text-[#1c6454] font-bold leading-none mt-0.5">•</span>
                <span class="leading-relaxed">Halaman akan otomatis terhubung kembali setelah proses pemeliharaan selesai.</span>
            </li>
        </ul>
    </div>

    <!-- Diagnostic Trace Info -->
    <div class="p-3 rounded-xl bg-[#f3f7f5] border border-[#e6eee9] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#61736d] font-mono">
        <span>Trace ID: <strong class="text-[#142320]">AEV-503-{{ rand(100000, 999999) }}</strong></span>
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
            <span class="material-symbols-outlined text-[17px]">cached</span>
            <span>Periksa Status Server</span>
        </button>
        <a
            href="mailto:care@aevyra.health"
            class="min-h-11 px-4 py-2.5 rounded-full bg-white text-[#31433f] text-xs font-medium hover:bg-[#f4faf6] transition-all active:scale-95 border border-[#dce6e1] flex items-center justify-center gap-1.5"
        >
            <span class="material-symbols-outlined text-[17px]">support_agent</span>
            <span>Kontak Tim Support</span>
        </a>
    </div>
@endsection

