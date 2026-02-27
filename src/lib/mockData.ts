export interface User {
  id: string;
  name: string;
  mobile: string;
  country: string;
  score: number;
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  registeredAt: Date;
  formAnswers: Record<string, string>;
  selectedUniversities: string[];
  activityTimeline: { action: string; date: Date }[];
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  date: Date;
  transactionCode: string;
}

export interface Analysis {
  id: string;
  userId: string;
  userName: string;
  score: number;
  country: string;
  createdAt: Date;
  version: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  minGPA: number;
  minLanguageScore: number;
  riskLevel: 'safe' | 'moderate' | 'risky';
  description: string;
}

export interface Country {
  id: string;
  name: string;
  description: string;
  competitionLevel: string;
  minBudget: number;
}

const names = ['علی احمدی', 'مریم رضایی', 'محمد حسینی', 'فاطمه کریمی', 'حسین موسوی', 'زهرا نوری', 'رضا جعفری', 'سارا محمدی', 'امیر صادقی', 'نرگس عباسی', 'مهدی قاسمی', 'لیلا رحیمی'];
const countries = ['آلمان', 'کانادا', 'استرالیا', 'هلند', 'سوئد', 'اتریش'];
const mobiles = ['۰۹۱۲۳۴۵۶۷۸۹', '۰۹۱۳۸۷۶۵۴۳۲', '۰۹۱۴۲۲۳۳۴۴۵', '۰۹۱۵۶۶۷۷۸۸۹', '۰۹۱۶۱۱۲۲۳۳۴', '۰۹۱۷۹۹۸۸۷۷۶', '۰۹۱۸۵۵۴۴۳۳۲', '۰۹۱۹۰۰۱۱۲۲۳', '۰۹۱۲۷۷۶۶۵۵۴', '۰۹۱۳۳۳۲۲۱۱۰', '۰۹۱۴۸۸۷۷۶۶۵', '۰۹۱۵۴۴۳۳۲۲۱'];

export const mockUsers: User[] = names.map((name, i) => ({
  id: `user-${i + 1}`,
  name,
  mobile: mobiles[i],
  country: countries[i % countries.length],
  score: Math.floor(Math.random() * 40) + 60,
  paymentStatus: (['paid', 'unpaid', 'pending'] as const)[i % 3],
  registeredAt: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  formAnswers: {
    'رشته تحصیلی': ['مهندسی کامپیوتر', 'پزشکی', 'مدیریت بازرگانی', 'مهندسی مکانیک'][i % 4],
    'مقطع': ['کارشناسی', 'کارشناسی ارشد', 'دکتری'][i % 3],
    'معدل': String(14 + (i % 7)),
    'نمره زبان': String(5.5 + (i % 4) * 0.5),
  },
  selectedUniversities: ['دانشگاه مونیخ', 'دانشگاه تورنتو', 'دانشگاه ملبورن'].slice(0, (i % 3) + 1),
  activityTimeline: [
    { action: 'ثبت‌نام', date: new Date(2025, i % 12, 1) },
    { action: 'تکمیل فرم', date: new Date(2025, i % 12, 3) },
    { action: 'دریافت تحلیل', date: new Date(2025, i % 12, 5) },
  ],
}));

export const mockPayments: Payment[] = mockUsers.map((u, i) => ({
  id: `pay-${i + 1}`,
  userId: u.id,
  userName: u.name,
  amount: [490000, 890000, 1290000][i % 3],
  status: (['success', 'failed', 'pending'] as const)[i % 3],
  date: new Date(2025, i % 12, Math.floor(Math.random() * 28) + 1),
  transactionCode: `TXN${String(100000 + i * 7919).slice(0, 6)}`,
}));

export const mockAnalyses: Analysis[] = mockUsers.map((u, i) => ({
  id: `analysis-${i + 1}`,
  userId: u.id,
  userName: u.name,
  score: u.score,
  country: u.country,
  createdAt: new Date(2025, i % 12, Math.floor(Math.random() * 28) + 1),
  version: `v${1 + (i % 3)}.${i % 10}`,
}));

