import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminModal from '@/Components/Admin/AdminModal';
import { Button, Input, Textarea, Select } from '@/Components/UI';

export default function Programs({ programs = { data: [], links: [] } }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: '',
        description: '',
        status: 'PUBLISHED',
        starts_at: '',
        ends_at: '',
    });

    const openCreateModal = () => {
        reset();
        setEditingProgram(null);
        setIsModalOpen(true);
    };

    const openEditModal = (prog) => {
        setEditingProgram(prog);
        setData({
            name: prog.name,
            description: prog.description || '',
            status: prog.status || 'PUBLISHED',
            starts_at: prog.starts_at ? prog.starts_at.split('T')[0] : '',
            ends_at: prog.ends_at ? prog.ends_at.split('T')[0] : '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProgram) {
            patch(`/admin/programs/${editingProgram.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/programs', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <AdminLayout activeNav="programs" title="Program Kohor Kesehatan">
            <Head title="Program Kohor Kesehatan — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Kurikulum & Program Kohor Kesehatan"
                    subtitle="Kelola program pembiasaan gaya hidup terstruktur (7/14/21/30 hari), alokasi tim instruktur pengampu, dan kuota kohor peserta."
                    icon="inventory_2"
                    badge={<AdminBadge variant="indigo">Structured Cohorts</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="add"
                            onClick={openCreateModal}
                        >
                            Buat Program Baru
                        </Button>
                    }
                />

                {/* Programs Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {programs.data.map((prog) => (
                        <div
                            key={prog.id}
                            className="bg-white/95 rounded-3xl p-6 border border-primary/15 hover:border-primary/35 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <AdminBadge variant={prog.status === 'PUBLISHED' ? 'published' : 'draft'}>
                                        {prog.status || 'PUBLISHED'}
                                    </AdminBadge>
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(prog)}
                                        className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                                        title="Edit Program"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                </div>

                                <h3 className="font-heading font-bold text-base text-primary tracking-tight mb-2">
                                    {prog.name}
                                </h3>
                                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                                    {prog.description || 'Program pembiasaan gaya hidup sehat berkelanjutan dengan pendampingan tim ahli.'}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-primary/10 space-y-2 text-xs">
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                                        Peserta Terdaftar:
                                    </span>
                                    <span className="font-label-mono font-bold text-primary">{prog.members_count || 0} Member</span>
                                </div>
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-teal-600">verified_user</span>
                                        Instruktur Pengampu:
                                    </span>
                                    <span className="font-label-mono font-bold text-teal-700">{prog.instructors_count || 0} Tenaga Ahli</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {programs.data.length === 0 && (
                        <div className="col-span-full py-16 text-center text-on-surface-variant bg-white/95 rounded-3xl border border-primary/15">
                            <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">inventory_2</span>
                            <p className="text-sm font-semibold text-on-surface">Belum ada program kohor.</p>
                            <p className="text-xs text-on-surface-variant mt-1">Klik tombol "Buat Program Baru" untuk membuat kurikulum pertama.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {programs.links && programs.links.length > 3 && (
                    <div className="p-4 sm:p-5 flex flex-wrap gap-1.5 justify-center bg-white/80 rounded-2xl border border-primary/15">
                        {programs.links.map((link, k) => (
                            link.url ? (
                                <Link
                                    key={k}
                                    href={link.url}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                                        link.active
                                            ? 'bg-primary text-white border-primary shadow-xs'
                                            : 'bg-white border-primary/15 text-on-surface hover:bg-primary/5 hover:border-primary/30'
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

                {/* Modal Create / Edit */}
                <AdminModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingProgram ? 'Ubah Informasi Program' : 'Buat Program Kohor Baru'}
                    subtitle="Susun nama kurikulum, deskripsi sasaran kesehatan, dan status publikasi."
                    icon="inventory_2"
                >
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        <Input
                            label="Nama Program"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Program Pemulihan Ritme Sirkadian 21 Hari"
                            error={errors.name}
                        />

                        <Textarea
                            label="Deskripsi Silabus"
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Rincian target kesehatan, jadwal evaluasi, dan modul edukasi..."
                            error={errors.description}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Tanggal Mulai"
                                type="date"
                                value={data.starts_at}
                                onChange={(e) => setData('starts_at', e.target.value)}
                                error={errors.starts_at}
                            />

                            <Select
                                label="Status Publikasi"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                options={[
                                    { value: 'DRAFT', label: 'DRAFT (Penyusunan)' },
                                    { value: 'PUBLISHED', label: 'PUBLISHED (Aktif)' },
                                    { value: 'ARCHIVED', label: 'ARCHIVED (Arsip)' },
                                ]}
                            />
                        </div>

                        <div className="flex justify-end gap-2.5 pt-4 border-t border-primary/10">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="sm"
                                loading={processing}
                            >
                                {editingProgram ? 'Simpan Perubahan' : 'Terbitkan Program'}
                            </Button>
                        </div>
                    </form>
                </AdminModal>
            </div>
        </AdminLayout>
    );
}
