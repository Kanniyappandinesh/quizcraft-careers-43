
interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full bg-quiz-light dark:bg-quiz-dark rounded-full h-2.5 mb-6">
      <div
        className="bg-quiz-accent dark:bg-quiz-darkAccent h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
