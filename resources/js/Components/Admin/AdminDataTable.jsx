import React from 'react';
import { Table } from '@/Components/UI';

/**
 * AdminDataTable is a styled wrapper around the unified Table component
 * ensuring 100% backward compatibility and seamless reuse across Admin pages.
 */
export default function AdminDataTable(props) {
    return <Table {...props} />;
}
