
-- Certificate verification requests table
CREATE TABLE public.certificate_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id UUID NOT NULL REFERENCES public.certificates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.certificate_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create verification requests" ON public.certificate_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own requests" ON public.certificate_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all requests" ON public.certificate_requests
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add verified status to certificates
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Admin policies for certificates (insert/update)
CREATE POLICY "Admins can manage certificates" ON public.certificates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add brochure_url and roadmap_url to courses
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS brochure_url TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS roadmap_url TEXT;

-- Storage buckets for course files and certificates
INSERT INTO storage.buckets (id, name, public) VALUES ('course-files', 'course-files', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true);

-- Storage policies
CREATE POLICY "Anyone can read course files" ON storage.objects FOR SELECT USING (bucket_id = 'course-files');
CREATE POLICY "Admins can upload course files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'course-files' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete course files" ON storage.objects FOR DELETE USING (bucket_id = 'course-files' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can read certificates" ON storage.objects FOR SELECT USING (bucket_id = 'certificates');
CREATE POLICY "Admins can upload certificates" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));

-- Admin RLS for courses (insert/update/delete already covered by "Admins can manage courses")
-- Admin RLS for categories
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS for vendors  
CREATE POLICY "Admins can manage vendors" ON public.vendors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS for coupons
CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS for enrollments management
CREATE POLICY "Admins can manage enrollments" ON public.enrollments FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS for course_delivery_options
CREATE POLICY "Admins can manage delivery options" ON public.course_delivery_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS for course_schedules
CREATE POLICY "Admins can manage schedules" ON public.course_schedules FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin view info requests (already exists, skip)
-- Admin view all orders (already exists)

-- Allow admins to manage reviews
CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin manage email logs
CREATE POLICY "Admins can manage email logs" ON public.email_logs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
