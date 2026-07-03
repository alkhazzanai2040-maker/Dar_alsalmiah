import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  User, Phone, Mail, Award, BookOpen, Briefcase, FileText, Send, 
  CheckCircle, Copy, UploadCloud, HelpCircle, RefreshCw, AlertCircle
} from 'lucide-react';
import { Language } from '../types';

interface CareersPageProps {
  lang: Language;
}

export default function CareersPage({ lang }: CareersPageProps) {
  const isRtl = lang === 'ar';
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    degree: '',
    experience: '',
    specialization: '',
    notes: ''
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Copy HR Email
  const copyHrEmail = () => {
    navigator.clipboard.writeText('hr@dasco-sa.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  // File Upload Handlers (Usability Pattern: supports drag-and-drop & manual selection)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Check if PDF/Word doc
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        setCvFile(file);
        setError('');
      } else {
        setError(isRtl ? 'عذراً، يجب إرفاق السيرة الذاتية بصيغة PDF أو Word فقط.' : 'Please upload CV as PDF or Word file only.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(file);
      setError('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.specialization) {
      setError(isRtl ? 'يرجى تعبئة جميع الحقول المطلوبة المميزة بالنجمة (*)' : 'Please fill all required fields marked with (*)');
      return;
    }

    setSubmitting(true);
    setError('');

    // Simulate backend sending to hr@dasco-sa.com
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Construct a premium Mailto link to immediately draft the email directly on user's system
      const emailSubject = encodeURIComponent(
        isRtl 
          ? `طلب توظيف جديد - ${formData.specialization} - ${formData.fullName}` 
          : `Job Application - ${formData.specialization} - ${formData.fullName}`
      );
      
      const emailBody = encodeURIComponent(
        isRtl 
          ? `السلام عليكم ورحمة الله وبركاته،\n\nتجدون أدناه تفاصيل طلب التوظيف المقدم لشركتكم الموقرة:\n\n` +
            `• الاسم الكامل: ${formData.fullName}\n` +
            `• رقم الجوال: ${formData.phone}\n` +
            `• البريد الإلكتروني: ${formData.email}\n` +
            `• التخصص الرئيسي: ${formData.specialization}\n` +
            `• المؤهل العلمي: ${formData.degree}\n` +
            `• سنوات الخبرة: ${formData.experience} سنة\n` +
            `• اسم ملف السيرة الذاتية المرفق: ${cvFile ? cvFile.name : 'مرفق السيرة الذاتية'}\n` +
            `• نبذة/ملاحظات: ${formData.notes || 'لا يوجد'}\n\n` +
            `شكرًا جزيلاً لكم.`
          : `Dear HR Team,\n\nPlease find my job application details below:\n\n` +
            `• Full Name: ${formData.fullName}\n` +
            `• Phone: ${formData.phone}\n` +
            `• Email: ${formData.email}\n` +
            `• Specialization: ${formData.specialization}\n` +
            `• Degree: ${formData.degree}\n` +
            `• Experience: ${formData.experience} Years\n` +
            `• CV File Name: ${cvFile ? cvFile.name : 'Attached CV'}\n` +
            `• Cover Note: ${formData.notes || 'None'}\n\n` +
            `Best regards.`
      );

      // Open email client
      window.location.href = `mailto:hr@dasco-sa.com?subject=${emailSubject}&body=${emailBody}`;
    }, 1200);
  };

  return (
    <div className="py-24 sm:py-32 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title */}
        <div className={`text-center mb-10 ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
          <span className="text-xs font-black tracking-widest text-green-800 uppercase bg-green-100 border border-green-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {isRtl ? 'بوابة الكفاءات والتوظيف' : 'Careers & Human Capital Portal'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {isRtl ? 'انضم إلى فريق عملنا الهندسي' : 'Join Our Engineering Team'}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-semibold max-w-2xl mx-auto">
            {isRtl 
              ? 'نبحث دائماً عن المهندسين المميزين، المشرفين الميدانيين، وسائقي المعدات الثقيلة للانضمام إلى مشاريعنا التنموية الكبرى في المملكة.' 
              : 'We are constantly seeking distinguished engineers, site supervisors, and heavy equipment operators to contribute to our national mega projects.'}
          </p>
        </div>

        {/* HR Contact info banner */}
        <div className="bg-slate-900 text-white rounded-[2rem] p-6 sm:p-8 mb-10 border border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <span className="text-[10px] text-green-400 uppercase font-black tracking-wider block mb-1">
              {isRtl ? 'البريد الإلكتروني المباشر لإدارة الموارد البشرية' : 'Direct Human Resources Department Email'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-mono text-white">hr@dasco-sa.com</h3>
            <p className="text-xs text-slate-400 mt-2 font-semibold">
              {isRtl 
                ? 'يمكنك التقديم عبر النموذج أدناه أو إرسال سيرتك الذاتية مباشرة مع توضيح تخصصك في عنوان الرسالة.'
                : 'You may apply using the form below, or send your CV directly to the email stating your specialty.'}
            </p>
          </div>
          <button
            type="button"
            onClick={copyHrEmail}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              copied 
                ? 'bg-green-700 text-white' 
                : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ البريد الإلكتروني' : 'Copy HR Email')}</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-6 sm:p-10">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-50 text-green-700 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                {isRtl ? 'تم تقديم طلب التوظيف بنجاح' : 'Application Submitted Successfully'}
              </h2>
              <p className="text-sm text-slate-600 mt-4 font-semibold leading-relaxed max-w-md mx-auto">
                {isRtl 
                  ? 'تم استلام بياناتك وتجهيز مسودة البريد الإلكتروني لتأكيد الإرسال المباشر لـ hr@dasco-sa.com. ستقوم إدارة الموارد البشرية بالشركة بمراجعة ملفك والتواصل معك فور مطابقة المؤهلات.'
                  : 'Your application has been prepared and a direct draft has been initiated to hr@dasco-sa.com. Our HR team will evaluate your qualifications and contact you soon.'}
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      degree: '',
                      experience: '',
                      specialization: '',
                      notes: ''
                    });
                    setCvFile(null);
                  }}
                  className="px-6 py-3 bg-green-700 text-white font-black text-sm rounded-xl hover:bg-green-850 shadow-xs transition-all cursor-pointer"
                >
                  {isRtl ? 'تقديم طلب جديد' : 'Submit Another Request'}
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={isRtl ? 'text-right' : 'text-left'}>
              
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 mb-6 pb-3 border-b border-slate-100">
                {isRtl ? 'تعبئة بيانات السيرة الذاتية' : 'Applicant Information Sheet'}
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-150 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Grid Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-850">
                    {isRtl ? 'الاسم الكامل للمتقدم *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={isRtl ? 'مثال: أحمد بن خالد العتيبي' : 'e.g. John Doe'}
                      className={`w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-600 focus:bg-white transition-all ${
                        isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                      }`}
                    />
                  </div>
                </div>

                {/* Specialty */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-855">
                    {isRtl ? 'التخصص الرئيسي / المسمى الوظيفي *' : 'Specialization / Position *'}
                  </label>
                  <div className="relative">
                    <Briefcase className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      required
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      placeholder={isRtl ? 'مثال: مهندس مدني، مساح، سائق بلدوزر' : 'e.g. Civil Engineer, Land Surveyor'}
                      className={`w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-600 focus:bg-white transition-all ${
                        isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                      }`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-855">
                    {isRtl ? 'رقم الجوال النشط للتواصل *' : 'Active Mobile Number *'}
                  </label>
                  <div className="relative">
                    <Phone className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05xxxxxxxx"
                      className={`w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-600 focus:bg-white transition-all ${
                        isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-855">
                    {isRtl ? 'البريد الإلكتروني للتواصل *' : 'Communication Email *'}
                  </label>
                  <div className="relative">
                    <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@domain.com"
                      className={`w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-600 focus:bg-white transition-all ${
                        isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                      }`}
                    />
                  </div>
                </div>

                {/* Experience Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-855">
                    {isRtl ? 'مجموع سنوات الخبرة المهنية' : 'Years of Experience'}
                  </label>
                  <div className="relative">
                    <Award className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-green-600 focus:bg-white transition-all appearance-none ${
                        isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                      }`}
                    >
                      <option value="">{isRtl ? 'حدد عدد سنوات الخبرة...' : 'Select experience years...'}</option>
                      <option value="1-3">1 - 3 {isRtl ? 'سنوات' : 'Years'}</option>
                      <option value="4-7">4 - 7 {isRtl ? 'سنوات' : 'Years'}</option>
                      <option value="8-12">8 - 12 {isRtl ? 'سنة' : 'Years'}</option>
                      <option value="12+">أكثر من 12 سنة / Senior</option>
                    </select>
                  </div>
                </div>

                {/* Degree Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-855">
                    {isRtl ? 'أعلى مؤهل علمي حاصل عليه' : 'Highest Academic Degree'}
                  </label>
                  <div className="relative">
                    <BookOpen className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className={`w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-green-600 focus:bg-white transition-all appearance-none ${
                        isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                      }`}
                    >
                      <option value="">{isRtl ? 'حدد المؤهل التعليمي...' : 'Select education level...'}</option>
                      <option value="PhD">{isRtl ? 'دكتوراه هيدروليكية أو مدنية' : 'PhD / Doctorate'}</option>
                      <option value="Master">{isRtl ? 'ماجستير هندسة أو إدارة' : 'Master\'s Degree'}</option>
                      <option value="Bachelor">{isRtl ? 'بكالوريوس هندسة أو علوم ذات صلة' : 'Bachelor\'s Degree'}</option>
                      <option value="Diploma">{isRtl ? 'دبلوم تقني أو كلية تقنية' : 'Technical Diploma'}</option>
                      <option value="HighSchool">{isRtl ? 'الثانوية العامة أو رخصة معدات ثقيلة معتمدة' : 'High School / Heavy Operator License'}</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Cover Letter Notes */}
              <div className="space-y-1.5 mb-6">
                <label className="text-xs font-black text-slate-855">
                  {isRtl ? 'نبذة عن خبراتك وملاحظات إضافية' : 'Summary of expertise & Cover letter'}
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder={isRtl ? 'اكتب نبذة موجزة عن أبرز المشاريع التي شاركت بتنفيذها سابقاً...' : 'Provide a brief summary of prominent projects you participated in...'}
                  className={`w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-600 focus:bg-white transition-all resize-none ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* Drag-and-Drop File Upload Area (Supports both Drag & Drop and manual selection click) */}
              <div className="space-y-2 mb-8">
                <label className="text-xs font-black text-slate-855">
                  {isRtl ? 'إرفاق السيرة الذاتية (الملف الإرشادي للجنة الفرز) *' : 'Attach Professional CV (Required for Evaluation) *'}
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                  className={`border-2 border-dashed rounded-[2rem] p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                    isDragging 
                      ? 'border-green-650 bg-green-50/50' 
                      : cvFile 
                        ? 'border-green-500 bg-green-50/15' 
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-350'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                  />
                  
                  <UploadCloud className={`w-10 h-10 mb-2 ${cvFile ? 'text-green-650' : 'text-slate-400'}`} />
                  
                  {cvFile ? (
                    <div className="space-y-1.5">
                      <p className="text-sm font-black text-slate-900">{cvFile.name}</p>
                      <p className="text-xs text-green-700 font-extrabold flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>{isRtl ? 'تم تحميل الملف بنجاح وتجهيزه' : 'File uploaded and packaged'}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold">
                        ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900">
                        {isRtl ? 'اسحب ملف السيرة الذاتية وأفلته هنا أو اضغط للتصفح' : 'Drag and drop your CV file here, or click to browse'}
                      </p>
                      <p className="text-[11px] text-slate-400 font-semibold">
                        {isRtl ? 'الصيغ المسموحة: PDF, DOC, DOCX بحجم أقصى 10 ميجابايت' : 'Supported extensions: PDF, DOC, DOCX up to 10MB'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={submitting}
                type="submit"
                className={`w-full py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  submitting
                    ? 'bg-slate-450 text-slate-700 cursor-not-allowed'
                    : 'bg-green-700 text-white hover:bg-green-850 hover:scale-[1.01] active:scale-[0.99] shadow-md'
                }`}
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isRtl ? 'جاري إرسال وتأكيد الملفات...' : 'Sending files & drafting...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 shrink-0" />
                    <span>{isRtl ? 'إرسال طلب التوظيف مباشرة للشركة' : 'Submit Direct Employment Application'}</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
