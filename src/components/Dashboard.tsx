
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "@/utils/quizData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from "framer-motion";
import { Brain, Target, TrendingUp, Users, Lightbulb, Trophy } from "lucide-react";

interface StrengthValues {
  technical: number;
  creative: number;
  analytical: number;
  interpersonal: number;
  leadership: number;
  [key: string]: number;
}

interface SavedResult {
  date: string;
  matches: any[];
  answers: string[];
  strengths: StrengthValues;
  growthAreas: string[];
}

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Skill Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {getTotalStrengthScore()}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-pink-50 to-white">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-pink-600 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Growth Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-700">
                {latestResult ? latestResult.growthAreas.length : 0}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Career Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                {latestResult ? latestResult.matches.length : 0}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Strength Radar Chart */}
      {latestResult && (
        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                Your Skill Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={strengthData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Growth Areas */}
      {latestResult && latestResult.growthAreas.length > 0 && (
        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {latestResult.growthAreas.map((area: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-white border border-yellow-100">
                    <h3 className="font-semibold text-yellow-700">{area}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Focus on developing skills in this area to expand your career opportunities.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Career Distribution */}
      <motion.div variants={item}>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Career Categories Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={careerCategories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
