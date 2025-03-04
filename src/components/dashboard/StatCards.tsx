
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardsProps {
  totalStrengthScore: number;
  growthAreasCount: number;
  matchesCount: number;
  variants: any;
}

const StatCards = ({ totalStrengthScore, growthAreasCount, matchesCount, variants }: StatCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <motion.div variants={variants}>
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Skill Strength
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {totalStrengthScore}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={variants}>
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-pink-50 to-white">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-600 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Growth Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-700">
              {growthAreasCount}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={variants}>
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Career Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {matchesCount}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatCards;
