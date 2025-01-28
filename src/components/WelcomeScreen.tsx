import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center max-w-2xl mx-auto p-8"
    >
      <h1 className="text-4xl font-bold text-quiz-primary mb-6">
        Discover Your Ideal Career Path
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Answer 15 questions to uncover career paths that match your personality,
        skills, and preferences. Take your first step toward finding your perfect career!
      </p>
      <Button 
        onClick={onStart}
        className="bg-quiz-accent hover:bg-quiz-primary text-white px-8 py-4 rounded-lg text-lg transition-colors duration-300"
      >
        Start Quiz
      </Button>
    </motion.div>
  );
};

export default WelcomeScreen;