import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Users, Award, CheckCircle2, Monitor, Building, User, Plane, FileText, Download, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const deliveryIcons: Record<string, React.ReactNode> = {
  live_online: <Monitor className="h-4 w-4" />,
  classroom: <Building className="h-4 w-4" />,
  one_on_one: <User className="h-4 w-4" />,
  self_paced: <Clock className="h-4 w-4" />,
  fly_me_trainer: <Plane className="h-4 w-4" />,
  corporate: <Users className="h-4 w-4" />,
};

const deliveryLabels: Record<string, string> = {
  live_online: "Live Online",
  classroom: "Classroom",
  one_on_one: "1-on-1 Training",
  self_paced: "Self-Paced",
  fly_me_trainer: "Fly-Me-A-Trainer",
  corporate: "Corporate",
  hybrid: "Hybrid",
};

const CourseDetailPage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [deliveryOptions, setDeliveryOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [quoteLoading, setQuoteLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: courseData } = await supabase
        .from("courses")
        .select("*, categories(name, slug), vendors(name)")
        .eq("slug", slug)
        .single();

      if (courseData) {
        setCourse(courseData);
        const { data: options } = await supabase
          .from("course_delivery_options")
          .select("*")
          .eq("course_id", courseData.id);
        setDeliveryOptions(options || []);
      }
      setLoading(false);
    };
    load();
  }, [slug]);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email) { toast.error("Name and email required"); return; }
    setQuoteLoading(true);
    const { error } = await supabase.from("corporate_requests").insert([{
      company_name: quoteForm.company || "N/A",
      contact_name: quoteForm.name,
      contact_email: quoteForm.email,
      contact_phone: quoteForm.phone,
      course_id: course?.id,
      message: quoteForm.message,
    }]);
    setQuoteLoading(false);
    if (error) toast.error("Failed to submit request");
    else {
      toast.success("Quote request submitted!");
      setQuoteForm({ name: "", email: "", phone: "", company: "", message: "" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center text-muted-foreground">Loading course...</div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses" className="text-primary hover:underline">← Back to courses</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = course.original_price ? Math.round(((course.original_price - course.base_price) / course.original_price) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link><span>/</span>
            <Link to="/courses" className="hover:text-primary">Courses</Link><span>/</span>
            <span className="text-foreground truncate max-w-xs">{course.title}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-border/50">
          <div className="container py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="border-0">{course.vendors?.name || "Top in Town"}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                  {course.is_trending && <Badge className="bg-primary text-primary-foreground border-0 text-xs">🔥 Trending</Badge>}
                </div>
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-muted-foreground leading-relaxed mb-6">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> {course.rating} rating</span>
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {(course.students_count || 0).toLocaleString()} students</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
                  {course.certificate_eligible && <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-primary" /> Certificate eligible</span>}
                </div>
              </motion.div>

              {/* Pricing card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border/50 rounded-xl p-6 shadow-card self-start">
                {course.image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-6">
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-3xl font-bold text-primary">${course.base_price}</span>
                  {course.original_price && <span className="text-lg text-muted-foreground line-through">${course.original_price}</span>}
                  {discount > 0 && <Badge variant="destructive" className="border-0 text-xs">{discount}% OFF</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mb-6">Per participant</p>
                <Link to={`/login`}>
                  <Button className="w-full bg-gradient-primary text-accent-foreground font-semibold h-12 rounded-xl mb-3">Enroll Now</Button>
                </Link>
                <Button variant="outline" className="w-full h-12 rounded-xl border-border/50" onClick={() => document.getElementById("quote-section")?.scrollIntoView({ behavior: "smooth" })}>
                  Request a Quote
                </Button>

                {/* Delivery options with prices */}
                {deliveryOptions.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Delivery Options & Pricing</p>
                    {deliveryOptions.map((opt) => (
                      <div key={opt.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {deliveryIcons[opt.mode] || <CheckCircle2 className="h-4 w-4" />}
                          <span>{deliveryLabels[opt.mode] || opt.mode}</span>
                        </div>
                        <span className="font-semibold text-foreground">${opt.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Downloads */}
                <div className="mt-6 pt-6 border-t border-border/50 space-y-2">
                  {course.brochure_url ? (
                    <a href={course.brochure_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="w-full justify-start text-muted-foreground text-sm h-9">
                        <Download className="h-4 w-4 mr-2" /> Download Brochure
                      </Button>
                    </a>
                  ) : (
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground/50 text-sm h-9 cursor-not-allowed" disabled>
                      <Download className="h-4 w-4 mr-2" /> Brochure (Coming Soon)
                    </Button>
                  )}
                  {course.roadmap_url ? (
                    <a href={course.roadmap_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="w-full justify-start text-muted-foreground text-sm h-9">
                        <FileText className="h-4 w-4 mr-2" /> Download Roadmap
                      </Button>
                    </a>
                  ) : (
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground/50 text-sm h-9 cursor-not-allowed" disabled>
                      <FileText className="h-4 w-4 mr-2" /> Roadmap (Coming Soon)
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content tabs */}
        <section className="container py-10">
          <Tabs defaultValue="overview" className="max-w-3xl">
            <TabsList className="bg-card border border-border/50 p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
              <TabsTrigger value="curriculum" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Reviews</TabsTrigger>
              <TabsTrigger value="faq" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-8">
              <div>
                <h3 className="font-display text-xl font-semibold mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(course.highlights || []).map((h: string) => (
                    <div key={h} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              {(course.prerequisites || []).length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((p: string) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h3 className="font-display text-xl font-semibold mb-4">Why Choose This Course</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "🎓", title: "Expert Instructors", desc: "Certified industry professionals with real-world experience" },
                    { icon: "🔬", title: "Hands-on Labs", desc: "Practice with real-world scenarios and dedicated lab environments" },
                    { icon: "📜", title: "Certification", desc: "Globally recognized certificate upon successful completion" },
                    { icon: "💰", title: "Money-Back Guarantee", desc: "100% satisfaction guaranteed or your money back" },
                  ].map((item) => (
                    <div key={item.title} className="bg-card border border-border/50 rounded-lg p-4">
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6">
              {Array.isArray(course.curriculum) && course.curriculum.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-2">
                  {course.curriculum.map((mod: any, i: number) => (
                    <AccordionItem key={i} value={`mod-${i}`} className="bg-card border border-border/50 rounded-lg px-4">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">{mod.title || `Module ${i + 1}`}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{mod.content || mod.description || "Content details coming soon."}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <Accordion type="single" collapsible className="space-y-2">
                  {["Module 1: Introduction & Prerequisites", "Module 2: Core Concepts & Architecture", "Module 3: Hands-on Implementation", "Module 4: Advanced Topics & Security", "Module 5: Exam Preparation & Review"].map((title, i) => (
                    <AccordionItem key={i} value={`mod-${i}`} className="bg-card border border-border/50 rounded-lg px-4">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">{title}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">Comprehensive content covering key concepts, practical exercises, and assessment preparation.</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Student reviews will appear here once approved.</p>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <Accordion type="single" collapsible className="space-y-2">
                {Array.isArray(course.faq) && course.faq.length > 0 ? (
                  course.faq.map((faq: any, i: number) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border/50 rounded-lg px-4">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">{faq.q || faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{faq.a || faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  [
                    { q: "What are the prerequisites?", a: "Basic understanding of IT concepts is recommended. Specific prerequisites vary by course level." },
                    { q: "Is the exam voucher included?", a: "Yes, the exam voucher is included in the course price for certification courses." },
                    { q: "What if I need to reschedule?", a: "You can reschedule up to 7 days before the course start date at no additional cost." },
                    { q: "Do you offer corporate discounts?", a: "Yes, we offer group discounts for 3+ participants. Contact us for a custom quote." },
                    { q: "Is there a money-back guarantee?", a: "Absolutely! We offer a 100% money-back guarantee if you're not satisfied." },
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border/50 rounded-lg px-4">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            </TabsContent>
          </Tabs>
        </section>

        {/* Request a Quote */}
        <section id="quote-section" className="container py-10 max-w-2xl scroll-mt-24">
          <h2 className="font-display text-2xl font-bold mb-6">Request a Quote</h2>
          <form onSubmit={handleQuoteSubmit} className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input value={quoteForm.name} onChange={(e) => setQuoteForm((p) => ({ ...p, name: e.target.value }))} className="bg-muted border-border/50" required />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" value={quoteForm.email} onChange={(e) => setQuoteForm((p) => ({ ...p, email: e.target.value }))} className="bg-muted border-border/50" required />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={quoteForm.phone} onChange={(e) => setQuoteForm((p) => ({ ...p, phone: e.target.value }))} className="bg-muted border-border/50" />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={quoteForm.company} onChange={(e) => setQuoteForm((p) => ({ ...p, company: e.target.value }))} className="bg-muted border-border/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea value={quoteForm.message} onChange={(e) => setQuoteForm((p) => ({ ...p, message: e.target.value }))} className="bg-muted border-border/50" placeholder="Tell us about your training needs..." />
            </div>
            <Button type="submit" className="w-full h-11 bg-gradient-primary text-accent-foreground font-semibold" disabled={quoteLoading}>
              {quoteLoading ? "Submitting..." : "Submit Quote Request"}
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
