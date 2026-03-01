import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Shield, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(141,73%,42%,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(110,100%,54%,0.08),transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Trusted by 150,000+ professionals worldwide</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Trusted{" "}
            <span className="text-gradient">Training Partner</span>
            {" "}for IT Excellence
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore our vast catalogue of 5,000+ industry-leading courses. From cloud computing to cybersecurity, advance your career with world-class training.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex items-center max-w-xl mx-auto bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-2 mb-10 shadow-glow">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-base px-0 h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-6 rounded-xl bg-gradient-primary text-accent-foreground font-semibold hover:opacity-90 transition-opacity">
              Search
            </Button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">Popular:</span>
            {["Azure", "AWS", "CISSP", "Power BI", "CCNA"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/courses?search=${tag}`)}
                className="px-3 py-1.5 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-muted-foreground"
        >
          {[
            { icon: Shield, text: "100% Money-Back Guarantee" },
            { icon: Award, text: "Globally Recognized Certifications" },
            { icon: Globe, text: "Training in 80+ Countries" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
