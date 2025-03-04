
import { useState } from "react";
import QuizContainer from "@/components/QuizContainer";
import Dashboard from "@/components/Dashboard";
import DFDDiagram from "@/components/DFDDiagram";
import { motion } from "framer-motion";
import { Sparkles, FileDigit, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showDFD, setShowDFD] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb]">
      <nav className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            CareerQuest
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDFD(!showDFD)}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2"
            >
              <FileDigit className="w-4 h-4" />
              {showDFD ? "Hide DFD" : "View DFD"}
            </button>
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2"
            >
              {showDashboard ? "Take Quiz" : "View Dashboard"}
            </button>
            {user ? (
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        {showDFD ? (
          <DFDDiagram />
        ) : showDashboard ? (
          <Dashboard />
        ) : (
          <QuizContainer />
        )}
      </motion.div>
    </div>
  );
};

export default Index;
