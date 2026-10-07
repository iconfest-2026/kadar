import React, { useState, useMemo } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Select, Badge, Card, DropdownAction } from '@/Components/UI';

export default function Subscriptions({
    members = { data: [], links: [] },
    contracts = { data: [], links: [] },
    payments = { data: [], links: [] },
    tiers = [],
    users = [],
    stats = {},
    filters = {},
}) {
    // Tab state: 'members' | 'contracts' | 'payments'
    const [activeTab, setActiveTab] = useState('members');

    // Filter state
    const [search, setSearch] = useState(filters.search || '');
    const [tierFilter, setTierFilter] = useState(filters.tier || 'ALL');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'ALL');

    // Modals state
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [detailMember, setDetailMember] = useState(null);
    const [editingMembership, setEditingMembership] = useState(null);
    const [renewingMembership, setRenewingMembership] = useState(null);
    const [deletingMembership, setDeletingMembership] = useState(null);
    const [verifyingPayment, setVerifyingPayment] = useState(null);

    // Form: Assign new subscription
    const assignForm = useForm({
        user_id: '',
        tier_id: tiers[0]?.id || '',
        status: 'ACTIVE',
        ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    // Form: Update subscription
    const editForm = useForm({
        tier_id: '',
        status: 'ACTIVE',
        ends_at: '',
    });

    // Form: Quick renew subscription
    const renewForm = useForm({
        months: 1,
        tier_id: '',
    });

    // Formatters
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    const formatDateTime = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateStr;
        }
    };

    // Filter submit
    const handleFilterSubmit = (e) => {
        if (e) e.preventDefault();
        router.get(
            '/admin/subscriptions',
            {
                search: search || undefined,
                tier: tierFilter !== 'ALL' ? tierFilter : undefined,
                status: statusFilter !== 'ALL' ? statusFilter : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleResetFilter = () => {
        setSearch('');
        setTierFilter('ALL');
        setStatusFilter('ALL');
        router.get('/admin/subscriptions', {}, { preserveState: true, preserveScroll: true });
    };

    // Handlers
    const handleOpenAssign = (preselectedUserId = '') => {
        assignForm.setData({
            user_id: preselectedUserId || (users[0]?.id || ''),
            tier_id: tiers[0]?.id || '',
            status: 'ACTIVE',
            ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        });
        setIsAssignOpen(true);
    };

    const handleSubmitAssign = (e) => {
        e.preventDefault();
        assignForm.post('/admin/subscriptions/assign', {
            onSuccess: () => {
                setIsAssignOpen(false);
                assignForm.reset();
            },
        });
    };

    const handleOpenEdit = (membership) => {
        setEditingMembership(membership);
        editForm.setData({
            tier_id: membership.tier_id,
            status: membership.status,
            ends_at: membership.ends_at ? membership.ends_at.split('T')[0] : '',
        });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        if (!editingMembership) return;
        editForm.patch(`/admin/subscriptions/${editingMembership.id}`, {
            onSuccess: () => {
                setEditingMembership(null);
                editForm.reset();
            },
        });
    };

    const handleOpenRenew = (membership) => {
        setRenewingMembership(membership);
        renewForm.setData({
            months: 1,
            tier_id: membership.tier_id,
        });
    };

    const handleSubmitRenew = (e) => {
        e.preventDefault();
        if (!renewingMembership) return;
        renewForm.post(`/admin/subscriptions/${renewingMembership.id}/renew`, {
            onSuccess: () => {
                setRenewingMembership(null);
                renewForm.reset();
            },
        });
    };

    const handleDeleteMembership = () => {
        if (!deletingMembership) return;
        router.delete(`/admin/subscriptions/${deletingMembership.id}`, {
            onSuccess: () => setDeletingMembership(null),
        });
    };

    const handleVerifyPayment = (payment) => {
        if (!payment?.order_id) return;
        setVerifyingPayment(payment.order_id);
        router.post(
            '/admin/subscriptions/verify-payment',
            { order_id: payment.order_id },
            {
                preserveScroll: true,
                onFinish: () => setVerifyingPayment(null),
            }
        );
    };

    // Columns Definition for Tab 1: Members (User -> Membership relation)
    const memberColumns = [
        {
            key: 'user',
            label: 'Identitas Member',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        {row.name ? row.name.charAt(0).toUpperCase() : 'M'}
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-on-surface truncate text-xs flex items-center gap-2">
                            {row.name}
                            {row.roles?.some((r) => r.slug === 'instructor') && (
                                <span className="px-1.5 py-0.2 text-[9px] font-label-mono bg-teal-500/10 text-teal-800 rounded">
                                    Instruktur
                                </span>
                            )}
                        </div>
                        <div className="text-[11px] text-on-surface-variant font-mono truncate">{row.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'plan',
            label: 'Paket SaaS Aktif',
            render: (row) => {
                const active = row.active_membership;
                if (!active || !active.tier) {
                    return (
                        <div className="flex items-center gap-1.5">
                            <AdminBadge variant="default" size="xs">
                                GRATIS / NON-AKTIF
                            </AdminBadge>
                        </div>
                    );
                }
                const tierSlug = active.tier.slug?.toLowerCase() || 'silver';
                return (
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                            <AdminBadge variant={tierSlug} size="xs" icon="workspace_premium">
                                {active.tier.name.toUpperCase()}
                            </AdminBadge>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                AKTIF
                            </span>
                        </div>
                        <div className="text-[10px] text-on-surface-variant font-mono">
                            {formatCurrency(active.tier.price)}/bln
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'validity',
            label: 'Masa Berlaku & Kadaluwarsa',
            render: (row) => {
                const active = row.active_membership || row.latest_membership;
                if (!active) {
                    return <span className="text-on-surface-variant/60 text-xs italic">Belum ada riwayat</span>;
                }
                const isExpired = active.ends_at && new Date(active.ends_at) < new Date();
                return (
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-[11px] font-medium text-on-surface">
                            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">event</span>
                            {formatDate(active.starts_at)} — {formatDate(active.ends_at)}
                        </div>
                        <div className="text-[10px] font-mono">
                            {isExpired ? (
                                <span className="text-rose-600 font-bold">Telah Kedaluwarsa</span>
                            ) : (
                                <span className="text-emerald-700">Aktif s/d {formatDate(active.ends_at)}</span>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'history_count',
            label: 'Aktivitas SaaS',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-surface-container font-semibold text-on-surface">
                        {row.memberships_count || 0} Kontrak
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-primary/10 font-semibold text-primary">
                        {row.membership_payments_count || 0} Tagihan
                    </span>
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onDetail={() => setDetailMember(row)}
                        detailLabel="Detail Profil & Riwayat"
                        customActions={
                            row.active_membership
                                ? [
                                      {
                                          key: 'renew',
                                          label: 'Perpanjang Masa Aktif',
                                          icon: 'update',
                                          onClick: () => handleOpenRenew(row.active_membership),
                                          variant: 'primary',
                                      },
                                      {
                                          key: 'edit',
                                          label: 'Ubah Paket / Status',
                                          icon: 'edit',
                                          onClick: () => handleOpenEdit(row.active_membership),
                                      },
                                  ]
                                : [
                                      {
                                          key: 'upgrade',
                                          label: 'Tetapkan Paket Premium',
                                          icon: 'add_circle',
                                          onClick: () => handleOpenAssign(row.id),
                                          variant: 'primary',
                                      },
                                  ]
                        }
                    />
                </div>
            ),
        },
    ];

    // Columns Definition for Tab 2: Contracts (Membership records)
    const contractColumns = [
        {
            key: 'id',
            label: 'ID Kontrak',
            width: '90px',
            render: (row) => <span className="font-label-mono font-bold text-primary text-xs">#{row.id}</span>,
        },
        {
            key: 'user',
            label: 'Pengguna / Pelanggan',
            render: (row) => (
                <div>
                    <div className="font-bold text-xs text-on-surface">{row.user?.name || 'User Terhapus'}</div>
                    <div className="text-[11px] font-mono text-on-surface-variant">{row.user?.email}</div>
                </div>
            ),
        },
        {
            key: 'tier',
            label: 'Paket / Tier Plan',
            render: (row) => {
                const tierSlug = row.tier?.slug?.toLowerCase() || 'silver';
                return (
                    <div className="flex items-center gap-2">
                        <AdminBadge variant={tierSlug} size="xs" icon="workspace_premium">
                            {row.tier?.name || 'Paket Kustom'}
                        </AdminBadge>
                        <span className="text-[11px] font-mono text-on-surface-variant">
                            {formatCurrency(row.tier?.price)}
                        </span>
                    </div>
                );
            },
        },
        {
            key: 'status',
            label: 'Status Langganan',
            render: (row) => {
                const statusMap = {
                    ACTIVE: { variant: 'active', text: 'AKTIF' },
                    EXPIRED: { variant: 'suspended', text: 'KEDALUWARSA' },
                    SUSPENDED: { variant: 'suspended', text: 'DIBEKUKAN' },
                    CANCELLED: { variant: 'default', text: 'DIBATALKAN' },
                };
                const st = statusMap[row.status] || { variant: 'default', text: row.status };
                return <AdminBadge variant={st.variant} size="xs">{st.text}</AdminBadge>;
            },
        },
        {
            key: 'period',
            label: 'Masa Berlaku',
            render: (row) => (
                <div className="text-xs space-y-0.5">
                    <div className="font-medium text-on-surface">{formatDate(row.starts_at)} — {formatDate(row.ends_at)}</div>
                    <div className="text-[10px] text-on-surface-variant font-mono">Dibuat: {formatDate(row.created_at)}</div>
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onEdit={() => handleOpenEdit(row)}
                        editLabel="Ubah Status / Tier"
                        onDelete={() => setDeletingMembership(row)}
                        deleteLabel="Cabut Langganan"
                        customActions={[
                            {
                                key: 'renew',
                                label: 'Perpanjang Masa Aktif',
                                icon: 'update',
                                onClick: () => handleOpenRenew(row),
                                variant: 'primary',
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];

    // Columns Definition for Tab 3: Payments (MembershipPayment records via Midtrans)
    const paymentColumns = [
        {
            key: 'order_id',
            label: 'Order ID / No. Tagihan',
            render: (row) => (
                <div>
                    <span className="font-label-mono font-bold text-xs text-primary">{row.order_id}</span>
                    <div className="text-[10px] text-on-surface-variant font-mono">
                        {row.payment_type ? `Metode: ${row.payment_type.toUpperCase()}` : 'Payment Gateway'}
                    </div>
                </div>
            ),
        },
        {
            key: 'customer',
            label: 'Pelanggan',
            render: (row) => (
                <div>
                    <div className="font-bold text-xs text-on-surface">{row.user?.name || 'Guest/User'}</div>
                    <div className="text-[11px] font-mono text-on-surface-variant">{row.user?.email}</div>
                </div>
            ),
        },
        {
            key: 'tier',
            label: 'Paket SaaS',
            render: (row) => {
                const tierSlug = row.tier?.slug?.toLowerCase() || 'silver';
                return (
                    <AdminBadge variant={tierSlug} size="xs" icon="workspace_premium">
                        {row.tier?.name || 'Paket Langganan'}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'amount',
            label: 'Nominal Tagihan',
            render: (row) => (
                <div className="space-y-0.5">
                    <div className="font-bold text-xs text-on-surface">{formatCurrency(row.gross_amount)}</div>
                    {row.admin_fee > 0 && (
                        <div className="text-[10px] text-on-surface-variant font-mono">
                            Admin Fee: {formatCurrency(row.admin_fee)}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Pembayaran',
            render: (row) => {
                const st = (row.status || '').toUpperCase();
                if (st === 'SETTLEMENT' || st === 'CAPTURE' || st === 'PAID') {
                    return (
                        <span className="px-2 py-0.5 text-[10px] font-label-mono font-bold rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/25">
                            LUNAS (SETTLEMENT)
                        </span>
                    );
                }
                if (st === 'PENDING') {
                    return (
                        <span className="px-2 py-0.5 text-[10px] font-label-mono font-bold rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/25 animate-pulse">
                            MENUNGGU (PENDING)
                        </span>
                    );
                }
                if (st === 'EXPIRE' || st === 'CANCEL' || st === 'DENY') {
                    return (
                        <span className="px-2 py-0.5 text-[10px] font-label-mono font-bold rounded-full bg-rose-500/10 text-rose-800 border border-rose-500/25">
                            {st}
                        </span>
                    );
                }
                return (
                    <span className="px-2 py-0.5 text-[10px] font-label-mono font-bold rounded-full bg-surface-container text-on-surface-variant">
                        {st}
                    </span>
                );
            },
        },
        {
            key: 'paid_at',
            label: 'Waktu Transaksi',
            render: (row) => (
                <div className="text-xs space-y-0.5 font-mono text-on-surface-variant">
                    <div>{formatDateTime(row.paid_at || row.created_at)}</div>
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        customActions={[
                            {
                                key: 'verify',
                                label: verifyingPayment === row.order_id ? 'Sedang Memeriksa...' : 'Sinkronkan Midtrans',
                                icon: 'sync',
                                onClick: () => handleVerifyPayment(row),
                                disabled: verifyingPayment === row.order_id,
                                variant: 'primary',
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="subscriptions">
            <Head title="Langganan SaaS & Member Premium - Tata Kelola AEVYRA" />

            <div className="space-y-6 pb-12">
                {/* Page Header */}
                <AdminPageHeader
                    title="Langganan SaaS & Member Premium"
                    subtitle="Manajemen komprehensif data pelanggan SaaS, relasi antar pengguna ke membership, masa aktif paket, dan mutasi tagihan payment gateway."
                    breadcrumbs={['Admin', 'Monetisasi', 'Langganan SaaS']}
                    icon="card_membership"
                    actions={
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<span className="material-symbols-outlined text-[16px]">refresh</span>}
                                onClick={() => router.reload({ preserveScroll: true })}
                            >
                                Segarkan Data
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                leftIcon={<span className="material-symbols-outlined text-[16px]">add_task</span>}
                                onClick={() => handleOpenAssign()}
                            >
                                Tetapkan Langganan Member
                            </Button>
                        </div>
                    }
                />

                {/* SaaS Metrics KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Pelanggan Premium Aktif"
                        value={stats.activeSubscribers || 0}
                        subtitle={`Dari total ${stats.totalUsers || 0} akun pengguna terdaftar`}
                        icon="verified"
                        accent="emerald"
                        badge={`${stats.conversionRate || 0}% Konversi`}
                    />

                    <AdminStatCard
                        title="Estimasi Nilai MRR"
                        value={formatCurrency(stats.mrr || 0)}
                        subtitle="Monthly Recurring Revenue paket aktif"
                        icon="account_balance_wallet"
                        accent="primary"
                    />

                    <AdminStatCard
                        title="Akumulasi Pendapatan SaaS"
                        value={formatCurrency(stats.totalRevenue || 0)}
                        subtitle="Total transaksi settlement lunas"
                        icon="payments"
                        accent="indigo"
                    />

                    <AdminStatCard
                        title="Sebaran Paket Member"
                        value={`${stats.goldCount || 0} Gold / ${stats.platinumCount || 0} Plat`}
                        subtitle={`Paket Silver: ${stats.silverCount || 0} aktif`}
                        icon="workspace_premium"
                        accent="amber"
                    />
                </div>

                {/* Filter and Navigation Controls */}
                <Card className="p-4 sm:p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Tab Switcher */}
                        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-2xl border border-primary/10 overflow-x-auto">
                            <button
                                type="button"
                                onClick={() => setActiveTab('members')}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'members'
                                        ? 'bg-white shadow-xs text-primary font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">group</span>
                                Pelanggan & Relasi Paket ({members.total || 0})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('contracts')}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'contracts'
                                        ? 'bg-white shadow-xs text-primary font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                                Kontrak Langganan ({contracts.total || 0})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('payments')}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'payments'
                                        ? 'bg-white shadow-xs text-primary font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">point_of_sale</span>
                                Mutasi Midtrans Gateway ({payments.total || 0})
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <form onSubmit={handleFilterSubmit} className="flex flex-wrap items-center gap-2">
                            <div className="w-48 sm:w-60">
                                <Input
                                    size="sm"
                                    placeholder="Cari member / email / order..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    leftIcon={<span className="material-symbols-outlined text-[16px] text-on-surface-variant">search</span>}
                                />
                            </div>

                            <div className="w-36">
                                <Select
                                    size="sm"
                                    value={tierFilter}
                                    onChange={(e) => setTierFilter(e.target.value)}
                                    options={[
                                        { value: 'ALL', label: 'Semua Paket' },
                                        ...tiers.map((t) => ({ value: t.slug, label: t.name })),
                                    ]}
                                />
                            </div>

                            <div className="w-36">
                                <Select
                                    size="sm"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    options={[
                                        { value: 'ALL', label: 'Semua Status' },
                                        { value: 'ACTIVE', label: 'Aktif' },
                                        { value: 'EXPIRED', label: 'Kedaluwarsa' },
                                        { value: 'FREE', label: 'Gratis/Non-Aktif' },
                                    ]}
                                />
                            </div>

                            <Button type="submit" variant="primary" size="sm">
                                Filter
                            </Button>

                            {(search || tierFilter !== 'ALL' || statusFilter !== 'ALL') && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleResetFilter}
                                    title="Reset Filter"
                                >
                                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                                </Button>
                            )}
                        </form>
                    </div>
                </Card>

                {/* Tab Content Display */}
                <div>
                    {activeTab === 'members' && (
                        <div className="space-y-4">
                            <Table
                                columns={memberColumns}
                                data={members}
                                emptyMessage="Tidak ada data member yang cocok dengan filter yang dipilih."
                                emptyIcon="group_off"
                            />
                        </div>
                    )}

                    {activeTab === 'contracts' && (
                        <div className="space-y-4">
                            <Table
                                columns={contractColumns}
                                data={contracts}
                                emptyMessage="Tidak ada rekaman kontrak keanggotaan ditemukan."
                                emptyIcon="receipt_long"
                            />
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div className="space-y-4">
                            <Table
                                columns={paymentColumns}
                                data={payments}
                                emptyMessage="Tidak ada riwayat mutasi pembayaran Midtrans ditemukan."
                                emptyIcon="point_of_sale"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal: Tetapkan Langganan Member (Assign) */}
            <Modal
                isOpen={isAssignOpen}
                onClose={() => setIsAssignOpen(false)}
                title="Tetapkan Langganan Member (SaaS)"
                subtitle="Tetapkan paket membership premium langsung ke pengguna pilihan."
                icon="add_moderator"
                maxWidth="md"
            >
                <form onSubmit={handleSubmitAssign} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Pilih Pengguna / Member
                        </label>
                        <Select
                            value={assignForm.data.user_id}
                            onChange={(e) => assignForm.setData('user_id', e.target.value)}
                            options={users.map((u) => ({
                                value: u.id,
                                label: `${u.name} (${u.email})`,
                            }))}
                            error={assignForm.errors.user_id}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Paket Membership
                        </label>
                        <Select
                            value={assignForm.data.tier_id}
                            onChange={(e) => assignForm.setData('tier_id', e.target.value)}
                            options={tiers.map((t) => ({
                                value: t.id,
                                label: `${t.name} - ${formatCurrency(t.price)}/bln`,
                            }))}
                            error={assignForm.errors.tier_id}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                Status Langganan
                            </label>
                            <Select
                                value={assignForm.data.status}
                                onChange={(e) => assignForm.setData('status', e.target.value)}
                                options={[
                                    { value: 'ACTIVE', label: 'AKTIF' },
                                    { value: 'SUSPENDED', label: 'DIBEKUKAN' },
                                    { value: 'EXPIRED', label: 'KEDALUWARSA' },
                                ]}
                                error={assignForm.errors.status}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                Masa Berlaku Hingga
                            </label>
                            <Input
                                type="date"
                                value={assignForm.data.ends_at}
                                onChange={(e) => assignForm.setData('ends_at', e.target.value)}
                                error={assignForm.errors.ends_at}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-primary/10">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsAssignOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            loading={assignForm.processing}
                        >
                            Simpan & Tetapkan
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Ubah / Edit Langganan */}
            <Modal
                isOpen={!!editingMembership}
                onClose={() => setEditingMembership(null)}
                title="Kelola Kontrak Langganan"
                subtitle={`Ubah paket atau status langganan member: ${editingMembership?.user?.name || 'Member'}`}
                icon="edit_calendar"
                maxWidth="md"
            >
                <form onSubmit={handleSubmitEdit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Paket Tier Langganan
                        </label>
                        <Select
                            value={editForm.data.tier_id}
                            onChange={(e) => editForm.setData('tier_id', e.target.value)}
                            options={tiers.map((t) => ({
                                value: t.id,
                                label: `${t.name} - ${formatCurrency(t.price)}/bln`,
                            }))}
                            error={editForm.errors.tier_id}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                Status Langganan
                            </label>
                            <Select
                                value={editForm.data.status}
                                onChange={(e) => editForm.setData('status', e.target.value)}
                                options={[
                                    { value: 'ACTIVE', label: 'AKTIF' },
                                    { value: 'SUSPENDED', label: 'DIBEKUKAN' },
                                    { value: 'EXPIRED', label: 'KEDALUWARSA' },
                                ]}
                                error={editForm.errors.status}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                Masa Berlaku Hingga
                            </label>
                            <Input
                                type="date"
                                value={editForm.data.ends_at}
                                onChange={(e) => editForm.setData('ends_at', e.target.value)}
                                error={editForm.errors.ends_at}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-primary/10">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingMembership(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            loading={editForm.processing}
                        >
                            Perbarui Status
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Perpanjang Masa Aktif Cepat (Quick Renew) */}
            <Modal
                isOpen={!!renewingMembership}
                onClose={() => setRenewingMembership(null)}
                title="Perpanjang Masa Aktif Langganan"
                subtitle={`Menambahkan masa berlaku keanggotaan untuk ${renewingMembership?.user?.name || 'Member'}`}
                icon="update"
                maxWidth="sm"
            >
                <form onSubmit={handleSubmitRenew} className="space-y-4">
                    <div className="p-3 bg-surface-container rounded-2xl space-y-1 text-xs">
                        <div className="text-on-surface-variant">Masa Aktif Saat Ini:</div>
                        <div className="font-bold text-on-surface">
                            {formatDate(renewingMembership?.ends_at) || 'Sudah Kedaluwarsa'}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Durasi Tambahan
                        </label>
                        <Select
                            value={renewForm.data.months}
                            onChange={(e) => renewForm.setData('months', Number(e.target.value))}
                            options={[
                                { value: 1, label: '+1 Bulan (30 Hari)' },
                                { value: 3, label: '+3 Bulan (Paket Kuartal)' },
                                { value: 6, label: '+6 Bulan (Semester)' },
                                { value: 12, label: '+12 Bulan (1 Tahun Penuh)' },
                            ]}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Paket Tier (Opsional jika ingin upgrade sekaligus)
                        </label>
                        <Select
                            value={renewForm.data.tier_id}
                            onChange={(e) => renewForm.setData('tier_id', e.target.value)}
                            options={tiers.map((t) => ({
                                value: t.id,
                                label: `${t.name} (${formatCurrency(t.price)})`,
                            }))}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-primary/10">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setRenewingMembership(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            loading={renewForm.processing}
                        >
                            Konfirmasi Perpanjangan
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Detail Forensik SaaS & Profil Member */}
            <Modal
                isOpen={!!detailMember}
                onClose={() => setDetailMember(null)}
                title="Detail Profil & Riwayat SaaS Member"
                subtitle="Data lengkap relasi pengguna, paket langganan aktif, dan riwayat mutasi pembayaran."
                icon="account_circle"
                maxWidth="2xl"
            >
                {detailMember && (
                    <div className="space-y-5">
                        {/* Member Header Card */}
                        <div className="p-4 rounded-2xl bg-surface-container border border-primary/10 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center font-bold text-lg">
                                    {detailMember.name ? detailMember.name.charAt(0).toUpperCase() : 'M'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-on-surface">{detailMember.name}</h4>
                                    <p className="text-xs text-on-surface-variant font-mono">{detailMember.email}</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        {detailMember.roles?.map((r) => (
                                            <span
                                                key={r.id || r.slug}
                                                className="px-2 py-0.5 rounded text-[9px] font-label-mono font-bold uppercase bg-primary/10 text-primary"
                                            >
                                                {r.name || r.slug}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-[10px] text-on-surface-variant uppercase font-label-mono font-bold">
                                    Paket Aktif Saat Ini
                                </div>
                                <div className="mt-1">
                                    {detailMember.active_membership?.tier ? (
                                        <AdminBadge
                                            variant={detailMember.active_membership.tier.slug?.toLowerCase() || 'silver'}
                                            size="sm"
                                            icon="workspace_premium"
                                        >
                                            {detailMember.active_membership.tier.name}
                                        </AdminBadge>
                                    ) : (
                                        <AdminBadge variant="default" size="sm">
                                            GRATIS / FREE TIER
                                        </AdminBadge>
                                    )}
                                </div>
                                {detailMember.active_membership && (
                                    <div className="text-[10px] font-mono text-emerald-700 mt-1">
                                        s/d {formatDate(detailMember.active_membership.ends_at)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Riwayat Kontrak Membership Pengguna Ini */}
                        <div className="space-y-2">
                            <h5 className="font-bold text-xs text-on-surface uppercase tracking-wider font-label-mono flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-primary">history</span>
                                Riwayat Kontrak Keanggotaan ({detailMember.memberships?.length || 0})
                            </h5>
                            <div className="border border-primary/10 rounded-2xl overflow-hidden bg-white">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="bg-surface-container-low border-b border-primary/10 text-[10px] font-label-mono uppercase text-on-surface-variant">
                                            <th className="p-3">Paket Tier</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Mulai</th>
                                            <th className="p-3">Berakhir</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/5">
                                        {detailMember.memberships?.length ? (
                                            detailMember.memberships.map((m) => (
                                                <tr key={m.id} className="hover:bg-primary/5 transition-colors">
                                                    <td className="p-3 font-semibold text-on-surface">
                                                        {m.tier?.name || 'Paket Kustom'}
                                                    </td>
                                                    <td className="p-3">
                                                        <AdminBadge
                                                            variant={m.status === 'ACTIVE' ? 'active' : 'suspended'}
                                                            size="xs"
                                                        >
                                                            {m.status}
                                                        </AdminBadge>
                                                    </td>
                                                    <td className="p-3 font-mono text-[11px]">{formatDate(m.starts_at)}</td>
                                                    <td className="p-3 font-mono text-[11px]">{formatDate(m.ends_at)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="p-4 text-center text-on-surface-variant italic">
                                                    Belum ada riwayat kontrak membership.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Riwayat Pembayaran Pengguna Ini */}
                        <div className="space-y-2">
                            <h5 className="font-bold text-xs text-on-surface uppercase tracking-wider font-label-mono flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-primary">point_of_sale</span>
                                Riwayat Mutasi Pembayaran ({detailMember.membership_payments?.length || 0})
                            </h5>
                            <div className="border border-primary/10 rounded-2xl overflow-hidden bg-white">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="bg-surface-container-low border-b border-primary/10 text-[10px] font-label-mono uppercase text-on-surface-variant">
                                            <th className="p-3">Order ID</th>
                                            <th className="p-3">Nominal</th>
                                            <th className="p-3">Status Midtrans</th>
                                            <th className="p-3">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/5">
                                        {detailMember.membership_payments?.length ? (
                                            detailMember.membership_payments.map((p) => (
                                                <tr key={p.id} className="hover:bg-primary/5 transition-colors">
                                                    <td className="p-3 font-mono font-bold text-primary text-[11px]">
                                                        {p.order_id}
                                                    </td>
                                                    <td className="p-3 font-mono font-bold text-on-surface">
                                                        {formatCurrency(p.gross_amount)}
                                                    </td>
                                                    <td className="p-3">
                                                        <span
                                                            className={`px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold ${
                                                                (p.status || '').toUpperCase() === 'SETTLEMENT'
                                                                    ? 'bg-emerald-100 text-emerald-800'
                                                                    : 'bg-amber-100 text-amber-800'
                                                            }`}
                                                        >
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 font-mono text-[11px]">
                                                        {formatDateTime(p.paid_at || p.created_at)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="p-4 text-center text-on-surface-variant italic">
                                                    Belum ada catatan mutasi pembayaran.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-end pt-3 border-t border-primary/10">
                            <Button variant="outline" size="sm" onClick={() => setDetailMember(null)}>
                                Tutup Detail
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal: Konfirmasi Cabut / Hapus Langganan */}
            <AdminDeleteConfirmModal
                isOpen={!!deletingMembership}
                onClose={() => setDeletingMembership(null)}
                onConfirm={handleDeleteMembership}
                title="Cabut Langganan Keanggotaan"
                message={`Apakah Anda yakin ingin mencabut dan menghapus langganan ${
                    deletingMembership?.tier?.name || 'Paket'
                } untuk member ${
                    deletingMembership?.user?.name || 'Pengguna'
                }? Akun pengguna akan kembali ke tingkat paket reguler/gratis.`}
            />
        </AdminLayout>
    );
}

