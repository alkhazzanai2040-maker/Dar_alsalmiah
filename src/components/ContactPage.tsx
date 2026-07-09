import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react';
import { dict } from '../data';
import { Language } from '../types';
import QuoteForm from './QuoteForm';

interface ContactPageProps {
  lang: Language;
}

export default function ContactPage({ lang }: ContactPageProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';
  const [locationCopied, setLocationCopied] = useState(false);

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
            {isRtl ? 'اتصل بنا' : 'Contact Us'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            {isRtl ? 'طلب عروض الأسعار والتواصل المباشر' : 'Quotations & Direct Corporate Channel'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            {isRtl 
              ? 'تواصل مباشرة مع المقر الرئيسي للشركة لطلب تسعير مشاريع البنية التحتية وتسوية المواقع وسفلتة الطرق.'
              : 'Direct communication channels for site excavations, heavy machinery leases, and civil engineering infrastructure.'}
          </p>
        </div>
      </div>

      {/* Main Content Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left panel: Direct contacts and Map placeholder */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className={`bg-green-950 text-white rounded-[2rem] p-8 border border-green-900 shadow-xl ${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xl font-black text-red-400 tracking-tight mb-2">{isRtl ? 'بيانات الاتصال الرسمية' : 'Headquarters Dispatch'}</h3>
              <p className="text-xs text-green-200 leading-relaxed font-semibold mb-6">
                {lang === 'ar' ? 'نسعد بخدمة المطورين العقاريين، مكاتب الاستفسارات والمناقصات بمدينة الرياض وكافة المدن.' : 'Interested in equipment rental lease or structural earthworks? Contact us directly.'}
              </p>

              <div className="space-y-5 text-xs font-semibold">
                <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-green-300 uppercase tracking-widest text-[9px] font-black block">{t.addressLabel}</span>
                    <p className="text-white mt-1 leading-relaxed">{t.addrDetails}</p>
                    <div className={`mt-3 flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse justify-start' : 'justify-start'}`}>
                      <a 
                        href="https://maps.app.goo.gl/Cs9e6oXE7h7tztmq8" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-900 hover:bg-green-855 text-white rounded-xl text-[10px] sm:text-[11px] font-black transition-all shadow-md border border-green-800"
                      >
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span>{isRtl ? 'فتح الخرائط والاتجاهات' : 'Open Directions'}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          const mapUrl = 'https://maps.app.goo.gl/Cs9e6oXE7h7tztmq8';
                          const fallbackCopyToClipboard = () => {
                            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                              navigator.clipboard.writeText(mapUrl)
                                .then(() => {
                                  setLocationCopied(true);
                                  setTimeout(() => setLocationCopied(false), 2500);
                                })
                                .catch(() => {
                                  // Silent catch
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
                                setLocationCopied(true);
                                setTimeout(() => setLocationCopied(false), 2500);
                              }).catch(() => {
                                fallbackCopyToClipboard();
                              });
                            } else {
                              fallbackCopyToClipboard();
                            }
                          } catch (e) {
                            fallbackCopyToClipboard();
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black transition-all border cursor-pointer ${
                          locationCopied 
                            ? 'bg-green-800 text-white border-green-700' 
                            : 'bg-green-950 hover:bg-green-900 text-green-300 border-green-900'
                        }`}
                      >
                        <span>
                          {locationCopied 
                            ? (isRtl ? 'تم نسخ الرابط!' : 'Link Copied!') 
                            : (isRtl ? 'مشاركة الموقع' : 'Share Location')}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-green-300 uppercase tracking-widest text-[9px] font-black block">{t.phoneLabel}</span>
                    <a href="tel:+966114337964" className="hover:underline hover:text-red-400 block text-white mt-1 font-mono" dir="ltr">+966 11 4337964</a>
                  </div>
                </div>

                <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-green-300 uppercase tracking-widest text-[9px] font-black block">{t.mobileLabel}</span>
                    <div className="mt-2 space-y-2.5">
                      <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <p className="text-red-400 font-extrabold text-sm font-mono" dir="ltr">00966500143271</p>
                        <div className="flex gap-1.5">
                          <a href="tel:00966500143271" className="bg-green-900 text-white p-1 rounded-md hover:bg-green-800 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a href="https://wa.me/966500143271" target="_blank" rel="noopener noreferrer" className="bg-green-800 text-white p-1 rounded-md hover:bg-green-750 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <p className="text-red-400 font-extrabold text-sm font-mono" dir="ltr">00966554454250</p>
                        <div className="flex gap-1.5">
                          <a href="tel:00966554454250" className="bg-green-900 text-white p-1 rounded-md hover:bg-green-800 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a href="https://wa.me/966554454250" target="_blank" rel="noopener noreferrer" className="bg-green-800 text-white p-1 rounded-md hover:bg-green-750 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-green-300 uppercase tracking-widest text-[9px] font-black block">{t.emailLabel}</span>
                    <p className="text-white mt-1 break-all font-mono">info@dasco-sa.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working hours card */}
            <div className={`bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] text-green-950 uppercase font-black tracking-wider block mb-1">{t.officeHours}</span>
              <h4 className="text-base font-black text-slate-900">{t.officeHoursVal}</h4>
              <p className="text-[10.5px] text-slate-600 font-semibold mt-3 leading-relaxed">
                {isRtl ? 'ملاحظة: تلتزم آلياتنا وسائقينا الميدانيين بنظام المناوبات 24 ساعة لتلبية مواعيد المشاريع الحرجة والإنقاذ الطارئ.' : 'Note: Field operations, machinery drivers, and supervisors run on 24/7 rotating shifts based on specific project schedules.'}
              </p>
            </div>

          </div>

          {/* Right panel: Custom Quotation form */}
          <div className="lg:col-span-8">
            <QuoteForm lang={lang} />
          </div>

        </div>
      </div>
    </motion.div>
  );
}
