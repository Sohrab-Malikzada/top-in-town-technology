import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    supabase.from("categories").select("id, name, slug, icon, color").eq("is_active", true).order("sort_order").limit(12)
      .then(({ data }) => { if (data) setCategories(data); });
  }, []);

  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Explore <span className="text-gradient">Course Categories</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Browse our comprehensive catalog organized by technology vendor and domain expertise.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/courses?category=${cat.slug}`} className="group block bg-card border border-border/50 rounded-xl p-5 text-center hover:border-primary/30 hover:shadow-glow transition-all duration-300">
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="font-display font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all">View All Categories <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
