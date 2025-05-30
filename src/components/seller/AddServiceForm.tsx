
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IndianRupee, MapPin, Image, Upload } from "lucide-react";

interface AddServiceFormProps {
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

const AddServiceForm = ({ onSuccess }: AddServiceFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `service_images/${fileName}`;
      
      // Check if bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'service-images');
      
      if (!bucketExists) {
        console.log('Service images bucket does not exist, using fallback image URL');
        return null;
      }
      
      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }
      
      const { data } = supabase.storage
        .from('service-images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a service.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!data.title?.trim()) {
      toast({
        title: "Validation Error",
        description: "Service title is required.",
        variant: "destructive"
      });
      return;
    }

    if (!data.description?.trim()) {
      toast({
        title: "Validation Error",
        description: "Service description is required.",
        variant: "destructive"
      });
      return;
    }

    if (!data.price?.trim()) {
      toast({
        title: "Validation Error",
        description: "Service price is required.",
        variant: "destructive"
      });
      return;
    }

    const priceValue = parseFloat(data.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid price greater than 0.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Upload image if selected
      let imageUrl = data.imageUrl || null;
      if (selectedImage) {
        const uploadedUrl = await uploadImage(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          // Use a fallback image if upload fails
          imageUrl = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        }
      }
      
      // Format address for storage in the database
      const addressParts = [data.address, data.city, data.state, data.zipCode].filter(Boolean);
      const address = addressParts.length > 0 ? addressParts.join(', ') : null;
      
      const serviceData = {
        provider_id: user.id,
        title: data.title.trim(),
        description: data.description.trim(),
        price: priceValue,
        image_url: imageUrl,
        address: address,
        available: true
      };

      console.log('Creating service with data:', serviceData);
      
      const { error } = await supabase
        .from('pet_boarding_services')
        .insert(serviceData);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      toast({
        title: "Service Created",
        description: "Your service listing has been created successfully.",
      });
      
      // Reset form and image preview
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      onSuccess();
    } catch (error: any) {
      console.error('Error creating service:', error);
      toast({
        title: "Error Creating Service",
        description: error.message || "Failed to create service. Please try again.",
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
      
      <div className="relative">
        <label className="block text-sm font-medium mb-1">
          <span className="flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            Price (₹)
          </span>
        </label>
        <Input
          {...register("price", { 
            required: "Price is required",
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: "Please enter a valid price"
            }
          })}
          type="text"
          placeholder="999.99"
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
      </div>
      
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          <span className="flex items-center gap-1 mb-1">
            <MapPin className="h-4 w-4" />
            Service Location
          </span>
        </label>
        
        <div>
          <Input
            {...register("address")}
            placeholder="Street Address"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Input
              {...register("city")}
              placeholder="City"
            />
          </div>
          <div>
            <Input
              {...register("state")}
              placeholder="State"
            />
          </div>
          <div>
            <Input
              {...register("zipCode")}
              placeholder="PIN Code"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          <span className="flex items-center gap-1">
            <Image className="h-4 w-4" />
            Image
          </span>
        </label>
        
        <div className="space-y-2">
          {imagePreview ? (
            <div className="relative w-full h-40 rounded-md overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label 
                htmlFor="image-upload" 
                className="bg-smartpaw-purple text-white px-4 py-2 rounded-md cursor-pointer hover:bg-smartpaw-dark-purple"
              >
                Select Image
              </label>
            </div>
          )}
          
          <p className="text-xs text-gray-500">Or provide an image URL:</p>
          <Input
            {...register("imageUrl")}
            placeholder="https://example.com/image.jpg"
            disabled={!!selectedImage}
          />
        </div>
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
