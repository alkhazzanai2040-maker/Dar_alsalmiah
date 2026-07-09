import React from 'react';
import { motion } from 'motion/react';
import { Building, Award, ShieldCheck, CheckCircle2, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { dict } from '../data';
import { Language } from '../types';
import OrgChartStructure from './OrgChartStructure';

interface AboutPageProps {
  lang: Language;
}

export default function AboutPage({ lang }: AboutPageProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-16 bg-slate-100"
    >
      {/* Top Banner Header */}
      <div className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/40 via-slate-950/95 to-slate-950 z-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <span className="text-xs font-black tracking-widest text-red-400 uppercase bg-green-900/50 border border-green-850 px-3 py-1.5 rounded-full inline-block mb-3">
            {isRtl ? 'من نحن' : 'About Us'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            {isRtl ? 'شركة دار السالمية للمقاولات' : 'Dar Al-Salmiah Contracting Company'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            {isRtl 
              ? 'تأسست عام 1979م وتعتبر رائدة في تعبيد الطرق، البنية التحتية، السكك الحديدية وقنوات تصريف السيول بأسطول ميكانيكي عملاق.'
              : 'Established in 1979, a pioneering force in road paving, infrastructure, railways, and stormwater drain systems.'}
          </p>
        </div>
      </div>

      {/* Official Registry Credentials info segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className={`bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-xl flex flex-col lg:flex-row items-center gap-8 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Graphic Badge */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shrink-0 w-full sm:w-64">
            <div className="bg-gradient-to-tr from-green-950 to-green-900 p-4 rounded-xl text-red-500 shadow-md mx-auto mb-3 border border-green-800">
              <Building className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-black text-green-900 uppercase tracking-widest">{isRtl ? 'درجة تصنيف أولى' : 'CR No. 1010022806'}</h4>
            <p className="text-base font-black text-slate-900 mt-1">{isRtl ? 'سجل رقم: 1010022806' : 'Licensed & Certified'}</p>
            <span className="text-[10px] text-red-700 font-black mt-2 px-2 py-0.5 bg-red-50 rounded-full border border-red-200">
              {isRtl ? 'وزارة التجارة السعودية' : 'Saudi Chamber Registered'}
            </span>
          </div>

          {/* Details brief */}
          <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-black text-slate-900 mb-2">{t.crInfo}</h3>
            <p className="text-sm text-slate-650 leading-relaxed font-medium">
              {t.crDescription} {t.legalStatus}
            </p>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-xs text-slate-600 ${isRtl ? 'text-right' : ''}`}>
              <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-2.5 h-2.5 rounded-full bg-green-700 shrink-0" />
                <span><strong>{isRtl ? 'المقر الرئيسي المعتمد:' : 'Riyadh Main HQ Address:'}</strong> {isRtl ? 'الرياض 11757، ص.ب 150889' : 'P.O. Box 150889, Riyadh 11757'}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-550 shrink-0" />
                <span><strong>{isRtl ? 'الترخيص والاعتماد:' : 'Category Registration:'}</strong> {isRtl ? 'بناء وتعبيد الطرق وتسوية الأقسام تمديدات المياه وتصريف السيول والسكك الحديدية' : 'General Contracting & Utility'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Corporate Overview and History */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Background info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-green-950 text-white rounded-[2rem] p-8 border border-green-900 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl font-black uppercase select-none pointer-events-none">DAR</div>
              
              <div>
                <span className="text-xs font-black text-red-400 tracking-wider uppercase bg-green-900/50 border border-green-800 px-3 py-1.5 rounded-full inline-block mb-4">
                  {t.yearsOfExp}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                  {isRtl ? 'منذ عام 1979م وحتى اليوم' : 'Establishing Trust Since 1979'}
                </h3>
                
                <p className="text-sm text-green-100 leading-relaxed mb-6 font-medium">
                  {isRtl 
                    ? 'نضع القواعد الأساسية لبناء الثقة في مشاريع البنية التحتية من واقع مسؤولية أربعة عقود لتأصيل إرث الجودة لدى شركائنا.'
                    : 'We lay physical foundations to establish solid trust in massive infrastructure developments, giving birth to five decades of credentials.'}
                </p>
              </div>

              <div className={`flex items-center gap-3 border-t border-green-900 pt-5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 text-red-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase text-green-300 tracking-widest leading-none mb-1">{t.experience}</h5>
                  <p className="text-xs font-black text-white leading-none">{lang === 'ar' ? 'التنفيذ والمصداقية العالية' : '100% On-time schedules'}</p>
                </div>
              </div>
            </div>

            {/* Direct Phone Numbers Panel */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className={`text-xs font-black text-green-950 mb-3 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{t.phoneLabel}</h4>
              <div className={`flex flex-col gap-2.5 text-xs text-slate-700 ${isRtl ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-4 h-4 text-green-700 shrink-0" />
                  <span className="font-medium">{isRtl ? 'الهاتف الأرضي:' : 'Direct Phone:'} <strong className="font-mono">+966 11 4337964</strong></span>
                </div>
                <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-4 h-4 text-green-700 shrink-0" />
                  <span className="font-mono">info@dasco-sa.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Mission & Vision */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            
            <div className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="text-xs text-green-750 font-extrabold uppercase tracking-widest block mb-2">{t.missionTitle}</span>
              <h3 className="text-xl font-black text-slate-900 mb-3">{lang === 'ar' ? 'حرفية مهنية متوارثة' : 'Commitment to High Execution Professionalism'}</h3>
              <p className="text-sm text-slate-650 leading-relaxed font-medium">
                {t.missionDesc}
              </p>
            </div>

            <div className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="text-xs text-green-750 font-extrabold uppercase tracking-widest block mb-2">{t.visionTitle}</span>
              <h3 className="text-xl font-black text-slate-900 mb-3">{lang === 'ar' ? 'التعزيز الاقتصادي للبنية التحتية' : 'Enhancing the Infrastructure Quality'}</h3>
              <p className="text-sm text-slate-650 leading-relaxed font-medium">
                {t.visionDesc}
              </p>
            </div>

            {/* Strategic Pillars block */}
            <div className={`bg-gradient-to-tr from-slate-50 to-green-50/20 rounded-3xl p-6 border border-slate-200 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h4 className="text-xs font-black uppercase text-green-950 tracking-wider mb-2">{t.pillarsTitle}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4 font-semibold">{t.pillarsDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <h5 className="text-xs font-black text-green-950 mb-1">{t.p1Title}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">{t.p1Desc}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <h5 className="text-xs font-black text-green-950 mb-1">{t.p2Title}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">{t.p2Desc}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <h5 className="text-xs font-black text-green-950 mb-1">{t.p3Title}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">{t.p3Desc}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Narrative Section: Years of Excellence */}
      <div className="bg-slate-50 border-t border-b border-slate-200 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-black tracking-widest text-green-900 uppercase bg-green-150 px-3.5 py-1.5 rounded-full inline-block mb-3">
                  {isRtl ? 'قصة نجاح متكاملة' : 'An Exemplary Success Story'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {isRtl 
                    ? '47 عاماً من الريادة وصناعة الفارق في البنية التحتية الوطنية' 
                    : '47 Years of Pioneering Infrastructure Development'}
                </h2>
                <div className="w-16 h-1.5 bg-green-900 rounded-full mt-4 mb-2"></div>
              </div>

              <div className={`space-y-4 text-sm text-slate-650 font-medium leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                <p>
                  {isRtl 
                    ? 'منذ تأسيس شركة دار السالمية للمقاولات في مدينة الرياض عام 1979م، رسمنا طريقاً نموذجياً للالتزام والوفاء بالعهود الهندسية والإنشائية. على مدى أكثر من أربعة عقود ونصف، واجهنا التحديات الجغرافية واللوجستية الصعبة لنصنع قصص نجاح خالدة في تسوية المواقع المعقدة وشق الطرق الاستراتيجية وتمديد شبكات المياه العملاقة.'
                    : 'Since the establishment of Dar Al-Salmiyah Contracting in Riyadh in 1979, we have mapped out an exemplary path of engineering dedication and integrity. For over over four and a half decades, we have overcome challenging geographical and logistical terrains, delivering legacy success stories in massive site preparation, strategic roadworks, and bulk water transmission lines.'}
                </p>
                <p>
                  {isRtl 
                    ? 'إن تفوقنا يرتكز بالدرجة الأولى على ملكيتنا الكاملة لواحد من أضخم أساطيل المعدات الثقيلة الوطنية، والذي يضم أكثر من 400 آلية ومعدة تخصصية نشطة بالكامل في شتى أنحاء المملكة. يتيح لنا هذا الأسطول الضخم تنفيذ أشد المشاريع حرجاً بالاعتماد الذاتي التام والجاهزية الفورية، دون المساس بمعايير الجودة الفائقة.'
                    : 'Our unparalleled superiority rests firmly on our 100% physical ownership of one of the largest heavy equipment fleets in the Kingdom, boasting over 400 active, specialized machineries. This robust fleet enables us to execute critical projects with total self-reliance and immediate mobilization, upholding top-tier construction standards.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-green-950 to-slate-950 text-white rounded-[2.5rem] p-8 border border-green-900/60 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="absolute top-0 right-0 p-16 opacity-5 text-8xl font-black select-none pointer-events-none">PARTNER</div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2.5 bg-green-900/50 text-red-400 border border-green-800/80 rounded-xl">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black tracking-widest text-red-400 uppercase">
                    {isRtl ? 'شريك استراتيجي رئيسي' : 'Key Strategic Partner'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-4">
                  {isRtl 
                    ? 'الاسم الأكثر موثوقية لكبرى الشركات والقطاعات الحكومية' 
                    : 'The Trusted Partner to Mega Corporate Leaders'}
                </h3>

                <p className="text-xs text-green-200 leading-relaxed font-semibold mb-6">
                  {isRtl 
                    ? 'رُمِّزت شركة دار السالمية للمقاولات كعضو فاعل وشريك أساسي لكبرى شركات التطوير العقاري وصناع البنية التحتية العملاقة في المملكة (مثل أمانة الرياض، الدرعية، نسما وشركاهم، البواني، ومجموعة بن لادن السعودية). نحن لا ننفذ أعمالاً فحسب، بل نساند حلفاءنا كذراع فني وتنفيذي أول وموثوق لتحقيق رؤية المملكة 2030.'
                    : 'Dar Al-Salmiyah has been certified as a vital partner and key pillar to the largest developers and major infrastructure giants in Saudi Arabia. We do not just build; we empower our allies as a premier first-class technical arm to bring Saudi Vision 2030 to life.'}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-green-900/60">
                <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-black text-white">{isRtl ? 'اعتماد الدرجة الأولى' : 'Grade-A Qualification'}</h4>
                    <p className="text-[10px] text-green-300 font-semibold mt-0.5">
                      {isRtl ? 'مؤهلون ومصنفون رسمياً لمشاريع المليارات الإستراتيجية.' : 'Officially classified for complex, high-budget national projects.'}
                    </p>
                  </div>
                </div>

                <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-white">{isRtl ? 'شريك رئيسي وموثوق' : 'Essential Allied Force'}</h4>
                    <p className="text-[10px] text-green-300 font-semibold mt-0.5">
                      {isRtl ? 'تربطنا عقود تضامن وشراكة تمتد لسنوات طوال مع الجهات السيادية.' : 'Long-term joint contracts and strategic partnerships with sovereign entities.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Organizational Chart Section */}
      <div className="mt-16">
        <OrgChartStructure lang={lang} />
      </div>

    </motion.div>
  );
}
