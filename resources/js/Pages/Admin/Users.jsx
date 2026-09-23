import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Users({ users = { data: [], links: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/admin/users', { search, role }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, role]);

    const toggleStatus = (user) => {
        router.post(`/admin/users/${user.id}/toggle-status`, {}, {
            preserveScroll: true
        });
    };

    const changeRole = (user, newRole) => {
        router.patch(`/admin/users/${user.id}/role`, { role: newRole }, {
            preserveScroll: true
        });
    };

    const renderUserStatusBadge = (status) => {
        const norm = status || 'ACTIVE';
        if (norm === 'ACTIVE') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    AKTIF
                </span>
            );
        }
        if (norm === 'PENDING') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    PENDING
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-rose-50 text-rose-800 border border-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                DITANGGUHKAN
            </span>
        );
    };

    return (
        <AdminLayout activeNav="users" title="Manajemen Pengguna & Otorisasi">
            <Head title="Manajemen Pengguna — Admin AEVYRA" />
            
            <div className="space-y-6">
                {/* Action Bar with Glassmorphic Search & Filters */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-heading font-bold text-primary">Daftar Akun Pengguna</h2>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Kontrol hak akses peran (Admin, Instruktur, Member) dan status operasional akun
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-64">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/50 text-[18px]">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Cari nama atau email..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-primary/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs text-on-surface transition-all placeholder:text-on-surface-variant/50"
                            />
                        </div>

                        {/* Role Filter */}
                        <div className="relative">
                            <select
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                className="w-full sm:w-auto px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-primary/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs text-on-surface font-medium transition-all cursor-pointer"
                            >
                                <option value="">Semua Peran</option>
                                <option value="admin">Administrator</option>
                                <option value="instructor">Instruktur</option>
                                <option value="member">Member</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-primary/3 text-on-surface-variant font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6">Identitas Pengguna</th>
                                    <th className="py-4 px-6">Penugasan Peran</th>
                                    <th className="py-4 px-6">Status Akun</th>
                                    <th className="py-4 px-6">Waktu Registrasi</th>
                                    <th className="py-4 px-6 text-right">Tindakan Otorisasi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {users.data.map(user => {
                                    const primaryRoleSlug = user.roles?.[0]?.slug || 'member';
                                    const isSuspended = user.status === 'SUSPENDED';

                                    return (
                                        <tr key={user.id} className="hover:bg-primary/2 transition-colors">
                                            {/* User Info */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary font-heading font-black flex items-center justify-center text-sm shadow-xs">
                                                        {user.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface text-sm">{user.name}</div>
                                                        <div className="text-on-surface-variant font-label-mono text-[11px] mt-0.5">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role Selector */}
                                            <td className="py-4 px-6">
                                                <select
                                                    value={primaryRoleSlug}
                                                    onChange={(e) => changeRole(user, e.target.value)}
                                                    className="bg-white/90 border border-primary/15 rounded-xl px-3 py-1.5 text-xs font-semibold focus:border-primary focus:outline-none text-primary cursor-pointer shadow-xs transition-all hover:border-primary/30"
                                                >
                                                    <option value="member">Member</option>
                                                    <option value="instructor">Instruktur</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-6">
                                                {renderUserStatusBadge(user.status)}
                                            </td>

                                            {/* Registered Date */}
                                            <td className="py-4 px-6 text-on-surface-variant font-label-mono">
                                                {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    onClick={() => toggleStatus(user)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                                                        isSuspended
                                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                                        : 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-200'
                                                    }`}
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        {isSuspended ? 'check_circle' : 'block'}
                                                    </span>
                                                    {isSuspended ? 'Aktifkan Kembali' : 'Bekukan Akun'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">person_search</span>
                                                <p className="text-sm font-semibold text-on-surface">Tidak ada pengguna yang cocok.</p>
                                                <p className="text-xs text-on-surface-variant mt-1">Coba sesuaikan kata kunci pencarian atau filter peran.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Glassmorphic Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="p-4 sm:p-5 border-t border-primary/10 flex flex-wrap gap-1.5 justify-center bg-white/40">
                            {users.links.map((link, k) => (
                                link.url ? (
                                    <Link
                                        key={k}
                                        href={link.url}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                                            link.active 
                                            ? 'bg-primary text-white border-primary shadow-xs' 
                                            : 'bg-white/80 border-primary/15 text-on-surface hover:bg-primary/5 hover:border-primary/30'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={k}
                                        className="px-3 py-1.5 rounded-xl border border-primary/10 text-on-surface-variant/40 bg-white/40 text-xs font-medium cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
