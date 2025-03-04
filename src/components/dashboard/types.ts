
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
