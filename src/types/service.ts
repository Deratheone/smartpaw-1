
export interface ServiceListing {
  id: string;
  title?: string;
  service_name?: string;
  business_name?: string;
  description: string;
  price?: number;
  price_per_month?: number;
  price_range?: string;
  available: boolean;
  created_at: string;
  image_url?: string;
  address?: string;
  type: 'boarding' | 'grooming' | 'monitoring';
}

export interface BoardingService {
  id: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  created_at: string;
  image_url?: string;
  address?: string;
}

export interface BookingStats {
  totalRevenue: number;
  totalBookings: number;
  activeServices: number;
  totalServices: number;
}
