import { useState } from 'react';
import { Phone, Mail, MapPin, Building, ShieldCheck, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { dict } from '../data';
import { Language } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  lang: Language;
  currentPage: 'home' | 'about' | 'services' | 'fleet' | 'projects' | 'careers' | 'contact';
  setCurrentPage: (page: 'home' | 'about' | 'services' | 'fleet' | 'projects' | 'careers' | 'contact') => void;
  scrollToSection: (id: string) => void;
}

export default function Footer({ lang, currentPage, setCurrentPage, scrollToSection }: FooterProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';
  const [copied, setCopied] = useState(false);

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
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 overflow-hidden" id="corporate-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Logo Brand Brand info */}
          <div className="flex flex-col gap-4">
            <div className={`flex items-center gap-3 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center justify-center p-1">
                <Logo className="h-16 sm:h-20 aspect-[1000/700] w-auto object-contain" isDarkBackground={true} />
              </div>
              <div>
                <h3 className="font-sans font-bold text-white tracking-tight text-lg leading-none">
                  {lang === 'ar' ? 'شركة دار السالمية' : 'DAR AL-SALMIAH'}
                </h3>
                <span className="text-xs text-green-550 font-bold">
                  {lang === 'ar' ? 'سجل تجاري وطني مصنف أول' : 'Grade 1 General Contracting'}
                </span>
              </div>
            </div>
            
            <p className={`text-sm text-slate-400 mt-2 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.crDescription}
            </p>

            <div className={`flex items-center gap-2 mt-2 text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <ShieldCheck className="w-5 h-5 text-green-550 shrink-0" />
              <span>{t.certified}</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:pl-8">
            <h4 className={`text-white text-sm font-bold uppercase tracking-wider mb-5 pb-2 border-b border-slate-900 ${isRtl ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className={`space-y-3 text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{isRtl ? '• ' : '• '}{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations list */}
          <div>
            <h4 className={`text-white text-sm font-bold uppercase tracking-wider mb-5 pb-2 border-b border-slate-900 ${isRtl ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'تخصصاتنا الأساسية' : 'Key Core Sectors'}
            </h4>
            <ul className={`space-y-3 text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              {[
                t.service1,
                t.service2,
                t.service3,
                t.service4,
                t.service5,
                t.service6
              ].map((service, idx) => (
                <li key={idx} className="text-slate-400 truncate">
                  {idx + 1}. {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts info details */}
          <div className="flex flex-col gap-4">
            <h4 className={`text-white text-sm font-bold uppercase tracking-wider mb-5 pb-2 border-b border-slate-900 ${isRtl ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'بيانات الاتصال السريع' : 'Official Credentials'}
            </h4>
            <ul className={`space-y-3.5 text-sm ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <li className={`flex flex-col gap-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{t.addrDetails}</span>
                </div>
                <div className={`flex gap-2 mt-1 ${isRtl ? 'flex-row-reverse justify-start' : 'justify-start'}`}>
                  <a 
                    href="https://maps.app.goo.gl/Cs9e6oXE7h7tztmq8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-md text-[11px] transition-colors border border-slate-800"
                  >
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{isRtl ? 'عرض في الخرائط' : 'View on Maps'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const mapUrl = 'https://maps.app.goo.gl/Cs9e6oXE7h7tztmq8';
                      const fallbackCopyToClipboard = () => {
                        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                          navigator.clipboard.writeText(mapUrl)
                            .then(() => {
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2500);
                            })
                            .catch(() => {
                              // Silent catch to prevent unhandled rejection
                            });
                        }
                      };

                      try {
                        if (navigator.share) {
                          navigator.share({
                            title: isRtl ? 'موقع شركة دار السالمية للمقاولات' : 'Dar Al-Salmiah Contracting Location',
                            text: t.addrDetails,
                            url: mapUrl
                          }).then(() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2500);
                          }).catch(() => {
                            // Fallback to clipboard if share was blocked/cancelled
                            fallbackCopyToClipboard();
                          });
                        } else {
                          fallbackCopyToClipboard();
                        }
                      } catch (e) {
                        fallbackCopyToClipboard();
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-colors border cursor-pointer ${
                      copied 
                        ? 'bg-slate-800 text-green-400 border-slate-700' 
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>
                      {copied 
                        ? (isRtl ? 'تم نسخ الرابط!' : 'Link Copied!') 
                        : (isRtl ? 'مشاركة الموقع' : 'Share Location')}
                    </span>
                  </button>
                </div>
              </li>
              <li className={`flex gap-2.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                <Phone className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div dir="ltr">
                  <span>+966 11 4337964</span>
                </div>
              </li>
              <li className={`flex gap-2.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                <Phone className="w-5 h-5 text-red-550 shrink-0 mt-0.5" />
                <div dir="ltr" className="font-semibold flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span>00966500143271</span>
                    <a href="tel:00966500143271" className="bg-red-950 text-red-400 p-1 rounded-md hover:bg-red-900 transition-colors" title={isRtl ? 'اتصال مباشر' : 'Call Directly'}>
                      <Phone className="w-3 h-3" />
                    </a>
                    <a href="https://wa.me/966500143271" target="_blank" rel="noopener noreferrer" className="bg-green-950 text-green-400 p-1 rounded-md hover:bg-green-900 transition-colors" title={isRtl ? 'واتساب' : 'WhatsApp'}>
                      <MessageCircle className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>00966554454250</span>
                    <a href="tel:00966554454250" className="bg-red-950 text-red-400 p-1 rounded-md hover:bg-red-900 transition-colors" title={isRtl ? 'اتصال مباشر' : 'Call Directly'}>
                      <Phone className="w-3 h-3" />
                    </a>
                    <a href="https://wa.me/966554454250" target="_blank" rel="noopener noreferrer" className="bg-green-950 text-green-400 p-1 rounded-md hover:bg-green-900 transition-colors" title={isRtl ? 'واتساب' : 'WhatsApp'}>
                      <MessageCircle className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </li>
              <li className={`flex gap-2.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                <Mail className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <a href="mailto:info@dasco-sa.com" className="break-all hover:text-white transition-colors">info@dasco-sa.com</a>
              </li>
              {/* Official Corporate Website Link */}
              <li className={`flex gap-2.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                <ExternalLink className="w-5 h-5 text-green-550 shrink-0 mt-0.5" />
                <a href="https://dasco-sa.com/" target="_blank" rel="noopener noreferrer" className="break-all text-green-400 hover:text-white transition-colors font-extrabold flex items-center gap-1">
                  <span>dasco-sa.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Commercial Registration Legal disclaimer */}
        <div className="border-t border-slate-900 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <div className={`flex flex-wrap items-center gap-4 justify-center md:justify-start ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-600" />
              <span>{lang === 'ar' ? 'سجل تجاري معتمد رقم: 1010022806' : 'Commercial Reg No: 1010022806'}</span>
            </span>
            <span className="text-slate-800">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.officeHoursVal}</span>
            </span>
          </div>

          <p className="text-center md:text-right" id="legal-disclaimer">
            {t.footerText}
          </p>
        </div>
      </div>
    </footer>
  );
}
