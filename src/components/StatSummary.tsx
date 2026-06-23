import { Calendar, Truck, ShieldCheck, Award } from 'lucide-react';
import { dict } from '../data';
import { Language } from '../types';

interface StatSummaryProps {
  lang: Language;
}

export default function StatSummary({ lang }: StatSummaryProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';

  const stats = [
    {
      id: 1,
      value: lang === 'ar' ? '1979' : '1979',
      label: lang === 'ar' ? 'سنة التأسيس بالرياض' : 'Year Established',
      sub: lang === 'ar' ? 'أكثر من 47 عاماً من البناء' : 'Over 47 years of legacy',
      icon: Calendar,
      themeClass: 'bg-green-950 text-white border border-green-900 shadow-lg shadow-green-950/10',
      iconClass: 'bg-green-900 text-white',
      valueClass: 'text-white',
      labelClass: 'text-green-200',
      subClass: 'text-green-400'
    },
    {
      id: 2,
      value: lang === 'ar' ? '400+' : '400+',
      label: lang === 'ar' ? 'آليات مخصصة للعمل' : 'Active Heavy Machinery',
      sub: lang === 'ar' ? 'أكبر أساطيل الحفارات والناقلات' : 'Fully-owned physical fleet',
      icon: Truck,
      themeClass: 'bg-white border border-slate-200 shadow-sm hover:border-slate-350',
      iconClass: 'bg-green-50 text-green-900',
      valueClass: 'text-slate-900',
      labelClass: 'text-slate-700',
      subClass: 'text-slate-450'
    },
    {
      id: 3,
      value: lang === 'ar' ? '27' : '27',
      label: lang === 'ar' ? 'مشروعاً إستراتيجياً معتمداً' : 'Mega Projects Accomplished',
      sub: lang === 'ar' ? 'مع أمانة الرياض وموسم الدرعية' : 'Under direct pre-qualification',
      icon: Award,
      themeClass: 'bg-white border border-slate-200 shadow-sm hover:border-slate-350',
      iconClass: 'bg-red-50 text-red-600',
      valueClass: 'text-slate-900',
      labelClass: 'text-slate-700',
      subClass: 'text-slate-450'
    },
    {
      id: 4,
      value: '100%',
      label: lang === 'ar' ? 'معدل الالتزام والنجاح' : 'Commitment Rate',
      sub: lang === 'ar' ? 'مطابق لمواصفات الجودة والأمان' : 'On-time scheduled delivery',
      icon: ShieldCheck,
      themeClass: 'bg-red-600 text-white border border-red-550 shadow-sm',
      iconClass: 'bg-slate-900 text-red-400',
      valueClass: 'text-white',
      labelClass: 'text-red-100',
      subClass: 'text-red-200'
    }
  ];

  return (
    <div className="relative z-10 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`rounded-3xl hover:-translate-y-1 transition-all duration-300 p-6 flex items-center gap-5 ${stat.themeClass}`}
              id={`stat-card-${stat.id}`}
            >
              <div className={`p-4 rounded-2xl shrink-0 ${stat.iconClass}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className={`flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className={`text-4xl font-black tracking-tight leading-none mb-1 font-mono ${stat.valueClass}`}>
                  {stat.value}
                </span>
                <span className={`text-xs font-black leading-tight ${stat.labelClass}`}>
                  {stat.label}
                </span>
                <span className={`text-[10px] mt-1 ${stat.subClass}`}>
                  {stat.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
