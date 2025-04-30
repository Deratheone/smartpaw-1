import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Calendar, IndianRupee, ShoppingBag, Users, Activity, Plus, Package, Clock, MapPin, Image } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import AddServiceForm from "@/components/seller/AddServiceForm";
import EditServiceForm from "@/components/seller/EditServiceForm";

interface ServiceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  created_at: string;
  image_url?: string;
  address?: string;
}

interface BookingStats {
  totalRevenue: number;
  totalBookings: number;
  activeServices: number;
  totalServices: number;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceListing | null>(null);

  // Redirect if not logged in or not a service provider
  useEffect(() => {
    if (user && user.user_metadata?.user_type !== 'service-provider') {
      navigate('/');
    } else if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch service listings
  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ['seller-services', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('pet_boarding_services')
        .select('*')
        .eq('provider_id', user.id);

      if (error) {
        toast({
          title: "Error fetching services",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      return data as ServiceListing[];
    },
    enabled: !!user?.id
  });

  // Calculate stats based on real data
  const stats: BookingStats = {
    totalRevenue: services?.reduce((sum, service) => sum + service.price, 0) || 0,
    totalBookings: 0, // This would come from a bookings table
    activeServices: services?.filter(s => s.available).length || 0,
    totalServices: services?.length || 0
  };

  // Mutation for toggling service availability
  const toggleServiceMutation = useMutation({
    mutationFn: async ({ serviceId, available }: { serviceId: string, available: boolean }) => {
      const { error } = await supabase
        .from('pet_boarding_services')
        .update({ available })
        .eq('id', serviceId);

      if (error) throw error;
      return { serviceId, available };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['seller-services', user?.id] });
      toast({
        title: data.available ? "Service Activated" : "Service Deactivated",
        description: `The service has been ${data.available ? 'activated' : 'deactivated'} successfully.`
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating service",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Mutation for deleting a service
  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase
        .from('pet_boarding_services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;
      return serviceId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-services', user?.id] });
      toast({
        title: "Service Deleted",
        description: "The service has been permanently deleted."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting service",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleToggleService = (serviceId: string, currentStatus: boolean) => {
    toggleServiceMutation.mutate({ serviceId, available: !currentStatus });
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      deleteServiceMutation.mutate(serviceId);
    }
  };

  const handleEditService = (service: ServiceListing) => {
    setSelectedService(service);
    setIsEditServiceOpen(true);
  };

  const handleAddServiceSuccess = () => {
    setIsAddServiceOpen(false);
    queryClient.invalidateQueries({ queryKey: ['seller-services', user?.id] });
  };

  const handleEditServiceSuccess = () => {
    setIsEditServiceOpen(false);
    setSelectedService(null);
    queryClient.invalidateQueries({ queryKey: ['seller-services', user?.id] });
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your services and monitor performance</p>
          </div>
          <Button 
            className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
            onClick={() => setIsAddServiceOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-500">Lifetime earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-gray-500">Total bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeServices}</div>
              <p className="text-xs text-gray-500">Live listings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalServices}</div>
              <p className="text-xs text-gray-500">All listings</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="listings" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>My Service Listings</CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingServices ? (
                    <p className="text-center py-4">Loading services...</p>
                  ) : services?.length === 0 ? (
                    <div className="text-center py-10">
                      <Package className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500">No services listed yet</p>
                      <Button 
                        onClick={() => setIsAddServiceOpen(true)} 
                        variant="outline" 
                        className="mt-4"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Your First Service
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {services?.map((service) => (
                        <div key={service.id} className="flex items-start p-4 border rounded-lg">
                          <div className="mr-4 flex-shrink-0">
                            {service.image_url ? (
                              <img 
                                src={service.image_url} 
                                alt={service.title}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            ) : (
                              <div className={`w-16 h-16 rounded-md flex items-center justify-center ${
                                service.available 
                                  ? "bg-green-100 text-green-600" 
                                  : "bg-gray-100 text-gray-600"
                              }`}>
                                <Package className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                              <div>
                                <p className="font-medium">{service.title}</p>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <IndianRupee className="h-3 w-3 mr-1" />
                                  {service.price.toFixed(2)}
                                </p>
                                {service.address && (
                                  <p className="text-xs text-gray-500 flex items-center mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {service.address}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleEditService(service)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className={service.available 
                                    ? "text-orange-500 border-orange-200 hover:bg-orange-50"
                                    : "text-green-500 border-green-200 hover:bg-green-50"}
                                  onClick={() => handleToggleService(service.id, service.available)}
                                >
                                  {service.available ? 'Deactivate' : 'Activate'}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-500 border-red-200 hover:bg-red-50"
                                  onClick={() => handleDeleteService(service.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Manage your scheduled services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <Clock className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">No upcoming appointments</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>See what customers are saying about your services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-10 text-gray-500">No reviews yet</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Business Analytics</CardTitle>
                <CardDescription>Track your performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 w-full bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                  <Activity className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">Analytics charts will be displayed here</p>
                  <p className="text-xs text-gray-400 mt-1">Coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog for adding a new service */}
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <AddServiceForm onSuccess={handleAddServiceSuccess} />
          </DialogContent>
        </Dialog>
        
        {/* Dialog for editing a service */}
        <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            {selectedService && (
              <EditServiceForm 
                service={selectedService} 
                onSuccess={handleEditServiceSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
