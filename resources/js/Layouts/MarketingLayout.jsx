import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import QuickChatDialog from '../Components/QuickChatDialog';

export default function MarketingLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-surface text-on-surface relative">
            <Header />
            <main className="w-full pt-16 md:pt-20 bg-surface flex-grow">
                {children}
            </main>
            <Footer />
            <QuickChatDialog />
        </div>
    );
}


