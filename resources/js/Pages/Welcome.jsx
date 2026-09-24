import React from 'react';
import { Head } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';
import HeroSection from '../Components/HeroSection';
import MemberFeaturesSection from '../Components/MemberFeaturesSection';
import TiersAndAmbulanceSection from '../Components/TiersAndAmbulanceSection';
import PublicPromoSection from '../Components/PublicPromoSection';
import FaqSection from '../Components/FaqSection';
import CtaBanner from '../Components/CtaBanner';

export default function Welcome(props) {
    return (
        <MarketingLayout {...props}>
            <Head title="AEVYRA — Pendamping Preventif Kesehatan & Skrining Nutrisi" />

            {/* Peaceful, Serene Background Canvas */}
            <div className="relative w-full overflow-hidden bg-[#f7faf8]">
                {/* Soft, Diffused Natural Light Blooms - Clamped to Viewport */}
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] h-[350px] bg-gradient-to-b from-[#e3f0e9]/70 via-[#edf6f1]/40 to-transparent blur-3xl rounded-full"
                />
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute top-[30%] -left-32 w-[450px] max-w-[80vw] h-[350px] bg-[#f4ebe1]/45 blur-3xl rounded-full"
                />
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute top-[58%] -right-32 w-[480px] max-w-[80vw] h-[380px] bg-[#e7f1ec]/55 blur-3xl rounded-full"
                />

                {/* Main Page Flow with Breathing Space */}
                <div className="relative z-10 flex flex-col w-full space-y-8 sm:space-y-16">
                    <HeroSection />
                    <MemberFeaturesSection />
                    <PublicPromoSection />
                    <TiersAndAmbulanceSection />
                    <FaqSection />
                    <CtaBanner />
                </div>
            </div>
        </MarketingLayout>
    );
}
