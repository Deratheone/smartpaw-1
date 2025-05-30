import { useState, useEffect } from "react";
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
  const [step, setStep] = useState<'booking' | 'payment' | 'success'>('booking');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const banks = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'Bank of Baroda'];

  useEffect(() => {
    if (!isOpen) {
      setStep('booking');
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        petName: '',
        petType: '',
        date: '',
        time: '',
        specialRequests: ''
      });
      setPaymentData({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    toast({
      title: 'Payment Successful!',
      description: `Your booking for ${serviceName} has been confirmed. You'll receive a confirmation email shortly.`,
    });
    setTimeout(() => {
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
        {step === 'booking' && (
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
              <Button type="submit" className="flex-1 bg-smartpaw-purple text-white">
                Continue to Payment
              </Button>
            </div>
          </form>
        )}
        {step === 'payment' && (
          <form onSubmit={handlePayNow} className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">{serviceName}</p>
              <p className="text-sm text-gray-600">Amount to Pay: {servicePrice}</p>
            </div>
            <div>
              <Label>Payment Method</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-1">
                  <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /> Card
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} /> UPI
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="paymentMethod" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} /> Net Banking
                </label>
              </div>
            </div>
            {paymentMethod === 'card' && (
              <>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentInputChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      value={paymentData.expiry}
                      onChange={handlePaymentInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentInputChange}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            {paymentMethod === 'upi' && (
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  name="upiId"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="yourname@bank"
                  required
                />
              </div>
            )}
            {paymentMethod === 'netbanking' && (
              <div>
                <Label htmlFor="bank">Select Bank</Label>
                <select
                  id="bank"
                  name="bank"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={selectedBank}
                  onChange={e => setSelectedBank(e.target.value)}
                  required
                >
                  <option value="">Choose a bank</option>
                  {banks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-smartpaw-purple text-white">
                {paymentMethod === 'netbanking' ? 'Proceed' : 'Pay Now'}
              </Button>
            </div>
          </form>
        )}
        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-10">
            <CreditCard className="h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-700 mb-4 text-center">Your booking for <span className="font-semibold">{serviceName}</span> is confirmed.<br />Thank you for choosing SmartPaw!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
