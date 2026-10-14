import React, { useState, useMemo } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Textarea, Select, Switch, DropdownAction } from '@/Components/UI';

const PRESET_FEATURES = [
    'Pemindai Kamera Makanan & Obat BPOM (10x / hari)',
    'Pemindai Kamera OCR & Obat BPOM Bebas Batas (Unlimited)',
    'Deteksi Beban Glikemik & Gramatur Gula Instan (<0.4s)',
    'Buku Harian Glukosa Darah & Log HBE Harian',
    'Asisten AI Terverifikasi Medis 24/7 (Edukasi Dasar)',
    'Akses Siaga Panggilan Darurat Ambulans 119',
    'Akses Komunitas & Forum Diskusi Pasien Publik',
    'Semua kapabilitas dalam paket Gratis & Dasar',
    'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)',
    'Rencana Intervensi Gizi Mingguan Dipersonalisasi',
    'Program Tantangan Remisi 14-90 Hari (Pedoman PERKENI)',
    '2x Sesi Telekonsultasi Instruktur Gizi per Bulan',
    '6x Sesi Telekonsultasi Dokter Spesialis per Bulan',
    'Laporan Evaluasi Progres Metabolik Bulanan (Format PDF)',
    'Akses Penuh Seluruh Modul Gamifikasi & Resep Rendah Gula',
    'Semua kapabilitas dalam paket Gold & Gratis',
    'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)',
    'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)',
    'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan',
    'Dedicated Personal Health Coach & Review Mingguan',
    'Hotline Tim Medis Siaga Prioritas 24/7',
    'Jalur Koordinasi Ambulans dengan Riwayat Klinis Instan',
    'Rencana Intervensi Gizi & Menu Presisi Personal Khusus',
    'Program Tantangan Remisi Intensif Klinis Terpandu',
    'Akses Jalur Cepat Tindakan Klinis & Integrasi SatuSehat',
    'Starter Kit Glukometer Mandiri Diantar ke Rumah',
];

