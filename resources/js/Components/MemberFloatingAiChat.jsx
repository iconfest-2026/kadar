import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function MemberFloatingAiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [activeProvider, setActiveProvider] = useState('Gemini Multi-Model');
    const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const quickPrompts = [
        'Berapa batas konsumsi gula harian saya?',
        'Rekomendasi menu sarapan rendah glikemik',
        'Bagaimana cara mencegah kantuk setelah makan siang?',
        'Tips menurunkan resistensi insulin secara alami',
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            inputRef.current?.focus();
            if (!hasLoadedHistory) {
                loadHistory();
            }
        }
    }, [isOpen, messages, isLoading]);

    const loadHistory = async () => {
        try {
            const res = await fetch('/member/ai-chat/history', {
                headers: { 'Accept': 'application/json' },
            });
            if (res.ok) {
                const data = await res.json();
                if (data.messages && data.messages.length > 0) {
                    setMessages(
                        data.messages.map((m) => ({
                            id: m.id,
                            role: m.role?.toLowerCase() === 'assistant' ? 'assistant' : 'user',
                            content: m.content,
                            time: new Date(m.created_at || Date.now()).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            }),
                        }))
                    );
                    setConversationId(data.conversation_id);
                } else {
                    setMessages([
                        {
                            id: 'welcome-1',
                            role: 'assistant',
                            content:
                                'Halo! Saya **Asisten AI Preventif AEVYRA** Anda. Silakan ketik pertanyaan seputar pola makan, pemahaman label gizi, aktivitas fisik, atau strategi menjaga kestabilan glukosa harian Anda.',
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        },
                    ]);
                }
                setHasLoadedHistory(true);
            }
        } catch (err) {
            console.error('Gagal memuat riwayat AI:', err);
        }
    };

    const handleSendMessage = async (textToSend) => {
        const query = (textToSend || input).trim();
        if (!query || isLoading) return;

        const userMsg = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: query,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const csrfToken =
                document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

            const res = await fetch('/member/ai-chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    message: query,
                    conversation_id: conversationId,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.reply) {
                    const botMsg = {
                        id: `ai-${Date.now()}`,
                        role: 'assistant',
                        content: data.reply,
                        provider: data.provider_used || 'Gemini AI',
                        is_safety_triggered: data.is_safety_triggered || false,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    };
                    setMessages((prev) => [...prev, botMsg]);
                    if (data.conversation_id) {
                        setConversationId(data.conversation_id);
                    }
                    if (data.provider_used) {
                        setActiveProvider(data.provider_used);
                    }
                }
            } else {
                throw new Error('Respons server gagal');
            }
        } catch (error) {
            console.error('Error kirim pesan AI:', error);
            setMessages((prev) => [
                ...prev,
                {
                    id: `err-${Date.now()}`,
                    role: 'assistant',
                    content:
                        'Maaf, terjadi gangguan sementara saat menghubungkan ke asisten AI. Silakan coba kembali sesaat lagi.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Helper to format simple markdown bolding and bullet lines
    const renderFormattedText = (text) => {
        if (!text) return null;
        const paragraphs = text.split('\n');
        return paragraphs.map((para, pIdx) => {
            if (!para.trim()) {
                return <div key={pIdx} className="h-1.5" />;
            }

            // Bold matcher
            const parts = para.split(/(\*\*.*?\*\*)/g);
            const renderedParts = parts.map((part, idx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={idx} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
                }
                return part;
            });

            if (para.trim().startsWith('- ') || para.trim().startsWith('* ')) {
                return (
                    <li key={pIdx} className="ml-4 list-disc text-xs leading-relaxed my-0.5">
                        {renderedParts}
                    </li>
                );
            }

            if (para.trim().startsWith('### ')) {
                return (
                    <h5 key={pIdx} className="font-heading font-bold text-xs text-primary mt-2 mb-1">
                        {para.replace('### ', '')}
                    </h5>
                );
            }

            return (
                <p key={pIdx} className="text-xs leading-relaxed my-1">
                    {renderedParts}
                </p>
            );
        });
    };

    return (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end print:hidden">
            {/* Chat Box Popup */}
            {isOpen && (
                <div className="w-[calc(100vw-32px)] sm:w-96 h-135 max-h-[82vh] mb-3 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
                    {/* Header */}
                    <div className="p-3.5 bg-primary text-white flex items-center justify-between border-b border-primary-container shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center p-1.5 shrink-0 border border-white/20">
                                <span className="material-symbols-outlined text-[18px] text-white">smart_toy</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-heading font-bold text-xs block leading-tight">
                                        Asisten AI Preventif
                                    </span>
                                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-400/20 text-emerald-200 font-mono font-semibold">
                                        Aktif
                                    </span>
                                </div>
                                <span className="text-[10px] text-[#cbe5d8] block">
                                    Terhubung Multi-Model • Bebas Ketik
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Link
                                href="/member/consultations-hub"
                                title="Buka Konsultasi Dokter & Riwayat Lengkap"
                                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-xs"
                            >
                                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
                                aria-label="Tutup percakapan"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto bg-[#fafcfb]">
                        {messages.map((msg) => {
                            const isAssistant = msg.role === 'assistant';
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                                >
                                    <div
                                        className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                                            isAssistant
                                                ? 'bg-white text-[#223933] border border-[#d8e8de] rounded-tl-xs'
                                                : 'bg-primary text-white rounded-tr-xs'
                                        }`}
                                    >
                                        {isAssistant ? (
                                            <div>{renderFormattedText(msg.content)}</div>
                                        ) : (
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 px-1 mt-1 text-[9px] text-[#71857f]">
                                        <span>{msg.time}</span>
                                        {isAssistant && msg.provider && (
                                            <span className="font-mono text-[9px] bg-slate-100 text-slate-500 px-1 rounded">
                                                {msg.provider}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {isLoading && (
                            <div className="flex items-center gap-2 p-3 bg-white rounded-2xl rounded-tl-xs border border-[#d8e8de] w-fit text-xs text-[#445b54] shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></span>
                                <span className="text-[10px] text-[#5b736b] ml-1">AI sedang menganalisis & menyusun respon...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestion Pills */}
                    <div className="px-3 pt-2 pb-1 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                        {quickPrompts.map((prompt, pIdx) => (
                            <button
                                key={pIdx}
                                type="button"
                                onClick={() => handleSendMessage(prompt)}
                                disabled={isLoading}
                                className="shrink-0 px-2.5 py-1 rounded-lg bg-[#f0f6f3] hover:bg-[#e4efe8] text-[#1c6454] text-[10px] font-medium border border-[#d4e6dc] active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>

                    {/* Input Area (Bisa Diketik) */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="p-3 bg-white border-t border-surface-container flex items-center gap-2 shrink-0"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            placeholder="Ketik pertanyaan kesehatan atau gizi di sini..."
                            className="flex-1 px-3.5 py-2.5 text-xs bg-[#f4f8f5] text-[#1c2e2a] placeholder-[#798e87] rounded-xl border border-[#d6e5dc] focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-container text-white disabled:opacity-40 disabled:hover:bg-primary flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
                            aria-label="Kirim Pesan"
                        >
                            <span className="material-symbols-outlined text-[18px]">send</span>
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center gap-2.5 px-4 py-3 min-h-11 rounded-full shadow-[0_4px_25px_rgba(0,67,62,0.22)] transition-all duration-300 active:scale-95 border cursor-pointer ${
                    isOpen
                        ? 'bg-white text-primary border-[#d6e5dc] hover:bg-[#f3f8f5]'
                        : 'bg-primary text-white border-primary hover:bg-primary-container'
                }`}
                aria-label="Tanya Asisten AI Preventif"
            >
                <div className="relative flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">smart_toy</span>
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#82d6b3] ring-2 ring-primary animate-pulse"></span>
                </div>
                <div className="text-left">
                    <span className="text-xs font-bold block leading-tight">
                        {isOpen ? 'Tutup Asisten' : 'Chat Asisten AI'}
                    </span>
                    <span className="text-[9px] text-[#cbe5d8] hidden sm:block">
                        {isOpen ? 'Klik untuk sembunyikan' : 'Bisa diketik & interaktif'}
                    </span>
                </div>
            </button>
        </div>
    );
}
