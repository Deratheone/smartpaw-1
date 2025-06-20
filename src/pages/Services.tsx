import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, X } from "lucide-react";
import BookingDialog from "@/components/booking/BookingDialog";
import { SEO } from "@/components/SEO";

interface ServiceProvider {
  id: string;
  business_name: string;
  description: string;
  city: string;
  state: string;
}

interface PetBoardingService {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  provider: ServiceProvider;
}

interface PetGroomingService {
  id: string;
  business_name: string;
  description: string;
  city: string;
  state: string;
  services_offered: string;
  price_range: string;
  image_url: string;
}

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    name: string;
    price: string;
    type: 'boarding' | 'grooming';
  } | null>(null);
  const [activeTab, setActiveTab] = useState("boarding");

  const location = useLocation();

  // Handle URL parameter for tab navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'boarding' || tab === 'grooming') {
      setActiveTab(tab);
    }
  }, [location]);

  const { data: boardingServices, isLoading: isBoardingLoading } = useQuery({
    queryKey: ['pet-boarding-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pet_boarding_services')
        .select(`
          *,
          provider:service_providers(
            id,
            business_name,
            description,
            city,
            state
          )
        `)
        .eq('available', true);

      if (error) throw error;
      return data as PetBoardingService[];
    }
  });

  const { data: groomingServices, isLoading: isGroomingLoading } = useQuery({
    queryKey: ['pet-grooming-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pet_grooming_services')
        .select('*')
        .eq('available', true);

      if (error) throw error;
      return data as PetGroomingService[];
    }
  });

  const filteredBoardingServices = boardingServices?.filter((service) => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.business_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const filteredGroomingServices = groomingServices?.filter((service) => {
    const matchesSearch = 
      service.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.services_offered.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const handleBookService = (serviceName: string, price: string, type: 'boarding' | 'grooming') => {
    setSelectedService({ name: serviceName, price, type });
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = () => {
    // In a real app, this would refresh bookings data
    console.log('Booking successful!');
  };

  const renderBoardingServices = () => {
    if (isBoardingLoading) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-700">Loading services...</p>
        </div>
      );
    }

    if (filteredBoardingServices.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-700">No boarding services found. Try adjusting your search.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBoardingServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image_url || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-white py-1 px-3 rounded-tr-lg">
                <span className="text-sm font-medium text-gray-900">{service.price} ₹</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {service.provider.city}, {service.provider.state}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="mb-4">
                <p className="font-medium text-gray-900">{service.provider.business_name}</p>
                <p className="text-sm text-gray-600">{service.provider.description}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/services/${service.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button 
                  className="flex-1 bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white"
                  onClick={() => handleBookService(service.title, `${service.price} ₹`, 'boarding')}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroomingServices = () => {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🚧</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
          <p className="text-lg text-gray-600 mb-6">
            Pet grooming services are currently under development. We're working hard to bring you the best grooming professionals in your area.
          </p>
          <p className="text-sm text-gray-500">
            Stay tuned for updates!
          </p>
        </div>
      </div>
    );
  };
  return (
    <Layout>
      <SEO 
        title="Pet Services - Boarding, Grooming & Care | SmartPaw"
        description="Browse and book professional pet services including boarding, grooming, and specialized care. Verified providers with excellent reviews and competitive prices."
        keywords="pet boarding services, dog grooming, pet daycare, pet sitting, veterinary care, pet services near me, dog boarding, cat grooming"
        url="https://smartpaw.vercel.app/services"
      />
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Pet Care Services</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover trusted pet care services in your area
            </p>
          </div>          {/* Search and Filter Bar */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search services, locations, or providers..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button
                  onClick={() => setSearchQuery('near me')}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  📍 Near Me
                </button>
                <button
                  onClick={() => setSearchQuery('available today')}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  ⚡ Available Today
                </button>
                <button
                  onClick={() => setSearchQuery('top rated')}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  ⭐ Top Rated
                </button>
              </div>
            </div>
          </div>{/* Service Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto min-h-[48px] p-1 bg-white border border-gray-200 rounded-lg">
              <TabsTrigger 
                value="boarding" 
                className="text-sm md:text-base font-medium py-2 px-2 md:px-4 rounded-md data-[state=active]:bg-smartpaw-purple data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 transition-all duration-200 flex items-center justify-center text-center whitespace-nowrap overflow-hidden"
              >
                <span className="truncate">Pet Boarding</span>
              </TabsTrigger>
              <TabsTrigger 
                value="grooming" 
                className="text-sm md:text-base font-medium py-2 px-2 md:px-4 rounded-md data-[state=active]:bg-smartpaw-purple data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 transition-all duration-200 flex items-center justify-center text-center"
              >
                <span className="truncate">
                  <span className="block md:hidden">Pet Grooming</span>
                  <span className="hidden md:block">Pet Grooming (Coming Soon)</span>
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="boarding">
              {renderBoardingServices()}
            </TabsContent>
            
            <TabsContent value="grooming">
              {renderGroomingServices()}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Booking Dialog */}
      {selectedService && (
        <BookingDialog
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          serviceName={selectedService.name}
          servicePrice={selectedService.price}
          serviceType={selectedService.type}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </Layout>
  );
};

export default Services;
