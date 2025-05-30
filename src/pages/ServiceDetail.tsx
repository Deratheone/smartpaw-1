import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Star, Clock, Phone, Mail, ExternalLink } from "lucide-react";
import BookingDialog from "@/components/booking/BookingDialog";

// Mock data for service provider details
const serviceProviderDetails = {
  id: 1,
  name: "Pawsome Grooming",
  category: "groomer",
  mainImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  rating: 4.8,
  reviewCount: 127,
  location: "123 Pet Street, Downtown",
  distance: "1.2 miles away",
  price: "$$",
  description: "Professional pet grooming services with gentle handling and natural products. Our team of certified groomers specializes in all breeds and coat types, ensuring your pet looks and feels their best.",
  services: [
    { name: "Basic Bath", price: "$35-$60", description: "Includes shampoo, conditioner, blow dry, ear cleaning, and nail trim" },
    { name: "Full Grooming", price: "$50-$90", description: "Includes bath, haircut, styling, ear cleaning, nail trim, and teeth brushing" },
    { name: "Nail Trimming", price: "$15", description: "Careful trimming of nails to appropriate length" },
    { name: "Flea Treatment", price: "$25", description: "Special shampoo and treatment to eliminate fleas" }
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1599742713992-faa8af79a422?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1535267127880-35112a652568?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1553736026-ff14d994c15f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1557166185-6eb48459ed10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  ],
  contact: {
    phone: "(555) 123-4567",
    email: "info@pawsomegrooming.com",
    website: "www.pawsomegrooming.com"
  },
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  team: [
    { name: "Jamie Smith", title: "Lead Groomer", image: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Alex Johnson", title: "Senior Groomer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Sam Williams", title: "Groomer", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
  ],
  reviews: [
    { id: 1, user: "Taylor B.", rating: 5, date: "2 weeks ago", content: "My poodle looks amazing after his grooming session! The staff was incredibly gentle and patient with him. Will definitely be back!" },
    { id: 2, user: "Jordan M.", rating: 4, date: "1 month ago", content: "Great service and my dog came back smelling wonderful. Only giving 4 stars because the wait was a bit longer than expected." },
    { id: 3, user: "Casey L.", rating: 5, date: "2 months ago", content: "Best groomer in town! They take such good care of my anxious rescue dog. She actually enjoys going there now." }
  ]
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  // In a real app, we would fetch the data based on the id
  // For this prototype, we'll just use our mock data
  const provider = serviceProviderDetails;

  const handleBookingSuccess = () => {
    console.log('Booking successful for service detail!');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="h-64 md:h-80 overflow-hidden relative">
          <img
            src={provider.mainImage}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto">
              <Link to="/services" className="text-white/80 hover:text-white mb-2 inline-block">
                &larr; Back to Services
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{provider.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-yellow-400 h-5 w-5" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                  <span className="ml-1 text-white/80">({provider.reviewCount} reviews)</span>
                </div>
                <span className="mx-3">•</span>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{provider.distance}</span>
                </div>
                <span className="mx-3">•</span>
                <span>{provider.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Information */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">About {provider.name}</h2>
                    <p className="text-gray-700">{provider.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Business Hours</h3>
                    <div className="space-y-2">
                      {provider.hours.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <Clock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{item.day}</p>
                            <p className="text-gray-600">{item.hours}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Location</h3>
                    <div className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                      <p className="text-gray-700">{provider.location}</p>
                    </div>
                    <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                      <p className="text-gray-600">Map would be displayed here</p>
                      {/* In a real implementation, you would integrate Google Maps here */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Services</h2>
                  <div className="grid gap-4">
                    {provider.services.map((service, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                          <span className="font-medium text-smartpaw-purple">{service.price}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{service.description}</p>
                        <Button 
                          size="sm"
                          className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
                          onClick={() => setIsBookingOpen(true)}
                        >
                          Book This Service
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="gallery">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Photo Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {provider.galleryImages.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-yellow-400 h-6 w-6" />
                      <span className="ml-1 text-xl font-bold">{provider.rating}</span>
                      <span className="ml-1 text-gray-600">({provider.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {provider.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{review.user}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="team">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Meet Our Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {provider.team.map((member, index) => (
                      <div key={index} className="text-center">
                        <div className="mb-4 mx-auto w-32 h-32 overflow-hidden rounded-full">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-gray-600">{member.title}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Contact and Booking */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm sticky top-20">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Contact Information</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-smartpaw-purple" />
                    <a href={`tel:${provider.contact.phone}`} className="text-gray-700 hover:text-smartpaw-purple">
                      {provider.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-smartpaw-purple" />
                    <a href={`mailto:${provider.contact.email}`} className="text-gray-700 hover:text-smartpaw-purple">
                      {provider.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <ExternalLink className="h-5 w-5 mr-3 text-smartpaw-purple" />
                    <a href={`https://${provider.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-smartpaw-purple">
                      {provider.contact.website}
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-900">Book an Appointment</h3>
                <div className="bg-white p-4 rounded border border-gray-200 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-gray-700 mb-4">
                    <Calendar className="h-5 w-5 text-smartpaw-purple" />
                    <span>Quick booking available</span>
                  </div>
                  <div className="text-center text-gray-500 text-sm">
                    <p>Book your appointment instantly</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Dialog */}
      <BookingDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceName={provider.name}
        servicePrice={provider.price}
        serviceType="grooming"
        onBookingSuccess={handleBookingSuccess}
      />
    </Layout>
  );
};

export default ServiceDetail;
