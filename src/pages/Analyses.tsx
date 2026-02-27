import { useState } from 'react';
import { mockAnalyses } from '@/lib/mockData';
import { toPersianNum, toPersianDate } from '@/lib/persian';
import DataTable from '@/components/DataTable';
import ConfirmModal from '@/components/ConfirmModal';
import { Eye, Trash2 } from 'lucide-react';
import type { Analysis } from '@/lib/mockData';

const Analyses = () => {
  const [analyses, setAnalyses] = useState(mockAnalyses);
  const [deleteTarget, setDeleteTarget] = useState<Analysis | null>(null);
  const [viewTarget, setViewTarget] = useState<Analysis | null>(null);

  const columns = [
    { key: 'userName', title: 'کاربر' },
    { key: 'score', title: 'امتیاز', render: (a: Analysis) => toPersianNum(a.score) },
    { key: 'country', title: 'کشور منتخب' },
    { key: 'createdAt', title: 'تاریخ ایجاد', render: (a: Analysis) => toPersianDate(a.createdAt) },
    { key: 'version', title: 'نسخه تحلیل' },
    {
      key: 'actions',
      title: 'عملیات',
      render: (a: Analysis) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); setViewTarget(a); }} className="text-primary hover:text-primary/80"><Eye className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(a); }} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={analyses} />

      {/* View detail */}
      {viewTarget && (
        <div className="card-glass p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">جزئیات تحلیل</h3>
            <button onClick={() => setViewTarget(null)} className="text-muted-foreground hover:text-foreground text-sm">بستن</button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">کاربر: </span>{viewTarget.userName}</div>
            <div><span className="text-muted-foreground">امتیاز: </span>{toPersianNum(viewTarget.score)}</div>
            <div><span className="text-muted-foreground">کشور: </span>{viewTarget.country}</div>
            <div><span className="text-muted-foreground">نسخه: </span>{viewTarget.version}</div>
            <div><span className="text-muted-foreground">تاریخ: </span>{toPersianDate(viewTarget.createdAt)}</div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="حذف تحلیل"
        message="آیا از حذف این تحلیل اطمینان دارید؟"
        confirmText="حذف"
        danger
        onConfirm={() => { setAnalyses(analyses.filter(a => a.id !== deleteTarget?.id)); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Analyses;
