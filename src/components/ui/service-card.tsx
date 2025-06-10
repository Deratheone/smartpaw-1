import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    business_name: string;
    description: string;
    location?: string;
    rating?: number;
    price_range?: string;
    image_url?: string;
    available?: boolean;
    response_time?: string;
  };
  onSelect: (service: any) => void;
  onBook: (service: any) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  onBook
}) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-smartpaw-purple/10 to-smartpaw-pink/10">
            <span className="text-4xl">🐾</span>
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={service.available ? "default" : "secondary"}
            className={service.available ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {service.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          {/* Business Name */}
          <h3 className="font-semibold text-lg leading-tight line-clamp-1 text-gray-900">
            {service.business_name}
          </h3>
          
          {/* Service Title */}
          <p className="text-sm text-gray-600 line-clamp-1">
            {service.title}
          </p>
          
          {/* Rating and Location Row */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {service.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{service.rating}</span>
              </div>
            )}
            
            {service.location && (
              <div className="flex items-center space-x-1 flex-1 min-w-0 ml-2">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{service.location}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {service.description}
        </p>
        
        {/* Additional Info */}
        <div className="space-y-2">
          {service.price_range && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <DollarSign className="h-3 w-3" />
              <span>{service.price_range}</span>
            </div>
          )}
          
          {service.response_time && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Responds in {service.response_time}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect(service)}
          className="flex-1 text-xs"
        >
          View Details
        </Button>
        <Button
          size="sm"
          onClick={() => onBook(service)}
          disabled={!service.available}
          className="flex-1 bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-xs"
        >
          {service.available ? "Book Now" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
