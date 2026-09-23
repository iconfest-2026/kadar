import React from 'react';
import { Link } from '@inertiajs/react';

export default function PublicPromoSection() {
    return (
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto" id="promo">
            <div className="space-y-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-surface-container-high">
                    <div className="space-y-2">
                        <span className="text-[11px] text-primary font-medium tracking-wide uppercase block">
                            Bukti Klinis &amp; Pembalikan Risiko
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#142320]">
                            Mengapa intervensi dini menentukan masa depan Anda.
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#546661] max-w-sm leading-relaxed">
                        Pra-diabetes berkembang tanpa rasa nyeri. Mengetahui beban gula pada makanan harian dapat mencegah kerusakan pembuluh darah mikro sebelum terlambat.
                    </p>
                </div>

                {/* Side-by-Side Comparative Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {/* Left: Conventional Reactive Approach (Soft Pebble / Warm Sandstone) */}
                    <div className="p-5 sm:p-7 lg:p-8 bg-[#faf8f7] rounded-3xl border border-[#ece3de] flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd5]">
                                <span className="text-[11px] font-medium text-[#8c594c] uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#9c5f51]"></span>
                                    Pendekatan Konvensional (Reaktif)
                                </span>
                                <span className="text-[11px] text-[#9c7166] font-mono">Tanpa Pemantauan</span>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2b211e]">
                                Menunggu gejala fisik hingga diabetes menetap.
                            </h3>

                            <div className="space-y-3.5 text-xs text-[#5f514d] leading-relaxed pt-1">
                                <div className="flex items-start gap-3">
                                    <span className="text-[#a46e61] font-mono text-sm leading-none shrink-0 mt-0.5">—</span>
                                    <span>
                                        <strong className="text-[#2b211e] font-medium">Beban Gula Tersembunyi:</strong> Pemanis cair dan saus kemasan dikonsumsi tanpa panduan, memicu lonjakan glukosa harian yang tidak disadari.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#a46e61] font-mono text-sm leading-none shrink-0 mt-0.5">—</span>
                                    <span>
                                        <strong className="text-[#2b211e] font-medium">Fluktuasi Energi Berulang:</strong> Rasa kantuk hebat dan lemas setelah makan sering diabaikan sebagai kelelahan biasa, padahal pertanda resistensi insulin.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#a46e61] font-mono text-sm leading-none shrink-0 mt-0.5">—</span>
                                    <span>
                                        <strong className="text-[#2b211e] font-medium">Intervensi Terlambat:</strong> Baru berkonsultasi ke fasilitas medis saat komplikasi kardiovaskular atau neuropati telah muncul.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/70 border border-[#eddcd5] flex items-center justify-between text-[11px] text-[#785044]">
                            <span>Hasil Rata-rata: Beban metabolik meningkat</span>
                            <span className="font-serif font-medium text-[#8c594c]">Progresi Volatil</span>
                        </div>
                    </div>

                    {/* Right: AEVYRA Guided Approach (Soft Porcelain Mint / Sage) */}
                    <div className="p-5 sm:p-7 lg:p-8 bg-[#f2f7f4] rounded-3xl border border-[#cfe1d7] shadow-[0_4px_24px_rgba(0,67,62,0.04)] flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#d6e7dd]">
                                <span className="text-[11px] font-medium text-[#1c6454] uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                                    Pendekatan AEVYRA (Preventif)
                                </span>
                                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-[#1c6454] border border-[#cbe0d4] font-medium">
                                    Protokol Presisi
                                </span>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#122824]">
                                Deteksi 0.4 detik &amp; bimbingan gaya hidup terpadu.
                            </h3>

                            <div className="space-y-3.5 text-xs text-[#3f5751] leading-relaxed pt-1">
                                <div className="flex items-start gap-3">
                                    <span className="text-[#1c6454] font-mono text-sm leading-none shrink-0 mt-0.5">+</span>
                                    <span>
                                        <strong className="text-[#122824] font-medium">Transparansi Sebelum Makan:</strong> Kamera membedah gramatur sukrosa bebas, garam, dan kalori secara instan sebelum suapan pertama.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#1c6454] font-mono text-sm leading-none shrink-0 mt-0.5">+</span>
                                    <span>
                                        <strong className="text-[#122824] font-medium">Kurva Glukosa Terjaga:</strong> Alternatif pangan yang disarankan dokter membantu menjaga kestabilan energi tanpa rasa lapar berlebih.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#1c6454] font-mono text-sm leading-none shrink-0 mt-0.5">+</span>
                                    <span>
                                        <strong className="text-[#122824] font-medium">Remisi Bertahap 90 Hari:</strong> Program kebiasaan mikro terukur dan sinkronisasi data SatuSehat untuk dokter faskes Anda.
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/70 border border-[#cbe0d4] flex items-center gap-3">
                                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#d2e4d9]">
                                    <img
                                        src="/image/healthy_nutrition_plate.jpg"
                                        alt="Piring Nutrisi Rendah Glikemik"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-xs">
                                    <span className="font-serif font-medium text-[#122824] block">Nutrisi Presisi Rendah Gula Bebas</span>
                                    <span className="text-[11px] text-[#4d665f]">Membantu stabilisasi energi tanpa rasa lapar berlebih</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/80 border border-[#cbe0d4] flex items-center justify-between text-[11px] text-[#1c6454]">
                            <span>Target Terukur: Stabilitas glukosa terjaga</span>
                            <span className="font-serif font-medium text-primary">Remisi HbA1c &lt; 5.7%</span>
                        </div>
                    </div>
                </div>

                {/* Clinical Advisor Endorsement Box - Elegant Warm Porcelain */}
                <div className="p-5 sm:p-7 lg:p-8 bg-white/85 rounded-3xl border border-surface-container-high shadow-[0_4px_24px_rgba(0,40,36,0.02)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-3 flex flex-col items-center text-center space-y-2.5">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-sm shrink-0">
                            <img
                                src="/image/doctor_bramantyo.jpg"
                                alt="dr. H. Bramantyo, Sp.PD"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <span className="font-serif text-sm font-medium text-[#182926] block">
                                dr. H. Bramantyo, Sp.PD
                            </span>
                            <span className="text-[11px] text-[#63746f] block">
                                Dewan Penasihat Medis AEVYRA
                            </span>
                        </div>
                    </div>
                    <div className="md:col-span-9 space-y-3 border-t md:border-t-0 md:border-l border-surface-container-high pt-4 md:pt-0 md:pl-6">
                        <p className="font-serif italic text-base sm:text-lg text-[#1e342f] leading-relaxed">
                            &ldquo;Kunci pembalikan pra-diabetes adalah konsistensi literasi gizi harian. AEVYRA menyederhanakan data biomarker yang rumit menjadi peringatan praktis yang langsung dapat dipahami siapa pun di meja makan.&rdquo;
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#63746f]">
                            <span className="text-[#1c6454] font-medium">Kompatibel SatuSehat Kemenkes</span>
                            <span>•</span>
                            <span>Panduan Klinis PERKENI</span>
                            <span>•</span>
                            <span>Standar Enkripsi Medis AES-256</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


