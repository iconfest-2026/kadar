import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Challenges({ profile, challenges = [], myParticipations = {}, totalPoints = 0 }) {
    const [joiningId, setJoiningId] = useState(null);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);
    const [filterTab, setFilterTab] = useState('ALL'); // 'ALL', 'ACTIVE', 'COMPLETED'

    const handleJoin = (challengeId) => {
        setJoiningId(challengeId);
        router.post(`/member/challenges/${challengeId}/join`, {}, {
            preserveScroll: true,
            onFinish: () => setJoiningId(null),
        });
    };

    const handleToggleTask = (participationId, taskId) => {
        setUpdatingTaskId(taskId);
        router.post(`/member/challenges/${participationId}/progress`, {
            task_id: taskId,
        }, {
            preserveScroll: true,
            onFinish: () => setUpdatingTaskId(null),
        });
    };

    const filteredChallenges = challenges.filter((ch) => {
        const part = myParticipations[ch.id];
        if (filterTab === 'ACTIVE') return part && part.status !== 'COMPLETED';
        if (filterTab === 'COMPLETED') return part && part.status === 'COMPLETED';
        return true;
    });

    const goalTypeLabels = {
        NUTRITION: 'Nutrisi & Gula',
        STEPS: 'Aktivitas Langkah',
        SLEEP: 'Tidur & Pemulihan',
        HYDRATION: 'Hidrasi & Air',
    };

    return (
        <AppLayout title="Program Tantangan Sehat" activeTab="challenges">
            <Head title="Tantangan Sehat - AEVYRA" />

            <div className="max-w-3xl mx-auto px-4 py-4 space-y-4 pb-12">
                
                {/* 1. Mobile-Style Compact Header */}
                <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <span className="text-[10px] font-label-mono text-emerald-200 uppercase font-bold tracking-wider block">
                                Program Tantangan
                            </span>
                            <h1 className="font-heading font-black text-lg sm:text-xl truncate leading-tight">
                                Tantangan Kebiasaan Sehat
                            </h1>
                            <p className="text-[11px] text-white/80 mt-0.5">
                                Disiplin harian terukur untuk memulihkan stabilitas metabolisme
                            </p>
                        </div>

                        {/* Ringkasan Poin & Partisipasi */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="px-2.5 py-1.5 rounded-xl bg-black/20 border border-white/10 text-center">
                                <span className="material-symbols-outlined text-amber-300 text-[16px] block">emoji_events</span>
                                <span className="font-mono font-bold text-xs leading-none block mt-0.5">
                                    {totalPoints}p
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Filter Tabs Horizontal */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setFilterTab('ALL')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            filterTab === 'ALL'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white dark:bg-surface border border-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        Semua ({challenges.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilterTab('ACTIVE')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            filterTab === 'ACTIVE'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white dark:bg-surface border border-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        Sedang Berjalan ({Object.values(myParticipations).filter(p => p.status !== 'COMPLETED').length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilterTab('COMPLETED')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            filterTab === 'COMPLETED'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white dark:bg-surface border border-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        Selesai ({Object.values(myParticipations).filter(p => p.status === 'COMPLETED').length})
                    </button>
                </div>

                {/* 3. Daftar Kartu Tantangan Mobile-Friendly */}
                <div className="space-y-3">
                    {filteredChallenges.length > 0 ? (
                        filteredChallenges.map((ch) => {
                            const participation = myParticipations[ch.id];
                            const isJoined = !!participation;
                            const isCompleted = participation?.status === 'COMPLETED';
                            const progress = participation?.progress_percent ? parseFloat(participation.progress_percent) : 0;

                            // Himpunan ID task yang sudah selesai
                            const completedTaskIds = new Set(
                                (participation?.completed_tasks || participation?.completedTasks || participation?.task_completions || [])
                                    .map((t) => t.id)
                            );

                            return (
                                <div
                                    key={ch.id}
                                    className={`rounded-2xl border p-4 sm:p-5 space-y-3 bg-white dark:bg-surface shadow-2xs transition-all ${
                                        isJoined
                                            ? 'border-primary/40'
                                            : 'border-surface-container'
                                    }`}
                                >
                                    {/* Bagian Atas: Kategori, Poin & Durasi */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="space-y-1 min-w-0">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                                                    {goalTypeLabels[ch.goal_type] || ch.goal_type || 'Kesehatan'}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400">
                                                    +{ch.points_reward || 50} Poin
                                                </span>
                                            </div>
                                            <h3 className="font-heading font-black text-sm sm:text-base text-on-surface leading-snug">
                                                {ch.name || ch.title}
                                            </h3>
                                        </div>

                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-xl shrink-0">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                            {ch.duration_days} Hari
                                        </span>
                                    </div>

                                    {/* Deskripsi */}
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        {ch.description}
                                    </p>

                                    {/* Progress Bar (Jika Sudah Bergabung) */}
                                    {isJoined && (
                                        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container space-y-1.5">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-on-surface text-[11px]">Progres Capaian</span>
                                                <span className="font-mono font-bold text-primary">{Math.round(progress)}%</span>
                                            </div>
                                            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-primary to-emerald-400 rounded-full transition-all duration-300"
                                                    style={{ width: `${Math.min(100, progress)}%` }}
                                                />
                                            </div>
                                            {isCompleted && (
                                                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 pt-0.5">
                                                    <span className="material-symbols-outlined text-[15px]">verified</span>
                                                    <span>Target program berhasil diselesaikan!</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Daftar Target Mikro Harian */}
                                    {ch.tasks && ch.tasks.length > 0 && (
                                        <div className="space-y-1.5 pt-1">
                                            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider font-label-mono">
                                                Target Harian:
                                            </h4>
                                            <div className="space-y-1">
                                                {ch.tasks.map((task) => {
                                                    const isTaskDone = completedTaskIds.has(task.id);
                                                    return (
                                                        <div
                                                            key={task.id}
                                                            onClick={() => isJoined && !isCompleted && handleToggleTask(participation.id, task.id)}
                                                            className={`p-2 rounded-xl border text-xs flex items-center justify-between transition-all ${
                                                                isJoined && !isCompleted
                                                                    ? 'cursor-pointer hover:bg-surface-container active:scale-[0.99]'
                                                                    : 'cursor-default'
                                                            } ${
                                                                isTaskDone
                                                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold'
                                                                    : 'bg-surface-container-low border-surface-container text-on-surface'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2 min-w-0">
                                                                <span className={`material-symbols-outlined text-[17px] shrink-0 ${
                                                                    isTaskDone ? 'text-primary' : 'text-on-surface-variant'
                                                                }`}>
                                                                    {isTaskDone ? 'check_circle' : 'radio_button_unchecked'}
                                                                </span>
                                                                <span className="leading-snug text-[11px] truncate">
                                                                    {task.title}
                                                                </span>
                                                            </div>
                                                            {task.target_value && (
                                                                <span className="text-[10px] font-mono text-on-surface-variant shrink-0 ml-1">
                                                                    {task.target_value} {task.target_unit || ''}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tombol Aksi */}
                                    <div className="pt-2 border-t border-surface-container">
                                        {isJoined ? (
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-semibold text-primary flex items-center gap-1 text-[11px]">
                                                    <span className="material-symbols-outlined text-[15px]">check</span>
                                                    {isCompleted ? 'Program Selesai' : 'Program Sedang Aktif'}
                                                </span>
                                                <span className="text-[10px] text-on-surface-variant font-mono">
                                                    +{ch.points_reward} Poin Reward
                                                </span>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleJoin(ch.id)}
                                                disabled={joiningId === ch.id}
                                                className="w-full py-2 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                                                <span>{joiningId === ch.id ? 'Mendaftarkan...' : 'Ikuti Tantangan'}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center rounded-2xl border border-dashed border-surface-container bg-surface-container-low space-y-2">
                            <span className="material-symbols-outlined text-3xl text-on-surface-variant">emoji_events</span>
                            <h4 className="font-bold text-xs text-on-surface">Tidak ada tantangan pada kategori ini</h4>
                            <p className="text-[11px] text-on-surface-variant max-w-xs mx-auto">
                                Silakan pilih tab filter lain untuk melihat tantangan kesehatan lainnya.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
