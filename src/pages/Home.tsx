import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ArrowRight, Bed, MapPin, Calendar, Scissors } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Animation variants for scroll-triggered animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardHover = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  useEffect(() => {
    // Simulate loading time and then trigger animations
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    }, 600); // Reduced to 600ms for faster loading

    return () => clearTimeout(timer);
  }, []);

  // Simple, clean loading component
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/lovable-uploads/2c956147-e853-4ca6-930e-cea856187266.png"
            alt="SmartPaw Logo"
            className="h-24 w-auto mx-auto"
          />
        </div>
        
        {/* Simple spinner */}
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-smartpaw-purple rounded-full animate-spin mx-auto"></div>
        </div>
        
        {/* Loading text */}
        <div>
          <h3 className="text-2xl font-bold text-smartpaw-purple mb-2">
            SmartPaw
          </h3>
          <p className="text-gray-600">
            Loading your pet care experience...
          </p>
        </div>
        
        {/* Simple dots animation */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-smartpaw-purple rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-smartpaw-purple rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-smartpaw-purple rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Layout>
      <SEO 
        title="Professional Pet Care Services"
        description="Trust your furry friend with SmartPaw's verified pet care professionals. From boarding to grooming, we provide comprehensive care with daily updates and peace of mind."
        keywords="pet boarding, pet grooming, pet monitoring, professional pet care, pet services near me"
      />
      {/* Hero Section */}
      <motion.section 
        className="py-16 md:py-24 bg-gradient-to-b from-white to-smartpaw-gray"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Logo integrated into the top centered area */}
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
              variants={fadeInLeft}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-center md:justify-start pt-4 pl-8">
                <motion.img
                  src="/lovable-uploads/2c956147-e853-4ca6-930e-cea856187266.png"
                  alt="SmartPaw Logo - Your trusted pet care companion"
                  className="h-24 md:h-28 lg:h-32 w-auto"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Professional <span className="text-smartpaw-purple bg-gradient-to-r from-smartpaw-purple to-smartpaw-pink bg-clip-text text-transparent">Pet Care Services</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-700 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Trust your furry friend with our verified pet care professionals. From boarding to grooming, we provide comprehensive care with daily updates and peace of mind.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link to="/services">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl">
                      Find Pet Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                <motion.div 
                  className="rounded-lg overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/lovable-uploads/f4d6fa06-b043-4d32-ba66-b1e5111cc9b4.png"
                    alt="Happy pets - dog and cat together"
                    className="w-full h-auto rounded-lg max-w-sm mx-auto md:max-w-full"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-smartpaw-yellow p-4 rounded-lg shadow-lg hidden md:block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 100 }}
                >
                  <p className="font-semibold text-gray-800">Trusted Pet Care</p>
                </motion.div>
                <motion.div 
                  className="absolute -top-6 -right-6 bg-smartpaw-pink p-4 rounded-lg shadow-lg hidden md:block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                >
                  <p className="font-semibold text-gray-800">24/7 Support</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Professional Pet Care Services
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We ensure your pets receive the best care with our comprehensive services
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Service Cards with staggered animations */}
            <Link to="/services?tab=boarding" className="group">
              <motion.div 
                className="bg-smartpaw-yellow bg-opacity-30 p-8 rounded-xl cursor-pointer hover:shadow-xl transform"
                variants={cardHover}
                whileHover="hover"
                whileTap="tap"
                role="article" 
                aria-labelledby="boarding-title"
              >
                <motion.div 
                  className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                >
                  <span className="text-3xl">🏨</span>
                </motion.div>
                <h3 id="boarding-title" className="text-xl font-bold mb-4 text-gray-900">Pet Boarding</h3>
                <p className="text-gray-700 mb-3">Safe and comfortable boarding for your pets</p>
                <div className="text-sm text-gray-600 bg-white bg-opacity-50 p-2 rounded-md">
                  <p className="font-medium">✓ Pet Monitoring Available</p>
                  <p className="text-xs">24/7 health and activity tracking during boarding</p>
                  <p className="text-xs text-yellow-700">• Live video feed from shop (Coming Soon)</p>
                </div>
              </motion.div>
            </Link>
            
            <motion.div 
              className="group relative"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="bg-smartpaw-peach bg-opacity-30 p-8 rounded-xl cursor-not-allowed opacity-60">
                <motion.div 
                  className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
                  whileHover={{ rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-3xl">✂️</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Grooming</h3>
                <p className="text-gray-700 mb-3">Professional grooming for all breeds</p>
                <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                  <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-smartpaw-green bg-opacity-30 p-8 rounded-xl opacity-60 cursor-not-allowed"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl">🐕</span>
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Dog Walking</h3>
              <p className="text-gray-700 mb-3">Daily walks for your dog (up to 5 km)</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-smartpaw-blue bg-opacity-30 p-8 rounded-xl opacity-60 cursor-not-allowed"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
                whileHover={{ rotate: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl">🏥</span>
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Vet Visits</h3>
              <p className="text-gray-700 mb-3">On-call veterinary care at your doorstep</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-smartpaw-pink bg-opacity-30 p-8 rounded-xl opacity-60 cursor-not-allowed"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl">🚕</span>
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Taxi</h3>
              <p className="text-gray-700 mb-3">Transport for your pet (within 20 km)</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-smartpaw-purple bg-opacity-30 p-8 rounded-xl opacity-60 cursor-not-allowed"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
                whileHover={{ rotate: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl">🎓</span>
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Training</h3>
              <p className="text-gray-700 mb-3">Obedience and behavior training for all pets</p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2">
                <p className="text-sm font-medium text-yellow-800">Coming Soon</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Coming Soon Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              More exciting features are on the way to make pet care even easier
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="text-4xl mb-4"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                🛍️
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Pet Shop</h3>
              <p className="text-gray-600">One-stop shop for all pet supplies and accessories</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="text-4xl mb-4"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 0.5
                }}
              >
                👩‍⚕️
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Vet Services</h3>
              <p className="text-gray-600">Connect with verified veterinarians</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg"
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="text-4xl mb-4"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 1
                }}
              >
                📱
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Pet Monitoring</h3>
              <p className="text-gray-600 mb-2">Keep track of your pet's health and activities</p>
              <p className="text-sm text-gray-500">Includes live video feed from boarding facilities</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-smartpaw-purple"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            variants={fadeInUp}
          >
            Ready to Find Pet Boarding Services?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover trusted boarding services for your furry friend today.
          </motion.p>
          <motion.div
            variants={fadeInUp}
          >
            <Link to="/services">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="bg-white text-smartpaw-purple hover:bg-gray-100 px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl">
                  Browse Services
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Home;