export const mockUniversities: University[] = [
  { id: 'uni-1', name: 'دانشگاه فنی مونیخ', country: 'آلمان', minGPA: 16, minLanguageScore: 6.5, riskLevel: 'safe', description: 'یکی از برترین دانشگاه‌های فنی اروپا' },
  { id: 'uni-2', name: 'دانشگاه تورنتو', country: 'کانادا', minGPA: 15, minLanguageScore: 6, riskLevel: 'moderate', description: 'دانشگاه برتر کانادا با رشته‌های متنوع' },
  { id: 'uni-3', name: 'دانشگاه ملبورن', country: 'استرالیا', minGPA: 14, minLanguageScore: 6, riskLevel: 'safe', description: 'دانشگاه پیشرو در نیمکره جنوبی' },
  { id: 'uni-4', name: 'دانشگاه دلفت', country: 'هلند', minGPA: 15.5, minLanguageScore: 6.5, riskLevel: 'moderate', description: 'مرکز مهندسی پیشرفته هلند' },
  { id: 'uni-5', name: 'دانشگاه لوند', country: 'سوئد', minGPA: 14.5, minLanguageScore: 6, riskLevel: 'risky', description: 'دانشگاه تحقیقاتی معتبر اسکاندیناوی' },
  { id: 'uni-6', name: 'دانشگاه وین', country: 'اتریش', minGPA: 15, minLanguageScore: 5.5, riskLevel: 'safe', description: 'قدیمی‌ترین دانشگاه آلمانی‌زبان' },
];

export const mockCountries: Country[] = [
  { id: 'c-1', name: 'آلمان', description: 'بدون شهریه، نیاز به زبان آلمانی', competitionLevel: 'بالا', minBudget: 50000000 },
  { id: 'c-2', name: 'کانادا', description: 'امکان مهاجرت پس از تحصیل', competitionLevel: 'متوسط', minBudget: 80000000 },
  { id: 'c-3', name: 'استرالیا', description: 'بورسیه‌های متنوع', competitionLevel: 'متوسط', minBudget: 90000000 },
  { id: 'c-4', name: 'هلند', description: 'برنامه‌های انگلیسی‌زبان فراوان', competitionLevel: 'بالا', minBudget: 70000000 },
  { id: 'c-5', name: 'سوئد', description: 'شهریه رایگان برای اروپایی‌ها', competitionLevel: 'پایین', minBudget: 60000000 },
  { id: 'c-6', name: 'اتریش', description: 'شهریه پایین و کیفیت بالا', competitionLevel: 'پایین', minBudget: 45000000 },
];

export const weeklyRegistrations = [
  { name: 'شنبه', value: 12 },
  { name: 'یکشنبه', value: 19 },
  { name: 'دوشنبه', value: 15 },
  { name: 'سه‌شنبه', value: 22 },
  { name: 'چهارشنبه', value: 18 },
  { name: 'پنجشنبه', value: 25 },
  { name: 'جمعه', value: 8 },
];

export const conversionData = [
  { name: 'فروردین', rate: 32 },
  { name: 'اردیبهشت', rate: 28 },
  { name: 'خرداد', rate: 35 },
  { name: 'تیر', rate: 40 },
  { name: 'مرداد', rate: 38 },
  { name: 'شهریور', rate: 45 },
];

export const recentActivities = [
  { user: 'علی احمدی', action: 'ثبت‌نام کرد', time: new Date(Date.now() - 300000), status: 'success' as const },
  { user: 'مریم رضایی', action: 'پرداخت انجام داد', time: new Date(Date.now() - 1800000), status: 'success' as const },
  { user: 'محمد حسینی', action: 'تحلیل دریافت کرد', time: new Date(Date.now() - 3600000), status: 'success' as const },
  { user: 'فاطمه کریمی', action: 'پرداخت ناموفق', time: new Date(Date.now() - 7200000), status: 'failed' as const },
  { user: 'حسین موسوی', action: 'فرم تکمیل کرد', time: new Date(Date.now() - 10800000), status: 'success' as const },
];
