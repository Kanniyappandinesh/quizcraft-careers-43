
import { motion } from "framer-motion";
import { questions } from "@/utils/quizData";
import StatCards from "./dashboard/StatCards";
import StrengthRadarChart from "./dashboard/StrengthRadarChart";
import GrowthOpportunities from "./dashboard/GrowthOpportunities";
import CareerDistributionChart from "./dashboard/CareerDistributionChart";
import { SavedResult } from "./dashboard/types";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const latestResult = savedResults[0] || null;

  useEffect(() => {
    // First try to get results from localStorage
    const localResults = JSON.parse(localStorage.getItem('quizResults') || '[]') as SavedResult[];
    
    if (localResults.length > 0) {
      setSavedResults(localResults);
      setLoading(false);
    }
    
    // If user is logged in, get results from Supabase
    if (user) {
      fetchUserResults();
    } else {
      setLoading(false);
    }
  }, [user]);
  
  const fetchUserResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedResults: SavedResult[] = data.map(item => ({
          date: item.date,
          matches: item.matches,
          answers: item.answers,
          strengths: item.strengths,
          growthAreas: item.growth_areas
        }));
        
        setSavedResults(formattedResults);
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    } finally {
      setLoading(false);
    }
  };

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
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (!latestResult) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold mb-4">No quiz results found</h3>
        <p className="text-gray-600 mb-6">Take the career assessment quiz to see your personalized insights</p>
        <Button onClick={() => navigate('/')}>Take the Quiz</Button>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Auth status banner */}
      {!user && (
        <motion.div
          variants={item}
          className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6"
        >
          <p className="text-purple-800 text-sm">
            <b>Note:</b> Sign in to save your quiz results and access them from any device.
            <Button variant="link" className="p-0 h-auto ml-2" onClick={() => navigate('/auth')}>
              Sign In/Register
            </Button>
          </p>
        </motion.div>
      )}

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
