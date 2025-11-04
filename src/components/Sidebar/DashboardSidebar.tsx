import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  UtensilsCrossed,
  Calendar,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Hostels', url: '/dashboard/hostels', icon: Building2 },
  { title: 'Mess', url: '/dashboard/mess', icon: UtensilsCrossed },
  { title: 'Bookings', url: '/dashboard/bookings', icon: Calendar },
  { title: 'Users', url: '/dashboard/users', icon: Users },
  { title: 'Reports', url: '/dashboard/reports', icon: BarChart3 },
  { title: 'Subscription', url: '/dashboard/subscription', icon: CreditCard },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const DashboardSidebar = ({ onClose }: { onClose?: () => void }) => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col bg-card border-r border-border h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HostelMate
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === '/dashboard'}
            onClick={onClose} // Close when a link is clicked on mobile
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                collapsed && "justify-center"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span className="font-medium">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div
        className={cn(
          "p-4 border-t border-border",
          collapsed && "flex justify-center"
        )}
      >
        <button
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

