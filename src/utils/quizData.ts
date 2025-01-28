export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface CareerMatch {
  title: string;
  description: string;
  skills: string[];
  outlook: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "How do you prefer to solve problems?",
    options: [
      "Analytically and systematically",
      "Creatively and intuitively",
      "Through collaboration and discussion",
      "Practically and hands-on",
    ],
  },
  {
    id: 2,
    text: "What type of environment energizes you the most?",
    options: [
      "Quiet and structured",
      "Dynamic and fast-paced",
      "Collaborative and social",
      "Independent and flexible",
    ],
  },
  {
    id: 3,
    text: "When learning something new, you prefer to:",
    options: [
      "Read detailed documentation",
      "Watch demonstrations",
      "Try it yourself through trial and error",
      "Discuss it with others",
    ],
  },
  // ... keeping first 3 questions for brevity, add more in production
];

export const getCareerMatches = (answers: string[]): CareerMatch[] => {
  // Simple matching logic for demo
  const analyticalCount = answers.filter(a => 
    a.includes("analytically") || a.includes("systematic") || a.includes("structured")
  ).length;
  
  const creativeCount = answers.filter(a => 
    a.includes("creatively") || a.includes("dynamic") || a.includes("flexible")
  ).length;

  const socialCount = answers.filter(a => 
    a.includes("collaboration") || a.includes("social") || a.includes("discuss")
  ).length;

  const matches: CareerMatch[] = [];

  if (analyticalCount >= 2) {
    matches.push({
      title: "Data Scientist",
      description: "Analyze complex data sets to help organizations make better decisions",
      skills: ["Statistics", "Programming", "Machine Learning", "Problem Solving"],
      outlook: "Growing rapidly with 36% growth projected over next decade",
    });
  }

  if (creativeCount >= 2) {
    matches.push({
      title: "UX Designer",
      description: "Design user-friendly interfaces and experiences for digital products",
      skills: ["Design Thinking", "User Research", "Prototyping", "Visual Design"],
      outlook: "Strong growth with 13% increase expected in coming years",
    });
  }

  if (socialCount >= 2) {
    matches.push({
      title: "Project Manager",
      description: "Lead teams and coordinate projects from inception to completion",
      skills: ["Leadership", "Communication", "Organization", "Risk Management"],
      outlook: "Steady growth with 25% increase projected",
    });
  }

  return matches.length > 0 ? matches : [{
    title: "Career Coach",
    description: "Help others discover and achieve their career goals",
    skills: ["Communication", "Empathy", "Analysis", "Guidance"],
    outlook: "Stable growth with increasing demand for career guidance",
  }];
};
