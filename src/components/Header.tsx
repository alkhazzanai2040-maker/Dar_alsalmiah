import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe, MapPin, MessageCircle } from 'lucide-react';
import { dict } from '../data';
import { Language } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Header({ lang, setLang, activeSection, scrollToSection }: HeaderProps) {
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
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'projects', label: t.projects },
    { id: 'fleet', label: t.fleet },
    { id: 'structure', label: t.orgStructure },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
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
              <a href="tel:0500143271" className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                <Phone className="w-3.5 h-3.5 text-red-550" />
                <span dir="ltr">0500143271</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="https://wa.me/966500143271" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-green-400 text-green-400 transition-colors bg-green-950/40 px-2 py-0.5 rounded-md border border-green-900/40">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب</span>
              </a>
            </div>
            <span className="hidden md:inline text-slate-700">|</span>
            <a href="mailto:dar_elsalmyah@hotmail.com" className="flex items-center gap-1.5 hover:text-green-500 transition-colors">
              <Mail className="w-3.5 h-3.5 text-green-400" />
              <span>dar_elsalmyah@hotmail.com</span>
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
              <span className="text-xs sm:text-sm">{isRtl ? 'الرياض، حي العريجاء الغربي، شارع أبي حنيفة' : 'Riyadh, Al-Urayja Al-Gharbi, Abi Hanifah St'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className={`transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3 text-slate-900' : 'bg-slate-950/80 backdrop-blur-md py-4 text-white border-b border-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-row">
            
            {/* Logo Brand Brand */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className={`flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0 ${isRtl ? 'text-right' : 'text-left'}`}
              id="brand-logo"
            >
              <div className="flex items-center justify-center p-0.5 sm:p-1 shrink-0">
                <Logo className="h-11 sm:h-16 w-auto" isDarkBackground={!scrolled} />
              </div>
              <div className="min-w-0">
                <h1 className={`font-sans font-black tracking-tight text-sm sm:text-lg md:text-xl lg:text-2xl leading-tight transition-colors duration-300 whitespace-nowrap ${
                  scrolled ? 'text-green-800' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'شركة دار السالمية للمقاولات' : 'DAR AL-SALMIAH CONTRACTING'}
                </h1>
                <p className={`text-[9px] sm:text-[11px] md:text-xs mt-0.5 sm:mt-1 leading-none font-black uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${
                  scrolled ? 'text-slate-600' : 'text-green-200/90'
                }`}>
                  {lang === 'ar' ? 'للمقاولات العامة - تصنيف أول' : 'General Contracting Grade 1'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2 flex-row" id="desktop-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeSection === item.id
                      ? scrolled
                        ? 'bg-green-700 text-white shadow-md'
                        : 'bg-white text-green-950 backdrop-blur-md'
                      : scrolled
                        ? 'hover:bg-green-50 text-green-800 hover:text-green-900'
                        : 'hover:bg-white/10 text-slate-200 hover:text-white'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Language Switcher & Call Action */}
            <div className="hidden sm:flex items-center gap-3 flex-row">
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                  scrolled
                    ? 'border-green-600 text-green-700 hover:bg-green-50 hover:border-green-700'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
                id="language-toggle"
              >
                <Globe className="w-3.5 h-3.5 text-green-600" />
                <span>{t.langToggle}</span>
              </button>
              
              <button 
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2.5 hover:scale-[1.02] active:scale-[0.98] bg-red-600 text-white hover:bg-red-750 font-extrabold rounded-xl text-xs shadow-sm transition-all"
                id="header-cta"
              >
                {lang === 'ar' ? 'طلب عرض سعر' : 'Get Proposal'}
              </button>
            </div>

            {/* Mobile Nav Button */}
            <div className="flex lg:hidden items-center gap-2 flex-row">
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className={`p-2 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                  scrolled
                    ? 'border-green-600 text-green-700 hover:bg-green-50'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
                title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
                id="mobile-header-lang-toggle"
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-extrabold ms-1 uppercase shrink-0">{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-xl transition-colors ${scrolled ? 'text-green-750 hover:bg-green-50' : 'text-white hover:bg-white/10'}`}
                aria-label="Toggle menu"
                id="mobile-menu-trigger"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-green-950 shadow-2xl z-40 transition-all duration-300 animate-fadeIn">
          <div className="px-5 pt-3 pb-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                } ${isRtl ? 'text-right' : 'text-left'}`}
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}

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
                <a href="tel:0500143271" className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-300 py-2 px-3 rounded-xl bg-green-950 hover:text-white border border-green-900/40">
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  <span dir="ltr" className="font-mono">اتصال</span>
                </a>
                <a href="https://wa.me/966500143271" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-300 py-2 px-3 rounded-xl bg-green-950 hover:text-white border border-green-900/40">
                  <MessageCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>واتساب</span>
                </a>
              </div>
              <a href="mailto:dar_elsalmyah@hotmail.com" className="flex items-center gap-3 text-sm text-slate-300 py-2 px-3 rounded-xl bg-green-950 hover:text-white">
                <Mail className="w-4 h-4 text-green-500" />
                <span>dar_elsalmyah@hotmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
