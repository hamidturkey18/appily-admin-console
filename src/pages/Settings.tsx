import { useState } from 'react';
import ConfirmModal from '@/components/ConfirmModal';
import { toPersianNum } from '@/lib/persian';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const Settings = () => {
  const [paymentGateway, setPaymentGateway] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [weights, setWeights] = useState({ gpa: 30, language: 25, budget: 20, experience: 25 });
  const [admins] = useState(['مدیر سیستم', 'ادمین پشتیبان']);
  const [confirmAction, setConfirmAction] = useState<{ title: string; message: string; action: () => void } | null>(null);

  const handleToggle = (key: string, value: boolean) => {
    const labels: Record<string, string> = {
      paymentGateway: 'درگاه پرداخت',
      maintenance: 'حالت تعمیر و نگهداری',
    };
    setConfirmAction({
      title: `تغییر ${labels[key]}`,
      message: `آیا از ${value ? 'فعال‌سازی' : 'غیرفعال‌سازی'} ${labels[key]} اطمینان دارید؟`,
      action: () => {
        if (key === 'paymentGateway') setPaymentGateway(value);
        if (key === 'maintenance') setMaintenance(value);
      },
    });
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Payment Gateway */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">مدیریت درگاه پرداخت</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">وضعیت درگاه</span>
          <button
            onClick={() => handleToggle('paymentGateway', !paymentGateway)}
            className={`w-12 h-6 rounded-full transition-colors relative ${paymentGateway ? 'bg-success' : 'bg-muted'}`}
          >
            <div className={`w-5 h-5 bg-foreground rounded-full absolute top-0.5 transition-all ${paymentGateway ? 'left-0.5' : 'left-[26px]'}`} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{paymentGateway ? 'فعال' : 'غیرفعال'}</p>
      </motion.div>

      {/* Scoring Weights */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">ضریب وزن‌دهی الگوریتم امتیازدهی</h3>
        <div className="space-y-4">
          {Object.entries(weights).map(([key, val]) => {
            const labels: Record<string, string> = { gpa: 'معدل', language: 'نمره زبان', budget: 'بودجه', experience: 'سابقه' };
            return (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{labels[key]}</span>
                  <span>{toPersianNum(val)}٪</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={val}
                  onChange={e => setWeights({ ...weights, [key]: +e.target.value })}
                  className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Maintenance Mode */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">حالت تعمیر و نگهداری</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">فعال‌سازی حالت نگهداری</span>
          <button
            onClick={() => handleToggle('maintenance', !maintenance)}
            className={`w-12 h-6 rounded-full transition-colors relative ${maintenance ? 'bg-warning' : 'bg-muted'}`}
          >
            <div className={`w-5 h-5 bg-foreground rounded-full absolute top-0.5 transition-all ${maintenance ? 'left-0.5' : 'left-[26px]'}`} />
          </button>
        </div>
        {maintenance && <p className="text-xs text-warning mt-2">سیستم در حالت نگهداری است</p>}
      </motion.div>

      {/* Admin Management */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card-glass p-6">
        <h3 className="text-base font-semibold mb-4">مدیریت مدیران</h3>
        <div className="space-y-2 mb-4">
          {admins.map((admin, i) => (
            <div key={i} className="flex items-center justify-between bg-secondary/50 px-4 py-2.5 rounded-lg">
              <span className="text-sm">{admin}</span>
              <button className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <button className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
          افزودن مدیر جدید
        </button>
      </motion.div>

      <ConfirmModal
        open={!!confirmAction}
        title={confirmAction?.title ?? ''}
        message={confirmAction?.message ?? ''}
        onConfirm={() => { confirmAction?.action(); setConfirmAction(null); }}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
};

export default Settings;
