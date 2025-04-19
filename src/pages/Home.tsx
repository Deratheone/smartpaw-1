
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-smartpaw-gray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                One Platform for All <span className="text-smartpaw-purple">Pet Needs</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                SmartPaw connects you with pet services, products, and monitoring tools all in one place, making pet care simpler and more enjoyable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services">
                  <Button className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white px-8 py-6 h-auto text-lg">
                    Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" className="border-smartpaw-purple text-smartpaw-purple hover:bg-smartpaw-purple hover:text-white px-8 py-6 h-auto text-lg">
                    Visit Shop
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Happy pets"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-smartpaw-yellow p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-semibold text-gray-800">Over 500+ Pet Services</p>
                </div>
                <div className="absolute -top-6 -right-6 bg-smartpaw-pink p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-semibold text-gray-800">1000+ Happy Pets</p>
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
              Everything Your Pet Needs
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              SmartPaw brings together all essential pet services and products to make pet ownership easier and more enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-smartpaw-green bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-smartpaw-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Find Pet Services</h3>
              <p className="text-gray-700 mb-4">
                Discover groomers, vets, caretakers, and more in your area. Book appointments and read reviews.
              </p>
              <Link to="/services" className="text-smartpaw-purple font-semibold hover:underline inline-flex items-center">
                Browse Services <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-smartpaw-peach bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-smartpaw-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Shop Pet Products</h3>
              <p className="text-gray-700 mb-4">
                Browse a wide selection of food, toys, grooming tools, and accessories for all types of pets.
              </p>
              <Link to="/shop" className="text-smartpaw-purple font-semibold hover:underline inline-flex items-center">
                Shop Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-smartpaw-blue bg-opacity-30 p-8 rounded-xl transition-transform duration-300 hover:scale-105">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-smartpaw-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Monitor Pet Care</h3>
              <p className="text-gray-700 mb-4">
                Track feeding, medication, grooming, and activities when your pet is with a caretaker or at daycare.
              </p>
              <Link to="/monitoring" className="text-smartpaw-purple font-semibold hover:underline inline-flex items-center">
                Try Monitoring <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              How SmartPaw Works
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A simple process to connect you with everything your pet needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-smartpaw-purple text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Create an Account</h3>
              <p className="text-gray-700">
                Sign up for free and create profiles for all your pets.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-smartpaw-purple text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Browse Services</h3>
              <p className="text-gray-700">
                Find trusted service providers in your area and read reviews.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-smartpaw-purple text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Book & Shop</h3>
              <p className="text-gray-700">
                Schedule appointments and order products all in one place.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-smartpaw-purple text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">4</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Track Pet Care</h3>
              <p className="text-gray-700">
                Monitor your pet's care activities and health in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-smartpaw-purple">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Make Pet Care Easier?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of pet owners who have simplified pet care with SmartPaw.
          </p>
          <Link to="/register">
            <Button className="bg-white text-smartpaw-purple hover:bg-gray-100 px-8 py-6 h-auto text-lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
