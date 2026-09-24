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

    return (
        <AppLayout title="Program Tantangan Kebiasaan Sehat" activeTab="challenges">
            <Head title="Program Tantangan 14–90 Hari — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                
                {/* Hero Header Banner */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-8 text-white overflow-hidden shadow-xs">
                    <div className="absolute -right-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[15px] text-amber-300">emoji_events</span>
                            <span>PROGRAM PREVENTIF • 14–90 HARI TERPANDU</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                            Bentuk Disiplin Kebiasaan Hidup Sehat dengan Target Terukur
                        </h1>
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                            Membangun kestabilan metabolisme dimulai dari kebiasaan mikro harian. Ikuti modul tantangan bertahap sesuai protokol PERKENI untuk meningkatkan sensitivitas insulin dan kumpulkan poin reward!
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-semibold">
                            <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/10">
                                <span className="material-symbols-outlined text-[16px] text-amber-300">monetization_on</span>
                                <span>Poin Terkumpul:</span>
                                <span className="font-bold text-amber-300 font-mono">{totalPoints} Poin</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/10">
                                <span className="material-symbols-outlined text-[16px] text-emerald-300">flag</span>
                                <span>Tantangan Diikuti:</span>
                                <span className="font-bold text-emerald-300">{Object.keys(myParticipations).length} Modul</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center justify-between border-b border-surface-container pb-2">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        <button
                            type="button"
                            onClick={() => setFilterTab('ALL')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                filterTab === 'ALL'
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                            }`}
                        >
                            Semua Tantangan ({challenges.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterTab('ACTIVE')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                filterTab === 'ACTIVE'
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                            }`}
                        >
                            Sedang Berjalan ({Object.values(myParticipations).filter(p => p.status !== 'COMPLETED').length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterTab('COMPLETED')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                filterTab === 'COMPLETED'
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                            }`}
                        >
                            Telah Selesai ({Object.values(myParticipations).filter(p => p.status === 'COMPLETED').length})
                        </button>
                    </div>
                </div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {filteredChallenges.map((ch) => {
                        const participation = myParticipations[ch.id];
                        const isJoined = !!participation;
                        const isCompleted = participation?.status === 'COMPLETED';
                        const progress = participation?.progress_percent || 0;

                        return (
                            <div
                                key={ch.id}
                                className={`rounded-3xl border transition-all p-5 sm:p-6 space-y-4 bg-white dark:bg-surface shadow-xs flex flex-col justify-between ${
                                    isJoined
                                        ? 'border-primary/40 ring-1 ring-primary/20'
                                        : 'border-surface-container hover:border-primary/30'
                                }`}
                            >
                                <div className="space-y-3.5">
                                    {/* Top Metadata */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                                                    {ch.category || 'Nutrisi & Gula'}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300">
                                                    +{ch.points_reward || 150} Poin
                                                </span>
                                            </div>
                                            <h3 className="font-heading font-black text-base sm:text-lg text-on-surface">
                                                {ch.title}
                                            </h3>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant font-mono bg-surface-container-low px-2.5 py-1 rounded-xl">
                                                <span className="material-symbols-outlined text-[15px]">schedule</span>
                                                {ch.duration_days} Hari
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        {ch.description}
                                    </p>

                                    {/* Progress Bar (If Joined) */}
                                    {isJoined && (
                                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-on-surface">Progres Tantangan</span>
                                                <span className="font-mono font-bold text-primary">{Math.round(progress)}%</span>
                                            </div>
                                            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-primary to-emerald-400 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min(100, progress)}%` }}
                                                ></div>
                                            </div>
                                            {isCompleted && (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 pt-0.5">
                                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                                    <span>Selamat! Anda telah menyelesaikan seluruh target tantangan ini.</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Tasks Checklist */}
                                    {ch.tasks && ch.tasks.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-[11px] font-bold text-on-surface uppercase tracking-wider font-label-mono">
                                                Target Harian & Protokol Tindakan:
                                            </h4>
                                            <div className="space-y-1.5">
                                                {ch.tasks.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        onClick={() => isJoined && !isCompleted && handleToggleTask(participation.id, task.id)}
                                                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                                                            isJoined && !isCompleted
                                                                ? 'cursor-pointer hover:bg-surface-container'
                                                                : 'cursor-default'
                                                        } ${
                                                            task.is_completed
                                                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold'
                                                                : 'bg-surface-container-lowest border-surface-container text-on-surface'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            <span className={`material-symbols-outlined text-[18px] ${
                                                                task.is_completed ? 'text-primary' : 'text-on-surface-variant'
                                                            }`}>
                                                                {task.is_completed ? 'check_circle' : 'radio_button_unchecked'}
                                                            </span>
                                                            <span className="leading-tight">{task.title}</span>
                                                        </div>
                                                        {task.points && (
                                                            <span className="text-[10px] font-mono text-on-surface-variant shrink-0">
                                                                +{task.points} pt
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Join / Action Button */}
                                <div className="pt-3 border-t border-surface-container mt-2">
                                    {isJoined ? (
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-primary flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px]">check</span>
                                                Tantangan Sedang Aktif
                                            </span>
                                            <span className="text-[11px] text-on-surface-variant font-mono">
                                                Reward: {ch.badge_reward || 'Ksatria Sehat'}
                                            </span>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleJoin(ch.id)}
                                            disabled={joiningId === ch.id}
                                            className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            <span className="material-symbols-outlined text-[17px]">play_arrow</span>
                                            <span>{joiningId === ch.id ? 'Mendaftarkan...' : 'Ikuti Tantangan Ini'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
