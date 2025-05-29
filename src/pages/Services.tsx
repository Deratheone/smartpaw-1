
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Search } from "lucide-react";

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

  // Mock data for pet grooming services
  const groomingServices: PetGroomingService[] = [
    {
      id: "1",
      business_name: "Pawsome Grooming Studio",
      description: "Professional pet grooming with a gentle touch. We specialize in all breeds and offer nail trimming, ear cleaning, and styling.",
      city: "San Francisco",
      state: "CA",
      services_offered: "Full grooming, nail trimming, ear cleaning, teeth brushing",
      price_range: "$40 - $80",
      image_url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "2",
      business_name: "Happy Tails Spa",
      description: "Luxury grooming experience for your furry friends. We use only premium, natural products for sensitive skin.",
      city: "Los Angeles",
      state: "CA",
      services_offered: "Luxury spa treatments, aromatherapy, organic shampoos",
      price_range: "$60 - $120",
      image_url: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "3",
      business_name: "Clean Paws Mobile Grooming",
      description: "Convenient mobile grooming service that comes to your door. Stress-free grooming in a familiar environment.",
      city: "San Diego",
      state: "CA",
      services_offered: "Mobile grooming, basic cuts, flea treatments",
      price_range: "$50 - $90",
      image_url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredBoardingServices = boardingServices?.filter((service) => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.business_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const filteredGroomingServices = groomingServices.filter((service) => {
    const matchesSearch = 
      service.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.services_offered.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
                <span className="text-sm font-medium text-gray-900">${service.price}</span>
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
              <Link to={`/services/${service.id}`}>
                <Button className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroomingServices = () => {
    if (filteredGroomingServices.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-700">No grooming services found. Try adjusting your search.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroomingServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image_url}
                alt={service.business_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-white py-1 px-3 rounded-tr-lg">
                <span className="text-sm font-medium text-gray-900">{service.price_range}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.business_name}</h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {service.city}, {service.state}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="mb-4">
                <p className="font-medium text-gray-900 mb-1">Services Offered:</p>
                <p className="text-sm text-gray-600">{service.services_offered}</p>
              </div>
              <Button className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white">
                Contact Groomer
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Pet Care Services</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover trusted pet care services in your area
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Service Tabs */}
          <Tabs defaultValue="boarding" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="boarding" className="text-lg py-3">Pet Boarding</TabsTrigger>
              <TabsTrigger value="grooming" className="text-lg py-3">Pet Grooming</TabsTrigger>
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
    </Layout>
  );
};

export default Services;
