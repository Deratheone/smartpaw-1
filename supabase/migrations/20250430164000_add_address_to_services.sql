
-- Add address column to pet_boarding_services table 
ALTER TABLE IF EXISTS public.pet_boarding_services
ADD COLUMN IF NOT EXISTS address text;

-- Create a storage bucket for service images
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to service images
CREATE POLICY "Public Access to service-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'service-images');

-- Policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload service images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'service-images' AND auth.role() = 'authenticated');

-- Policy to allow users to update and delete their own images
CREATE POLICY "Allow users to update their own service images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'service-images' AND auth.uid() = owner);

CREATE POLICY "Allow users to delete their own service images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'service-images' AND auth.uid() = owner);
