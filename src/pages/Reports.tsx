import { toPersianNum } from '@/lib/persian';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const funnelData = [
  { name: 'ثبت‌نام', value: 100 },
  { name: 'تکمیل فرم', value: 72 },
  { name: 'دریافت تحلیل', value: 55 },
  { name: 'پرداخت', value: 38 },
];

const scoreByCountry = [
  { name: 'آلمان', avg: 82 },
  { name: 'کانادا', avg: 76 },
  { name: 'استرالیا', avg: 71 },
  { name: 'هلند', avg: 79 },
  { name: 'سوئد', avg: 68 },
  { name: 'اتریش', avg: 74 },
];

const topFields = [
  { name: 'مهندسی کامپیوتر', value: 35 },
  { name: 'پزشکی', value: 22 },
  { name: 'مدیریت', value: 18 },
  { name: 'مهندسی مکانیک', value: 15 },
  { name: 'سایر', value: 10 },
];

const monthlyRevenue = [
  { name: 'فروردین', revenue: 12000000 },
  { name: 'اردیبهشت', revenue: 18000000 },
  { name: 'خرداد', revenue: 22000000 },
  { name: 'تیر', revenue: 28000000 },
  { name: 'مرداد', revenue: 25000000 },
  { name: 'شهریور', revenue: 32000000 },
];

const COLORS = ['hsl(230,70%,55%)', 'hsl(250,55%,55%)', 'hsl(142,45%,42%)', 'hsl(38,90%,55%)', 'hsl(0,55%,48%)'];

const tooltipStyle = { background: 'hsl(222,47%,13%)', border: '1px solid hsl(222,20%,18%)', borderRadius: 8, color: '#fff', fontSize: 13 };

const Reports = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">نرخ ریزش در هر مرحله فرم</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={funnelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,20%,18%)" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="hsl(230,70%,55%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">میانگین امتیاز بر اساس کشور</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={scoreByCountry}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,20%,18%)" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="avg" fill="hsl(250,55%,55%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">بیشترین رشته انتخاب‌شده</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={topFields} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} (${toPersianNum(Math.round(percent * 100))}٪)`} labelLine={false} fontSize={11} fill="hsl(230,70%,55%)">
              {topFields.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">درآمد ماهانه</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,20%,18%)" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'hsl(0,0%,65%)', fontSize: 12 }} tickFormatter={(v) => `${v / 1000000}M`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => toPersianNum(v.toLocaleString()) + ' تومان'} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(142,45%,42%)" fill="hsl(142,45%,42%)" fillOpacity={0.15} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Reports;
