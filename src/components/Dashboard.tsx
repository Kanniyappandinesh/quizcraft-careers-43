
import { motion } from "framer-motion";
import { questions } from "@/utils/quizData";
import StatCards from "./dashboard/StatCards";
import StrengthRadarChart from "./dashboard/StrengthRadarChart";
import GrowthOpportunities from "./dashboard/GrowthOpportunities";
import CareerDistributionChart from "./dashboard/CareerDistributionChart";
import { SavedResult } from "./dashboard/types";

const Dashboard = () => {
  const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]') as SavedResult[];
  const latestResult = savedResults[0] || null;

  // Transform strength data for radar chart
  const strengthData = latestResult ? Object.entries(latestResult.strengths).map(([key, value]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    A: value,
    fullMark: 5,
  })) : [];

  // Career categories distribution
  const careerCategories = [
    { name: 'Technology', count: 25 },
    { name: 'Business', count: 20 },
    { name: 'Creative', count: 15 },
    { name: 'Education', count: 18 },
    { name: 'Healthcare', count: 22 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Calculate the sum of strength values with proper type checking
  const getTotalStrengthScore = (): number => {
    if (!latestResult) return 0;
    
    return Object.values(latestResult.strengths).reduce((sum, value) => sum + value, 0);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Quick Stats */}
      <StatCards 
        totalStrengthScore={getTotalStrengthScore()}
        growthAreasCount={latestResult ? latestResult.growthAreas.length : 0}
        matchesCount={latestResult ? latestResult.matches.length : 0}
        variants={item}
      />

      {/* Strength Radar Chart */}
      {latestResult && (
        <StrengthRadarChart strengthData={strengthData} variants={item} />
      )}

      {/* Growth Areas */}
      {latestResult && latestResult.growthAreas.length > 0 && (
        <GrowthOpportunities growthAreas={latestResult.growthAreas} variants={item} />
      )}

      {/* Career Distribution */}
      <CareerDistributionChart careerCategories={careerCategories} variants={item} />
    </motion.div>
  );
};

export default Dashboard;
