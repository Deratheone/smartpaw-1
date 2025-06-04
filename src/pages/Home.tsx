import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Bed, MapPin, Calendar, Scissors } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-smartpaw-gray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              {/* Logo integrated into the left side */}
              <div className="flex items-center justify-center md:justify-start mb-8">
                <img
                  src="/lovable-uploads/2c956147-e853-4ca6-930e-cea856187266.png"
                  alt="SmartPaw Logo"
                  className="h-24 md:h-28 lg:h-32 w-auto"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Professional <span className="text-smartpaw-purple">Pet Care Services</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Trust your furry friend with our verified pet care professionals. From boarding to grooming, we provide comprehensive care with daily updates and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services">
                  <Button className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white px-8 py-6 h-auto text-lg">
                    Find Pet Services <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/lovable-uploads/f4d6fa06-b043-4d32-ba66-b1e5111cc9b4.png"
                    alt="Happy pets - dog and cat together"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-smartpaw-yellow p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-semibold text-gray-800">Trusted Pet Care</p>
                </div>
                <div className="absolute -top-6 -right-6 bg-smartpaw-pink p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-semibold text-gray-800">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Professional Pet Care Services
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We ensure your pets receive the best care with our comprehensive services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Link to="/services?tab=boarding" className="group">
              <div className="bg-smartpaw-yellow bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                  <span className="text-3xl">🏨</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Boarding</h3>
                <p className="text-gray-700 mb-3">Safe and comfortable boarding for your pets</p>
                <div className="text-sm text-gray-600 bg-white bg-opacity-50 p-2 rounded-md">
                  <p className="font-medium">✓ Pet Monitoring Available</p>
                  <p className="text-xs">24/7 health and activity tracking during boarding</p>
                  <p className="text-xs text-yellow-700">• Live video feed from shop (Coming Soon)</p>
                </div>
              </div>
            </Link>
            
            <div className="group relative">
              <div className="bg-smartpaw-peach bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105 cursor-not-allowed opacity-60">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                  <span className="text-3xl">✂️</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Grooming</h3>
                <p className="text-gray-700 mb-3">Professional grooming for all breeds</p>
                <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                  <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
                </div>
              </div>
            </div>
            
            <div className="bg-smartpaw-green bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105 opacity-60 cursor-not-allowed">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-3xl">🐕</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Dog Walking</h3>
              <p className="text-gray-700 mb-3">Daily walks for your dog (up to 5 km)</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </div>
            
            <div className="bg-smartpaw-blue bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105 opacity-60 cursor-not-allowed">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Vet Visits</h3>
              <p className="text-gray-700 mb-3">On-call veterinary care at your doorstep</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </div>
            
            <div className="bg-smartpaw-pink bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105 opacity-60 cursor-not-allowed">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-3xl">🚕</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Taxi</h3>
              <p className="text-gray-700 mb-3">Transport for your pet (within 20 km)</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </div>
            
            <div className="bg-smartpaw-purple bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105 opacity-60 cursor-not-allowed">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Training</h3>
              <p className="text-gray-700 mb-3">Obedience and behavior training for all pets</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              More exciting features are on the way to make pet care even easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Pet Shop</h3>
              <p className="text-gray-600">One-stop shop for all pet supplies and accessories</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Vet Services</h3>
              <p className="text-gray-600">Connect with verified veterinarians</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Pet Monitoring</h3>
              <p className="text-gray-600 mb-2">Keep track of your pet's health and activities</p>
              <p className="text-sm text-gray-500">Includes live video feed from boarding facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-smartpaw-purple">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Find Pet Boarding Services?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover trusted boarding services for your furry friend today.
          </p>
          <Link to="/services">
            <Button className="bg-white text-smartpaw-purple hover:bg-gray-100 px-8 py-6 h-auto text-lg">
              Browse Services
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
