import { useState } from "react";
import { questions, getCareerMatches } from "@/utils/quizData";
import WelcomeScreen from "./WelcomeScreen";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import ResultsPage from "./ResultsPage";
import { AnimatePresence } from "framer-motion";

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
    <div className="p-6">
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