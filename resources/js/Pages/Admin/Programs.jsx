import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Programs({ programs = { data: [], links: [] } }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
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
        setIsCreateOpen(true);
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
        setIsCreateOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProgram) {
            patch(`/admin/programs/${editingProgram.id}`, {
                onSuccess: () => {
                    setIsCreateOpen(false);
                    reset();
                }
            });
        } else {
            post('/admin/programs', {
                onSuccess: () => {
                    setIsCreateOpen(false);
                    reset();
                }
            });
        }
    };

    return (
        <AdminLayout activeNav="programs" title="Manajemen Program Kohor">
            <Head title="Program Kohor — Admin AEVYRA" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[22px]">inventory_2</span>
                            <h2 className="text-xl font-heading font-bold text-primary">Kurikulum & Program Kesehatan</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Kelola kohor kesehatan preventif, penugasan instruktur, dan kuota pendaftaran member
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-2xl shadow-xs transition-all active:scale-95 self-start md:self-auto"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>Buat Program Baru</span>
                    </button>
                </div>

                {/* Programs Grid / Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {programs.data.map(prog => (
                        <div 
                            key={prog.id}
                            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-primary/10 hover:border-primary/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/15">
                                        {prog.status || 'PUBLISHED'}
                                    </span>
                                    <button
                                        onClick={() => openEditModal(prog)}
                                        className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                                        title="Edit Program"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                </div>

                                <h3 className="font-heading font-bold text-lg text-primary tracking-tight mb-2">
                                    {prog.name}
                                </h3>
                                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                                    {prog.description || 'Program pembiasaan gaya hidup sehat berkelanjutan dengan pendampingan tim ahli.'}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-primary/5 space-y-2 text-xs">
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                                        Peserta Terdaftar:
                                    </span>
                                    <span className="font-label-mono font-bold text-primary">{prog.members_count || 0} Member</span>
                                </div>
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">school</span>
                                        Instruktur Pengampu:
                                    </span>
                                    <span className="font-label-mono font-bold text-secondary">{prog.instructors_count || 0} Tenaga Ahli</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {programs.data.length === 0 && (
                        <div className="col-span-full py-16 text-center text-on-surface-variant bg-white/75 backdrop-blur-md rounded-3xl border border-primary/10">
                            <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">inventory_2</span>
                            <p className="text-sm font-semibold text-on-surface">Belum ada program kohor.</p>
                            <p className="text-xs text-on-surface-variant mt-1">Klik tombol "Buat Program Baru" untuk membuat silabus pertama.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {programs.links && programs.links.length > 3 && (
                    <div className="p-4 sm:p-5 flex flex-wrap gap-1.5 justify-center bg-white/40 backdrop-blur-md rounded-2xl border border-primary/10">
                        {programs.links.map((link, k) => (
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

            {/* Modal Create / Edit Program */}
            {isCreateOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setIsCreateOpen(false)}
                >
                    <div 
                        className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-primary/15 shadow-2xl max-w-lg w-full p-6 space-y-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                            <h3 className="font-heading font-bold text-lg text-primary">
                                {editingProgram ? 'Ubah Informasi Program' : 'Buat Program Kohor Baru'}
                            </h3>
                            <button 
                                onClick={() => setIsCreateOpen(false)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">Nama Program</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Program Pemulihan Ritme Sirkadian 21 Hari"
                                    className="w-full px-4 py-2.5 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                    required
                                />
                                {errors.name && <p className="text-rose-600 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Deskripsi Silabus</label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Rincian target kesehatan, jadwal evaluasi, dan modul edukasi..."
                                    className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Tanggal Mulai</label>
                                    <input
                                        type="date"
                                        value={data.starts_at}
                                        onChange={e => setData('starts_at', e.target.value)}
                                        className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Status Publikasi</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs cursor-pointer font-medium"
                                    >
                                        <option value="DRAFT">DRAFT (Penyusunan)</option>
                                        <option value="PUBLISHED">PUBLISHED (Aktif)</option>
                                        <option value="ARCHIVED">ARCHIVED (Arsip)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-primary/10">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-white border border-primary/15 text-on-surface font-semibold hover:bg-primary/5 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-xs transition-all disabled:opacity-50"
                                >
                                    {editingProgram ? 'Simpan Perubahan' : 'Terbitkan Program'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

