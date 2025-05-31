
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity } from "lucide-react";
import { ServiceListing } from "@/types/service";
import ServiceListings from "./ServiceListings";
import BookingsSection from "./BookingsSection";

interface DashboardTabsProps {
  services: ServiceListing[] | undefined;
  isLoadingServices: boolean;
  onAddService: () => void;
  onEditService: (service: ServiceListing) => void;
  onToggleAvailability: (service: ServiceListing) => void;
  onDeleteService: (service: ServiceListing) => void;
  mutationsLoading: boolean;
}

const DashboardTabs = ({ 
  services, 
  isLoadingServices, 
  onAddService, 
  onEditService, 
  onToggleAvailability, 
  onDeleteService,
  mutationsLoading
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="listings" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="listings">My Listings</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="listings">
        <ServiceListings
          services={services}
          isLoading={isLoadingServices}
          onAddService={onAddService}
          onEditService={onEditService}
          onToggleAvailability={onToggleAvailability}
          onDeleteService={onDeleteService}
          mutationsLoading={mutationsLoading}
        />
      </TabsContent>

      <TabsContent value="appointments">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Manage your scheduled services</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingsSection />
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
  );
};

export default DashboardTabs;
