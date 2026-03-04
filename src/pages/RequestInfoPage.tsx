import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, Mail, MessageCircle } from "lucide-react";

const RequestInfoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<{ title: string }[]>([]);
  const [form, setForm] = useState({
    request_type: "individual",
    full_name: "",
    business_email: "",
    phone: "",
    course_name: "",
    how_heard: "",
    description: "",
    preferred_contact: "email",
    country: "",
    company: "",
  });

  useEffect(() => {
    supabase.from("courses").select("title").eq("is_active", true).then(({ data }) => {
      if (data) setCourses(data);
    });
  }, []);

  const updateField = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.business_email) {
      toast.error("Please fill in required fields");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.from("information_requests").insert([form]);
    setIsLoading(false);
    if (error) {
      toast.error("Failed to submit. Please try again.");
    } else {
      toast.success("Your request has been submitted! We'll contact you shortly.");
      setForm({ request_type: "individual", full_name: "", business_email: "", phone: "", course_name: "", how_heard: "", description: "", preferred_contact: "email", country: "", company: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-3">
              Request More <span className="text-gradient">Information</span>
            </h1>
            <p className="text-muted-foreground">Fill out the form below and our team will get back to you within 24 hours.</p>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="bg-card border border-border/50 rounded-xl p-6 md:p-8 space-y-5">
            {/* Type */}
            <div className="space-y-2">
              <Label>I am an</Label>
              <RadioGroup value={form.request_type} onValueChange={(v) => updateField("request_type", v)} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual" className="font-normal cursor-pointer">Individual</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="enterprise" id="enterprise" />
                  <Label htmlFor="enterprise" className="font-normal cursor-pointer">Enterprise</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} className="bg-muted border-border/50" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Business Email *</Label>
                <Input id="email" type="email" value={form.business_email} onChange={(e) => updateField("business_email", e.target.value)} className="bg-muted border-border/50" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="bg-muted border-border/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={form.country} onChange={(e) => updateField("country", e.target.value)} className="bg-muted border-border/50" />
              </div>
            </div>

            {form.request_type === "enterprise" && (
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" value={form.company} onChange={(e) => updateField("company", e.target.value)} className="bg-muted border-border/50" />
              </div>
            )}

            <div className="space-y-2">
              <Label>Select Course</Label>
              <Select value={form.course_name} onValueChange={(v) => updateField("course_name", v)}>
                <SelectTrigger className="bg-muted border-border/50"><SelectValue placeholder="Choose a course" /></SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.title} value={c.title}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>How Did You Hear About Us?</Label>
              <Select value={form.how_heard} onValueChange={(v) => updateField("how_heard", v)}>
                <SelectTrigger className="bg-muted border-border/50"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {["Google Search", "Social Media", "LinkedIn", "Referral", "Email", "Event / Webinar", "Other"].map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Training Request Description</Label>
              <Textarea id="desc" value={form.description} onChange={(e) => updateField("description", e.target.value)} className="bg-muted border-border/50 min-h-[100px]" placeholder="Tell us about your training needs..." />
            </div>

            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <RadioGroup value={form.preferred_contact} onValueChange={(v) => updateField("preferred_contact", v)} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="email" id="pref-email" />
                  <Label htmlFor="pref-email" className="font-normal cursor-pointer flex items-center gap-1.5"><Mail className="h-4 w-4" /> Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="whatsapp" id="pref-whatsapp" />
                  <Label htmlFor="pref-whatsapp" className="font-normal cursor-pointer flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> WhatsApp</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full h-12 bg-gradient-primary text-accent-foreground font-semibold" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-5 w-5 mr-2" /> Submit Request</>}
            </Button>
          </motion.form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestInfoPage;
