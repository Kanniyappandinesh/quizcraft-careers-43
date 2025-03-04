
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, ChevronDown, ChevronUp, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CareerMatch } from '@/utils/quizData';
import { Separator } from '@/components/ui/separator';
import { SkillComparison } from '@/components/dashboard/types';

interface SkillComparisonProps {
  matches: CareerMatch[];
  strengths: Record<string, number>;
}

const SkillComparisonComponent = ({ matches, strengths }: SkillComparisonProps) => {
  const [selectedCareer, setSelectedCareer] = useState<string>(matches[0]?.title || '');
  const [showAll, setShowAll] = useState(false);

  // Map user strength categories to career skills
  const skillMappings: Record<string, string[]> = {
    technical: ['Programming', 'Algorithm Design', 'Version Control', 'Testing', 'Statistical Analysis', 'SQL', 'Mathematics'],
    creative: ['Design', 'Content Creation', 'Creativity', 'Problem Solving'],
    analytical: ['Analytical Thinking', 'Critical Thinking', 'Data Visualization', 'Problem-Solving', 'Research'],
    interpersonal: ['Communication', 'Team Work', 'Negotiation', 'Patient Care', 'Customer Service'],
    leadership: ['Leadership', 'Project Management', 'Decision Making', 'Team Building', 'Mentoring']
  };

  // Generate skill comparisons for the selected career
  const generateSkillComparisons = (career: CareerMatch): SkillComparison[] => {
    const comparisons: SkillComparison[] = [];
    const careerSkills = career.skills || [];

    // Generate comparison for each career skill
    careerSkills.forEach(skill => {
      // Determine which user strength category this skill belongs to
      let matchingCategory = '';
      for (const [category, skills] of Object.entries(skillMappings)) {
        if (skills.some(s => skill.toLowerCase().includes(s.toLowerCase()))) {
          matchingCategory = category;
          break;
        }
      }

      // If we found a matching category, create a comparison
      if (matchingCategory) {
        const userLevel = strengths[matchingCategory] || 0;
        const requiredLevel = 4; // Assuming a baseline required level
        
        let match: 'perfect' | 'good' | 'gap' = 'gap';
        if (userLevel >= requiredLevel) {
          match = 'perfect';
        } else if (userLevel >= requiredLevel - 1) {
          match = 'good';
        }

        comparisons.push({
          userSkill: matchingCategory,
          skillLevel: userLevel,
          requiredLevel,
          importance: careerSkills.indexOf(skill) < 3 ? 'high' : 'medium',
          match
        });
      }
    });

    return comparisons;
  };

  const selectedCareerData = matches.find(m => m.title === selectedCareer);
  const skillComparisons = selectedCareerData ? generateSkillComparisons(selectedCareerData) : [];
  
  // Filter comparisons to show only gaps if showAll is false
  const displayedComparisons = showAll 
    ? skillComparisons 
    : skillComparisons.filter(comp => comp.match !== 'perfect').slice(0, 3);

  // Calculate overall match percentage
  const matchPercentage = skillComparisons.length 
    ? Math.round((skillComparisons.filter(c => c.match !== 'gap').length / skillComparisons.length) * 100)
    : 0;

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-purple-50 border-b border-purple-100">
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <ArrowRightLeft className="h-5 w-5 text-purple-600" />
          Skill Comparison
        </CardTitle>
        <CardDescription>
          Compare your skills with career requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6">
          <label htmlFor="career-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Career to Compare
          </label>
          <select
            id="career-select"
            value={selectedCareer}
            onChange={(e) => setSelectedCareer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            {matches.map((match, idx) => (
              <option key={idx} value={match.title}>{match.title}</option>
            ))}
          </select>
        </div>

        {selectedCareerData && (
          <>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Overall Skill Match</h3>
                <span className="font-bold text-lg text-purple-700">{matchPercentage}%</span>
              </div>
              <Progress value={matchPercentage} className="h-2 bg-gray-200" />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">
                {showAll ? "All Skills" : "Top Skill Gaps"}
              </h3>
              
              {displayedComparisons.length === 0 ? (
                <div className="py-3 text-center text-gray-500">
                  <p>No significant skill gaps found!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayedComparisons.map((comparison, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3 bg-white border rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          {comparison.match === 'perfect' ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : comparison.match === 'good' ? (
                            <Check className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="font-medium capitalize">
                            {comparison.userSkill}
                          </span>
                          {comparison.importance === 'high' && (
                            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                              Critical
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {comparison.skillLevel.toFixed(1)} / {comparison.requiredLevel.toFixed(1)}
                        </div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${comparison.match === 'perfect' 
                            ? 'bg-green-500' 
                            : comparison.match === 'good' 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'}`}
                          style={{ width: `${(comparison.skillLevel / comparison.requiredLevel) * 100}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <span className="flex items-center">
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Show Gaps Only
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show All Skills
                  </span>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillComparisonComponent;
