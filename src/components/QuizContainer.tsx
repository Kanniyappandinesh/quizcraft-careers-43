
import { useState } from "react";
import { questions, getCareerMatches } from "@/utils/quizData";
import WelcomeScreen from "./WelcomeScreen";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import ResultsPage from "./ResultsPage";
import { AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";

const QuizContainer = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const matches = getCareerMatches(newAnswers);
      
      // Calculate strengths and growth areas
      const strengths = calculateStrengths(newAnswers);
      const growthAreas = identifyGrowthAreas(newAnswers);
      
      // Save results to local storage for immediate use
      const newResult = {
        date: new Date().toISOString(),
        matches,
        answers: newAnswers,
        strengths,
        growthAreas
      };
      
      const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      localStorage.setItem('quizResults', JSON.stringify([newResult, ...savedResults].slice(0, 10)));
      
      // If user is logged in, save to Supabase
      if (user) {
        try {
          const { error } = await supabase
            .from('quiz_results')
            .insert({
              user_id: user.id,
              answers: newAnswers,
              matches: matches,
              strengths: strengths,
              growth_areas: growthAreas
            });
            
          if (error) throw error;
        } catch (error: any) {
          console.error("Error saving quiz results:", error);
          toast({
            title: "Error saving results",
            description: "Your results couldn't be saved to your account, but they're available locally.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Results saved locally",
          description: "Sign in to save your results to your account and access them from anywhere.",
        });
      }

      toast({
        title: "Analysis Complete! 🎉",
        description: "View your personalized career insights in the dashboard.",
      });
      setShowResults(true);
    }
  };

  const calculateStrengths = (answers: string[]) => {
    const strengths = {
      technical: 0,
      creative: 0,
      analytical: 0,
      interpersonal: 0,
      leadership: 0
    };
    
    // Calculate strength scores based on answers
    answers.forEach((answer, index) => {
      const question = questions[index];
      if (answer.includes('tech') || answer.includes('code')) strengths.technical += 1;
      if (answer.includes('design') || answer.includes('create')) strengths.creative += 1;
      if (answer.includes('data') || answer.includes('research')) strengths.analytical += 1;
      if (answer.includes('team') || answer.includes('communicate')) strengths.interpersonal += 1;
      if (answer.includes('lead') || answer.includes('manage')) strengths.leadership += 1;
    });

    return strengths;
  };

  const identifyGrowthAreas = (answers: string[]) => {
    // Identify areas for improvement based on answer patterns
    const areas = [];
    const strengths = calculateStrengths(answers);
    
    if (strengths.technical < 3) areas.push('Technical Skills');
    if (strengths.creative < 3) areas.push('Creative Thinking');
    if (strengths.analytical < 3) areas.push('Analytical Abilities');
    if (strengths.interpersonal < 3) areas.push('Communication Skills');
    if (strengths.leadership < 3) areas.push('Leadership Capabilities');
    
    return areas;
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (!started) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (showResults) {
    return <ResultsPage matches={getCareerMatches(answers)} onRestart={handleRestart} />;
  }

  return (
    <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestion}
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      </AnimatePresence>
    </div>
  );
};

export default QuizContainer;
