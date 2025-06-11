import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Shield } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { isAdminAuthenticated, clearAdminSession } from "@/hooks/auth/adminAuth";
import AddServiceForm from "@/components/seller/AddServiceForm";
import EditServiceForm from "@/components/seller/EditServiceForm";
import AddGroomingServiceForm from "@/components/seller/AddGroomingServiceForm";
import AddMonitoringServiceForm from "@/components/seller/AddMonitoringServiceForm";
import StatsCards from "@/components/seller/StatsCards";
import DashboardTabs from "@/components/seller/DashboardTabs";
import { ServiceListing, BoardingService, BookingStats } from "@/types/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock admin user for demo purposes
const ADMIN_USER = {
  id: 'admin-demo-user',
  email: 'admin@smartpaw.demo',
  user_metadata: {
    user_type: 'service-provider',
    full_name: 'SmartPaw Admin',
    business_name: 'SmartPaw Demo Services'
  }
};

const AdminSellerDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [selectedBoardingService, setSelectedBoardingService] = useState<BoardingService | null>(null);
  const [serviceType, setServiceType] = useState<'boarding' | 'grooming' | 'monitoring'>('boarding');

  // Check admin authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAdminSession();
    toast({
      title: "Logged out",
      description: "Admin session ended.",
    });
    navigate('/admin/login');
  };

  // Fetch demo service listings (using a fixed admin user ID)
  const { data: allServices, isLoading: isLoadingServices } = useQuery({
    queryKey: ['admin-all-seller-services'],
    queryFn: async () => {
      // Create demo services for admin dashboard
      const demoServices: ServiceListing[] = [
        {
          id: 'demo-boarding-1',
          provider_id: ADMIN_USER.id,
          title: 'Premium Pet Boarding',
          description: 'Luxury boarding with 24/7 monitoring and personalized care',
          price: 50,
          location: 'Downtown Pet Care Center',
          available: true,
          max_pets: 10,
          amenities: ['Pool', 'Playground', '24/7 Monitoring', 'Grooming'],
          images: ['/lovable-uploads/f4d6fa06-b043-4d32-ba66-b1e5111cc9b4.png'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          type: 'boarding' as const
        },
        {
          id: 'demo-boarding-2',
          provider_id: ADMIN_USER.id,
          title: 'Budget-Friendly Boarding',
          description: 'Affordable boarding with excellent care',
          price: 25,
          location: 'SmartPaw Community Center',
          available: true,
          max_pets: 15,
          amenities: ['Indoor Play Area', 'Daily Walks', 'Feeding Service'],
          images: ['/lovable-uploads/3e227a9f-4cb9-4f0d-abac-700e7fa34a0b.png'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          type: 'boarding' as const
        },
        {
          id: 'demo-monitoring-1',
          provider_id: ADMIN_USER.id,
          title: 'Smart Pet Monitoring',
          description: 'Advanced AI-powered pet monitoring system',
          price_per_month: 29.99,
          location: 'Home Installation Available',
          available: true,
          features: ['Live Video', 'Health Tracking', 'Behavior Analysis', 'Mobile Alerts'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          type: 'monitoring' as const
        }
      ];

      return demoServices;
    },
    enabled: isAdminAuthenticated()
  });

  // Calculate demo stats
  const stats: BookingStats = {
    totalRevenue: allServices?.reduce((sum, service) => {
      if (service.type === 'boarding') return sum + (service.price || 0);
      if (service.type === 'monitoring') return sum + (service.price_per_month || 0);
      return sum;
    }, 0) || 0,
    totalBookings: 12, // Demo value
    activeServices: allServices?.filter(s => s.available).length || 0,
    totalServices: allServices?.length || 0
  };

  const handleAddServiceSuccess = () => {
    setIsAddServiceOpen(false);
    queryClient.invalidateQueries({ queryKey: ['admin-all-seller-services'] });
    toast({
      title: "Demo Service Added",
      description: "This is a demo - service not actually saved.",
      variant: "default"
    });
  };

  const handleEditServiceSuccess = () => {
    setIsEditServiceOpen(false);
    setSelectedBoardingService(null);
    queryClient.invalidateQueries({ queryKey: ['admin-all-seller-services'] });
    toast({
      title: "Demo Service Updated", 
      description: "This is a demo - changes not actually saved.",
      variant: "default"
    });
  };

  const editService = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<BoardingService> }) => {
      // Demo mutation - doesn't actually update anything
      return { success: true };
    },
    onSuccess: () => {
      handleEditServiceSuccess();
    },
    onError: (error) => {
      toast({
        title: "Demo Error",
        description: "This is a demo error simulation.",
        variant: "destructive"
      });
    }
  });

  const deleteService = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: 'boarding' | 'grooming' | 'monitoring' }) => {
      // Demo mutation - doesn't actually delete anything
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-seller-services'] });
      toast({
        title: "Demo Service Deleted",
        description: "This is a demo - service not actually deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Demo Error",
        description: "This is a demo error simulation.",
        variant: "destructive"
      });
    }
  });

  const handleEditService = (service: BoardingService) => {
    setSelectedBoardingService(service);
    setIsEditServiceOpen(true);
  };

  const handleDeleteService = (id: string, type: 'boarding' | 'grooming' | 'monitoring') => {
    deleteService.mutate({ id, type });
  };

  if (!isAdminAuthenticated()) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Admin Header */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-red-600" />
                <div>
                  <CardTitle className="text-2xl text-red-900">Admin Seller Dashboard</CardTitle>
                  <p className="text-red-700">Demo Environment - All actions are simulated</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="border-red-300 text-red-700 hover:bg-red-100">
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your pet services and bookings</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={serviceType} onValueChange={(value: 'boarding' | 'grooming' | 'monitoring') => setServiceType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boarding">Pet Boarding</SelectItem>
                <SelectItem value="grooming">Pet Grooming</SelectItem>
                <SelectItem value="monitoring">Pet Monitoring</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddServiceOpen(true)} className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Dashboard Tabs */}
        <DashboardTabs 
          services={allServices || []}
          onEditService={handleEditService}
          onDeleteService={handleDeleteService}
          isLoading={isLoadingServices}
          deleteServiceLoading={deleteService.isPending}
        />

        {/* Add Service Dialog */}
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New {serviceType === 'boarding' ? 'Pet Boarding' : serviceType === 'grooming' ? 'Pet Grooming' : 'Pet Monitoring'} Service</DialogTitle>
            </DialogHeader>
            {serviceType === 'boarding' && (
              <AddServiceForm 
                onSuccess={handleAddServiceSuccess} 
                onCancel={() => setIsAddServiceOpen(false)}
                adminMode={true}
              />
            )}
            {serviceType === 'grooming' && (
              <AddGroomingServiceForm 
                onSuccess={handleAddServiceSuccess} 
                onCancel={() => setIsAddServiceOpen(false)}
                adminMode={true}
              />
            )}
            {serviceType === 'monitoring' && (
              <AddMonitoringServiceForm 
                onSuccess={handleAddServiceSuccess} 
                onCancel={() => setIsAddServiceOpen(false)}
                adminMode={true}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Service Dialog */}
        {selectedBoardingService && (
          <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Pet Boarding Service</DialogTitle>
              </DialogHeader>
              <EditServiceForm 
                service={selectedBoardingService}
                onSuccess={handleEditServiceSuccess}
                onCancel={() => setIsEditServiceOpen(false)}
                adminMode={true}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default AdminSellerDashboard;
