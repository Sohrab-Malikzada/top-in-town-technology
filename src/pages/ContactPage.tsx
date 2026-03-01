import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have questions about our training programs? Our team is here to help you find the right course.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: "+1 (412) 953-7506", href: "tel:+14129537506" },
                { icon: Mail, label: "Email", value: "info@topintown.tech", href: "mailto:info@topintown.tech" },
                { icon: MessageCircle, label: "WhatsApp", value: "+91-984-072-2417", href: "#" },
                { icon: Clock, label: "Support", value: "24/7 Available", href: null },
                { icon: MapPin, label: "Locations", value: "Global Training Centers", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="bg-card border border-border/50 rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 bg-card border border-border/50 rounded-xl p-8">
              <h2 className="font-display text-xl font-semibold mb-6">Send us a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <Input placeholder="John Doe" className="bg-muted border-border/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <Input type="email" placeholder="john@company.com" className="bg-muted border-border/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone</label>
                    <Input placeholder="+1 234 567 890" className="bg-muted border-border/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Company</label>
                    <Input placeholder="Your company" className="bg-muted border-border/50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message</label>
                  <Textarea placeholder="Tell us about your training needs..." className="bg-muted border-border/50 min-h-[120px]" />
                </div>
                <Button className="w-full bg-gradient-primary text-accent-foreground font-semibold h-12 rounded-xl hover:opacity-90 transition-opacity">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
