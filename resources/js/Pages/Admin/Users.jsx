import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';
import { Button, Avatar } from '@/Components/UI';

export default function Users({ users = { data: [], links: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/admin/users', { search, role }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, role]);

    const toggleStatus = (user) => {
        router.post(`/admin/users/${user.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const changeRole = (user, newRole) => {
        router.patch(`/admin/users/${user.id}/role`, { role: newRole }, {
            preserveScroll: true,
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
                        <p className="font-bold text-on-surface text-sm">{row.name}</p>
                        <p className="text-on-surface-variant font-label-mono text-[11px] mt-0.5">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'roles',
            label: 'Penugasan Peran',
            render: (row) => {
                const primaryRoleSlug = row.roles?.[0]?.slug || 'member';
                return (
                    <select
                        value={primaryRoleSlug}
                        onChange={(e) => changeRole(row, e.target.value)}
                        className="bg-white border border-primary/15 rounded-xl px-3 py-1.5 text-xs font-semibold focus:border-primary focus:outline-none text-primary cursor-pointer shadow-2xs transition-all hover:border-primary/30"
                    >
                        <option value="member">Member</option>
                        <option value="instructor">Instruktur</option>
                        <option value="admin">Admin</option>
                    </select>
                );
            },
        },
        {
            key: 'status',
            label: 'Status Akun',
            render: (row) => (
                <AdminBadge variant={row.status || 'ACTIVE'} pulse={row.status === 'ACTIVE'}>
                    {row.status || 'ACTIVE'}
                </AdminBadge>
            ),
        },
        {
            key: 'created_at',
            label: 'Terdaftar',
            render: (row) => (
                <span className="text-on-surface-variant font-label-mono text-[11px]">
                    {new Date(row.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                    <Button
                        type="button"
                        size="xs"
                        variant={isSuspended ? 'success' : 'destructive'}
                        leftIcon={isSuspended ? 'check_circle' : 'block'}
                        onClick={() => toggleStatus(row)}
                    >
                        {isSuspended ? 'Aktifkan' : 'Bekukan'}
                    </Button>
                );
            },
        },
    ];

    const activeFilterCount = (search ? 1 : 0) + (role ? 1 : 0);

    return (
        <AdminLayout activeNav="users" title="Manajemen Pengguna & Otorisasi">
            <Head title="Manajemen Pengguna & Otorisasi - Admin AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Manajemen Pengguna & Otorisasi"
                    subtitle="Kontrol penuh hak akses akun lintas peran (Admin, Instruktur, Member) serta status keaktifan akun dalam ekosistem AEVYRA."
                    icon="group"
                    badge={<AdminBadge variant="admin">RBAC & Multi-Role</AdminBadge>}
                />

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
                    ]}
                    activeCount={activeFilterCount}
                    onReset={() => {
                        setSearch('');
                        setRole('');
                    }}
                />

                {/* Reusable Data Table */}
                <AdminDataTable
                    columns={columns}
                    data={users}
                    emptyMessage="Tidak ada pengguna yang cocok dengan kriteria pencarian."
                    emptyIcon="person_search"
                />
            </div>
        </AdminLayout>
    );
}
