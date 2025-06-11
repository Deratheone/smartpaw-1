
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AddGroomingServiceFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
  adminMode?: boolean;
}

const AddGroomingServiceForm = ({ onSuccess, onCancel, adminMode = false }: AddGroomingServiceFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    description: "",
    services_offered: "",
    price_range: "",
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
      const { error } = await supabase
        .from('pet_grooming_services')
        .insert([{
          ...formData,
          provider_id: user.id
        }]);

      if (error) throw error;

      toast({
        title: "Grooming service added successfully!",
        description: "Your service is now live and visible to customers."
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error adding grooming service:', error);
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
        <Label htmlFor="business_name">Business Name</Label>
        <Input
          id="business_name"
          value={formData.business_name}
          onChange={(e) => handleChange('business_name', e.target.value)}
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
        <Label htmlFor="services_offered">Services Offered</Label>
        <Textarea
          id="services_offered"
          placeholder="e.g., Full grooming, nail trimming, ear cleaning, teeth brushing"
          value={formData.services_offered}
          onChange={(e) => handleChange('services_offered', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="price_range">Price Range</Label>
        <Input
          id="price_range"
          placeholder="e.g., $40 - $80"
          value={formData.price_range}
          onChange={(e) => handleChange('price_range', e.target.value)}
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
        {isSubmitting ? "Adding Service..." : "Add Grooming Service"}
      </Button>
    </form>
  );
};

export default AddGroomingServiceForm;
