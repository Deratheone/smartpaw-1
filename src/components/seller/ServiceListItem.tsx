
import { Button } from "@/components/ui/button";
import { IndianRupee, MapPin, Package } from "lucide-react";
import { ServiceListing } from "@/types/service";
import { getServiceDisplayName, getServicePrice } from "@/utils/serviceUtils";

interface ServiceListItemProps {
  service: ServiceListing;
  onEdit: (service: ServiceListing) => void;
  onToggleAvailability: (service: ServiceListing) => void;
  onDelete: (service: ServiceListing) => void;
  isLoading: boolean;
}

const ServiceListItem = ({ 
  service, 
  onEdit, 
  onToggleAvailability, 
  onDelete, 
  isLoading 
}: ServiceListItemProps) => {
  return (
    <div className="flex items-start p-4 border rounded-lg">
      <div className="mr-4 flex-shrink-0">
        {service.image_url ? (
          <img 
            src={service.image_url} 
            alt={getServiceDisplayName(service)}
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
            <p className="font-medium">{getServiceDisplayName(service)}</p>
            <p className="text-sm text-gray-500 flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />
              {getServicePrice(service)}
            </p>
            <p className="text-xs text-gray-400 capitalize">{service.type} Service</p>
            {service.address && (
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {service.address}
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {service.type === 'boarding' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEdit(service)}
                disabled={isLoading}
              >
                Edit
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline" 
              className={service.available 
                ? "text-orange-500 border-orange-200 hover:bg-orange-50"
                : "text-green-500 border-green-200 hover:bg-green-50"}
              onClick={() => onToggleAvailability(service)}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : (service.available ? 'Deactivate' : 'Activate')}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => onDelete(service)}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceListItem;
