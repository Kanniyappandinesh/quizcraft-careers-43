
import { motion } from "framer-motion";
import type { CareerMatch } from "@/utils/quizData";

interface ResultsPageProps {
  matches: CareerMatch[];
  onRestart: () => void;
}

const ResultsPage = ({ matches, onRestart }: ResultsPageProps) => {
  // Calculate percentages based on position in matches array
  const getMatchPercentage = (index: number) => {
    // First match is 100%, second is 85%, third is 70%
    return 100 - (index * 15);
  };

  const getCourseRecommendations = (career: string) => {
    const recommendations = {
      "Software Developer": [
        { name: "Complete Web Development Bootcamp", url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/" },
        { name: "CS50: Introduction to Computer Science", url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x" },
        { name: "The Odin Project", url: "https://www.theodinproject.com/" }
      ],
      "Data Analyst": [
        { name: "Google Data Analytics Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
        { name: "Data Analyst in Python", url: "https://www.datacamp.com/tracks/data-analyst-in-python" },
        { name: "IBM Data Analyst Professional Certificate", url: "https://www.coursera.org/professional-certificates/ibm-data-analyst" }
      ],
      "Marketing Specialist": [
        { name: "Digital Marketing Specialization", url: "https://www.coursera.org/specializations/digital-marketing" },
        { name: "Google Digital Marketing & E-commerce Certificate", url: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce" },
        { name: "HubSpot Academy Marketing Courses", url: "https://academy.hubspot.com/courses" }
      ],
      "Project Manager": [
        { name: "Google Project Management Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-project-management" },
        { name: "PMP Certification Course", url: "https://www.udemy.com/course/pmp-certification-prep/" },
        { name: "Scrum Master Certification", url: "https://www.scrum.org/professional-scrum-certifications" }
      ],
      "Teacher": [
        { name: "Teaching English as a Foreign Language (TEFL)", url: "https://www.tefl.org/" },
        { name: "Instructional Design and Technology", url: "https://www.coursera.org/specializations/instructional-design" },
        { name: "Educational Technology Leadership", url: "https://www.edx.org/course/educational-technology-leadership" }
      ],
      "Sales Representative": [
        { name: "Sales Training Specialization", url: "https://www.coursera.org/specializations/sales-training" },
        { name: "HubSpot Sales Training", url: "https://academy.hubspot.com/courses/sales-training" },
        { name: "Professional Sales Certificate", url: "https://www.udemy.com/course/professional-sales-certificate/" }
      ],
      "Graphic Designer": [
        { name: "Graphic Design Specialization", url: "https://www.coursera.org/specializations/graphic-design" },
        { name: "Adobe Creative Suite Masterclass", url: "https://www.udemy.com/course/graphic-design-masterclass/" },
        { name: "UI/UX Design Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design" }
      ],
      "Financial Analyst": [
        { name: "Financial Analysis and Decision Making", url: "https://www.edx.org/course/financial-analysis-and-decision-making" },
        { name: "Investment Management Specialization", url: "https://www.coursera.org/specializations/investment-management" },
        { name: "CFA Program", url: "https://www.cfainstitute.org/programs/cfa" }
      ],
      "HR Specialist": [
        { name: "Human Resource Management Specialization", url: "https://www.coursera.org/specializations/human-resource-management" },
        { name: "SHRM Certification", url: "https://www.shrm.org/certification/" },
        { name: "People Analytics", url: "https://www.coursera.org/learn/people-analytics" }
      ],
      "Entrepreneur": [
        { name: "Entrepreneurship Specialization", url: "https://www.coursera.org/specializations/wharton-entrepreneurship" },
        { name: "Business Foundations Specialization", url: "https://www.coursera.org/specializations/wharton-business-foundations" },
        { name: "Y Combinator Startup School", url: "https://www.startupschool.org/" }
      ]
    };
    return recommendations[career as keyof typeof recommendations] || [];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-8"
    >
      <h2 className="text-3xl font-bold text-quiz-primary mb-8 text-center">
        Your Career Matches
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg relative"
          >
            <div className="absolute top-4 right-4">
              <div className="bg-quiz-light text-quiz-primary font-bold rounded-full px-3 py-1">
                {getMatchPercentage(index)}%
              </div>
            </div>
            <h3 className="text-xl font-semibold text-quiz-primary mb-3">
              {match.title}
            </h3>
            <p className="text-gray-600 mb-4">{match.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Key Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {match.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-quiz-light text-quiz-primary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Job Outlook:</strong> {match.outlook}
            </p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Education Required:</h4>
              <p className="text-sm text-gray-600">{match.education}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recommended Courses:</h4>
              <ul className="text-sm space-y-2">
                {getCourseRecommendations(match.title).map((course, i) => (
                  <li key={i}>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-quiz-primary hover:text-quiz-accent underline"
                    >
                      {course.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="text-quiz-accent hover:text-quiz-primary underline transition-colors"
        >
          Take the quiz again
        </button>
      </div>
    </motion.div>
  );
};

export default ResultsPage;
