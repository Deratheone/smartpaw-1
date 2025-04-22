
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Bed, MapPin, Calendar } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-smartpaw-gray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Safe and Caring <span className="text-smartpaw-purple">Pet Boarding</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Trust your furry friend with our verified pet boarding services while you're away. Professional care, daily updates, and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services">
                  <Button className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white px-8 py-6 h-auto text-lg">
                    Find Pet Boarding <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1593871075120-982e042088d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Pet Boarding"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-smartpaw-yellow p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-semibold text-gray-800">Trusted Pet Boarding</p>
                </div>
                <div className="absolute -top-6 -right-6 bg-smartpaw-pink p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-semibold text-gray-800">24/7 Pet Care</p>
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
              Professional Pet Boarding Services
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We ensure your pets receive the best care with our comprehensive boarding services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-smartpaw-green bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <Bed className="w-8 h-8 text-smartpaw-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Comfortable Stay</h3>
              <p className="text-gray-700 mb-4">
                Spacious, clean, and cozy boarding facilities for your pet's comfort
              </p>
            </div>

            <div className="bg-smartpaw-peach bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <Calendar className="w-8 h-8 text-smartpaw-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Daily Activities</h3>
              <p className="text-gray-700 mb-4">
                Structured routines including walks, playtime, and rest periods
              </p>
            </div>

            <div className="bg-smartpaw-blue bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <MapPin className="w-8 h-8 text-smartpaw-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Nearby Locations</h3>
              <p className="text-gray-700 mb-4">
                Find trusted boarding facilities in your neighborhood
              </p>
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
              <h3 className="text-xl font-bold mb-2 text-gray-900">Pet Grooming</h3>
              <p className="text-gray-600">Professional grooming services at your doorstep</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Vet Services</h3>
              <p className="text-gray-600">Connect with verified veterinarians</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-smartpaw-purple">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Book Pet Boarding?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Find the perfect boarding facility for your furry friend today.
          </p>
          <Link to="/services">
            <Button className="bg-white text-smartpaw-purple hover:bg-gray-100 px-8 py-6 h-auto text-lg">
              Find Pet Boarding
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
