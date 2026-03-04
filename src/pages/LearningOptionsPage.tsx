import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Monitor, Building, BookOpen, User, Plane, Users, Radio, Sparkles } from "lucide-react";

const modes = [
  { id: "live-online", icon: Monitor, title: "Instructor-Led Online", description: "Interactive virtual classes with certified live instructors. Real-time Q&A, screen sharing, and collaborative labs — all from your home or office.", features: ["Live instructor interaction", "Virtual labs & hands-on exercises", "Recorded sessions for review", "Flexible global time zones"] },
  { id: "classroom", icon: Building, title: "Classroom Training", description: "Traditional in-person training at our state-of-the-art global training centers. Immersive learning with face-to-face instructor guidance.", features: ["In-person expert instruction", "Networking opportunities", "Dedicated lab equipment", "Catered refreshments"] },
  { id: "self-paced", icon: BookOpen, title: "Self-Paced Learning", description: "Learn at your own pace with pre-recorded video content, interactive labs, and comprehensive study materials available 24/7.", features: ["24/7 access to content", "Progress tracking", "Practice exams included", "6-month access period"] },
  { id: "one-on-one", icon: User, title: "1-on-1 Personal Training", description: "Personalized training sessions with a dedicated instructor tailored to your specific learning goals and pace.", features: ["Customized curriculum", "Flexible scheduling", "Focused attention", "Accelerated learning"] },
  { id: "fmat", icon: Plane, title: "Fly-Me-A-Trainer (FMAT)", description: "We send our expert trainer directly to your location. Ideal for teams wanting on-site training without travel.", features: ["Trainer comes to you", "Custom schedule", "Team-focused content", "Any global location"] },
  { id: "corporate", icon: Users, title: "Corporate Batch Training", description: "Customized training programs for organizations. Tailored content, flexible scheduling, and volume discounts for teams.", features: ["Customized curriculum", "Volume discounts", "Progress reporting", "Dedicated account manager"] },
  { id: "webinars", icon: Radio, title: "Webinars as a Service", description: "Live webinar sessions on trending topics and technologies. Free and premium sessions available for continuous learning.", features: ["Free introductory sessions", "Expert speakers", "Interactive Q&A", "Certificate of attendance"] },
  { id: "ai-enhanced", icon: Sparkles, title: "AI-Enhanced Learning", description: "Leverage AI-powered tools for personalized learning paths, intelligent assessments, and adaptive content delivery.", features: ["AI-powered recommendations", "Adaptive assessments", "Smart progress tracking", "Personalized learning paths"] },
];

const LearningOptionsPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <section className="container py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Flexible <span className="text-gradient">Learning Options</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the training delivery method that best fits your schedule, learning style, and organizational needs.
          </p>
        </motion.div>

        <div className="space-y-6">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.id}
              id={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 rounded-xl p-6 md:p-8 grid md:grid-cols-3 gap-6 scroll-mt-24"
            >
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <mode.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold">{mode.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{mode.description}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Features</p>
                {mode.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default LearningOptionsPage;
