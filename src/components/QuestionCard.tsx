
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Question } from "@/utils/quizData";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionCard = ({ question, onAnswer }: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-quiz-primary dark:text-white mb-6">
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            variant="outline"
            className="w-full text-left justify-start p-4 hover:bg-quiz-light dark:hover:bg-gray-700 hover:text-quiz-primary dark:hover:text-white transition-colors"
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
