import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { dict } from '../data';
import { Language } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: 'home' | 'about' | 'services' | 'fleet' | 'projects' | 'careers' | 'contact';
  setCurrentPage: (page: 'home' | 'about' | 'services' | 'fleet' | 'projects' | 'careers' | 'contact') => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Header({ lang, setLang, currentPage, setCurrentPage, activeSection, scrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = dict[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: lang === 'ar' ? 'الرئيسية' : 'Home', type: 'page' },
    { id: 'about', label: t.about, type: 'page' },
    { id: 'services', label: t.services, type: 'page' },
    { id: 'fleet', label: t.fleet, type: 'page' },
    { id: 'projects', label: t.projects, type: 'page' },
    { id: 'careers', label: lang === 'ar' ? 'طلب التوظيف' : 'Careers', type: 'page' },
    { id: 'contact', label: t.contact, type: 'page' },
  ];

  const handleNavClick = (item: { id: string; type: string }) => {
    setCurrentPage(item.id as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const isRtl = lang === 'ar';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Brief Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 border-b border-green-900/30 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 flex-row">
            <div className="flex items-center gap-3">
              <a href="tel:00966500143271" className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                <Phone className="w-3.5 h-3.5 text-red-550" />
                <span dir="ltr">00966500143271</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="https://wa.me/966500143271" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-green-400 text-green-400 transition-colors bg-green-950/40 px-2 py-0.5 rounded-md border border-green-900/40">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب</span>
              </a>
            </div>
            <span className="hidden md:inline text-slate-700">|</span>
            <a href="mailto:info@dasco-sa.com" className="flex items-center gap-1.5 hover:text-green-500 transition-colors">
              <Mail className="w-3.5 h-3.5 text-green-400" />
              <span>info@dasco-sa.com</span>
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            {/* Official Website Link */}
            <a href="https://dasco-sa.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-green-400 text-green-400 font-extrabold transition-all">
              <ExternalLink className="w-3.5 h-3.5 text-green-400" />
              <span>dasco-sa.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2 flex-row">
            <a 
              href="https://maps.app.goo.gl/Cs9e6oXE7h7tztmq8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              title={isRtl ? 'عرض موقعنا في خرائط جوجل' : 'View our HQ location'}
            >
              <MapPin className="w-3.5 h-3.5 text-red-550 shrink-0" />
              <span className="text-xs sm:text-sm">{isRtl ? 'الرياض - شارع الإمام أبي حنيفة' : 'Riyadh - Imam Abi Hanifah St'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-1.5 sm:py-2 md:py-2.5 lg:py-3 landscape:py-1 text-slate-900' 
          : 'bg-slate-950/80 backdrop-blur-md py-2 sm:py-3 lg:py-4 landscape:py-1.5 text-white border-b border-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-row">
            
            {/* Logo Brand Brand */}
            <div 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0 md:order-1 ${isRtl ? 'text-right' : 'text-left'} ${isRtl ? 'order-2' : 'order-1'}`}
              id="brand-logo"
            >
              <div className="flex items-center justify-center p-0.5 sm:p-1 shrink-0">
                <Logo className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 landscape:h-9 aspect-[1000/700] w-auto object-contain transition-all duration-300" isDarkBackground={!scrolled} />
              </div>
              <div className="min-w-0">
                <h1 className={`font-sans font-black tracking-tight text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl leading-tight transition-colors duration-300 whitespace-nowrap landscape:text-xs ${
                  scrolled ? 'text-green-800' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'شركة دار السالمية للمقاولات' : 'DAR AL-SALMIAH CONTRACTING'}
                </h1>
                <p className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs mt-0.5 sm:mt-1 leading-none font-black uppercase tracking-wider transition-colors duration-300 whitespace-nowrap landscape:text-[7.5px] ${
                  scrolled ? 'text-slate-600' : 'text-green-200/90'
                }`}>
                  {lang === 'ar' ? 'للمقاولات العامة - تصنيف أول' : 'General Contracting Grade 1'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links - Static for iPad/Tablets and laptops/desktops */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 flex-row md:order-2" id="desktop-nav">
              {navItems.map((item) => {
                const isItemActive = 
                  (item.id === currentPage) || 
                  (currentPage === 'home' && item.type === 'scroll' && activeSection === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`px-1.5 py-1 md:px-2 md:py-1.5 lg:px-3 lg:py-2 rounded-xl text-[10px] md:text-xs lg:text-sm font-black transition-all duration-200 shrink-0 ${
                      isItemActive
                        ? scrolled
                          ? 'bg-green-700 text-white shadow-md'
                          : 'bg-white text-green-950 backdrop-blur-md'
                        : scrolled
                          ? 'hover:bg-green-50 text-green-850 hover:text-green-900'
                          : 'hover:bg-white/10 text-slate-200 hover:text-white'
                    }`}
                    id={`nav-link-${item.id}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Language Switcher & Call Action - Visible only on Tablet and Desktop */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-3 flex-row md:order-3">
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className={`flex items-center gap-1.5 px-2 py-1.5 lg:px-3 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-wider border transition-all shrink-0 ${
                  scrolled
                    ? 'border-green-600 text-green-700 hover:bg-green-50 hover:border-green-700'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
                id="language-toggle"
              >
                <Globe className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-green-600" />
                <span>{t.langToggle}</span>
              </button>
              
              <button 
                onClick={() => handleNavClick({ id: 'contact', type: 'scroll' })}
                className="px-2.5 py-1.5 md:px-3 md:py-2 lg:px-5 lg:py-2.5 hover:scale-[1.02] active:scale-[0.98] bg-red-600 text-white hover:bg-red-750 font-extrabold rounded-xl text-[10px] md:text-xs shadow-sm transition-all shrink-0"
                id="header-cta"
              >
                {lang === 'ar' ? 'طلب عرض سعر' : 'Get Proposal'}
              </button>
            </div>

            {/* Mobile Nav Button - Visible only on mobile below md (768px) */}
            <div className={`flex md:hidden items-center gap-2 flex-row md:order-3 ${isRtl ? 'order-1' : 'order-2'}`}>
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className={`p-1.5 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                  scrolled
                    ? 'border-green-600 text-green-700 hover:bg-green-50'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
                title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
                id="mobile-header-lang-toggle"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[9px] font-extrabold ms-1 uppercase shrink-0">{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-1.5 rounded-xl transition-colors ${scrolled ? 'text-green-750 hover:bg-green-50' : 'text-white hover:bg-white/10'}`}
                aria-label="Toggle menu"
                id="mobile-menu-trigger"
              >
                {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-green-950 shadow-2xl z-40 transition-all duration-300 animate-fadeIn">
          <div className="px-5 pt-3 pb-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const isItemActive = 
                (item.id === currentPage) || 
                (currentPage === 'home' && item.type === 'scroll' && activeSection === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-black transition-all ${
                    isItemActive
                      ? 'bg-red-600 text-white'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                  } ${isRtl ? 'text-right' : 'text-left'}`}
                  id={`mobile-nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Language Switcher Button Inside Mobile Menu */}
            <button
              onClick={() => {
                setLang(lang === 'ar' ? 'en' : 'ar');
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all bg-green-950/45 hover:bg-green-900/30 border border-green-900/30 text-slate-200 mt-1"
              id="mobile-language-toggle"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" />
                <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
              </span>
              <span className="text-xs text-green-400 font-extrabold bg-green-950 px-2.5 py-1 rounded-lg border border-green-900/50">
                {lang === 'ar' ? 'English' : 'عربي'}
              </span>
            </button>
            <div className="mt-4 pt-4 border-t border-green-950/40 flex flex-col gap-2">
              <div className="flex gap-2">
                <a href="tel:00966500143271" className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-300 py-2 px-3 rounded-xl bg-green-950 hover:text-white border border-green-900/40">
                  <Phone className="w-3.5 h-3.5 text-red-550" />
                  <span dir="ltr" className="font-mono">اتصال</span>
                </a>
                <a href="https://wa.me/966500143271" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-300 py-2 px-3 rounded-xl bg-green-950 hover:text-white border border-green-900/40">
                  <MessageCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>واتساب</span>
                </a>
              </div>
              <a href="mailto:info@dasco-sa.com" className="flex items-center gap-3 text-sm text-slate-300 py-2 px-3 rounded-xl bg-green-950 hover:text-white">
                <Mail className="w-4 h-4 text-green-500" />
                <span>info@dasco-sa.com</span>
              </a>
              {/* Mobile Official Website Link */}
              <a href="https://dasco-sa.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-300 py-2 px-3 rounded-xl bg-green-950 hover:text-white font-extrabold border border-green-900/30">
                <ExternalLink className="w-4 h-4 text-green-500" />
                <span>dasco-sa.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
