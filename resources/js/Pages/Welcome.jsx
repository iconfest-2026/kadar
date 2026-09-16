import React from 'react';
import { Head } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';
import HeroSection from '../Components/HeroSection';
import MemberFeaturesSection from '../Components/MemberFeaturesSection';
import TiersAndAmbulanceSection from '../Components/TiersAndAmbulanceSection';
import PublicPromoSection from '../Components/PublicPromoSection';
import FaqSection from '../Components/FaqSection';
import CtaBanner from '../Components/CtaBanner';

export default function Welcome() {
    return (
        <MarketingLayout>
            <Head title="Kadar PWA — Scanner Nutrisi & Obat, Bimbingan Instruktur & Ambulan Lokasi" />
            <div className="flex flex-col w-full">
                <HeroSection />
                <MemberFeaturesSection />
                <TiersAndAmbulanceSection />
                <PublicPromoSection />
                <FaqSection />
                <CtaBanner />
            </div>
        </MarketingLayout>
    );
}
