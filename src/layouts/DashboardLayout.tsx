import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from '@/components/Sidebar/DashboardSidebar';
import { DashboardNavbar } from '@/components/Navbar/DashboardNavbar';

export const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar - Animated */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-300 ease-in-out lg:hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <DashboardSidebar onClose={() => setIsMobileSidebarOpen(false)} />
      </div>

      {/* Overlay when sidebar open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <DashboardNavbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
