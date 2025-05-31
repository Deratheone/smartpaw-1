
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import AddServiceForm from "@/components/seller/AddServiceForm";
import EditServiceForm from "@/components/seller/EditServiceForm";
import AddGroomingServiceForm from "@/components/seller/AddGroomingServiceForm";
import AddMonitoringServiceForm from "@/components/seller/AddMonitoringServiceForm";
import StatsCards from "@/components/seller/StatsCards";
import DashboardTabs from "@/components/seller/DashboardTabs";
import { ServiceListing, BoardingService, BookingStats } from "@/types/service";

const SellerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [selectedBoardingService, setSelectedBoardingService] = useState<BoardingService | null>(null);
  const [serviceType, setServiceType] = useState<'boarding' | 'grooming' | 'monitoring'>('boarding');

  // Redirect if not logged in or not a service provider
  useEffect(() => {
    if (user && user.user_metadata?.user_type !== 'service-provider') {
      navigate('/');
    } else if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch all service listings
  const { data: allServices, isLoading: isLoadingServices } = useQuery({
    queryKey: ['all-seller-services', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      // Fetch boarding services
      const { data: boardingData, error: boardingError } = await supabase
        .from('pet_boarding_services')
        .select('*')
        .eq('provider_id', user.id);

      if (boardingError) throw boardingError;

      // Fetch grooming services
      const { data: groomingData, error: groomingError } = await supabase
        .from('pet_grooming_services')
        .select('*')
        .eq('provider_id', user.id);

      if (groomingError) throw groomingError;

      // Fetch monitoring services
      const { data: monitoringData, error: monitoringError } = await supabase
        .from('pet_monitoring_services')
        .select('*')
        .eq('provider_id', user.id);

      if (monitoringError) throw monitoringError;

      // Combine all services with type indicators
      const services: ServiceListing[] = [
        ...boardingData.map(s => ({ ...s, type: 'boarding' as const })),
        ...groomingData.map(s => ({ ...s, type: 'grooming' as const })),
        ...monitoringData.map(s => ({ ...s, type: 'monitoring' as const }))
      ];

      return services;
    },
    enabled: !!user?.id
  });

  // Calculate stats based on real data
  const stats: BookingStats = {
    totalRevenue: allServices?.reduce((sum, service) => {
      if (service.type === 'boarding') return sum + (service.price || 0);
      if (service.type === 'monitoring') return sum + (service.price_per_month || 0);
      return sum;
    }, 0) || 0,
    totalBookings: 0,
    activeServices: allServices?.filter(s => s.available).length || 0,
    totalServices: allServices?.length || 0
  };

  const handleAddServiceSuccess = () => {
    setIsAddServiceOpen(false);
    queryClient.invalidateQueries({ queryKey: ['all-seller-services', user?.id] });
  };

  const handleEditServiceSuccess = () => {
    setIsEditServiceOpen(false);
    setSelectedBoardingService(null);
    queryClient.invalidateQueries({ queryKey: ['all-seller-services', user?.id] });
  };

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async ({ serviceId, serviceType }: { serviceId: string; serviceType: 'boarding' | 'grooming' | 'monitoring' }) => {
      if (serviceType === 'boarding') {
        const { error } = await supabase
          .from('pet_boarding_services')
          .delete()
          .eq('id', serviceId);
        if (error) throw error;
      } else if (serviceType === 'grooming') {
        const { error } = await supabase
          .from('pet_grooming_services')
          .delete()
          .eq('id', serviceId);
        if (error) throw error;
      } else if (serviceType === 'monitoring') {
        const { error } = await supabase
          .from('pet_monitoring_services')
          .delete()
          .eq('id', serviceId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Service Deleted",
        description: "Your service has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['all-seller-services', user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error Deleting Service",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Toggle availability mutation
  const toggleAvailabilityMutation = useMutation({
    mutationFn: async ({ serviceId, serviceType, newStatus }: { serviceId: string; serviceType: 'boarding' | 'grooming' | 'monitoring'; newStatus: boolean }) => {
      if (serviceType === 'boarding') {
        const { error } = await supabase
          .from('pet_boarding_services')
          .update({ available: newStatus })
          .eq('id', serviceId);
        if (error) throw error;
      } else if (serviceType === 'grooming') {
        const { error } = await supabase
          .from('pet_grooming_services')
          .update({ available: newStatus })
          .eq('id', serviceId);
        if (error) throw error;
      } else if (serviceType === 'monitoring') {
        const { error } = await supabase
          .from('pet_monitoring_services')
          .update({ available: newStatus })
          .eq('id', serviceId);
        if (error) throw error;
      }
    },
    onSuccess: (_, { newStatus }) => {
      toast({
        title: newStatus ? "Service Activated" : "Service Deactivated",
        description: `Your service has been ${newStatus ? 'activated' : 'deactivated'} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['all-seller-services', user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error Updating Service",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleEditClick = (service: ServiceListing) => {
    if (service.type === 'boarding' && service.title && service.price !== undefined) {
      // Convert ServiceListing to BoardingService format
      const boardingService: BoardingService = {
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.price,
        available: service.available,
        created_at: service.created_at,
        image_url: service.image_url,
        address: service.address
      };
      setSelectedBoardingService(boardingService);
      setIsEditServiceOpen(true);
    } else {
      toast({
        title: "Edit Not Available",
        description: "Edit functionality is currently only available for boarding services.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteClick = (service: ServiceListing) => {
    if (confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      deleteServiceMutation.mutate({
        serviceId: service.id,
        serviceType: service.type
      });
    }
  };

  const handleToggleAvailability = (service: ServiceListing) => {
    const newStatus = !service.available;
    toggleAvailabilityMutation.mutate({
      serviceId: service.id,
      serviceType: service.type,
      newStatus
    });
  };

  const renderAddServiceForm = () => {
    switch (serviceType) {
      case 'boarding':
        return <AddServiceForm onSuccess={handleAddServiceSuccess} />;
      case 'grooming':
        return <AddGroomingServiceForm onSuccess={handleAddServiceSuccess} />;
      case 'monitoring':
        return <AddMonitoringServiceForm onSuccess={handleAddServiceSuccess} />;
      default:
        return <AddServiceForm onSuccess={handleAddServiceSuccess} />;
    }
  };

  const mutationsLoading = toggleAvailabilityMutation.isPending || deleteServiceMutation.isPending;

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your services and monitor performance</p>
          </div>
          <div className="flex gap-4 items-center">
            <Select value={serviceType} onValueChange={(value: 'boarding' | 'grooming' | 'monitoring') => setServiceType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boarding">Boarding</SelectItem>
                <SelectItem value="grooming">Grooming</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
              onClick={() => setIsAddServiceOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New {serviceType === 'boarding' ? 'Boarding' : serviceType === 'grooming' ? 'Grooming' : 'Monitoring'} Service
            </Button>
          </div>
        </div>

        <StatsCards stats={stats} />

        <DashboardTabs
          services={allServices}
          isLoadingServices={isLoadingServices}
          onAddService={() => setIsAddServiceOpen(true)}
          onEditService={handleEditClick}
          onToggleAvailability={handleToggleAvailability}
          onDeleteService={handleDeleteClick}
          mutationsLoading={mutationsLoading}
        />

        {/* Dialog for adding a new service */}
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New {serviceType === 'boarding' ? 'Boarding' : serviceType === 'grooming' ? 'Grooming' : 'Monitoring'} Service</DialogTitle>
            </DialogHeader>
            {renderAddServiceForm()}
          </DialogContent>
        </Dialog>
        
        {/* Dialog for editing a service */}
        <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            {selectedBoardingService && (
              <EditServiceForm 
                service={selectedBoardingService} 
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
