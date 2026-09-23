import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { name: 'Simulasi Scanner', href: '#scanner-demo', id: 'scanner-demo' },
        { name: 'Fitur Unggulan', href: '#features', id: 'features' },
        { name: 'Tingkatan Member', href: '#tiers', id: 'tiers' },
        { name: 'Promo PWA', href: '#promo', id: 'promo' },
        { name: 'FAQ', href: '#faq', id: 'faq' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = navLinks.map((link) => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 120;

            sections.forEach((section) => {
                if (section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, href, id) => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
            window.location.href = `/${href}`;
            return;
        }

        e.preventDefault();
        setActiveSection(id);
        setMobileMenuOpen(false);

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleEmergencyCall = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude.toFixed(4);
                    const lng = pos.coords.longitude.toFixed(4);
                    alert(`Menghubungkan ke layanan Ambulan terdekat dari koordinat Anda: [${lat}, ${lng}]... Menghubungi 119`);
                    window.location.href = 'tel:119';
                },
                () => {
                    window.location.href = 'tel:119';
                }
            );
        } else {
            window.location.href = 'tel:119';
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-xs py-2 border-b border-white/60'
                    : 'bg-white/60 backdrop-blur-sm py-3 border-b border-white/40'
            }`}
        >
            <div className="max-w-7xl mx-auto px-gutter lg:px-margin flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-space-xs group transition-transform active:scale-95"
                >
                    <span className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
                        AEVYRA
                    </span>
                    <span className="font-label-mono text-[10px] px-1.5 py-0.5 rounded bg-white/80 text-primary font-medium border border-primary/10 shadow-2xs">
                        PWA
                    </span>
                    <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse ml-1"></span>
                </Link>

                {/* Public Feature & Promo Desktop Nav Links */}
                <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md p-1 rounded-full border border-white/80 shadow-xs">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.id}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href, link.id)}
                                className={`px-space-md py-1.5 rounded-full text-body-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-primary text-on-primary shadow-xs'
                                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/80'
                                }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-space-xs sm:gap-space-sm">
                    <button
                        type="button"
                        onClick={handleEmergencyCall}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-mono text-[11px] font-semibold hover:bg-tertiary hover:text-on-tertiary transition-all duration-200 active:scale-95 cursor-pointer"
                        title="Telepon Ambulan Berbasis Lokasi"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
                        <span className="material-symbols-outlined text-[14px]">emergency</span>
                        <span>Ambulan Lokasi</span>
                    </button>

                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-primary hover:bg-surface-container text-body-sm font-medium transition-all duration-200 active:scale-95"
                    >
                        Masuk
                    </Link>

                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary text-on-primary text-body-sm font-medium hover:bg-primary-container transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md"
                    >
                        Daftar Gratis
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-primary hover:bg-surface-container transition-all active:scale-90"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-container/80 px-gutter py-space-md shadow-xl space-y-space-xs animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href, link.id)}
                                    className={`px-3 py-2 rounded-lg text-body-md font-medium transition-all ${
                                        isActive
                                            ? 'bg-primary text-on-primary'
                                            : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>

                    <div className="pt-space-xs border-t border-surface-container flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={handleEmergencyCall}
                            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-mono text-xs font-semibold"
                        >
                            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                            <span className="material-symbols-outlined text-[16px]">emergency</span>
                            <span>Telepon Ambulan Lokasi (119)</span>
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center py-2 rounded-xl bg-surface-container text-primary text-xs font-semibold"
                            >
                                Masuk Akun
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold"
                            >
                                Daftar Gratis
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
