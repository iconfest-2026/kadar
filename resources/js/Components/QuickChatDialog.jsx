import React, { useState, useRef, useEffect } from 'react';

export default function QuickChatDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'init-1',
            sender: 'bot',
            time: 'Sekarang',
            text: 'Halo! Saya Asisten Pintar AEVYRA. Pilih pertanyaan seputar fitur PWA, Scanner, Tingkatan Member, atau Ambulan Darurat di bawah.',
        },
    ]);

    const messagesEndRef = useRef(null);

    const presetQuestions = [
        {
            id: 'q1',
            label: 'Cara kerja Scanner Open Cam?',
            question: 'Bagaimana cara kerja Scanner Open Cam untuk makanan, minuman, dan obat?',
            answer: 'Anda cukup mengarahkan kamera HP ke label pangan atau kemasan obat. Sistem otomatis menganalisis gramatur gula, natrium, alergen, dan petunjuk dosis dalam waktu <0.4 detik tanpa riset manual.',
        },
        {
            id: 'q2',
            label: 'Apa itu Tracker Kesehatan?',
            question: 'Apa fungsi Tracker Kesehatan Pribadi?',
            answer: 'Tracker mencatat asupan kalori, riwayat biometrik, dan hidrasi harian Anda secara otomatis. Sistem akan memberikan notifikasi cerdas jika ada pola yang tidak normal.',
        },
        {
            id: 'q3',
            label: 'Program Challenge Kesehatan?',
            question: 'Bagaimana cara mengikuti Program Challenge Kesehatan?',
            answer: 'Anda dapat memilih challenge sesuai target (misal: 14 hari tanpa gula tambahan, atau 30 hari defisit kalori). Setiap target harian yang tercapai akan memberikan Anda lencana prestasi.',
        },
        {
            id: 'q4',
            label: 'Cara kerja Ambulan Lokasi?',
            question: 'Bagaimana cara kerja fitur Telepon Ambulan Berbasis Lokasi?',
            answer: 'Fitur darurat ini memanfaatkan titik koordinat GPS ponsel Anda untuk memangkas waktu pencarian kontak RS terdekat, langsung menghubungkan panggilan siaga 119 saat kondisi darurat.',
        },
        {
            id: 'q5',
            label: 'Apakah ini Aplikasi Gratis?',
            question: 'Apakah aplikasi AEVYRA gratis digunakan?',
            answer: 'Ya, Anda dapat mendaftar secara gratis untuk mengakses Scanner, Tracker dasar, dan tanya jawab dengan Asisten AI. Tersedia juga paket berbayar untuk fitur konsultasi tingkat lanjut.',
        },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    const handleSelectQuestion = (e) => {
        const questionId = e.target.value;
        if (!questionId) return;
        triggerQuestion(questionId);
    };

    const triggerQuestion = (questionId) => {
        const item = presetQuestions.find((q) => q.id === questionId);
        if (!item) return;

        setSelectedQuestion(questionId);

        const userMsg = {
            id: `user-${Date.now()}`,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: item.question,
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            const botMsg = {
                id: `bot-${Date.now()}`,
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: item.answer,
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
            setSelectedQuestion('');
        }, 400);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
            {/* Chat Popup Box (Adaptive to 320px - 412px Mobile Viewports) */}
            {isOpen && (
                <div className="w-[calc(100vw-32px)] sm:w-90 h-120 max-h-[75vh] mb-3 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
                    {/* Header */}
                    <div className="p-3.5 bg-primary text-white flex items-center justify-between border-b border-primary-container">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shrink-0 shadow-2xs">
                                <img
                                    src="/image/Logo_AEVYRA_Icon.png"
                                    alt="AEVYRA"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <span className="font-serif text-sm font-medium block leading-tight">
                                    Konsultasi Fitur AEVYRA
                                </span>
                                <span className="text-[10px] text-[#cbe5d8] block">
                                    Panduan Interaktif Klinis
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-xs"
                            aria-label="Tutup percakapan"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-[#fafcfb]">
                        {messages.map((msg) => {
                            const isBot = msg.sender === 'bot';
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                                            isBot
                                                ? 'bg-[#f0f6f3] text-[#223933] border border-[#d8e8de] rounded-tl-xs'
                                                : 'bg-primary text-white rounded-tr-xs'
                                        }`}
                                    >
                                        <p>{msg.text}</p>
                                    </div>
                                    <span className="text-[10px] text-[#71857f] px-1 mt-0.5">
                                        {msg.time}
                                    </span>
                                </div>
                            );
                        })}

                        {isTyping && (
                            <div className="flex items-center gap-1.5 p-2.5 bg-[#f0f6f3] rounded-xl border border-[#d8e8de] w-fit text-xs text-[#445b54]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454] animate-pulse"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454] animate-pulse [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454] animate-pulse [animation-delay:0.4s]"></span>
                                <span className="text-[10px] ml-1">Menyiapkan jawaban...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Question Selector Footer */}
                    <div className="p-3 bg-white border-t border-surface-container-high space-y-2">
                        <label className="text-[10px] text-[#556963] font-medium uppercase tracking-wider block">
                            Pilih Topik Pertanyaan:
                        </label>

                        <div className="relative">
                            <select
                                value={selectedQuestion}
                                onChange={handleSelectQuestion}
                                className="w-full pl-3 pr-8 py-2 text-xs bg-[#f4f8f5] text-[#223832] rounded-xl border border-[#d6e5dc] focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer font-medium hover:bg-[#edf5f0] transition-colors"
                            >
                                <option value="">— Pilih pertanyaan seputar fitur —</option>
                                {presetQuestions.map((q) => (
                                    <option key={q.id} value={q.id}>
                                        {q.label}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xs">
                                ↓
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                            {presetQuestions.slice(0, 3).map((q) => (
                                <button
                                    key={q.id}
                                    type="button"
                                    onClick={() => triggerQuestion(q.id)}
                                    className="shrink-0 px-2.5 py-1 rounded-lg bg-[#f0f6f3] hover:bg-[#e4efe8] text-[#1c6454] text-[10px] font-medium border border-[#d4e6dc] active:scale-95 transition-all cursor-pointer"
                                >
                                    {q.label}
                                </button>
                            ))}
                        </div>

                        {/* Note to login for free typing AI */}
                        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#556963]">
                            <span>Chat bebas dengan AI?</span>
                            <a
                                href="/login"
                                className="font-semibold text-primary hover:underline flex items-center gap-0.5"
                            >
                                <span>Masuk ke Akun</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Trigger Button (Touch Height Ergonomics 44px) */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center gap-2 px-4 py-3 min-h-11 rounded-full shadow-[0_4px_20px_rgba(0,67,62,0.15)] transition-all duration-300 active:scale-95 border cursor-pointer ${
                    isOpen
                        ? 'bg-white text-primary border-[#d6e5dc] hover:bg-[#f3f8f5]'
                        : 'bg-primary text-white border-primary hover:bg-primary-container'
                }`}
                aria-label="Tanya Asisten"
            >
                <span className="w-2 h-2 rounded-full bg-[#82d6b3]"></span>
                <span className="text-xs font-medium">
                    {isOpen ? 'Tutup Konseling' : 'Tanya Fitur Platform'}
                </span>
            </button>
        </div>
    );
}
