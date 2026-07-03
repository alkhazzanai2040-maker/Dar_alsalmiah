import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Shovel, Truck, Settings, Hammer, ShieldAlert } from 'lucide-react';
import { dict, equipmentList } from '../data';
import { Language } from '../types';

interface FleetPageProps {
  lang: Language;
}

export default function FleetPage({ lang }: FleetPageProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';
  const [activeFleetCategory, setActiveFleetCategory] = useState<string>('all');
  const [fleetQuery, setFleetQuery] = useState('');

  // Get lucide icon based on name
  const getEquipmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shovel': return Shovel;
      case 'Truck': return Truck;
      case 'Hammer': return Hammer;
      default: return Settings;
    }
  };

  const filteredFleet = equipmentList.filter((eq) => {
    const matchesCategory = activeFleetCategory === 'all' || eq.category === activeFleetCategory;
    const name = isRtl ? eq.nameAr : eq.nameEn;
    const matchesSearch = name.toLowerCase().includes(fleetQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-16 bg-slate-100 min-h-screen"
    >
      {/* Top Banner Header */}
      <div className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/40 via-slate-950/95 to-slate-950 z-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <span className="text-xs font-black tracking-widest text-red-400 uppercase bg-green-900/50 border border-green-850 px-3 py-1.5 rounded-full inline-block mb-3">
            {isRtl ? 'الأسطول الميكانيكي' : 'Corporate Fleet'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            {isRtl ? 'أسطول المعدات الثقيلة والآليات' : 'Heavy Construction Fleet Portfolio'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            {t.fleetSubtitle}
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-950 text-red-400 border border-green-900 rounded-2xl text-xs font-black shadow-sm">
            <span>{t.totalFleetCount}:</span>
            <span className="font-extrabold text-white">{isRtl ? '400+ آليات نشطة بالكامل تملكها الشركة' : '400+ Active Fully-Owned Machineries'}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters & search bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          {/* Equipment Category tabs */}
          <div className={`flex flex-wrap gap-1 w-full md:w-auto ${isRtl ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
            {[
              { id: 'all', label: t.fleetCategoryAll },
              { id: 'heavy', label: t.fleetCategoryHeavy },
              { id: 'transport', label: t.fleetCategoryTransport },
              { id: 'specialized', label: t.fleetCategorySpecialized },
              { id: 'power', label: t.fleetCategoryPower },
              { id: 'support', label: t.fleetCategorySupport },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFleetCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeFleetCategory === cat.id
                    ? 'bg-green-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
                id={`fleet-tab-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className={`relative w-full md:w-80 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Search className="w-4 h-4 text-slate-400 absolute mx-3 pointer-events-none" />
            <input
              type="text"
              value={fleetQuery}
              onChange={(e) => setFleetQuery(e.target.value)}
              placeholder={t.filterPlaceholder}
              className={`w-full py-2.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-900/20 ${isRtl ? 'pl-3 pr-9 text-right' : 'pl-9 pr-3 text-left'}`}
              id="fleet-search-input"
            />
          </div>
        </div>

        {/* Equipment Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="machinery-grid">
          {filteredFleet.map((eq) => {
            const Icon = getEquipmentIcon(eq.icon);
            return (
              <div 
                key={eq.id} 
                className="bg-white rounded-[2rem] p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-350 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                id={`machinery-card-${eq.id}`}
              >
                <div>
                  {/* Header: Icon & Count badge */}
                  <div className={`flex items-start justify-between mb-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-3 bg-green-50 text-green-900 rounded-2xl border border-green-150 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-red-650 border border-red-150 px-3 py-1 bg-red-50/50 rounded-xl">
                      {eq.count} {isRtl ? 'آلية' : 'units'}
                    </span>
                  </div>

                  {/* Equipment metadata */}
                  <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                    <h4 className="text-sm font-black text-slate-900 leading-snug title-font min-h-[40px]">
                      {isRtl ? eq.nameAr : eq.nameEn}
                    </h4>
                    <p className="text-[10px] text-green-800 mt-2 uppercase font-black tracking-widest bg-green-50/50 inline-block px-2.5 py-0.5 rounded-lg border border-green-100">
                      {eq.category === 'heavy' && (isRtl ? 'معدات ثقيلة' : 'Heavy Equipment')}
                      {eq.category === 'transport' && (isRtl ? 'معدات نقل وطاقة' : 'Transport & Power')}
                      {eq.category === 'specialized' && (isRtl ? 'معدات تخصصية' : 'Specialized')}
                      {eq.category === 'power' && (isRtl ? 'طاقة ومولدات' : 'Power Generators')}
                      {eq.category === 'support' && (isRtl ? 'معدات مساندة' : 'Support Assets')}
                    </p>
                  </div>
                </div>

                <div className={`flex justify-between items-center mt-5 pt-3.5 border-t border-slate-100 text-[10px] ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-green-800 font-extrabold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                    {t.activeStatus}
                  </span>
                  <span className="text-slate-400 font-bold">
                    {isRtl ? 'جاهزية تامة' : 'Fully Operational'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fleet empty query match fallback */}
        {filteredFleet.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
            <p className="text-sm text-slate-500">{isRtl ? 'لا يوجد آلية مطابقة لبحثك في الأسطول.' : 'No machinery matches your queries.'}</p>
          </div>
        )}

        {/* Strategic Capacity Details */}
        <div className="bg-green-950 text-white rounded-[2.5rem] p-8 md:p-12 mt-12 border border-green-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-8xl font-black pointer-events-none uppercase">LOGISTICS</div>
          <div className={`relative z-10 max-w-4xl ${isRtl ? 'text-right' : 'text-left'}`}>
            <span className="text-xs font-black text-red-400 uppercase tracking-widest bg-green-900/50 border border-green-800 px-3 py-1.5 rounded-full inline-block mb-3">
              {isRtl ? 'القدرات الاستراتيجية واللوجستية' : 'Logistical Self-Reliance'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {isRtl ? 'التحكم والجاهزية بالملكية الكاملة 100%' : '100% Owned Massive Mechanical Infrastructure'}
            </h3>
            <p className="text-xs sm:text-sm text-green-200 mt-2 leading-relaxed">
              {isRtl 
                ? 'على نقيض الممارسات التجارية القائمة على الاستئجار، تمتلك شركة دار السالمية للمقاولات أسطولها بالكامل مما يحقق استقلالية مطلقة في اتخاذ القرارات، وموثوقية عالية في تنفيذ الخطط الزمنية الطارئة لكبار شركائنا في المشاريع الحرجة وبشكل فوري.'
                : 'Unlike regular contractors who rely on heavy machinery rentals and middle-men, Dar Al-Salmiah completely owns its logistics chain, ensuring seamless project workflows, immediate mobilization, and unmatched scheduling accuracy.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
