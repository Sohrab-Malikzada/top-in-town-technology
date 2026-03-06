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

const categoryImages: Record<string, string> = {
  microsoft: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=120&fit=crop",
  aws: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=120&fit=crop",
  cisco: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=120&fit=crop",
  cybersecurity: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=120&fit=crop",
  "cloud-computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=120&fit=crop",
  "data-science": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=120&fit=crop",
  devops: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=200&h=120&fit=crop",
  "project-management": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop",
  vmware: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=200&h=120&fit=crop",
  oracle: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=200&h=120&fit=crop",
  comptia: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=200&h=120&fit=crop",
  "itil-itsm": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=120&fit=crop",
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    supabase.from("categories").select("id, name, slug, icon, color").eq("is_active", true).order("sort_order").limit(12)
      .then(({ data }) => { if (data) setCategories(data); });
  }, []);

  return (
    <section className="py-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-foreground">Explore <span className="text-primary">Course Categories</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Browse our comprehensive catalog organized by technology vendor and domain expertise.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <Link to={`/courses?category=${cat.slug}`} className="group block bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[5/3] overflow-hidden">
                  <img
                    src={categoryImages[cat.slug] || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop`}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-display font-semibold text-sm group-hover:text-primary transition-colors text-card-foreground">{cat.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:gap-3 transition-all">View All Categories <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
