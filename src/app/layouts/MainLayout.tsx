import { useState } from 'react';
import { Outlet } from 'react-router';
import { TopNav } from '../components/TopNav';
import { BottomNav } from '../components/BottomNav';
import { ProfileSidebar } from '../components/ProfileSidebar';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <TopNav onProfileClick={() => setSidebarOpen(true)} />

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-5">
        <Outlet />
        <div className="h-4" />
      </div>

      <BottomNav />

      <ProfileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
