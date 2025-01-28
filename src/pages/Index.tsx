import { useState } from "react";
import QuizContainer from "@/components/QuizContainer";
import Dashboard from "@/components/Dashboard";
import { motion } from "framer-motion";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-quiz-light via-white to-quiz-light">
      <nav className="bg-quiz-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">CareerQuest</h1>
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="text-white hover:text-quiz-accent transition-colors"
          >
            {showDashboard ? "Take Quiz" : "View Dashboard"}
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        {showDashboard ? (
          <Dashboard />
        ) : (
          <QuizContainer />
        )}
      </motion.div>
    </div>
  );
};

export default Index;