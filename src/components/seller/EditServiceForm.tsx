
import { useState, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { IndianRupee, MapPin, Image, Upload } from "lucide-react";

interface EditServiceFormProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
    available: boolean;
    image_url?: string;
    address?: string;
  };
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

const EditServiceForm = ({ service, onSuccess }: EditServiceFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(service.image_url || null);
  
  // Parse address if it exists
  const [addressParts, setAddressParts] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  useEffect(() => {
    if (service.address) {
      const parts = service.address.split(',').map(part => part.trim());
      setAddressParts({
        address: parts[0] || "",
        city: parts[1] || "",
        state: parts[2] || "",
        zipCode: parts[3] || ""
      });
    }
  }, [service]);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      imageUrl: service.image_url || ""
    }
  });

  // Set the address fields
  useEffect(() => {
    setValue("address", addressParts.address);
    setValue("city", addressParts.city);
    setValue("state", addressParts.state);
    setValue("zipCode", addressParts.zipCode);
  }, [addressParts, setValue]);

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
      
      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      
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
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Upload image if selected
      let imageUrl = data.imageUrl || null;
      if (selectedImage) {
        const uploadedUrl = await uploadImage(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      // Format address for storage in the database
      const address = data.address ? 
        `${data.address}, ${data.city || ''}, ${data.state || ''}, ${data.zipCode || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/,'') : 
        null;
      
      const { error } = await supabase
        .from('pet_boarding_services')
        .update({
          title: data.title,
          description: data.description,
          price: parseFloat(data.price),
          image_url: imageUrl,
          address: address
        })
        .eq('id', service.id);

      if (error) throw error;
      
      toast({
        title: "Service Updated",
        description: "Your service listing has been updated successfully.",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error Updating Service",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setValue("imageUrl", "");
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
                onClick={handleRemoveImage}
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
          
          {!imagePreview && (
            <>
              <p className="text-xs text-gray-500">Or provide an image URL:</p>
              <Input
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
              />
            </>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Service"}
      </Button>
    </form>
  );
};

export default EditServiceForm;
