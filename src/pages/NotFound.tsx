
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, HelpCircle } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb] p-4">
      <div className="text-center max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        
        <div className="flex flex-col gap-4">
          <Button 
            className="w-full" 
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/help')}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            View Help
          </Button>
        </div>
        
        <div className="mt-8">
          <NavigationButtons currentPage="notFound" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
