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
        <AppLayout title="Program Challenge Kesehatan" activeTab="challenges">
            <Head title="Program Challenge Kesehatan - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                
                {/* Hero Header */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-10 text-white overflow-hidden shadow-xl">
                    <div className="absolute -right-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
                            <span className="material-symbols-outlined text-[16px] text-amber-300">emoji_events</span>
                            <span>Fitur 5: Program Tantangan Terstruktur 14–90 Hari</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-4xl tracking-tight leading-tight">
                            Bentuk Disiplin Kebiasaan Hidup Sehat dengan Target Terukur
                        </h1>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                            Tanpa target terstruktur, menjaga pola hidup seringkali berhenti di tengah jalan. Bergabunglah dengan tantangan terpandu PERKENI untuk menurunkan resistensi insulin dan kumpulkan poin reward!
                        </p>
                        
                        <div className="flex items-center gap-3 pt-2 text-xs font-semibold">
                            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3.5 py-2 rounded-xl">
                                <span className="material-symbols-outlined text-[16px] text-amber-300">monetization_on</span>
                                <span>Total Poin Anda:</span>
                                <span className="font-bold text-amber-300 font-mono">{totalPoints} Poin</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3.5 py-2 rounded-xl">
                                <span className="material-symbols-outlined text-[16px] text-emerald-300">flag</span>
                                <span>Tantangan Diikuti:</span>
                                <span className="font-bold text-emerald-300">{Object.keys(myParticipations).length} Aktif</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center justify-between border-b border-surface-container pb-2">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setFilterTab('ALL')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                filterTab === 'ALL'
                                    ? 'bg-primary text-white shadow-xs'
                                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            Semua Tantangan ({challenges.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterTab('ACTIVE')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                filterTab === 'ACTIVE'
                                    ? 'bg-primary text-white shadow-xs'
                                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            Sedang Berjalan ({Object.values(myParticipations).filter(p => p.status !== 'COMPLETED').length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterTab('COMPLETED')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                filterTab === 'COMPLETED'
                                    ? 'bg-primary text-white shadow-xs'
                                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            Telah Selesai
                        </button>
                    </div>
                </div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredChallenges.map((ch) => {
                        const participation = myParticipations[ch.id];
                        const isJoined = !!participation;
                        const isCompleted = participation?.status === 'COMPLETED';
                        const progress = participation?.progress_percent || 0;

                        return (
                            <div
                                key={ch.id}
                                className={`rounded-3xl border transition-all p-6 space-y-5 bg-white dark:bg-surface shadow-xs flex flex-col justify-between ${
                                    isJoined
                                        ? 'border-primary/40 ring-1 ring-primary/20'
                                        : 'border-surface-container hover:border-primary/20'
                                }`}
                            >
                                <div className="space-y-4">
                                    {/* Top Metadata */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                                                    {ch.category || 'Nutrisi & Gula'}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                                                    +{ch.points_reward || 150} Poin
                                                </span>
                                            </div>
                                            <h3 className="font-heading font-black text-lg text-on-surface">
                                                {ch.title}
                                            </h3>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant font-mono">
                                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                                {ch.duration_days} Hari
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        {ch.description}
                                    </p>

                                    {/* Progress Bar (If Joined) */}
                                    {isJoined && (
                                        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-on-surface">Progres Tantangan</span>
                                                <span className="font-mono font-bold text-primary">{Math.round(progress)}%</span>
                                            </div>
                                            <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-primary to-emerald-400 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min(100, progress)}%` }}
                                                ></div>
                                            </div>
                                            {isCompleted && (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 pt-1">
                                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                                    <span>Selamat! Anda telah menyelesaikan seluruh target tantangan ini.</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Tasks Checklist */}
                                    {ch.tasks && ch.tasks.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                                Target Harian & Protokol Tindakan:
                                            </h4>
                                            <div className="space-y-1.5">
                                                {ch.tasks.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        onClick={() => isJoined && !isCompleted && handleToggleTask(participation.id, task.id)}
                                                        className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                                                            isJoined && !isCompleted
                                                                ? 'cursor-pointer hover:bg-surface-container-low'
                                                                : 'cursor-default'
                                                        } ${
                                                            task.is_completed
                                                                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold'
                                                                : 'bg-surface-container-lowest border-surface-container text-on-surface'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            <span className={`material-symbols-outlined text-[18px] ${
                                                                task.is_completed ? 'text-emerald-600' : 'text-surface-container-high'
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
                                <div className="pt-4 border-t border-surface-container mt-4">
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
                                            className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
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
