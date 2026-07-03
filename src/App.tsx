import { useState, useEffect } from 'react';
import { 
  HardHat, Construction, Truck, Building, Search, Award, Phone, Mail, MapPin, 
  ShieldCheck, CheckCircle2, Calculator, Sparkles, Shovel, Play, HelpCircle, 
  Wrench, Waves, Container, Wand, Combine, Hammer, ShieldAlert, Flame, Bus, 
  Car, Layers, Activity, Anchor, CheckSquare, Settings, Compass, Gauge, Power, 
  Wind, Lightbulb, Database, Shuffle, MessageCircle, Send
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import StatSummary from './components/StatSummary';
import OrgChartStructure from './components/OrgChartStructure';
import QuoteForm from './components/QuoteForm';
import ProjectsPage from './components/ProjectsPage';
import CareersPage from './components/CareersPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import FleetPage from './components/FleetPage';
import ContactPage from './components/ContactPage';

import { projects, equipmentList, dict } from './data';
import { Language, Project } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'fleet' | 'projects' | 'careers' | 'contact'>('home');
  const [activeSection, setActiveSection] = useState('home');
  const [activeProjectCategory, setActiveProjectCategory] = useState<string>('all');
  const [activeFleetCategory, setActiveFleetCategory] = useState<string>('all');
  
  // Real-time Search states
  const [projectQuery, setProjectQuery] = useState('');
  const [fleetQuery, setFleetQuery] = useState('');
  const [locationCopied, setLocationCopied] = useState(false);

  const t = dict[lang];
  const isRtl = lang === 'ar';

  // URL Hash routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'about', 'services', 'fleet', 'projects', 'careers', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash as any);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Custom handler to sync browser address bar hash cleanly
  const handlePageChange = (page: 'home' | 'about' | 'services' | 'fleet' | 'projects' | 'careers' | 'contact') => {
    if (page === 'home') {
      // Clean URL hash without triggering scroll or page reload
      window.history.pushState(null, '', window.location.pathname);
      setCurrentPage('home');
    } else {
      window.location.hash = page;
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth Scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Monitor scroll to update active menu visual indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'projects', 'fleet', 'structure', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects dynamically
  const filteredProjects = projects.filter((proj) => {
    // Search filter match
    const textToSearch = `${proj.nameAr} ${proj.nameEn} ${proj.clientAr} ${proj.clientEn} ${proj.locationAr} ${proj.locationEn}`.toLowerCase();
    const matchesSearch = textToSearch.includes(projectQuery.toLowerCase());
    
    // Category filter match
    if (activeProjectCategory === 'all') return matchesSearch;
    return proj.category === activeProjectCategory && matchesSearch;
  });

  // Filter industrial fleet assets
  const filteredFleet = equipmentList.filter((eq) => {
    const nameMatches = `${eq.nameAr} ${eq.nameEn}`.toLowerCase().includes(fleetQuery.toLowerCase());
    if (activeFleetCategory === 'all') return nameMatches;
    return eq.category === activeFleetCategory && nameMatches;
  });

  // Calculate sum of contract values listed
  const totalContractsValue = projects.reduce((acc, curr) => acc + curr.valueSAR, 0);

  // Map string to Lucide icon dynamically for Equipment Fleet cards safely
  const getEquipmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat': return HardHat;
      case 'Construction': return Construction;
      case 'LoaderPinpoint': return Shovel;
      case 'Zap': return Gauge;
      case 'Cpu': return Compass;
      case 'Waves': return Waves;
      case 'Truck': return Truck;
      case 'Container': return Container;
      case 'Wand': return Wand;
      case 'Combine': return Combine;
      case 'Hammer': return Hammer;
      case 'Wrench': return Wrench;
      case 'ShieldAlert': return ShieldAlert;
      case 'Shovel': return Shovel;
      case 'Flame': return Flame;
      case 'Bus': return Bus;
      case 'Car': return Car;
      case 'Layers': return Layers;
      case 'Activity': return Activity;
      case 'Anchor': return Anchor;
      case 'CheckSquare': return CheckSquare;
      case 'Settings': return Settings;
      case 'Compass': return Compass;
      case 'Gauge': return Gauge;
      case 'Power': return Power;
      case 'Wind': return Wind;
      case 'Lightbulb': return Lightbulb;
      case 'Database': return Database;
      case 'Shuffle': return Shuffle;
      default: return Construction;
    }
  };

  // Serve crisp relevant images for each project category & ID rotation
  const getProjectImage = (id: number, category: string): string => {
    const projectPhotos = [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80", // steel infrastructure
      "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80", // paving roller
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?auto=format&fit=crop&w=600&q=80", // concrete build
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80", // modern landscape
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80", // pipe systems
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80", // heavy excavation crawler
      "https://images.unsplash.com/photo-1531834685032-c34bf0d8b939?auto=format&fit=crop&w=600&q=80", // grading terrain
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80", // residential plot prep
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", // municipal drainage lines
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80", // industrial site
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80", // structural warehouse build
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=transform&fit=crop&w=600&q=80", // asphalt laying area
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", // crane lift
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"  // corporate base setup
    ];
    if (category === 'roads') return projectPhotos[1];
    if (category === 'excavation') return projectPhotos[5];
    if (category === 'utility') return projectPhotos[4];
    if (category === 'infrastructure') return projectPhotos[0];
    return projectPhotos[id % projectPhotos.length];
  };



  return (
    <div className={`min-h-screen bg-slate-100 text-slate-900 font-sans tracking-tight overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header component */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />

      {currentPage === 'about' ? (
        <AboutPage lang={lang} />
      ) : currentPage === 'services' ? (
        <ServicesPage lang={lang} />
      ) : currentPage === 'fleet' ? (
        <FleetPage lang={lang} />
      ) : currentPage === 'projects' ? (
        <ProjectsPage lang={lang} projects={projects} />
      ) : currentPage === 'careers' ? (
        <CareersPage lang={lang} />
      ) : currentPage === 'contact' ? (
        <ContactPage lang={lang} />
      ) : (
        <>
          {/* Hero Landing Section */}
          <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-slate-950 text-white overflow-hidden">
            {/* Dynamic Abstract Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/45 via-slate-950/95 to-slate-950 z-0" />
            
            {/* Dynamic brand lines with Bento geometry */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none transform skew-x-12 z-0 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-12 bg-green-700 scale-y-125 translate-x-12 rotate-12" />
              <div className="absolute inset-y-0 left-24 w-16 bg-red-650 scale-y-125 translate-x-24 rotate-12" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
              <div className="max-w-4xl flex flex-col items-start gap-4">
                
                {/* Top Badge of commercial validation */}
                <div className={`flex items-center gap-2 px-3.5 py-2 bg-green-950/85 border border-green-900/50 rounded-full text-green-300 text-xs font-bold backdrop-blur-md ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <ShieldCheck className="w-4 h-4 text-red-550 shrink-0" />
                  <span>{t.certified}</span>
                </div>

                {/* Main Catchy Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mt-3">
                  {t.title}
                </h1>
                
                {/* Catchy dynamic Subtitle */}
                <p className="text-lg sm:text-xl text-slate-100 max-w-2xl leading-relaxed mt-1 font-medium">
                  {t.subtitle}
                </p>

                <p className="text-sm text-slate-400 max-w-2xl leading-relaxed font-normal">
                  {isRtl 
                    ? 'إحدى الشركات الوطنية الرائدة والمسجلة بشكل رسمي والمصنفة درجة أولى لتنفيذ مشاريع صيانة الطرق والكباري والسكك الحديدية وقنوات تصريف السيول بأسطول عملاق تملكه الشركة بالكامل.'
                    : 'One of the premium first-class classified Saudi entities officially qualified to complete major road paving, highway works, railways, excavations, and stormwater culvert systems with a massive corporate fleet.'}
                </p>

                {/* Direct Action triggers */}
                <div className={`flex flex-wrap gap-4 mt-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-red-600 text-white hover:bg-red-750 hover:scale-[1.02] active:scale-[0.98] transition-all font-extrabold rounded-2xl text-sm shadow-lg shadow-red-950/20 cursor-pointer"
                  >
                    {lang === 'ar' ? 'طلب تسعير ومناقصة' : 'Request Quotation'}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-green-950/80 border border-green-900/70 hover:bg-green-900/80 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold rounded-2xl text-sm text-slate-200 cursor-pointer"
                  >
                    {lang === 'ar' ? 'تصفح المشاريع 27' : 'Browse Projects (27)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic bottom curve separator */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-100" />
          </section>

      {/* Count Summary cards overlay */}
      <StatSummary lang={lang} />

      {/* Official Registry Credentials info segment */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center gap-8 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Graphic Badge */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shrink-0 w-full sm:w-64">
              <div className="bg-gradient-to-tr from-green-950 to-green-900 p-4 rounded-xl text-red-500 shadow-md mx-auto mb-3 border border-green-800">
                <Building className="w-8 h-8" />
              </div>
              <h4 className="text-xs font-black text-green-900 uppercase tracking-widest">{lang === 'ar' ? 'درجة تصنيف أولى' : 'CR No. 1010022806'}</h4>
              <p className="text-base font-black text-slate-900 mt-1">{lang === 'ar' ? 'سجل رقم: 1010022806' : 'Licensed & Certified'}</p>
              <span className="text-[10px] text-red-700 font-black mt-2 px-2 py-0.5 bg-red-50 rounded-full border border-red-200">
                {lang === 'ar' ? 'وزارة التجارة السعودية' : 'Saudi Chamber Registered'}
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
      </section>

      {/* About Section - Profile facts */}
      <section id="about" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* About Intro Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual presentation card representing Page 1/Page 5 values */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-green-950 text-white rounded-[2rem] p-8 border border-green-900 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
                {/* Brand color bars bottom right */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl font-black uppercase select-none pointer-events-none">DAR</div>
                
                <div>
                  <span className="text-xs font-black text-red-400 tracking-wider uppercase bg-green-900/50 border border-green-800 px-3 py-1.5 rounded-full inline-block mb-4">
                    {t.yearsOfExp}
                  </span>
                  
                  <h3 className="text-3xl font-black tracking-tight mb-3">
                    {lang === 'ar' ? 'منذ عام 1979م وحتى اليوم' : 'Establishing Trust Since 1979'}
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

              {/* Direct links contacts */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h4 className={`text-xs font-black text-green-950 mb-3 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{t.phoneLabel}</h4>
                <div className={`flex flex-col gap-2.5 text-xs text-slate-700 ${isRtl ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Phone className="w-4 h-4 text-green-700 shrink-0" />
                    <span className="font-medium">{isRtl ? 'هاتف رئيسي:' : 'Direct Phone 1:'} <strong className="font-mono">+966 11 4329595</strong></span>
                  </div>
                  <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Phone className="w-4 h-4 text-green-700 shrink-0" />
                    <span className="font-medium">{isRtl ? 'هاتف فرعي:' : 'Direct Phone 2:'} <strong className="font-mono">+966 11 4337964</strong></span>
                  </div>
                  <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Mail className="w-4 h-4 text-green-700 shrink-0" />
                    <span className="font-mono">dar_elsalmyah@hotmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission  & Vision details cards */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              
              <div className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative ${isRtl ? 'text-right' : 'text-left'}`} id="mission-card">
                <span className="text-xs text-green-750 font-extrabold uppercase tracking-widest block mb-2">{t.missionTitle}</span>
                <h3 className="text-xl font-black text-slate-900 mb-3">{lang === 'ar' ? 'حرفية مهنية متوارثة' : 'Commitment to High Execution Professionalism'}</h3>
                <p className="text-sm text-slate-650 leading-relaxed font-medium">
                  {t.missionDesc}
                </p>
              </div>

              <div className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative ${isRtl ? 'text-right' : 'text-left'}`} id="vision-card">
                <span className="text-xs text-green-750 font-extrabold uppercase tracking-widest block mb-2">{t.visionTitle}</span>
                <h3 className="text-xl font-black text-slate-900 mb-3">{lang === 'ar' ? 'التعزيز الاقتصادي للبنية التحتية' : 'Enhancing the Infrastructure Quality'}</h3>
                <p className="text-sm text-slate-650 leading-relaxed font-medium">
                  {t.visionDesc}
                </p>
              </div>

              {/* Core trust block summary (Page 7 details) */}
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

              <div className={`mt-4 flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-green-900 hover:bg-green-800 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>{isRtl ? 'عرض السيرة الذاتية والهيكل التنظيمي الكامل والشهادات ←' : 'Read Full Corporate Bio & Org Chart ←'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Success Story & Strategic Partnerships Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1: Perfect Success Story details */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-black tracking-widest text-green-900 uppercase bg-green-150 px-3.5 py-1.5 rounded-full inline-block mb-3">
                  {isRtl ? 'قصة نجاح متكاملة' : 'An Exemplary Success Story'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
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
                    : 'Since the establishment of Dar Al-Salmiyah Contracting in Riyadh in 1979, we have mapped out an exemplary path of engineering dedication and integrity. For over four and a half decades, we have overcome challenging geographical and logistical terrains, delivering legacy success stories in massive site preparation, strategic roadworks, and bulk water transmission lines.'}
                </p>
                <p>
                  {isRtl 
                    ? 'إن تفوقنا يرتكز بالدرجة الأولى على ملكيتنا الكاملة لواحد من أضخم أساطيل المعدات الثقيلة الوطنية، والذي يضم أكثر من 400 آلية ومعدة تخصصية نشطة بالكامل في شتى أنحاء المملكة. يتيح لنا هذا الأسطول الضخم تنفيذ أشد المشاريع حرجاً بالاعتماد الذاتي التام والجاهزية الفورية، دون المساس بمعايير الجودة الفائقة.'
                    : 'Our unparalleled superiority rests firmly on our 100% physical ownership of one of the largest heavy equipment fleets in the Kingdom, boasting over 400 active, specialized machineries. This robust fleet enables us to execute critical projects with total self-reliance and immediate mobilization, upholding top-tier construction standards.'}
                </p>
              </div>

              {/* Fast stats highlighting experience and fleet */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-white p-5 border border-slate-200 rounded-[1.5rem] shadow-xs flex flex-col justify-center">
                  <span className="text-3xl sm:text-4xl font-black text-green-950 block">47+</span>
                  <span className="text-xs font-black text-slate-950 mt-1">{isRtl ? 'سنة من الخبرة الإنشائية' : 'Years of Legacy'}</span>
                  <span className="text-[10px] text-slate-450 mt-0.5">{isRtl ? 'منذ عام 1979م وحتى اليوم' : 'Established in 1979'}</span>
                </div>
                <div className="bg-white p-5 border border-slate-200 rounded-[1.5rem] shadow-xs flex flex-col justify-center">
                  <span className="text-3xl sm:text-4xl font-black text-red-600 block">400+</span>
                  <span className="text-xs font-black text-slate-950 mt-1">{isRtl ? 'آلية ثقيلة نشطة' : 'Heavy Equipment Assets'}</span>
                  <span className="text-[10px] text-slate-450 mt-0.5">{isRtl ? 'أكبر أساطيل الرياض تخصصاً' : '100% Owned fleet'}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Strategic Partnership with major companies */}
            <div className="lg:col-span-5 bg-gradient-to-br from-green-950 to-slate-950 text-white rounded-[2.5rem] p-8 border border-green-900/60 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
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

                <h3 className="text-2xl font-black text-white leading-tight mb-4">
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
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-950 text-white border-t border-b border-green-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-red-400 uppercase bg-green-900/50 border border-green-800 px-3 py-1.5 rounded-full inline-block mb-3">
              {t.services}
            </span>
            <h2 className="text-4xl font-black tracking-tight mb-4 text-white">
              {lang === 'ar' ? 'باقة خدماتنا المعتمدة هندسياً' : 'Our Fully Qualified Engineering Services'}
            </h2>
            <p className="text-green-200 text-sm">
              {t.servicesSubtitle}
            </p>
          </div>

          {/* Services Box Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, title: t.service1, desc: t.service1Desc, icon: Shovel, color: 'text-red-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-red-950/50 text-red-400 border-red-900/50' },
              { id: 2, title: t.service2, desc: t.service2Desc, icon: Building, color: 'text-green-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-green-950/50 text-green-400 border-green-900/50' },
              { id: 3, title: t.service3, desc: t.service3Desc, icon: Truck, color: 'text-red-400 bg-slate-900/80 border-slate-800', badgeColor: 'bg-red-950/50 text-red-400 border-red-900/50' }
            ].map((srv) => {
              const Icon = srv.icon;
              return (
                <div 
                  key={srv.id} 
                  className={`p-8 rounded-[2rem] border ${srv.color} transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 flex flex-col justify-between`}
                  id={`service-card-${srv.id}`}
                >
                  <div className="flex flex-col gap-4">
                    <div className={`p-3.5 rounded-2xl w-fit border ${srv.badgeColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">{srv.title}</h3>
                    <p className={`text-xs text-slate-300 leading-relaxed font-medium ${isRtl ? 'text-right' : 'text-left'}`}>{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                handlePageChange('services');
              }}
              className="px-8 py-4 bg-red-650 hover:bg-red-750 text-white hover:scale-[1.02] active:scale-[0.98] transition-all font-extrabold rounded-2xl text-xs shadow-lg shadow-red-950/20 cursor-pointer inline-flex items-center gap-2"
            >
              <span>{isRtl ? 'عرض تفاصيل الخدمات والاعتمادات والرموز الإنشائية ←' : 'View Full Services & Specifications Catalog ←'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* Fleets Equipment Section */}
      <section id="fleet" className="py-20 bg-white border-t border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-green-950 uppercase bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
              {t.fleet}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              {isRtl ? 'معدات وأسطول الشركة المتبنى ميكانيكياً' : 'Heavy Mechanical Asset Registry'}
            </h2>
            <p className="text-slate-655 text-sm leading-relaxed font-semibold">
              {t.fleetSubtitle}
            </p>

            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-950 text-red-400 border border-green-900 rounded-2xl text-xs font-black shadow-sm">
              <span>{t.totalFleetCount}:</span>
              <span className="font-extrabold text-white">{isRtl ? '400+ آليات نشطة بالكامل تملكها الشركة 100%' : '400+ Active Fully-Owned Machineries'}</span>
            </div>
          </div>

          {/* Quick Category Summary Grid for Home Page (High level, no complex search/filter inputs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { labelAr: 'معدات الحفر والتسوية', labelEn: 'Earthmoving & Grading', count: '150+ آلية', subAr: 'بلدوزرات، حفارات، غرايدرات', subEn: 'Bulldozers, Excavators', icon: Shovel },
              { labelAr: 'الناقلات وسيارات الخدمة', labelEn: 'Heavy Hauling & Dumpers', count: '120+ وحدة', subAr: 'شاحنات نقل الركام والخرسانة', subEn: 'Heavy Dumpers, Mixers', icon: Truck },
              { labelAr: 'معدات الإسفلت والرصف', labelEn: 'Asphalt & Paving Fleet', count: '65+ آلية', subAr: 'رصاصات، فرادات إسفلت حديثة', subEn: 'Rollers, Pavers', icon: Settings },
              { labelAr: 'مولدات ومحطات الطاقة', labelEn: 'Generators & Power Units', count: '45+ وحدة', subAr: 'مولدات طاقة كهروميكانيكية', subEn: 'Caterpillar Generators', icon: Power },
              { labelAr: 'آليات هيدروليكية وتخصصية', labelEn: 'Specialized Sub-systems', count: '20+ آليات', subAr: 'شاكوش هيدروليكي، حفارات عميقة', subEn: 'Hydraulic Hammers', icon: Hammer }
            ].map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div key={index} className="bg-slate-50 border border-slate-200/80 rounded-[2rem] p-6 text-center hover:shadow-md transition-all flex flex-col justify-between items-center min-h-[220px]">
                  <div className="p-4 bg-green-50 text-green-900 rounded-2xl border border-green-150 mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 tracking-tight leading-tight mb-1">
                      {isRtl ? cat.labelAr : cat.labelEn}
                    </h4>
                    <p className="text-[10px] text-slate-500 mb-3 font-semibold">
                      {isRtl ? cat.subAr : cat.subEn}
                    </p>
                  </div>
                  <span className="text-[11px] font-black text-red-650 bg-red-50 border border-red-150 px-3 py-1 rounded-xl">
                    {cat.count}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                handlePageChange('fleet');
              }}
              className="px-8 py-4 bg-green-950 hover:bg-green-900 text-white hover:scale-[1.02] active:scale-[0.98] transition-all font-bold rounded-2xl text-xs shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>{isRtl ? 'فتح دليل الأسطول وتصفية الفئات بالتفصيل ←' : 'Open Full Machinery Catalog & Category Filters ←'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* Elegant Contact CTA Section for Home Page (Directing to the dedicated Contact Page) */}
      <section id="contact" className="py-24 bg-gradient-to-br from-green-950 via-slate-950 to-slate-950 text-white scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/30 via-transparent to-transparent opacity-40 select-none pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-black tracking-widest text-red-400 uppercase bg-green-900/40 border border-green-800 px-3.5 py-1.5 rounded-full inline-block mb-4">
            {isRtl ? 'طلب عروض الأسعار والتسعير' : 'Corporate Inquiries & Quotations'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            {isRtl ? 'جاهز لتنفيذ مشروعك القادم بأعلى معايير الجودة؟' : 'Ready to execute your project with unmatched quality standards?'}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-8 font-semibold leading-relaxed">
            {isRtl 
              ? 'تواصل مع فريقنا الهندسي اليوم لطلب عرض سعر تفصيلي متكامل ومناقشة الجداول الزمنية والآليات المخصصة لمشروعك.'
              : 'Partner with Saudi Arabia\'s most trusted infrastructure specialists. Contact us today to request an engineering proposal.'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => {
                handlePageChange('contact');
              }}
              className="px-8 py-4 bg-red-650 hover:bg-red-750 text-white hover:scale-[1.02] active:scale-[0.98] transition-all font-extrabold rounded-2xl text-xs shadow-lg cursor-pointer inline-flex items-center gap-2"
            >
              <span>{isRtl ? 'الانتقال لنموذج طلب عرض سعر هندسي ←' : 'Go to Engineering Quote Form ←'}</span>
            </button>
            
            <a
              href="tel:+966114329595"
              className="px-8 py-4 bg-green-900 hover:bg-green-850 text-white hover:scale-[1.02] active:scale-[0.98] transition-all font-bold rounded-2xl text-xs shadow-md border border-green-800 inline-flex items-center gap-2"
            >
              <span>{isRtl ? 'اتصل بمركز الخدمات الرئيسي' : 'Call Main Office Dispatch'}</span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-900 text-xs font-semibold text-slate-400">
            <div>
              <span className="text-[10px] text-green-400 uppercase font-black tracking-wider block mb-1">{isRtl ? 'البريد الرسمي للتواصل' : 'Corporate Email'}</span>
              <span className="text-white font-mono">info@dasco-sa.com</span>
            </div>
            <div>
              <span className="text-[10px] text-green-400 uppercase font-black tracking-wider block mb-1">{isRtl ? 'الرقم الموحد للشركة' : 'Main HQ Line'}</span>
              <span className="text-white font-mono" dir="ltr">+966 11 4329595</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-green-400 uppercase font-black tracking-wider block mb-1">{isRtl ? 'موقع الإدارة والمستودع الرئيسي' : 'Corporate Logistics HQ'}</span>
              <span className="text-white">{isRtl ? 'حي الشفا، الرياض، المملكة العربية السعودية' : 'Al-Shifa District, Riyadh, KSA'}</span>
            </div>
          </div>

        </div>
      </section>

        </>
      )}

      {/* Footer component */}
      <div className="pb-16 md:pb-0 landscape:pb-0">
        <Footer 
          lang={lang} 
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          scrollToSection={scrollToSection} 
        />
      </div>

      {/* Floating Bottom Quick Action Bar for Mobile Experience */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden landscape:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-900 px-3 py-2 shadow-2xl flex items-center justify-around text-white">
        <a 
          href="tel:0500143271" 
          className="flex items-center gap-1 hover:text-red-455 transition-colors bg-red-950/40 px-2 py-1 rounded-lg border border-red-900/30 shrink-0"
        >
          <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="text-[10px] font-black">{isRtl ? 'اتصل' : 'Call'}</span>
        </a>

        <a 
          href="https://wa.me/966500143271" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:text-green-400 transition-colors bg-green-950/40 px-2 py-1 rounded-lg border border-green-900/40 shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
          <span className="text-[10px] font-black">{isRtl ? 'واتساب' : 'WhatsApp'}</span>
        </a>

        <a 
          href="https://maps.app.goo.gl/Cs9e6oXE7h7tztmq8" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:text-red-455 transition-colors bg-red-950/40 px-2 py-1 rounded-lg border border-red-900/30 shrink-0"
        >
          <MapPin className="w-3.5 h-3.5 text-red-550 shrink-0" />
          <span className="text-[10px] font-black">{isRtl ? 'موقعنا' : 'Location'}</span>
        </a>

        <button 
          onClick={() => {
            handlePageChange('contact');
          }}
          className="flex items-center gap-1 hover:text-red-455 transition-colors cursor-pointer bg-green-900/30 px-2 py-1 rounded-lg border border-green-800/30 shrink-0"
        >
          <Send className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="text-[10px] font-black">{isRtl ? 'عرض سعر' : 'Quote'}</span>
        </button>
      </div>

    </div>
  );
}
