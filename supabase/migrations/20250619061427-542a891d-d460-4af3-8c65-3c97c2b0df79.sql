
-- Create work_projects table
CREATE TABLE public.work_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT[] NOT NULL DEFAULT '{}',
  short_description TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  challenge TEXT,
  what_we_did TEXT,
  top_image TEXT,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  brand_images TEXT[] NOT NULL DEFAULT '{}',
  final_thoughts TEXT,
  services JSONB NOT NULL DEFAULT '[]',
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.work_projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for the public work page)
CREATE POLICY "Public can view work projects" 
  ON public.work_projects 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy for authenticated users to manage projects
CREATE POLICY "Authenticated users can manage work projects" 
  ON public.work_projects 
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_work_projects_updated_at 
    BEFORE UPDATE ON public.work_projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
