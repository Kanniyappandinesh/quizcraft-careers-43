
import { useNavigate } from "react-router-dom";
import { HelpCircle, Home, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

interface NavigationButtonsProps {
  currentPage: 'home' | 'auth' | 'career' | 'help' | 'notFound';
}

const NavigationButtons = ({ currentPage }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {currentPage !== 'home' && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate('/')}
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      )}
      
      {currentPage !== 'help' && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate('/help')}
        >
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Help</span>
        </Button>
      )}
      
      {user ? (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      ) : currentPage !== 'auth' && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate('/auth')}
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
