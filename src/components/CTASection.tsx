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
          className="relative bg-gradient-hero rounded-2xl p-10 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)",
          }} />
          <div className="relative z-10 text-primary-foreground">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="opacity-90 max-w-xl mx-auto mb-8">
              Get personalized course recommendations from our training advisors. Corporate group discounts available.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-foreground/25 transition-colors"
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
