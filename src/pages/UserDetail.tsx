import { useParams, useNavigate } from 'react-router-dom';
import { mockUsers } from '@/lib/mockData';
import { toPersianNum, toPersianDate } from '@/lib/persian';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const statusMap = { paid: 'پرداخت شده', unpaid: 'پرداخت نشده', pending: 'در انتظار' };
const statusColor = { paid: 'bg-success/20 text-success', unpaid: 'bg-destructive/20 text-destructive', pending: 'bg-warning/20 text-warning' };

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = mockUsers.find(u => u.id === id);

  if (!user) return <p className="text-muted-foreground">کاربر یافت نشد</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <button onClick={() => navigate('/users')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
        <ArrowRight className="w-4 h-4" />
        بازگشت به لیست
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-glass p-6 space-y-4">
          <h3 className="text-base font-semibold">اطلاعات کاربر</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">نام:</span><span>{user.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">موبایل:</span><span>{user.mobile}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">کشور:</span><span>{user.country}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">امتیاز:</span><span>{toPersianNum(user.score)}</span></div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">وضعیت پرداخت:</span>
              <span className={`text-xs px-2 py-1 rounded-md ${statusColor[user.paymentStatus]}`}>{statusMap[user.paymentStatus]}</span>
            </div>
            <div className="flex justify-between"><span className="text-muted-foreground">تاریخ ثبت‌نام:</span><span>{toPersianDate(user.registeredAt)}</span></div>
          </div>
        </div>

        <div className="card-glass p-6 space-y-4">
          <h3 className="text-base font-semibold">پاسخ‌های فرم مرحله‌ای</h3>
          <div className="space-y-3 text-sm">
            {Object.entries(user.formAnswers).map(([key, val]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">{key}:</span>
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass p-6 space-y-4">
          <h3 className="text-base font-semibold">دانشگاه‌های پیشنهادی</h3>
          <div className="space-y-2">
            {user.selectedUniversities.map((uni, i) => (
              <div key={i} className="bg-secondary/50 px-3 py-2 rounded-lg text-sm">{uni}</div>
            ))}
          </div>
        </div>

        <div className="card-glass p-6 space-y-4">
          <h3 className="text-base font-semibold">تایم‌لاین فعالیت</h3>
          <div className="space-y-3">
            {user.activityTimeline.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full gradient-primary shrink-0" />
                <span>{item.action}</span>
                <span className="text-muted-foreground mr-auto">{toPersianDate(item.date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDetail;
