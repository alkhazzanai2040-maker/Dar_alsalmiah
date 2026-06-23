import { useState, FormEvent } from 'react';
import { Calculator, Send, CheckCircle2 } from 'lucide-react';
import { dict, equipmentList } from '../data';
import { Language } from '../types';

interface QuoteFormProps {
  lang: Language;
}

export default function QuoteForm({ lang }: QuoteFormProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';

  const [formMode, setFormMode] = useState<'quick' | 'detailed'>('quick');
  const [name, setName] = useState('');
  const [poc, setPoc] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('infrastructure');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // Equipment selection and counts
  const [selectedEquip, setSelectedEquip] = useState<number[]>([]);
  const [equipCounts, setEquipCounts] = useState<{ [id: number]: number }>({});

  const [submitted, setSubmitted] = useState(false);

  const toggleEquip = (id: number) => {
    if (selectedEquip.includes(id)) {
      setSelectedEquip(selectedEquip.filter(eId => eId !== id));
      const updatedCounts = { ...equipCounts };
      delete updatedCounts[id];
      setEquipCounts(updatedCounts);
    } else {
      setSelectedEquip([...selectedEquip, id]);
      setEquipCounts({ ...equipCounts, [id]: 1 });
    }
  };

  const handleCountChange = (id: number, count: number) => {
    if (count < 1) return;
    setEquipCounts({ ...equipCounts, [id]: count });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formMode === 'quick') {
      if (!name || !phone || !description) {
        setValidationError(isRtl ? 'يرجى كتابة الاسم ورقم الجوال وتفاصيل الرسالة لتأكيد الاتصال السريع.' : 'Please input your name, phone number, and message.');
        return;
      }
    } else {
      if (!name || !phone) {
        setValidationError(isRtl ? 'يرجى كتابة اسم الجهة ورقم الجوال لتأكيد الطلب.' : 'Please input the corporate name and mobile number.');
        return;
      }
    }
    setValidationError('');
    setSubmitted(true);
  };

  const selectedEquipmentObjects = equipmentList.filter(eq => selectedEquip.includes(eq.id));

  return (
    <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-sm border border-slate-200" id="quote-form-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`flex items-center gap-4 mb-2 pb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 bg-slate-50 text-green-950 border border-slate-200 rounded-2xl shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xl font-black text-slate-900">{isRtl ? 'تواصل معنا الآن' : 'Get in Touch Instantly'}</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{isRtl ? 'اختر نموذج الاتصال السريع أو طلب تسعير متكامل ومفصل' : 'Choose quick contact or detailed engineering quotation'}</p>
            </div>
          </div>

          {/* Form Mode Toggle Buttons */}
          <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200/50 my-4">
            <button
              type="button"
              onClick={() => {
                setFormMode('quick');
                setValidationError('');
              }}
              className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer text-center ${
                formMode === 'quick'
                  ? 'bg-green-950 text-red-500 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'نموذج اتصال سريع (فوري)' : 'Quick Contact (Instant)'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormMode('detailed');
                setValidationError('');
              }}
              className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer text-center ${
                formMode === 'detailed'
                  ? 'bg-green-950 text-red-500 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'طلب تسعير مفصل وآليات' : 'Detailed Quote & Fleet'}
            </button>
          </div>

          {validationError && (
            <div className={`p-4 bg-red-50 border border-red-200 text-red-900 rounded-2xl text-xs font-black ${isRtl ? 'text-right' : 'text-left'}`}>
              {validationError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Corporate/Client Name */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-xs font-black text-slate-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? 'الاسم بالكامل / اسم الجهة' : 'Full Name / Corporate Name'} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isRtl ? 'مثال: شركة العلي للتطوير العقاري' : 'e.g. Al-Ali Real Estate'}
                className={`w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-green-950/5 focus:border-green-900 ${isRtl ? 'text-right' : 'text-left'}`}
              />
            </div>

            {/* Contact Phone */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-xs font-black text-slate-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t.formPhone} *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05xxxxxxx"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-green-950/5 focus:border-green-900 text-left font-mono"
              />
            </div>

            {formMode === 'detailed' && (
              <>
                {/* POC name */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-black text-slate-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.formContact}
                  </label>
                  <input
                    type="text"
                    value={poc}
                    onChange={(e) => setPoc(e.target.value)}
                    placeholder={isRtl ? 'مثال: المهندس أحمد الحربي' : 'e.g. Eng. Ahmad Al-Harbi'}
                    className={`w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-green-950/5 focus:border-green-900 ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </div>

                {/* Contact Email */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-black text-slate-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.formEmail}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@mail.com"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-green-950/5 focus:border-green-900 text-left font-mono"
                  />
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-black text-slate-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.formServiceType}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-4 focus:ring-green-950/5 focus:border-green-900 ${isRtl ? 'text-right text-rtl-select' : 'text-left'}`}
                  >
                    <option value="infrastructure">{t.service2}</option>
                    <option value="excavation">{t.service1}</option>
                    <option value="roads">{t.service3}</option>
                    <option value="utility">{t.service4}</option>
                    <option value="piping">{t.service5}</option>
                    <option value="leasing">{isRtl ? 'تأجير معدات ثقيلة' : 'Heavy Equipment Rental Lease'}</option>
                  </select>
                </div>

                {/* Estimated budget */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-black text-slate-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.formBudget}
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={isRtl ? 'مثال: 500,000 ريال' : 'e.g. 500,000 SAR'}
                    className={`w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-green-950/5 focus:border-green-900 ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </div>
              </>
            )}
          </div>

          {formMode === 'detailed' && (
            /* Heavy Equipment Selection Playground */
            <div className="mt-4 pt-4 border-t border-slate-150">
              <h4 className={`text-xs font-black uppercase tracking-wider text-slate-400 mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? 'تضمين آليات ومعدات من أسطولنا للعمل (اختياري)' : 'Include Specific Fleet Vehicles in Quote (Optional)'}
              </h4>
              
              {/* Quick Badges of key equipment */}
              <div className={`flex flex-wrap gap-2 mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                {equipmentList.slice(0, 10).map((eq) => {
                  const selected = selectedEquip.includes(eq.id);
                  return (
                    <button
                      type="button"
                      key={eq.id}
                      onClick={() => toggleEquip(eq.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                        selected
                          ? 'bg-green-900 border-green-900 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{selected ? '✓' : '+'}</span>
                      <span>{isRtl ? eq.nameAr : eq.nameEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active numeric count inputs for those select */}
              {selectedEquip.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 my-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEquipmentObjects.map((eq) => (
                    <div key={eq.id} className={`flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs font-black text-slate-800">
                        {isRtl ? eq.nameAr : eq.nameEn}
                      </span>
                      <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[10px] text-slate-400 font-bold">{isRtl ? 'العدد بالآلية:' : 'Quantity:'}</span>
                        <input
                          type="number"
                          min="1"
                          value={equipCounts[eq.id] || 1}
                          onChange={(e) => handleCountChange(eq.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center text-xs py-1 px-1 border border-slate-200 rounded-lg font-black"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Details message box */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-black text-slate-700 ${isRtl ? 'text-right' : 'text-left'}`}>
              {formMode === 'quick' ? (isRtl ? 'تفاصيل الرسالة أو الاستفسار المباشر' : 'Inquiry or Request Details') : t.formNeeds} *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                formMode === 'quick' 
                  ? (isRtl ? 'اكتب هنا استفسارك أو طلبك وسنعاود الاتصال بك فوراً لتنسيق التفاصيل...' : 'Write your request or question here and we will get back to you immediately...')
                  : (isRtl ? 'الرجاء توضيح مخطط العمل التقريبي، موقع الأرض والمساحة بالمتر، وتفاصيل الأعمال الترابية المطلوبة...' : 'Please describe the project scope, location coordinates, earth volume sizes, or specialized specifications desired...')
              }
              className={`w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-green-950/5 focus:border-green-900 ${isRtl ? 'text-right' : 'text-left'}`}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 bg-green-950 font-black text-sm text-red-500 rounded-2xl shadow-sm border border-green-900 hover:bg-green-900 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{formMode === 'quick' ? (isRtl ? 'إرسال الرسالة فورا' : 'Send Message Now') : t.formSubmit}</span>
          </button>
        </form>
      ) : (
        /* Success Receipt Page */
        <div className="text-center py-6 space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-650 border border-red-200 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-black text-slate-900">{isRtl ? 'تم إرسال طلبكم بنجاح' : 'Request Submitted Successfully'}</h3>
            <p className="text-sm text-slate-500 font-semibold mt-2">
              {formMode === 'quick' 
                ? (isRtl ? 'شكراً لتواصلكم مع شركة دار السالمية للمقاولات. تم استلام رسالتكم السريعة بنجاح، وسيتواصل معكم فريقنا الميداني في أقرب وقت.' : 'Thank you for contacting Dar Al-Salmiah Contracting Co. Your quick message has been registered, and our team will contact you shortly.')
                : t.pricingSuccess}
            </p>
          </div>

          {/* Generated printable slip */}
          <div className="bg-green-950 text-green-100 rounded-[2rem] p-6 md:p-8 border border-green-900 max-w-lg mx-auto font-mono text-xs space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-green-900 pb-3">
              <span className="font-black text-white">
                {formMode === 'quick' ? 'DAR AL-SALMIAH QUICK CONTACT' : 'DAR AL-SALMIAH REQUISITION'}
              </span>
              <span className="text-red-400 font-black text-right">
                {formMode === 'quick' ? '#SAL-Q82' : '#SAL-491'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 text-green-200 font-medium">
              <span>{formMode === 'quick' ? 'Sender Name:' : 'Client Brand:'}</span>
              <span className="text-right text-white font-semibold">{name}</span>
              
              {formMode === 'detailed' && (
                <>
                  <span>Contact POC:</span>
                  <span className="text-right text-white">{poc || 'General Procurement'}</span>
                </>
              )}

              <span>Phone Contact:</span>
              <span className="text-right text-white text-left" dir="ltr">{phone}</span>

              {formMode === 'detailed' && email && (
                <>
                  <span>Official Email:</span>
                  <span className="text-right text-white">{email}</span>
                </>
              )}

              {formMode === 'detailed' && (
                <>
                  <span>Tender Sector:</span>
                  <span className="text-right text-white uppercase">{service}</span>
                </>
              )}

              {formMode === 'detailed' && budget && (
                <>
                  <span>Stated Capital:</span>
                  <span className="text-right text-red-400 font-black">{parseInt(budget).toLocaleString()} SAR</span>
                </>
              )}
            </div>

            {/* Message Details Preview */}
            <div className="border-t border-dashed border-green-900 pt-3">
              <span className="text-green-300 block mb-1 uppercase font-black tracking-widest text-[9px]">
                {isRtl ? 'تفاصيل الاستفسار / الرسالة المرسلة:' : 'Inquiry / Message Content:'}
              </span>
              <p className="text-white bg-green-900/40 p-2.5 rounded-xl border border-green-800/25 break-words max-h-32 overflow-y-auto">
                {description}
              </p>
            </div>

            {formMode === 'detailed' && selectedEquip.length > 0 && (
              <div className="border-t border-dashed border-green-900 pt-3">
                <span className="text-green-300 block mb-1.5 uppercase font-black tracking-widest text-[10px]">Requested Machineries Checklist:</span>
                <div className="space-y-1 bg-green-900/50 border border-green-800/40 p-2.5 rounded-2xl text-green-100 font-medium">
                  {selectedEquipmentObjects.map((eq) => (
                    <div key={eq.id} className="flex justify-between items-center">
                      <span>• {eq.nameEn} ({eq.nameAr.split('(')[0]})</span>
                      <span className="font-black text-white">Qty: {equipCounts[eq.id] || 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-green-900 pt-3 space-y-1 text-green-300 text-[10px]">
              <div>TIMESTAMP: {new Date().toISOString()}</div>
              <div>CR NUMBER: 1010022806</div>
              <div>STATUS: ASSIGNED FOR IMMEDIATE RESPONSE</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName('');
              setPoc('');
              setPhone('');
              setEmail('');
              setBudget('');
              setDescription('');
              setSelectedEquip([]);
              setEquipCounts({});
              setValidationError('');
            }}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-xl transition-all cursor-pointer"
          >
            {t.backToHome}
          </button>
        </div>
      )}
    </div>
  );
}
