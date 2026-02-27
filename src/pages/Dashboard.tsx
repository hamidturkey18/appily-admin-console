import { toPersianNum, toPersianDate, getRelativeTime } from '@/lib/persian';
import { mockUsers, weeklyRegistrations, conversionData, recentActivities } from '@/lib/mockData';
import StatCard from '@/components/StatCard';
import { Users, UserCheck, CreditCard, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

type Activity = { id: string; user: string; action: string; time: Date; status: 'success' | 'failed' };

const Dashboard = () => {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.paymentStatus === 'paid').length;
  const successPayments = mockUsers.filter(u => u.paymentStatus === 'paid').length;
  const avgScore = Math.round(mockUsers.reduce((s, u) => s + u.score, 0) / mockUsers.length);

  const activities: Activity[] = recentActivities.map((a, i) => ({ ...a, id: `act-${i}` }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="تعداد کل کاربران" value={toPersianNum(totalUsers)} icon={<Users className="w-5 h-5" />} trend={`+${toPersianNum(5)} این هفته`} />
        <StatCard title="کاربران فعال" value={toPersianNum(activeUsers)} icon={<UserCheck className="w-5 h-5" />} />
        <StatCard title="پرداخت‌های موفق" value={toPersianNum(successPayments)} icon={<CreditCard className="w-5 h-5" />} />
        <StatCard title="میانگین امتیاز تحلیل‌ها" value={toPersianNum(avgScore)} icon={<BarChart3 className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass p-6">
          <h3 className="text-base font-semibold mb-4">ثبت‌نام هفتگی کاربران</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyRegistrations}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,20%,18%)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(222,47%,13%)', border: '1px solid hsl(222,20%,18%)', borderRadius: 8, color: '#fff', fontSize: 13 }} />
              <Bar dataKey="value" fill="hsl(230,70%,55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="card-glass p-6">
          <h3 className="text-base font-semibold mb-4">نرخ تبدیل به پرداخت</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,20%,18%)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(222,47%,13%)', border: '1px solid hsl(222,20%,18%)', borderRadius: 8, color: '#fff', fontSize: 13 }} />
              <Area type="monotone" dataKey="rate" stroke="hsl(250,55%,55%)" fill="hsl(250,55%,55%)" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-4">فعالیت‌های اخیر</h3>
        <div className="card-glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">کاربر</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">عملیات</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">زمان</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item) => (
                <tr key={item.id} className="border-b border-border/50 table-row-hover">
                  <td className="px-4 py-3 text-sm">{item.user}</td>
                  <td className="px-4 py-3 text-sm">{item.action}</td>
                  <td className="px-4 py-3 text-sm">{getRelativeTime(item.time)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`text-xs px-2 py-1 rounded-md ${item.status === 'success' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      {item.status === 'success' ? 'موفق' : 'ناموفق'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
