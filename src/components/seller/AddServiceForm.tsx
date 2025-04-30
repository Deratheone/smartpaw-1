
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface AddServiceFormProps {
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

const AddServiceForm = ({ onSuccess }: AddServiceFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('pet_boarding_services')
        .insert({
          provider_id: user.id,
          title: data.title,
          description: data.description,
          price: parseFloat(data.price),
          image_url: data.imageUrl || null,
          available: true
        });

      if (error) throw error;
      
      toast({
        title: "Service Created",
        description: "Your service listing has been created successfully.",
      });
      
      reset();
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error Creating Service",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Service Title</label>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder="Pet Boarding Service"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Describe your service in detail..."
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Price ($)</label>
        <Input
          {...register("price", { 
            required: "Price is required",
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: "Please enter a valid price"
            }
          })}
          type="text"
          placeholder="29.99"
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
        <Input
          {...register("imageUrl")}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Service"}
      </Button>
    </form>
  );
};

export default AddServiceForm;
