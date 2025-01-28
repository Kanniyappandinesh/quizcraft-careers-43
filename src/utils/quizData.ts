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
  education: string;
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
  {
    id: 4,
    text: "How do you handle high-pressure situations?",
    options: [
      "Create a detailed plan and follow it",
      "Adapt and think on your feet",
      "Collaborate with others for solutions",
      "Stay calm and tackle one task at a time",
    ],
  },
  {
    id: 5,
    text: "What interests you most about technology?",
    options: [
      "Building and creating new things",
      "Analyzing data and patterns",
      "Using it to help others",
      "Its potential for innovation",
    ],
  },
  {
    id: 6,
    text: "How do you prefer to communicate?",
    options: [
      "Through detailed written explanations",
      "Using visuals and demonstrations",
      "Face-to-face conversations",
      "Brief, direct messages",
    ],
  },
  {
    id: 7,
    text: "What motivates you most at work?",
    options: [
      "Solving complex problems",
      "Creating something new",
      "Helping others succeed",
      "Achieving concrete results",
    ],
  },
  {
    id: 8,
    text: "How do you approach deadlines?",
    options: [
      "Create detailed schedules and milestones",
      "Work in bursts of creativity",
      "Coordinate with team members",
      "Focus intensely as the deadline approaches",
    ],
  },
  {
    id: 9,
    text: "What role do you naturally take in group projects?",
    options: [
      "Technical expert",
      "Creative contributor",
      "Team coordinator",
      "Project driver",
    ],
  },
  {
    id: 10,
    text: "How do you prefer to organize your work?",
    options: [
      "Using systematic processes and tools",
      "Flexibly adapting to circumstances",
      "Through collaborative planning",
      "Setting clear goals and deadlines",
    ],
  },
  {
    id: 11,
    text: "What type of problems do you enjoy solving?",
    options: [
      "Technical and logical challenges",
      "Creative and design-related issues",
      "People and relationship matters",
      "Business and strategic problems",
    ],
  },
  {
    id: 12,
    text: "How do you prefer to make decisions?",
    options: [
      "Based on data and analysis",
      "Following intuition and creativity",
      "Through group consensus",
      "Using practical experience",
    ],
  },
  {
    id: 13,
    text: "What's your ideal way to spend a workday?",
    options: [
      "Focused on technical tasks",
      "Working on creative projects",
      "Interacting with people",
      "Managing various responsibilities",
    ],
  },
  {
    id: 14,
    text: "How do you prefer to learn new skills?",
    options: [
      "Through structured tutorials",
      "By experimenting and exploring",
      "In group workshops",
      "Through hands-on experience",
    ],
  },
  {
    id: 15,
    text: "What's most important to you in a career?",
    options: [
      "Technical growth and innovation",
      "Creative freedom and expression",
      "Making a positive impact on others",
      "Leadership and achievement",
    ],
  },
];

export const getCareerMatches = (answers: string[]): CareerMatch[] => {
  const scores = {
    softwareDeveloper: 0,
    dataAnalyst: 0,
    marketingSpecialist: 0,
    projectManager: 0,
    teacher: 0,
    salesRepresentative: 0,
    graphicDesigner: 0,
    financialAnalyst: 0,
    hrSpecialist: 0,
    entrepreneur: 0,
  };

  // Score calculation based on answers
  answers.forEach((answer) => {
    if (answer.includes("technical") || answer.includes("systematic") || answer.includes("documentation")) {
      scores.softwareDeveloper += 2;
      scores.dataAnalyst += 1;
    }
    if (answer.includes("data") || answer.includes("analytical") || answer.includes("analysis")) {
      scores.dataAnalyst += 2;
      scores.financialAnalyst += 1;
    }
    if (answer.includes("creative") || answer.includes("visual") || answer.includes("design")) {
      scores.graphicDesigner += 2;
      scores.marketingSpecialist += 1;
    }
    if (answer.includes("collaboration") || answer.includes("team") || answer.includes("coordinate")) {
      scores.projectManager += 2;
      scores.hrSpecialist += 1;
    }
    if (answer.includes("helping") || answer.includes("teaching") || answer.includes("group")) {
      scores.teacher += 2;
      scores.hrSpecialist += 1;
    }
    if (answer.includes("direct") || answer.includes("results") || answer.includes("achievement")) {
      scores.salesRepresentative += 2;
      scores.entrepreneur += 1;
    }
  });

  // Convert scores to array and sort
  const sortedCareers = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Map career names to full career objects
  const careerInfo: { [key: string]: CareerMatch } = {
    softwareDeveloper: {
      title: "Software Developer",
      description: "Design and create computer programs and applications",
      skills: ["Programming", "Problem Solving", "Analytical Thinking", "Debugging"],
      outlook: "36% growth projected over next decade",
      education: "Bachelor's degree in Computer Science or related field",
    },
    dataAnalyst: {
      title: "Data Analyst",
      description: "Interpret complex data sets to inform business decisions",
      skills: ["Statistical Analysis", "SQL", "Data Visualization", "Critical Thinking"],
      outlook: "23% growth projected over next decade",
      education: "Bachelor's degree in Statistics, Mathematics, or related field",
    },
    marketingSpecialist: {
      title: "Marketing Specialist",
      description: "Develop and implement marketing strategies",
      skills: ["Digital Marketing", "Content Creation", "Social Media", "Analytics"],
      outlook: "10% growth projected over next decade",
      education: "Bachelor's degree in Marketing, Business, or related field",
    },
    projectManager: {
      title: "Project Manager",
      description: "Lead teams and coordinate projects from start to finish",
      skills: ["Leadership", "Organization", "Communication", "Risk Management"],
      outlook: "25% growth projected over next decade",
      education: "Bachelor's degree in Business or related field, PMP certification recommended",
    },
    teacher: {
      title: "Teacher",
      description: "Educate and inspire students in various subjects",
      skills: ["Communication", "Patience", "Organization", "Adaptability"],
      outlook: "8% growth projected over next decade",
      education: "Bachelor's degree in Education, Teaching certification required",
    },
    salesRepresentative: {
      title: "Sales Representative",
      description: "Build client relationships and drive revenue growth",
      skills: ["Negotiation", "Communication", "Customer Service", "Goal Setting"],
      outlook: "5% growth projected over next decade",
      education: "Bachelor's degree preferred, relevant sales certifications beneficial",
    },
    graphicDesigner: {
      title: "Graphic Designer",
      description: "Create visual content for various media",
      skills: ["Design Software", "Creativity", "Typography", "Visual Communication"],
      outlook: "13% growth projected over next decade",
      education: "Bachelor's degree in Graphic Design or related field",
    },
    financialAnalyst: {
      title: "Financial Analyst",
      description: "Analyze financial data and market trends",
      skills: ["Financial Modeling", "Excel", "Research", "Analytical Thinking"],
      outlook: "9% growth projected over next decade",
      education: "Bachelor's degree in Finance, Economics, or related field",
    },
    hrSpecialist: {
      title: "Human Resources Specialist",
      description: "Manage employee relations and organizational development",
      skills: ["Communication", "Conflict Resolution", "Employment Law", "Recruiting"],
      outlook: "10% growth projected over next decade",
      education: "Bachelor's degree in Human Resources, Business, or related field",
    },
    entrepreneur: {
      title: "Entrepreneur",
      description: "Start and manage your own business ventures",
      skills: ["Leadership", "Strategic Thinking", "Risk Management", "Innovation"],
      outlook: "Varies by industry and market conditions",
      education: "No specific degree required, business education beneficial",
    },
  };

  return sortedCareers.map(([career]) => careerInfo[career]);
};