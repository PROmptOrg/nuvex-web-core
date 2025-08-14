-- Drop the problematic policies that are causing infinite recursion
DROP POLICY IF EXISTS "Only admins can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Only admins can manage user roles" ON public.user_roles;

-- Create simple, safe policies for projects (public read access)
CREATE POLICY "Everyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create safe policies for user_roles (only allow reading own roles)
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (user_id = auth.uid());

-- Create policy to allow creating user roles (for admin setup)
CREATE POLICY "Service role can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (auth.role() = 'service_role');