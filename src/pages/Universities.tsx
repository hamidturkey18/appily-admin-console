import { useState } from 'react';
import { mockUniversities } from '@/lib/mockData';
import { toPersianNum } from '@/lib/persian';
import DataTable from '@/components/DataTable';
import FormModal from '@/components/FormModal';
import ConfirmModal from '@/components/ConfirmModal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { University } from '@/lib/mockData';

const riskMap = { safe: 'امن', moderate: 'متناسب', risky: 'ریسکی' };
const riskColor = { safe: 'bg-success/20 text-success', moderate: 'bg-warning/20 text-warning', risky: 'bg-destructive/20 text-destructive' };

const emptyUni: Omit<University, 'id'> = { name: '', country: '', minGPA: 0, minLanguageScore: 0, riskLevel: 'safe', description: '' };

const Universities = () => {
  const [unis, setUnis] = useState(mockUniversities);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<University | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<University | null>(null);
  const [form, setForm] = useState(emptyUni);

  const openCreate = () => { setForm(emptyUni); setEditTarget(null); setModalOpen(true); };
  const openEdit = (u: University) => { setForm(u); setEditTarget(u); setModalOpen(true); };

  const handleSave = () => {
    if (editTarget) {
      setUnis(unis.map(u => u.id === editTarget.id ? { ...u, ...form } : u));
    } else {
      setUnis([...unis, { ...form, id: `uni-${Date.now()}` } as University]);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'name', title: 'نام دانشگاه' },
    { key: 'country', title: 'کشور' },
    { key: 'minGPA', title: 'حداقل معدل', render: (u: University) => toPersianNum(u.minGPA) },
    { key: 'minLanguageScore', title: 'حداقل نمره زبان', render: (u: University) => toPersianNum(u.minLanguageScore) },
    {
      key: 'riskLevel',
      title: 'سطح ریسک',
      render: (u: University) => (
        <span className={`text-xs px-2 py-1 rounded-md ${riskColor[u.riskLevel]}`}>{riskMap[u.riskLevel]}</span>
      ),
    },
    {
      key: 'actions',
      title: 'عملیات',
      render: (u: University) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(u); }} className="text-primary hover:text-primary/80"><Edit className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(u); }} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={openCreate} className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          افزودن دانشگاه
        </button>
      </div>

      <DataTable columns={columns} data={unis} />

      <FormModal open={modalOpen} title={editTarget ? 'ویرایش دانشگاه' : 'افزودن دانشگاه'} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">نام دانشگاه</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">کشور</label>
            <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">حداقل معدل</label>
              <input type="number" value={form.minGPA} onChange={e => setForm({ ...form, minGPA: +e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">حداقل نمره زبان</label>
              <input type="number" step="0.5" value={form.minLanguageScore} onChange={e => setForm({ ...form, minLanguageScore: +e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">سطح ریسک</label>
            <select value={form.riskLevel} onChange={e => setForm({ ...form, riskLevel: e.target.value as any })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="safe">امن</option>
              <option value="moderate">متناسب</option>
              <option value="risky">ریسکی</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">توضیح کوتاه</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" rows={2} />
          </div>
          <button onClick={handleSave} className="w-full gradient-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
            {editTarget ? 'ذخیره تغییرات' : 'افزودن'}
          </button>
        </div>
      </FormModal>

      <ConfirmModal
        open={!!deleteTarget}
        title="حذف دانشگاه"
        message={`آیا از حذف ${deleteTarget?.name} اطمینان دارید؟`}
        confirmText="حذف"
        danger
        onConfirm={() => { setUnis(unis.filter(u => u.id !== deleteTarget?.id)); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Universities;
