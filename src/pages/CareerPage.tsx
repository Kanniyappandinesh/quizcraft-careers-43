
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Star, Book, BriefcaseBusiness, GraduationCap, Users } from "lucide-react";
import ExpertAdviceForm from "@/components/ExpertAdviceForm";
import { supabase } from "@/integrations/supabase/client";
import { importCareerDataToSupabase } from "@/utils/importCareerData";
import { CareerDetail } from "@/components/dashboard/types";

const CareerPage = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const [career, setCareer] = useState<CareerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const normalizedCareerId = careerId?.replace(/-/g, " ");

  useEffect(() => {
    const fetchCareerData = async () => {
      setLoading(true);
      
      try {
        // First check if we have any career data
        const { data, error } = await supabase
          .from('career_details')
          .select('*')
          .ilike('title', normalizedCareerId || '')
          .maybeSingle();
          
        if (error) throw error;
        
        // If no data, try to import from local data
        if (!data) {
          await importCareerDataToSupabase();
          
          // Try again
          const { data: newData, error: newError } = await supabase
            .from('career_details')
            .select('*')
            .ilike('title', normalizedCareerId || '')
            .maybeSingle();
            
          if (newError) throw newError;
          
          if (newData) {
            setCareer(formatCareerData(newData));
          }
        } else {
          setCareer(formatCareerData(data));
        }
      } catch (error) {
        console.error("Error fetching career details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (normalizedCareerId) {
      fetchCareerData();
    }
  }, [normalizedCareerId]);
  
  const formatCareerData = (data: any): CareerDetail => {
    return {
      title: data.title,
      description: data.description,
      longDescription: data.long_description,
      skills: data.skills,
      outlook: data.outlook,
      education: data.education,
      salary: data.salary,
      dayInLife: data.day_in_life,
      successStories: data.success_stories,
      videoEmbeds: data.video_embeds,
      relatedCareers: data.related_careers
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb] p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb] p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Career Not Found</h1>
          <p className="mb-6">We couldn't find details for this career path.</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 md:p-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{career.title}</h1>
            <p className="text-lg md:text-xl opacity-90">{career.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {career.skills.slice(0, 4).map((skill, index) => (
                <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {skill}
                </span>
              ))}
              {career.skills.length > 4 && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  +{career.skills.length - 4} more
                </span>
              )}
            </div>
          </div>

          <Tabs defaultValue="overview" className="p-6">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-1">
                <Book className="h-4 w-4" />
                <span className="hidden sm:inline">Details</span>
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Success Stories</span>
              </TabsTrigger>
              <TabsTrigger value="advice" className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Expert Advice</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Career Overview</h2>
                <p className="text-gray-700">{career.longDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-purple-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Average Salary</h3>
                  <p className="text-xl font-bold">{career.salary}</p>
                </div>
                <div className="bg-purple-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Job Outlook</h3>
                  <p className="text-xl font-bold">{career.outlook}</p>
                </div>
                <div className="bg-purple-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Education Required</h3>
                  <p className="text-xl font-bold">{career.education}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-2 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Related Careers</h3>
                <div className="flex flex-wrap gap-2">
                  {career.relatedCareers.map((related, index) => (
                    <Link
                      key={index}
                      to={`/career/${related.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-md text-sm"
                    >
                      {related}
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">A Day in the Life</h2>
                  <p className="text-gray-700">{career.dayInLife}</p>
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Educational Path</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Recommended Education</h3>
                    <p className="mb-4">{career.education}</p>
                    
                    <h3 className="font-semibold mb-2">Continuing Education</h3>
                    <p>
                      Professional certifications and continuing education are important for
                      staying current in this field. Many {career.title.toLowerCase()}s pursue
                      specialized training throughout their careers.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {career.videoEmbeds.map((videoId, index) => (
                      <div key={index} className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`${career.title} video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stories">
              <h2 className="text-2xl font-semibold mb-6">Success Stories</h2>
              <div className="space-y-8">
                {career.successStories.map((story, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <img
                          src={story.imageUrl}
                          alt={story.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold">{story.name}</h3>
                          <p className="text-purple-600">
                            {story.role} at {story.company}
                          </p>
                        </div>
                        <blockquote className="italic text-gray-700 border-l-4 border-purple-300 pl-4 mb-4">
                          "{story.quote}"
                        </blockquote>
                        <p className="text-gray-700">{story.story}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advice">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Get Expert Advice</h2>
                  <p className="text-gray-600 mb-6">
                    Have questions about becoming a {career.title}? Submit your question below and
                    an industry expert will provide personalized advice.
                  </p>

                  <ExpertAdviceForm careerField={career.title} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerPage;
