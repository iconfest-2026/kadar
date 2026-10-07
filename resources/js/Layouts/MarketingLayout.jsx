import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import QuickChatDialog from '../Components/QuickChatDialog';
import MemberFloatingAiChat from '../Components/MemberFloatingAiChat';

export default function MarketingLayout({ children }) {
    const page = usePage();
    const authUser = page?.props?.auth?.user || null;
    const isMember = !!authUser && (!authUser.role || authUser.role === 'member');
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);

    useEffect(() => {
        const handleOpenAiChat = () => setIsAiChatOpen(true);
        window.addEventListener('open-ai-chat', handleOpenAiChat);
        return () => window.removeEventListener('open-ai-chat', handleOpenAiChat);
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#f7faf8] text-[#1c2e2a] relative selection:bg-primary selection:text-white overflow-x-hidden">
            <Header />
            <main className="w-full pt-14 md:pt-16 grow relative overflow-x-hidden">
                {children}
            </main>
            <Footer />
            <QuickChatDialog />
            {isMember && (
                <MemberFloatingAiChat
                    isOpen={isAiChatOpen}
                    onClose={() => setIsAiChatOpen(false)}
                />
            )}
        </div>
    );
}

