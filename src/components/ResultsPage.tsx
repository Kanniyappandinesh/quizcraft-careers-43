import { motion } from "framer-motion";
import type { CareerMatch } from "@/utils/quizData";

interface ResultsPageProps {
  matches: CareerMatch[];
  onRestart: () => void;
}

const ResultsPage = ({ matches, onRestart }: ResultsPageProps) => {
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
            className="bg-white p-6 rounded-xl shadow-lg"
          >
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
            <p className="text-sm text-gray-500">
              <strong>Job Outlook:</strong> {match.outlook}
            </p>
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