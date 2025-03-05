
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import { Sparkles } from "lucide-react";

const CareerPage = () => {
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareer = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('career_details')
          .select('*')
          .eq('id', careerId)
          .single();

        if (error) {
          console.error("Error fetching career:", error);
        }

        if (data) {
          setCareer(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [careerId]);

  // Add navigation buttons near the title
  const addNavigationButtons = () => {
    const titleElement = document.querySelector('.career-title');
    if (titleElement && !document.querySelector('.navigation-buttons')) {
      const navButtonsContainer = document.createElement('div');
      navButtonsContainer.className = 'navigation-buttons absolute top-4 right-4';
      titleElement.appendChild(navButtonsContainer);
      
      // We'll render our NavigationButtons component here
      const root = document.createElement('div');
      root.id = 'navigation-buttons-root';
      navButtonsContainer.appendChild(root);
    }
  };

  useEffect(() => {
    // Call this after the component renders
    setTimeout(addNavigationButtons, 500);
  }, []);

  return (
    <div className="relative">
      {/* Add this at the top of the return statement */}
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-4 shadow-lg mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            <span>CareerQuest</span>
          </h1>
          <NavigationButtons currentPage="career" />
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : !career ? (
        <div className="container mx-auto p-8">
          <Card className="shadow-lg border-0">
            <CardContent className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Career Not Found</h2>
              <p className="text-gray-600">
                Sorry, we couldn't find the career you were looking for.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="container mx-auto p-8">
          <div className="career-title relative">
            <h1 className="text-3xl font-bold mb-4">{career.title}</h1>
          </div>
          <Separator className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <Card className="shadow-lg border-0">
                <CardContent>
                  <p>{career.description}</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <Card className="shadow-lg border-0">
                <CardContent>
                  <ul className="list-disc pl-5">
                    {Array.isArray(career.skills) && career.skills.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Salary</h2>
              <Card className="shadow-lg border-0">
                <CardContent>
                  <p>
                    {career.salary}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Career Outlook</h2>
              <Card className="shadow-lg border-0">
                <CardContent>
                  <p>{career.outlook}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default CareerPage;