export default function Memberships({
    tiers = [],
    memberships = { data: [], links: [] },
    payments = { data: [], links: [] },
    stats = {},
    midtransConfig = {},
    users = [],
}) {
    // Tab State: 'subscriptions' | 'payments'
    const [activeTab, setActiveTab] = useState('subscriptions');

    // Modals
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [isCreateTierOpen, setIsCreateTierOpen] = useState(false);
    const [editingTier, setEditingTier] = useState(null);
    const [deletingTier, setDeletingTier] = useState(null);

    // Subscription Edit & Delete Modals
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [deletingSubscription, setDeletingSubscription] = useState(null);

    // Payment Delete Modal
    const [deletingPayment, setDeletingPayment] = useState(null);

    // Payment Midtrans Live Verify State
    const [verifyingOrderId, setVerifyingOrderId] = useState(null);
    const [verifyNotification, setVerifyNotification] = useState(null);

    const handleVerifyPayment = async (payment) => {
        if (!payment?.order_id) return;
        setVerifyingOrderId(payment.order_id);
        setVerifyNotification(null);

        try {
            const getCookie = (name) => {
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return match ? decodeURIComponent(match[3]) : null;
            };
            const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const xsrfToken = getCookie('XSRF-TOKEN');
            const csrfToken = metaToken || xsrfToken || '';

            const res = await fetch('/member/memberships/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-XSRF-TOKEN': xsrfToken || csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify({ order_id: payment.order_id }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.success) {
                setVerifyNotification({ type: 'error', message: data.message || 'Gagal memverifikasi status pembayaran.' });
            } else {
                setVerifyNotification({
                    type: 'success',
                    message: `Order ${payment.order_id} berhasil disinkronkan ke Midtrans: Status ${data.payment_status} (${data.is_paid ? 'LUNAS' : 'BELUM LUNAS'}).`,
                });
                router.reload({ only: ['payments', 'memberships', 'stats'] });
            }
        } catch (e) {
            setVerifyNotification({ type: 'error', message: e.message || 'Terjadi kesalahan jaringan saat memverifikasi ke Midtrans.' });
        } finally {
            setVerifyingOrderId(null);
        }
    };

    // Feature Tag Input Temp State
    const [createFeatureInput, setCreateFeatureInput] = useState('');
    const [editFeatureInput, setEditFeatureInput] = useState('');

    // Midtrans Server Key Reveal & Copy Feedback
    const [showServerKey, setShowServerKey] = useState(false);
    const [copiedKey, setCopiedKey] = useState(null);

    // Search filters
    const [subscriptionSearch, setSubscriptionSearch] = useState('');

    // Assign / Create Subscription Form
    const assignForm = useForm({
        user_id: users[0]?.id || '',
        tier_id: tiers[0]?.id || '',
        status: 'ACTIVE',
        ends_at: '',
    });

    // Edit Subscription Form
    const editSubForm = useForm({
        tier_id: '',
        status: 'ACTIVE',
        ends_at: '',
    });

    // Create Tier Form
    const createTierForm = useForm({
        name: '',
        slug: '',
        description: '',
        price: 0,
        admin_fee: 4000,
        admin_fee_type: 'FIXED',
        badge_text: '',
        is_popular: false,
        max_consultations: 0,
        max_scanner: -1,
        features: [],
    });

    // Edit Tier Form
    const editTierForm = useForm({
        name: '',
        description: '',
        price: 0,
        admin_fee: 4000,
        admin_fee_type: 'FIXED',
        badge_text: '',
        is_popular: false,
        max_consultations: 0,
        max_scanner: -1,
        features: [],
    });

    // Copy to clipboard helper
    const handleCopy = (text, label) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedKey(label);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    // Auto-generate slug on Create Tier name change
    const handleCreateNameChange = (e) => {
        const val = e.target.value;
        createTierForm.setData((data) => ({
            ...data,
            name: val,
            slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        }));
    };

    // Add Feature Helper (Create)
    const handleAddCreateFeature = (textToAdd) => {
        const feat = (textToAdd !== undefined ? textToAdd : createFeatureInput).trim();
        if (!feat) return;
        if (createTierForm.data.features.includes(feat)) return;
        createTierForm.setData('features', [...createTierForm.data.features, feat]);
        setCreateFeatureInput('');
    };

    const handleRemoveCreateFeature = (indexToRemove) => {
        createTierForm.setData(
            'features',
            createTierForm.data.features.filter((_, idx) => idx !== indexToRemove)
        );
    };

    // Add Feature Helper (Edit)
    const handleAddEditFeature = (textToAdd) => {
        const feat = (textToAdd !== undefined ? textToAdd : editFeatureInput).trim();
        if (!feat) return;
        if (editTierForm.data.features.includes(feat)) return;
        editTierForm.setData('features', [...editTierForm.data.features, feat]);
        setEditFeatureInput('');
    };

    const handleRemoveEditFeature = (indexToRemove) => {
        editTierForm.setData(
            'features',
            editTierForm.data.features.filter((_, idx) => idx !== indexToRemove)
        );
    };

    // Open Edit Tier Modal
    const openEditTier = (tier) => {
        setEditingTier(tier);
        setEditFeatureInput('');
        editTierForm.setData({
            name: tier.name || '',
            description: tier.description || '',
            price: Number(tier.price) || 0,
            admin_fee: Number(tier.admin_fee) || 0,
            admin_fee_type: tier.admin_fee_type || 'FIXED',
            badge_text: tier.badge_text || '',
            is_popular: Boolean(tier.is_popular),
            max_consultations: tier.max_consultations !== undefined ? tier.max_consultations : 0,
            max_scanner: tier.max_scanner !== undefined ? tier.max_scanner : -1,
            features: Array.isArray(tier.features) ? [...tier.features] : [],
        });
    };

    // Open Edit Subscription Modal
    const openEditSubscription = (sub) => {
        setEditingSubscription(sub);
        editSubForm.setData({
            tier_id: sub.tier_id || '',
            status: sub.status || 'ACTIVE',
            ends_at: sub.ends_at ? sub.ends_at.substring(0, 10) : '',
        });
    };

    // Submit Assign Form (Create Subscription)
    const handleAssignSubmit = (e) => {
        e.preventDefault();
        assignForm.post('/admin/memberships/assign', {
            onSuccess: () => {
                setIsAssignOpen(false);
                assignForm.reset();
            },
        });
    };

    // Submit Edit Subscription Form
    const handleEditSubSubmit = (e) => {
        e.preventDefault();
        if (!editingSubscription) return;
        editSubForm.patch(`/admin/memberships/subscriptions/${editingSubscription.id}`, {
            onSuccess: () => {
                setEditingSubscription(null);
                editSubForm.reset();
            },
        });
    };

    // Delete Subscription
    const handleDeleteSubConfirm = () => {
        if (!deletingSubscription) return;
        router.delete(`/admin/memberships/subscriptions/${deletingSubscription.id}`, {
            onSuccess: () => {
                setDeletingSubscription(null);
            },
        });
    };

    // Submit Create Tier Form
    const handleCreateTierSubmit = (e) => {
        e.preventDefault();
        createTierForm.post('/admin/memberships/tiers', {
            onSuccess: () => {
                setIsCreateTierOpen(false);
                createTierForm.reset();
            },
        });
    };

    // Submit Edit Tier Form
    const handleEditTierSubmit = (e) => {
        e.preventDefault();
        if (!editingTier) return;
        editTierForm.patch(`/admin/memberships/tiers/${editingTier.id}`, {
            onSuccess: () => {
                setEditingTier(null);
                editTierForm.reset();
            },
        });
    };

    // Submit Delete Tier
    const handleDeleteTierConfirm = () => {
        if (!deletingTier) return;
        router.delete(`/admin/memberships/tiers/${deletingTier.id}`, {
            onSuccess: () => {
                setDeletingTier(null);
            },
        });
    };

    // Delete Payment Log
    const handleDeletePaymentConfirm = () => {
        if (!deletingPayment) return;
        router.delete(`/admin/memberships/payments/${deletingPayment.id}`, {
            onSuccess: () => {
                setDeletingPayment(null);
            },
        });
    };

    // Live Calculation for Create Form
    const createCalculatedAdminFee = useMemo(() => {
        const price = Number(createTierForm.data.price) || 0;
        const fee = Number(createTierForm.data.admin_fee) || 0;
        if (createTierForm.data.admin_fee_type === 'PERCENTAGE') {
            return (price * fee) / 100;
        }
        return fee;
    }, [createTierForm.data.price, createTierForm.data.admin_fee, createTierForm.data.admin_fee_type]);

    const createGrossTotal = useMemo(() => {
        return (Number(createTierForm.data.price) || 0) + createCalculatedAdminFee;
    }, [createTierForm.data.price, createCalculatedAdminFee]);

    // Live Calculation for Edit Form
    const editCalculatedAdminFee = useMemo(() => {
        const price = Number(editTierForm.data.price) || 0;
        const fee = Number(editTierForm.data.admin_fee) || 0;
        if (editTierForm.data.admin_fee_type === 'PERCENTAGE') {
            return (price * fee) / 100;
        }
        return fee;
    }, [editTierForm.data.price, editTierForm.data.admin_fee, editTierForm.data.admin_fee_type]);

    const editGrossTotal = useMemo(() => {
        return (Number(editTierForm.data.price) || 0) + editCalculatedAdminFee;
    }, [editTierForm.data.price, editCalculatedAdminFee]);

    // Filtered subscriptions list for quick search
    const filteredMembershipsData = useMemo(() => {
        const list = Array.isArray(memberships.data) ? memberships.data : [];
        if (!subscriptionSearch.trim()) return memberships;
        const q = subscriptionSearch.toLowerCase();
        const filtered = list.filter(
            (m) =>
                m.user?.name?.toLowerCase().includes(q) ||
                m.user?.email?.toLowerCase().includes(q) ||
                m.tier?.name?.toLowerCase().includes(q)
        );
        return {
            ...memberships,
            data: filtered,
        };
    }, [memberships, subscriptionSearch]);

    // Membership Subscriptions Table Columns with EDIT and DELETE actions!
    const membershipColumns = [
        {
            key: 'user',
            label: 'Identitas Member',
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                        {row.user?.name?.charAt(0) || 'M'}
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-on-surface text-xs truncate">{row.user?.name || 'Member'}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono truncate">{row.user?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'tier',
            label: 'Tingkatan Langganan',
            render: (row) => {
                const tierSlug = row.tier?.slug || 'silver';
                return (
                    <div className="flex items-center gap-1.5">
                        <AdminBadge variant={tierSlug}>{row.tier?.name || 'Silver Member'}</AdminBadge>
                        {row.tier?.badge_text && (
                            <span className="text-[10px] text-on-surface-variant font-medium hidden sm:inline">
                                ({row.tier.badge_text})
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            key: 'starts_at',
            label: 'Masa Berlaku',
            render: (row) => (
                <div className="space-y-0.5">
                    <span className="font-label-mono text-xs text-on-surface block">
                        {row.starts_at ? new Date(row.starts_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                        s/d {row.ends_at ? new Date(row.ends_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Aktif Selamanya'}
                    </span>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Langganan',
            render: (row) => (
                <AdminBadge variant={row.status === 'ACTIVE' ? 'active' : 'suspended'}>
                    {row.status === 'ACTIVE' ? 'Aktif' : row.status || 'Nonaktif'}
                </AdminBadge>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onEdit={() => openEditSubscription(row)}
                        editLabel="Ubah Paket / Status"
                        onDelete={() => setDeletingSubscription(row)}
                        deleteLabel="Cabut Langganan"
                    />
                </div>
            ),
        },
    ];

    // Midtrans Payments Table Columns with DELETE action!
    const paymentColumns = [
        {
            key: 'order_id',
            label: 'Order ID & Gateway',
            render: (row) => (
                <div>
                    <div className="flex items-center gap-1.5 font-label-mono text-xs font-bold text-primary">
                        <span className="material-symbols-outlined text-[15px] text-teal-600">receipt_long</span>
                        <span>{row.order_id}</span>
                        <button
                            type="button"
                            onClick={() => handleCopy(row.order_id, row.order_id)}
                            className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                            title="Salin Order ID"
                        >
                            <span className="material-symbols-outlined text-[13px]">
                                {copiedKey === row.order_id ? 'check' : 'content_copy'}
                            </span>
                        </button>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-medium">Midtrans Snap SaaS</span>
                </div>
            ),
        },
        {
            key: 'user',
            label: 'Pengguna / Pelanggan',
            render: (row) => (
                <div>
                    <p className="font-bold text-on-surface text-xs">{row.user?.name || 'Pelanggan'}</p>
                    <p className="text-[10px] text-on-surface-variant font-label-mono">{row.user?.email}</p>
                </div>
            ),
        },
        {
            key: 'tier',
            label: 'Paket Dipilih',
            render: (row) => (
                <AdminBadge variant={row.tier?.slug || 'gold'}>
                    {row.tier?.name || 'Paket SaaS'}
                </AdminBadge>
            ),
        },
        {
            key: 'gross_amount',
            label: 'Rincian Pembayaran',
            render: (row) => (
                <div className="space-y-0.5">
                    <p className="font-label-mono font-bold text-xs text-primary">
                        Rp {Number(row.gross_amount).toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                        Asli: Rp {Number(row.base_amount).toLocaleString('id-ID')} + Fee: Rp {Number(row.admin_fee).toLocaleString('id-ID')}
                    </p>
                </div>
            ),
        },
        {
            key: 'payment_type',
            label: 'Metode',
            render: (row) => (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-surface-container text-on-surface-variant uppercase border border-surface-container-high">
                    {row.payment_type || 'Snap Gateway'}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status Mutasi',
            render: (row) => {
                const s = (row.status || 'PENDING').toUpperCase();
                let variant = 'pending';
                if (s === 'SETTLEMENT' || s === 'CAPTURE') variant = 'active';
                if (s === 'EXPIRE' || s === 'CANCEL' || s === 'DENY') variant = 'suspended';

                return (
                    <AdminBadge variant={variant}>
                        {s}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'created_at',
            label: 'Waktu Transaksi',
            render: (row) => (
                <div className="space-y-0.5">
                    <span className="font-label-mono text-xs text-on-surface block">
                        {new Date(row.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-label-mono">
                        {new Date(row.created_at).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })} WIB
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
                        onDelete={() => setDeletingPayment(row)}
                        deleteLabel="Hapus Catatan Mutasi"
                        customActions={[
                            {
                                key: 'verify',
                                label: verifyingOrderId === row.order_id ? 'Memverifikasi...' : 'Cek Status Midtrans',
                                icon: 'sync',
                                onClick: () => handleVerifyPayment(row),
                                disabled: verifyingOrderId === row.order_id,
                                variant: 'primary',
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="memberships" title="Tingkatan Member & SaaS Midtrans">
            <Head title="Tingkatan Member & Integrasi SaaS - AEVYRA" />

            <div className="space-y-6">
                {/* Page Header with Action Buttons */}
                <AdminPageHeader
                    title="Tingkatan Member & Integrasi SaaS Midtrans"
                    subtitle="Kelola skema harga asli, biaya admin Midtrans (flat atau persentase), fitur keunggulan dinamis, serta pemantauan otomatis transaksi langganan via Snap payment gateway."
                    icon="workspace_premium"
                    badge={<AdminBadge variant="gold">Dynamic Freemium & SaaS</AdminBadge>}
                    actions={
                        <div className="flex flex-wrap items-center gap-2.5">
                            <Button
                                type="button"
                                variant="outline"
                                size="md"
                                leftIcon="add"
                                onClick={() => setIsCreateTierOpen(true)}
                            >
                                Tambah Tier Baru
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                size="md"
                                leftIcon="person_add"
                                onClick={() => setIsAssignOpen(true)}
                            >
                                Tetapkan Tier Member
                            </Button>
                        </div>
                    }
                />

                {/* 4 Overview Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Paket Aktif"
                        value={`${stats.totalTiers || tiers.length} Paket`}
                        subtitle="Tier keanggotaan terdaftar"
                        icon="workspace_premium"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Member Berlangganan"
                        value={`${stats.activeSubscribers || 0} Member`}
                        subtitle={`Silver: ${stats.silverCount || 0} | Gold: ${stats.goldCount || 0} | Plat: ${stats.platinumCount || 0}`}
                        icon="group"
                        accent="emerald"
                    />
                    <AdminStatCard
                        title="Akumulasi Revenue SaaS"
                        value={`Rp ${Number(stats.totalRevenue || 0).toLocaleString('id-ID')}`}
                        subtitle="Total transaksi settlement Midtrans"
                        icon="payments"
                        accent="indigo"
                    />
                    <AdminStatCard
                        title="Payment Gateway Status"
                        value={stats.midtransStatus || 'Production Live'}
                        subtitle="Midtrans Snap & Auto Webhook"
                        icon="verified_user"
                        accent="teal"
                    />
                </div>

                {/* Midtrans Gateway Credentials & Integration Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-white via-white/95 to-teal-50/40 dark:from-surface dark:to-surface-container-low border border-teal-500/20 shadow-xs relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-teal-500/10">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-700">
                                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-heading font-black text-sm sm:text-base text-on-surface">
                                        Integrasi Midtrans Snap Payment Gateway
                                    </h3>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                                        Live Production
                                    </span>
                                </div>
                                <p className="text-xs text-on-surface-variant">
                                    Integrasi pembayaran otomatis SaaS dengan verifikasi signature SHA512 dan aktivasi langganan instan.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href="https://dashboard.midtrans.com"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-800 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/25 transition-all"
                            >
                                <span>Dashboard Midtrans</span>
                                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {/* Merchant ID */}
                        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-surface border border-teal-500/15">
                            <span className="text-[10px] font-label-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                                Merchant ID
                            </span>
                            <div className="flex items-center justify-between gap-2">
                                <code className="font-label-mono text-xs font-bold text-on-surface truncate">
                                    {midtransConfig.merchant_id || 'Mid-client-o8FP06N-oie4kS_V'}
                                </code>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(midtransConfig.merchant_id || 'Mid-client-o8FP06N-oie4kS_V', 'merchant_id')}
                                    className="p-1 rounded text-on-surface-variant hover:text-teal-700 hover:bg-teal-500/10 transition-colors cursor-pointer"
                                    title="Salin Merchant ID"
                                >
                                    <span className="material-symbols-outlined text-[15px]">
                                        {copiedKey === 'merchant_id' ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Client Key */}
                        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-surface border border-teal-500/15">
                            <span className="text-[10px] font-label-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                                Client Key (Frontend)
                            </span>
                            <div className="flex items-center justify-between gap-2">
                                <code className="font-label-mono text-xs font-bold text-on-surface truncate">
                                    {midtransConfig.client_key || 'Mid-client-o8FP06N-oie4kS_V'}
                                </code>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(midtransConfig.client_key || 'Mid-client-o8FP06N-oie4kS_V', 'client_key')}
                                    className="p-1 rounded text-on-surface-variant hover:text-teal-700 hover:bg-teal-500/10 transition-colors cursor-pointer"
                                    title="Salin Client Key"
                                >
                                    <span className="material-symbols-outlined text-[15px]">
                                        {copiedKey === 'client_key' ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Server Key */}
                        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-surface border border-teal-500/15">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-label-mono font-bold text-on-surface-variant uppercase tracking-wider">
                                    Server Key (Backend)
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowServerKey(!showServerKey)}
                                    className="text-[10px] text-teal-700 hover:underline font-bold"
                                >
                                    {showServerKey ? 'Sembunyikan' : 'Lihat'}
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <code className="font-label-mono text-xs font-bold text-on-surface truncate">
                                    {showServerKey ? 'Mid-server-CaLOeneUWptQF5Z4vrSr-td7' : 'Mid-server-••••••••td7'}
                                </code>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('Mid-server-CaLOeneUWptQF5Z4vrSr-td7', 'server_key')}
                                    className="p-1 rounded text-on-surface-variant hover:text-teal-700 hover:bg-teal-500/10 transition-colors cursor-pointer"
                                    title="Salin Server Key"
                                >
                                    <span className="material-symbols-outlined text-[15px]">
                                        {copiedKey === 'server_key' ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Notification Webhook */}
                        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-surface border border-teal-500/15">
                            <span className="text-[10px] font-label-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                                Webhook Endpoint
                            </span>
                            <div className="flex items-center justify-between gap-2">
                                <code className="font-label-mono text-xs font-bold text-teal-800 truncate">
                                    /midtrans/notification
                                </code>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(midtransConfig.notification_webhook || window.location.origin + '/midtrans/notification', 'webhook')}
                                    className="p-1 rounded text-on-surface-variant hover:text-teal-700 hover:bg-teal-500/10 transition-colors cursor-pointer"
                                    title="Salin URL Webhook"
                                >
                                    <span className="material-symbols-outlined text-[15px]">
                                        {copiedKey === 'webhook' ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-3 rounded-2xl bg-teal-500/5 border border-teal-500/15 flex items-start gap-2.5 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-teal-600 text-[18px] shrink-0 mt-0.5">info</span>
                        <p className="leading-relaxed">
                            <strong className="text-on-surface font-semibold">Skema Perhitungan SaaS Dinamis: </strong>
                            Setiap tier memiliki <em>Harga Asli</em> (pendapatan bersih platform) + <em>Fee Admin Midtrans</em> (flat atau persentase). Total harga yang dibayarkan oleh pengguna akan otomatis terurai dalam invoice dan rincian transaksi Midtrans Snap.
                        </p>
                    </div>
                </div>

                {/* Dynamic Tier Cards Grid */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-heading font-black text-base text-on-surface">
                                Konfigurasi Skema & Fitur Tier Keanggotaan (CRUD Tier)
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Tambah, edit skema harga, fee admin payment gateway, kuota layanan, atau hapus paket membership.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                leftIcon="add"
                                onClick={() => setIsCreateTierOpen(true)}
                            >
                                Buat Tier Baru
                            </Button>
                            <span className="text-xs font-label-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                {tiers.length} Tier Terdaftar
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tiers.map((tier) => {
                            return (
                                <div
                                    key={tier.id}
                                    className={`p-6 rounded-3xl bg-white/95 dark:bg-surface border transition-all duration-300 flex flex-col justify-between relative group ${
                                        tier.is_popular
                                            ? 'border-amber-500/50 shadow-[0_12px_36px_rgba(245,158,11,0.15)] ring-2 ring-amber-500/25'
                                            : tier.slug === 'platinum'
                                            ? 'border-indigo-500/40 shadow-[0_12px_36px_rgba(99,102,241,0.12)]'
                                            : 'border-primary/15 shadow-xs hover:border-primary/30'
                                    }`}
                                >
                                    {tier.is_popular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[13px]">star</span>
                                            <span>Paling Direkomendasikan</span>
                                        </div>
                                    )}

                                    <div>
                                        {/* Card Top: Badges & Action Buttons (EDIT & DELETE) */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <AdminBadge variant={tier.slug} size="md">
                                                    {tier.name}
                                                </AdminBadge>
                                                {tier.badge_text && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-surface-container text-on-surface-variant border border-surface-container-high">
                                                        {tier.badge_text}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditTier(tier)}
                                                    className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                                                    title="Edit Skema & Fitur Tier"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeletingTier(tier)}
                                                    className="p-1.5 rounded-xl text-on-surface-variant hover:text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                                    title="Hapus Paket Tier Ini"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Pricing Summary */}
                                        <div className="mb-4">
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="font-heading font-black text-2xl text-primary tracking-tight">
                                                    {Number(tier.total_price || tier.price) === 0
                                                        ? 'Gratis'
                                                        : `Rp ${Number(tier.total_price || tier.price).toLocaleString('id-ID')}`}
                                                </span>
                                                {Number(tier.price) > 0 && (
                                                    <span className="text-xs text-on-surface-variant font-medium">/ bulan</span>
                                                )}
                                            </div>

                                            {/* Price Breakdown Badge */}
                                            {Number(tier.price) > 0 && (
                                                <div className="mt-2 p-2.5 rounded-2xl bg-surface-container-low border border-primary/10 flex items-center justify-between text-[11px]">
                                                    <span className="text-on-surface-variant">
                                                        Harga Asli: <strong className="text-on-surface">Rp {Number(tier.price).toLocaleString('id-ID')}</strong>
                                                    </span>
                                                    <span className="text-teal-700 font-label-mono font-bold">
                                                        + Fee: Rp {Number(tier.calculated_admin_fee || 0).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            )}

                                            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                                                {tier.description || 'Paket layanan preventif dan kurasi gaya hidup AEVYRA.'}
                                            </p>
                                        </div>

                                        {/* Quotas & Limits */}
                                        <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-2xl bg-surface-container-low/60 border border-surface-container text-xs">
                                            <div>
                                                <span className="text-[10px] text-on-surface-variant font-medium block">Konsultasi Dokter:</span>
                                                <span className="font-label-mono font-bold text-primary">
                                                    {tier.max_consultations === -1 ? 'Unlimited (Bebas)' : (Number(tier.max_consultations) > 0 ? `${tier.max_consultations}x / bulan` : 'Tidak Ada (0x)')}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-on-surface-variant font-medium block">Pemindai Scanner:</span>
                                                <span className="font-label-mono font-bold text-primary">
                                                    {tier.max_scanner === -1 ? 'Unlimited (Bebas)' : (Number(tier.max_scanner) > 0 ? `${tier.max_scanner}x / hari` : 'Nonaktif (0x)')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Dynamic Features List */}
                                        <div className="space-y-2 mb-6">
                                            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider block">
                                                Fitur Unggulan ({Array.isArray(tier.features) ? tier.features.length : 0})
                                            </span>
                                            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                                                {Array.isArray(tier.features) && tier.features.length > 0 ? (
                                                    tier.features.map((feature, fIdx) => (
                                                        <div key={fIdx} className="flex items-start gap-2 text-xs text-on-surface">
                                                            <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                                                                check_circle
                                                            </span>
                                                            <span className="leading-tight text-[11px]">{feature}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-[11px] text-on-surface-variant italic">
                                                        Belum ada fitur unggulan yang ditambahkan.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                                        <span className="text-xs text-on-surface-variant font-medium">Pelanggan Terdaftar:</span>
                                        <span className="font-label-mono font-bold text-sm text-primary">
                                            {tier.memberships_count !== undefined
                                                ? tier.memberships_count
                                                : (tier.slug === 'silver' ? stats.silverCount : tier.slug === 'gold' ? stats.goldCount : stats.platinumCount) || 0}{' '}
                                            Akun Aktif
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Interactive "Tambah Paket Tier Baru" Card */}
                        <div
                            onClick={() => setIsCreateTierOpen(true)}
                            className="p-6 rounded-3xl border-2 border-dashed border-primary/25 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-90 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-all mb-3 shadow-xs">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </div>
                            <h4 className="font-heading font-black text-base text-primary mb-1">
                                Tambah Paket Tier Baru
                            </h4>
                            <p className="text-xs text-on-surface-variant max-w-xs mb-4">
                                Rancang skema keanggotaan baru dengan fitur dan penentuan biaya admin kustom.
                            </p>
                            <Button type="button" variant="primary" size="sm" leftIcon="add">
                                Buat Tier Baru
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Subscriptions & Midtrans Payments Tabbed Section (CRUD Subscriptions & Mutasi) */}
                <div className="space-y-4 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary/10 pb-3">
                        {/* Tab Switcher */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab('subscriptions')}
                                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                    activeTab === 'subscriptions'
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">group</span>
                                <span>Kelola Langganan Member (CRUD)</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-label-mono ${
                                    activeTab === 'subscriptions' ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface'
                                }`}>
                                    {memberships.total !== undefined ? memberships.total : memberships.data?.length || 0}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('payments')}
                                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                    activeTab === 'payments'
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">payments</span>
                                <span>Mutasi Transaksi SaaS Midtrans</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-label-mono ${
                                    activeTab === 'payments' ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface'
                                }`}>
                                    {payments.total !== undefined ? payments.total : payments.data?.length || 0}
                                </span>
                            </button>
                        </div>

                        {activeTab === 'subscriptions' && (
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Cari member / email..."
                                    value={subscriptionSearch}
                                    onChange={(e) => setSubscriptionSearch(e.target.value)}
                                    size="sm"
                                    className="w-48 sm:w-60"
                                />
                                <Button
                                    type="button"
                                    variant="primary"
                                    size="sm"
                                    leftIcon="person_add"
                                    onClick={() => setIsAssignOpen(true)}
                                >
                                    Tetapkan Member
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Render Selected Table */}
                    {activeTab === 'subscriptions' ? (
                        <Table
                            columns={membershipColumns}
                            data={filteredMembershipsData}
                            emptyMessage="Belum ada member yang aktif berlangganan paket."
                            emptyIcon="card_membership"
                        />
                    ) : (
                        <div className="space-y-4">
                            {verifyNotification && (
                                <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 animate-fade-in ${
                                    verifyNotification.type === 'success'
                                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">
                                            {verifyNotification.type === 'success' ? 'check_circle' : 'error'}
                                        </span>
                                        <span>{verifyNotification.message}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setVerifyNotification(null)}
                                        className="text-on-surface-variant hover:text-on-surface cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                </div>
                            )}

                            <Table
                                columns={paymentColumns}
                                data={payments}
                                emptyMessage="Belum ada catatan mutasi pembayaran Midtrans SaaS yang tercatat."
                                emptyIcon="receipt_long"
                            />
                        </div>
                    )}
                </div>

                {/* MODAL 1: Tambah Tier Baru (CREATE TIER) */}
                <Modal
                    isOpen={isCreateTierOpen}
                    onClose={() => setIsCreateTierOpen(false)}
                    title="Tambah Tier Keanggotaan Baru (CREATE)"
                    subtitle="Buat paket langganan preventif baru dengan konfigurasi harga dan fitur dinamis."
                    icon="add_circle"
                    maxWidth="2xl"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsCreateTierOpen(false)}
                                disabled={createTierForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="create-tier-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createTierForm.processing}
                            >
                                Simpan Tier Baru
                            </Button>
                        </div>
                    }
                >
                    <form id="create-tier-form" onSubmit={handleCreateTierSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                                label="Nama Paket Tier"
                                placeholder="Contoh: Diamond VIP"
                                required
                                value={createTierForm.data.name}
                                onChange={handleCreateNameChange}
                                error={createTierForm.errors.name}
                            />
                            <Input
                                label="Slug URL (Unik)"
                                placeholder="diamond-vip"
                                required
                                value={createTierForm.data.slug}
                                onChange={(e) => createTierForm.setData('slug', e.target.value)}
                                error={createTierForm.errors.slug}
                            />
                        </div>

                        <Textarea
                            label="Deskripsi Paket"
                            placeholder="Penjelasan sasaran pengguna dan manfaat utama paket ini..."
                            value={createTierForm.data.description}
                            onChange={(e) => createTierForm.setData('description', e.target.value)}
                            error={createTierForm.errors.description}
                            rows={2}
                        />

                        {/* Pricing & Admin Fee Section */}
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/15 space-y-3">
                            <h4 className="font-heading font-black text-xs text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-teal-600">price_change</span>
                                <span>Skema Harga & Biaya Admin Gateway (Midtrans)</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Input
                                    label="Harga Asli (Rp)"
                                    type="number"
                                    min="0"
                                    required
                                    value={createTierForm.data.price}
                                    onChange={(e) => createTierForm.setData('price', parseFloat(e.target.value) || 0)}
                                    error={createTierForm.errors.price}
                                />

                                <Select
                                    label="Tipe Biaya Admin"
                                    required
                                    value={createTierForm.data.admin_fee_type}
                                    onChange={(e) => createTierForm.setData('admin_fee_type', e.target.value)}
                                    options={[
                                        { value: 'FIXED', label: 'Nominal Flat (Rp)' },
                                        { value: 'PERCENTAGE', label: 'Persentase (%)' },
                                    ]}
                                    error={createTierForm.errors.admin_fee_type}
                                />

                                <Input
                                    label={createTierForm.data.admin_fee_type === 'PERCENTAGE' ? 'Fee Admin (%)' : 'Fee Admin (Rp)'}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={createTierForm.data.admin_fee}
                                    onChange={(e) => createTierForm.setData('admin_fee', parseFloat(e.target.value) || 0)}
                                    error={createTierForm.errors.admin_fee}
                                />
                            </div>

                            {/* Live Calculation Preview Card */}
                            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <div>
                                    <span className="text-on-surface-variant block text-[11px]">Rincian Penagihan Pelanggan:</span>
                                    <span className="font-bold text-on-surface">
                                        Harga Asli (Rp {Number(createTierForm.data.price || 0).toLocaleString('id-ID')}) + Fee Admin (Rp {Math.round(createCalculatedAdminFee).toLocaleString('id-ID')})
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider block">Total Ditagihkan (Gross)</span>
                                    <span className="font-heading font-black text-base text-primary">
                                        Rp {Math.round(createGrossTotal).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quotas & Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                                label="Batas Konsultasi (-1 = Unlimited)"
                                type="number"
                                min="-1"
                                value={createTierForm.data.max_consultations}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    createTierForm.setData('max_consultations', val === '' ? 0 : parseInt(val, 10));
                                }}
                                error={createTierForm.errors.max_consultations}
                            />
                            <Input
                                label="Batas Scan Harian (-1 = Unlimited)"
                                type="number"
                                min="-1"
                                value={createTierForm.data.max_scanner}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    createTierForm.setData('max_scanner', val === '' ? -1 : parseInt(val, 10));
                                }}
                                error={createTierForm.errors.max_scanner}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                            <Input
                                label="Teks Lencana Khusus (Opsional)"
                                placeholder="Contoh: Paling Hemat, VIP Mandiri"
                                value={createTierForm.data.badge_text}
                                onChange={(e) => createTierForm.setData('badge_text', e.target.value)}
                                error={createTierForm.errors.badge_text}
                            />
                            <div className="pt-4">
                                <Switch
                                    label="Tandai Sebagai Paling Direkomendasikan"
                                    description="Menampilkan kartu tier dengan sorotan emas & border menyala"
                                    checked={createTierForm.data.is_popular}
                                    onChange={(checked) => createTierForm.setData('is_popular', checked)}
                                />
                            </div>
                        </div>

                        {/* Dynamic Features List Editor */}
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/15 space-y-3">
                            <h4 className="font-heading font-black text-xs text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-emerald-600">checklist</span>
                                <span>Fitur Unggulan Paket ({createTierForm.data.features.length})</span>
                            </h4>

                            {/* Input to Add Feature */}
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Ketik poin fitur unggulan baru..."
                                    value={createFeatureInput}
                                    onChange={(e) => setCreateFeatureInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddCreateFeature();
                                        }
                                    }}
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="md"
                                    leftIcon="add"
                                    onClick={() => handleAddCreateFeature()}
                                >
                                    Tambah
                                </Button>
                            </div>

                            {/* Added Feature Pills */}
                            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                                {createTierForm.data.features.map((feat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-surface border border-primary/10 text-xs text-on-surface"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">
                                                check_circle
                                            </span>
                                            <span className="truncate">{feat}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCreateFeature(idx)}
                                            className="p-1 rounded text-on-surface-variant hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                                            title="Hapus Fitur"
                                        >
                                            <span className="material-symbols-outlined text-[15px]">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Presets Chips */}
                            <div>
                                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block mb-1.5">
                                    Saran Fitur Siap Pakai (Klik untuk menambahkan):
                                </span>
                                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                                    {PRESET_FEATURES.filter((p) => !createTierForm.data.features.includes(p)).map((preset, pIdx) => (
                                        <button
                                            key={pIdx}
                                            type="button"
                                            onClick={() => handleAddCreateFeature(preset)}
                                            className="text-[10px] px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary/10 hover:text-primary border border-surface-container-high transition-colors cursor-pointer text-left"
                                        >
                                            + {preset}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* MODAL 2: Edit Skema & Fitur Tier (UPDATE TIER) */}
                <Modal
                    isOpen={!!editingTier}
                    onClose={() => setEditingTier(null)}
                    title={`Edit Skema & Fitur: ${editingTier?.name || ''} (UPDATE)`}
                    subtitle="Perbarui harga asli, biaya admin Midtrans, kuota layanan, dan fitur unggulan."
                    icon="edit"
                    maxWidth="2xl"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingTier(null)}
                                disabled={editTierForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="edit-tier-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={editTierForm.processing}
                            >
                                Simpan Perubahan
                            </Button>
                        </div>
                    }
                >
                    <form id="edit-tier-form" onSubmit={handleEditTierSubmit} className="space-y-4">
                        <Input
                            label="Nama Paket Tier"
                            required
                            value={editTierForm.data.name}
                            onChange={(e) => editTierForm.setData('name', e.target.value)}
                            error={editTierForm.errors.name}
                        />

                        <Textarea
                            label="Deskripsi Paket"
                            value={editTierForm.data.description}
                            onChange={(e) => editTierForm.setData('description', e.target.value)}
                            error={editTierForm.errors.description}
                            rows={2}
                        />

                        {/* Pricing & Admin Fee Section */}
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/15 space-y-3">
                            <h4 className="font-heading font-black text-xs text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-teal-600">price_change</span>
                                <span>Skema Harga & Biaya Admin Gateway (Midtrans)</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Input
                                    label="Harga Asli (Rp)"
                                    type="number"
                                    min="0"
                                    required
                                    value={editTierForm.data.price}
                                    onChange={(e) => editTierForm.setData('price', parseFloat(e.target.value) || 0)}
                                    error={editTierForm.errors.price}
                                />

                                <Select
                                    label="Tipe Biaya Admin"
                                    required
                                    value={editTierForm.data.admin_fee_type}
                                    onChange={(e) => editTierForm.setData('admin_fee_type', e.target.value)}
                                    options={[
                                        { value: 'FIXED', label: 'Nominal Flat (Rp)' },
                                        { value: 'PERCENTAGE', label: 'Persentase (%)' },
                                    ]}
                                    error={editTierForm.errors.admin_fee_type}
                                />

                                <Input
                                    label={editTierForm.data.admin_fee_type === 'PERCENTAGE' ? 'Fee Admin (%)' : 'Fee Admin (Rp)'}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={editTierForm.data.admin_fee}
                                    onChange={(e) => editTierForm.setData('admin_fee', parseFloat(e.target.value) || 0)}
                                    error={editTierForm.errors.admin_fee}
                                />
                            </div>

                            {/* Live Calculation Preview Card */}
                            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <div>
                                    <span className="text-on-surface-variant block text-[11px]">Rincian Penagihan Pelanggan:</span>
                                    <span className="font-bold text-on-surface">
                                        Harga Asli (Rp {Number(editTierForm.data.price || 0).toLocaleString('id-ID')}) + Fee Admin (Rp {Math.round(editCalculatedAdminFee).toLocaleString('id-ID')})
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider block">Total Ditagihkan (Gross)</span>
                                    <span className="font-heading font-black text-base text-primary">
                                        Rp {Math.round(editGrossTotal).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quotas & Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                                label="Batas Konsultasi (-1 = Unlimited)"
                                type="number"
                                min="-1"
                                value={editTierForm.data.max_consultations}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    editTierForm.setData('max_consultations', val === '' ? 0 : parseInt(val, 10));
                                }}
                                error={editTierForm.errors.max_consultations}
                            />
                            <Input
                                label="Batas Scan Harian (-1 = Unlimited)"
                                type="number"
                                min="-1"
                                value={editTierForm.data.max_scanner}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    editTierForm.setData('max_scanner', val === '' ? -1 : parseInt(val, 10));
                                }}
                                error={editTierForm.errors.max_scanner}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                            <Input
                                label="Teks Lencana Khusus (Opsional)"
                                placeholder="Contoh: Akses Mandiri, VIP Pendampingan"
                                value={editTierForm.data.badge_text}
                                onChange={(e) => editTierForm.setData('badge_text', e.target.value)}
                                error={editTierForm.errors.badge_text}
                            />
                            <div className="pt-4">
                                <Switch
                                    label="Tandai Sebagai Paling Direkomendasikan"
                                    description="Menampilkan kartu tier dengan sorotan emas & border menyala"
                                    checked={editTierForm.data.is_popular}
                                    onChange={(checked) => editTierForm.setData('is_popular', checked)}
                                />
                            </div>
                        </div>

                        {/* Dynamic Features List Editor */}
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/15 space-y-3">
                            <h4 className="font-heading font-black text-xs text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-emerald-600">checklist</span>
                                <span>Fitur Unggulan Paket ({editTierForm.data.features.length})</span>
                            </h4>

                            {/* Input to Add Feature */}
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Ketik poin fitur unggulan baru..."
                                    value={editFeatureInput}
                                    onChange={(e) => setEditFeatureInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddEditFeature();
                                        }
                                    }}
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="md"
                                    leftIcon="add"
                                    onClick={() => handleAddEditFeature()}
                                >
                                    Tambah
                                </Button>
                            </div>

                            {/* Added Feature Pills */}
                            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                                {editTierForm.data.features.map((feat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-surface border border-primary/10 text-xs text-on-surface"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">
                                                check_circle
                                            </span>
                                            <span className="truncate">{feat}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEditFeature(idx)}
                                            className="p-1 rounded text-on-surface-variant hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                                            title="Hapus Fitur"
                                        >
                                            <span className="material-symbols-outlined text-[15px]">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Presets Chips */}
                            <div>
                                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block mb-1.5">
                                    Saran Fitur Siap Pakai (Klik untuk menambahkan):
                                </span>
                                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                                    {PRESET_FEATURES.filter((p) => !editTierForm.data.features.includes(p)).map((preset, pIdx) => (
                                        <button
                                            key={pIdx}
                                            type="button"
                                            onClick={() => handleAddEditFeature(preset)}
                                            className="text-[10px] px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary/10 hover:text-primary border border-surface-container-high transition-colors cursor-pointer text-left"
                                        >
                                            + {preset}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* MODAL 3: Assign / Berikan Langganan Member (CREATE SUBSCRIPTION) */}
                <Modal
                    isOpen={isAssignOpen}
                    onClose={() => setIsAssignOpen(false)}
                    title="Tetapkan Tingkatan Langganan Member (CREATE)"
                    subtitle="Pilih pengguna dan tetapkan tier keanggotaan (Silver, Gold, Platinum, dsb)."
                    icon="card_membership"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsAssignOpen(false)}
                                disabled={assignForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="assign-tier-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={assignForm.processing}
                            >
                                Tetapkan Tier
                            </Button>
                        </div>
                    }
                >
                    <form id="assign-tier-form" onSubmit={handleAssignSubmit} className="space-y-4">
                        <Select
                            label="Pilih Member"
                            required
                            value={assignForm.data.user_id}
                            onChange={(e) => assignForm.setData('user_id', e.target.value)}
                            error={assignForm.errors.user_id}
                            options={users.map((u) => ({ value: u.id, label: `${u.name} (${u.email})` }))}
                        />

                        <Select
                            label="Pilih Paket Tier"
                            required
                            value={assignForm.data.tier_id}
                            onChange={(e) => assignForm.setData('tier_id', e.target.value)}
                            error={assignForm.errors.tier_id}
                            options={tiers.map((t) => ({
                                value: t.id,
                                label: `${t.name} — Rp ${Number(t.price).toLocaleString('id-ID')} (Fee: Rp ${Number(t.calculated_admin_fee || 0).toLocaleString('id-ID')})`,
                            }))}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Status Langganan"
                                required
                                value={assignForm.data.status}
                                onChange={(e) => assignForm.setData('status', e.target.value)}
                                error={assignForm.errors.status}
                                options={[
                                    { value: 'ACTIVE', label: 'Aktif (ACTIVE)' },
                                    { value: 'SUSPENDED', label: 'Dibekukan (SUSPENDED)' },
                                ]}
                            />

                            <Input
                                label="Berlaku Sampai (Opsional)"
                                type="date"
                                value={assignForm.data.ends_at}
                                onChange={(e) => assignForm.setData('ends_at', e.target.value)}
                                error={assignForm.errors.ends_at}
                            />
                        </div>
                    </form>
                </Modal>

                {/* MODAL 4: Edit Status & Paket Langganan Member (UPDATE SUBSCRIPTION) */}
                <Modal
                    isOpen={!!editingSubscription}
                    onClose={() => setEditingSubscription(null)}
                    title={`Edit Langganan: ${editingSubscription?.user?.name || 'Member'} (UPDATE)`}
                    subtitle="Ubah tingkatan paket, status aktif/suspend, atau perpanjang masa berlaku."
                    icon="edit"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingSubscription(null)}
                                disabled={editSubForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="edit-sub-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={editSubForm.processing}
                            >
                                Simpan Perubahan
                            </Button>
                        </div>
                    }
                >
                    <form id="edit-sub-form" onSubmit={handleEditSubSubmit} className="space-y-4">
                        <Select
                            label="Pilih Paket Tier"
                            required
                            value={editSubForm.data.tier_id}
                            onChange={(e) => editSubForm.setData('tier_id', e.target.value)}
                            error={editSubForm.errors.tier_id}
                            options={tiers.map((t) => ({
                                value: t.id,
                                label: `${t.name} — Rp ${Number(t.price).toLocaleString('id-ID')} (Fee: Rp ${Number(t.calculated_admin_fee || 0).toLocaleString('id-ID')})`,
                            }))}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Status Langganan"
                                required
                                value={editSubForm.data.status}
                                onChange={(e) => editSubForm.setData('status', e.target.value)}
                                error={editSubForm.errors.status}
                                options={[
                                    { value: 'ACTIVE', label: 'Aktif (ACTIVE)' },
                                    { value: 'SUSPENDED', label: 'Dibekukan (SUSPENDED)' },
                                    { value: 'EXPIRED', label: 'Kedaluwarsa (EXPIRED)' },
                                ]}
                            />

                            <Input
                                label="Berlaku Sampai"
                                type="date"
                                value={editSubForm.data.ends_at}
                                onChange={(e) => editSubForm.setData('ends_at', e.target.value)}
                                error={editSubForm.errors.ends_at}
                            />
                        </div>
                    </form>
                </Modal>

                {/* MODAL 5: Delete Tier Confirmation Modal (DELETE TIER) */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingTier}
                    onClose={() => setDeletingTier(null)}
                    onConfirm={handleDeleteTierConfirm}
                    title="Hapus Paket Membership (DELETE)"
                    message={`Apakah Anda yakin ingin menghapus paket tier ini secara permanen? Jika ada pengguna aktif di tier ini, mereka akan otomatis dialihkan ke paket Silver.`}
                    itemName={deletingTier?.name ? `${deletingTier.name} (Rp ${Number(deletingTier.price).toLocaleString('id-ID')})` : ''}
                />

                {/* MODAL 6: Delete Subscription Confirmation Modal (DELETE SUBSCRIPTION) */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingSubscription}
                    onClose={() => setDeletingSubscription(null)}
                    onConfirm={handleDeleteSubConfirm}
                    title="Cabut & Hapus Langganan Member (DELETE)"
                    message="Apakah Anda yakin ingin mencabut dan menghapus data langganan member ini? Member tidak lagi memiliki akses ke fitur pada tier ini."
                    itemName={deletingSubscription ? `${deletingSubscription.user?.name} (${deletingSubscription.tier?.name})` : ''}
                />

                {/* MODAL 7: Delete Payment Confirmation Modal (DELETE MUTASI) */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingPayment}
                    onClose={() => setDeletingPayment(null)}
                    onConfirm={handleDeletePaymentConfirm}
                    title="Hapus Catatan Mutasi Transaksi (DELETE)"
                    message="Apakah Anda yakin ingin menghapus catatan mutasi transaksi SaaS ini dari riwayat?"
                    itemName={deletingPayment ? `${deletingPayment.order_id} - Rp ${Number(deletingPayment.gross_amount).toLocaleString('id-ID')}` : ''}
                />
            </div>
        </AdminLayout>
    );
}
