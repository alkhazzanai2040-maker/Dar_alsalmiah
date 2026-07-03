import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Calendar, MapPin, DollarSign, Clock, Award, 
  Image as ImageIcon, HelpCircle, CheckCircle2, SlidersHorizontal, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Project, Language } from '../types';
import { dict } from '../data';

interface ProjectsPageProps {
  lang: Language;
  projects: Project[];
}

export default function ProjectsPage({ lang, projects }: ProjectsPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<'completed' | 'upcoming'>('completed');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isRtl = lang === 'ar';
  const t = dict[lang];

  // Completed are progress === 100, upcoming/future are progress < 100
  const completedProjects = projects.filter(p => p.progress === 100);
  const upcomingProjects = projects.filter(p => p.progress < 100);

  const currentList = activeSubTab === 'completed' ? completedProjects : upcomingProjects;

  const filteredList = currentList.filter(proj => {
    const textToSearch = `${proj.nameAr} ${proj.nameEn} ${proj.clientAr} ${proj.clientEn} ${proj.locationAr} ${proj.locationEn} ${proj.scopeAr} ${proj.scopeEn}`.toLowerCase();
    const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    return proj.category === activeCategory && matchesSearch;
  });

  // Unique categories in current tab
  const categories = [
    { id: 'all', labelAr: 'جميع المجالات', labelEn: 'All Fields' },
    { id: 'roads', labelAr: 'أعمال الطرق والأسفلت', labelEn: 'Road Paving & Asphalt' },
    { id: 'infrastructure', labelAr: 'أعمال البنية التحتية', labelEn: 'Infrastructure Works' },
    { id: 'excavation', labelAr: 'أعمال التمهيد والحفريات', labelEn: 'Deep Excavations & Prep' },
    { id: 'utility', labelAr: 'شبكات التصريف والمرافق', labelEn: 'Stormwater & Piping Grids' }
  ];

  return (
    <div className="py-24 sm:py-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className={`text-center max-w-3xl mx-auto mb-12 ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
          <span className="text-xs font-black tracking-widest text-green-800 uppercase bg-green-100 border border-green-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {isRtl ? 'محفظة الأعمال الهندسية' : 'Engineering Portfolio'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {isRtl ? 'مشاريعنا الوطنية الإستراتيجية' : 'Our Strategic National Projects'}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-semibold">
            {isRtl 
              ? 'نستعرض هنا سجل إنجازاتنا الحافل بمشاريع البنية التحتية العملاقة والأعمال المدنية والترابية بمختلف مدن المملكة.' 
              : 'Browse our extensive track record of massive infrastructure, grading, and civil works across the Kingdom of Saudi Arabia.'}
          </p>
        </div>

        {/* Tab Switching: Completed vs Upcoming */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex gap-2">
            <button
              onClick={() => {
                setActiveSubTab('completed');
                setActiveCategory('all');
              }}
              className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${
                activeSubTab === 'completed'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {isRtl ? 'المشاريع المنتهية والمكتملة' : 'Completed Projects'}
              <span className={`ms-2 px-2 py-0.5 rounded-lg text-xs font-bold ${
                activeSubTab === 'completed' ? 'bg-green-850 text-green-100' : 'bg-slate-100 text-slate-600'
              }`}>
                {completedProjects.length}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveSubTab('upcoming');
                setActiveCategory('all');
              }}
              className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${
                activeSubTab === 'upcoming'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {isRtl ? 'المشاريع القائمة والمستقبلية' : 'Upcoming & Future Projects'}
              <span className={`ms-2 px-2 py-0.5 rounded-lg text-xs font-bold ${
                activeSubTab === 'upcoming' ? 'bg-green-850 text-green-100' : 'bg-slate-100 text-slate-600'
              }`}>
                {upcomingProjects.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Real-time search */}
            <div className="relative w-full md:w-96">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="text"
                placeholder={isRtl ? 'ابحث باسم المشروع، العميل أو الموقع...' : 'Search by project name, client, or location...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-600 focus:bg-white transition-all ${
                  isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                }`}
              />
            </div>

            {/* Category Selectors */}
            <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-green-100 text-green-950 border-green-300'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {isRtl ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Listings Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeSubTab}-${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredList.length > 0 ? (
              filteredList.map((proj, index) => (
                <div 
                  key={proj.id}
                  className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Badge and ID */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        {isRtl ? categories.find(c => c.id === proj.category)?.labelAr : categories.find(c => c.id === proj.category)?.labelEn}
                      </span>
                      <span className="font-mono text-xs text-slate-400 font-bold">
                        #{proj.id.toString().padStart(3, '0')}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug mb-3">
                      {isRtl ? proj.nameAr : proj.nameEn}
                    </h3>

                    {/* Scope text */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold mb-6">
                      {isRtl ? proj.scopeAr : proj.scopeEn}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black block">
                          {isRtl ? 'المالك / العميل' : 'Client / Owner'}
                        </span>
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                          <span className="truncate">{isRtl ? proj.clientAr : proj.clientEn}</span>
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black block">
                          {isRtl ? 'الموقع الجغرافي' : 'Location'}
                        </span>
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{isRtl ? proj.locationAr : proj.locationEn}</span>
                        </span>
                      </div>

                      <div className="space-y-1 border-t border-slate-200/50 pt-3">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black block">
                          {isRtl ? 'مدة وتاريخ التنفيذ' : 'Duration'}
                        </span>
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{isRtl ? proj.durationAr : proj.durationEn}</span>
                        </span>
                      </div>

                      <div className="space-y-1 border-t border-slate-200/50 pt-3">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black block">
                          {isRtl ? 'قيمة العقد الهندسية' : 'Contract Value'}
                        </span>
                        <span className="text-xs font-bold text-green-800 flex items-center gap-1">
                          <span className="font-mono font-black">
                            {proj.valueSAR ? proj.valueSAR.toLocaleString() : '---'}
                          </span>
                          <span className="text-[10px] font-black">{isRtl ? 'ر.س' : 'SAR'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Double Image Placeholder Section (Specifically requested: 2 reserved empty slots per project) */}
                    <div className="mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black block mb-2">
                        {isRtl ? 'معرض صور المشروع والموقع الميداني (محجوز)' : 'Project & Site Photo Gallery (Reserved Slots)'}
                      </span>
                      <div className="grid grid-cols-2 gap-3.5">
                        {/* Photo Box 1 */}
                        <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-3 text-center transition-colors hover:bg-slate-100 hover:border-slate-350">
                          <ImageIcon className="w-6 h-6 text-slate-400 mb-1 shrink-0" />
                          <span className="text-[10px] font-black text-slate-500 block">
                            {isRtl ? 'صورة موقع المشروع 1' : 'Site Image 1'}
                          </span>
                          <span className="text-[8px] font-semibold text-slate-400 block mt-0.5">
                            {isRtl ? 'منطقة محجوزة' : 'Reserved Slot'}
                          </span>
                        </div>
                        {/* Photo Box 2 */}
                        <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-3 text-center transition-colors hover:bg-slate-100 hover:border-slate-350">
                          <ImageIcon className="w-6 h-6 text-slate-400 mb-1 shrink-0" />
                          <span className="text-[10px] font-black text-slate-500 block">
                            {isRtl ? 'صورة موقع المشروع 2' : 'Site Image 2'}
                          </span>
                          <span className="text-[8px] font-semibold text-slate-400 block mt-0.5">
                            {isRtl ? 'منطقة محجوزة' : 'Reserved Slot'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar info */}
                  <div className="mt-4 pt-4 border-t border-slate-150">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                      <span className="text-slate-600">{isRtl ? 'الحالة الإنشائية ونسبة الإنجاز' : 'HSE & Project Status'}</span>
                      <span className={proj.progress === 100 ? 'text-green-700' : 'text-amber-600 font-mono'}>
                        {proj.progress === 100 ? (isRtl ? 'مكتمل بنسبة 100%' : '100% Fully Built') : `${proj.progress}% ${isRtl ? 'قيد التنفيذ' : 'In Progress'}`}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${proj.progress === 100 ? 'bg-green-750' : 'bg-amber-500'}`}
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 lg:col-span-2 text-center py-20 bg-white rounded-[2rem] border border-slate-200">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-lg font-black text-slate-900">{isRtl ? 'لم يتم العثور على نتائج تطابق البحث' : 'No projects match your search'}</h4>
                <p className="text-xs text-slate-500 mt-1 font-semibold">{isRtl ? 'حاول تعديل كلمات البحث أو اختيار فئة تصفية أخرى.' : 'Please adjust your filters or search keywords.'}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
