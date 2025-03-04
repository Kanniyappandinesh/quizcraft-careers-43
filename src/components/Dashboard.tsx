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
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const latestResult = savedResults[0] || null;

  useEffect(() => {
    const localResults = JSON.parse(localStorage.getItem('quizResults') || '[]') as SavedResult[];
    
    if (localResults.length > 0) {
      setSavedResults(localResults);
      setLoading(false);
    }
    
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
          date: item.date || item.created_at || new Date().toISOString(),
          matches: item.matches as any[],
          answers: item.answers as string[],
          strengths: item.strengths as any,
          growthAreas: item.growth_areas as string[]
        }));
        
        setSavedResults(formattedResults);
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    } finally {
      setLoading(false);
    }
  };

  const strengthData = latestResult ? Object.entries(latestResult.strengths).map(([key, value]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    A: value,
    fullMark: 5,
  })) : [];

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
      className="space-y-10"
    >
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

      <motion.div variants={item} className="text-center pb-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">Your Career Dashboard</h2>
        <Separator className="mt-2 mb-6 mx-auto w-24 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]" />
      </motion.div>

      <motion.div 
        variants={item} 
        className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Career Stats Overview</h3>
        <StatCards 
          totalStrengthScore={getTotalStrengthScore()}
          growthAreasCount={latestResult ? latestResult.growthAreas.length : 0}
          matchesCount={latestResult ? latestResult.matches.length : 0}
          variants={item}
        />
      </motion.div>

      {latestResult && (
        <motion.div 
          variants={item}
          className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Your Skill Profile</h3>
          <StrengthRadarChart strengthData={strengthData} variants={item} />
        </motion.div>
      )}

      {latestResult && latestResult.growthAreas.length > 0 && (
        <motion.div 
          variants={item}
          className="p-6 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-orange-800 mb-4">Development Opportunities</h3>
          <GrowthOpportunities growthAreas={latestResult.growthAreas} variants={item} />
        </motion.div>
      )}

      <motion.div 
        variants={item}
        className="p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-emerald-800 mb-4">Career Field Distribution</h3>
        <CareerDistributionChart careerCategories={careerCategories} variants={item} />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
