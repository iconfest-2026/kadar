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
            <Head title="AEVYRA — Personal Preventive Health & Early Intervention Platform" />

            {/* Ambient Glassmorphism Atmospheric Background Layer */}
            <div className="relative w-full overflow-hidden">
                {/* Subtle Organic Glow Orbs */}
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-primary-fixed-dim/45 via-primary-fixed/30 to-transparent blur-[120px] rounded-full"
                />
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute top-[28%] -left-36 w-[600px] h-[500px] bg-gradient-to-br from-secondary-fixed/40 via-secondary-fixed-dim/20 to-transparent blur-[130px] rounded-full"
                />
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute top-[55%] -right-36 w-[650px] h-[520px] bg-gradient-to-bl from-primary-fixed-dim/35 via-primary-container/25 to-transparent blur-[130px] rounded-full"
                />
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute top-[80%] left-1/4 w-[600px] h-[450px] bg-gradient-to-tr from-primary-fixed/30 via-secondary-fixed/20 to-transparent blur-[140px] rounded-full"
                />

                {/* Subtle Architectural Dot Pattern Overlay */}
                <div 
                    aria-hidden="true" 
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00433e_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.035]"
                />

                {/* Main Page Flow with Balanced Rhythm */}
                <div className="relative z-10 flex flex-col w-full space-y-2 sm:space-y-4">
                    <HeroSection />
                    <MemberFeaturesSection />
                    <TiersAndAmbulanceSection />
                    <PublicPromoSection />
                    <FaqSection />
                    <CtaBanner />
                </div>
            </div>
        </MarketingLayout>
    );
}

