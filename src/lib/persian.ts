const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianNum(num: number | string): string {
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

export function toPersianDate(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return toPersianNum(`${y}/${m.toString().padStart(2, '0')}/${d.toString().padStart(2, '0')}`);
}

export function toPersianPrice(amount: number): string {
  return toPersianNum(amount.toLocaleString()) + ' تومان';
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'لحظاتی پیش';
  if (minutes < 60) return toPersianNum(minutes) + ' دقیقه پیش';
  if (hours < 24) return toPersianNum(hours) + ' ساعت پیش';
  return toPersianNum(days) + ' روز پیش';
}
