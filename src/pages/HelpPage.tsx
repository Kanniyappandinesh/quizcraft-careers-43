
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Map, Home, HelpCircle, Award, FileDigit, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HelpPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("map");

  const pageLinks = [
    { name: "Home", path: "/", icon: Home, description: "Landing page with quiz, dashboard, and DFD diagram" },
    { name: "Authentication", path: "/auth", icon: User, description: "Sign in or create an account" },
    { name: "Career Details", path: "/career/:careerId", icon: Award, description: "View detailed career information (requires sign in)" },
    { name: "Help", path: "/help", icon: HelpCircle, description: "Project map and navigation help" },
  ];

  const features = [
    { name: "Career Quiz", description: "Answer questions to find careers that match your interests and skills" },
    { name: "Dashboard", description: "View your quiz results and career recommendations" },
    { name: "Data Flow Diagram", description: "See how information moves through the CareerQuest system" },
    { name: "Career Details", description: "Explore specific careers with in-depth information" },
    { name: "User Authentication", description: "Create an account to save your results" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb]">
      <nav className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            CareerQuest
          </h1>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">
            Help & Navigation
          </h2>
          <Separator className="mt-2 mb-6 mx-auto w-24 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]" />
        </div>

        <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Project Map
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              How to Use
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-purple-600" />
                  CareerQuest Project Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  {pageLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                        <div className="p-2 rounded-full bg-purple-100">
                          <link.icon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{link.name}</h3>
                          <p className="text-gray-600">{link.description}</p>
                          {link.path !== "/career/:careerId" ? (
                            <Button
                              variant="link"
                              className="p-0 h-6 mt-1 text-purple-600"
                              onClick={() => navigate(link.path)}
                            >
                              Visit page →
                            </Button>
                          ) : (
                            <p className="text-xs text-gray-500 mt-1">
                              Note: Career details pages require authentication and selecting a career.
                            </p>
                          )}
                        </div>
                      </div>
                      {index < pageLinks.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileDigit className="h-5 w-5 text-purple-600" />
                  Application Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-slate-50 rounded-lg overflow-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
{`CareerQuest
├── Auth System
│   ├── Login
│   └── Registration
├── Quiz System
│   ├── Questions
│   └── Results
├── Dashboard
│   ├── Skill Strengths
│   ├── Growth Areas
│   └── Career Matches
├── Career Details
│   ├── Description
│   ├── Requirements
│   ├── Salary
│   └── Outlook
└── Help & Navigation
    ├── Project Map
    └── User Guide`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Use CareerQuest</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal pl-5">
                  <li>
                    <strong>Take the Career Quiz:</strong> Answer questions about your interests, skills, and preferences to receive career recommendations.
                  </li>
                  <li>
                    <strong>Create an Account (Optional):</strong> Sign up to save your quiz results and access them later.
                  </li>
                  <li>
                    <strong>View Your Dashboard:</strong> See your skills profile, growth areas, and career matches.
                  </li>
                  <li>
                    <strong>Explore Career Details:</strong> Click on any recommended career to learn more about it.
                  </li>
                  <li>
                    <strong>Review the Data Flow:</strong> Understand how information moves through the CareerQuest system.
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-purple-100 bg-purple-50"
                    >
                      <h3 className="font-medium mb-2 text-purple-800">{feature.name}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default HelpPage;
