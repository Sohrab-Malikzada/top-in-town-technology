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
    <section className="relative min-h-[560px] flex items-center overflow-hidden bg-gradient-hero">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)",
      }} />

      <div className="container relative z-10 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-primary-foreground"
        >
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
            <span className="text-sm font-medium">Trusted by 150,000+ professionals worldwide</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Trusted Training Partner for IT Excellence
          </h1>

          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore our vast catalogue of 5,000+ industry-leading courses. From cloud computing to cybersecurity, advance your career with world-class training.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex items-center max-w-xl mx-auto bg-background rounded-2xl p-1.5 mb-10 shadow-lg">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-base px-0 h-12 text-foreground"
              />
            </div>
            <Button type="submit" className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors shadow-sm">
              Search
            </Button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="opacity-70">Popular:</span>
            {["Azure", "AWS", "CISSP", "Power BI", "CCNA"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/courses?search=${tag}`)}
                className="px-3 py-1.5 rounded-lg bg-primary-foreground/15 backdrop-blur-sm hover:bg-primary-foreground/25 transition-colors"
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-14 text-primary-foreground/80"
        >
          {[
            { icon: Shield, text: "100% Money-Back Guarantee" },
            { icon: Award, text: "Globally Recognized Certifications" },
            { icon: Globe, text: "Training in 80+ Countries" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
