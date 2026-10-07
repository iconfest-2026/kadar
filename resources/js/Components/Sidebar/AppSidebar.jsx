import React from 'react';
import SidebarBrand from './SidebarBrand';
import SidebarProfile from './SidebarProfile';
import SidebarQuickActions from './SidebarQuickActions';
import SidebarAiBanner from './SidebarAiBanner';
import SidebarNavLinks from './SidebarNavLinks';
import SidebarUpgradeCard from './SidebarUpgradeCard';
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
            className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[calc(100vw-3rem)] bg-white dark:bg-surface border-r border-surface-container flex flex-col transition-transform duration-300 shadow-sm lg:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* 1. Brand & Header */}
            <SidebarBrand
                isAdmin={isAdmin}
                isInstructor={isInstructor}
                onClose={onClose}
            />

            {/* 2. User Profile Widget */}
            <SidebarProfile
                user={user}
                isMember={isMember}
                onOpenTierModal={onOpenTierModal}
            />

            {/* 3. Quick Action Buttons */}
            <SidebarQuickActions
                isMember={isMember}
                onOpenQuickLog={onOpenQuickLog}
                onOpenScanner={onOpenScanner}
            />

            {/* 4. AI Chat Assistant Widget */}
            <SidebarAiBanner
                isMember={isMember}
                onOpenAiChat={() => {
                    if (onClose) onClose();
                    if (onOpenAiChat) onOpenAiChat();
                }}
            />

            {/* 5. Navigation Sections & Links */}
            <SidebarNavLinks
                sections={sections}
                activeTab={activeTab}
                onNavClick={onClose}
                onOpenAiChat={onOpenAiChat}
                onOpenTierModal={onOpenTierModal}
            />

            {/* 6. Upgrade Card Callout */}
            <SidebarUpgradeCard
                isMember={isMember}
                onOpenTierModal={onOpenTierModal}
            />

            {/* 7. Footer Actions (Emergency SOS 119 & Logout) */}
            <SidebarFooter
                onOpenEmergency={onOpenEmergency}
                onLogout={onLogout}
            />
        </aside>
    );
}
