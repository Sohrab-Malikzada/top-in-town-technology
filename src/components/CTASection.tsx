import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-card border border-border/50 rounded-2xl p-10 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(141,73%,42%,0.1),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Ready to <span className="text-gradient">Transform Your Career?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Get personalized course recommendations from our training advisors. Corporate group discounts available.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-gradient-primary text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Request a Quote
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
