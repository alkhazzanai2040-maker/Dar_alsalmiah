export interface Project {
  id: number;
  nameAr: string;
  nameEn: string;
  clientAr: string;
  clientEn: string;
  locationAr: string;
  locationEn: string;
  valueSAR: number;
  durationAr: string;
  durationEn: string;
  startDate: string;
  completionDate: string;
  progress: number;
  scopeAr: string;
  scopeEn: string;
  category: 'roads' | 'infrastructure' | 'excavation' | 'utility' | 'other';
}

export interface Equipment {
  id: number;
  nameAr: string;
  nameEn: string;
  count: number;
  category: 'heavy' | 'transport' | 'specialized' | 'support' | 'power';
  icon: string;
}

export interface OrgNode {
  titleAr: string;
  titleEn: string;
  nameAr?: string;
  nameEn?: string;
  children?: OrgNode[];
}

export type Language = 'ar' | 'en';
