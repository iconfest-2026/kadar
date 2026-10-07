import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Select, Avatar, DropdownAction } from '@/Components/UI';

export default function Users({
    users = { data: [], links: [] },
    roles = [],
    stats = {},
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [status, setStatus] = useState(filters.status || '');

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    // Form for Create
    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'member',
        status: 'ACTIVE',
    });

    // Form for Edit
    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'member',
        status: 'ACTIVE',
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/users',
                { search, role, status },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, role, status]);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/users', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        editForm.setData({
            name: user.name || '',
            email: user.email || '',
            password: '',
            role: user.roles?.[0]?.slug || 'member',
            status: user.status || 'ACTIVE',
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingUser) return;
        editForm.put(`/admin/users/${editingUser.id}`, {
            onSuccess: () => {
                setEditingUser(null);
                editForm.reset();
            },
        });
    };

    const toggleStatus = (user) => {
        router.post(`/admin/users/${user.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingUser) return;
        router.delete(`/admin/users/${deletingUser.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingUser(null),
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Identitas Pengguna',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar name={row.name} size="sm" />
                    <div>
                        <p className="font-bold text-on-surface text-xs sm:text-sm">{row.name}</p>
                        <p className="text-on-surface-variant font-label-mono text-[10px] sm:text-[11px] mt-0.5">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'roles',
            label: 'Peran Akun',
            render: (row) => {
                const primaryRoleSlug = row.roles?.[0]?.slug || 'member';
                return (
                    <AdminBadge variant={primaryRoleSlug} size="xs">
                        {primaryRoleSlug.toUpperCase()}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'status',
            label: 'Status Akun',
            render: (row) => (
                <AdminBadge variant={row.status || 'ACTIVE'} pulse={row.status === 'ACTIVE'}>
                    {row.status === 'ACTIVE'
                        ? 'Aktif'
                        : row.status === 'SUSPENDED'
                        ? 'Dibekukan'
                        : row.status ? row.status.replace(/_/g, ' ') : 'Aktif'}
                </AdminBadge>
            ),
        },
        {
            key: 'created_at',
            label: 'Terdaftar',
            render: (row) => (
                <span className="text-on-surface-variant font-label-mono text-[11px]">
                    {new Date(row.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Tindakan',
            align: 'right',
            render: (row) => {
                const isSuspended = row.status === 'SUSPENDED';
                return (
                    <div className="flex items-center justify-end">
                        <DropdownAction
                            onEdit={() => openEditModal(row)}
                            editLabel="Edit Pengguna"
                            onDelete={() => setDeletingUser(row)}
                            deleteLabel="Hapus Akun"
                            customActions={[
                                {
                                    key: 'toggle-status',
                                    label: isSuspended ? 'Aktifkan Akun' : 'Bekukan Akun',
                                    icon: isSuspended ? 'check_circle' : 'block',
                                    onClick: () => toggleStatus(row),
                                    variant: isSuspended ? 'success' : 'warning',
                                },
                            ]}
                        />
                    </div>
                );
            },
        },
    ];

    const activeFilterCount = (search ? 1 : 0) + (role ? 1 : 0) + (status ? 1 : 0);

    return (
        <AdminLayout activeNav="users" title="Manajemen Pengguna & Otorisasi">
            <Head title="Manajemen Pengguna & Otorisasi - Admin AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Manajemen Pengguna & Otorisasi"
                    subtitle="Kelola pengguna lintas peran (Admin, Instruktur, Member), tetapkan peran, atur status akun, dan kontrol akses sistem."
                    icon="group"
                    badge={<AdminBadge variant="admin">RBAC & Dynamic CRUD</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="person_add"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Tambah Pengguna Baru
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    <AdminStatCard
                        title="Total Pengguna"
                        value={stats.totalUsers || 0}
                        icon="people"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Member Aktif"
                        value={stats.memberCount || 0}
                        icon="person"
                        accent="emerald"
                    />
                    <AdminStatCard
                        title="Instruktur"
                        value={stats.instructorCount || 0}
                        icon="medical_services"
                        accent="teal"
                    />
                    <AdminStatCard
                        title="Administrator"
                        value={stats.adminCount || 0}
                        icon="admin_panel_settings"
                        accent="indigo"
                    />
                    <AdminStatCard
                        title="Akun Aktif"
                        value={stats.activeUsers || 0}
                        icon="check_circle"
                        accent="emerald"
                    />
                    <AdminStatCard
                        title="Dibekukan"
                        value={stats.suspendedUsers || 0}
                        icon="block"
                        accent="rose"
                    />
                </div>

                {/* Reusable Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari nama pengguna atau email..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            value: role,
                            onChange: setRole,
                            options: [
                                { label: 'Semua Peran', value: '' },
                                { label: 'Administrator', value: 'admin' },
                                { label: 'Instruktur', value: 'instructor' },
                                { label: 'Member', value: 'member' },
                            ],
                        },
                        {
                            value: status,
                            onChange: setStatus,
                            options: [
                                { label: 'Semua Status', value: '' },
                                { label: 'Aktif', value: 'ACTIVE' },
                                { label: 'Dibekukan', value: 'SUSPENDED' },
                                { label: 'Menunggu Verifikasi', value: 'PENDING_VERIFICATION' },
                            ],
                        },
                    ]}
                    activeCount={activeFilterCount}
                    onReset={() => {
                        setSearch('');
                        setRole('');
                        setStatus('');
                    }}
                />

                {/* Reusable Table Component */}
                <Table
                    columns={columns}
                    data={users}
                    emptyMessage="Tidak ada pengguna yang cocok dengan kriteria pencarian."
                    emptyIcon="person_search"
                />

                {/* Create User Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Tambah Pengguna Baru"
                    subtitle="Daftarkan akun pengguna baru ke dalam platform kesehatan AEVYRA."
                    icon="person_add"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsCreateOpen(false)}
                                disabled={createForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="create-user-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createForm.processing}
                            >
                                Simpan Pengguna
                            </Button>
                        </div>
                    }
                >
                    <form id="create-user-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        <Input
                            label="Nama Lengkap"
                            placeholder="Contoh: dr. Nabila Sarah / Budi Santoso"
                            required
                            value={createForm.data.name}
                            onChange={(e) => createForm.setData('name', e.target.value)}
                            error={createForm.errors.name}
                            leftIcon="badge"
                        />

                        <Input
                            label="Alamat Email"
                            type="email"
                            placeholder="contoh@aevyra.health"
                            required
                            value={createForm.data.email}
                            onChange={(e) => createForm.setData('email', e.target.value)}
                            error={createForm.errors.email}
                            leftIcon="mail"
                        />

                        <Input
                            label="Kata Sandi Awal"
                            type="password"
                            placeholder="Minimal 8 karakter aman"
                            required
                            value={createForm.data.password}
                            onChange={(e) => createForm.setData('password', e.target.value)}
                            error={createForm.errors.password}
                            leftIcon="lock"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Peran (Role)"
                                value={createForm.data.role}
                                onChange={(e) => createForm.setData('role', e.target.value)}
                                error={createForm.errors.role}
                                options={[
                                    { value: 'member', label: 'Member' },
                                    { value: 'instructor', label: 'Instruktur Medis' },
                                    { value: 'admin', label: 'Administrator' },
                                ]}
                            />

                            <Select
                                label="Status Awal"
                                value={createForm.data.status}
                                onChange={(e) => createForm.setData('status', e.target.value)}
                                error={createForm.errors.status}
                                options={[
                                    { value: 'ACTIVE', label: 'Aktif' },
                                    { value: 'SUSPENDED', label: 'Dibekukan' },
                                    { value: 'PENDING_VERIFICATION', label: 'Menunggu Verifikasi' },
                                ]}
                            />
                        </div>
                    </form>
                </Modal>

                {/* Edit User Modal */}
                <Modal
                    isOpen={!!editingUser}
                    onClose={() => setEditingUser(null)}
                    title={`Edit Pengguna: ${editingUser?.name || ''}`}
                    subtitle="Perbarui data identitas, peran, status, atau reset kata sandi."
                    icon="edit"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingUser(null)}
                                disabled={editForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="edit-user-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={editForm.processing}
                            >
                                Perbarui Data
                            </Button>
                        </div>
                    }
                >
                    <form id="edit-user-form" onSubmit={handleEditSubmit} className="space-y-4">
                        <Input
                            label="Nama Lengkap"
                            required
                            value={editForm.data.name}
                            onChange={(e) => editForm.setData('name', e.target.value)}
                            error={editForm.errors.name}
                            leftIcon="badge"
                        />

                        <Input
                            label="Alamat Email"
                            type="email"
                            required
                            value={editForm.data.email}
                            onChange={(e) => editForm.setData('email', e.target.value)}
                            error={editForm.errors.email}
                            leftIcon="mail"
                        />

                        <Input
                            label="Kata Sandi Baru (Kosongkan jika tidak diubah)"
                            type="password"
                            placeholder="Biarkan kosong untuk mempertahankan sandi lama"
                            value={editForm.data.password}
                            onChange={(e) => editForm.setData('password', e.target.value)}
                            error={editForm.errors.password}
                            leftIcon="lock_reset"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Peran (Role)"
                                value={editForm.data.role}
                                onChange={(e) => editForm.setData('role', e.target.value)}
                                error={editForm.errors.role}
                                options={[
                                    { value: 'member', label: 'Member' },
                                    { value: 'instructor', label: 'Instruktur Medis' },
                                    { value: 'admin', label: 'Administrator' },
                                ]}
                            />

                            <Select
                                label="Status Akun"
                                value={editForm.data.status}
                                onChange={(e) => editForm.setData('status', e.target.value)}
                                error={editForm.errors.status}
                                options={[
                                    { value: 'ACTIVE', label: 'Aktif' },
                                    { value: 'SUSPENDED', label: 'Dibekukan' },
                                    { value: 'PENDING_VERIFICATION', label: 'Menunggu Verifikasi' },
                                ]}
                            />
                        </div>
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingUser}
                    onClose={() => setDeletingUser(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Akun Pengguna"
                    message="Apakah Anda yakin ingin menghapus akun pengguna ini secara permanen dari basis data sistem? Semua riwayat penugasan peran akan dicabut."
                    itemName={deletingUser ? `${deletingUser.name} (${deletingUser.email})` : ''}
                />
            </div>
        </AdminLayout>
    );
}
