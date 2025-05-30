
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle } from "lucide-react";

interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: string;
  specialRequests?: string;
}

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: "BK-1704067200",
    customerName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    petName: "Max",
    petType: "Golden Retriever",
    serviceName: "Premium Boarding Service",
    date: "2025-01-02",
    time: "10:00",
    status: "pending",
    amount: "$75.00",
    specialRequests: "Max needs his medication at 8 AM and 6 PM daily"
  },
  {
    id: "BK-1704070800",
    customerName: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(555) 987-6543",
    petName: "Whiskers",
    petType: "Persian Cat",
    serviceName: "Full Grooming Package",
    date: "2025-01-02",
    time: "14:30",
    status: "confirmed",
    amount: "$60.00"
  },
  {
    id: "BK-1704074400",
    customerName: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "(555) 456-7890",
    petName: "Bella",
    petType: "French Bulldog",
    serviceName: "24/7 Health Monitoring",
    date: "2025-01-03",
    time: "09:00",
    status: "confirmed",
    amount: "$120.00/month"
  }
];

const BookingsSection = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConfirmBooking = (bookingId: string) => {
    console.log(`Confirming booking ${bookingId}`);
    // In a real app, this would update the booking status in the database
  };

  const handleCancelBooking = (bookingId: string) => {
    console.log(`Cancelling booking ${bookingId}`);
    // In a real app, this would update the booking status in the database
  };

  return (
    <div className="space-y-4">
      {mockBookings.length === 0 ? (
        <div className="text-center py-10">
          <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-500">No bookings yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {mockBookings.map((booking) => (
            <Card key={booking.id} className="border-l-4 border-l-smartpaw-purple">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{booking.serviceName}</CardTitle>
                    <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <p className="text-lg font-bold text-smartpaw-purple mt-1">{booking.amount}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">{booking.customerName}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{booking.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{booking.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pet: {booking.petName} ({booking.petType})</p>
                    </div>
                  </div>
                </div>
                
                {booking.specialRequests && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Special Requests:</p>
                    <p className="text-sm text-gray-600">{booking.specialRequests}</p>
                  </div>
                )}

                {booking.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleConfirmBooking(booking.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsSection;
