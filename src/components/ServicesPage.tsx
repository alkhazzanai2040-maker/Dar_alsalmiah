import React from 'react';
import { motion } from 'motion/react';
import { Shovel, Building, Truck, Layers, Waves, Settings, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { dict } from '../data';
import { Language } from '../types';

interface ServicesPageProps {
  lang: Language;
}

export default function ServicesPage({ lang }: ServicesPageProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';

  const servicesList = [
    { id: 1, title: t.service1, desc: t.service1Desc, icon: Shovel, color: 'text-red-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-red-950/50 text-red-400 border-red-900/50', longDesc: isRtl ? 'تشمل تسوية الأراضي الوعرة والمنحدرات، الردم الترابي المطابق للمواصفات الهندسية، والحفر العميق للمنشآت الضخمة والقواعد الإنشائية.' : 'Includes rough grading, soil compaction meeting standard geotechnical metrics, backfilling, and deep excavation for mega substructures.' },
    { id: 2, title: t.service2, desc: t.service2Desc, icon: Building, color: 'text-green-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-green-950/50 text-green-400 border-green-900/50', longDesc: isRtl ? 'نقوم بتصميم وتنفيذ شبكات تمديدات الصرف الصحي الرئيسية، تصريف السيول، تغذية المياه الصالحة للشرب، والشبكات الخدمية المتكاملة.' : 'Designing and building main sanitary sewer lines, stormwater systems, potable water distribution loops, and utility corridors.' },
    { id: 3, title: t.service3, desc: t.service3Desc, icon: Truck, color: 'text-red-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-red-950/50 text-red-400 border-red-900/50', longDesc: isRtl ? 'شق وتعبيد الطرق السريعة والشوارع الحضرية، سفلتة المخططات، رصف الأرصفة وإنشاء الكباري وممرات المشاة بأحدث التقنيات.' : 'Highway construction, urban street paving, subdivision asphalt laydown, curb/gutter works, and modular pedestrian walkways.' },
    { id: 4, title: t.service4, desc: t.service4Desc, icon: Layers, color: 'text-green-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-green-950/50 text-green-400 border-green-900/50', longDesc: isRtl ? 'تسوية مسارات السكك الحديدية وإنشاء طبقة الأساس الحصوي (Ballast)، وتركيب خطوط السكك والمفاتيح والجسور المخصصة للقطارات.' : 'Railway subgrade preparation, heavy ballast layering, track installation, turnouts, and specialized elevated train bridges.' },
    { id: 5, title: t.service5, desc: t.service5Desc, icon: Waves, color: 'text-red-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-red-950/50 text-red-400 border-red-900/50', longDesc: isRtl ? 'تصميم وبناء قنوات صندوقية خرسانية (Box Culverts) وقنوات مفتوحة، وبحيرات تجميع مياه الأمطار لحماية المدن من الفيضانات والسيول.' : 'Engineering and casting reinforced concrete box culverts, open drainage channels, and retention ponds for flood protection.' },
    { id: 6, title: t.service6, desc: t.service6Desc, icon: Settings, color: 'text-green-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-green-950/50 text-green-400 border-green-900/50', longDesc: isRtl ? 'إيجار فوري للمعدات والآليات الثقيلة لشركائنا بجميع فئاتها (بلدوزرات، غرايدرات، حفارات، بوكلينات) مع طاقم فني وصيانة متكامل.' : 'Providing fully managed heavy equipment lease solutions (bulldozers, graders, excavators, dump trucks) with operators.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-16 bg-slate-950 text-white min-h-screen"
    >
      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-xs font-black tracking-widest text-red-400 uppercase bg-green-900/50 border border-green-800 px-3 py-1.5 rounded-full inline-block mb-3">
          {t.services}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white">
          {isRtl ? 'باقة خدماتنا المعتمدة هندسياً' : 'Our Fully Qualified Engineering Services'}
        </h1>
        <p className="text-green-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t.servicesSubtitle}
        </p>
      </div>

      {/* Services Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            return (
              <div 
                key={srv.id} 
                className={`p-8 rounded-[2rem] border ${srv.color} transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 flex flex-col justify-between`}
                id={`service-card-${srv.id}`}
              >
                <div className="flex flex-col gap-5">
                  {/* Icon badge */}
                  <div className={`p-4 rounded-2xl w-fit border ${srv.badgeColor}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">{srv.title}</h3>
                    <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>{srv.desc}</p>
                    <div className="h-px bg-slate-800/80 my-3" />
                    <p className={`text-xs text-slate-400 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>{srv.longDesc}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 mt-6 text-[11px] text-green-300 font-bold ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>{isRtl ? 'جودة وتدقيق هندسي كامل' : 'Full engineering certification'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quality Standards Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-8xl font-black uppercase pointer-events-none">QUALITY</div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className={`lg:col-span-8 ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="text-xs font-black text-red-400 uppercase tracking-widest bg-red-950/40 border border-red-900 px-3.5 py-1.5 rounded-full inline-block mb-3">
                {isRtl ? 'التصنيف والمصداقية' : 'Quality Auditing'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {isRtl ? 'جودة تسبق التنفيذ وترافق الأداء الإنشائي' : 'Strict Compliance to Saudi Municipal Regulations'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {isRtl 
                  ? 'تخضع جميع اختبارات التربة والدمج (Compaction) وسفلتة الطرق للرقابة الصارمة من قبل كادر من المهندسين والفنيين المؤهلين لضمان دقة العمل مع مواصفات وزارة البلديات والإسكان كود البناء السعودي.'
                  : 'All our soil works, asphalt mixtures, and trench compaction are double-audited by independent labs and supervised by senior certified engineers ensuring absolute structural safety.'}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-green-950 text-green-300 border border-green-900 p-6 rounded-2xl flex flex-col items-center text-center max-w-xs w-full shadow-lg">
                <ShieldCheck className="w-12 h-12 text-red-500 mb-2" />
                <h4 className="font-black text-white text-sm">{isRtl ? 'مصنفة درجة أولى' : 'Grade 1 Certified'}</h4>
                <p className="text-[10px] text-slate-300 mt-1">{isRtl ? 'مؤهلون لتنفيذ أضخم المشاريع الحكومية' : 'Pre-qualified for mega government infrastructure projects'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
