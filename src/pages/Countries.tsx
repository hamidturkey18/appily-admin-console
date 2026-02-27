import { useState } from 'react';
import { mockCountries } from '@/lib/mockData';
import { toPersianPrice } from '@/lib/persian';
import DataTable from '@/components/DataTable';
import FormModal from '@/components/FormModal';
import ConfirmModal from '@/components/ConfirmModal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Country } from '@/lib/mockData';

const emptyCountry: Omit<Country, 'id'> = { name: '', description: '', competitionLevel: '', minBudget: 0 };

const Countries = () => {
  const [countries, setCountries] = useState(mockCountries);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Country | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Country | null>(null);
  const [form, setForm] = useState(emptyCountry);

  const openCreate = () => { setForm(emptyCountry); setEditTarget(null); setModalOpen(true); };
  const openEdit = (c: Country) => { setForm(c); setEditTarget(c); setModalOpen(true); };

  const handleSave = () => {
    if (editTarget) {
      setCountries(countries.map(c => c.id === editTarget.id ? { ...c, ...form } : c));
    } else {
      setCountries([...countries, { ...form, id: `c-${Date.now()}` } as Country]);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'name', title: 'نام کشور' },
    { key: 'description', title: 'توضیح کوتاه' },
    { key: 'competitionLevel', title: 'سطح رقابت' },
    { key: 'minBudget', title: 'حداقل بودجه', render: (c: Country) => toPersianPrice(c.minBudget) },
    {
      key: 'actions',
      title: 'عملیات',
      render: (c: Country) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(c); }} className="text-primary hover:text-primary/80"><Edit className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(c); }} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={openCreate} className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          افزودن کشور
        </button>
      </div>

      <DataTable columns={columns} data={countries} />

      <FormModal open={modalOpen} title={editTarget ? 'ویرایش کشور' : 'افزودن کشور'} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">نام کشور</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">توضیح کوتاه</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" rows={2} />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">سطح رقابت</label>
            <input value={form.competitionLevel} onChange={e => setForm({ ...form, competitionLevel: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">حداقل بودجه پیشنهادی (تومان)</label>
            <input type="number" value={form.minBudget} onChange={e => setForm({ ...form, minBudget: +e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={handleSave} className="w-full gradient-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
            {editTarget ? 'ذخیره تغییرات' : 'افزودن'}
          </button>
        </div>
      </FormModal>

      <ConfirmModal
        open={!!deleteTarget}
        title="حذف کشور"
        message={`آیا از حذف ${deleteTarget?.name} اطمینان دارید؟`}
        confirmText="حذف"
        danger
        onConfirm={() => { setCountries(countries.filter(c => c.id !== deleteTarget?.id)); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Countries;
