import React, { useState } from 'react';
import Modal from '@/Components/UI/Modal';
import Button from '@/Components/UI/Button';

export default function GoogleRoleSelectModal({
    isOpen = false,
    onClose,
    defaultRole = 'member',
    context = 'login', // 'login' | 'register'
}) {
    const [selectedRole, setSelectedRole] = useState(defaultRole);

    const roles = [
        {
            key: 'member',
            name: 'Member',
            subtitle: 'Pengguna / Pasien',
            icon: 'person',
        },
        {
            key: 'instructor',
            name: 'Instruktur',
            subtitle: 'Dokter / Tenaga Medis',
            icon: 'health_and_safety',
        },
    ];

    const handleProceed = () => {
        window.location.href = `/auth/google?role=${selectedRole}`;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Pilih Peran Akun"
            subtitle="Pilih jenis portal akun Anda untuk melanjutkan."
            icon="g_translate"
            maxWidth="sm"
            footer={
                <div className="flex items-center justify-end gap-2 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                    >
                        Batal
                    </Button>
                    <button
                        type="button"
                        onClick={handleProceed}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                            <path
                                fill="#ffffff"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#ffffff"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#ffffff"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#ffffff"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        <span>Lanjutkan Google</span>
                    </button>
                </div>
            }
        >
            <div className="grid grid-cols-2 gap-3 py-2">
                {roles.map((r) => {
                    const isSelected = selectedRole === r.key;
                    return (
                        <div
                            key={r.key}
                            onClick={() => setSelectedRole(r.key)}
                            className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                isSelected
                                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                                    : 'border-surface-container bg-surface-container-low hover:border-primary/30 hover:bg-surface-container'
                            }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                    isSelected
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'bg-white text-on-surface-variant border border-surface-container'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[22px]">{r.icon}</span>
                            </div>

                            <div className="space-y-0.5">
                                <h4 className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                                    {r.name}
                                </h4>
                                <p className="text-[10px] text-on-surface-variant">
                                    {r.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
}
