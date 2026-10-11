import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import MenstrualTrackerCard from '../../Components/MenstrualTrackerCard';
import MaleVitalityCard from '../../Components/MaleVitalityCard';

export default function GenderVitality({
    user,
    sex = 'FEMALE',
    profile = {},
}) {
    const isFemale = sex === 'FEMALE';

    return (
        <AppLayout title={isFemale ? 'Kesehatan Hormonal & Siklus' : 'Vitalitas & Skrining Pria'} activeTab="vitality">
            <Head title={isFemale ? 'Siklus Hormonal & Menstruasi - AEVYRA' : 'Vitalitas & Lemak Viseral Pria - AEVYRA'} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-5">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium mb-1">
                            <Link href="/member/dashboard" className="hover:text-primary transition-colors">
                                Dashboard
                            </Link>
                            <span>/</span>
                            <span className="text-primary font-bold">
                                {isFemale ? 'Siklus & Hormonal' : 'Vitalitas Pria'}
                            </span>
                        </div>
                        <h1 className="font-heading font-black text-xl sm:text-2xl text-on-surface tracking-tight">
                            {isFemale ? 'Siklus Hormonal, Haid & Resistensi Insulin' : 'Skrining Lemak Viseral & Vitalitas Pria'}
                        </h1>
                        <p className="text-xs text-on-surface-variant mt-0.5 max-w-xl leading-relaxed">
                            {isFemale
                                ? 'Kalender pintar prediksi menstruasi, fase ovulasi, dan panduan metabolisme karbohidrat sesuai fluktuasi hormon estrogen-progesteron.'
                                : 'Pemantauan rasio lingkar pinggang terhadap tinggi badan (WHtR), pencegahan sindrom metabolik, dan optimalisasi sensitivitas GLUT-4 otot.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-label-mono font-bold uppercase tracking-wider ${
                            isFemale ? 'bg-primary/10 text-primary' : 'bg-sky-500/10 text-sky-700 dark:text-sky-400'
                        }`}>
                            {isFemale ? 'Akun Wanita' : 'Akun Pria'}
                        </span>
                    </div>
                </div>

                {/* Conditional Rendering Berdasarkan Gender Profil */}
                <div>
                    {isFemale ? (
                        <MenstrualTrackerCard />
                    ) : (
                        <MaleVitalityCard />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

