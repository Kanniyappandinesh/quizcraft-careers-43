import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "@/utils/quizData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

const Dashboard = () => {
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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{questions.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Average Completion Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8 min</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Career Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={careerCategories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4FD1C5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Popular Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Software Developer</span>
                  <span className="text-quiz-accent">36% growth</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Data Analyst</span>
                  <span className="text-quiz-accent">23% growth</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Project Manager</span>
                  <span className="text-quiz-accent">25% growth</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside text-gray-600">
                <li>Answer questions based on your genuine preferences</li>
                <li>Consider both your skills and interests</li>
                <li>Take your time to think through each answer</li>
                <li>Review your results carefully</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;