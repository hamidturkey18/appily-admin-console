import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  GraduationCap,
  Globe,
  FileBarChart,
  Settings,
  LogOut,
  X,
  Menu,
} from 'lucide-react';

const sidebarItems = [
  { title: 'داشبورد', path: '/', icon: LayoutDashboard },
  { title: 'کاربران', path: '/users', icon: Users },
  { title: 'پرداخت‌ها', path: '/payments', icon: CreditCard },
  { title: 'تحلیل‌ها', path: '/analyses', icon: BarChart3 },
  { title: 'دانشگاه‌ها', path: '/universities', icon: GraduationCap },
  { title: 'کشورها', path: '/countries', icon: Globe },
  { title: 'آمار و گزارش‌ها', path: '/reports', icon: FileBarChart },
  { title: 'تنظیمات سیستم', path: '/settings', icon: Settings },
];

export default function AdminSidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const content = (
    <div className="flex flex-col h-full bg-sidebar border-l border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-lg font-bold gradient-primary-text">Appily</h2>
        <p className="text-xs text-muted-foreground mt-1">پنل مدیریت</p>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`sidebar-item w-full ${active ? 'sidebar-item-active' : ''}`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="sidebar-item w-full text-destructive hover:text-destructive"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>خروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[260px] shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: 260 }}
              animate={{ x: 0 }}
              exit={{ x: 260 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 right-0 w-[260px] h-screen z-50 lg:hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
