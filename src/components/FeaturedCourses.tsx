import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
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
  categories: { name: string } | null;
  vendors: { name: string } | null;
}

const tabs = ["Top Courses", "New & Trending", "Microsoft", "AWS", "Cybersecurity"];

const FeaturedCourses = () => {
  const [activeTab, setActiveTab] = useState("Top Courses");
  const [courses, setCourses] = useState<DBCourse[]>([]);

  useEffect(() => {
    supabase.from("courses").select("*, categories(name), vendors(name)").eq("is_active", true)
      .then(({ data }) => { if (data) setCourses(data as unknown as DBCourse[]); });
  }, []);

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

  const filtered = activeTab === "Top Courses" ? courses
    : activeTab === "New & Trending" ? courses.filter((c) => c.is_trending)
    : courses.filter((c) => c.categories?.name === activeTab);

  return (
    <section className="py-20 bg-surface">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-foreground">Explore Our <span className="text-primary">Courses</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Industry-leading certification training delivered by expert instructors with hands-on labs and guaranteed results.</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === tab ? "bg-primary text-primary-foreground shadow-glow" : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"}`}>{tab}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <CourseCard course={toCourseCard(course)} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/courses" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-semibold hover:bg-primary-hover transition-colors shadow-glow">
            View All Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
