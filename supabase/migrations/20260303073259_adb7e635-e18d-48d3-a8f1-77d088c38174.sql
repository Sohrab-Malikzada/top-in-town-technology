
-- Fix corporate_requests: allow authenticated or anonymous inserts but require email
DROP POLICY "Users can create requests" ON public.corporate_requests;
CREATE POLICY "Anyone can create corporate requests" ON public.corporate_requests 
  FOR INSERT WITH CHECK (contact_email IS NOT NULL AND contact_name IS NOT NULL);
