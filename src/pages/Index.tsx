import QuizContainer from "@/components/QuizContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-quiz-light">
      <div className="container mx-auto py-12">
        <QuizContainer />
      </div>
    </div>
  );
};

export default Index;