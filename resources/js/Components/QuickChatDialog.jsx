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
            text: 'Halo! Saya Asisten Pintar Kadar. Pilih pertanyaan seputar fitur PWA, Scanner, Tingkatan Member, atau Ambulan Darurat di bawah.',
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
            label: 'Perbedaan Chat AI vs Instruktur?',
            question: 'Apa bedanya Konsultasi Chat AI dengan Instruktur?',
            answer: 'Chat AI menjawab pertanyaan ringan seputar gizi dan kalkulasi kalori instan 24/7. Sedangkan sesi Instruktur adalah bimbingan mendalam bersama tenaga ahli sungguhan berdasarkan riwayat tracker Anda.',
        },
        {
            id: 'q3',
            label: 'Perbedaan Member Silver, Gold, Platinum?',
            question: 'Apa saja perbedaan tingkat Member (Silver, Gold, Platinum)?',
            answer: 'Silver adalah tier gratis untuk scanner & tracker dasar. Gold membuka personalisasi profil dan program challenge 90 hari. Platinum menyediakan bimbingan 1-on-1 prioritas bersama instruktur & dokter spesialis.',
        },
        {
            id: 'q4',
            label: 'Cara kerja Ambulan Lokasi?',
            question: 'Bagaimana cara kerja fitur Telepon Ambulan Berbasis Lokasi?',
            answer: 'Fitur darurat ini memanfaatkan titik koordinat GPS ponsel Anda untuk memangkas waktu pencarian kontak RS terdekat, langsung menghubungkan panggilan siaga 119 saat kondisi darurat.',
        },
        {
            id: 'q5',
            label: 'Cara bergabung sebagai Instruktur / Member?',
            question: 'Bagaimana alur pendaftaran akun Member atau Instruktur?',
            answer: 'Klik tombol "Daftar" di atas, lalu pilih peran yang sesuai: "Member" untuk pengguna harian atau "Instruktur" bagi tenaga ahli bersertifikasi yang ingin mendampingi pasien.',
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
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
            {/* Chat Popup Box */}
            {isOpen && (
                <div className="w-[90vw] sm:w-[360px] h-[480px] mb-3 bg-surface rounded-2xl shadow-2xl border border-surface-container flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
                    {/* Header */}
                    <div className="p-3.5 bg-primary text-on-primary flex items-center justify-between border-b border-primary-container shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed border border-primary-fixed-dim/40">
                                    <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary-fixed rounded-full border-2 border-primary"></span>
                            </div>
                            <div>
                                <span className="font-headline-sm text-sm font-medium block leading-tight">
                                    Pusat Bantuan Kadar
                                </span>
                                <span className="font-label-mono text-[10px] text-primary-fixed-dim block">
                                    PWA Informasi &amp; Fitur
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="w-7 h-7 rounded-full bg-primary-container/80 hover:bg-primary-container text-on-primary flex items-center justify-center transition-colors active:scale-90"
                            aria-label="Tutup percakapan"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-surface-container-low/40">
                        {messages.map((msg) => {
                            const isBot = msg.sender === 'bot';
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                                            isBot
                                                ? 'bg-surface text-on-surface border border-surface-container rounded-tl-xs'
                                                : 'bg-primary text-on-primary rounded-tr-xs'
                                        }`}
                                    >
                                        <p>{msg.text}</p>
                                    </div>
                                    <span className="font-label-mono text-[9px] text-on-surface-variant px-1 mt-0.5">
                                        {msg.time}
                                    </span>
                                </div>
                            );
                        })}

                        {isTyping && (
                            <div className="flex items-center gap-1.5 p-2.5 bg-surface rounded-xl border border-surface-container w-fit text-on-surface-variant text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.15s]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.3s]"></span>
                                <span className="font-label-mono text-[10px] ml-1">Mengetik balasan...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Question Selector Footer */}
                    <div className="p-3 bg-surface border-t border-surface-container space-y-2">
                        <label className="font-label-mono text-[10px] text-primary font-semibold uppercase block">
                            Pilih Topik Pertanyaan:
                        </label>

                        <div className="relative">
                            <select
                                value={selectedQuestion}
                                onChange={handleSelectQuestion}
                                className="w-full pl-3 pr-8 py-2 text-xs bg-surface-container-low text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer font-medium hover:bg-surface-container transition-colors"
                            >
                                <option value="">— Pilih pertanyaan seputar fitur —</option>
                                {presetQuestions.map((q) => (
                                    <option key={q.id} value={q.id}>
                                        {q.label}
                                    </option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-[18px]">
                                unfold_more
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                            {presetQuestions.slice(0, 3).map((q) => (
                                <button
                                    key={q.id}
                                    type="button"
                                    onClick={() => triggerQuestion(q.id)}
                                    className="shrink-0 px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-mono text-[10px] border border-surface-container-high active:scale-95 transition-all"
                                >
                                    {q.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-lg transition-all duration-300 active:scale-90 border ${
                    isOpen
                        ? 'bg-surface text-primary border-surface-container hover:bg-surface-container'
                        : 'bg-primary text-on-primary border-primary-container hover:bg-primary-container'
                }`}
                aria-label="Tanya Asisten"
            >
                <div className="relative flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
                        {isOpen ? 'chat_bubble' : 'forum'}
                    </span>
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
                    )}
                </div>

                <span className="text-xs font-semibold font-body-sm">
                    {isOpen ? 'Tutup' : 'Tanya Fitur PWA'}
                </span>
            </button>
        </div>
    );
}
