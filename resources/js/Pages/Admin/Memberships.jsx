import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';

export default function Memberships({ tiers = [], memberships = { data: [], links: [] }, stats = {} }) {
    const tierCards = [
        {
            name: 'Silver Tier',
            slug: 'silver',
            price: 'Gratis',
            memberCount: stats.silverCount || 120,
            color: 'slate',
            features: ['Pencatatan 4 Metrik Inti', 'Analisis DQS Standar', '1x Scan OCR/Hari', 'Akses Komunitas Terbuka'],
        },
        {
            name: 'Gold Tier',
            slug: 'gold',
            price: 'Rp 99.000 / bln',
            memberCount: stats.goldCount || 45,
            color: 'amber',
            features: ['Rolling Baseline 14-Hari Lengkap', 'Inferensi Sinyal HBE Cepat', 'Scan OCR Tanpa Batas', 'Asisten AI Gemini Unlimited', '1x Konsultasi Instruktur/Bulan'],
        },
        {
            name: 'Platinum VIP Tier',
            slug: 'platinum',
            price: 'Rp 199.000 / bln',
            memberCount: stats.platinumCount || 18,
            color: 'indigo',
            features: ['Semua Fitur Gold', 'Pendampingan Instruktur Khusus', 'Jalur Prioritas Ambulans 119 SPGDT', 'Laporan Analitik Kohor Bulanan', 'Booking Tatap Muka Fleksibel'],
        },
    ];

    const membershipColumns = [
        {
            key: 'user',
            label: 'Identitas Member',
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                        {row.user?.name?.charAt(0) || 'M'}
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs">{row.user?.name || 'Member'}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.user?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'tier',
            label: 'Tingkatan Langganan',
            render: (row) => {
                const tierSlug = row.tier?.slug || 'silver';
                return <AdminBadge variant={tierSlug}>{row.tier?.name || 'Silver Member'}</AdminBadge>;
            },
        },
        {
            key: 'starts_at',
            label: 'Masa Berlaku',
            render: (row) => (
                <span className="font-label-mono text-xs text-on-surface-variant">
                    {row.starts_at ? new Date(row.starts_at).toLocaleDateString('id-ID') : '-'} s/d{' '}
                    {row.ends_at ? new Date(row.ends_at).toLocaleDateString('id-ID') : 'Aktif Selamanya'}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status Langganan',
            render: (row) => (
                <AdminBadge variant={row.status === 'ACTIVE' ? 'active' : 'suspended'}>
                    {row.status || 'ACTIVE'}
                </AdminBadge>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="memberships" title="Tingkatan Member (Tiers)">
            <Head title="Tingkatan Member — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Tingkatan Member & Skema Langganan (Freemium)"
                    subtitle="Pengaturan batasan kuota fitur preventif per tier (Silver, Gold, Platinum), distribusi keanggotaan aktif, dan matriks hak akses premium."
                    icon="workspace_premium"
                    badge={<AdminBadge variant="gold">Freemium Tier Model</AdminBadge>}
                />

                {/* 3 Tier Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {tierCards.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded-3xl bg-white/85 backdrop-blur-xl border ${
                                tier.slug === 'platinum'
                                    ? 'border-indigo-500/30 shadow-md ring-1 ring-indigo-500/20'
                                    : tier.slug === 'gold'
                                    ? 'border-amber-500/30 shadow-md ring-1 ring-amber-500/20'
                                    : 'border-primary/10 shadow-xs'
                            } flex flex-col justify-between space-y-4`}
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <AdminBadge variant={tier.slug} size="md">
                                        {tier.name}
                                    </AdminBadge>
                                    <span className="font-heading font-black text-sm text-primary">
                                        {tier.price}
                                    </span>
                                </div>

                                <div className="mt-4 pt-3 border-t border-primary/10">
                                    <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-bold">
                                        Member Terdaftar:
                                    </span>
                                    <p className="font-heading font-black text-2xl text-on-surface mt-0.5">
                                        {tier.memberCount} <span className="text-xs font-normal text-on-surface-variant">pengguna</span>
                                    </p>
                                </div>

                                <div className="mt-4 space-y-1.5 text-xs text-on-surface-variant">
                                    <span className="font-bold text-[11px] text-on-surface block mb-1">Benefit Akses:</span>
                                    {tier.features.map((f, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-emerald-600 text-[14px]">check</span>
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subscriber List Table */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                            <span>Daftar Member Berlangganan Aktif</span>
                        </h3>
                    </div>
                    <AdminDataTable
                        columns={membershipColumns}
                        data={memberships}
                        emptyMessage="Belum ada catatan langganan member."
                    />
                </div>
            </div>
        </AdminLayout>
    );
}

