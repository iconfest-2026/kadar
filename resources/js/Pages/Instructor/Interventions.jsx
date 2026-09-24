import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function Interventions({
    interventions = { data: [], links: [] },
    assignedMembers = [],
    filters = {},
}) {
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const createForm = useForm({
        user_id: assignedMembers[0]?.id || '',
        type: 'NUTRITION',
        title: '',
        description: '',
        start_at: new Date().toISOString().split('T')[0],
        due_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    useEffect(() => {
        router.get(
            '/instructor/interventions',
            { status: statusFilter },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, [statusFilter]);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/instructor/interventions', {
            preserveScroll: true,
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();
            },
        });
    };

    const updateStatus = (intervention, newStatus) => {
        router.patch(
            `/instructor/interventions/${intervention.id}`,
            { status: newStatus },
            {
                preserveScroll: true,
            }
        );
    };

    const items = interventions.data || [];
    const activeCount = items.filter((i) => i.status === 'ACTIVE').length;
    const completedCount = items.filter((i) => i.status === 'COMPLETED').length;
    const pausedCount = items.filter((i) => i.status === 'PAUSED').length;

    return (
        <InstructorLayout activeNav="interventions" title="Rencana Intervensi Perilaku (HBE)">
            <Head title="Rencana Intervensi — Instruktur AEVYRA" />

            <div className="space-y-6">
                {/* Header & Main Actions */}
                <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[24px]">clinical_notes</span>
                            <h1 className="font-heading font-black text-xl text-on-surface">
                                Daftar Rencana Intervensi Perilaku
                            </h1>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                            Pantau target kebiasaan mikro, evaluasi kepatuhan member, dan terbitkan arahan bimbingan baru
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium cursor-pointer"
                        >
                            <option value="">Semua Status Intervensi</option>
                            <option value="ACTIVE">ACTIVE (Sedang Berjalan)</option>
                            <option value="COMPLETED">COMPLETED (Selesai)</option>
                            <option value="PAUSED">PAUSED (Dijeda)</option>
                            <option value="DRAFT">DRAFT (Penyusunan)</option>
                        </select>

                        <button
                            type="button"
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-2xs transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            <span>Buat Intervensi</span>
                        </button>
                    </div>
                </div>

                {/* Stat Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Total Intervensi</span>
                        <div className="text-2xl font-heading font-black text-primary font-mono">
                            {items.length}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Dalam filter saat ini</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Aktif Berjalan</span>
                        <div className="text-2xl font-heading font-black text-emerald-700 dark:text-emerald-400 font-mono">
                            {activeCount}
                        </div>
                        <span className="text-[10px] text-emerald-600 block">Sedang dipraktikkan member</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Tercapai & Selesai</span>
                        <div className="text-2xl font-heading font-black text-primary font-mono">
                            {completedCount}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Protokol berhasil dipenuhi</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Dijeda / Evaluasi</span>
                        <div className="text-2xl font-heading font-black text-amber-700 dark:text-amber-400 font-mono">
                            {pausedCount}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Perlu penyesuaian target</span>
                    </div>
                </div>

                {/* Interventions Table Card */}
                <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-surface-container font-label-mono text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-6">Member Sasaran</th>
                                    <th className="py-3.5 px-6">Judul Intervensi</th>
                                    <th className="py-3.5 px-6">Kategori</th>
                                    <th className="py-3.5 px-6">Status Progres</th>
                                    <th className="py-3.5 px-6">Target Waktu</th>
                                    <th className="py-3.5 px-6 text-right">Pembaruan Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {items.map((inv) => {
                                    const isActive = inv.status === 'ACTIVE';
                                    const isCompleted = inv.status === 'COMPLETED';
                                    const isPaused = inv.status === 'PAUSED';

                                    return (
                                        <tr key={inv.id} className="hover:bg-surface-container-low/60 transition-colors">
                                            {/* Member */}
                                            <td className="py-4 px-6">
                                                <Link
                                                    href={`/instructor/members/${inv.user_id}`}
                                                    className="font-bold text-on-surface text-sm hover:text-primary transition-colors cursor-pointer"
                                                >
                                                    {inv.user?.name || 'Member Terbina'}
                                                </Link>
                                                <div className="text-on-surface-variant font-mono text-[11px]">
                                                    {inv.user?.email || '-'}
                                                </div>
                                            </td>

                                            {/* Title & Description */}
                                            <td className="py-4 px-6 max-w-xs">
                                                <div className="font-bold text-primary text-xs">{inv.title}</div>
                                                <div className="text-on-surface-variant text-[11px] line-clamp-1 mt-0.5">
                                                    {inv.description}
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="py-4 px-6">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/20">
                                                    {inv.type === 'NUTRITION'
                                                        ? 'Nutrisi & Pola Makan'
                                                        : inv.type === 'PHYSICAL_ACTIVITY'
                                                        ? 'Aktivitas Fisik'
                                                        : inv.type === 'SLEEP_CIRCADIAN'
                                                        ? 'Pemulihan Tidur'
                                                        : inv.type === 'STRESS_MANAGEMENT'
                                                        ? 'Manajemen Stres'
                                                        : inv.type === 'HYDRATION'
                                                        ? 'Target Hidrasi'
                                                        : (inv.type ? inv.type.replace(/_/g, ' ') : 'Nutrisi')}
                                                </span>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                    isActive
                                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                                                        : isCompleted
                                                        ? 'bg-primary/10 text-primary border-primary/20'
                                                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        isActive ? 'bg-emerald-500' : isCompleted ? 'bg-primary' : 'bg-amber-500'
                                                    }`} />
                                                    <span>
                                                        {isActive
                                                            ? 'Sedang Berjalan'
                                                            : isCompleted
                                                            ? 'Selesai'
                                                            : isPaused
                                                            ? 'Dijeda'
                                                            : (inv.status ? inv.status.replace(/_/g, ' ') : 'Aktif')}
                                                    </span>
                                                </span>
                                            </td>

                                            {/* Due Date */}
                                            <td className="py-4 px-6 text-on-surface-variant font-mono text-[11px]">
                                                {inv.due_at
                                                    ? new Date(inv.due_at).toLocaleDateString('id-ID', {
                                                          day: 'numeric',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : '7 Hari'}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right space-x-2">
                                                {isActive && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateStatus(inv, 'COMPLETED')}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">done_all</span>
                                                            <span>Selesai</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateStatus(inv, 'PAUSED')}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-amber-700 dark:text-amber-300 border border-surface-container font-bold text-xs transition-all shadow-2xs cursor-pointer"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">pause</span>
                                                            <span>Jeda</span>
                                                        </button>
                                                    </>
                                                )}
                                                {isPaused && (
                                                    <button
                                                        type="button"
                                                        onClick={() => updateStatus(inv, 'ACTIVE')}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs transition-all shadow-2xs cursor-pointer"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                                                        <span>Lanjutkan</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {items.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">assignment_late</span>
                                                <p className="text-xs font-semibold text-on-surface">Belum ada rencana intervensi.</p>
                                                <p className="text-[11px] text-on-surface-variant">
                                                    Gunakan tombol "Buat Intervensi" untuk menerbitkan tugas mikro baru.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {interventions.links && interventions.links.length > 3 && (
                        <div className="p-4 border-t border-surface-container flex items-center justify-center gap-1.5 bg-surface-container-low">
                            {interventions.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                                        link.active
                                            ? 'bg-primary text-white shadow-2xs'
                                            : !link.url
                                            ? 'opacity-40 cursor-not-allowed text-on-surface-variant'
                                            : 'bg-white dark:bg-surface border border-surface-container text-on-surface hover:bg-surface-container-high'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL: Buat Intervensi Baru */}
            {showCreateModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setShowCreateModal(false)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">
                                    Terbitkan Rencana Intervensi Baru
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Pilih member binaan dan tentukan instruksi protokol mikro
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">Member Binaan Sasaran</label>
                                <select
                                    value={createForm.data.user_id}
                                    onChange={(e) => createForm.setData('user_id', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium cursor-pointer"
                                    required
                                >
                                    {assignedMembers.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name} ({m.email})
                                        </option>
                                    ))}
                                    {assignedMembers.length === 0 && (
                                        <option value="">Tidak ada member binaan aktif</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Kategori Intervensi (HBE)</label>
                                <select
                                    value={createForm.data.type}
                                    onChange={(e) => createForm.setData('type', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium cursor-pointer"
                                >
                                    <option value="NUTRITION">Nutrisi & Pola Makan (DQS)</option>
                                    <option value="PHYSICAL_ACTIVITY">Aktivitas Fisik & Langkah Harian</option>
                                    <option value="SLEEP_CIRCADIAN">Ritme Sirkadian & Durasi Tidur</option>
                                    <option value="STRESS_MANAGEMENT">Manajemen Stres & Relaksasi</option>
                                    <option value="HYDRATION">Target Hidrasi & Kepatuhan</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Judul Protokol Tugas Mikro</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Konsumsi 2 Porsi Sayur Kaya Serat Saat Santap Siang"
                                    value={createForm.data.title}
                                    onChange={(e) => createForm.setData('title', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Instruksi & Penjelasan Klinis</label>
                                <textarea
                                    rows="4"
                                    placeholder="Jelaskan secara spesifik aksi harian yang perlu dilakukan dan mekanisme fisiologisnya..."
                                    value={createForm.data.description}
                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Tanggal Mulai</label>
                                    <input
                                        type="date"
                                        value={createForm.data.start_at}
                                        onChange={(e) => createForm.setData('start_at', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Target Tenggat Waktu</label>
                                    <input
                                        type="date"
                                        value={createForm.data.due_at}
                                        onChange={(e) => createForm.setData('due_at', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing || assignedMembers.length === 0}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {createForm.processing ? 'Menyimpan...' : 'Terbitkan Intervensi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </InstructorLayout>
    );
}
