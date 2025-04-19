
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-smartpaw-purple">SmartPaw</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Services
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Shop
            </Link>
            <Link to="/monitoring" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Pet Monitoring
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              About Us
            </Link>
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
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Services
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Shop
            </Link>
            <Link to="/monitoring" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              Pet Monitoring
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-smartpaw-purple transition-colors">
              About Us
            </Link>
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
