import { motion } from "framer-motion";
import { Award, Users, Globe, Shield, Star, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(141,73%,42%,0.1),transparent_60%)]" />
          <div className="container relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
                About <span className="text-gradient">Top in Town Technology</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A global leader in IT training and professional certification, empowering 150,000+ professionals across 80+ countries with world-class education since 2010.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/20">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Target, title: "Our Mission", desc: "To democratize access to world-class IT training, enabling professionals everywhere to advance their careers." },
                { icon: Star, title: "Excellence", desc: "We maintain the highest quality standards with a 98% satisfaction rate and industry-leading pass rates." },
                { icon: Globe, title: "Global Reach", desc: "Training delivered in 80+ countries through multiple flexible learning models." },
                { icon: Shield, title: "Guarantee", desc: "100% money-back happiness guarantee on all our training programs." },
                { icon: Award, title: "Certifications", desc: "Official authorized training partner for Microsoft, AWS, Cisco, and 50+ technology vendors." },
                { icon: Users, title: "Community", desc: "Join 150,000+ alumni who have transformed their careers through our programs." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border/50 rounded-xl p-6"
                >
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-display font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <StatsSection />
        <PartnersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
