import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { courses, categories } from "@/data/courses";

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || c.category.toLowerCase().replace(/\s+/g, "-").includes(selectedCategory.toLowerCase());
      const matchesLevel = !selectedLevel || c.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, selectedCategory, selectedLevel]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedLevel("");
    setSearchParams({});
  };

  const hasFilters = search || selectedCategory || selectedLevel;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-10">
        <div className="container">
          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
              All <span className="text-gradient">Courses</span>
            </h1>
            <p className="text-muted-foreground">Browse our complete catalog of {courses.length}+ certification training programs</p>
          </motion.div>

          {/* Search & Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors sm:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-primary hover:underline">
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card border border-border/50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 8).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedCategory === cat.slug
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-3 block">Level</label>
                  <div className="flex flex-wrap gap-2">
                    {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(selectedLevel === level ? "" : level)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedLevel === level
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} courses found</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
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
