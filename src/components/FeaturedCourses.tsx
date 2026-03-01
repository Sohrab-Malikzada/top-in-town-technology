import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { courses } from "@/data/courses";

const tabs = ["Top Courses", "New & Trending", "Microsoft", "AWS", "Cybersecurity"];

const FeaturedCourses = () => {
  const [activeTab, setActiveTab] = useState("Top Courses");

  const filteredCourses = activeTab === "Top Courses"
    ? courses
    : activeTab === "New & Trending"
    ? courses.filter((c) => c.isTrending)
    : courses.filter((c) => c.category === activeTab);

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Explore Our <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-leading certification training delivered by expert instructors with hands-on labs and guaranteed results.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.slice(0, 8).map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors"
          >
            View All Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
