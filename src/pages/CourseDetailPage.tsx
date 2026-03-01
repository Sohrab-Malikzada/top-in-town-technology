import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Users, Award, CheckCircle2, ArrowLeft, Monitor, Building, User, Plane } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courses } from "@/data/courses";

const deliveryIcons: Record<string, React.ReactNode> = {
  "Live Online": <Monitor className="h-4 w-4" />,
  "Classroom": <Building className="h-4 w-4" />,
  "1-on-1": <User className="h-4 w-4" />,
  "Self-paced": <Clock className="h-4 w-4" />,
  "Fly-Me-A-Trainer": <Plane className="h-4 w-4" />,
};

const CourseDetailPage = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

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

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-xs">{course.title}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-border/50">
          <div className="container py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="border-0">{course.vendor}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                  {course.isTrending && (
                    <Badge className="bg-primary text-primary-foreground border-0 text-xs">🔥 Trending</Badge>
                  )}
                </div>
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-muted-foreground leading-relaxed mb-6">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {course.rating} rating
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {course.students.toLocaleString()} students
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-primary" /> Certificate included
                  </span>
                </div>
              </motion.div>

              {/* Pricing card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border/50 rounded-xl p-6 shadow-card self-start"
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-3xl font-bold text-primary">${course.price}</span>
                  <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                  <Badge variant="destructive" className="border-0 text-xs">{discount}% OFF</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-6">Per participant · Includes exam voucher</p>

                <Button className="w-full bg-gradient-primary text-accent-foreground font-semibold h-12 rounded-xl hover:opacity-90 transition-opacity mb-3">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-xl border-border/50">
                  Request Corporate Quote
                </Button>

                <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Delivery Options</p>
                  {course.deliveryModes.map((mode) => (
                    <div key={mode} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {deliveryIcons[mode] || <CheckCircle2 className="h-4 w-4" />}
                      <span>{mode}</span>
                    </div>
                  ))}
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
              <TabsTrigger value="faq" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-8">
              <div>
                <h3 className="font-display text-xl font-semibold mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold mb-4">Why Choose This Course</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "🎓", title: "Expert Instructors", desc: "Learn from certified industry professionals" },
                    { icon: "🔬", title: "Hands-on Labs", desc: "Practice with real-world scenarios and labs" },
                    { icon: "📜", title: "Certification", desc: "Globally recognized certificate upon completion" },
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
              <Accordion type="single" collapsible className="space-y-2">
                {[
                  { title: "Module 1: Introduction & Prerequisites", content: "Course overview, lab setup, prerequisites review, and learning objectives." },
                  { title: "Module 2: Core Concepts & Architecture", content: "Deep dive into fundamental concepts, architecture patterns, and best practices." },
                  { title: "Module 3: Hands-on Implementation", content: "Practical labs covering real-world implementation scenarios and configurations." },
                  { title: "Module 4: Advanced Topics & Security", content: "Advanced features, security hardening, monitoring, and troubleshooting." },
                  { title: "Module 5: Exam Preparation & Review", content: "Practice exams, key concept review, exam tips, and certification guidance." },
                ].map((mod, i) => (
                  <AccordionItem key={i} value={`module-${i}`} className="bg-card border border-border/50 rounded-lg px-4">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">{mod.title}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{mod.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <Accordion type="single" collapsible className="space-y-2">
                {[
                  { q: "What are the prerequisites?", a: "Basic understanding of IT concepts is recommended. Specific prerequisites vary by course level." },
                  { q: "Is the exam voucher included?", a: "Yes, the exam voucher is included in the course price for certification courses." },
                  { q: "What if I need to reschedule?", a: "You can reschedule up to 7 days before the course start date at no additional cost." },
                  { q: "Do you offer corporate discounts?", a: "Yes, we offer group discounts for 3+ participants. Contact us for a custom quote." },
                  { q: "Is there a money-back guarantee?", a: "Absolutely! We offer a 100% money-back guarantee if you're not satisfied with the training." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border/50 rounded-lg px-4">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
