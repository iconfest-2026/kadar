import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Challenges({ challenges = { data: [], links: [] }, programs = [] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        goal_type: 'STEPS',
        duration_days: 7,
        points_reward: 100,
        program_id: '',
        status: 'PUBLISHED',
        starts_at: '',
        ends_at: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/challenges', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
            }
        });
    };

    return (
        <AdminLayout activeNav="challenges" title="Tantangan & Gamifikasi Kesehatan">
            <Head title="Challenge Komunitas — Admin Kadar" />
            <Head title="Challenge Komunitas — Admin AEVYRA" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[22px]">emoji_events</span>
                            <h2 className="text-xl font-heading font-bold text-primary">Tantangan Mikro Kebiasaan Sehat</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Dorong konsistensi member melalui gamifikasi berbasis poin, lencana, dan target aktivitas bertahap
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-2xl shadow-xs transition-all active:scale-95 self-start md:self-auto"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>Buat Challenge Baru</span>
                    </button>
                </div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {challenges.data.map(ch => (
                        <div 
                            key={ch.id}
                            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-primary/10 hover:border-primary/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-secondary-fixed/40 text-secondary-container border border-secondary/20 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">military_tech</span>
                                        +{ch.points_reward || 100} POIN
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/15">
                                        {ch.duration_days || 7} HARI
                                    </span>
                                </div>

                                <h3 className="font-heading font-bold text-lg text-primary tracking-tight mb-2">
                                    {ch.name}
                                </h3>
                                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                                    {ch.description || 'Tantangan konsistensi mikro untuk meningkatkan kebugaran dan metabolisme.'}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-primary/5 space-y-2 text-xs">
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">fitness_center</span>
                                        Kategori Sasaran:
                                    </span>
                                    <span className="font-label-mono font-bold text-primary">{ch.goal_type || 'Aktivitas Fisik'}</span>
                                </div>
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">group</span>
                                        Partisipan Aktif:
                                    </span>
                                    <span className="font-label-mono font-bold text-secondary">{ch.participations_count || 0} Member</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {challenges.data.length === 0 && (
                        <div className="col-span-full py-16 text-center text-on-surface-variant bg-white/75 backdrop-blur-md rounded-3xl border border-primary/10">
                            <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">emoji_events</span>
                            <p className="text-sm font-semibold text-on-surface">Belum ada tantangan aktif.</p>
                            <p className="text-xs text-on-surface-variant mt-1">Klik tombol "Buat Challenge Baru" untuk memulai tantangan kebiasaan.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {challenges.links && challenges.links.length > 3 && (
                    <div className="p-4 sm:p-5 flex flex-wrap gap-1.5 justify-center bg-white/40 backdrop-blur-md rounded-2xl border border-primary/10">
                        {challenges.links.map((link, k) => (
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

            {/* Modal Create Challenge */}
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
                                Buat Challenge Gamifikasi Baru
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
                                <label className="font-bold text-on-surface block mb-1">Nama Tantangan</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Jalan Kaki 7.000 Langkah 7 Hari Berturut-turut"
                                    className="w-full px-4 py-2.5 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                    required
                                />
                                {errors.name && <p className="text-rose-600 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Deskripsi Tantangan</label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Instruksi tugas harian, batas waktu pembuktian log, dan panduan..."
                                    className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Kategori Sasaran</label>
                                    <select
                                        value={data.goal_type}
                                        onChange={e => setData('goal_type', e.target.value)}
                                        className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs font-medium cursor-pointer"
                                    >
                                        <option value="STEPS">Langkah Kaki (Steps)</option>
                                        <option value="SLEEP">Rutinitas Tidur (Sleep)</option>
                                        <option value="NUTRITION">Kontrol Karbohidrat (Nutrition)</option>
                                        <option value="WATER">Hidrasi Teratur (Water)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Poin Imbalan (Reward)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.points_reward}
                                        onChange={e => setData('points_reward', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Durasi Hari</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.duration_days}
                                        onChange={e => setData('duration_days', parseInt(e.target.value) || 7)}
                                        className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Program Terkait (Opsional)</label>
                                    <select
                                        value={data.program_id}
                                        onChange={e => setData('program_id', e.target.value)}
                                        className="w-full px-4 py-2 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs font-medium cursor-pointer"
                                    >
                                        <option value="">Terbuka Untuk Umum</option>
                                        {programs.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
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
                                    Terbitkan Challenge
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

