import React from 'react';
import { Modal } from '@/Components/UI';

/**
 * AdminModal is a styled wrapper around the unified Modal component
 * ensuring 100% backward compatibility and seamless reuse across Admin pages.
 */
export default function AdminModal(props) {
    return <Modal {...props} />;
}
