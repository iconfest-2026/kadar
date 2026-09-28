import React from 'react';
import { Modal, Button } from '@/Components/UI';

export default function AdminDeleteConfirmModal({
    isOpen = false,
    onClose,
    onConfirm,
    title = 'Konfirmasi Penghapusan',
    message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
    itemName = '',
    loading = false,
    confirmText = 'Hapus Permanen',
    cancelText = 'Batal',
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            icon="warning"
            maxWidth="sm"
            footer={
                <div className="flex items-center justify-end gap-2 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        leftIcon="delete"
                        loading={loading}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            }
        >
            <div className="space-y-3">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                    {message}
                </p>
                {itemName && (
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-900 font-semibold text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-rose-600 text-[18px]">delete_forever</span>
                        <span className="line-clamp-1">{itemName}</span>
                    </div>
                )}
            </div>
        </Modal>
    );
}
