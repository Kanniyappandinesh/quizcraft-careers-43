
export interface StrengthValues {
  technical: number;
  creative: number;
  analytical: number;
  interpersonal: number;
  leadership: number;
  [key: string]: number;
}

export interface SavedResult {
  date: string;
  matches: any[];
  answers: string[];
  strengths: StrengthValues;
  growthAreas: string[];
}

export interface CareerCategory {
  name: string;
  count: number;
}

export interface AnimationVariants {
  hidden: object;
  show: object;
}

export interface CareerDetail {
  title: string;
  description: string;
  longDescription: string;
  skills: string[];
  outlook: string;
  education: string;
  salary: string;
  dayInLife: string;
  successStories: SuccessStory[];
  videoEmbeds: string[];
  relatedCareers: string[];
}

export interface SuccessStory {
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  quote: string;
  story: string;
}

export interface SkillComparison {
  userSkill: string;
  skillLevel: number;
  requiredLevel: number;
  importance: 'high' | 'medium' | 'low';
  match: 'perfect' | 'good' | 'gap';
}
