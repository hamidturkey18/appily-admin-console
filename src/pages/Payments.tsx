import { useState } from 'react';
import { mockPayments } from '@/lib/mockData';
import { toPersianNum, toPersianDate, toPersianPrice } from '@/lib/persian';
import DataTable from '@/components/DataTable';
import type { Payment } from '@/lib/mockData';

const statusMap = { success: 'موفق', failed: 'ناموفق', pending: 'در انتظار' };
const statusColor = { success: 'bg-success/20 text-success', failed: 'bg-destructive/20 text-destructive', pending: 'bg-warning/20 text-warning' };

const tabs = [
  { key: 'all', label: 'همه' },
  { key: 'success', label: 'موفق' },
  { key: 'failed', label: 'ناموفق' },
  { key: 'pending', label: 'در انتظار' },
] as const;

const Payments = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered = activeTab === 'all' ? mockPayments : mockPayments.filter(p => p.status === activeTab);

  const columns = [
    { key: 'userName', title: 'کاربر' },
    { key: 'amount', title: 'مبلغ', render: (p: Payment) => toPersianPrice(p.amount) },
    {
      key: 'status',
      title: 'وضعیت',
      render: (p: Payment) => (
        <span className={`text-xs px-2 py-1 rounded-md ${statusColor[p.status]}`}>{statusMap[p.status]}</span>
      ),
    },
    { key: 'date', title: 'تاریخ', render: (p: Payment) => toPersianDate(p.date) },
    { key: 'transactionCode', title: 'کد تراکنش' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === tab.key ? 'gradient-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground hover:text-foreground'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
};

export default Payments;
