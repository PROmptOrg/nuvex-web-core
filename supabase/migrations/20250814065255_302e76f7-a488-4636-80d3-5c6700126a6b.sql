-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Everyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Only admins can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Service role can manage user roles" ON public.user_roles;

-- Create simple, safe policies for projects (public read access)
CREATE POLICY "Public read access for projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create minimal policy for user_roles (only authenticated users can see their own roles)
CREATE POLICY "Users can see own roles only" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);