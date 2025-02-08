
import { useState, useEffect } from "react";
import { questions, getCareerMatches } from "@/utils/quizData";
import WelcomeScreen from "./WelcomeScreen";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import ResultsPage from "./ResultsPage";
import { AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const QuizContainer = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const matches = getCareerMatches(newAnswers);
      // Save results to localStorage
      const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      const newResult = {
        date: new Date().toISOString(),
        matches
      };
      localStorage.setItem('quizResults', JSON.stringify([newResult, ...savedResults].slice(0, 5)));
      toast({
        title: "Results saved!",
        description: "You can access your previous results from the dashboard.",
      });
      setShowResults(true);
    }
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
