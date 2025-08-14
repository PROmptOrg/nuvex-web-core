-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  url TEXT,
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

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (everyone can view)
CREATE POLICY "Everyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create policies for reviews (everyone can view, authenticated users can create)
CREATE POLICY "Everyone can view reviews" 
ON public.reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.projects (name, description, image_url, url) VALUES 
('TaskFlow Pro', 'A powerful project management tool built with Nuvex for seamless team collaboration', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop', 'https://taskflow-pro.example.com'),
('EcoTracker', 'Environmental impact tracking application helping users monitor their carbon footprint', 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=300&fit=crop', 'https://ecotracker.example.com'),
('CommuniChat', 'Real-time messaging platform for communities with advanced moderation features', 'https://images.unsplash.com/photo-1611906048669-bb27ade0ba5f?w=400&h=300&fit=crop', 'https://communichat.example.com'),
('DataViz Studio', 'Interactive data visualization platform for creating stunning dashboards', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', 'https://dataviz-studio.example.com');

-- Insert sample reviews
INSERT INTO public.reviews (project_id, user_name, rating, comment) VALUES 
((SELECT id FROM public.projects WHERE name = 'TaskFlow Pro'), 'Sarah Johnson', 5, 'Amazing tool! The interface is intuitive and the performance is outstanding.'),
((SELECT id FROM public.projects WHERE name = 'TaskFlow Pro'), 'Mike Chen', 4, 'Great project management features. Would love to see more integrations.'),
((SELECT id FROM public.projects WHERE name = 'EcoTracker'), 'Emma Davis', 5, 'Perfect for tracking environmental impact. Easy to use and very informative.'),
((SELECT id FROM public.projects WHERE name = 'CommuniChat'), 'Alex Rivera', 4, 'Solid messaging platform with good moderation tools.'),
((SELECT id FROM public.projects WHERE name = 'DataViz Studio'), 'Jordan Kim', 5, 'The best data visualization tool I have used. Highly recommended!');