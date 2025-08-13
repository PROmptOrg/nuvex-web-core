-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS policies for projects (public read, admin write)
CREATE POLICY "Everyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Only admins can manage projects" ON public.projects FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- RLS policies for reviews (public read, authenticated write)
CREATE POLICY "Everyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS policies for user_roles (admin only)
CREATE POLICY "Only admins can manage user roles" ON public.user_roles FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for projects timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample projects
INSERT INTO public.projects (name, description, url, image_url) VALUES
('DeFi Exchange', 'A decentralized exchange built with Nuvex for seamless peer-to-peer trading', 'https://defi-exchange.example.com', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400'),
('Social Network', 'Privacy-focused social media platform powered by Nuvex infrastructure', 'https://social-net.example.com', 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400'),
('File Storage', 'Distributed file storage system using Nuvex node network', 'https://filestorage.example.com', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400');

-- Insert sample reviews
INSERT INTO public.reviews (project_id, user_name, rating, comment) VALUES
((SELECT id FROM public.projects WHERE name = 'DeFi Exchange'), 'Alex Chen', 5, 'Amazing platform! The decentralized architecture is incredibly robust.'),
((SELECT id FROM public.projects WHERE name = 'DeFi Exchange'), 'Sarah Johnson', 4, 'Great performance, easy integration with Nuvex. Highly recommended.'),
((SELECT id FROM public.projects WHERE name = 'Social Network'), 'Mike Rodriguez', 5, 'Finally, a social network that respects privacy. Nuvex makes it possible!'),
((SELECT id FROM public.projects WHERE name = 'File Storage'), 'Emma Wilson', 4, 'Reliable and fast. The distributed nature ensures my files are always available.');