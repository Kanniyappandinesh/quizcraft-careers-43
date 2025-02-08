
import { useState } from "react";
import QuizContainer from "@/components/QuizContainer";
import Dashboard from "@/components/Dashboard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb]">
      <nav className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            CareerQuest
          </h1>
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2"
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
