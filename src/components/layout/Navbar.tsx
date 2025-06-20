
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  // Check if user is a service provider
  const isServiceProvider = user?.user_metadata?.user_type === 'service-provider';

  // Debug user info
  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
      console.log("User metadata:", user.user_metadata);
      console.log("Is service provider:", isServiceProvider);
    }
  }, [user, isServiceProvider]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const ComingSoonLink = ({ children }: { children: React.ReactNode }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-gray-400 cursor-not-allowed">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Coming Soon</p>
      </TooltipContent>
    </Tooltip>
  );
  return (
    <nav className="bg-background border-b shadow-sm py-4 sticky top-0 z-50 backdrop-blur-md bg-white/95" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3e227a9f-4cb9-4f0d-abac-700e7fa34a0b.png" 
              alt="SmartPaw Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-smartpaw-purple">SmartPaw</span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-foreground hover:text-smartpaw-purple transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-foreground hover:text-smartpaw-purple transition-colors">
              Services
            </Link>
            <ComingSoonLink>Shop</ComingSoonLink>
            <ComingSoonLink>Pet Monitoring</ComingSoonLink>
            <Link to="/about" className="text-foreground hover:text-smartpaw-purple transition-colors">
              About Us
            </Link>
            {user ? (
              <>
                {isServiceProvider && (
                  <Link 
                    to="/seller-dashboard" 
                    className={`${
                      location.pathname === "/seller-dashboard" 
                        ? "text-smartpaw-purple font-medium" 
                        : "text-foreground hover:text-smartpaw-purple"
                    } transition-colors`}
                  >
                    Seller Dashboard
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className={`${
                    location.pathname === "/profile" 
                      ? "text-smartpaw-purple font-medium" 
                      : "text-foreground hover:text-smartpaw-purple"
                  } transition-colors flex items-center`}
                >
                  <User size={18} className="mr-1" />
                  My Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-foreground hover:text-smartpaw-purple transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-smartpaw-purple text-smartpaw-purple hover:bg-smartpaw-purple hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-smartpaw-purple text-white hover:bg-smartpaw-dark-purple">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4 bg-white border-t border-gray-200 px-4 py-4 rounded-b-lg shadow-lg">
            <Link 
              to="/" 
              className="text-foreground hover:text-smartpaw-purple transition-colors py-2 px-3 rounded-md hover:bg-gray-50 block"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-foreground hover:text-smartpaw-purple transition-colors py-2 px-3 rounded-md hover:bg-gray-50 block"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <span className="text-muted-foreground py-2 px-3 text-sm">Shop (Coming Soon)</span>
            <span className="text-muted-foreground py-2 px-3 text-sm">Pet Monitoring (Coming Soon)</span>
            <Link 
              to="/about" 
              className="text-foreground hover:text-smartpaw-purple transition-colors py-2 px-3 rounded-md hover:bg-gray-50 block"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            {user ? (
              <>
                {isServiceProvider && (
                  <Link 
                    to="/seller-dashboard" 
                    className={`${
                      location.pathname === "/seller-dashboard" 
                        ? "text-smartpaw-purple font-medium" 
                        : "text-foreground hover:text-smartpaw-purple"
                    } transition-colors`}
                  >
                    Seller Dashboard
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className={`${
                    location.pathname === "/profile" 
                      ? "text-smartpaw-purple font-medium" 
                      : "text-foreground hover:text-smartpaw-purple"
                  } transition-colors flex items-center`}
                >
                  <User size={18} className="mr-1" />
                  My Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-foreground hover:text-smartpaw-purple transition-colors text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex space-x-4 pt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-smartpaw-purple text-smartpaw-purple hover:bg-smartpaw-purple hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="w-full bg-smartpaw-purple text-white hover:bg-smartpaw-dark-purple">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
