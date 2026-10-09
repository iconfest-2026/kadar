import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import WhatsAppEmojiPicker from './WhatsAppEmojiPicker';

export default function MemberFloatingAiChat({ isOpen: propIsOpen, onClose: propOnClose }) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

    const handleClose = () => {
        if (propOnClose) {
            propOnClose();
        }
        setInternalOpen(false);
        setShowEmojiPicker(false);
    };

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [activeProvider, setActiveProvider] = useState('Gemini 3.8 Flash');
    const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const quickPrompts = [
        'Aku lagi capek mental dan butuh teman curhat...',
        'Bagaimana cara menenangkan overthinking & cemas?',
        'Berapa batas aman konsumsi gula harian saya?',
        'Rekomendasi menu sarapan rendah lonjakan glikemik',
        'Kenapa stres pikiran bisa memicu lonjakan gula darah?',
        'Tips relaksasi napas & tidur nyenyak malam ini',
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Insert emoji at cursor position like WhatsApp
    const handleEmojiSelect = (emojiChar) => {
        if (!inputRef.current) {
            setInput((prev) => prev + emojiChar);
            return;
        }

        const start = inputRef.current.selectionStart ?? input.length;
        const end = inputRef.current.selectionEnd ?? input.length;
        const nextVal = input.substring(0, start) + emojiChar + input.substring(end);
        setInput(nextVal);

        setTimeout(() => {
            inputRef.current?.focus();
            const nextPos = start + emojiChar.length;
            inputRef.current?.setSelectionRange(nextPos, nextPos);
        }, 10);
    };

    // Listen to global open-ai-chat event from anywhere (e.g. Dashboard hero card or sidebar)
    useEffect(() => {
        const handleOpenEvent = (e) => {
            setInternalOpen(true);
            if (e.detail?.prompt) {
                setTimeout(() => {
                    handleSendMessage(e.detail.prompt);
                }, 100);
            }
        };
        window.addEventListener('open-ai-chat', handleOpenEvent);
        return () => window.removeEventListener('open-ai-chat', handleOpenEvent);
    }, [conversationId]);

    // Handle ESC key to close emoji picker or drawer
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                if (showEmojiPicker) {
                    setShowEmojiPicker(false);
                } else if (isOpen) {
                    handleClose();
                }
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, showEmojiPicker]);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => {
                inputRef.current?.focus();
            }, 150);
            if (!hasLoadedHistory) {
                loadHistory();
            }
        }
    }, [isOpen, messages.length, isLoading]);

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
                            provider: m.provider_used || 'Gemini AI',
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
                                'Halo! Saya Asisten AI & Sahabat Curhat AEVYRA. 😊\n\nSaya hadir mendampingi kesehatan fisik metabolik Anda (nutrisi gizi seimbang, gula darah, tidur, aktivitas) sekaligus menjadi teman curhat hangat dan psikolog suportif jika Anda sedang merasa lelah, stres kerja, cemas, overthinking, atau butuh didengarkan tanpa menghakimi. 💙\n\nAda hal yang sedang Anda rasakan atau ingin kita diskusikan hari ini?',
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            provider: 'Gemini 3.8 Flash',
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

        setShowEmojiPicker(false);

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
            const getCookie = (name) => {
                if (typeof document === 'undefined') return null;
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return match ? decodeURIComponent(match[3]) : null;
            };
            const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : '';
            const xsrfToken = getCookie('XSRF-TOKEN');
            const csrfToken = xsrfToken || metaToken || '';

            const res = await fetch('/member/ai-chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-XSRF-TOKEN': xsrfToken || csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
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
                        provider: data.provider_used || 'Gemini 3.8 Flash',
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
                    provider: 'Fallback Engine',
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

    const handleClearChat = () => {
        setMessages([
            {
                id: `welcome-${Date.now()}`,
                role: 'assistant',
                content:
                    'Percakapan telah direset. Silakan tanyakan hal baru seputar gaya hidup sehat, evaluasi nutrisi & gula darah, atau curhat apa saja yang sedang Anda rasakan hari ini. Saya siap mendengarkan. 😊',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                provider: activeProvider,
            },
        ]);
        setConversationId(null);
        setShowEmojiPicker(false);
    };

    // Helper to format clean text without asterisks, with dividers, bullets, and numbered badges
    const renderFormattedText = (content) => {
        if (!content) return null;

        // 1. Strip residual asterisks
        const clean = content.replace(/\*/g, '');

        // 2. Normalize text: ensure bullet points and numbered points start on separate lines
        const normalized = clean
            .replace(/([^\n])\s*[-•]\s+/g, '$1\n- ')
            .replace(/([^\n])\s+(\d+)\.\s+/g, '$1\n$2. ');

        const rawLines = normalized.split('\n');
        const elements = [];
        let currentBullets = [];
        let currentNumbers = [];

        const flushLists = () => {
            if (currentBullets.length > 0) {
                elements.push({
                    type: 'bullet-group',
                    items: [...currentBullets],
                });
                currentBullets = [];
            }
            if (currentNumbers.length > 0) {
                elements.push({
                    type: 'number-group',
                    items: [...currentNumbers],
                });
                currentNumbers = [];
            }
        };

        for (let i = 0; i < rawLines.length; i++) {
            const line = rawLines[i].trim();
            if (!line) {
                flushLists();
                continue;
            }

            // Bullet item
            if (line.startsWith('- ') || line.startsWith('• ')) {
                if (currentNumbers.length > 0) flushLists();
                currentBullets.push(line.replace(/^[-•]\s+/, '').trim());
                continue;
            }

            // Numbered item
            const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
            if (numMatch) {
                if (currentBullets.length > 0) flushLists();
                currentNumbers.push({
                    num: numMatch[1],
                    text: numMatch[2].trim(),
                });
                continue;
            }

            // Flush open lists
            flushLists();

            // Detect section headers
            const isHeader =
                line.endsWith(':') ||
                line.startsWith('###') ||
                (line.length < 80 &&
                    /^(Gejala|Tanda|Penyebab|Langkah|Cara|Tips|Prinsip|Rekomendasi|Faktor|Perhatian|Pencegahan|Catatan|Penting|Karakteristik)/i.test(
                        line
                    ));

            if (isHeader) {
                elements.push({
                    type: 'header',
                    text: line.replace(/^###\s*/, ''),
                });
            } else {
                elements.push({
                    type: 'paragraph',
                    text: line,
                });
            }
        }
        flushLists();

        return (
            <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed">
                {elements.map((el, elIdx) => {
                    if (el.type === 'header') {
                        return (
                            <div
                                key={elIdx}
                                className="pt-2 mt-2 first:mt-0 first:pt-0 border-t border-[#e2e8e4]"
                            >
                                <div className="flex items-center gap-1.5 text-[#008069] font-bold text-[12px] mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#008069] shrink-0" />
                                    <span>{el.text}</span>
                                </div>
                            </div>
                        );
                    }

                    if (el.type === 'bullet-group') {
                        return (
                            <div key={elIdx} className="space-y-1.5 pl-0.5 my-1.5">
                                {el.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex items-start gap-2 text-[#111b21]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#008069] mt-1.5 shrink-0" />
                                        <span className="leading-relaxed flex-1">{item}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    if (el.type === 'number-group') {
                        return (
                            <div key={elIdx} className="space-y-2 pl-0.5 my-2">
                                {el.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex items-start gap-2.5 text-[#111b21]">
                                        <span className="w-4.5 h-4.5 rounded-full bg-[#008069]/10 text-[#008069] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-[#008069]/20">
                                            {item.num}
                                        </span>
                                        <span className="leading-relaxed flex-1">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    return (
                        <p key={elIdx} className="text-[#111b21] leading-relaxed my-1">
                            {el.text}
                        </p>
                    );
                })}
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden print:hidden">
            {/* Backdrop Overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
                onClick={handleClose}
                aria-label="Tutup Panel Chat"
            />

            {/* WhatsApp Styled Side Drawer Panel */}
            <aside
                className="fixed inset-y-0 right-0 z-50 w-full sm:w-110 md:w-115 max-w-full bg-[#efeae2] shadow-2xl flex flex-col border-l border-[#d1d7db] animate-drawer-in"
                role="dialog"
                aria-label="Chat AI Konsultasi Gaya Hidup"
            >
                {/* 1. Authentic WhatsApp Dark Emerald Header */}
                <div className="h-16 bg-[#008069] text-white px-3 sm:px-4 flex items-center justify-between shadow-xs select-none shrink-0 z-20">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="p-1 rounded-full hover:bg-black/10 text-white transition-colors cursor-pointer shrink-0"
                            title="Tutup Chat"
                            aria-label="Tutup"
                        >
                            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                        </button>

                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full bg-[#005c4b] border border-white/20 flex items-center justify-center text-white shadow-xs">
                                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25d366] ring-2 ring-[#008069]"></span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                                <h3 className="font-heading font-bold text-sm text-white truncate leading-tight">
                                    Asisten AI AEVYRA
                                </h3>
                                <span className="material-symbols-outlined text-[14px] text-[#25d366]" title="Terverifikasi Preventif">
                                    verified
                                </span>
                            </div>
                            {isLoading ? (
                                <span className="text-[11px] text-[#d9fdd3] leading-tight font-medium animate-pulse flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]"></span>
                                    <span>sedang mengetik...</span>
                                </span>
                            ) : (
                                <span className="text-[11px] text-[#d9fdd3] block leading-tight font-medium">
                                    online • Sahabat Curhat &amp; Konselor Holistik
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={handleClearChat}
                            className="p-1.5 rounded-full hover:bg-black/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                            title="Mulai Sesi Chat Baru"
                        >
                            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                        </button>

                        <Link
                            href="/member/consultations-hub"
                            className="p-1.5 rounded-full hover:bg-black/10 text-white/90 hover:text-white transition-colors cursor-pointer hidden sm:block"
                            title="Pusat Konsultasi Lengkap & Dokter IDI"
                        >
                            <span className="material-symbols-outlined text-[20px]">support_agent</span>
                        </Link>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="p-1.5 rounded-full hover:bg-black/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                            title="Tutup Panel"
                        >
                            <span className="material-symbols-outlined text-[22px]">close</span>
                        </button>
                    </div>
                </div>

                {/* 2. Chat Scroll Area with WhatsApp Pattern Wallpaper */}
                <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 relative">
                    {/* Subtle WhatsApp-style wallpaper doodle pattern */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.035]"
                        style={{
                            backgroundImage: `radial-gradient(#005c4b 1.5px, transparent 1.5px), radial-gradient(#008069 1.5px, #efeae2 1.5px)`,
                            backgroundSize: '24px 24px',
                            backgroundPosition: '0 0, 12px 12px',
                        }}
                    />

                    {/* WhatsApp Security / Clinical Advisory Pill */}
                    <div className="flex justify-center my-1 relative z-10">
                        <div className="bg-[#ffeecd] border border-[#ffe082]/70 text-[#7a5e17] text-[10px] px-3.5 py-1.5 rounded-xl max-w-[95%] text-center shadow-[0_1px_0.5px_rgba(11,20,26,0.08)] flex items-center gap-1.5 justify-center leading-relaxed">
                            <span className="material-symbols-outlined text-[14px] text-[#b78103] shrink-0">
                                lock
                            </span>
                            <span>Percakapan preventif &amp; teman curhat terenkripsi. Dukungan fisik &amp; kesehatan mental.</span>
                        </div>
                    </div>

                    {/* WhatsApp Centered Date Pill */}
                    <div className="flex justify-center my-2 sticky top-1 z-10">
                        <span className="bg-white/95 text-[#54656f] text-[10px] font-semibold px-3 py-1 rounded-lg shadow-[0_1px_1px_rgba(11,20,26,0.12)] uppercase tracking-wider">
                            HARI INI
                        </span>
                    </div>

                    {/* Messages Stream */}
                    {messages.map((msg) => {
                        const isAssistant = msg.role === 'assistant';
                        return (
                            <div
                                key={msg.id}
                                className={`flex flex-col relative z-10 ${
                                    isAssistant ? 'items-start' : 'items-end'
                                }`}
                            >
                                <div
                                    className={`max-w-[88%] p-3 sm:p-3.5 rounded-2xl shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] text-xs sm:text-[13px] leading-relaxed transition-all ${
                                        isAssistant
                                            ? 'bg-white text-[#111b21] rounded-tl-xs border border-[#e9edef]'
                                            : 'bg-[#d9fdd3] text-[#111b21] rounded-tr-xs'
                                    }`}
                                >
                                    {isAssistant ? (
                                        <div>{renderFormattedText(msg.content)}</div>
                                    ) : (
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    )}

                                    {/* Bubble Meta (Time & Double Blue Checkmark for user) */}
                                    <div
                                        className={`flex items-center gap-1.5 mt-1.5 pt-0.5 select-none text-[10px] ${
                                            isAssistant
                                                ? 'justify-between border-t border-slate-100 text-[#667781]'
                                                : 'justify-end text-[#667781]'
                                        }`}
                                    >
                                        {isAssistant && (
                                            <span className="font-mono text-[9px] text-[#008069] bg-[#e7fed9] px-1.5 py-0.2 rounded font-semibold">
                                                {msg.provider || 'AI Preventif'}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <span>{msg.time}</span>
                                            {!isAssistant && (
                                                <span
                                                    className="material-symbols-outlined text-[15px] text-[#53bdeb]"
                                                    title="Terkirim & Terbaca"
                                                >
                                                    done_all
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* WhatsApp Bouncing Typing Indicator */}
                    {isLoading && (
                        <div className="self-start bg-white rounded-2xl rounded-tl-xs p-3 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] flex items-center gap-2 border border-[#e9edef] max-w-fit relative z-10 animate-fade-in">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-[#00a884] animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 rounded-full bg-[#00a884] animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-[#00a884] animate-bounce"></span>
                            </div>
                            <span className="text-[11px] text-[#667781] font-medium ml-1">
                                sedang mengetik jawaban...
                            </span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 3. WhatsApp Quick Suggestion Chips */}
                <div className="px-3 py-2 bg-[#f0f2f5] border-t border-[#e9edef] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 z-20">
                    {quickPrompts.map((prompt, pIdx) => (
                        <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleSendMessage(prompt)}
                            disabled={isLoading}
                            className="shrink-0 px-3 py-1.5 rounded-full bg-white hover:bg-[#e7fed9] text-[#008069] text-[11px] font-semibold border border-[#008069]/25 shadow-2xs active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>

                {/* 4. WhatsApp Bottom Input Bar with Emoji Picker */}
                <div className="relative shrink-0 z-20">
                    <WhatsAppEmojiPicker
                        isOpen={showEmojiPicker}
                        onSelect={handleEmojiSelect}
                        onClose={() => setShowEmojiPicker(false)}
                    />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="p-2.5 sm:p-3 bg-[#f0f2f5] border-t border-[#d1d7db] flex items-center gap-2"
                    >
                        <button
                            type="button"
                            id="wa-emoji-trigger-btn"
                            data-emoji-trigger="true"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowEmojiPicker((prev) => !prev);
                            }}
                            className={`p-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                                showEmojiPicker
                                    ? 'text-[#008069] bg-[#e7fed9] ring-2 ring-[#008069]/30'
                                    : 'text-[#54656f] hover:text-[#111b21] hover:bg-black/5'
                            }`}
                            title={showEmojiPicker ? 'Tutup Pilihan Emoji' : 'Buka Pilihan Emoji WhatsApp'}
                            aria-label="Pilih Emoji"
                            aria-expanded={showEmojiPicker}
                        >
                            <span className="material-symbols-outlined text-[24px]">
                                {showEmojiPicker ? 'keyboard' : 'sentiment_satisfied'}
                            </span>
                        </button>

                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            placeholder="Curhat perasaan, tanya kesehatan fisik, atau gaya hidup..."
                            className="flex-1 bg-white rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[#111b21] placeholder-[#8696a0] border border-transparent focus:outline-none focus:ring-1 focus:ring-[#00a884] shadow-2xs transition-all"
                        />

                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-40 disabled:hover:bg-[#00a884] text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer shrink-0"
                            title="Kirim Pesan"
                            aria-label="Kirim"
                        >
                            <span className="material-symbols-outlined text-[19px]">send</span>
                        </button>
                    </form>
                </div>
            </aside>
        </div>
    );
}
