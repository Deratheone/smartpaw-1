
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Search } from "lucide-react";

// Mock data for service providers
const serviceProviders = [
  {
    id: 1,
    name: "Pawsome Grooming",
    category: "groomer",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviewCount: 127,
    location: "Downtown",
    distance: "1.2 miles away",
    price: "$$",
    description: "Professional pet grooming services with gentle handling and natural products.",
    services: ["Bathing", "Haircut", "Nail Trimming", "Ear Cleaning"]
  },
  {
    id: 2,
    name: "Happy Tails Daycare",
    category: "caretaker",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviewCount: 215,
    location: "North Hills",
    distance: "2.5 miles away",
    price: "$$$",
    description: "Supervised playgroups, individual attention, and comfortable resting areas for your pet.",
    services: ["Day Care", "Overnight Boarding", "Training", "Playtime"]
  },
  {
    id: 3,
    name: "Dr. Whiskers Veterinary",
    category: "vet",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviewCount: 189,
    location: "Midtown",
    distance: "0.8 miles away",
    price: "$$$",
    description: "Comprehensive veterinary care with a compassionate approach for all pets.",
    services: ["Check-ups", "Vaccinations", "Surgery", "Emergency Care"]
  },
  {
    id: 4,
    name: "Paws & Play Training",
    category: "trainer",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviewCount: 94,
    location: "West End",
    distance: "3.1 miles away",
    price: "$$",
    description: "Positive reinforcement training methods to help your pet become well-behaved and happy.",
    services: ["Basic Obedience", "Behavior Correction", "Puppy Classes", "Advanced Training"]
  },
  {
    id: 5,
    name: "Pet Walker Pro",
    category: "walker",
    image: "https://images.unsplash.com/photo-1563228275-2089a15767f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    reviewCount: 76,
    location: "East Side",
    distance: "1.7 miles away",
    price: "$",
    description: "Reliable dog walking services with real-time updates and GPS tracking.",
    services: ["Daily Walks", "Potty Breaks", "Exercise Sessions", "Group Walks"]
  },
  {
    id: 6,
    name: "Pet Nutrition Experts",
    category: "other",
    image: "https://images.unsplash.com/photo-1584694330688-e67b7bb21f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviewCount: 58,
    location: "South District",
    distance: "2.8 miles away",
    price: "$$",
    description: "Custom nutrition plans and consultations for pets with special dietary needs.",
    services: ["Nutrition Consultation", "Diet Planning", "Supplement Advice", "Weight Management"]
  },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesCategory = activeCategory === "all" || provider.category === activeCategory;
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Find Pet Services</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover trusted pet service providers in your area, from groomers and vets to caretakers and trainers.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              <div className="flex items-center gap-2">
                <MapPin className="text-smartpaw-purple" size={20} />
                <span className="text-gray-700">Near: Downtown</span>
              </div>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="groomer">Groomers</TabsTrigger>
                <TabsTrigger value="caretaker">Caretakers</TabsTrigger>
                <TabsTrigger value="vet">Vets</TabsTrigger>
                <TabsTrigger value="trainer">Trainers</TabsTrigger>
                <TabsTrigger value="walker">Walkers</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Service Providers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-white py-1 px-3 rounded-tr-lg">
                    <span className="text-sm font-medium text-gray-900">{provider.price}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-yellow-400 h-5 w-5" />
                      <span className="ml-1 text-gray-900 font-medium">{provider.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({provider.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{provider.location} • {provider.distance}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{provider.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/services/${provider.id}`}>
                    <Button className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700">No service providers found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Map Section (Mock) */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Find Services Near You</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Browse the map to discover pet service providers in your neighborhood
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
            <p className="text-gray-600">Map integration would be displayed here</p>
            {/* In a real implementation, you would integrate Google Maps here */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
