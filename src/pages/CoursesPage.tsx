import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface DBCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  base_price: number;
  original_price: number;
  rating: number;
  students_count: number;
  image_url: string;
  is_trending: boolean;
  highlights: string[];
  categories: { name: string; slug: string } | null;
  vendors: { name: string } | null;
}

const toCourseCard = (c: DBCourse) => ({
  id: c.id, title: c.title, slug: c.slug,
  category: c.categories?.name || "", vendor: c.vendors?.name || "",
  duration: c.duration || "", price: c.base_price,
  originalPrice: c.original_price || c.base_price,
  rating: c.rating || 0, students: c.students_count || 0,
  level: (c.level ? c.level.charAt(0).toUpperCase() + c.level.slice(1) : "Beginner") as any,
  deliveryModes: [], description: c.description || "",
  highlights: c.highlights || [], isTrending: c.is_trending,
  image: c.image_url || "",
});

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState<DBCourse[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("courses").select("*, categories(name, slug), vendors(name)").eq("is_active", true),
      supabase.from("categories").select("id, name, slug").eq("is_active", true).order("sort_order"),
    ]).then(([cr, ca]) => {
      setCourses((cr.data || []) as unknown as DBCourse[]);
      setCategories(ca.data || []);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => courses.filter((c) => {
    const ms = !search || c.title.toLowerCase().includes(search.toLowerCase()) || (c.description || "").toLowerCase().includes(search.toLowerCase());
    const mc = !selectedCategory || c.categories?.slug === selectedCategory;
    const ml = !selectedLevel || c.level === selectedLevel.toLowerCase();
    return ms && mc && ml;
  }), [courses, search, selectedCategory, selectedLevel]);

  const clearFilters = () => { setSearch(""); setSelectedCategory(""); setSelectedLevel(""); setSearchParams({}); };
  const hasFilters = search || selectedCategory || selectedLevel;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-10">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">All <span className="text-gradient">Courses</span></h1>
            <p className="text-muted-foreground">Browse our complete catalog of certification training programs</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border/50" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            {hasFilters && <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-primary hover:underline"><X className="h-3.5 w-3.5" /> Clear</button>}
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card border border-border/50 rounded-xl p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setSelectedCategory("")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!selectedCategory ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>All</button>
                    {categories.map((cat) => (
                      <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === cat.slug ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>{cat.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-3 block">Level</label>
                  <div className="flex flex-wrap gap-2">
                    {["", "Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                      <button key={level} onClick={() => setSelectedLevel(level)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedLevel === level ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>{level || "All"}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground mb-6">{filtered.length} courses found</p>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course, i) => (
                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <CourseCard course={toCourseCard(course)} />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-2">No courses found</p>
              <button onClick={clearFilters} className="text-primary hover:underline text-sm">Clear all filters</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
