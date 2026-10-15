import React from 'react';
import SidebarBrand from './SidebarBrand';
import SidebarProfile from './SidebarProfile';
import SidebarNavLinks from './SidebarNavLinks';
import SidebarFooter from './SidebarFooter';
import { getMemberNavSections, getInstructorNavSections, getAdminNavSections } from './navConfig';

export default function AppSidebar({
    isOpen = false,
    onClose,
    user,
    roles = [],
    activeTab,
    onOpenEmergency,
    onOpenQuickLog,
    onOpenScanner,
    onOpenTierModal,
    onOpenAiChat,
    onLogout,
}) {
    const isAdmin = roles.includes('admin');
    const isInstructor = roles.includes('instructor');
    const isMember = roles.includes('member') || (!isAdmin && !isInstructor);

    const sections = isAdmin
        ? getAdminNavSections()
        : isInstructor
        ? getInstructorNavSections()
        : getMemberNavSections();

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-40 lg:z-20 w-64 max-w-[calc(100vw-3rem)] bg-white dark:bg-surface border-r border-surface-container flex flex-col transition-transform duration-300 shadow-sm lg:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* 1. Brand & Header */}
            <SidebarBrand
                isAdmin={isAdmin}
                isInstructor={isInstructor}
                onClose={onClose}
            />

            {/* 2. User Profile Strip */}
            <SidebarProfile
                user={user}
                isMember={isMember}
            />

            {/* 3. Navigation Sections & Links */}
            <SidebarNavLinks
                sections={sections}
                activeTab={activeTab}
                onNavClick={onClose}
                onOpenAiChat={onOpenAiChat}
                onOpenTierModal={onOpenTierModal}
            />

            {/* 4. Footer Actions (Emergency & Logout) */}
            <SidebarFooter
                onOpenEmergency={onOpenEmergency}
                onLogout={onLogout}
            />
        </aside>
    );
}
