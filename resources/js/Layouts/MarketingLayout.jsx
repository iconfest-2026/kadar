import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import QuickChatDialog from '../Components/QuickChatDialog';

export default function MarketingLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f0f8f4] text-on-surface relative selection:bg-primary selection:text-on-primary">
            <Header />
            <main className="w-full pt-16 md:pt-20 flex-grow relative">
                {children}
            </main>
            <Footer />
            <QuickChatDialog />
        </div>
    );
}


