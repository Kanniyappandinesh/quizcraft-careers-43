
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const QuestionCard = ({ question, onAnswer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-quiz-primary mb-6">
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            variant="outline"
            className="w-full text-left justify-start p-4 hover:bg-quiz-light hover:text-quiz-primary transition-colors"
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
