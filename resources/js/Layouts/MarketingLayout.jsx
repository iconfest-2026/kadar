import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import QuickChatDialog from '../Components/QuickChatDialog';

export default function MarketingLayout({ children }) {
    return (
        <div className="min-h-screen w-full flex flex-col bg-[#f7faf8] text-[#1c2e2a] relative selection:bg-primary selection:text-white overflow-x-hidden">
            <Header />
            <main className="w-full pt-14 md:pt-16 grow relative overflow-x-hidden">
                {children}
            </main>
            <Footer />
            <QuickChatDialog />
        </div>
    );
}
