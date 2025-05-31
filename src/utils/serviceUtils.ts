
import { ServiceListing } from "@/types/service";

export const getServiceDisplayName = (service: ServiceListing) => {
  if (service.type === 'boarding') return service.title;
  if (service.type === 'grooming') return service.business_name;
  if (service.type === 'monitoring') return service.service_name;
  return 'Unknown Service';
};

export const getServicePrice = (service: ServiceListing) => {
  if (service.type === 'boarding') return `$${service.price?.toFixed(2)}`;
  if (service.type === 'grooming') return service.price_range;
  if (service.type === 'monitoring') return `$${service.price_per_month?.toFixed(2)}/month`;
  return 'N/A';
};
