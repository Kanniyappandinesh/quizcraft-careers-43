
import { CareerDetail } from "@/components/dashboard/types";

export const careerDetails: CareerDetail[] = [
  {
    title: "Software Developer",
    description: "Design and create computer programs and applications",
    longDescription: "Software developers create applications or systems that run on computers and other devices. They apply principles of computer science and mathematics to design, develop, and test software applications and systems. Software developers are the creative minds behind computer programs. Some develop applications that allow people to do specific tasks on a computer or another device. Others develop the underlying systems that run the devices or control networks.",
    skills: ["Programming", "Problem Solving", "Analytical Thinking", "Debugging", "Algorithm Design", "Version Control", "Testing", "Documentation"],
    outlook: "36% growth projected over next decade",
    education: "Bachelor's degree in Computer Science or related field",
    salary: "$110,140 per year",
    dayInLife: "Software developers typically start their day reviewing code and checking for any issues that need immediate attention. They spend a significant portion of their day writing and testing code, collaborating with other developers, and attending meetings with product managers to discuss requirements and progress. They may also participate in code reviews, assist junior developers, and document their work. Some time is usually dedicated to learning new technologies and solving complex problems.",
    successStories: [
      {
        name: "Sarah Chen",
        role: "Senior Software Engineer",
        company: "Google",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "Finding my passion for coding changed everything for me. What started as a hobby became a fulfilling career.",
        story: "After graduating with a degree in Mathematics, Sarah taught herself to code through online courses and coding bootcamps. She started her career at a small startup before being recruited by Google. She now leads a team developing tools for cloud infrastructure and mentors new developers."
      },
      {
        name: "Miguel Rodriguez",
        role: "Full Stack Developer",
        company: "Spotify",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "The most rewarding part of being a developer is seeing your code solve real problems for millions of users.",
        story: "Miguel began his career as a customer support representative but was always interested in how the software worked. He convinced his company to let him work with the development team part-time, where he learned on the job. After two years, he transitioned to a full-time developer role and later joined Spotify, where he works on user-facing features of the music streaming platform."
      }
    ],
    videoEmbeds: ["QYUbIjIQdjo", "zO9WF5MzJDg"],
    relatedCareers: ["Data Analyst", "UX Designer", "DevOps Engineer"]
  },
  {
    title: "Data Analyst",
    description: "Interpret complex data sets to inform business decisions",
    longDescription: "Data analysts collect, process, and perform statistical analyses on large datasets. They discover how data can be used to answer questions and solve problems. With the increasing amount of data available, companies in virtually every industry are looking for data analysts to help them make better business decisions.",
    skills: ["Statistical Analysis", "SQL", "Data Visualization", "Critical Thinking", "Problem-Solving", "Mathematics", "Programming", "Communication"],
    outlook: "23% growth projected over next decade",
    education: "Bachelor's degree in Statistics, Mathematics, or related field",
    salary: "$86,200 per year",
    dayInLife: "A typical day for a data analyst involves gathering data from various sources, cleaning and organizing it, and then analyzing it using statistical tools and programming languages. They often create visualizations and reports to communicate their findings to non-technical stakeholders. Data analysts may also spend time improving data collection processes, updating dashboards, and collaborating with other teams to understand business needs and how data can provide insights.",
    successStories: [
      {
        name: "Jordan Williams",
        role: "Senior Data Analyst",
        company: "Netflix",
        imageUrl: "https://images.unsplash.com/photo-1573165850883-9b0e18025653?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "Data tells stories that can transform businesses if you know how to listen.",
        story: "Jordan started as a marketing coordinator but was always the 'numbers person' on the team. After taking some online courses in statistics and SQL, they began doing basic data analysis for marketing campaigns. Their ability to turn data into actionable insights caught the attention of management, and they were encouraged to move into a full-time analyst role. Now at Netflix, Jordan helps the content team understand viewing patterns and preferences to inform programming decisions."
      },
      {
        name: "Aisha Patel",
        role: "Business Intelligence Analyst",
        company: "Amazon",
        imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "The best feeling is when your analysis directly leads to a successful business strategy.",
        story: "With a background in economics, Aisha always had a talent for spotting trends in numbers. She joined a retail company's inventory team and taught herself SQL to analyze stock levels more efficiently. Her insights saved the company millions in inventory costs, which led to a promotion to the business intelligence team. She now works at Amazon, where she analyzes customer behavior data to optimize the shopping experience."
      }
    ],
    videoEmbeds: ["5vKYo9HECa4", "ua-CiDNNj30"],
    relatedCareers: ["Software Developer", "Data Scientist", "Financial Analyst"]
  },
  {
    title: "Marketing Specialist",
    description: "Develop and implement marketing strategies",
    longDescription: "Marketing specialists research market conditions and develop strategies to maximize a company's profits and market share. They analyze data on competitors, prices, and methods of marketing and distribution. They also help develop promotional content, advertising campaigns, and other marketing initiatives.",
    skills: ["Digital Marketing", "Content Creation", "Social Media", "Analytics", "SEO", "Communication", "Creativity", "Project Management"],
    outlook: "10% growth projected over next decade",
    education: "Bachelor's degree in Marketing, Business, or related field",
    salary: "$73,970 per year",
    dayInLife: "Marketing specialists start their day by checking campaign performances and social media engagement. They spend time creating and reviewing content, analyzing marketing data, and coordinating with designers and writers. They also attend meetings to discuss upcoming campaigns, collaborate with the sales team on lead generation strategies, and stay updated on industry trends. Some days involve working on special projects like website updates, email campaigns, or marketing events.",
    successStories: [
      {
        name: "Carlos Mendoza",
        role: "Digital Marketing Director",
        company: "Adidas",
        imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "Great marketing is about connecting with people's emotions and aspirations, not just selling products.",
        story: "Carlos began his career as a social media assistant for a local restaurant chain. His creative campaigns and ability to engage audiences quickly got him noticed. He moved to a marketing agency where he worked with various clients before being hired by Adidas. He now leads digital marketing strategy for their North American running division, where his campaigns have contributed to significant market share growth."
      },
      {
        name: "Taylor Kim",
        role: "Content Marketing Manager",
        company: "HubSpot",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "The most effective marketing today is education-based - helping people solve problems builds trust and loyalty.",
        story: "Taylor started as a freelance writer creating blog posts for various companies. After building a strong portfolio, they were hired as a content creator for a tech startup. Their ability to explain complex topics in simple terms resonated with audiences, leading to a significant increase in organic traffic. HubSpot recruited Taylor to lead their content strategy, where they now manage a team of writers creating educational content that drives inbound marketing efforts."
      }
    ],
    videoEmbeds: ["1ywb-0_DMYs", "I4sbA6d3Qo0"],
    relatedCareers: ["PR Specialist", "Sales Representative", "Brand Manager"]
  },
  {
    title: "Project Manager",
    description: "Lead teams and coordinate projects from start to finish",
    longDescription: "Project managers plan, initiate, and oversee the execution of projects. They are responsible for defining the project's scope, creating detailed plans, managing resources, budgets, and timelines, and ensuring that all team members are aligned with project goals. Project managers work across various industries, from construction and IT to healthcare and finance.",
    skills: ["Leadership", "Organization", "Communication", "Risk Management", "Budgeting", "Problem-Solving", "Negotiation", "Time Management"],
    outlook: "25% growth projected over next decade",
    education: "Bachelor's degree in Business or related field, PMP certification recommended",
    salary: "$94,500 per year",
    dayInLife: "Project managers typically begin their day with a team status meeting to discuss progress and address any issues. They spend time updating project plans, tracking deliverables, and communicating with stakeholders. A significant portion of their day involves solving problems, managing risks, and making decisions. They also coordinate with different departments, prepare reports for executives, and ensure that the project stays on budget and schedule. Some days may involve vendor negotiations or client meetings.",
    successStories: [
      {
        name: "David Wright",
        role: "Senior Project Manager",
        company: "Microsoft",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "A good project manager isn't just organized - they're a visionary, diplomat, and problem-solver all in one.",
        story: "David began his career as a software developer but found he had a talent for coordinating team efforts. After leading a few small projects, he decided to pursue formal project management training and certification. He managed increasingly complex projects at a financial services firm before joining Microsoft, where he now leads cross-functional teams working on cloud infrastructure projects."
      },
      {
        name: "Priya Sharma",
        role: "Construction Project Manager",
        company: "AECOM",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "Being responsible for bringing complex projects to life is challenging but incredibly rewarding.",
        story: "With a background in civil engineering, Priya spent several years working on design projects before moving into project management. She earned her PMP certification while managing residential developments, then moved to commercial projects. She now oversees major infrastructure projects at AECOM, where she manages multimillion-dollar budgets and coordinates with government agencies, engineers, and construction teams."
      }
    ],
    videoEmbeds: ["vDS8gEbs9ik", "9LSnINglkQA"],
    relatedCareers: ["Product Manager", "Construction Manager", "Management Consultant"]
  },
  {
    title: "Teacher",
    description: "Educate and inspire students in various subjects",
    longDescription: "Teachers educate students of various ages in a wide range of subjects. They plan lessons that align with curriculum standards, assess student progress, and adapt teaching methods to accommodate different learning styles. Beyond academic instruction, teachers also play a crucial role in students' social and emotional development, creating a supportive learning environment and serving as mentors and role models.",
    skills: ["Communication", "Patience", "Organization", "Adaptability", "Creativity", "Subject Expertise", "Assessment", "Technology Integration"],
    outlook: "8% growth projected over next decade",
    education: "Bachelor's degree in Education, Teaching certification required",
    salary: "$61,820 per year",
    dayInLife: "Teachers typically arrive at school early to prepare materials and review lesson plans. They teach multiple classes throughout the day, adapting their approach based on student needs. During preparation periods, they grade assignments, create lesson plans, and communicate with parents. After school, they might offer extra help to students, participate in staff meetings, or supervise extracurricular activities. Many teachers also spend evenings updating gradebooks, providing feedback on student work, and preparing for the next day.",
    successStories: [
      {
        name: "Marcus Johnson",
        role: "High School Science Teacher",
        company: "Lincoln High School",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "When you see that moment of understanding in a student's eyes, there's no greater feeling.",
        story: "Marcus worked as a research assistant in a biology lab before realizing his passion was in education. He completed an alternative certification program while volunteering at a community center teaching science to underprivileged youth. Now in his eighth year of teaching high school biology and chemistry, he has developed an innovative curriculum that incorporates hands-on experiments and real-world applications. His students consistently score above average on standardized tests, and many have gone on to pursue STEM careers."
      },
      {
        name: "Elena Rodriguez",
        role: "Elementary School Teacher",
        company: "Oakridge Elementary",
        imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        quote: "Teaching young children is about nurturing curiosity and building the foundation for lifelong learning.",
        story: "Elena always knew she wanted to work with children. After earning her degree in early childhood education, she began teaching second grade. She became known for her creative approach to literacy, developing a reading program that paired students with senior citizens as reading buddies. This program not only improved reading scores but also fostered intergenerational connections in the community. Elena has been recognized with several teaching awards and now mentors new teachers in her district."
      }
    ],
    videoEmbeds: ["qDovHZVdyc8", "UCFg9bcW7Bg"],
    relatedCareers: ["School Counselor", "Educational Administrator", "Curriculum Developer"]
  }
];
