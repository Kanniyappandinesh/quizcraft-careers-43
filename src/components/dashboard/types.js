
// Export types as JavaScript objects with empty or default values
export const defaultStrengthValues = {
  technical: 0,
  creative: 0,
  analytical: 0,
  interpersonal: 0,
  leadership: 0
};

export const defaultSavedResult = {
  date: "",
  matches: [],
  answers: [],
  strengths: defaultStrengthValues,
  growthAreas: []
};

export const defaultCareerCategory = {
  name: "",
  count: 0
};

export const defaultAnimationVariants = {
  hidden: {},
  show: {}
};

export const defaultCareerDetail = {
  title: "",
  description: "",
  longDescription: "",
  skills: [],
  outlook: "",
  education: "",
  salary: "",
  dayInLife: "",
  successStories: [],
  videoEmbeds: [],
  relatedCareers: []
};

export const defaultSuccessStory = {
  name: "",
  role: "",
  company: "",
  imageUrl: "",
  quote: "",
  story: ""
};

export const defaultSkillComparison = {
  userSkill: "",
  skillLevel: 0,
  requiredLevel: 0,
  importance: 'medium',
  match: 'gap'
};

export const defaultExpertAdviceRequest = {
  name: "",
  email: "",
  careerField: "",
  question: "",
  contactConsent: false
};
