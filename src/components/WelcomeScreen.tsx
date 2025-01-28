import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto p-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold text-quiz-primary mb-4">
          Discover Your Ideal Career Path
        </h1>
        <div className="h-1 w-24 bg-quiz-accent mx-auto rounded-full"></div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-600 mb-8 leading-relaxed"
      >
        Take our comprehensive career assessment to uncover career paths that match your personality,
        skills, and preferences. Answer 15 questions and get personalized recommendations to guide your professional journey.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <Button 
          onClick={onStart}
          className="bg-quiz-accent hover:bg-quiz-primary text-white px-8 py-6 rounded-lg text-xl transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Your Career Journey
        </Button>
        
        <p className="text-sm text-gray-500">
          Takes approximately 8 minutes to complete
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { title: "15 Questions", description: "Carefully crafted to understand your preferences" },
          { title: "Instant Results", description: "Get your career matches immediately" },
          { title: "Detailed Insights", description: "Including skills needed and job outlook" }
        ].map((feature, index) => (
          <div key={index} className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-quiz-primary mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;