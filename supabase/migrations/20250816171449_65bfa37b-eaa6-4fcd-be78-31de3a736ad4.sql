-- Allow anyone to create reviews (remove authentication requirement)
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON public.reviews;

CREATE POLICY "Anyone can create reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);