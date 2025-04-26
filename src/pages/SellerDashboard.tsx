
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, ShoppingBag, Users, Activity, Plus, Package, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface ServiceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  created_at: string;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalProducts: 0,
    newCustomers: 0,
  });

  // Fetch service listings
  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ['seller-services', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pet_boarding_services')
        .select('*')
        .eq('provider_id', user?.id);

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

  const handleDeactivateService = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('pet_boarding_services')
        .update({ available: false })
        .eq('id', serviceId);

      if (error) throw error;

      toast({
        title: "Service deactivated",
        description: "The service has been deactivated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error deactivating service",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your services and monitor performance</p>
          </div>
          <Button className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple">
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue}</div>
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
              <div className="text-2xl font-bold">{services?.filter(s => s.available).length || 0}</div>
              <p className="text-xs text-gray-500">Live listings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services?.length || 0}</div>
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
                    <p className="text-center py-4">No services listed yet</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {services?.map((service) => (
                        <div key={service.id} className="flex items-center p-4 border rounded-lg">
                          <div className="mr-4">
                            <div className="w-10 h-10 bg-smartpaw-green bg-opacity-10 rounded-full flex items-center justify-center">
                              <Package className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{service.title}</p>
                                <p className="text-sm text-gray-500">${service.price}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-500 border-red-200 hover:bg-red-50"
                                  onClick={() => handleDeactivateService(service.id)}
                                >
                                  {service.available ? 'Deactivate' : 'Deactivated'}
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
                <p className="text-center py-10 text-gray-500">No upcoming appointments</p>
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
                <div className="h-60 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">Analytics charts would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
