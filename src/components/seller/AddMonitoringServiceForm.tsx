
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AddMonitoringServiceFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
  adminMode?: boolean;
}

const AddMonitoringServiceForm = ({ onSuccess, onCancel, adminMode = false }: AddMonitoringServiceFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    monitoring_type: "",
    price_per_month: "",
    features: "",
    image_url: "",
    address: "",
    city: "",
    state: "",
    zip_code: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin mode - just simulate success
    if (adminMode) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess();
      }, 1000);
      return;
    }

    if (!user) return;

    setIsSubmitting(true);
    try {
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
      
      const { error } = await supabase
        .from('pet_monitoring_services')
        .insert([{
          ...formData,
          price_per_month: parseFloat(formData.price_per_month),
          features: featuresArray,
          provider_id: user.id
        }]);

      if (error) throw error;

      toast({
        title: "Monitoring service added successfully!",
        description: "Your service is now live and visible to customers."
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error adding monitoring service:', error);
      toast({
        title: "Error adding service",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="service_name">Service Name</Label>
        <Input
          id="service_name"
          value={formData.service_name}
          onChange={(e) => handleChange('service_name', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="monitoring_type">Monitoring Type</Label>
        <Select onValueChange={(value) => handleChange('monitoring_type', value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select monitoring type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="camera">Camera Monitoring</SelectItem>
            <SelectItem value="gps">GPS Tracking</SelectItem>
            <SelectItem value="health-tracker">Health Tracker</SelectItem>
            <SelectItem value="activity-monitor">Activity Monitor</SelectItem>
            <SelectItem value="smart-collar">Smart Collar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="price_per_month">Price per Month ($)</Label>
        <Input
          id="price_per_month"
          type="number"
          step="0.01"
          value={formData.price_per_month}
          onChange={(e) => handleChange('price_per_month', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="features">Features (comma-separated)</Label>
        <Textarea
          id="features"
          placeholder="e.g., Real-time tracking, Health alerts, Activity monitoring"
          value={formData.features}
          onChange={(e) => handleChange('features', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="image_url">Image URL (optional)</Label>
        <Input
          id="image_url"
          type="url"
          value={formData.image_url}
          onChange={(e) => handleChange('image_url', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="zip_code">ZIP Code</Label>
        <Input
          id="zip_code"
          value={formData.zip_code}
          onChange={(e) => handleChange('zip_code', e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding Service..." : "Add Monitoring Service"}
      </Button>
    </form>
  );
};

export default AddMonitoringServiceForm;
