
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { ServiceListing } from "@/types/service";
import ServiceListItem from "./ServiceListItem";

interface ServiceListingsProps {
  services: ServiceListing[] | undefined;
  isLoading: boolean;
  onAddService: () => void;
  onEditService: (service: ServiceListing) => void;
  onToggleAvailability: (service: ServiceListing) => void;
  onDeleteService: (service: ServiceListing) => void;
  mutationsLoading: boolean;
}

const ServiceListings = ({ 
  services, 
  isLoading, 
  onAddService, 
  onEditService, 
  onToggleAvailability, 
  onDeleteService,
  mutationsLoading
}: ServiceListingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Service Listings</CardTitle>
        <CardDescription>Manage your service offerings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center py-4">Loading services...</p>
          ) : services?.length === 0 ? (
            <div className="text-center py-10">
              <Package className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500">No services listed yet</p>
              <Button 
                onClick={onAddService} 
                variant="outline" 
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Your First Service
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {services?.map((service) => (
                <ServiceListItem
                  key={`${service.type}-${service.id}`}
                  service={service}
                  onEdit={onEditService}
                  onToggleAvailability={onToggleAvailability}
                  onDelete={onDeleteService}
                  isLoading={mutationsLoading}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceListings;
