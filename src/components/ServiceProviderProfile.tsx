
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface ServiceProviderFormData {
  business_name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  website: string;
}

const ServiceProviderProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ServiceProviderFormData>({
    business_name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    website: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("service_providers")
        .update(formData)
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your business profile has been updated successfully.",
      });

      navigate("/seller-dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Business Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="business_name" className="block text-sm font-medium mb-2">
            Business Name
          </label>
          <Input
            id="business_name"
            name="business_name"
            value={formData.business_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Business Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Address
          </label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-2">
              State
            </label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="zip_code" className="block text-sm font-medium mb-2">
            ZIP Code
          </label>
          <Input
            id="zip_code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium mb-2">
            Website
          </label>
          <Input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
};

export default ServiceProviderProfile;
