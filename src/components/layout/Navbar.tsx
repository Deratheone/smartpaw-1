
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-smartpaw-purple">SmartPaw</span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Pet Boarding
            </Link>
            <ComingSoonLink>Shop</ComingSoonLink>
            <ComingSoonLink>Pet Monitoring</ComingSoonLink>
            <Link to="/about" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
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
                        : "text-gray-700 hover:text-smartpaw-purple"
                    } transition-colors`}
                  >
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-smartpaw-purple transition-colors"
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

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Pet Boarding
            </Link>
            <span className="text-gray-400">Shop (Coming Soon)</span>
            <span className="text-gray-400">Pet Monitoring (Coming Soon)</span>
            <Link to="/about" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
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
                        : "text-gray-700 hover:text-smartpaw-purple"
                    } transition-colors`}
                  >
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-smartpaw-purple transition-colors"
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
