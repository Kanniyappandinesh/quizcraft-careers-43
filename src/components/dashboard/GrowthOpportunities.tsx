
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface GrowthOpportunitiesProps {
  growthAreas: string[];
  variants: any;
}

const GrowthOpportunities = ({ growthAreas, variants }: GrowthOpportunitiesProps) => {
  if (!growthAreas || growthAreas.length === 0) return null;
  
  return (
    <motion.div variants={variants}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Growth Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {growthAreas.map((area: string, index: number) => (
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
  );
};

export default GrowthOpportunities;
