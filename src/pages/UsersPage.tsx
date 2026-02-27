import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '@/lib/mockData';
import { toPersianNum, toPersianDate } from '@/lib/persian';
import DataTable from '@/components/DataTable';
import ConfirmModal from '@/components/ConfirmModal';
import { Eye, Ban, Trash2 } from 'lucide-react';
import type { User } from '@/lib/mockData';

const statusMap = { paid: 'پرداخت شده', unpaid: 'پرداخت نشده', pending: 'در انتظار' };
const statusColor = { paid: 'bg-success/20 text-success', unpaid: 'bg-destructive/20 text-destructive', pending: 'bg-warning/20 text-warning' };

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const columns = [
    { key: 'name', title: 'نام' },
    { key: 'mobile', title: 'شماره موبایل' },
    { key: 'country', title: 'کشور انتخابی' },
    { key: 'score', title: 'امتیاز', render: (u: User) => toPersianNum(u.score) },
    {
      key: 'paymentStatus',
      title: 'وضعیت پرداخت',
      render: (u: User) => (
        <span className={`text-xs px-2 py-1 rounded-md ${statusColor[u.paymentStatus]}`}>
          {statusMap[u.paymentStatus]}
        </span>
      ),
    },
    { key: 'registeredAt', title: 'تاریخ ثبت‌نام', render: (u: User) => toPersianDate(u.registeredAt) },
    {
      key: 'actions',
      title: 'عملیات',
      render: (u: User) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/users/${u.id}`); }} className="text-primary hover:text-primary/80"><Eye className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); }} className="text-warning hover:text-warning/80"><Ban className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(u); }} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={users} onRowClick={(u) => navigate(`/users/${u.id}`)} />
      <ConfirmModal
        open={!!deleteTarget}
        title="حذف کاربر"
        message={`آیا از حذف ${deleteTarget?.name} اطمینان دارید؟`}
        confirmText="حذف"
        danger
        onConfirm={() => { setUsers(users.filter(u => u.id !== deleteTarget?.id)); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default UsersPage;
