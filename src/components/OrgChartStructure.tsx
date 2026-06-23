import { useState, useMemo } from 'react';
import { 
  Users, 
  Briefcase, 
  Award, 
  Settings, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  HardHat, 
  FileText, 
  Landmark, 
  Cpu, 
  Layers, 
  HelpCircle, 
  ChevronRight, 
  CheckCircle2, 
  ChevronLeft,
  Building,
  Target,
  ClipboardCheck,
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { orgChart, dict } from '../data';
import { OrgNode, Language } from '../types';

interface OrgChartStructureProps {
  lang: Language;
}

export default function OrgChartStructure({ lang }: OrgChartStructureProps) {
  const t = dict[lang];
  const isRtl = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'matrix' | 'tree'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<number>(0);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'chairman': true,
    'ceo': true,
    'pillar-0': true,
    'pillar-1': false,
    'pillar-2': false,
    'pillar-3': false,
  });

  // Extract the top executive levels
  const chairmanNode = orgChart;
  const ceoNode = orgChart.children?.[0];
  const pillars = ceoNode?.children || [];

  // Toggle node expansion in tree view
  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  // Helper to expand all nodes
  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {
      'chairman': true,
      'ceo': true
    };
    pillars.forEach((_, pIdx) => {
      allExpanded[`pillar-${pIdx}`] = true;
      const depts = pillars[pIdx].children || [];
      depts.forEach((_, dIdx) => {
        allExpanded[`pillar-${pIdx}-dept-${dIdx}`] = true;
      });
    });
    setExpandedNodes(allExpanded);
  };

  // Helper to collapse all nodes
  const collapseAll = () => {
    setExpandedNodes({
      'chairman': true,
      'ceo': false
    });
  };

  // Quick search suggestion tags
  const searchTags = isRtl 
    ? ['جودة', 'مساحة', 'سلامة', 'مشتريات', 'طرق', 'بنية تحتية', 'عقود', 'صيانة']
    : ['QC', 'Survey', 'Safety', 'Procurement', 'Roads', 'Infrastructure', 'Contracts', 'Maintenance'];

  // Strategic statistics for Dar Al-Salmiah structure
  const stats = [
    {
      value: "4",
      labelAr: "قطاعات قيادية عليا",
      labelEn: "Executive Pillars",
      descAr: "تقود دفة التخطيط الميداني والمالي والهندسي والرقابي",
      descEn: "Steering operational, engineering, and financial strategies",
      icon: Building2,
      color: "from-green-800 to-green-950"
    },
    {
      value: "14",
      labelAr: "إدارة عامة معتمدة",
      labelEn: "Certified Divisions",
      descAr: "حوكمة وإشراف مباشر من الإدارة الإقليمية بالرياض",
      descEn: "Under direct governance and oversight from Riyadh HQ",
      icon: Layers,
      color: "from-green-700 to-emerald-900"
    },
    {
      value: "42",
      labelAr: "قسماً ووحدة فنية تخصصية",
      labelEn: "Field & Support Units",
      descAr: "تغطية شاملة ومطابقة تامة لمعايير الجودة تصنيف أول",
      descEn: "Full compliance with first-grade general contracting codes",
      icon: Settings,
      color: "from-emerald-700 to-green-900"
    }
  ];

  // Specific strategic goals and details for the 4 pillars
  const pillarDetails = useMemo(() => [
    {
      id: 0,
      titleAr: "نائب الرئيس للعمليات والمشاريع الميدانية (C.O.O)",
      titleEn: "VP of Operations & Site Projects (C.O.O)",
      icon: HardHat,
      color: "emerald",
      bgClass: "bg-emerald-50 border-emerald-200 text-emerald-900",
      accentBorder: "border-emerald-500",
      badgeClass: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20",
      goalAr: "تحقيق الجودة الزمنية والتنفيذية بأعلى معايير السلامة المهنية ومطابقة الكود السعودي للمقاولات وضمان استدامة الأسطول.",
      goalEn: "Achieving project timeline compliance & grade-1 standards while maintaining zero-accident records and optimal fleet availability.",
      kpisAr: ["نسبة التزام بالجدول الزمني: 100%", "تقييم السلامة المهنية: صفر حوادث", "جاهزية الآليات والمعدات: > 96%"],
      kpisEn: ["Schedule Compliance Index: 100%", "Safety Performance: Zero Accidents", "Fleet Availability Rate: > 96%"]
    },
    {
      id: 1,
      titleAr: "المدير الفني العام ورئيس المكتب الهندسـي (C.T.O)",
      titleEn: "Chief Technical Officer & Engineering Head (C.T.O)",
      icon: Cpu,
      color: "blue",
      bgClass: "bg-blue-50 border-blue-200 text-blue-900",
      accentBorder: "border-blue-500",
      badgeClass: "bg-blue-500/10 text-blue-700 border border-blue-500/20",
      goalAr: "تطوير الرسومات التنفيذية، وإدارة وتوكيد جودة المواد والخرسانات، ومطابقة التصاميم، وتدقيق أعمال المساحة بدقة جيوديسية.",
      goalEn: "Developing high-fidelity shop drawings, testing and assuring concrete & asphalt mixes, and achieving millimeter survey accuracy.",
      kpisAr: ["اعتماد المواد الحكومية: 100%", "دقة الرفع والمسح الجيوديسي: مليمترية", "نسبة معالجة الملاحظات الهندسية: 100%"],
      kpisEn: ["Material Approval SLA: 100%", "Geodetic Survey Precision: Millimetric", "Engineering Action Closure Rate: 100%"]
    },
    {
      id: 2,
      titleAr: "المدير المالي التنفيذي وتطوير العقود والاستثمارات (C.F.O)",
      titleEn: "Chief Financial Officer & Contract Strategy (C.F.O)",
      icon: Landmark,
      color: "amber",
      bgClass: "bg-amber-50 border-amber-200 text-amber-900",
      accentBorder: "border-amber-500",
      badgeClass: "bg-amber-500/10 text-amber-700 border border-amber-500/20",
      goalAr: "حوكمة الشؤون المالية وإعداد الميزانيات بدقة، وتسيير تدفقات المشاريع النقدية، وإدارة مناقصات وعطاءات الشركة بكفاءة عالية.",
      goalEn: "Securing financial compliance, budgeting projects, managing vendor risk, and formulating cost estimation matrices.",
      kpisAr: ["كفاءة التدفق النقدي للمشروعات: 100%", "الالتزام ببرنامج حماية الأجور (WPS): 100%", "معدل نجاح تسعير المناقصات: > 85%"],
      kpisEn: ["Project Cash Flow Liquidity: 100%", "Wage Protection Compliance (WPS): 100%", "Tender Pricing Success Rate: > 85%"]
    },
    {
      id: 3,
      titleAr: "مدير الشؤون الإدارية والموارد البشرية والعلاقات الحكومية",
      titleEn: "Executive Director of HR & Support Services",
      icon: Users,
      color: "rose",
      bgClass: "bg-rose-50 border-rose-200 text-rose-900",
      accentBorder: "border-rose-500",
      badgeClass: "bg-rose-500/10 text-rose-700 border border-rose-500/20",
      goalAr: "استقطاب الكوادر الفنية القيادية، وتحقيق الامتثال للأنظمة والتشريعات العمالية السعودية، وتسهيل استخراج تصاريح العمل والبلديات رقمياً.",
      goalEn: "Recruiting elite engineering talents, achieving full localization, and streamlining municipal & utility permitting processes.",
      kpisAr: ["مؤشر الرضا الوظيفي: 92%", "توطين الوظائف الهندسية والقيادية: مستقر", "سرعة استخراج تراخيص الحفر: < 48 ساعة"],
      kpisEn: ["Employee Satisfaction Score: 92%", "Strategic Engineering Saudization: Stable", "Excavation Permitting SLA: < 48 hours"]
    }
  ], [isRtl]);

  // Recursively search the entire orgChart structure
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const matches: { path: string[]; node: OrgNode }[] = [];

    const traverse = (node: OrgNode, path: string[]) => {
      const currentPath = [...path, isRtl ? node.titleAr : node.titleEn];
      const matchText = `
        ${node.titleAr} ${node.titleEn} 
        ${node.nameAr || ''} ${node.nameEn || ''}
      `.toLowerCase();

      if (matchText.includes(query)) {
        matches.push({ path: currentPath, node });
      }

      if (node.children) {
        node.children.forEach(child => traverse(child, currentPath));
      }
    };

    traverse(orgChart, []);
    return matches;
  }, [searchQuery, isRtl]);

  // Handle suggestion click
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <section className="py-24 bg-slate-50 relative border-t border-b border-slate-200" id="structure">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-green-950 uppercase bg-green-100 border border-green-300 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-green-800 animate-pulse" />
            {t.orgStructure}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {isRtl ? 'الهيكل الإداري والتمثيل التنظيمي' : 'Governance & Organizational Chart'}
          </h2>
          <p className="text-slate-650 text-base font-semibold leading-relaxed">
            {isRtl 
              ? 'هيكل إداري شامل ومترابط يحقق أعلى مستويات الحوكمة والمرونة التشغيلية، ومطابق لكافة المتطلبات الحكومية لتنفيذ المشاريع الكبرى (تصنيف أول).'
              : 'A comprehensive administrative blueprint enforcing strict corporate governance, streamlined workflows, and certified grade-1 construction capabilities.'}
          </p>

          {/* Toggle buttons */}
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/60 mt-8 gap-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-green-900 text-white shadow-md'
                  : 'hover:bg-slate-300/40 text-slate-700'
              }`}
              id="org-matrix-btn"
            >
              <Building className="w-4 h-4" />
              {isRtl ? 'تصفح القطاعات التنفيذية' : 'Executive Sectors Hub'}
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'tree'
                  ? 'bg-green-900 text-white shadow-md'
                  : 'hover:bg-slate-300/40 text-slate-700'
              }`}
              id="org-tree-btn"
            >
              <Layers className="w-4 h-4" />
              {isRtl ? 'شجرة الهيكل الكاملة' : 'Full Hierarchical Tree'}
            </button>
          </div>
        </div>

        {/* Real-time Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all duration-300"
                id={`org-stat-card-${idx}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shrink-0 shadow-sm`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 leading-none mb-1.5 flex items-baseline gap-1">
                      <span>{stat.value}</span>
                      <span className="text-green-700 text-lg">+</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-800 mb-1">
                      {isRtl ? stat.labelAr : stat.labelEn}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {isRtl ? stat.descAr : stat.descEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bilingual Advanced Search Panel */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-8 shadow-sm mb-12" id="org-search-panel">
          <div className="max-w-xl mx-auto">
            <h3 className="text-center text-xs font-black tracking-wider text-slate-400 uppercase mb-3">
              {isRtl ? 'البحث الذكي في شجرة الهيكل التنظيمي المعتمد' : 'Bilingual Intelligent Hierarchy Search'}
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? 'ابحث عن إدارة، وظيفة، قسم فني، أو مهندس...' : 'Search for a department, role, code, or engineer...'}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl py-4 pl-12 pr-12 text-sm text-slate-800 placeholder-slate-400 font-bold focus:outline-none focus:ring-2 focus:ring-green-900/40 focus:border-green-900 transition-all text-center"
                id="org-search-input"
              />
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${isRtl ? 'left-4' : 'right-4'}`} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-red-500 bg-slate-200/60 px-2.5 py-1 rounded-lg ${isRtl ? 'right-4' : 'left-4'}`}
                >
                  {isRtl ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>

            {/* Tags suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-[10px] text-slate-400 font-black uppercase">
                {isRtl ? 'الوصول السريع:' : 'Quick Tags:'}
              </span>
              {searchTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(tag)}
                  className={`text-[11px] px-3 py-1 rounded-full font-bold transition-all border ${
                    searchQuery === tag
                      ? 'bg-green-900 text-white border-green-900'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-650 border-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Display */}
          <AnimatePresence>
            {searchQuery.trim() !== '' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-slate-150 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-black text-slate-450 uppercase tracking-wider">
                    {isRtl 
                      ? `نتائج البحث المتطابقة (${searchResults.length})` 
                      : `Matching Results (${searchResults.length})`}
                  </h4>
                  {searchResults.length > 0 && (
                    <span className="text-[10px] text-green-700 font-black bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                      {isRtl ? 'تطابق فوري معتمد' : 'Verified instant matching'}
                    </span>
                  )}
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-450 font-bold">
                      {isRtl 
                        ? 'عذراً، لم نجد أي تطابق للبحث. يرجى تجربة كلمات مثل: مساحة، جودة، تسعير، صيانة.' 
                        : 'No matching records found. Try: Survey, QC, Pricing, Maintenance.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                    {searchResults.map((result, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 hover:border-green-900/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-black tracking-wider uppercase mb-1 flex-wrap">
                            {result.path.map((step, sIdx) => (
                              <span key={sIdx} className="flex items-center gap-1">
                                <span>{step}</span>
                                {sIdx < result.path.length - 1 && <span className="text-slate-300">/</span>}
                              </span>
                            ))}
                          </div>
                          <h5 className="text-xs sm:text-sm font-black text-slate-900">
                            {isRtl ? result.node.titleAr : result.node.titleEn}
                          </h5>
                          {result.node.nameAr && (
                            <p className="text-xs text-green-800 font-extrabold mt-1">
                              {isRtl ? result.node.nameAr : result.node.nameEn}
                            </p>
                          )}
                        </div>
                        {result.node.children && result.node.children.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-slate-200/50 flex justify-between items-center">
                            <span className="text-[10px] text-slate-450 font-bold">
                              {isRtl 
                                ? `يحتوي على ${result.node.children.length} أقسام تابعة` 
                                : `Contains ${result.node.children.length} sub-units`}
                            </span>
                            <button
                              onClick={() => {
                                setActiveTab('tree');
                                // expand the corresponding nodes in the tree
                                const newExpanded = { ...expandedNodes };
                                newExpanded['chairman'] = true;
                                newExpanded['ceo'] = true;
                                pillars.forEach((p, pIdx) => {
                                  if (isRtl ? p.titleAr === result.path[2] : p.titleEn === result.path[2]) {
                                    newExpanded[`pillar-${pIdx}`] = true;
                                  }
                                });
                                setExpandedNodes(newExpanded);
                                // Scroll to tree container smoothly
                                document.getElementById('corporate-governance-tree')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="text-[10px] font-black text-green-900 hover:underline flex items-center gap-0.5"
                            >
                              <span>{isRtl ? 'عرض في الشجرة' : 'Locate in Tree'}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tab 1: MATRIX EXPLORER (The Interactive Bento-Hub) */}
        {activeTab === 'matrix' ? (
          <div className="space-y-12" id="corporate-matrix-view">
            
            {/* Top Board & CEO Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-green-950 to-slate-900 rounded-[3rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-lg shadow-green-950/15 border border-green-800/20">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.03]" />
              
              {/* Chairman block */}
              <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-l border-slate-800 pb-8 lg:pb-0 lg:pl-10 relative">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-3xl shrink-0">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest block mb-1">
                      {isRtl ? 'المجلس القيادي الأعلى والـملكية' : 'Board of Directors & Supreme Governance'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1.5">
                      {isRtl ? chairmanNode.titleAr : chairmanNode.titleEn}
                    </h3>
                    <p className="text-sm text-amber-400 font-extrabold mb-3">
                      {isRtl ? chairmanNode.nameAr : chairmanNode.nameEn}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold max-w-md">
                      {isRtl
                        ? 'مراقبة الخطط الاستراتيجية، مراجعة الامتثال المالي والوطني، واعتماد قرارات الاستحواذ اللوجستي الكبرى للشركة.'
                        : 'Overseeing long-term corporate roadmaps, approving capital equipment acquisitions, and monitoring general legal compliances.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CEO block */}
              <div className="lg:col-span-6 lg:pr-10 relative">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-3xl shrink-0">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-green-400 tracking-widest block mb-1">
                      {isRtl ? 'القيادة التنفيذية العامة والمشتريات والتمثيل الرسمي' : 'Chief Executive Generalship'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1.5">
                      {isRtl ? ceoNode?.titleAr : ceoNode?.titleEn}
                    </h3>
                    <p className="text-sm text-green-400 font-extrabold mb-3">
                      {isRtl ? ceoNode?.nameAr : ceoNode?.nameEn}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold max-w-md">
                      {isRtl
                        ? 'التوجيه اليومي للقطاعات الأربعة، الإشراف على لجان تسعير المناقصات الكبرى، وتمثيل الشركة أمام الوزارات والشركاء.'
                        : 'Directing the four executive pillars, managing macro-resource allocation, and leading key commercial representations.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle part: Interactive Pillar Selection Cards */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xs font-black tracking-widest text-slate-450 uppercase mb-4">
                  {isRtl ? 'اضغط لتحديد أحد القطاعات التنفيذية الأربعة للتصفح والتحليل الميداني' : 'Click to select an executive pillar to inspect its departments'}
                </h3>
              </div>

              {/* The 4 Grid buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pillarDetails.map((pillar) => {
                  const Icon = pillar.icon;
                  const isSelected = selectedPillar === pillar.id;
                  const originalNode = pillars[pillar.id];

                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setSelectedPillar(pillar.id)}
                      className={`text-right rounded-3xl p-6 border-2 transition-all duration-300 relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-white shadow-md ' + pillar.accentBorder
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                      id={`pillar-btn-${pillar.id}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${
                          isSelected ? 'bg-green-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                        } shrink-0 transition-all`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isSelected ? pillar.badgeClass : 'bg-slate-100 text-slate-500'
                        }`}>
                          {isRtl ? `قطاع رقم ${pillar.id + 1}` : `Pillar 0${pillar.id + 1}`}
                        </span>
                      </div>

                      <h4 className={`text-sm sm:text-base font-black tracking-tight leading-snug transition-colors ${
                        isSelected ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {isRtl ? originalNode.titleAr : originalNode.titleEn}
                      </h4>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[11px] text-slate-450 font-extrabold uppercase">
                          {isRtl 
                            ? `${originalNode.children?.length || 0} إدارات تخصصية` 
                            : `${originalNode.children?.length || 0} Specializations`}
                        </span>
                        <span className={`text-xs font-bold flex items-center gap-1 transition-transform ${
                          isSelected ? 'translate-x-1' : ''
                        } ${isRtl ? 'rotate-180' : ''}`}>
                          <ChevronRight className="w-4 h-4 text-green-700" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Pillar Dashboard Display */}
            {selectedPillar !== null && (
              <motion.div
                key={selectedPillar}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xs p-6 sm:p-8 lg:p-10 relative"
                id="selected-pillar-dashboard"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-24 -translate-y-24 opacity-60 pointer-events-none" />
                
                {/* Pillar Header and Strategic Overview */}
                <div className="relative z-10 border-b border-slate-100 pb-8 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl shrink-0 bg-green-950 text-white shadow-sm`}>
                        {(() => {
                          const IconComp = pillarDetails[selectedPillar].icon;
                          return <IconComp className="w-7 h-7" />;
                        })()}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-green-800 tracking-widest block mb-1">
                          {isRtl ? 'شعبة الحوكمة والتخطيط الاستراتيجي النشط' : 'Strategic Planning & Governance'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isRtl ? pillars[selectedPillar].titleAr : pillars[selectedPillar].titleEn}
                        </h3>
                        {pillars[selectedPillar]?.nameAr && (
                          <p className="text-sm font-extrabold text-green-700 mt-1">
                            {isRtl ? pillars[selectedPillar].nameAr : pillars[selectedPillar].nameEn}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 flex gap-2">
                      <span className="text-xs text-green-800 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl font-black flex items-center gap-1.5 shadow-2xs">
                        <Target className="w-3.5 h-3.5" />
                        {isRtl ? 'رتبة قيادية معتمدة' : 'Accredited Executive Column'}
                      </span>
                    </div>
                  </div>

                  {/* Strategic Goal & KPIs sub-grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pt-6 border-t border-slate-100">
                    <div className="lg:col-span-7">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-slate-450" />
                        {isRtl ? 'الهدف والرسالة التشغيلية للقطاع' : 'Primary Mandate & Mission'}
                      </h4>
                      <p className="text-sm font-semibold text-slate-650 leading-relaxed">
                        {isRtl ? pillarDetails[selectedPillar].goalAr : pillarDetails[selectedPillar].goalEn}
                      </p>
                    </div>
                    <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-150">
                      <h4 className="text-xs font-black text-slate-450 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <ClipboardCheck className="w-4 h-4 text-green-700" />
                        {isRtl ? 'مؤشرات الأداء الرئيسية (KPIs)' : 'Core Performance Metrics'}
                      </h4>
                      <ul className="space-y-2 text-xs font-bold text-slate-700">
                        {(isRtl ? pillarDetails[selectedPillar].kpisAr : pillarDetails[selectedPillar].kpisEn).map((kpi, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                            <span>{kpi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sub-departments Cards (The Real Meat) */}
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 block text-center">
                    {isRtl ? 'الهيكل التفصيلي للإدارات العامة التابعة والأقسام التخصصية المعتمدة' : 'Detailed breakdown of subordinate departments & expert units'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(pillars[selectedPillar].children || []).map((dept, dIdx) => {
                      const sections = dept.children || [];
                      return (
                        <div 
                          key={dIdx}
                          className="bg-slate-50 rounded-[2rem] border border-slate-200/70 p-6 hover:border-green-900/20 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                          id={`dept-card-${selectedPillar}-${dIdx}`}
                        >
                          <div>
                            {/* Department title banner */}
                            <div className="flex items-start gap-3 border-b border-slate-200/50 pb-4 mb-4">
                              <div className="p-2.5 bg-green-900/10 text-green-950 rounded-xl border border-green-900/10">
                                <Building2 className="w-4.5 h-4.5 text-green-900" />
                              </div>
                              <div>
                                <span className="text-[9px] font-black text-green-800 uppercase bg-green-50 px-2 py-0.5 rounded border border-green-200/50">
                                  {isRtl ? `مستوى إدارة تخصصية` : `Departmental Node`}
                                </span>
                                <h5 className="text-xs sm:text-sm font-black text-slate-900 mt-1.5 leading-snug tracking-tight">
                                  {isRtl ? dept.titleAr : dept.titleEn}
                                </h5>
                              </div>
                            </div>

                            {/* Inner Subordinate Sections / Functional units */}
                            <div className="space-y-3">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                                {isRtl ? 'الأقسام والوحدات الفنية والوظائف الدقيقة:' : 'Functional Sections & Units:'}
                              </span>

                              {sections.map((sec, sIdx) => (
                                <div 
                                  key={sIdx}
                                  className="bg-white/80 p-3 rounded-xl border border-slate-200/60 shadow-3xs flex items-start gap-2.5 text-slate-700"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                                  <div>
                                    <h6 className="text-[11px] sm:text-xs font-bold leading-normal text-slate-850">
                                      {isRtl ? sec.titleAr : sec.titleEn}
                                    </h6>
                                    {sec.nameAr && (
                                      <p className="text-[10px] text-green-700 font-black mt-0.5">
                                        {isRtl ? sec.nameAr : sec.nameEn}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Footer block */}
                          <div className="mt-6 pt-4 border-t border-slate-150 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                            <span>{isRtl ? 'تصنيف الكود الفني' : 'Technical code check'}</span>
                            <span className="text-green-800 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                              {isRtl ? 'مطابق ومفعل' : 'Active Duty'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            )}

            {/* General Corporate Guarantee Footer */}
            <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-950 text-white rounded-2xl shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    {isRtl ? 'ضوابط الامتثال والمسؤولية الإدارية والرقابة الفنية' : 'Strict Corporate Compliance & Governance Assurance'}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-0.5">
                    {isRtl
                      ? 'جميع إداراتنا مرتبطة بنظام حوسبة مركزي متكامل (ERP)، بمؤشرات أداء تتم مراجعتها شهرياً من قبل ممثلي الجودة.'
                      : 'All divisions are centralized via an integrated ERP suite, with dynamic SLAs monitored monthly by quality managers.'}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl font-black shrink-0 shadow-2xs">
                {isRtl ? 'رقم الاصدار: 2026.1 / معتمد' : 'Standard Document: Grade-1 Approved'}
              </span>
            </div>

          </div>
        ) : (
          /* Tab 2: FULL CORPO TREE VIEW (Connected Flow Tree) */
          <div className="bg-white rounded-[3rem] border border-slate-200 p-6 sm:p-10 shadow-sm overflow-x-auto" id="corporate-governance-tree">
            
            <div className="min-w-[900px] flex flex-col items-center pt-6 pb-12" id="tree-canvas-wrapper">
              
              <div className="mb-6 flex gap-3">
                <button 
                  onClick={expandAll}
                  className="text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5"
                >
                  <ChevronDown className="w-4 h-4" />
                  {isRtl ? 'توسيع كل الأقسام' : 'Expand All'}
                </button>
                <button 
                  onClick={collapseAll}
                  className="text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5"
                >
                  <ChevronUp className="w-4 h-4" />
                  {isRtl ? 'طي كافة الفروع' : 'Collapse All'}
                </button>
              </div>

              {/* 1. Chairman Node (Level 0) */}
              <div className="flex flex-col items-center relative w-full mb-8">
                <div 
                  onClick={() => toggleNode('chairman')}
                  className={`cursor-pointer group relative bg-gradient-to-r from-green-950 to-slate-900 text-white rounded-3xl p-6 border-2 border-amber-500 max-w-lg w-full text-center shadow-md hover:shadow-lg transition-all`}
                  id="tree-node-chairman"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-950 p-2 rounded-xl border-2 border-green-950 shadow-sm">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="pt-1.5">
                    <span className="text-[9px] font-black text-amber-400 tracking-widest uppercase block mb-1">
                      {isRtl ? 'مجلس الإدارة والشركاء' : 'BOARD OF DIRECTORS / LEVEL 0'}
                    </span>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
                      {isRtl ? chairmanNode.titleAr : chairmanNode.titleEn}
                    </h3>
                    <p className="text-xs text-slate-300 font-extrabold mt-1.5">
                      {isRtl ? chairmanNode.nameAr : chairmanNode.nameEn}
                    </p>
                  </div>
                  <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-amber-500 rounded-full p-0.5 border border-green-950">
                    <ChevronDown className="w-3.5 h-3.5 text-slate-950" />
                  </div>
                </div>

                {expandedNodes['chairman'] && (
                  <>
                    {/* Vertical Connector Line */}
                    <div className="w-0.5 h-10 bg-green-900/40" />

                    {/* 2. CEO Node (Level 1) */}
                    <div className="flex flex-col items-center relative w-full mb-8">
                      <div 
                        onClick={() => toggleNode('ceo')}
                        className={`cursor-pointer group relative bg-green-900 text-white rounded-3xl p-5 border-2 border-green-750 max-w-md w-full text-center shadow-sm hover:shadow-md transition-all`}
                        id="tree-node-ceo"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-1.5 rounded-xl border border-green-900">
                          <UserCheck className="w-3.5 h-3.5" />
                        </div>
                        <div className="pt-1">
                          <span className="text-[8px] font-black text-green-300 tracking-widest uppercase block mb-1">
                            {isRtl ? 'الرئاسة التنفيذية والعلاقات العامة' : 'CHIEF EXECUTIVE / LEVEL 1'}
                          </span>
                          <h4 className="text-sm sm:text-base font-black text-white">
                            {isRtl ? ceoNode?.titleAr : ceoNode?.titleEn}
                          </h4>
                          <p className="text-xs text-green-250 font-bold mt-1">
                            {isRtl ? ceoNode?.nameAr : ceoNode?.nameEn}
                          </p>
                        </div>
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-green-500 rounded-full p-0.5 border border-green-900">
                          {expandedNodes['ceo'] ? <ChevronUp className="w-3.5 h-3.5 text-white" /> : <ChevronDown className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>

                      {expandedNodes['ceo'] && (
                        <>
                          {/* Vertical Connector Line to Horizontal Bus */}
                          <div className="w-0.5 h-8 bg-green-900/40" />

                          {/* Horizontal Bus */}
                          <div className="w-4/5 h-0.5 bg-green-900/40 relative" />

                          {/* 4 Pillars Level (Level 2) */}
                          <div className="grid grid-cols-4 gap-4 w-full mt-8 items-start">
                            {pillars.map((pillar, pIdx) => {
                              const pId = `pillar-${pIdx}`;
                              const isPillarExpanded = expandedNodes[pId];
                              const pMeta = pillarDetails[pIdx];
                              const P_Icon = pMeta.icon;

                              return (
                                <div key={pIdx} className="flex flex-col items-center relative">
                                  {/* Small anchor vertical link line */}
                                  <div className="absolute top-[-34px] left-1/2 -translate-x-1/2 h-[34px] w-0.5 bg-green-900/40" />

                                  {/* Pillar Header Node */}
                                  <div 
                                    onClick={() => toggleNode(pId)}
                                    className={`cursor-pointer group relative bg-white border-2 rounded-2xl p-4 w-full text-center hover:shadow-xs transition-all ${
                                      isPillarExpanded 
                                        ? pMeta.accentBorder + ' shadow-2xs' 
                                        : 'border-slate-200'
                                    }`}
                                    id={`tree-node-${pId}`}
                                  >
                                    <div className="flex items-center justify-center gap-2 mb-1.5">
                                      <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0`}>
                                        <P_Icon className="w-3.5 h-3.5 text-green-900" />
                                      </div>
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                                        {isRtl ? `قطاع رقم ${pIdx + 1}` : `Pillar 0${pIdx + 1}`}
                                      </span>
                                    </div>

                                    <h5 className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight">
                                      {isRtl ? pillar.titleAr : pillar.titleEn}
                                    </h5>
                                    {pillar.nameAr && (
                                      <p className="text-[9px] text-green-700 font-extrabold mt-1 leading-none">
                                        {isRtl ? pillar.nameAr : pillar.nameEn}
                                      </p>
                                    )}

                                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-slate-200 rounded-full p-0.5 border border-slate-300">
                                      {isPillarExpanded ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
                                    </div>
                                  </div>

                                  {/* 3. Sub-Departments (Level 3) & Sub-sections (Level 4) */}
                                  {isPillarExpanded && (
                                    <div className="w-full flex flex-col items-center mt-6 space-y-4 relative">
                                      <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 h-6 w-0.5 bg-slate-300" />

                                      {(pillar.children || []).map((dept, dIdx) => {
                                        const dId = `pillar-${pIdx}-dept-${dIdx}`;
                                        const isDeptExpanded = expandedNodes[dId];
                                        const subSections = dept.children || [];

                                        return (
                                          <div key={dIdx} className="w-full flex flex-col items-center relative">
                                            {/* Department Node Card */}
                                            <div 
                                              onClick={() => toggleNode(dId)}
                                              className={`cursor-pointer w-full bg-slate-50 border rounded-xl p-3 text-center hover:bg-slate-100/50 transition-all ${
                                                isDeptExpanded 
                                                  ? 'border-green-850 shadow-3xs' 
                                                  : 'border-slate-200/80'
                                              }`}
                                              id={`tree-node-${dId}`}
                                            >
                                              <span className="text-[7.5px] font-black text-green-800 uppercase block mb-1">
                                                {isRtl ? 'إدارة تخصصية' : 'DEPARTMENTAL SECTOR'}
                                              </span>
                                              <h6 className="text-[10.5px] font-black text-slate-850 leading-snug">
                                                {isRtl ? dept.titleAr : dept.titleEn}
                                              </h6>
                                              
                                              {subSections.length > 0 && (
                                                <div className="mt-1.5 flex justify-center">
                                                  <span className="text-[8.5px] font-bold text-slate-450 bg-white border border-slate-200 px-2 py-0.5 rounded">
                                                    {isRtl 
                                                      ? `${subSections.length} وحدات فنية` 
                                                      : `${subSections.length} Units`}
                                                  </span>
                                                </div>
                                              )}
                                            </div>

                                            {/* Level 4 sub-sections container */}
                                            {isDeptExpanded && subSections.length > 0 && (
                                              <div className="w-[95%] bg-slate-100/35 border border-dashed border-slate-200 rounded-xl p-2 mt-2 space-y-1.5 relative">
                                                {subSections.map((sec, sIdx) => (
                                                  <div 
                                                    key={sIdx} 
                                                    className="bg-white/80 border border-slate-150 rounded-lg p-2 text-right relative flex items-start gap-1.5"
                                                  >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1" />
                                                    <span className="text-[9.5px] font-semibold leading-normal text-slate-700">
                                                      {isRtl ? sec.titleAr : sec.titleEn}
                                                    </span>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl max-w-md mx-auto text-center text-xs text-slate-500 font-semibold leading-relaxed mt-4">
              {isRtl 
                ? '💡 تلميح: يمكنك الضغط على أي بطاقة في شجرة الهيكل أعلاه لتوسيع أو طي الفروع التابعة لها بمرونة.'
                : '💡 Tip: Click on any executive or department card in the tree to expand or collapse its sub-branches.'}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
