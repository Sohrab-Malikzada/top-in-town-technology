
-- Information request form submissions
CREATE TABLE public.information_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type TEXT NOT NULL DEFAULT 'individual' CHECK (request_type IN ('individual', 'enterprise')),
  full_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  phone TEXT,
  course_name TEXT,
  how_heard TEXT,
  description TEXT,
  preferred_contact TEXT DEFAULT 'email' CHECK (preferred_contact IN ('email', 'whatsapp')),
  country TEXT,
  company TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.information_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (public form)
CREATE POLICY "Anyone can submit info requests" ON public.information_requests
  FOR INSERT WITH CHECK (full_name IS NOT NULL AND business_email IS NOT NULL);

-- Only admins can view
CREATE POLICY "Admins can view info requests" ON public.information_requests
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
