
import { useState } from "react";
import QuizContainer from "@/components/QuizContainer";
import Dashboard from "@/components/Dashboard";
import DFDDiagram from "@/components/DFDDiagram";
import { motion } from "framer-motion";
import { Sparkles, FileDigit, HelpCircle, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import NavigationButtons from "@/components/NavigationButtons";

const Index = () => {
  const [activeModule, setActiveModule] = useState<'quiz' | 'dashboard' | 'dfd'>('quiz');
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
            <Button
              onClick={() => setActiveModule('quiz')}
              variant={activeModule === 'quiz' ? 'secondary' : 'ghost'}
              className={`hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium ${activeModule === 'quiz' ? 'bg-white/40' : 'bg-white/20'}`}
            >
              Quiz
            </Button>
            <Button
              onClick={() => setActiveModule('dashboard')}
              variant={activeModule === 'dashboard' ? 'secondary' : 'ghost'}
              className={`hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2 ${activeModule === 'dashboard' ? 'bg-white/40' : 'bg-white/20'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
            <Button
              onClick={() => setActiveModule('dfd')}
              variant={activeModule === 'dfd' ? 'secondary' : 'ghost'}
              className={`hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2 ${activeModule === 'dfd' ? 'bg-white/40' : 'bg-white/20'}`}
            >
              <FileDigit className="w-4 h-4" />
              View DFD
            </Button>
            <Separator orientation="vertical" className="h-8 bg-white/20" />
            <NavigationButtons currentPage="home" />
          </div>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        {activeModule === 'dfd' && <DFDDiagram />}
        {activeModule === 'dashboard' && <Dashboard />}
        {activeModule === 'quiz' && <QuizContainer />}
      </motion.div>
    </div>
  );
};

export default Index;
