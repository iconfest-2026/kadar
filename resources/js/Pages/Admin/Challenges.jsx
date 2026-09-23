import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminModal from '@/Components/Admin/AdminModal';
import { Button, Input, Textarea, Select } from '@/Components/UI';

export default function Challenges({ challenges = { data: [], links: [] }, programs = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                setIsModalOpen(false);
                reset();
            },
        });
    };

    return (

        <AdminLayout activeNav="challenges" title="Tantangan & Gamifikasi Kesehatan">
            <Head title="Challenge Komunitas — Admin AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Tantangan Komunitas & Gamifikasi Mikro-Kebiasaan"
                    subtitle="Dorong keterikatan dan konsistensi member melalui target harian gamifikasi bertingkat, imbalan poin, dan lencana pencapaian."
                    icon="emoji_events"
                    badge={<AdminBadge variant="amber">Gamified Challenges</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="add"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Buat Challenge Baru
                        </Button>
                    }
                />

                {/* Challenges Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {challenges.data.map((ch) => (
                        <div
                            key={ch.id}
                            className="bg-white/95 rounded-3xl p-6 border border-primary/15 hover:border-primary/35 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <AdminBadge variant="gold" size="xs">
                                        +{ch.points_reward || 100} POIN
                                    </AdminBadge>
                                    <AdminBadge variant="primary" size="xs">
                                        {ch.duration_days || 7} HARI
                                    </AdminBadge>
                                </div>

                                <h3 className="font-heading font-bold text-base text-primary tracking-tight mb-2">
                                    {ch.name}
                                </h3>
                                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                                    {ch.description || 'Tantangan konsistensi mikro untuk meningkatkan kebugaran dan metabolisme.'}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-primary/10 space-y-2 text-xs">
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">fitness_center</span>
                                        Kategori Sasaran:
                                    </span>
                                    <span className="font-label-mono font-bold text-primary">{ch.goal_type || 'Aktivitas Fisik'}</span>
                                </div>
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-teal-600">group</span>
                                        Partisipan Aktif:
                                    </span>
                                    <span className="font-label-mono font-bold text-teal-700">{ch.participations_count || 0} Member</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {challenges.data.length === 0 && (
                        <div className="col-span-full py-16 text-center text-on-surface-variant bg-white/95 rounded-3xl border border-primary/15">
                            <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">emoji_events</span>
                            <p className="text-sm font-semibold text-on-surface">Belum ada tantangan aktif.</p>
                            <p className="text-xs text-on-surface-variant mt-1">Klik tombol "Buat Challenge Baru" untuk memulai tantangan kebiasaan.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {challenges.links && challenges.links.length > 3 && (
                    <div className="p-4 sm:p-5 flex flex-wrap gap-1.5 justify-center bg-white/80 rounded-2xl border border-primary/15">
                        {challenges.links.map((link, k) => (
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

                {/* Modal Create */}
                <AdminModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Buat Challenge Gamifikasi Baru"
                    subtitle="Tentukan target mikro-kebiasaan, durasi hari, dan alokasi poin reward."
                    icon="emoji_events"
                >
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        <Input
                            label="Nama Tantangan"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Jalan Kaki 7.000 Langkah 7 Hari Berturut-turut"
                            error={errors.name}
                        />

                        <Textarea
                            label="Deskripsi Tantangan"
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Instruksi tugas harian, batas waktu pembuktian log, dan panduan..."
                            error={errors.description}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Kategori Sasaran"
                                value={data.goal_type}
                                onChange={(e) => setData('goal_type', e.target.value)}
                                options={[
                                    { value: 'STEPS', label: 'Langkah Kaki (Steps)' },
                                    { value: 'SLEEP', label: 'Rutinitas Tidur (Sleep)' },
                                    { value: 'NUTRITION', label: 'Kontrol Karbohidrat (Nutrition)' },
                                    { value: 'WATER', label: 'Hidrasi Teratur (Water)' },
                                ]}
                            />

                            <Input
                                label="Poin Imbalan (Reward)"
                                type="number"
                                min="0"
                                value={data.points_reward}
                                onChange={(e) => setData('points_reward', parseInt(e.target.value) || 0)}
                                error={errors.points_reward}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Durasi Hari"
                                type="number"
                                min="1"
                                value={data.duration_days}
                                onChange={(e) => setData('duration_days', parseInt(e.target.value) || 7)}
                                error={errors.duration_days}
                            />

                            <Select
                                label="Program Terkait (Opsional)"
                                value={data.program_id}
                                onChange={(e) => setData('program_id', e.target.value)}
                                placeholder="Terbuka Untuk Umum"
                                options={programs.map((p) => ({ value: p.id, label: p.name }))}
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
                                Terbitkan Challenge
                            </Button>
                        </div>
                    </form>
                </AdminModal>
            </div>
        </AdminLayout>
    );
}
