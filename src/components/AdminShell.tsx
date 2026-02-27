import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import TopBar from './TopBar';

const titleMap: Record<string, string> = {
  '/': 'داشبورد',
  '/users': 'کاربران',
  '/payments': 'پرداخت‌ها',
  '/analyses': 'تحلیل‌ها',
  '/universities': 'دانشگاه‌ها',
  '/countries': 'کشورها',
  '/reports': 'آمار و گزارش‌ها',
  '/settings': 'تنظیمات سیستم',
};

export default function AdminShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = titleMap[location.pathname] || (location.pathname.startsWith('/users/') ? 'جزئیات کاربر' : 'پنل مدیریت');

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
