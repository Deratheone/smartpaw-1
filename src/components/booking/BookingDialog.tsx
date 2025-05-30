
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, CreditCard, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePrice: string;
  serviceType: 'boarding' | 'grooming' | 'monitoring';
  onBookingSuccess: () => void;
}

const BookingDialog = ({ 
  isOpen, 
  onClose, 
  serviceName, 
  servicePrice, 
  serviceType,
  onBookingSuccess 
}: BookingDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    date: '',
    time: '',
    specialRequests: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock booking creation
    const bookingId = `BK-${Date.now()}`;
    
    toast({
      title: "Booking Created!",
      description: `Booking ${bookingId} has been created. Proceeding to payment...`,
    });

    // Simulate a short delay then proceed to payment
    setTimeout(() => {
      handlePayment(bookingId);
    }, 1000);
  };

  const handlePayment = (bookingId: string) => {
    // Mock payment processing
    const mockPaymentUrl = `https://checkout.stripe.com/pay/mock-session-${bookingId}`;
    
    toast({
      title: "Redirecting to Payment",
      description: "Opening payment gateway in a new tab...",
    });

    // In a real implementation, this would open Stripe checkout
    // For demo purposes, we'll simulate a successful payment
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `Your booking for ${serviceName} has been confirmed. You'll receive a confirmation email shortly.`,
      });
      onBookingSuccess();
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book {serviceName}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium">{serviceName}</p>
            <p className="text-sm text-gray-600">Price: {servicePrice}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Your Name *</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="petName">Pet Name *</Label>
              <Input
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="petType">Pet Type *</Label>
              <Input
                id="petType"
                name="petType"
                placeholder="e.g., Dog, Cat"
                value={formData.petType}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Preferred Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Preferred Time *</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              placeholder="Any special requirements for your pet..."
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Book & Pay
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
