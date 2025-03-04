
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, GraduationCap, DollarSign, Clock, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { careerDetails } from "@/utils/careerData";
import { CareerDetail } from "@/components/dashboard/types";
import { useEffect, useState } from "react";
import ExpertAdviceForm from "@/components/ExpertAdviceForm";

const CareerPage = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const [career, setCareer] = useState<CareerDetail | null>(null);
  
  useEffect(() => {
    if (careerId) {
      const foundCareer = careerDetails.find(
        (c) => c.title.toLowerCase().replace(/\s+/g, "-") === careerId
      );
      if (foundCareer) {
        setCareer(foundCareer);
      }
    }
  }, [careerId]);

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Career not found</h2>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb]">
      <div className="container mx-auto py-12 px-4">
        <Link to="/" className="inline-flex items-center text-quiz-primary hover:text-quiz-accent mb-8">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-12">
              <h1 className="text-4xl font-bold mb-4">{career.title}</h1>
              <p className="text-xl opacity-90">{career.description}</p>
            </div>
            
            <Tabs defaultValue="overview" className="px-8 py-8">
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="overview">Career Overview</TabsTrigger>
                <TabsTrigger value="advice">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Expert Advice
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <InfoCard 
                    icon={<TrendingUp className="h-5 w-5 text-indigo-500" />} 
                    title="Job Outlook" 
                    value={career.outlook} 
                  />
                  <InfoCard 
                    icon={<GraduationCap className="h-5 w-5 text-indigo-500" />} 
                    title="Education" 
                    value={career.education} 
                  />
                  <InfoCard 
                    icon={<DollarSign className="h-5 w-5 text-indigo-500" />} 
                    title="Avg. Salary" 
                    value={career.salary} 
                  />
                  <InfoCard 
                    icon={<Users className="h-5 w-5 text-indigo-500" />} 
                    title="Related Careers" 
                    value={`${career.relatedCareers.length} options`} 
                  />
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">About This Career</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{career.longDescription}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">Key Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {career.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">A Day in the Life</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{career.dayInLife}</p>
                </div>

                {career.videoEmbeds.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Watch & Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {career.videoEmbeds.map((videoId, index) => (
                        <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`Career video ${index + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {career.successStories.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {career.successStories.map((story, index) => (
                        <SuccessStoryCard key={index} story={story} />
                      ))}
                    </div>
                  </div>
                )}

                {career.relatedCareers.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Related Careers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {career.relatedCareers.map((relatedCareer, index) => {
                        const relatedCareerDetails = careerDetails.find(c => c.title === relatedCareer);
                        if (!relatedCareerDetails) return null;
                        
                        return (
                          <Link 
                            key={index}
                            to={`/career/${relatedCareerDetails.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block"
                          >
                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <h3 className="font-semibold text-indigo-600">{relatedCareer}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {relatedCareerDetails.description.substring(0, 60)}...
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="advice">
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Ask an Expert in {career.title}</CardTitle>
                      <p className="text-gray-600 mt-2">
                        Get personalized advice from professionals currently working in this field.
                        Our network of experts can answer your specific questions about career paths,
                        day-to-day responsibilities, or how to break into the industry.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ExpertAdviceForm careerField={career.title} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const InfoCard = ({ icon, title, value }: InfoCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-medium text-gray-700 ml-2">{title}</h3>
      </div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
};

interface SuccessStoryCardProps {
  story: {
    name: string;
    role: string;
    company: string;
    imageUrl: string;
    quote: string;
    story: string;
  };
}

const SuccessStoryCard = ({ story }: SuccessStoryCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-gray-200">
          <img 
            src={story.imageUrl} 
            alt={story.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6">
          <h3 className="font-bold text-xl mb-1">{story.name}</h3>
          <p className="text-indigo-600 mb-3">
            {story.role} at {story.company}
          </p>
          <p className="italic text-gray-700 mb-4">"{story.quote}"</p>
          <Separator className="my-4" />
          <p className="text-gray-600 text-sm">{story.story}</p>
        </div>
      </div>
    </Card>
  );
};

export default CareerPage;
